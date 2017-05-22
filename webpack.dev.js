const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
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
      loaders: [
        'style-loader',
        'css-loader?modules=true',
      ],
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
  plugins: [HtmlWebpackPluginConfig],
  devtool: '#inline-source-map',
}
