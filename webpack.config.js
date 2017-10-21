const webpack = require('webpack'); //to access built-in plugins
const ConsoleLogOnBuildWebpackPlugin = require('./consolelogonbuildwebpackplugin')

const config = {
  
  // Source maps support ('inline-source-map' also works) 
  devtool: 'source-map',
  plugins: [
    new ConsoleLogOnBuildWebpackPlugin({options:'none'})
  ]
};

module.exports = config;
