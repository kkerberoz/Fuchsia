module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 3000,
    https: false,
    hotOnly: false,
  },
};
