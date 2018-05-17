const path = require("path");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    libraryTarget: "commonjs2"
  },
  externals: {
    // STORYBOOK HACK
    // styled: {
    //   commonjs: 'styled-components',
    //   commonjs2: 'styled-components',
    //   amd: 'styled-components'
    // }
    'styled-component': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    }
  },
  module: {
    rules: [
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
  }
};
