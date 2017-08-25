var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var pxtorem = require('postcss-pxtorem');
var autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const babelPlugin = [["import", [{ "style": "css", "libraryName": "antd-mobile" }]]];
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
];
var postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: (loader) => [
      pxtorem({
        rootValue: 100,
        propWhiteList: [], // don't use propList.
      }),
      autoprefixer({
        add:true,
        browsers:["iOS >= 8", "Android >= 4"]
      })
    ]
  }
};
module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: ['.web.js', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
    publicPath: "/"
  },
  externals:{
    'react': 'React',
    'react-dom': 'ReactDOM',
    "moment": "moment"
  },
  module: {
    loaders: [
       {
        test: /\.(png|svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs,
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: babelPlugin
        }
      },
      {
        test: /\.ejs|\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", postcssLoader]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader", postcssLoader]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name]-[hash].[ext]",
          },
        }],
        exclude: svgDirs
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
      }
    ]
  },
  devServer: {
    proxy: {
       "/api": {
          "target": "http://127.0.0.1:8100/api",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
    },
    historyApiFallback: true
  },
  plugins:[
     new ExtractTextPlugin('style.css'),
     new HtmlWebpackPlugin({
      filename: 'index.html', //生成的html存放路径，相对于path
      template: './src/index.ejs', //html模板路径
      inject: true,    //js插入的位置，true/'head'/'body'/false
      hash: false,
      minify: { //压缩HTML文件
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    })
  ],
  devtool: 'source-map'
}
