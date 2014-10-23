'use strict';

var Immutable = require('immutable');
var { createStore } = require('../utils/storeUtils');
var actionTypes = require('../constants/actionTypes');
var appDispatcher = require('../dispatcher/appDispatcher');

var persistPrefix = 'fav';

// init from localstorage
var _favorites = Immutable.Map.empty().withMutations(map => {
  Object.keys(window.localStorage).forEach( key => {
    if(key.slice(0, persistPrefix.length) !== persistPrefix) return;
    map.set(key.slice(persistPrefix.length), JSON.parse(localStorage.getItem(key)));
  })
});

function makeKey(lineId, direction, stop) {
  return ''+lineId+direction+stop;
}

var favoriteStore = createStore({
  getFavorites() { return _favorites; },
  isFavorite(lineId, direction, stop) {
    // console.log('looking for key:', makeKey(lineId, direction, stop));
    // console.log('in: ', _favorites.toJS());
    var res = _favorites.get(makeKey(lineId, direction, stop));

    if(res) console.log('got:', res);

    return !!_favorites.get(makeKey(lineId, direction, stop));
  }
});

favoriteStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action} = data;
  var {type, payload} = action;

  // slightly hackhish since let is not really supported the current
  // transpiler. Also, adding the destructuring declaration twice in the
  // same (function) scope, result in errors too.
  if(payload) var {lineId, direction, stop} = payload;

  if(type === actionTypes.ADD_TO_FAVORITE) {
    var key = makeKey(lineId, direction, stop);
    _favorites = _favorites.set(key, payload);
    window.localStorage.setItem(persistPrefix+key, JSON.stringify(payload));
    favoriteStore.emitChange();
  } else if(type === actionTypes.REMOVE_FROM_FAVORITE) {
    var keyToRemove = makeKey(lineId, direction, stop);
    _favorites = _favorites.remove(keyToRemove);
    window.localStorage.removeItem(persistPrefix+keyToRemove);
    favoriteStore.emitChange();
  }
});

module.exports = favoriteStore;
