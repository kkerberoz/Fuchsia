module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/api/*": {
        target: "https://fuchsia-server-skhuzjjwua-uc.a.run.app",
        ws: true,
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },
};
