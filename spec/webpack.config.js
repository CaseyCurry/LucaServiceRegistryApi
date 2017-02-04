"use strict";

const applicationConfigs = require("../webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const configs = [];
configs.push({
  entry: ["mocha-loader!./spec/index.js"],
  devServer: {
    host: "localhost",
    port: 11999
  },
  devtool: "inline-sourcemap",
  plugins: [new HtmlWebpackPlugin({
    filename: "specs.html"
  })],
  module: {
    rules: [{
      test: /\.js/,
      exclude: [/node_modules/],
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
});

configs.push(...applicationConfigs);

module.exports = configs;
