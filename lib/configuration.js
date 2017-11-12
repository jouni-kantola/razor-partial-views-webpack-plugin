"use strict";

const csharp = {
  lang: "C#",
  extension: "cshtml",
  attr: {
    model: "@model",
    using: "@using"
  }
};

const vb = {
  lang: "VB",
  extension: "vbhtml",
  attr: {
    model: "@ModelType",
    using: "@Imports"
  }
};

let _rules;

class Configuration {
  constructor(opts, rules) {
    const options = typeof opts === "object" ? opts : {};
    this.target = this._getTargetLang(options);
    this.extension = this.target === vb.lang ? vb.extension : csharp.extension;
    this.rules = rules;
  }

  get rules() {
    return _rules.map(rule => {
      rule.output = rule.output || {};
      if (!rule.output.extension) {
        rule.output.extension = this.extension;
      }

      if (rule.template) {
        const configuredHeader =
          typeof rule.template.header === "function"
            ? rule.template.header()
            : rule.template.header;

        const header = configuredHeader ? `${configuredHeader}\n` : "";

        const model = rule.template.model ? `@${rule.template.model}\n` : "";

        const mergedHeader = `${header}${model}`;

        if (mergedHeader) {
          rule.template.header = () => {
            return mergedHeader;
          };
        }
      }
      return rule;
    });
  }

  set rules(values) {
    _rules = Array.isArray(values) ? values : [];
  }

  _getTargetLang(options) {
    const target = options.target || "C#";
    return typeof target === "string" && `${target}`.toUpperCase() == vb.lang
      ? vb.lang
      : csharp.lang;
  }
}

module.exports = Configuration;
