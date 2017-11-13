# Razor Partial Views Webpack Plugin
Plugin for generating ASP.NET Razor partial views for assets built with webpack.

[![Build Status](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin.svg?branch=master)](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin)

## Installation
- `npm install razor-partial-views-webpack-plugin --save-dev`
- `yarn add razor-partial-views-webpack-plugin --dev`

## Usage
`razor-partial-views-webpack-plugin` takes a set of rules for creating `cshtml`/`vbhtml` files wrapping assets built with webpack.

## Example configuration
```javascript
// webpack.config.js
const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

const razorViewsConfig = {
  target: "chsharp", // "csharp" (default) or "vb"
  rules: [
    {
      name: "manifest", // match by asset name
      test: /manifest.*\.js$/, // ...or filename with regex (takes precedence)

      template: {
        // none of the attributes in `template` are required
        header: () => "<!-- top of view -->", // prepend to view
        // usings for view
        using: ["namespace1", "namespace2"],
        // view's model
        model: "MyViewModel",
        // append to view
        footer: () => "\n<!-- bottom of view -->",
        // if needed, use your own custom template
        path: path.join(__dirname, "tmpl/inline.tmpl"),
        // in custom template, what placeholder to find & replace
        // default "##URL##" or "##SOURCE##"
        replace: "##HULAHULA##"
      },
      output: {
        // if not specified URL to asset (including `publicPath`)
        // if none specified, defaults to sync asset
        inline: true
        // async: true
        // defer: true
      }
    }
  ]
};

module.exports = {
  /* ... */
  plugins: [new RazorPartialViewsWebpackPlugin(razorViewsConfig)]
};

```

`razor-partial-views-webpack-plugin` is an extension of `templated-assets-webpack-plugin`. For richer configuration options and more detailed control, use [templated-assets-webpack-plugin](https://github.com/jouni-kantola/templated-assets-webpack-plugin).

## Feedback
* For feedback, bugs or change requests, please use [Issues](https://github.com/jouni-kantola/razor-partial-views-webpack-plugin/issues).
* For direct contact, tweet [@jouni_kantola](https://twitter.com/jouni_kantola).
