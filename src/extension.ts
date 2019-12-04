/* eslint-disable no-else-return */
import * as vscode from 'vscode';
import open from 'open';
import { nodeNativeModules, getNodeNativeModuleDocumentURL } from './nodeNativeModules';

const supportedLanguageIds = ['javascript', 'javascriptreact', 'typescriptreact', 'vue', 'typescript'];
const importStatementRegexp = /require\(("|')([a-zA-Z0-9-]*?)("|')\)|import\s+.*?('|")([a-zA-Z0-9-]*?)('|")|export\s+.*?from\s+('|")([a-zA-Z0-9-]*?)('|")/g;

const viewGithubRepository = (moduleName: string) => {
    if (nodeNativeModules.includes(moduleName)) {
        open(getNodeNativeModuleDocumentURL(moduleName));
    } else {
        // ,,,
    }
};

const handleViewRepositoryOfEditor = () => {
    console.log('Execute command viewRepositoryOfEditor');

    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && supportedLanguageIds.includes(activeEditor.document.languageId)) {
        const editorContent = activeEditor.document.getText();
        const importStatements = editorContent.match(importStatementRegexp);

        if (importStatements) {
            const packageNames = importStatements.map(importStatement => {
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

            if (packageNames.length === 1) {
                viewGithubRepository(packageNames[0]);
            } else {
                // ...
            }
        }
    }
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension View GitHub Repository now active!');

    context.subscriptions.push(
        vscode.commands.registerCommand('viewGithubRepository.viewRepositoryOfEditor', handleViewRepositoryOfEditor)
    );
}

export function deactivate() {
    console.log('extension deactivate...');
}
