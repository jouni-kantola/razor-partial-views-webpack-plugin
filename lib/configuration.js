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
        if (rule.template.header) {
          const configuredHeader = rule.template.header;
          rule.template.header = () => {
            return typeof configuredHeader === "function"
              ? configuredHeader()
              : configuredHeader;
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
