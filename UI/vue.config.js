/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
require('events').EventEmitter.defaultMaxListeners = 0
const webpack = require('webpack')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  // publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  filenameHashing: true,
  assetsDir: 'src/assets',
  indexPath: 'index.html',
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src")) //解决eslint不使用变量报错问题
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //忽略monent/locale下的所有文件
    config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /monment$/))
  },
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      }, ],
    },
  },
  devServer: {
    port: 9090,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    hotOnly: true,
    https: false,
    proxy: {
      "/auth/users": {
        target: "http://xxxxxx.com.cn",
        secure: false,
        changeOrigin: true
      },
      "/users": {
        target: "http://vvvvvvv.com.cn:8686",
        secure: false,
        ws: true,
      },
      "/ids/manager": {
        target: "http://10.7.235.231:8080",
        secure: true,
        changeOrigin: true,
      },
      "/portal": {
        target: 'https://ssss.com.cn',
        secure: false,
        changeOrigin: true
      },
      "/api": {
        target: "http://10.9.183.183:8000",
        secure: true,
        changeOrigin: true,
      }
    }
  }
}