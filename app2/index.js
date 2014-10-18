'use strict';

require('6to5/polyfill');

var React = require('react');
var routes = require('./routes.jsx');

React.renderComponent(routes, document.body);

// var [foo, bar] = ['foo', 'bar'];
// var a = [10,9,8,7];
// for(var i of a) {
//   console.log(a[i]);
// }
//
// console.log('stuff here v2');
// throw new Error('boom here');
// console.log('no more stuff');
