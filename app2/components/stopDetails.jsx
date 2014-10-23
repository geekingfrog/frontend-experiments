/** @jsx React.DOM */
'use strict';

var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var createStoreMixin = require('../mixins/createStoreMixin');

var favoriteStore = require('../stores/favoriteStore');
var favoriteActionCreator = require('../actions/favoriteActionCreator');

module.exports = React.createClass({

  mixins: [createStoreMixin(favoriteStore)],

  getStateFromStores() {
    var isFavorite = favoriteStore.isFavorite(
      this.props.lineId,
      this.props.direction,
      this.props.stop.name
    );

    return { isFavorite }
  },

  propTypes: {
    lineId: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['direct', 'reverse']).isRequired,
    stop: PropTypes.shape({
      name: PropTypes.string,
      timeToNext: PropTypes.number
    }).isRequired
  },

  toggleFavorite(ev) {
    var actionData = {
      lineId: this.props.lineId,
      direction: this.props.direction,
      stop: this.props.stop.name
    };

    if(this.state.isFavorite) {
      favoriteActionCreator.removeFromFavorite(actionData);
    } else {
      favoriteActionCreator.addToFavorite(actionData);
    }
  },

  render() {
    var stop = this.props.stop;
    var timeToNext = stop.timeToNext;

    var fav = this.state.isFavorite ? '<3' : '';

    if(timeToNext === -1) {
      timeToNext = 'No bus';
    } else if(timeToNext < 60) {
      timeToNext = 'soon';
    } else {
      timeToNext = moment.duration(timeToNext, 'seconds').humanize();
    }

    return (
      <div>
        {stop.name} ({timeToNext} -- {this.props.stop.timeToNext})
        {fav}
        <input type="button" value="fav" onClick={this.toggleFavorite}/>
      </div>
    )
  }
});
