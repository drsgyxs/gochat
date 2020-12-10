module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/dev/',
  devServer: {
    port: 80,
    proxy: {
      '^/api/v1/kuwo': {
        target: 'http://www.kuwo.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/kuwo': '/',
        },
      },
      '^/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'GoChat'
      return args
    })
  },
}
