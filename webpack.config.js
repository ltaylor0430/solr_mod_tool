/*
config for webpack. Will be used in
the Gruntfile for building our app.
Does not need gulp in order to do so,
but we use gulp to orchestrate
 */
var path = require("path");
var webpack = require("webpack");
module.exports = {

  output: {

    filename: 'bundle.js'
  },

  devtool: 'sourcemap',

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] },
      // required for bootstrap/font-awesome icons
      { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff" },
     {  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
           loader: "url?limit=10000&mimetype=application/font-woff"},
      { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      { test: /\.svg$/,    loader: "file-loader?prefix=font/" },
    ]
  },

  stylus: {
    use: [require('jeet')(), require('rupture')()]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })
  ]
};
