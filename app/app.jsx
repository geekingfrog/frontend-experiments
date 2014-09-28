/** @jsx React.DOM */
'use strict';

var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <this.props.activeRouteHandler/>
    )
  }
});

module.exports = App;
