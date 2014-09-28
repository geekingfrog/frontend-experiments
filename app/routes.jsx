/** @jsx React.DOM */
'use strict';

var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./app.jsx');
var Index = require('./views/index.jsx');

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="index" handler={Index} />
      <DefaultRoute handler={Index}/>
    </Route>
  </Routes>
);

module.exports = routes;

