const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MONGO_URI: JSON.stringify(dotenv.parsed)
      }
    })
  ]
}