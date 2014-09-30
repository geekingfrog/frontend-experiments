/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');

function fetchLine(lineId) {
  return Promise.cast($.getJSON('http://localhost:8080/api/line/'+lineId))
}

var BusLine = React.createClass({
  mixins: [Router.AsyncState],

  fetchState: function() {
    console.log('fetch state with this.props:', this.props);
  },

  statics: {
    getInitialAsyncState: function(params, query) {
      console.log('getting initial async state for busLine %s', params.id);
      return {
        busLine: fetchLine(params.id)
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    var that = this;
    this.setState({
      busLine: null
    });
    fetchLine(nextProps.params.id).then(function(data) {
      console.log('got new info for line', nextProps.params.id);
      that.setState({busLine: data});
    });
  },

  render: function() {
    var returnVal;
    console.log('rendering busLine here');
    if(this.state && this.state.busLine) {
      returnVal = <LineInfo data={this.state.busLine} />
    } else {
      returnVal = <h3> Loading data for line {this.props.params.id} </h3>
    }
    return returnVal;
  }
});

var LineInfo = React.createClass({
  render: function() {
    console.log('rendering details for line ', this.props.data.id);
    return (
      <div>
      <h3> got data for line {this.props.data.id} </h3>
      <p>
      from: {this.props.data.from} <br />
      to: {this.props.data.to}
      </p>
      </div>
    )
  }
});

module.exports = BusLine;
