import test from "ava";

import targets from "../lib/targets";

test("default to target C#", t => {
  const target = targets.resolve();

  t.is(target.lang, "C#");
  t.is(target.extension, "cshtml");
});

test("non-match fallback to C#", t => {
  const target = targets.resolve("no-match");

  t.is(target.lang, "C#");
  t.is(target.extension, "cshtml");
});

test("can set target in anycase", t => {
  const target = targets.resolve("vB");

  t.is(target.lang, "VB");
  t.is(target.extension, "vbhtml");
});

test("can set target C#", t => {
  const target = targets.resolve("csharp");

  t.is(target.lang, "C#");
  t.is(target.extension, "cshtml");
});
