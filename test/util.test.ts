import { resolve } from 'path';
import assert, { equal } from 'assert';
import fs from 'fs-extra';

import { fetchNpmPackageRepository, getRootPath, getPackageNamesFromPackageJSON } from '../src/util';

describe('#utils', () => {
    const projectPath = resolve(__dirname, '../../');
    describe('#fetchNpmPackageRepository', function() {
        this.timeout(10 * 1000);
        it('normal package name: webpack', async () => {
            const webpackRepositoryUrl = 'https://github.com/webpack/webpack';
            const responseUrl = await fetchNpmPackageRepository('webpack');
            equal(webpackRepositoryUrl, responseUrl!);
        });

        it('package name prefix with @xxx', async () => {
            const babelRepositoryUrl = 'https://github.com/babel/babel/tree/master/packages/babel-core';
            const responseUrl = await fetchNpmPackageRepository('@babel/core');
            equal(babelRepositoryUrl, responseUrl!);
        });

        it('return null when not exists package', async () => {
            const responseUrl: any = await fetchNpmPackageRepository('ytj');
            equal(null, responseUrl);
        });
    });

    describe('#getRootPath', () => {
        it('#should get the right project root path', () => {
            equal(resolve(projectPath, './test-fixture'), getRootPath());
        });
    });

    describe('#getPackageNamesFromPackageJSON', () => {
        it('should get package names that not prefixed with @types/', async () => {
            const jsonContent = await fs.readFile(resolve(getRootPath()!, 'package.json'));
            const packageNames = getPackageNamesFromPackageJSON(jsonContent.toString());
            assert(packageNames.includes('cross-env') && !packageNames.includes('@types/webpack'));
        });
    });
});
