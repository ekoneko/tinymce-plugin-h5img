const path = require('path');

module.exports = {
    entry: {
        index: 'index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'plugin.js',
        libraryTarget: 'var',
    },
    resolve: {
        modules: [path.join(__dirname, 'src')],
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
};
