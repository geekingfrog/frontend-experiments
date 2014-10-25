'use strict';

var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');

var favoriteActionCreator = {

  addToFavorite({lineId: lineId, direction: direction, stopName: stopName}) {
    appDispatcher.handleViewAction({
      type: actionTypes.ADD_TO_FAVORITE,
      payload: { lineId, direction, stopName }
    });
  },

  removeFromFavorite({lineId: lineId, direction: direction, stopName: stopName}) {
    appDispatcher.handleViewAction({
      type: actionTypes.REMOVE_FROM_FAVORITE,
      payload: { lineId, direction, stopName }
    });
  }

}

module.exports = favoriteActionCreator;
