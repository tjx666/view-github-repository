import { resolve } from 'path';
import { equal, deepEqual } from 'assert';
import fs from 'fs';
import { promisify } from 'util';

import {
    fetchNpmPackageRepository,
    extractModuleNames,
    getRootPath,
    getPackageNamesFromPackageJSON,
} from '../src/util';

const readFile = promisify(fs.readFile);
const projectPath = resolve(__dirname, '../../');

describe('#utils', () => {
    describe('#fetchNpmPackageRepository', function() {
        this.timeout(3 * 1000);

        it('normal package name webpack', async () => {
            const responseUrl = await fetchNpmPackageRepository('webpack');
            equal(responseUrl, 'https://github.com/webpack/webpack');
        });

        it('scoop package', async () => {
            const responseUrl = await fetchNpmPackageRepository('@babel/core');
            equal(responseUrl, 'https://github.com/babel/babel/tree/master/packages/babel-core');
        });

        it('return null when not exists package', async () => {
            const responseUrl = await fetchNpmPackageRepository('ytj');
            equal(responseUrl, null);
        });
    });

    describe('#extractModuleNames', () => {
        it('should return the right moduleNames', async () => {
            const textContent = (await readFile(resolve(projectPath, './test-fixture/index.js'))).toString();
            deepEqual(extractModuleNames(textContent), ['path', 'webpack', 'lodash', '@babel/core']);
        });
    });

    describe('#getRootPath', () => {
        it('should get the right project root path', () => {
            equal(getRootPath(), resolve(projectPath, './test-fixture'));
        });
    });

    describe('#getPackageNamesFromPackageJSON', () => {
        it('should get package names that not prefixed with @types/', async () => {
            const jsonContent = (await readFile(resolve(getRootPath()!, 'package.json'))).toString();
            const packageNames = getPackageNamesFromPackageJSON(jsonContent);
            deepEqual(packageNames, ['lodash', '@babel/core', 'webpack']);
        });
    });
});
