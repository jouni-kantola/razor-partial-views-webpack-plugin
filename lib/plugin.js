"use strict";

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");
const Configuration = require("./configuration");

class RazorPartialViewsWebpackPlugin extends TemplatedAssetsWebpackPlugin {
  constructor(options) {
    super(options);
    const config = new Configuration(options, this.rules.rules);
    this.rules.rules = config.rules;
  }

  apply(compiler) {
    super.apply(compiler);
  }
}

module.exports = RazorPartialViewsWebpackPlugin;
