const webpack = require('webpack')

module.exports = {

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    ]
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {
    }
  },
  lintOnSave: false
};
