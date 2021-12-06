import vscode from 'vscode';

import commands from './commands';

export function activate(context: vscode.ExtensionContext): void {
    for (const command of commands) {
        context.subscriptions.push(
            vscode.commands.registerCommand(command.identifier, command.handler),
        );
    }
}
