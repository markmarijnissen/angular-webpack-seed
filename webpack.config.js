var webpack = require("webpack");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
//var AngularPlugin = require('angular-webpack-plugin');
var path = require('path');

// Commandline arguments
// 
//--env=XXX: sets a global ENV variable 
//--minify:  minifies output
//--hot:     enable Hot Module Replacement
var argv = require('optimist')
            .alias('e','env').default('e','dev')
            .alias('m','minify')
            .argv;

var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;

var config = {
  entry:{
    'main':['main'],  // Contains app code
    'libs':'libs'     // Contains all libraries
  },
  output:{
    // Paths
    path: path.resolve('dist'),
    publicPath: '',
    
    // Filenames
    filename:"[name].bundle.js",
    chunkFilename: "[name].[id].js",

    // Hot Module Replacement settings:
    hotUpdateMainFilename: "[hash]/update.json",
    hotUpdateChunkFilename: "[hash]/js/[id].update.js"
  },
  resolve: {
      // All source is relative to 'src' directory
      root: path.resolve('src'),

      // Alias Angular modules to filenames (or bower_components)
      // This way, AngularPlugin can automatically require files 
      // based on angular modules.
      alias: {
        //'ui.router':'angular-ui-router'
      },

      // Check NPM and Bower for components.
      modulesDirectories: ["node_modules", "web_modules","bower_components"]
  },
  module:{
    loaders:[
      // Support for *.json files.
      { test: /\.json$/,                    loader: "json-loader" },
      // Support for CSS (with hot module replacement)
      { test: /\.css$/,                     loader: "style-loader!css-loader" },
      // Support for LESS (with hot module replacement)
      { test: /\.less$/,                    loader: "style-loader!css-loader!less-loader" },
      // Copy all assets in to asset folder (use hash filename)
      { test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/,      loader: "file-loader?name=assets/[hash].[ext]" },
      // Load all *.jade as templates
      { test: /(?!\.html)\.jade$/,          loader: "jade-loader" },
      // Copy all .html.jade as static html files (keep filename)
      { test: /index[a-z-]*\.html\.jade$/,  loader: "file-loader?name=[path][name]&context=./src!jade-html-loader" },
      // Copy all .html as static file (keep filename)
      { test: /index[a-z-]*\.html$/,        loader: "file-loader?name=[path][name].html&context=./src" },
    ]
  },
  plugins:[
    // Add Bower support
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),

    // Add Angular support (annotate for minification)
    new ngAnnotatePlugin({add: true}),
    //new AngularPlugin(),
    
    // Optimize output; dedupe 
    new webpack.optimize.DedupePlugin(),
    
    // Optimize output; group libraries in seperate file
    new webpack.optimize.CommonsChunkPlugin('libs','libs.bundle.js',['main'],Infinity),
    
    // Set global 'ENV' variable to support multiple builds 
    new webpack.DefinePlugin({
      ENV: JSON.stringify(argv.env)
    }),
  ],
  node: {
    fs: "empty"  // required for jade-html-loader to work
  },
  devServer: {
    publicPath: '/'
  },
  devtool: isDevServer?'#eval':undefined,
  recordsPath: path.resolve('.webpack.json')
};

// Add 'dev-server' snippet to communicate with webpack-dev-server
// (also supports hot module replacement)
if(isDevServer){
  config.entry.main.unshift('dev-server');
  //config.plugins.push(new webpack.HotModuleReplacementPlugin()); // use --hot command line arguement for now!
}

// Modify config for production / minification
if(argv.minify){

  // Remove sourcemaps
  delete config.devtool;

  // Add UglifyJS
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle:true,
    compress:{
      drop_console:true
    },
    output: {
      comments: false
    }
  }));

  // Optimize OccuranceOrder
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true)
  );
}

module.exports = config;