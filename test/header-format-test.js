import test from "ava";

import Header from "../lib/header";

const EOL = "\n";

test("default to blank header", t => {
  const header = new Header();
  const formatter = header.format();
  t.is(formatter, "");
});

test("header from function to wrapping function", t => {
  const configuredHeader = () => "a-header";

  const header = new Header(configuredHeader);
  const formatter = header.format();

  t.is(formatter(), `${configuredHeader()}${EOL}`);
});

test("model included in header", t => {
  const model = "a-model";

  const header = new Header(undefined, undefined, model);
  const formatter = header.format();

  t.is(formatter(), `${model}${EOL}`);
});

test("usings included in header", t => {
  const usings = ["a-using", "another-using"];

  const header = new Header(undefined, usings, undefined);
  const formatter = header.format();

  t.is(formatter(), `${usings[0]}${EOL}${usings[1]}${EOL}`);
});
