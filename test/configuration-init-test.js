import test from "ava";

import Configuration from "../lib/configuration";

test("default to target C#", t => {
  const config = new Configuration();

  t.is(config.target, "C#");
  t.is(config.extension, "cshtml");
});

test("can set target in anycase", t => {
  const config = new Configuration("vB");

  t.is(config.target, "VB");
  t.is(config.extension, "vbhtml");
});

test("can set target VB", t => {
  const config = new Configuration("VB");

  t.is(config.target, "VB");
  t.is(config.extension, "vbhtml");
});
