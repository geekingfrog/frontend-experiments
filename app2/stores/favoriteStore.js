'use strict';

var { createStore } = require('../utils/storeUtils');
var actionTypes = require('../constants/actionTypes');
var appDispatcher = require('../dispatcher/appDispatcher');

var persistPrefix = 'fav-';

var localStorage = window.localStorage;

// init from localstorage
var _favorites = new Map();

for(var i=0, n=localStorage.length; i<n; ++i) {
  var key = localStorage.key(i);
  if(key.slice(0, persistPrefix.length) !== persistPrefix) continue;
  var val = localStorage.getItem(key);
  try {
    val = JSON.parse(val);
    _favorites.set(key.slice(persistPrefix.length), val);
  } catch(err) {
    console.error('cannot parse', val, err.stack);
  }
}

function makeKey(lineId, direction, stopName) {
  return ''+lineId+direction+stopName;
}

var favoriteStore = createStore({
  getFavorites() { return _favorites; },
  isFavorite(lineId, direction, stopName) {
    return !!_favorites.get(makeKey(lineId, direction, stopName));
  }
});

favoriteStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action: {type, payload}} = data;

  // slightly hackhish since let is not really supported the current
  // transpiler. Also, adding the destructuring declaration twice in the
  // same (function) scope, result in errors too.
  if(payload) var {lineId, direction, stopName} = payload;

  if(type === actionTypes.ADD_TO_FAVORITE) {
    var key = makeKey(lineId, direction, stopName);
    _favorites.set(key, payload);
    localStorage.setItem(persistPrefix+key, JSON.stringify(payload));
    favoriteStore.emitChange();
  } else if(type === actionTypes.REMOVE_FROM_FAVORITE) {
    var keyToRemove = makeKey(lineId, direction, stopName);
    _favorites.delete(keyToRemove);
    localStorage.removeItem(persistPrefix+keyToRemove);
    favoriteStore.emitChange();
  }
});

module.exports = favoriteStore;
