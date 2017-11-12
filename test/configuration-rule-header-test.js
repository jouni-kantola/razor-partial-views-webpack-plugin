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

  t.is(configuration.rules[0].template.header(), header);
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

  t.is(configuration.rules[0].template.header(), header);
});
