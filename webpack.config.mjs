
import path from "path";
const config = {
  entry: "./src/app.ts",
  target: 'node',
  output: {
    filename: 'app.cjs',
    path: path.resolve("./build")
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
export default config;


