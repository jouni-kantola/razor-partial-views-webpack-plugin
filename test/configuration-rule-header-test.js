import test from "ava";
import { EOL } from "os";

import Configuration from "../lib/configuration";

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

test("model included in header", t => {
  const model = "a-model";

  const configuration = new Configuration(undefined, [
    {
      test: /asset/,
      template: {
        model
      }
    }
  ]);

  t.is(configuration.rules[0].template.header(), `@${model}${EOL}`);
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
    `${header}${EOL}@${model}${EOL}`
  );
});
