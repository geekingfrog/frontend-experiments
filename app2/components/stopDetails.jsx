/** @jsx React.DOM */
'use strict';

var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

  render() {
    var stop = this.props.stop;
    var timeToNext = stop.timeToNext;
    if(timeToNext === -1) {
      timeToNext = 'No bus';
    } else if(timeToNext < 60) {
      timeToNext = 'soon';
    } else {
      timeToNext = moment.duration(timeToNext, 'seconds').humanize();
    }
    return <div>{stop.name} ({timeToNext} -- {this.props.stop.timeToNext})</div>
  }
});
