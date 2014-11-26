'use strict';

// based on this post
// https://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html

jest.dontMock('../lineStore');
jest.dontMock('../../constants/actionTypes');
jest.dontMock('../../utils/storeUtils');
jest.dontMock('immutable');

describe('lineStore', function() {

  var actionTypes = require('../../constants/actionTypes');

  var appDispatcher;
  var callback;

  var actionLinesSuccess = {
    source: 'ignored',
    action: {
      type: actionTypes.REQUEST_LINES_SUCCESS,
      payload: { lines: [ {id: 'bus1', from: 'start', to: 'end'} ] }
    }
  };

  var actionLineSuccess = {
    source: 'ignored',
    action: {
      type: actionTypes.REQUEST_LINE_SUCCESS,
      payload: { line: {
        id: '277',
        from: 'yongchun',
        to: 'songde',
        direct: [{name: 'direct1', timeToNext: -1}],
        reverse: [{name: 'reverse1', timeToNext: 10, bus: ['U1']}]
      } }
    }
  };

  beforeEach(function() {
    appDispatcher = require('../../dispatcher/appDispatcher');
    lineStore = require('../lineStore');
    callback = appDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function() {
    expect(appDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should return an empty map after creation', function() {
    expect(lineStore.getLines().size).toBe(0);
  });

  it('should return undefined for non fetched line', function() {
    expect(lineStore.getLine('foo')).toBeUndefined();
  });

  it('correctly store lines', function() {
    callback(actionLinesSuccess);
    var lines = lineStore.getLines();
    var line = lineStore.getLine('bus1');

    expect(lines.size).toBe(1);
    expect(line.get('id')).toBe('bus1');
    expect(line.get('from')).toBe('start');
    expect(line.get('to')).toBe('end');
  });

  it('correctly store one line', function() {
    callback(actionLineSuccess);
    var lines = lineStore.getLines();
    var line = lineStore.getLine('277');

    expect(lines.size).toBe(1);
    expect(line.get('id')).toBe('277');
    expect(line.get('direct').size).toBe(1);
    expect(line.get('reverse').size).toBe(1);
  });

});
