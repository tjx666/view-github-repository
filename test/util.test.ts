import { resolve } from 'path';
import { strictEqual, deepStrictEqual } from 'assert';
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
    describe('#fetchNpmPackageRepository', function () {
        this.timeout(3 * 1000);

        it('normal package name webpack', async () => {
            const responseUrl = await fetchNpmPackageRepository('webpack');
            strictEqual(responseUrl, 'https://github.com/webpack/webpack');
        });

        it('scoop package', async () => {
            const responseUrl = await fetchNpmPackageRepository('@babel/core');
            strictEqual(responseUrl, 'https://github.com/babel/babel');
        });

        it('return null when not exists package', async () => {
            const responseUrl = await fetchNpmPackageRepository('ytj');
            strictEqual(responseUrl, null);
        });
    });

    describe('#extractModuleNames', () => {
        it('should return the right moduleNames', async () => {
            const textContent = (
                await readFile(resolve(projectPath, './test-fixture/index.js'))
            ).toString();
            deepStrictEqual(extractModuleNames(textContent), [
                'path',
                'webpack',
                'lodash',
                '@babel/core',
            ]);
        });
    });

    describe('#getRootPath', () => {
        it('should get the right project root path', () => {
            strictEqual(getRootPath(), resolve(projectPath, './test-fixture'));
        });
    });

    describe('#getPackageNamesFromPackageJSON', () => {
        it('should get package names that not prefixed with @types/', async () => {
            const jsonContent = (
                await readFile(resolve(getRootPath()!, 'package.json'))
            ).toString();
            const packageNames = getPackageNamesFromPackageJSON(jsonContent);
            deepStrictEqual(packageNames, ['lodash', '@babel/core', 'webpack']);
        });
    });
});
