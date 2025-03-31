/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-05-10 18:44:52
 */
const { resolve } = require('./utils')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const proxyTarget = process.argv[2]
const publicPath = '/res/'
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: resolve('htdocs'),
    publicPath,
    compress: true,
    hot: true,
    https: true,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '**/*.json': {
        target: proxyTarget ? 'https://' + proxyTarget.replace(/^https?:\/\//, '') : 'http://10.1.18.73:4660',
        secure: false,
        cookieDomainRewrite: '',
        onProxyReq (proxyReq) {
          proxyReq.setHeader('Orgin', 'https://sales.tiqianle.com')
          proxyReq.setHeader('Host', 'sales.tiqianle.com')
        }
      }
    }
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  plugins: [
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format: chalk.green('[:bar]') + chalk.blue(':percent'),
      complete: '█'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: resolve('htdocs/res'),
        ignore: ['.*']
      }
    ])
  ]
}
