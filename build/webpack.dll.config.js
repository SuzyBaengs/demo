/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-05-10 18:45:40
 */
const { resolve } = require('./utils')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    base: ['vue', 'vue-router', 'vuex', 'axios']
  },
  output: {
    path: resolve('htdocs/res/js'),
    filename: '[name]-[hash:10].js',
    library: 'G_SALES_GLOBE'
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['base*.{js,txt}']
    }),
    new webpack.DllPlugin({
      // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
      context: process.cwd(),
      // manifest.json文件的输出位置
      path: resolve('src/assets/file/[name]-manifest.json'),

      // 定义打包的公共vendor文件对外暴露的函数名
      name: 'G_SALES_GLOBE'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: resolve('htdocs/res'),
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
}
