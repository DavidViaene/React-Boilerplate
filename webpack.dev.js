const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './client/index.js',
    // the entry point of our app
  ],

  output: {
    path: path.resolve('dist'),
    publicPath: 'http://localhost:8080/',
    filename: 'js/app.js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    //SASS
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
      exclude: /node_modules/,
    },
    //SVG Sprite
    {
      test: /\.svg$/,
      include: path.join(__dirname, 'client/svg'),
      loaders: [
          'svg-sprite-loader?' + JSON.stringify({
              name: 'icon-[name]',
              prefixize: true
          }),
          'svgo-loader?' + JSON.stringify({
              plugins: [
                  { removeTitle: true },
                  { convertPathData: false },
                  { removeUselessStrokeAndFill: true }
              ]
          })
      ]
    },
    //Images
    {
      test: /\.(png|jpg|gif)$/,
      use: 'file-loader?name=[name]-[hash].[ext]&outputPath=img/',
      exclude: /node_modules/,
    },
    //Fonts
    {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      include: path.join(__dirname, 'client/fonts'),
      use: 'file-loader?name=[name].[ext]&outputPath=fonts/',
    }],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    //HTML
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    //Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,

    headers: { "Access-Control-Allow-Origin": "*" },

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,

    contentBase: path.join(__dirname, 'dist'),
  }
}
