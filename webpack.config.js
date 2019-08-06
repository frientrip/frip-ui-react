const path = require('path');
const DtsGeneratorPlugin = require('dts-generator-webpack-plugin').default;

module.exports = {
  entry: ['./src/js/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('ts-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new DtsGeneratorPlugin({
      name: 'frip-ui-react',
      main: 'frip-ui-react/js/index',
      project: './'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
};
