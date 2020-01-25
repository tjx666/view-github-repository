/* eslint-disable import/prefer-default-export */

import * as vscode from 'vscode';
import commands from './commands';

export function activate(context: vscode.ExtensionContext) {
    commands.forEach(command =>
        context.subscriptions.push(vscode.commands.registerCommand(command.identifier, command.handler))
    );
}
