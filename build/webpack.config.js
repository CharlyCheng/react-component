const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: normalPath + 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        
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
        runtimeChunk: {
          name: 'manifest'
        },
        minimize: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false 
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true},
                    // 避免 cssnano 重新计算 z-index
                    safe: true
                },
                canPrint: false
            }) 
        ],
        splitChunks:{
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true,
          cacheGroups: {
            vendor: {
              name: 'vendor',
              chunks: 'initial',
              priority: -10,
              reuseExistingChunk: false,
              test: /[\\/]node_modules[\\/]/
            },
            'async-vendors': {
                test: /[\\/]node_modules[\\/]/,
                minChunks: 2,
                chunks: 'async',
                name: 'async-vendors'
            },
            styles: {
              name: 'styles',
              test: /\.(less|css)$/,
              chunks: 'all',
              minChunks: 1,
              reuseExistingChunk: true,
              enforce: true
            }
          }
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