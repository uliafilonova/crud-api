const path = require("path");

const config = {
  entry: "./src/app.ts",
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/", "/build/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};
module.exports = () => {
  return config;
};