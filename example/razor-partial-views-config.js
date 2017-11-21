const path = require("path");

module.exports = {
  target: "csharp",
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
        name: defaultName => defaultName.split(".")[0]
      }
    },
    {
      test: /manifest.json$/,
      template: {
        path: path.join(__dirname, "tmpl/chunk-manifest.tmpl")
      },
      replace: "##MANIFEST##",
      output: {
        name: "chunk-manifest",
        extension: "cshtml",
        prefix: "__",
        inline: true
      }
    }
  ]
};
