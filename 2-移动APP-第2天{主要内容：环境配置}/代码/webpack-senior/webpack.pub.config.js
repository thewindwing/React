const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 导入删除文件夹的插件，每次重新发布项目的时候，把老的 dist 删除
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// 导入抽取 CSS 样式表文件的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 导入 压缩 CSS 文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/main.js'), // 这里输出的 是bundle.js
    vendors1: ['jquery'] // 指定要从bundle中抽取哪些第三方包
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: { // 压缩页面的选项
        collapseWhitespace: true, // 合并空格
        removeComments: true, // 移除注释
        removeAttributeQuotes: true //移除属性上的双引号
      }
    }),
    new cleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors1', // 指定从哪个入口抽离文件
      filename: 'js/vendors.js' // 表示，把抽离出来的第三方包，放到哪个文件中
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { // 压缩选项
        warnings: false // 移除和警告相关的内容
      }
    }),
    new webpack.DefinePlugin({ // 定义为产品发布环境
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin("css/styles.css"), // 指定抽离出来的 css 放到什么位置
    new OptimizeCssAssetsPlugin() // 使用 此插件 压缩 CSS 文件
  ],
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({ // 改造 use 属性
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../' // 让抽取出来的样式表中，自动给路径加上  ../ 前缀
        })
      },
      {
        test: /\.scss$/, use: ExtractTextPlugin.extract({ // 改造 use 属性
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'// 让抽取出来的样式表中，自动给路径加上  ../ 前缀
        })
      },
      { test: /\.(png|gif|jpg|bmp)$/, use: 'url-loader?limit=500&name=images/[hash:8]-[name].[ext]' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}