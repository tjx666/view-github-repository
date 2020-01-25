import { resolve } from 'path';
import fs from 'fs';
import { promisify } from 'util';

import { getPackageNamesFromPackageJSON, getRootPath } from '../util';
import viewGithubRepository from '../viewGithubRepository';

const isFileExists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

async function handler() {
    const rootPath = getRootPath();
    if (rootPath) {
        const packageJSONPath = resolve(rootPath, './package.json');
        const isExists = await isFileExists(packageJSONPath);

        if (isExists) {
            const jsonTextContent = (await readFile(packageJSONPath)).toString();
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
