import * as vscode from 'vscode';
import { getPackageNamesFromPackageJSON, viewGithubRepository } from '../util';

function extractModuleNames(textContent: string): string[] {
    const requireRegexp = /require\(("|')([^.][a-zA-Z0-9-._@/]*?)("|')\)/;
    const importRegexp = /import\s+.*?('|")([^.][a-zA-Z0-9-._@/]*?)('|")/;
    const exportRegexp = /export\s+.*?from\s+('|")([^.][a-zA-Z0-9-._@/]*?)('|")/;
    const importStatementRegexp = new RegExp(
        `${requireRegexp.source}|${importRegexp.source}|${exportRegexp.source}`,
        'g'
    );
    const importStatements = textContent.match(importStatementRegexp);

    if (importStatements) {
        return importStatements.map(importStatement => {
            const matchedRegexp = [requireRegexp, importRegexp, exportRegexp].find(regexp =>
                regexp.test(importStatement)
            )!;
            const moduleName = importStatement.match(matchedRegexp)![2];
            const slashIndex = moduleName.indexOf('/');

            return slashIndex === -1 ? moduleName : moduleName.slice(0, slashIndex);
        });
    }

    return [];
}

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
