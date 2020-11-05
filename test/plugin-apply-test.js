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

test.serial.cb("emit cshtml asset", t => {
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
        asset: path.join(__dirname, "_plugin-apply-entry.js")
      },
      output: {
        path: OUTPUT_PATH,
        publicPath: "/"
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

test.serial.cb("default generate templated assets", t => {
  const plugin = new RazorPartialViewsWebpackPlugin();

  webpack(
    {
      entry: {
        asset: path.join(__dirname, "_plugin-apply-entry.js")
      },
      output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/"
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

test.serial.cb("override default output location", t => {
  const outputLocation = path.join(OUTPUT_PATH, "override");
  const plugin = new RazorPartialViewsWebpackPlugin({
    rules: [
      {
        name: "asset",
        output: {
          path: outputLocation,
          emitAsset: false
        }
      }
    ]
  });

  const webpackVersion = !!webpack.version && +webpack.version[0];
  webpack(
    {
      entry: {
        asset: path.join(__dirname, "_plugin-apply-entry.js")
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename:
          webpackVersion >= 4
            ? "[name].[contenthash].js"
            : "[name].[chunkhash].js"
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

      const expected = `<script type="text/javascript" src="${file}"></script>${EOL}`;
      const asset = compilation.assets["asset.cshtml"];
      t.is(asset, undefined);

      const source = fs.readFileSync(
        path.join(outputLocation, "asset.cshtml"),
        "utf8"
      );

      t.is(source, expected);

      t.end();
    }
  );
});
