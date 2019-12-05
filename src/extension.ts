/* eslint-disable no-else-return */
import * as vscode from 'vscode';
import handleViewActiveEditorRepository from './commands/viewActiveEditorRepository';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension View GitHub Repository now active!');

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'viewGithubRepository.viewActiveEditorRepository',
            handleViewActiveEditorRepository
        )
    );
}

export function deactivate() {
    console.log('extension deactivate...');
}
