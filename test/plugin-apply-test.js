import path from "path";
import test from "ava";
import webpack from "webpack";
import { EOL } from "os";
import rimraf from "rimraf";
import fs from "fs";
import RazorPartialViewsWebpackPlugin from "../lib/plugin";

const OUTPUT_PATH = path.join(__dirname, "dist");

test.beforeEach.cb(t => {
  rimraf(OUTPUT_PATH, t.end);
});

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
        path: OUTPUT_PATH
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

      const [chunk] = compilation.chunks;
      const [file] = chunk.files;

      const expected = `<script type="text/javascript" src="/${file}"></script>${EOL}`;
      const asset = compilation.assets["asset.cshtml"];
      t.is(asset.size(), expected.length);

      const source = fs.readFileSync(
        path.join(OUTPUT_PATH, "asset.cshtml"),
        "utf8"
      );

      t.is(source, expected);

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
