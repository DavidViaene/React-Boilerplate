const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'client',
  /** The file name of the application's entry point */
  main: 'index',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** Output file name */
  outFilename: 'app',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
}

module.exports = config

