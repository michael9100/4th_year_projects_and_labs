module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'http://localhost:3001'
      },
    },
  },
}