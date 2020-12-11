module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ["taro-ui"],
    devServer: {
      proxy: {
        "/service/": {
          target: "https://www.polypite.com",
          changeOrigin: true,
        }
      }
    }
  }
};
