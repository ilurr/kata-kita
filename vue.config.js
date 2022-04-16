const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: 'https://kbbi.kemdikbud.go.id/',
  // },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
})