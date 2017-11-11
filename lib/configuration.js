"use sctrict";

const csharp = {
  lang: "C#",
  extension: "cshtml"
};

const vb = {
  lang: "VB",
  extension: "vbhtml"
};

class Configuration {
  constructor(target, rules) {
    this.target =
      typeof target === "string" && `${target}`.toUpperCase() == vb.lang
        ? vb.lang
        : csharp.lang;
    this.extension = this.target === vb.lang ? vb.extension : csharp.extension;
    if (rules)
      rules.forEach(rule => {
        if (!rule.output.extension) {
          rule.output.extension = this.extension;
        }
      });
  }
}

module.exports = Configuration;
