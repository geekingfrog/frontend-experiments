'use strict';

var API_ROOT = 'http://localhost:8080/api/';
var Promise = require('bluebird');
// var request = require('request');
// var get = Promise.promisify(request);
var $ = require('jquery');

// busLines: Promise.cast($.getJSON('http://localhost:8080/api/line'))

var APIUtils = {
  getJSON(endpoint) {
    if(endpoint.indexOf(API_ROOT) === -1) {
      endpoint = API_ROOT + endpoint;
    }

    return Promise.cast($.getJSON(endpoint));
  }
};

module.exports = APIUtils;
