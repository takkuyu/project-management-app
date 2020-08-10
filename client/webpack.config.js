const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const outputPath = path.resolve(__dirname, 'build');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        filename: '[name].js',
        path: outputPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                  },
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets',
                        },
                    },
                ],
            },
            // {
            //     test: /\.svg$/,
            //     use: ['@svgr/webpack'],
            // },
        ]
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    devServer: {
        contentBase: outputPath,
        port: 8080,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
    ]
};