const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: 'index'
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        modules: [__dirname, '../node_modules'],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }, {
                loader: 'file-loader',
                test: /\.(png|jpg|gif|webp|eot|ttf|cur|woff2?|svg)$/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ]
};
