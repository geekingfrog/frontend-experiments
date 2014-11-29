'use strict';

var Immutable = require('immutable');
var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');
var { createStore } = require('../utils/storeUtils');

var _lines = Immutable.OrderedMap();

var lineStore = createStore({
  getLines() { return _lines; },
  getLine(id) { return _lines && _lines.get(id); }
});

var appDispatcher = require('../dispatcher/appDispatcher');

lineStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action: {type, payload}} = data;

  if(type === actionTypes.REQUEST_LINES_SUCCESS) {

    _lines = Immutable.OrderedMap().withMutations(map => {
      payload.lines.forEach( line => map.set(line.id, Immutable.fromJS(line)) );
    });
    lineStore.emitChange();
  } else if(type === actionTypes.REQUEST_LINE_SUCCESS) {
    if(!_lines) _lines = Immutable.OrderedMap();

    var line = Immutable.fromJS(payload.line);
    _lines = _lines.set(line.get('id'), line);
    lineStore.emitChange();
  }

});

module.exports = lineStore;
