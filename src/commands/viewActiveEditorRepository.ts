import * as vscode from 'vscode';
import { getPackageNamesFromPackageJSON, viewGithubRepository } from '../util';

const extractModuleNames = (textContent: string): string[] => {
    const requireRegexp = /require\(("|')([a-zA-Z0-9-._]*?)("|')\)/;
    const importRegexp = /import\s+.*?('|")([a-zA-Z0-9-._]*?)('|")/;
    const exportRegexp = /export\s+.*?from\s+('|")([a-zA-Z0-9-._]*?)('|")/;
    const importStatementRegexp = new RegExp(
        `${requireRegexp.source}|${importRegexp.source}|${exportRegexp.source}`,
        'g'
    );
    const importStatements = textContent.match(importStatementRegexp);

    if (importStatements) {
        return importStatements.map(importStatement => {
            let matchedRegexp: RegExp | undefined;

            if (importStatement.includes('require')) {
                matchedRegexp = requireRegexp;
            } else if (importStatement.includes('import')) {
                matchedRegexp = importRegexp;
            } else {
                matchedRegexp = exportRegexp;
            }

            return importStatement.match(matchedRegexp)![2];
        });
    }

    return [];
};

const handleViewActiveEditorRepository = async () => {
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

        if (moduleNames) {
            viewGithubRepository(moduleNames);
        }
    }
};

const viewActiveEditorRepository: CommandModule = {
    identifier: 'viewActiveEditorRepository',
    handler: handleViewActiveEditorRepository,
};

export default viewActiveEditorRepository;
