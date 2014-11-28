'use strict';

var { Dispatcher } = require('flux');
var payloadSources = require('../constants/payloadSources');

var AppDispatcher = Object.assign(new Dispatcher(), {
  handleServerAction(action) {
    if(!action.type) {
      throw new Error('Empty action.type. You likely mistyped the action');
    }

    this.dispatch({
      source: payloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction(action) {
    if(!action.type) {
      throw new Error('Empty action.type. You likely mistyped the action');
    }

    this.dispatch({
      source: payloadSources.VIEW_ACTION,
      action: action
    });
  }
});

module.exports = AppDispatcher;
