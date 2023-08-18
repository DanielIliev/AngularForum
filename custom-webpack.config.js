const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MONGO_URI: JSON.stringify(process.env.MONGO_URI)
      }
    })
  ]
}