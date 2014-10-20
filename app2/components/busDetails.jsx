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
    console.log('got line for details:', lineStore.getLine(this.props.lineId));
    return {line: lineStore.getLine(this.props.lineId)};
  },

  componentWillMount() {
    console.log('will mount busdetail component here');
  },

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = this.state !== nextState;
    console.log('should update bus details?', shouldUpdate);
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
      stops = stops.map( stop => {
        return <StopDetails key={stop.name} stop={stop} />;
      });
    }

    return <div>
    <h3>From: {from} -- To: {to}</h3>
    {stops}
    </div>
  }
});
