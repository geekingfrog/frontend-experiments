/** @jsx React.DOM */
'use strict';

var React = require('react');
var createStoreMixin = require('../mixins/createStoreMixin');

var lineStore = require('../stores/lineStore');
var favoriteStore = require('../stores/favoriteStore');

module.exports = React.createClass({

  mixins: [createStoreMixin(lineStore, favoriteStore)],

  getStateFromStores() {
    return {
      favorites: favoriteStore.getFavorites()
    }
  },

  render() {
    console.log('got state:', this.state.favorites.toJS());
    return <div>Favorites here</div>
  }
});
