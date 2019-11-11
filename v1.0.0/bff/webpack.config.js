/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    mainFields: ['main'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'config'),
      path.resolve(__dirname, 'db'),
      path.resolve(__dirname, 'entities'),
      path.resolve(__dirname, 'lib')
    ],
    extensions: ['.ts', '.json', '.js', '.mjs']
  },
  target: 'node',
  externals: [nodeExternals()]
}
