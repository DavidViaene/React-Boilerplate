const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'js/app-[chunkhash].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      use: 'babel-loader',
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader', 'sass-loader',
        ],
      }),
    }, {
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
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: [
        'file-loader?name=[name]-[hash].[ext]&outputPath=img/&publicPath=/',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
    }],
  },
  plugins: [
    //Extract css
    new ExtractTextPlugin({
      filename: 'css/[name]-[chunkhash].css',
      allChunks: true,
    }),

    //HTML
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    //Create global constants
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    //Uglify
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    //Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    new ManifestPlugin(),
  ],
}
