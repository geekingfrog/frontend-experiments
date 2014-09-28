/** @jsx React.DOM */
'use strict';

var React = require('react');

var Index = React.createClass({
  render: function() {
    return (
    <div className="landing-menu">

      <div className="landing-menu-row">
        <div className="landing-menu-item"><i className="flaticon-bus5"></i>Lines</div>
        <div className="landing-menu-item"><i className="flaticon-heart"></i>Favorites</div>
      </div>

      <div className="landing-menu-row">
        <div className="landing-menu-item"><i className="flaticon-bus5"></i>Lines</div>
        <div className="landing-menu-item"><i className="flaticon-heart"></i>Favorites</div>
      </div>

    </div>
    )
  }
});

module.exports = Index;
