const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') }).parsed || process.env;


module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        data: JSON.stringify(dotenv.MONGODB_URI)
      }
    })
  ]
}