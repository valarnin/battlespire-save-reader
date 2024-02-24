const dist = __dirname + '/dist';

module.exports = {
  entry: {
    reader: {
      import: './src/index.ts',
      library: { type: 'umd', name: 'reader' },
      filename: 'bundle.reader.js',
    },
    buffer: {
      import: './node_modules/buffer/index.js',
      library: { type: 'umd', name: 'Buffer' },
      filename: 'bundle.buffer.js',
    },
  },
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  devtool: 'source-map',
  target: 'web',
  devServer: {
    static: [
      {
        directory: './dist',
        publicPath: '/',
      }, {
        directory: './src/tools',
        publicPath: '/',
      },
    ]
  },
  mode: 'development',
};