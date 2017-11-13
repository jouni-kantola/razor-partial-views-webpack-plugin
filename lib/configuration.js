"use strict";

const targets = require("./targets");
const Header = require("./header");

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
        const usings = this._getUsings(rule.template.using);
        const model =
          rule.template.model &&
          `${this.target.attr.model} ${rule.template.model}`;

        const header = new Header(rule.template.header, usings, model);

        rule.template.header = header.format();
      }
      return rule;
    });
  }

  set rules(values) {
    _rules = Array.isArray(values) ? values : [];
  }

  _getUsings(usings) {
    const prefixUsing = using => `${this.target.attr.using} ${using}`;
    if (typeof usings === "string") return [prefixUsing(usings)];
    if (Array.isArray(usings)) return usings.map(prefixUsing);

    return "";
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
