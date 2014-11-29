'use strict';

jest.dontMock('../favoriteStore');
jest.dontMock('../../utils/storeUtils');
jest.dontMock('../../constants/actionTypes');

describe('favoriteStore', function() {
  var actionTypes = require('../../constants/actionTypes');
  var favorite = {
    lineId: 'favId',
    direction: 'direct',
    stopName: 'stop'
  };

  var addFavoriteAction = {
    source: null,
    action: {
      type: actionTypes.ADD_TO_FAVORITE,
      payload: {
        lineId: 'newFav',
        direction: 'reverse',
        stopName: 'stop42'
      }
    }
  };

  var removeFromFavorite = {
    source: null,
    action: {
      type: actionTypes.REMOVE_FROM_FAVORITE,
      payload: favorite
    }
  };

  var appDispatcher, callback, favoriteStore;

  var _localStorage;
  beforeEach(function() {
    jest.dontMock('localStorage');
    window.localStorage = require('localStorage');
    var key = favorite.lineId+favorite.direction+favorite.stopName;
    window.localStorage.setItem('fav-'+key, JSON.stringify(favorite));

    appDispatcher = require('../../dispatcher/appDispatcher');
    favoriteStore = require('../favoriteStore');
    callback = appDispatcher.register.mock.calls[0][0];
  });

  afterEach(function() {
    window.localStorage = _localStorage;
  });

  it('should register a callback with the dispatcher', function() {
    expect(appDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should init value from localStorage', function() {
    expect(favoriteStore.getFavorites().size).toBe(1);
    expect(favoriteStore.isFavorite(
      favorite.lineId,
      favorite.direction,
      favorite.stopName
    )).toBe(true);
  });

  it('should correctly add favorites', function() {
    callback(addFavoriteAction);
    expect(favoriteStore.getFavorites().size).toBe(2);
    var fav = addFavoriteAction.action.payload;
    expect(favoriteStore.isFavorite(
      fav.lineId,
      fav.direction,
      fav.stopName
    )).toBe(true);
  });

  it('should correctly remove favorites', function() {
    callback(removeFromFavorite);
    expect(favoriteStore.getFavorites().size).toBe(0);
    expect(favoriteStore.isFavorite(
      favorite.lineId,
      favorite.direction,
      favorite.stopName
    )).toBe(false);
  });

});
