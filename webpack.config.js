const webpack = require('webpack');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoPrefixerCss = require('autoprefixer');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization:{// this will overwrite the webpack minimizer, so the default js minimizer will be overwrited
        minimizer:[
            new UglifyJsPlugin({
                parallel: true,
            }),
            new optimizeCssAssetPlugin({}) 
        ]
    },
    plugins:[//create and initialise the plugin here
        new miniCssExtractPlugin({
            filename: 'index.css',
            chunkFilename: '[id].css',
            
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {//this is used to target the development environment
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        open: true,
        port: 10020,
        hot: true
    }
};


