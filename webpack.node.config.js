/*
config for webpack. Will be used in
the Gruntfile for building our app.
Does not need gulp in order to do so,
but we use gulp to orchestrate
 */
"use strict";
var webpack = require("webpack");
var fs = require('fs');
var path = require('path');
var nodeModules = {};
//do not bundle node modules with the backend using webpack

fs.readdirSync('node_modules')
   .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
   })
   .forEach(function(mod) {
    nodeModules[mod] = 'commonjs  ' + mod;
    });
   console.log(nodeModules);
module.exports = {

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
   filename: 'serverEntryPoint.js'
  },
  node: {
    __dirname:true,
    __filename:true,
    console: true,
  },
 externals: nodeModules,
  target : 'node',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] },
      { test: /\.json$/,   loader: 'json-loader'}
    ]
  }

};
