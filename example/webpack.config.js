const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const RazorPartialViewsWebpackPlugin = require("../");
const razorPartialViewsConfig = require("./razor-partial-views-config.js");

module.exports = {
  entry: {
    app: path.join(__dirname, "app.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "https://test-cdn.com/assets",
    filename: "[name].[contenthash].js"
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
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        defaultStyles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      ignoreOrder: false
    }),
    new RazorPartialViewsWebpackPlugin(razorPartialViewsConfig)
  ]
};
