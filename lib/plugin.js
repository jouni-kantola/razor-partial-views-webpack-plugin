"use strict";

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");
const Configuration = require("./configuration");

class RazorPartialViewsWebpackPlugin extends TemplatedAssetsWebpackPlugin {
  constructor(options) {
    super(options);
    const config = new Configuration(options, this.pluginOptions.rules);
    this.pluginOptions.rules = config.rules;
    this.pluginName = "RazorPartialViewsWebpackPlugin";
  }

  apply(compiler) {
    super.apply(compiler);
  }
}

module.exports = RazorPartialViewsWebpackPlugin;
