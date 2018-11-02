const path = require("path");

module.exports = {
  entry: ["./src/js/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    libraryTarget: "commonjs2"
  },
  externals: {
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("ts-loader"),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: ["svg-inline-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
};
