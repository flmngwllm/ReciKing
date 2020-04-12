const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    //starts looking for all the dependencies
    entry: ['babel-polyfill', './src/js/index.js'],
    // where to save our bundle file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};