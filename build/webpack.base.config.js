const { resolve, entrys, htmlPlugins } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
  const BUILD_ENV = process.argv[process.argv.length - 1] || 'production'
  const dev = env === 'development'
  return {
    entry: entrys(),
    output: {
      path: resolve('htdocs/res'),
      crossOriginLoading: 'anonymous'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                formatter: require('eslint-friendly-formatter')
              }
            }
          ],
          include: [resolve('src')]
        },
        {
          test: /\.vue$/,
          use: ['thread-loader', 'vue-loader']
        },
        {
          test: /\.js$/,
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ],
          include: [resolve('src')]
        },
        {
          test: /\.css$/,
          use: [dev ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: [
            dev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [resolve('src/assets/style/variables.less')]
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                fallback: 'file-loader',
                esModule: false,
                name: dev ? 'img/[name].[ext]' : 'img/[contenthash].[ext]'
              }
            }
          ]
        },
        { test: /\.(woff|ttf|eot|TTF)/, loader: 'file-loader?name=fonts/[name].[ext]' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_PRODUCTION_ENV: JSON.stringify(!dev),
        IS_PRODUCTION_BUILD_ENV: JSON.stringify(BUILD_ENV === 'production')
      }),
      new VueLoaderPlugin(),

      new MiniCssExtractPlugin({
        filename: dev ? 'css/[name].css' : 'css/[name]-[contenthash:10].css',
        chunkFilename: dev ? 'css/[name].css' : 'css/[name]-[contenthash:10].css'
      }),

      new OptimizeCSSAssetsPlugin(),

      ...htmlPlugins(dev),

      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: resolve('htdocs/res'),
          ignore: ['.*']
        }
      ]),

      new FriendlyErrorsPlugin()
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ],
      runtimeChunk: 'single',
      mergeDuplicateChunks: true,
      namedChunks: true,
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '--',
        name: dev,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    }
  }
}
