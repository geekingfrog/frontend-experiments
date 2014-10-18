/** @jsx React.DOM */
'use strict';

var React = require('react');

var BusLinesIndex = React.createClass({
  render: function() {
    console.log('rendering busLinesIndex here');
    return (
      <this.props.activeRouteHandler/>
    );
  }
});

module.exports = BusLinesIndex;
