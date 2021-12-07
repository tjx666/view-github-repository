import fs from 'fs';
import fsAsync from 'fs/promises';
import { resolve } from 'path';

import { getPackageNamesFromPackageJSON, getRootPath } from '../util';
import viewGithubRepository from '../viewGithubRepository';

function pathExists(path: string) {
    return fsAsync
        .access(path, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}

async function handler(): Promise<void> {
    const rootPath = getRootPath();
    if (rootPath) {
        const packageJSONPath = resolve(rootPath, './package.json');
        const isExists = await pathExists(packageJSONPath);

        if (isExists) {
            const jsonTextContent = await fsAsync.readFile(packageJSONPath, 'utf-8');
            const packageNames = getPackageNamesFromPackageJSON(jsonTextContent);
            viewGithubRepository(packageNames);
        }
    }
}

const viewPackageJSONRepository: CommandModule = {
    identifier: 'viewPackageJSONRepository',
    handler,
};

export default viewPackageJSONRepository;
