'use strict';

var path = require('path'),
// request = require('request'),
webpack = require('webpack'),
WebpackDevServer = require('webpack-dev-server'),
config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true
});

server.listen(3000, 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log('Listening at localhost:3000');
});
