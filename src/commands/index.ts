import vscode from 'vscode';
import isOnline from 'is-online';

import viewActiveEditorRepository from './viewActiveEditorRepository';
import viewPackageJSONRepository from './viewPackageJSONRepository';

const commands = [viewActiveEditorRepository, viewPackageJSONRepository];
commands.forEach((command) => {
    const { identifier, handler } = command;
    command.identifier = `viewGithubRepository.${identifier}`;
    command.handler = async function networkCheckedHandler(...args: any[]) {
        const isOffline = !(await isOnline());
        if (isOffline) {
            vscode.window.showErrorMessage('The network is not connected, please try again later!');
            return;
        }

        await handler(...args);
    };
});

export default commands;
