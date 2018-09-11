const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: '../src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            {
                test: /\.styl$/, 
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.styl$/], // 添加styl文件的解析
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test:/\.js$/,
                include:path.resolve(__dirname, "src"),
                loader:"babel-loader",
                options:{
                  presets:[
                    "env",
                    "react",
                    "stage-2",
                  ],
                  plugins:[
                    [
                      "import",
                      {
                        libraryName:"antd",
                        style:'css',
                      },
                    ],
                    ["transform-decorators-legacy"],
                  ],
                },
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    // devtool: 'source-map',
    serve: {
        port: 3001,
        content: '../dist'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        hot: true
    }
}