/**
 * A store to hold some global variables like refresh time,
 * locale and other stuff.
 * */
'use strict';

var { createStore } = require('../utils/storeUtils');
var appDispatcher = require('../dispatcher/appDispatcher');

var refreshTime = 1000 * 30; //s
var globalStore = createStore({
  getRefreshTime() { return refreshTime; }
});

module.exports = globalStore;
