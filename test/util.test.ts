import { equal } from 'assert';
import { fetchNpmPackageRepository } from '../src/util';

describe('#utils', () => {
    describe('#fetchNpmPackageRepository', function() {
        this.timeout(10 * 1000);
        it('normal package name: webpack', async () => {
            const webpackRepositoryUrl = 'https://github.com/webpack/webpack';
            const responseUrl = await fetchNpmPackageRepository('webpack');
            equal(webpackRepositoryUrl, responseUrl!);
        });

        it('package name prefix with @xxx', async () => {
            const babelRepositoryUrl = 'https://github.com/babel/babel';
            const responseUrl = await fetchNpmPackageRepository('@babel/core');
            equal(babelRepositoryUrl, responseUrl!);
        });

        it('return null when not exists package', async () => {
            const responseUrl: any = await fetchNpmPackageRepository('ytj');
            console.error({ responseUrl });
            equal(null, responseUrl);
        });
    });
});
