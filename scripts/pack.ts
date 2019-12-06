import webpack, { Compiler } from 'webpack';
import { argv } from 'yargs';
import devWebpackConfig from '../configs/webpack.dev';
import prodWebpackConfig from '../configs/webpack.prod';

const compiler = webpack(process.env.NODE_ENV === 'development' ? devWebpackConfig : prodWebpackConfig);
const compileHandler: Compiler.Handler = (error, stats) => {
    const compileError: Error & { details?: string } = error;
    if (error) {
        console.error(error);

        if (compileError.details) {
            console.error(compileError.details);
        }

        return;
    }

    console.log(stats.toString({ colors: true, modules: false }));
};

if (argv.watch) {
    compiler.watch({}, compileHandler);
} else {
    compiler.run(compileHandler);
}

export default null;
