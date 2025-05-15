const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
    ],
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          static: {
            directory: path.resolve(__dirname, 'dist'),
          },
          compress: true,
          port: 9000,
          open: true,
          hot: true,
          proxy: {
            '/todos': 'http://localhost:3000',
          },
          watchFiles: {
            paths: [path.resolve(__dirname, 'src')],
            options: {
              usePolling: false,
            },
          },
        }
      : undefined,
  };
};