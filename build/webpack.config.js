const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const normalPath = `${__dirname}/../`;

module.exports = {
    mode: 'development',
    entry: normalPath + 'src/index.js',
    output: {
        path: path.resolve( normalPath, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: normalPath + 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        // new BundleAnalyzerPlugin()
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
                include: path.resolve(normalPath, "src"),
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
        contentBase: path.join(normalPath, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        hot: true
    }
}