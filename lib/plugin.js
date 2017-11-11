"use strict";

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");
const Configuration = require("./configuration");

class RazorPartialViewsWebpackPlugin extends TemplatedAssetsWebpackPlugin {
  constructor(opts) {
    super(opts);
    const config = new Configuration(opts.target, this.rules.rules);
  }

  apply(compiler) {
    super.apply(compiler);
  }
}

module.exports = RazorPartialViewsWebpackPlugin;
