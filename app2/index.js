'use strict';

require('6to5/polyfill');
require('es6-shim');

var React = require('react');
var routes = require('./routes.jsx');

var lineActionCreator = require('./actions/lineActionCreator');

// fetch all lines at startup for the moment
lineActionCreator.requestLines();

var Router = require('react-router');
Router.run(routes, function(Handler) {
  React.render(React.createElement(Handler), document.body);
});
