import { resolve } from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const commonWebpackConfig: Configuration = {
    target: 'node',
    entry: resolve(__dirname, '../src/extension.ts'),
    output: {
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, '../out'),
        filename: 'extension.js',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    resolve: { extensions: ['.ts', '.js', '.json'] },
    externals: {
        vscode: 'commonjs vscode',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new ProgressBarPlugin({ clear: false })],
};

export default commonWebpackConfig;
