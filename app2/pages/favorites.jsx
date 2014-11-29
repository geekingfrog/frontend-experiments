/** @jsx React.DOM */
'use strict';

var React = require('react');
var createStoreMixin = require('../mixins/createStoreMixin');
var appDispatcher = require('../dispatcher/appDispatcher');

var LineHeader = require('../components/lineHeader.jsx');
var StopDetails = require('../components/stopDetails.jsx');

var lineStore = require('../stores/lineStore');
var favoriteStore = require('../stores/favoriteStore');

var lineActionCreator = require('../actions/lineActionCreator');

module.exports = React.createClass({

  mixins: [createStoreMixin(lineStore, favoriteStore)],

  getStateFromStores() {
    var favorites = favoriteStore.getFavorites();
    for(var [key, fav] of favorites.entries()) {
      var line = lineStore.getLine(fav.lineId);
    }
    return { favorites };
  },

  fetchFavorites(favorites) {
    setTimeout(function() {
      for(var [key, fav] of favorites.entries()) {
        lineActionCreator.requestLine(fav.lineId);
      }
    }, 0);
  },

  render() {
    console.log('got state:', this.state.favorites);
    var favs = [];
    for(var fav of this.state.favorites.values()) {
      var key = fav.lineId+fav.direction+fav.stopName;
      favs.push(
        <LineHeader
          key={key}
          lineId={fav.lineId}
          direction={fav.direction}
          >
          <StopDetails
            lineId={fav.lineId}
            direction={fav.direction}
            stopName={fav.stopName}
          />
        </LineHeader>
      )
    }
    return <div>{favs}</div>
  }
});
