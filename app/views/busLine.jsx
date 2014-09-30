/** @jsx React.DOM */
'use strict';

var React = require('react');

var BusLine = React.createClass({
  render: function() {
    console.log('bus line render here', this.props.params);
    return <h3>bus line {this.props.params} here</h3>
  }
});

module.exports = BusLine;
