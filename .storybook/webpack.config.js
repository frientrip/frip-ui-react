const path = require("path");
const webpackConfig = require("../webpack.config.js");

webpackConfig.externals = {
  styled: {
    commonjs: 'styled-components',
    commonjs2: 'styled-components',
    amd: 'styled-components'
  },
  'jsdom': 'window',
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': 'window',
  'react/addons': true,
}

module.exports = webpackConfig;
