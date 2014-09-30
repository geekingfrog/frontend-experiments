/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Promise = require('bluebird');

var BusLines = React.createClass({
  mixins: [Router.AsyncState],

  statics: {
    getInitialAsyncState: function(params, query) {
      return {
        busLines: Promise.cast($.getJSON('http://localhost:8080/api/line'))
      }
    }
  },

  render: function() {
    console.log('this.state?', this.state);

    return (
      (this.state && this.state.busLines) ?
      <LineListing busLines={this.state.busLines}/> :
      <h2>loading</h2>
    );
  }
});

var LineListing = React.createClass({
  render: function() {
    var list = this.props.busLines.map(function(bus, idx) {
      var params = {id: idx};
      return [<Link to="/busLines/:id" params={params}> from: {bus.from} -- to: {bus.to} </Link>, <br/>];
    });

    return (
      <ul>
      {list}
      </ul>
    )
  }
})

module.exports = BusLines;
