/** @jsx React.DOM */
'use strict';

var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./app.jsx');
var Index = require('./views/index.jsx');
var BusLines = require('./views/busLines.jsx');
var BusLinesIndex = require('./views/busLinesIndex.jsx');
var BusLine = require('./views/busLine.jsx');

var routes = (
  <Routes location="hash">
    <Route name="app" path="/" handler={App}>
      <Route name="index" path="/index" handler={Index} />

      <Route name="busLines" path="/busLines" handler={BusLines}>
        <Route name="busLine" path=":id" handler={BusLine} />
        <DefaultRoute handler={BusLinesIndex}/>
      </Route>

      <DefaultRoute handler={Index}/>
    </Route>
  </Routes>
);

module.exports = routes;
