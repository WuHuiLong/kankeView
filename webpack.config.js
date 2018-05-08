const path             = require('path');
const webpack          =require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  module: {
	  rules: [
	  //react（jsx）语法处理
	    {
	      test: /\.jsx$/,
	      exclude: /(node_modules)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env','react']
	        }
	      }
	    },
	    //css文件处理
		    {
		         test: /\.css$/,
		         use: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		})
	       },
	       //sass文件处理
		    {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          fallback: 'style-loader',
		          use: ['css-loader', 'sass-loader']
		        })
	      },
	      //图片的配置
	      {
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name].[ext]'
		            }
		          }
		        ]
		 },
		 //字体图标的设置
		 {
		        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name].[ext]'
		            }
		          }
		        ]
		 }
	  ]
	},
  plugins: [
  //独立html文件
  new HtmlWebpackPlugin({
  	template:'./src/index.html'
  }),
  //独立css文件
  new ExtractTextPlugin("css/[name].css"),
  //提供公共模块
  new webpack.optimize.CommonsChunkPlugin({
  	name : 'common',
  	filename : 'js/base.js'
  })
  ],
  devServer: {
     port:8086
   }
};