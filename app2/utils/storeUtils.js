'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var shallowEqual = require('react/lib/shallowEqual');
var CHANGE_EVENT = 'change';

var storeUtils = {
  createStore(spec) {
    var store = Object.assign(EventEmitter.prototype, Object.assign(spec, {
      emitChange() {
        this.emit(CHANGE_EVENT);
      },

      addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
      },

      removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
      }
    }));

    _.each(store, function (val, key) {
      if (_.isFunction(val)) {
        store[key] = store[key].bind(store);
      }
    });

    store.setMaxListeners(0);
    return store;
  }
};

module.exports = storeUtils;

