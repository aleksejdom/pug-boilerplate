const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, '/app/styles')
const dirImages = path.join(__dirname, '/app/images')

const dirNode = 'node_modules'

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss')
  ],

  resolve: {
    modules: [
      dirApp,
      dirShared,
      dirStyles,
      dirImages,
      dirNode
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new CopyWebpackPlugin({
      patterns: [{
        from: './shared',
        to: ''
      }]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', {
            interlaced: true
          }],
          ['jpegtran', {
            progressive: true
          }],
          ['optipng', {
            optimizationLevel: 8
          }]
        ]
      }
    }),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: ''
        }
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader'
      }
      ]

    },

    {
      test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
      loader: 'file-loader',
      options: {
        name (file) {
          return '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: ImageMinimizerPlugin.loader,
        options: {
          severityError: 'warning', // Ignore errors on corrupted images
          minimizerOptions: {
            plugins: ['gifsicle']
          }
        }
      }]
    },
    {
      test: /\.(glsl|frag|vert)$/i,
      loader: 'raw-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(glsl|frag|vert)$/i,
      loader: 'glslify-loader',
      exclude: /node_modules/
    }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
