const path = require("path");
const webpackConfig = require("../webpack.config.js");

webpackConfig.externals = {
  styled: {
    commonjs: 'styled-components',
    commonjs2: 'styled-components',
    amd: 'styled-components'
  }
}

module.exports = webpackConfig;
