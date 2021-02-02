const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 9000,
    hot: true,
  },
})
