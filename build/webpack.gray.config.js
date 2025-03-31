// 灰度放量-webpack配置文件
const webpack = require('webpack')
const crypto = require('crypto')
const { resolve } = require('./utils')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const seen = new Set()
const nameLength = 4

module.exports = {
  mode: 'production',
  devtool: false,
  output: {
    publicPath: 'https://gray-cres.lexinph.com/puhui-sales-all/', // 灰度CDN地址
    filename: 'js/[name]-[chunkhash:10].js',
    chunkFilename: 'js/[name]-[chunkhash:10].js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if (modules.length > 1) {
        const joinedHash = crypto
          .createHash('md5')
          .update(modules.map((m) => m.id).join('-'))
          .digest('hex')
        let len = nameLength
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return joinedHash.substr(0, len)
      } else {
        return modules[0].id
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\.js$/,
        attribute: 'crossorigin',
        value: 'anonymous'
      },
      inline: /runtime\..*\.js$/
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!js', '!js/base*.js']
    }),
    new webpack.DllReferencePlugin({
      // 跟dll.config里面DllPlugin的context一致
      context: process.cwd(),
      // dll过程生成的manifest文件
      manifest: require(resolve('src/assets/file/base-manifest.json'))
    }),
    new HtmlWebpackTagsPlugin({
      append: false,
      tags: [{ path: 'js', glob: 'base*.js', globPath: resolve('src/assets/js') }]
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: resolve('htdocs/res'),
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../lexiang-sso-b302f4bd.txt'),
        to: resolve('htdocs')
      },
      {
        from: path.resolve(__dirname, '../lexiang-sso-63ac4e66.txt'),
        to: resolve('htdocs')
      },
      {
        from: resolve('src/assets/js'),
        to: resolve('htdocs/res/js')
      }
    ])
  ]
}
