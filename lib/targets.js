"use strict";

const targets = {
  csharp: {
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
  const key =
    target && typeof target === "string" ? target.toLowerCase() : "csharp";
  return targets[key];
}

module.exports = {
  resolve
};
