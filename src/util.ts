import vscode from 'vscode';
import axios from 'axios';
import packageJson, { FullMetadata } from 'package-json';

/**
 * get npm package infos provided by https://api-docs.npms.io/ or https://registry.npmjs.com
 * the former's delay is lower than later
 * but the former's scoop package repository URL isn't right
 * @param moduleName
 */
export async function fetchNpmPackageRepository(moduleName: string): Promise<string | null> {
    // if package is a scoop package
    if (moduleName.startsWith('@')) {
        let metadata: FullMetadata | undefined;
        try {
            metadata = await packageJson(moduleName, { fullMetadata: true });
        } catch (error) {
            console.error(error);
            return null;
        }

        const homepage = metadata?.homepage;
        if (homepage?.startsWith('https://github.com/')) return homepage;

        const repositoryURL: string | undefined = metadata?.repository?.url;
        if (repositoryURL) {
            if (repositoryURL.startsWith('https://github.com/')) {
                return repositoryURL;
            }

            if (repositoryURL.startsWith('git+https://github.com/')) {
                return repositoryURL.slice(4, -4);
            }
        }
    }

    const packageInfoURL = 'https://api.npms.io/v2/package/:name';
    let resp: any;
    try {
        resp = await axios.get(packageInfoURL.replace(':name', encodeURIComponent(moduleName)));
    } catch (error) {
        console.error(error);
        return null;
    }

    const repositoryURL: string | undefined = resp?.data?.collected?.metadata?.links?.repository;
    if (repositoryURL) {
        return repositoryURL;
    }

    return null;
}

export function extractModuleNames(textContent: string): string[] {
    const moduleNameRegexpSource = /("|')([^./][a-zA-Z0-9-._@/]*?)("|')/.source;
    const requireRegexp = new RegExp(`require\\(${moduleNameRegexpSource}\\)`);
    const importRegexp = new RegExp(`import\\s+.*?${moduleNameRegexpSource}`);
    const exportRegexp = new RegExp(`export\\s+.*?from\\s+${moduleNameRegexpSource}`);
    const importStatementRegexp = new RegExp(
        `${requireRegexp.source}|${importRegexp.source}|${exportRegexp.source}`,
        'g',
    );
    const importStatements = textContent.match(importStatementRegexp);

    if (importStatements) {
        return importStatements
            .map((importStatement) => {
                const matchedRegexp = [requireRegexp, importRegexp, exportRegexp].find((regexp) =>
                    regexp.test(importStatement),
                )!;
                const moduleName = importStatement.match(matchedRegexp)![2];
                const firstSlashIndex = moduleName.indexOf('/');
                if (~firstSlashIndex) {
                    if (moduleName.startsWith('@')) {
                        const secondSlashIndex = moduleName.indexOf('/', firstSlashIndex + 1);
                        if (~secondSlashIndex) {
                            return moduleName.slice(0, secondSlashIndex);
                        }
                        return moduleName;
                    }
                    return moduleName.slice(0, firstSlashIndex);
                }
                return moduleName;
            })
            .filter((moduleName) => !moduleName.startsWith('@types/'));
    }

    return [];
}

export function getRootPath(): string | null {
    const { workspaceFolders } = vscode.workspace;

    if (workspaceFolders && workspaceFolders.length > 0) {
        return workspaceFolders[0].uri.fsPath;
    }

    return null;
}

export function getPackageNamesFromPackageJSON(jsonTextContent: string): string[] {
    let packageJSON: any;

    try {
        packageJSON = JSON.parse(jsonTextContent);
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage('Parse package.json error!');
        return [];
    }

    const packageNames: string[] = [];

    if (!packageJSON) return [];

    if (packageJSON.dependencies) packageNames.push(...Object.keys(packageJSON.dependencies));

    if (packageJSON.devDependencies) packageNames.push(...Object.keys(packageJSON.devDependencies));

    return packageNames.filter((packageName) => !packageName.startsWith('@types/'));
}
