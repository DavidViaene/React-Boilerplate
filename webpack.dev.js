const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const project = require('./project.config')

// ------------------------------------
// Basic configuration
// ------------------------------------

const config = {
  devtool: 'inline-source-map',
  entry: [
    //Main entry file
    path.resolve(project.basePath, `${project.srcDir}/${project.main}`)
  ],
  output: {
    //Output path
    path: path.resolve(project.basePath, `${project.outDir}`),
    publicPath: project.publicPath,
    filename: `js/${project.outFilename}.js`,
  },
  plugins: [
    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    //Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    loaders: []
  }
}

// ------------------------------------
// Javascript
// ------------------------------------

config.module.loaders.push({
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/,
})


// ------------------------------------
// SASS
// ------------------------------------

config.module.loaders.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: [
    'style-loader',
    'css-loader',
    'sass-loader',
  ],
  exclude: /node_modules/,
})


// ------------------------------------
// SVG Sprite
// ------------------------------------

config.module.loaders.push({
  test: /\.svg$/,
  include: path.join(__dirname, project.srcDir, 'svg'),
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
})


// ------------------------------------
// Images
// ------------------------------------

config.module.loaders.push({
  test: /\.(png|jpg|gif)$/,
  use: 'file-loader?name=[name]-[hash].[ext]&outputPath=img/',
  exclude: /node_modules/,
})


// ------------------------------------
// Fonts
// ------------------------------------

config.module.loaders.push({
  test: /\.(eot|ttf|svg|woff|woff2)$/,
  include: path.join(__dirname, project.srcDir, 'fonts'),
  use: 'file-loader?name=[name].[ext]&outputPath=fonts/',
})


// ------------------------------------
// HTML
// ------------------------------------

/*config.plugins.push(new HtmlWebpackPlugin({
  template: path.resolve(project.basePath, `${project.srcDir}/index.html`),
  filename: 'index.html',
  inject: 'body',
}))*/


// ------------------------------------
// HMR
// ------------------------------------

config.entry.unshift(
  // activate HMR for React
  'react-hot-loader/patch',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  'webpack/hot/only-dev-server'
)

config.plugins.push(
  // enable HMR globally
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin()
)

// ------------------------------------
// DEV SERVER
// ------------------------------------

config.entry.push(
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  'webpack-dev-server/client?http://localhost:8080'
)

config.devServer = {
  host: 'localhost',
  port: 8080,
  headers: { "Access-Control-Allow-Origin": "*" },
  // respond to 404s with index.html
  historyApiFallback: true,
  hot: true,
  contentBase: path.join(__dirname, project.outDir),
}

module.exports = config
