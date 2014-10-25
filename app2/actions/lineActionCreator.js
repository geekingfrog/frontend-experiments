'use strict';

var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');
var { getJSON } = require('../utils/APIUtils');

var lineActionCreator = {
  requestLines() {
    // TODO
    // add a check to avoid duplicated requests
    // this state should be in lineStore probably

    appDispatcher.handleViewAction({
      type: actionTypes.REQUEST_LINES
    });

    getJSON('line')
    .then(function(lines) {
      appDispatcher.handleServerAction({
        type: actionTypes.REQUEST_LINES_SUCCESS,
        payload: { lines: lines }
      });
    })
    .catch(function(err) {
      console.log('got error:', err, err.stack);
      appDispatcher.handleServerAction({
        type: actionTypes.REQUEST_LINES_ERROR,
        payload: { error: err }
      });
    });

  },

  requestLine(id) {
    appDispatcher.handleViewAction({
      type: actionTypes.REQUEST_LINE,
      payload: { id: id }
    });

    getJSON('line/'+id)
    .then(function(line) {
      appDispatcher.handleServerAction({
        type: actionTypes.REQUEST_LINE_SUCCESS,
        payload: { line: line }
      });
    })
    .catch(function(err) {
      console.log('request line error:', err, err.stack);
      appDispatcher.handleServerAction({
        type: actionTypes.REQUEST_LINE_ERROR,
        payload: { error: err }
      });
    });
  }

}

module.exports = lineActionCreator;
