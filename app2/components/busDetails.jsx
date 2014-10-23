/** @jsx React.DOM */
'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var createStoreMixin = require('../mixins/createStoreMixin');

var lineStore = require('../stores/lineStore');
var lineActionCreator = require('../actions/lineActionCreator');

var StopDetails = require('./stopDetails.jsx');

module.exports = React.createClass({

  propTypes: {
    lineId: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['direct', 'reverse']).isRequired
  },

  mixins: [createStoreMixin(lineStore)],

  getStateFromStores() {
    return {line: lineStore.getLine(this.props.lineId)};
  },

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = this.state !== nextState;
    return shouldUpdate;
  },

  render() {
    var line = this.state.line;
    if(!line) return <div>Loading details</div>;

    var [from, to] = [line.from, line.to];
    if(this.props.direction === 'reverse') {
      [from, to] = [to, from];
    }

    var stops = this.props.direction === 'direct' ?
      line.direct :
      line.reverse;

    if(!stops) {
      stops = <div> loading data for each stops... </div>
    } else {
      stops = stops.map( (stop, idx) => {
        return <StopDetails
          key={stop.name+idx}
          stop={stop}
          lineId={line.id}
          direction={this.props.direction}
          />;
      });
    }

    return <div>
    <h3>{line.id} From: {from} -- To: {to}</h3>
    {stops}
    </div>
  }
});
