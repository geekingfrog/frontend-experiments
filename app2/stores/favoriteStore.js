'use strict';

var Immutable = require('immutable');
var { createStore } = require('../utils/storeUtils');
var actionTypes = require('../constants/actionTypes');
var appDispatcher = require('../dispatcher/appDispatcher');

var persistPrefix = 'fav';

// init from localstorage
var _favorites = Immutable.Map().withMutations(map => {
  Object.keys(window.localStorage).forEach( key => {
    if(key.slice(0, persistPrefix.length) !== persistPrefix) return;
    var val = localStorage.getItem(key);
    try {
      val = JSON.parse(val);
      map.set(key.slice(persistPrefix.length), Immutable.fromJS(val));
    } catch(err) {
      console.error('cannot parse', val, err.stack);
    }
  })
});

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
  var {source, action} = data;
  var {type, payload} = action;

  // slightly hackhish since let is not really supported the current
  // transpiler. Also, adding the destructuring declaration twice in the
  // same (function) scope, result in errors too.
  if(payload) var {lineId, direction, stopName} = payload;

  if(type === actionTypes.ADD_TO_FAVORITE) {
    var key = makeKey(lineId, direction, stopName);
    _favorites = _favorites.set(key, payload);
    window.localStorage.setItem(persistPrefix+key, JSON.stringify(payload));
    favoriteStore.emitChange();
  } else if(type === actionTypes.REMOVE_FROM_FAVORITE) {
    var keyToRemove = makeKey(lineId, direction, stopName);
    _favorites = _favorites.remove(keyToRemove);
    window.localStorage.removeItem(persistPrefix+keyToRemove);
    favoriteStore.emitChange();
  }
});

module.exports = favoriteStore;
