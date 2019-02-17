const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: { 
        detail: path.join(__dirname, 'src', 'detail.js'),
        app: path.join(__dirname, 'src', 'main.js')  
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 'style-loader', {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    }
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new htmlPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            chunks: ['app']
        }),
        new htmlPlugin({
            filename: 'detail.html',
            template: path.join(__dirname, 'src', 'detail.html'),
            chunks: ['detail']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        open: true, // abre el navegador por defecto
        overlay: true, // muestra errores en pantalla
        port: 3000, // puerto de escucha
        hot: true,
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true
    },
};