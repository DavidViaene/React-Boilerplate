const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
})

const CSSExtract = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?modules=true&minimize=true',
      }),
    }, {
      test: /\.svg$/,
      loaders: [
        'svg-sprite-loader?' + JSON.stringify({
          name: 'icon-[name]',
          prefixize: true,
        }),
        'svgo-loader?' + JSON.stringify({
          plugins: [
            { removeTitle: true },
            { convertPathData: false },
            { removeUselessStrokeAndFill: true },
          ],
        }),
      ],
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      loaders: [
        'file-loader?name=[name]-[hash].[ext]&outputPath=img/',
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
    HtmlWebpackPluginConfig,
    CSSExtract,
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
