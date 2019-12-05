import * as vscode from 'vscode';
import axios from 'axios';
import builtInModules from 'builtin-modules';
import _ from 'lodash';
import open from 'open';

/**
 * get npm package infos provided by https://api-docs.npms.io/
 * @param moduleName
 */
const fetchNpmPackageRepository = async (moduleName: string): Promise<string | null> => {
    const packageInfoURL = 'https://api.npms.io/v2/package/:name';

    let resp: any;
    try {
        resp = await axios.get(packageInfoURL.replace(':name', moduleName));
    } catch (error) {
        vscode.window.showErrorMessage(`Get module ${moduleName} info occur error, check your network!`);
        console.error(error);
    }

    const repositoryURL: string | undefined = _.get(resp, 'data.collected.metadata.links.repository');
    if (repositoryURL) {
        return repositoryURL;
    }

    return null;
};

const viewGithubRepository = async (moduleName: string) => {
    if (builtInModules.includes(moduleName)) {
        const nodeBuiltInModuleDocumentURL = `https://nodejs.org/api/${moduleName}.html`;
        await open(nodeBuiltInModuleDocumentURL);
    } else {
        const repositoryURL = await fetchNpmPackageRepository(moduleName);
        if (repositoryURL) {
            open(repositoryURL);
        } else {
            vscode.window.showErrorMessage(`The module ${moduleName} doesn't seem to exist!`);
        }
    }
};

const extractModuleNames = (textContent: string): string[] => {
    const requireRegexp = /require\(("|')([a-zA-Z0-9-._]*?)("|')\)/;
    const importRegexp = /import\s+.*?('|")([a-zA-Z0-9-._]*?)('|")/;
    const exportRegexp = /export\s+.*?from\s+('|")([a-zA-Z0-9-._]*?)('|")/;
    const importStatementRegexp = new RegExp(
        `${requireRegexp.source}|${importRegexp.source}|${exportRegexp.source}`,
        'g'
    );
    const importStatements = textContent.match(importStatementRegexp);

    if (importStatements) {
        return importStatements.map(importStatement => {
            let matchedRegexp: RegExp | undefined;

            if (importStatement.includes('require')) {
                matchedRegexp = requireRegexp;
            } else if (importStatement.includes('import')) {
                matchedRegexp = importRegexp;
            } else {
                matchedRegexp = exportRegexp;
            }

            return importStatement.match(matchedRegexp)![2];
        });
    }

    return [];
};

const getPackageNamesFromPackageJSON = (jsonTextContent: string): string[] => {
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

    return packageNames;
};

export default async function handleViewActiveEditorRepository() {
    const supportedLanguageIds = ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'];
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
        const editorContent = activeEditor.document.getText();
        let moduleNames: string[] | undefined;

        if (activeEditor.document.fileName.endsWith('package.json')) {
            moduleNames = getPackageNamesFromPackageJSON(editorContent);
        } else if (supportedLanguageIds.includes(activeEditor.document.languageId)) {
            moduleNames = extractModuleNames(editorContent);
        }

        if (moduleNames) {
            if (moduleNames.length === 1) {
                viewGithubRepository(moduleNames[0]);
            } else {
                const moduleName = await vscode.window.showQuickPick(moduleNames);
                if (moduleName) {
                    viewGithubRepository(moduleName);
                }
            }
        }
    }
}
