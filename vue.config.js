
module.exports = {
  // webpack-dev-server
  devServer: {
    host: 'localhost',
    port: 8090, // 端口号
    https: false,
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置自动启动浏览器
      '/site': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/site': ''
        }
      }
    }
  }
}
