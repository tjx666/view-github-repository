import vscode from 'vscode';
import builtInModules from 'builtin-modules';
import open from 'open';

import { fetchNpmPackageRepository } from './util';

export default async function viewGithubRepository(moduleNames: string | string[]) {
    let selectedModuleName: string | undefined;

    if (typeof moduleNames === 'string') {
        selectedModuleName = moduleNames;
    } else {
        const items = moduleNames.map((moduleName) => {
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
            const nodeDocumentURL = `https://nodejs.org/api/${selectedModuleName}.html`;
            await open(nodeDocumentURL);
        } else {
            const repositoryURL = await fetchNpmPackageRepository(selectedModuleName);

            if (repositoryURL) {
                open(repositoryURL);
            } else {
                vscode.window.showErrorMessage(
                    `can't resolve the github repository of module ${selectedModuleName}!`,
                );
            }
        }
    }
}
