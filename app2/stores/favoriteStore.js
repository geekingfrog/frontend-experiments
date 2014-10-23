'use strict';

var Immutable = require('immutable');
var { createStore } = require('../utils/storeUtils');
var actionTypes = require('../constants/actionTypes');
var appDispatcher = require('../dispatcher/appDispatcher');

var _favorites = Immutable.Vector();

function makeKey(lineId, direction, stop) {
  return ''+lineId+direction+stop;
}

var favoriteStore = createStore({
  getFavorites() { return _favorites; },
  isFavorite(lineId, direction, stop) {
    // this is likely to be slow when number of favorite lines goes up.
    // Refactor using some kind of map if required later
    var res = _favorites.some(key => key === makeKey(lineId, direction, stop));
    return res;
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
    _favorites = _favorites.push(makeKey(lineId, direction, stop));
    favoriteStore.emitChange();
  } else if(type === actionTypes.REMOVE_FROM_FAVORITE) {
    var keyToRemove = makeKey(lineId, direction, stop);
    _favorites = _favorites.filter(k => k !== keyToRemove).toVector();
    favoriteStore.emitChange();
  }
});

module.exports = favoriteStore;
