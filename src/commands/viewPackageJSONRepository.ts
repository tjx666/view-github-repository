import { resolve } from 'path';
import fs from 'fs-extra';
import { getPackageNamesFromPackageJSON, getRootPath, viewGithubRepository } from '../util';

const handleViewPackageJSONRepository = async () => {
    const rootPath = getRootPath();
    if (rootPath) {
        const packageJSONPath = resolve(rootPath, './package.json');
        const isExists = await fs.pathExists(packageJSONPath);

        if (isExists) {
            const jsonTextContent = (await fs.readFile(packageJSONPath)).toString();
            const packageNames = getPackageNamesFromPackageJSON(jsonTextContent);
            viewGithubRepository(packageNames);
        }
    }
};

const viewPackageJSONRepository: CommandModule = {
    identifier: 'viewPackageJSONRepository',
    handler: handleViewPackageJSONRepository,
};

export default viewPackageJSONRepository;
