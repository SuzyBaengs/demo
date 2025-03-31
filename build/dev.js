const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')

const devServerConfig = devConfig.devServer
const compiler = webpack(merge(baseConfig(devConfig.mode), devConfig))
const server = new WebpackDevServer(compiler, devServerConfig)
server.listen(devServerConfig.port, devServerConfig.host, () => {
  // console.log(`Starting server on https://${devServerConfig.host}:${devServerConfig.port}`)
})
