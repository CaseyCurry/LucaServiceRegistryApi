"use strict";

const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = [{
  name: "host",
  context: __dirname,
  target: "node",
  entry: ["./src/host.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "host.js"
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
}];
