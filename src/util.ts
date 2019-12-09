import * as vscode from 'vscode';
import axios from 'axios';
import builtInModules from 'builtin-modules';
import _ from 'lodash';
import open from 'open';
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

        const homepage = _.get(metadata, 'homepage');
        if (homepage && homepage.startsWith('https://github.com/')) return homepage;

        const repositoryURL: string | undefined = _.get(metadata, ['repository', 'url']);
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

    const repositoryURL: string | undefined = _.get(resp, 'data.collected.metadata.links.repository');
    if (repositoryURL) {
        return repositoryURL;
    }

    return null;
}

export async function viewGithubRepository(moduleNames: string[]) {
    let selectedModuleName: string | undefined;
    if (moduleNames.length === 1) {
        [selectedModuleName] = moduleNames;
    } else {
        const items = moduleNames.map(moduleName => {
            const item: vscode.QuickPickItem = { label: moduleName };
            if (builtInModules.includes(moduleName)) {
                item.description = 'builtIn';
            }

            return item;
        });
        const selectedItem = await vscode.window.showQuickPick(items, {
            placeHolder: 'select the module you want to browse and press Enter',
        });
        if (selectedItem) {
            selectedModuleName = selectedItem.label;
        }
    }

    if (selectedModuleName) {
        if (builtInModules.includes(selectedModuleName)) {
            const nodeBuiltInModuleDocumentURL = `https://nodejs.org/api/${selectedModuleName}.html`;
            await open(nodeBuiltInModuleDocumentURL);
        } else {
            const repositoryURL = await fetchNpmPackageRepository(selectedModuleName);
            if (repositoryURL) {
                open(repositoryURL);
            } else {
                vscode.window.showErrorMessage(`can't resolve the github repository of module ${selectedModuleName}!`);
            }
        }
    }
}

export function getRootPath(): string | null {
    const { workspaceFolders } = vscode.workspace;
    if (workspaceFolders && workspaceFolders.length > 0) {
        return workspaceFolders[0].uri.fsPath;
    }

    return null;
}

export function getPackageNamesFromPackageJSON(jsonTextContent: string): string[] {
    let packageJSON: Record<string, any> | undefined;
    try {
        packageJSON = JSON.parse(jsonTextContent);
    } catch (error) {
        vscode.window.showErrorMessage('Parse package.json error');
        console.error(error);
    }

    const packageNames: string[] = [];
    if (!packageJSON) return [];

    if (packageJSON.dependencies) {
        packageNames.push(...Object.keys(packageJSON.dependencies));
    }

    if (packageJSON.devDependencies) {
        packageNames.push(...Object.keys(packageJSON.devDependencies));
    }

    return packageNames.filter(packageName => !packageName.startsWith('@types/'));
}
