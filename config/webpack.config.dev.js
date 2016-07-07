var path = require('path');
var webpack = require('webpack');

// App files location
var PATHS = {
  app: path.resolve(__dirname, '../source/js'),
  build: path.resolve(__dirname, '../dist')
};

var plugins = [
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve(PATHS.app, 'main.js')
  },
  output: {
    path: PATHS.build,
    filename: 'js/scripts.min.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        include: PATHS.app
      }
    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.build),
    port: 8100,
    historyApiFallback: true
  },
  devtool: 'eval'
};
