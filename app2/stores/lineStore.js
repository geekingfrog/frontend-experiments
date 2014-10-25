'use strict';

var Immutable = require('immutable');
var { createStore } = require('../utils/storeUtils');
var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');

var _lines;

var lineStore = createStore({
  getLines() { return _lines; },
  getLine(id) { return _lines && _lines.get(id); }
});

lineStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action} = data;
  var {type, payload} = action;

  if(type === actionTypes.REQUEST_LINES_SUCCESS) {

    _lines = Immutable.OrderedMap.empty().withMutations(map => {
      payload.lines.forEach( line => map.set(line.id, Immutable.fromJS(line)) );
    });
    lineStore.emitChange();
  } else if(type === actionTypes.REQUEST_LINE_SUCCESS) {
    if(!_lines) _lines = Immutable.OrderedMap.empty();

    var line = Immutable.fromJS(payload.line);
    _lines = _lines.set(line.get('id'), line);
    lineStore.emitChange();
  }

});

module.exports = lineStore;
