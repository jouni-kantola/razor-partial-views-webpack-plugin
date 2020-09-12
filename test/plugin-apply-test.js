import path from "path";
import test from "ava";
import webpack from "webpack";
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

  webpack(
    {
      entry: {
        asset: path.join(__dirname, "plugin-apply-test-entry.js")
      },
      output: {
        path: path.join(__dirname, "dist")
      },
      plugins: [plugin]
    },
    (err, stats) => {
      if (err) {
        return t.end(err);
      } else if (stats.hasErrors()) {
        return t.end(stats.toString());
      }

      const { compilation } = stats;

      const expected = `<script type="text/javascript" src="/${compilation.chunks[0].files[0]}"></script>${EOL}`;

      const asset = compilation.assets["asset.cshtml"];
      t.is(asset.source(), expected);
      t.is(asset.size(), expected.length);

      t.end();
    }
  );
});

test.cb("default generate templated ", t => {
  const plugin = new RazorPartialViewsWebpackPlugin();

  webpack(
    {
      entry: {
        asset: path.join(__dirname, "plugin-apply-test-entry.js")
      },
      output: {
        path: path.join(__dirname, "dist")
      },
      plugins: [plugin]
    },
    (err, stats) => {
      if (err) {
        return t.end(err);
      } else if (stats.hasErrors()) {
        return t.end(stats.toString());
      }

      const { compilation } = stats;

      const expected = `<script type="text/javascript" src="/${compilation.chunks[0].files[0]}"></script>${EOL}`;

      const asset = compilation.assets["asset.cshtml"];
      t.is(asset.source(), expected);
      t.is(asset.size(), expected.length);

      t.end();
    }
  );
});
