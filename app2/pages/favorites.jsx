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
      console.log('got line from lineStore: ', line);
      // if(line
    }
    // this.fetchFavorites(favorites);
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
    console.log('got state:', this.state.favorites.toJS());
    var favs = this.state.favorites.toVector().map(function(fav, idx) {
      return (
        <LineHeader
          key={idx}
          lineId={fav.get('lineId')}
          direction={fav.get('direction')}
          >
          <StopDetails
            lineId={fav.get('lineId')}
            direction={fav.get('direction')}
            stopName={fav.get('stopName')}
          />
        </LineHeader>
      )
    });
    return <div>{favs.toJS()}</div>
  }
});
