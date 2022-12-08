const path=require('path')

module.exports= {
  mode: 'development',
  entry: path.resolve(__dirname,'./src/index.ts'),
  experiments: {
    outputModule: true,
  },
  output: {
    filename: `index.js`,
    path: path.resolve('dist')
  },
  module: {
    rules: [
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
  resolve: {
    extensions: ['.ts', '.js', '.mjs'], // 引入文件可以不用加后缀名
    alias: {
      '@': path.resolve('src'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },
  devtool: 'source-map',
} 