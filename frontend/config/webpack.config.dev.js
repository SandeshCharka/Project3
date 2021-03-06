const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, buildPath } = require('./path');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: ['@babel/polyfill', srcPath],

  output: {
    filename: '[name].[hash].js',
  },

  resolve: {
    alias: {
      components: srcPath + '/components',
      containers: srcPath + '/containers',
      modules: srcPath + '/modules',
      assets: srcPath + '/assets',
      pages: srcPath + '/pages',
    },
  },

  devServer: {
    hot: true,
    inline: true,
    port: 9091,
    contentBase: [buildPath],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    modules: false, // react hot loader 사용시 modules false 필수
                    debug: true,
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-object-rest-spread', // ES2018
                '@babel/plugin-transform-async-to-generator', // ES2017
                ['@babel/plugin-proposal-class-properties', { loose: true }], 
                'react-hot-loader/babel', 
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [srcPath + '/assets/scss/modules'],
              data: '@import "variables.scss"; @import "mixin.scss";', 
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      showErrors: true,
    }),
    new webpack.ProgressPlugin(),
  ],
};
