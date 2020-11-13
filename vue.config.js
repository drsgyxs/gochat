module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/dev/',
  devServer: {
    port: 80,
    proxy: {
      '^/': {
        target: 'http://localhost:8080',
        changeOrigin: false,
      },
    },
  },
}
