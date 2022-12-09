const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports= {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: `index.js`,
    path: path.resolve('dist'),
    clean:true,
    iife:false,
    library:{
      type: 'window',
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'esnext',
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'esnext',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'test',
      filename:'index.html',
      template:'index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.mjs'], // 引入文件可以不用加后缀名
    alias: {
      '@': path.resolve('src'),
    },
  },
  devServer: {
    compress:false,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    hot:true
  },
  devtool: false,
} 