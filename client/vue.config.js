"use strict";
const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },
};
