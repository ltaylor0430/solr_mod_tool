'use strict';
module.exports = function (grunt) {
   // Automatically load required Grunt tasks
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var paths = {
  entry: './client/app/app.js',
  app: ['client/app/**/*.{js,styl,html}'],
  js: 'client/app/**/*!(.spec.js).js',
  styl:['client/app/**/*.styl', 'client/style/**/*.styl'],
  toCopy: ['client/index.html'],
  html: ['client/index.html', 'client/app/**/*.html'],
  dest: 'dist'
};
var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var path = require("path");
  // Define the configuration for all the tasks
grunt.initConfig({

  /*
  simple task to copy over needed files to dist
   */
  copy: {
      html: {
        expand:true,
        src: paths.toCopy,
        flatten:true,
        dest:paths.dest
      },
   },
  /*
  task to watch files for changes and call build and copy tasks
   */
    watch: {
        html: {
          files:paths.app,
          tasks:'webpack:build-dev'
        },
      index: {
        files:paths.toCopy,
        tasks: 'copy'
      }

  },

      //Todo task
    todo: {
        options: {
          file:'todo_report.md',
          githubBoxes:true,
          colophon:true,
          usePackage:true
        },
        dist:['app/**/*']

    },
  webpack: {
      //options for all builds

      options: webpackConfig,

      build: {
        entry: paths.entry,
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },

      "build-dev": {
        devtool: "sourcemap",
        debug: true
      }
    },

    "webpack-dev-server": {
      options: {

        webpack: webpackConfig,
        publicPath:"/",
        proxy: {'/build/*' : {
                target:'http://localhost:3000',
                secure:false
               }
       },
        contentBase: path.join(__dirname,paths.dest),
        port:9001
      },
      start: {


        webpack: {
          entry: paths.entry,
          devtool:"eval",
          keepAlive: true,
          debug: true
        }
      }
    },
});

   grunt.registerTask('default', [
    'build',
    'copy',
    'webpack-dev-server:start',
    'watch'
  ]);
 grunt.registerTask('build', ['todo']);


};
