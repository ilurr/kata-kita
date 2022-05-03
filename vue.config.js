const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BASE_URL
    : '/'
})

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       fallback: {
//         "stream": require.resolve("stream-browserify"),
//         "crypto": require.resolve("crypto-browserify"),
//       },
//     },
//   },
//   transpileDependencies: true,
//   publicPath: process.env.NODE_ENV === 'production'
//     ? 'https://dummy.kompas.com/repo/game-kompla-dist/'
//     : '/'
// }
