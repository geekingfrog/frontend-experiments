/** @jsx React.DOM */
'use strict';

var React = require('react');
var { Link } = require('react-router');

module.exports = React.createClass({
  render() {
    return (
      <div className="landing-menu">
      <h3>wot?</h3>

        <div className="landing-menu-row">
          <Link to="busLines" className="landing-menu-item">
            <i className="flaticon-bus5"></i>Lines
          </Link>
          <div className="landing-menu-item"><i className="flaticon-heart"></i>Favorites</div>
        </div>

        <div className="landing-menu-row">
          <div className="landing-menu-item"><i className="flaticon-bus5"></i>Lines</div>
          <div className="landing-menu-item"><i className="flaticon-heart"></i>Favorites</div>
        </div>

      </div>
    );
  }
});
