import test from "ava";
import { EOL } from "os";
import RazorPartialViewsWebpackPlugin from "../lib/plugin";

test.cb("emit cshtml asset", t => {
  const plugin = new RazorPartialViewsWebpackPlugin({
    rules: [
      {
        test: /asset/
      }
    ]
  });

  const compilation = {
    chunks: [
      {
        name: "asset",
        files: ["asset.js"]
      }
    ],
    assets: {
      "asset.js": {
        source: () => "contents of assets.js"
      }
    }
  };

  const done = () => {
    t.is(Object.keys(compilation.assets).length, 2);

    const asset = compilation.assets["asset.cshtml"];

    const expected = `<script type="text/javascript" src="/${
      compilation.chunks[0].files[0]
    }"></script>${EOL}`;
    t.is(asset.source(), expected);
    t.is(asset.size(), expected.length);
    t.end();
  };

  const compiler = {
    plugin: (event, doPluginWork) => {
      t.is(event, "emit");
      doPluginWork(compilation, done);
    }
  };

  plugin.apply(compiler);
});
