module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "https://fuchsia-server-skhuzjjwua-uc.a.run.app",
        ws: true,
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },
  entry: {
    app: ["./src/main.js"],
  },
};
