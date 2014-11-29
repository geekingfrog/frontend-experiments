/** @jsx React.DOM */
'use strict';

var React = require('react');
var PropTypes = React.PropTypes;

var createStoreMixin = require('../mixins/createStoreMixin');
var lineStore = require('../stores/lineStore.js');

module.exports = React.createClass({

  propTypes: {
    lineId: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['direct', 'reverse']).isRequired
  },

  mixins: [createStoreMixin(lineStore)],

  getStateFromStores() {
    var line = lineStore.getLine(this.props.lineId);
    return {line}
  },

  render() {
    var line = this.state.line;

    var header;
    if(line) {
      var [from, to] = [line.from, line.to];
      // brackets are mandatory otherwise 6to5 will fail
      if(this.props.direction === 'reverse') { [from, to] = [to, from]; }
      header = <div>{line.id} -- {from} -> {to}</div>
    } else {
      header = <div>{this.props.lineId}</div>
    }

    return (
      <div>
      {header}
      {this.props.children}
      </div>
    )
  }
})
