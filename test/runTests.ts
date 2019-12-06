import { resolve } from 'path';
import { runTests } from 'vscode-test';

async function go() {
    const projectPath = resolve(__dirname, '../../');
    const extensionDevelopmentPath = projectPath;
    const extensionTestsPath = resolve(projectPath, './out/test/index.js');
    const testWorkspace = resolve(projectPath, './test-fixture');
    const vscodeExecutablePath = resolve(projectPath, './.vscode-test/vscode-insiders/Code - Insiders.exe');

    try {
        await runTests({
            version: 'insiders',
            extensionDevelopmentPath,
            extensionTestsPath,
            vscodeExecutablePath,
            launchArgs: [testWorkspace],
        });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

go();
