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

  propTypes: {
    lineId: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['direct', 'reverse']).isRequired,
    stopName: PropTypes.string.isRequired,
    timeToNext: PropTypes.number
  },


  getStateFromStores() {
    var isFavorite = favoriteStore.isFavorite(
      this.props.lineId,
      this.props.direction,
      this.props.stopName
    );

    return { isFavorite }
  },

  toggleFavorite(ev) {
    var actionData = {
      lineId: this.props.lineId,
      direction: this.props.direction,
      stopName: this.props.stopName
    };

    if(this.state.isFavorite) {
      favoriteActionCreator.removeFromFavorite(actionData);
    } else {
      favoriteActionCreator.addToFavorite(actionData);
    }
  },

  render() {
    var timeToNext = this.props.timeToNext;

    var fav = this.state.isFavorite ? '<3' : '';

    if(timeToNext === undefined) {
      timeToNext = 'loading';
    } else if(timeToNext === -1) {
      timeToNext = 'No bus';
    } else if(timeToNext < 60) {
      timeToNext = 'soon';
    } else {
      timeToNext = moment.duration(timeToNext, 'seconds').humanize();
    }

    return (
      <div>
        {this.props.stopName} ({timeToNext} -- {this.props.timeToNext})
        {fav}
        <input type="button" value="fav" onClick={this.toggleFavorite}/>
      </div>
    )
  }
});
