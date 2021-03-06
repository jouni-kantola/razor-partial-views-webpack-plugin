import test from "ava";

import Configuration from "../lib/configuration";

const EOL = "\n";

test("header not required", t => {
  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {}
    }
  ]);

  t.falsy(configuration.rules[0].template.header);
});

test("header to function", t => {
  const header = "a-header";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        header
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `${header}${EOL}`);
});

test("header from function to wrapping function", t => {
  const header = "a-header";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        header: () => header
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `${header}${EOL}`);
});

test("@model included in header", t => {
  const model = "a-model";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        model
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `@model ${model}${EOL}`);
});

test("@ModelType included in header for target VB", t => {
  const model = "a-model";

  const configuration = new Configuration({ target: "VB" }, [
    {
      test: /asset/,
      template: {
        model
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `@ModelType ${model}${EOL}`);
});

test("header configuration before model", t => {
  const header = "a-header";
  const model = "a-model";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        header: () => header,
        model
      }
    }
  ]);

  t.is(
    configuration.rules[0].template.header(),
    `${header}${EOL}@model ${model}${EOL}`
  );
});

test("single using ok", t => {
  const using = "a-using";
  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        using
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `@using ${using}${EOL}`);
});

test("@using(s) included in header", t => {
  const usings = ["a-using", "another-using"];
  const expected = `@using ${usings[0]}${EOL}@using ${usings[1]}${EOL}`;
  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        using: usings
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), expected);
});

test("@Import(s) included in header", t => {
  const usings = ["a-using", "another-using"];
  const expected = `@Imports ${usings[0]}${EOL}@Imports ${usings[1]}${EOL}`;
  const configuration = new Configuration({ target: "VB" }, [
    {
      test: /asset/,
      template: {
        using: usings
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), expected);
});

test("usings in the middle", t => {
  const header = "a-header";
  const usings = ["a-using", "another-using"];
  const model = "a-model";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        header: () => header,
        using: usings,
        model
      }
    }
  ]);

  t.is(
    configuration.rules[0].template.header(),
    `${header}
@using ${usings[0]}
@using ${usings[1]}
@model ${model}
`
  );
});
