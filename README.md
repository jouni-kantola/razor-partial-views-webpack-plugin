# Razor Partial Views Webpack Plugin
Plugin for generating ASP.NET Razor partial views for assets built with webpack.

[![Build Status](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin.svg?branch=master)](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin)

## Usage
`razor-partial-views-webpack-plugin` use rules for creating `cshtml`/`vbhtml` views wrapping assets built with webpack. With the plugin comes templates for scripts and styles, but any type of asset can be used as Razor view source.

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
            header: () => "<!-- a header -->",
            // usings in view
            using: ["System", "System.Web"],
            // view's model
            model: "dynamic",
            // append footer to view
            footer: () => `@* View generated ${new Date().toISOString()} *@`,
            // if needed, use a custom template
            path: path.join(__dirname, "templates/custom-template.tmpl"),
            // in custom template, placeholder to find & replace with asset
            // (default ##URL##/##SOURCE##)
            replace: /##CONTENT-GOES-HERE##/
          },
          // `output` not required, defaults to:
          // - webpack's output directory
          // - load asset by URL
          // - asset name from chunk name/filename
          output: {
            inline: true,
            async: false,
            defer: false,
            // assign predicable name to generated partial view
            name: (defaultName) => `generated-${defaultName}`
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

## Example
Included in the plugin repository is an example webpack setup where various [rules](https://github.com/jouni-kantola/razor-partial-views-webpack-plugin/blob/master/example/razor-partial-views-config.js) are used. By executing `npm run example`, partial views are created e.g. for inlining CSS and webpack's runtime.

## Feedback
* For feedback, bugs or change requests, please use [Issues](https://github.com/jouni-kantola/razor-partial-views-webpack-plugin/issues).
* For direct contact, tweet [@jouni_kantola](https://twitter.com/jouni_kantola).
