"use strict";

const defaultTarget = "csharp";

const targets = {
  [defaultTarget]: {
    lang: "C#",
    extension: "cshtml",
    attr: {
      model: "@model",
      using: "@using"
    }
  },
  vb: {
    lang: "VB",
    extension: "vbhtml",
    attr: {
      model: "@ModelType",
      using: "@Imports"
    }
  }
};

function resolve(target) {
  const defaultTarget = "csharp";
  const key =
    target && typeof target === "string" ? target.toLowerCase() : defaultTarget;
  return targets[key] || targets[defaultTarget];
}

module.exports = {
  resolve
};
