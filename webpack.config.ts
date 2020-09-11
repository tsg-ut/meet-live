import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'production',
    entry: './banner/index.tsx',
    output: {
        path: path.resolve(__dirname, 'banner'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.css?$/,
                use: [ 'style-loader', 'css-loader' ],
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
    },
};

export default config;