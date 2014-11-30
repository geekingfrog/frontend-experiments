'use strict';

// @flow

var { createStore } = require('../utils/storeUtils');
var actionTypes = require('../constants/actionTypes');
var appDispatcher = require('../dispatcher/appDispatcher');

var persistPrefix = 'fav-';

var localStorage = window.localStorage;

// declare class Map<K, V> {
//   clear(): void;
//   delete(key: K): boolean;
//   forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
//   get(key: K): V;
//   has(key: K): boolean;
//   set(key: K, value: V): Map<K, V>;
//   size: number;
// }

// init from localstorage
var _favorites: Map<string, string> = new Map();

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
