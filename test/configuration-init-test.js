import test from "ava";

import Configuration from "../lib/configuration";

test("default to target C#", t => {
  const config = new Configuration();

  t.is(config.target, "C#");
  t.is(config.extension, "cshtml");
});

test("can set target in anycase", t => {
  const options = { target: "vB" };
  const config = new Configuration(options);

  t.is(config.target, "VB");
  t.is(config.extension, "vbhtml");
});

test("can set target VB", t => {
  const options = { target: "VB" };
  const config = new Configuration(options);

  t.is(config.target, "VB");
  t.is(config.extension, "vbhtml");
});
