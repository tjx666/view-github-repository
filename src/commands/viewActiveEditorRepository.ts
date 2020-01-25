import * as vscode from 'vscode';

import { getPackageNamesFromPackageJSON, extractModuleNames } from '../util';
import viewGithubRepository from '../viewGithubRepository';

async function handler() {
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

        if (moduleNames && moduleNames.length > 0) {
            viewGithubRepository(moduleNames);
        }
    }
}

const viewActiveEditorRepository: CommandModule = {
    identifier: 'viewActiveEditorRepository',
    handler,
};

export default viewActiveEditorRepository;
