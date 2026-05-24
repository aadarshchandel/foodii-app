// craco.config.js
module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add custom middleware here if needed
      return middlewares;
    },
  },
};