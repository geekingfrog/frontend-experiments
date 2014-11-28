/** @jsx React.DOM */
'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler

var BusLinesIndex = React.createClass({
  render: function() {
    console.log('rendering busLinesIndex here');
    return (
      <RouteHandler/>
    );
  }
});

module.exports = BusLinesIndex;
