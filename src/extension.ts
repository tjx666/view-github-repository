/* eslint-disable no-else-return */
import * as vscode from 'vscode';
import axios from 'axios';
import open from 'open';
import _ from 'lodash';
import { nodeNativeModules, getNodeNativeModuleDocumentURL } from './nodeNativeModules';

const supportedLanguageIds = ['javascript', 'javascriptreact', 'typescriptreact', 'vue', 'typescript'];
const importStatementRegexp = /require\(("|')([a-zA-Z0-9-]*?)("|')\)|import\s+.*?('|")([a-zA-Z0-9-]*?)('|")|export\s+.*?from\s+('|")([a-zA-Z0-9-]*?)('|")/g;

const fetchNpmPackageRepository = async (moduleName: string): Promise<string | null> => {
    // provided by https://api-docs.npms.io/
    const packageInfoURL = 'https://api.npms.io/v2/package/:name';
    let resp: any;
    try {
        resp = await axios.get(packageInfoURL.replace(':name', moduleName));
    } catch (error) {
        vscode.window.showErrorMessage(`Get module ${moduleName} info occur error, check your network!`);
    }

    const repositoryURL: string | undefined = _.get(resp, 'data.collected.metadata.links.repository');
    if (repositoryURL) {
        return repositoryURL;
    }

    return null;
};

const viewGithubRepository = async (moduleName: string) => {
    if (nodeNativeModules.includes(moduleName)) {
        await open(getNodeNativeModuleDocumentURL(moduleName));
    } else {
        const repositoryURL = await fetchNpmPackageRepository(moduleName);
        if (repositoryURL) {
            open(repositoryURL);
        } else {
            vscode.window.showErrorMessage(`The module ${moduleName} doesn't seem to exist!`);
        }
    }
};

const extractModuleNames = (textContent: string): string[] | null => {
    const importStatements = textContent.match(importStatementRegexp);
    if (importStatements) {
        return importStatements.map(importStatement => {
            let matchedRegexp: RegExp | undefined;

            if (importStatement.includes('require')) {
                matchedRegexp = /require\(("|')([a-zA-Z0-9-]*?)("|')\)/;
            } else if (importStatement.includes('import')) {
                matchedRegexp = /import\s+.*?('|")([a-zA-Z0-9-]*?)('|")/;
            } else {
                matchedRegexp = /export\s+.*?from\s+('|")([a-zA-Z0-9-]*?)('|")/;
            }

            return importStatement.match(matchedRegexp)![2];
        });
    }
    return null;
};

const handleViewRepositoryOfActiveEditor = () => {
    console.log('Execute command viewRepositoryOfEditor');

    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && supportedLanguageIds.includes(activeEditor.document.languageId)) {
        const editorContent = activeEditor.document.getText();
        const moduleNames = extractModuleNames(editorContent);

        if (moduleNames && moduleNames.length === 1) {
            viewGithubRepository(moduleNames[0]);
        } else {
            // ...
        }
    }
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension View GitHub Repository now active!');

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'viewGithubRepository.viewRepositoryOfActiveEditor',
            handleViewRepositoryOfActiveEditor
        )
    );
}

export function deactivate() {
    console.log('extension deactivate...');
}
