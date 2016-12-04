var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '/app',
  entry: {
  	main: './js/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/app'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, //Check for all JS files
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: __dirname + '/dist/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: {
          glob:  __dirname + '/app/images/**/*',
          dot: true
        },
        to: __dirname + '/dist'
      },
      { from: __dirname + '/app/decoder.min.js', to:  __dirname + '/dist/' },
      { from: __dirname + '/app/manifest.json', to:  __dirname + '/dist/' },
      { from: __dirname + '/app/sw.js', to:  __dirname + '/dist/' },
      { from: __dirname + '/CNAME', to:  __dirname + '/dist/' },
      { from: __dirname + '/robots.txt', to:  __dirname + '/dist/' }
    ])
  ]
}