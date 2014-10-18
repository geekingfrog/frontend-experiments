/** @jsx React.DOM */
'use strict';

var React = require('react');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var createStoreMixin = require('../mixins/createStoreMixin');

module.exports = React.createClass({

  mixins: [createStoreMixin(lineStore)],

  getStateFromStores() {
    return {
      line: lineStore.getLine(this.props.params.lineId) || null
    }
  },

  componentWillMount() {
    lineActionCreator.requestLine(this.props.params.lineId);
  },

  componentWillReceiveProps(nextProps) {
    console.log('BUSLINE component will receive props here', this.props, nextProps);
    return true;
  },

  render() {
    console.log('rendering busLine component with props:', this.props);
    var line = this.state.line;
    return (
      line ?
      <div> line here {line.id} -- {line.from} -- {line.to} </div> :
      <div> loading line </div>
    )
  }
});
