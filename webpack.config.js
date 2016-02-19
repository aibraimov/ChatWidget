var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: [
              "react",
              "es2015",
              "stage-0",
              "stage-1",
              "stage-2",
              "stage-3"
            ]
        }
      }
    ]
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  output: {
    filename: 'main.js',
    libraryTarget: 'umd',
    library: 'ReactDnD'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
