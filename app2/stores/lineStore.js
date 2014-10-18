'use strict';

var Immutable = require('immutable');
var { createStore } = require('../utils/storeUtils');
var appDispatcher = require('../dispatcher/appDispatcher');
var actionTypes = require('../constants/actionTypes');

var _lines;
// = Immutable.OrderedMap.empty();

var lineStore = createStore({
  getLines() { return _lines; },
  getLine(id) { return _lines && _lines.get(id); }
});

lineStore.dispatchToken = appDispatcher.register(function(data) {
  var {source, action} = data;
  var {type, payload} = action;

  console.log('got action from dispatcher with type:', type);
  if(type === actionTypes.REQUEST_LINES_SUCCESS) {
    console.log('line store got action from dispatcher:', data, payload);

    _lines = Immutable.OrderedMap.empty().withMutations(map => {
      payload.lines.forEach( line => map.set(line.id, line) );
    });
    lineStore.emitChange();
  } else if(type === actionTypes.REQUEST_LINE_SUCCESS) {
    console.log('line store got one line from dispatcher', data, payload);
    if(!_lines) _lines = Immutable.OrderedMap.empty();

    var line = payload.line;
    _lines = _lines.set(line.id, line);
    lineStore.emitChange();
  }

});

module.exports = lineStore;
