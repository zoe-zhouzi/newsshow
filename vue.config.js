const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy: {
      "/api" : {
        // 跨域全局配置
        // 因为我们的项目全部的路径都要跨域
        // 本地打包的时候使用
        // target: "http://172.16.0.8:5001"
        // 本地测试使用线上数据库时候使用
        // target: "http://172.17.33.136:5001"
        target: "http://127.0.0.1:5001"
      },
    }
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "新闻展示"
    }
  }
})
