const path = require("path");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    server: "./src/server.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".mjs", ".js"],
  },
  externals: [
    nodeExternals({
      additionalModuleDirs: [path.resolve("../node_modules")],
    }),
  ],
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve("./tsconfig.json"),
        configOverwrite: {
          compilerOptions: {
            module: "CommonJS",
            skipLibCheck: true,
          },
          include: [path.resolve(`src/**/*`)],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: 3,
                modules: false,
                targets: {
                  node: "14",
                },
              },
            ],
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },
      },
    ],
  },
};
