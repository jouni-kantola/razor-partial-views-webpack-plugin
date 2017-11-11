"use strict";

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");

class RazorPartialViewsWebpackPlugin extends TemplatedAssetsWebpackPlugin {
  constructor(opts) {
    super(opts);
    const rules = this.rules.rules;
    rules.forEach(rule => (rule.output.extension = "cshtml"));
  }

  apply(compiler) {
    super.apply(compiler);
  }
}

module.exports = RazorPartialViewsWebpackPlugin;
