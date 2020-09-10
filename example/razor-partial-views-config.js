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
      test: /runtime/,
      template: {
        path: path.join(__dirname, "tmpl/runtime.tmpl"),
        replace: "##HERE_GOES_RUNTIME##"
      },
      output: {
        name: "runtime-view",
        inline: true
      }
    }
  ]
};
