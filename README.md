# Razor Partial Views Webpack Plugin
Plugin for generating ASP.NET Razor partial views for assets built with webpack.

[![Build Status](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin.svg?branch=master)](https://travis-ci.org/jouni-kantola/razor-partial-views-webpack-plugin)

## Example configuration
```javascript
module.exports = {
  target: "chsharp", // csharp or vb
  rules: [
    {
      name: "manifest", // match by name
      test: /manifest.*\.js$/, // ...or with regex
      template: {
        header: () => "top of view", // prepend to view
        using: ["namespace1", "namespace2"], // if needed, usings used in view
        model: "MyViewModel", // view's model
        footer: () => "bottom of view", // append to view
        path: path.join(__dirname, "tmpl/inline.tmpl"), // if needed, custom template
        replace: "##HULAHULA##" // if custom template, what to replace
      },
      output: {
        inline: true // href, defer, async, inline
      }
    }
  ]
};
```