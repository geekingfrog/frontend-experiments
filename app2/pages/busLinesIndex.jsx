/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Promise = require('bluebird');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var createStoreMixin = require('../mixins/createStoreMixin');

var BusLines = React.createClass({

  mixins: [createStoreMixin(lineStore)],

  componentWillMount() {
    console.log('going to mount component busLinesIndex');
    lineActionCreator.requestLines();
  },

  getStateFromStores() {
    var lines = lineStore.getLines();
    console.log('getting state from stores here', !lines);
    return {
      lines: lines,
      isLoading: !lines
    };
  },

  // componentWillReceiveProps(nextProps) {
  //   console.log('will receive props', nextProps);
  // },

  render: function() {
    console.log('this.state?', this.state, this.state.isLoading);
    return (
      (this.state.isLoading) ?
      <h2>loading</h2> :
      <LineListing lines={this.state.lines}/>
    );
  }
});

var LineListing = React.createClass({
  render: function() {
    var list = this.props.lines.map(function(bus) {
      var params = {id: bus.id};
      return [<Link to="/line/:id" params={params}> {bus.id} from: {bus.from} -- to: {bus.to} </Link>, <br/>];
    });

    return (
      <ul>
      {list.toArray()}
      </ul>
    )
  }
})

module.exports = BusLines;
