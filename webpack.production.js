const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: { 
        detail: path.join(__dirname, 'src', 'detail.js'),
        app: path.join(__dirname, 'src', 'main.js')  
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].production.[ext]',
                        },
                    }
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(['dist']),
        new htmlPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            chunks: ['app']
        }),
        new htmlPlugin({
            filename: 'detail.html',
            template: path.join(__dirname, 'src', 'detail.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            chunks: ['detail']
        }),
        new MiniCssExtractPlugin(),
    ],
};









