const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

/**
 * 页面入口方法
 * @param {String} [defPath=''] 指定路径
 */
function entrys (defPath = '') {
  const views = resolve('src/views')
  let entrys
  if (defPath) {
    entrys = glob.sync(views + defPath + '/**/**/entry.js')
  } else {
    entrys = glob.sync(views + '/**/**/entry.js')
  }
  const maps = {}
  entrys.forEach(v => {
    const name = path.dirname(path.relative(views, v)).split(/[/\\]/).join('.')
    maps[name] = v
  })
  return maps
}

function htmlPlugins (dev) {
  const arr = []
  const entryMap = entrys()
  Object.keys(entryMap).forEach(v => {
    const filename = v.split('.').join('/')
    arr.push(new HtmlWebpackPlugin({
      filename: resolve(`htdocs/res/entry/${filename}.html`),
      template: resolve('src/assets/file/template.html'),
      inject: true,
      chunks: [v],
      // eslint-disable-next-line multiline-ternary
      minify: dev ? {} : {
        // 详见：https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      alwaysWriteToDisk: true
    }))
  })
  return arr
}
module.exports = {
  resolve,
  entrys,
  htmlPlugins
}
