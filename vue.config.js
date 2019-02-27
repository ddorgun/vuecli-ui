module.exports = {
  devServer: {
    proxy: {
      '/backend/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/backend/api': '',
        },
      },
    },
  },
};
