"use strict";

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");

class RazorPartialViewsWebpackPlugin extends TemplatedAssetsWebpackPlugin {
  constructor(opts) {
    super(opts);
  }

  apply(compiler) {
    super.apply(compiler);
  }
}

module.exports = RazorPartialViewsWebpackPlugin;
