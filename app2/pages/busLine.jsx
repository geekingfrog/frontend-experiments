/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var globalStore = require('../stores/globalStore');
var createStoreMixin = require('../mixins/createStoreMixin');
var propTypes = React.propTypes;
var BusDetails = require('../components/busDetails.jsx');

module.exports = React.createClass({

  mixins: [createStoreMixin(lineStore, globalStore), Router.State],

  getStateFromStores() {
    return {
      line: lineStore.getLine(this.getParams().lineId) || null
    }
  },

  componentWillMount() {
    lineActionCreator.requestLine(this.getParams().lineId);
  },

  componentDidMount() {
    var lineId = this.getParams().lineId;
    this.updateTimer = setInterval(function() {
      lineActionCreator.requestLine(lineId);
    }, 10 * 1000);
  },

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  },

  componentWillReceiveProps(nextProps) {
    console.log('BUSLINE component will receive props here', this.props, nextProps);
    return true;
  },

  render() {
    var line = this.state.line;

    if(line) {
      return (
        <div>
          <BusDetails lineId={line.id} direction="direct"/>
          <BusDetails lineId={line.id} direction="reverse"/>
        </div>
      )
    } else {
      return <div> loading line </div>
    }
  }
});
