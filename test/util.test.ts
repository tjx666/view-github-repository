import { deepStrictEqual, strictEqual } from 'assert';
import fs from 'fs/promises';
import { resolve } from 'path';

import {
    extractModuleNames,
    fetchNpmPackageRepository,
    getPackageNamesFromPackageJSON,
    getRootPath,
} from '../src/util';

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
            strictEqual(responseUrl, 'https://github.com/babel/babel.git');
        });

        it('return null when not exists package', async () => {
            const responseUrl = await fetchNpmPackageRepository('ytj');
            strictEqual(responseUrl, null);
        });
    });

    describe('#extractModuleNames', () => {
        it('should return the right moduleNames', async () => {
            const textContent = await fs.readFile(
                resolve(projectPath, './test-fixture/index.js'),
                'utf-8',
            );

            deepStrictEqual(extractModuleNames(textContent), [
                'path',
                'webpack',
                'lodash',
                '@babel/core',
                '@types/node',
            ]);
        });
    });

    describe('#getRootPath', () => {
        it('should get the right project root path', () => {
            strictEqual(getRootPath(), resolve(projectPath, './test-fixture'));
        });
    });

    describe('#getPackageNamesFromPackageJSON', () => {
        it('should get package names', async () => {
            const jsonContent = await fs.readFile(resolve(getRootPath()!, 'package.json'), 'utf-8');
            const packageNames = getPackageNamesFromPackageJSON(jsonContent);
            deepStrictEqual(packageNames, ['lodash', '@babel/core', '@types/node', 'webpack']);
        });
    });
});
