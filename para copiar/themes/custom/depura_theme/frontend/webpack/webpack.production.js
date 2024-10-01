const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { cleanDistFolders } = require("./webpack.parts");
const { merge } = require("webpack-merge");

exports.productionConfig = () =>
  merge(
    {
      devtool: "hidden-source-map",
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: 2015,
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
          new CssMinimizerPlugin(),
        ],
      },
    },
    cleanDistFolders()
  );
