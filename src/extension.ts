import * as vscode from 'vscode';
import commands from './commands';

function activate(context: vscode.ExtensionContext) {
    commands.forEach(command =>
        context.subscriptions.push(vscode.commands.registerCommand(command.identifier, command.handler))
    );
}

function deactivate() {
    // recycle resource
}

export { activate, deactivate };
