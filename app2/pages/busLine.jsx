/** @jsx React.DOM */
'use strict';

var React = require('react');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var createStoreMixin = require('../mixins/createStoreMixin');
var propTypes = React.propTypes;
var BusDetails = require('../components/busDetails.jsx');

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
    console.log('line to render:', line);

    if(line) {
      return ( <div>
              <BusDetails lineId={line.id} direction="direct"/>
              <BusDetails lineId={line.id} direction="reverse"/>
              </div>
      )
    } else {
      return <div> loading line </div>
    }
  }
});
