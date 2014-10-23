/** @jsx React.DOM */
'use strict';

var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./app.jsx');
var Index = require('./pages/index.jsx');
var BusLines = require('./pages/busLines.jsx');
var BusLinesIndex = require('./pages/busLinesIndex.jsx');
var BusLine = require('./pages/busLine.jsx');

var Favorites = require('./pages/favorites.jsx');

module.exports = (
  <Routes location="hash">
    <Route name="app" path='/' handler={App}>
      <Route name="index" path="/index" handler={Index} />

      <Route name="busLines" path="/line" handler={BusLines}>
        <Route name="busLine" path=":lineId" handler={BusLine} />
        <DefaultRoute handler={BusLinesIndex} addHandlerKey={false}/>
      </Route>

      <Route name="favorites" path="/favorites" handler={Favorites}/>

      <DefaultRoute handler={Index}/>
    </Route>
  </Routes>
);
