'use strict';

var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');
var { createStore } = require('../utils/storeUtils');

var _lines = new Map();

var lineStore = createStore({
  getLines() { return _lines; },
  getLine(id) { return _lines.get(id); }
});

var appDispatcher = require('../dispatcher/appDispatcher');

lineStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action: {type, payload}} = data;

  if(type === actionTypes.REQUEST_LINES_SUCCESS) {

    payload.lines.forEach( line => _lines.set(line.id, line) );
    lineStore.emitChange();
  } else if(type === actionTypes.REQUEST_LINE_SUCCESS) {

    var line = payload.line;
    _lines.set(line.id, line);
    lineStore.emitChange();
  }

});

module.exports = lineStore;
