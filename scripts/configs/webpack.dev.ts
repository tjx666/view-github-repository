import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonWebpackConfig from './webpack.common';

const devWebpackConfiguration: Configuration = merge(commonWebpackConfig, {
    // mode: 'none',
    // devtool: 'nosources-source-map',
    mode: 'development',
    devtool: 'source-map',
});

export default devWebpackConfiguration;
