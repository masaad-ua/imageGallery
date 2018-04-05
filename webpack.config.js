'use strict';
module.exports = {
	entry:"./app/app.js",
	output: {
		filename: 'bundle.js'
	},
	watch: true,
	module:{
		loaders:[
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.html$/, loader:'html-loader'},
			{test: /\.css$/, loader: 'style!css'},
			{test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file-loader'}
		]
	},
	devServer:{
		host: 'localhost', //default
		port: 8080 //default
	}

};
