const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
})

const CSSExtract = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
})

module.exports = {
  entry: './src/index.js',
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
    }],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CSSExtract,
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
