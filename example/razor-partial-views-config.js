const path = require("path");

module.exports = {
  rules: [
    {
      name: ["app"],
      output: {
        defer: true
      }
    },
    {
      test: /\.css$/,
      template: {
        // prepend header to view
        header: () => "<!-- a header -->",
        // usings in view
        using: ["System", "System.Web"],
        // view's model
        model: "dynamic",
        // append footer to view
        footer: () => `@* View generated ${new Date().toISOString()} *@`
      },
      output: {
        name: defaultName => defaultName.split(".")[0],
        inline: true
      }
    },
    {
      name: "manifest",
      template: {
        model: "dynamic"
      },
      output: {
        inline: true
      }
    },
    {
      test: /manifest\.json$/,
      template: {
        path: path.join(__dirname, "tmpl/chunk-manifest.tmpl"),
        replace: "##MANIFEST##"
      },
      output: {
        name: "chunk-manifest",
        inline: true
      }
    }
  ]
};
