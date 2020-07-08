const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { rootPath, srcPath, buildPath } = require('./path');

module.exports = {
  mode: 'production',

  devtool: 'none', // hidden-source-map

  entry: ['@babel/polyfill', srcPath],

  output: {
    path: buildPath,
    filename: '[name].js?ver=[hash]',
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
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-object-rest-spread', // ES2018
                '@babel/plugin-transform-async-to-generator', // ES2017
                ['@babel/plugin-proposal-class-properties', { loose: true }],
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
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
            options: {
              outputPath: 'build/img/',
              name: '[name].[hash].[ext]', 
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },

  plugins: [
    new CleanWebpackPlugin([buildPath], {
      root: rootPath,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?ver=[hash]',
      chunkFilename: '[id].css',
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '90-95',
      },
    }),
    new webpack.ProgressPlugin(),
  ],
};
