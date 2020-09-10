const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const RazorPartialViewsWebpackPlugin = require("../");
const razorPartialViewsConfig = require("./razor-partial-views-config.js");

const publicPath = "https://test-cdn.com/assets";

module.exports = {
  entry: {
    vendor: ["is-thirteen"],
    app: path.join(__dirname, "app.js")
  },
  resolve: {
    modules: ["node_modules"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: publicPath,
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        styles: {
          name: "app-styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      exclude: ["manifest", "styles"],
      append: `\n//# sourceMappingURL=${publicPath}/[url]\n`
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false
    }),
    new RazorPartialViewsWebpackPlugin(razorPartialViewsConfig)
  ]
};
