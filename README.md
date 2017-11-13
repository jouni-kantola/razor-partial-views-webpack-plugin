# Razor Partial Views Webpack Plugin
Plugin for generating ASP.NET Razor partial views for assets built with webpack.

[![Build Status](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin.svg?branch=master)](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin)

## Usage
`razor-partial-views-webpack-plugin` takes a set of rules for creating `cshtml`/`vbhtml` views, wrapping assets built with webpack.

## Example configuration
```javascript
const webpack = require("webpack");
const path = require("path");

const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

module.exports = {
  entry: {
    vendor: ["jquery"],
    app: path.join(__dirname, "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "runtime"]
    }),
    new RazorPartialViewsWebpackPlugin({
      // "csharp" (default) or "vb"
      target: "chsharp",
      rules: [
        {
          // regex match asset filename(s)
          // (takes precedence over `name`)
          test: /(app|vendor).*\.js$/
        },
        {
          // match asset by name
          name: "runtime",
          // no attributes in `template` are required
          template: {
            // prepend header to view
            header: () => "<!-- auto generated -->",
            // usings in view
            using: ["System", "System.Web"],
            // view's model
            model: "dynamic",
            // append footer to view
            footer: () => `@* View generated ${new Date().toISOString()} *@`,
            // if needed, use a custom template
            path: path.join(__dirname, "templates/custom-template.tmpl"),
            // in custom template, find & replace placeholder
            // (default ##URL##/##SOURCE##)
            replace: /##CONTENT-GOES-HERE##/
          },
          // `output` not required, defaults to:
          // - webpack's output directory
          // - load asset by URL
          output: {
            inline: true,
            async: false,
            defer: false,
            // output view to custom location
            path: path.join(__dirname, "Views/_GeneratedViews")
          }
        }
      ]
    })
  ]
};
```

## Compiling views
When running your ASP.NET web site, the generated views will be compiled. Below follows a few tips to keep in mind:
- If you run into `Compiler Error Message: CS0103: The name 'model' does not exist in the current context`, this [Stack Overflow answer](https://stackoverflow.com/a/19696998) guides you in the right direction.
- If you're executing `razor-partial-views-webpack-plugin` on a build server, make sure you've included the generated views' output directory in the artifact.

## Installation
- `npm install razor-partial-views-webpack-plugin --save-dev`
- `yarn add razor-partial-views-webpack-plugin --dev`

`razor-partial-views-webpack-plugin` is an extension of `templated-assets-webpack-plugin`. For more configuration options and detailed control, use [templated-assets-webpack-plugin](https://github.com/jouni-kantola/templated-assets-webpack-plugin).

## Feedback
* For feedback, bugs or change requests, please use [Issues](https://github.com/jouni-kantola/razor-partial-views-webpack-plugin/issues).
* For direct contact, tweet [@jouni_kantola](https://twitter.com/jouni_kantola).
