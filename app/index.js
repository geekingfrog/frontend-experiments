/** @jsx React.DOM */

var React = require('react');

var routes = require('./routes.jsx');

React.renderComponent(
  routes,
  document.body
);

var $ = require('jquery');
window.$ = $;
