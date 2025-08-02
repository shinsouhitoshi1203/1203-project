const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { join } = require('path');

module.exports = {
    output: {
        path: join(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@/*': join(__dirname, 'src/*'),
        },
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'tsc',
            main: './src/main.js',
            tsConfig: './tsconfig.app.json',
            assets: ['./src/assets'],
            optimization: false,
            outputHashing: 'none',
            generatePackageJson: true,
            watch: true,
            outputPath: join(__dirname, 'dist'),
        }),
        new NodemonPlugin({
            nodeArgs: ['--inspect'],
        }),
    ],
};
