/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

var App = React.createClass({
  render: function() {
    return (
      <DocumentTitle title='sample app'>
        <div>
          <h1>Simple test</h1>
          <this.props.activeRouteHandler />
        </div>
      </DocumentTitle>
    )
  }
});

module.exports = App;