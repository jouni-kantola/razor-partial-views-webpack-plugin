"use strict";

const targets = require("./targets");

let _rules;

class Configuration {
  constructor(opts, rules) {
    const options = typeof opts === "object" ? opts : {};
    this.target = targets.resolve(options.target || "");
    this.rules = rules;
  }

  get rules() {
    return _rules.map(rule => {
      rule.output = rule.output || {};
      if (!rule.output.extension) {
        rule.output.extension = this.target.extension;
      }

      if (rule.template) {
        const configuredHeader =
          typeof rule.template.header === "function"
            ? rule.template.header()
            : rule.template.header;

        const header = configuredHeader ? `${configuredHeader}\n` : "";

        const configuredUsings = Array.isArray(rule.template.usings)
          ? rule.template.usings
          : [];

        const usings = configuredUsings.length
          ? configuredUsings.reduce(
              (usings, using) =>
                `${usings}${this.target.attr.using} ${using}\n`,
              ""
            )
          : "";

        const model = rule.template.model
          ? `${this.target.attr.model} ${rule.template.model}\n`
          : "";

        const mergedHeader = `${header}${usings}${model}`;

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

  _getTarget(options) {
    const targetLang =
      options.target && typeof options.target === "string"
        ? options.target
        : "csharp";

    const target = targets[targetLang.toLowerCase()];
    return target ? target : targets.csharp;
  }
}

module.exports = Configuration;
