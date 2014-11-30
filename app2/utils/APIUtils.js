'use strict';

// @flow

var API_ROOT = 'http://localhost:8080/api/';
var Promise = require('bluebird');
var request = require('superagent');

var APIUtils = {
  getJSON(endpoint: string) {
    if(endpoint.indexOf(API_ROOT) === -1) {
      endpoint = API_ROOT + endpoint;
    }

    return new Promise(function(resolve, reject) {
      request.get(endpoint)
      .end(function(err, res) {
        if(err) return reject(err);

        resolve(JSON.parse(res.text));
      });
    });
  }
};

module.exports = APIUtils;
