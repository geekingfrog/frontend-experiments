/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Promise = require('bluebird');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var createStoreMixin = require('../mixins/createStoreMixin');
var PropTypes = React.PropTypes;

var BusLines = React.createClass({

  mixins: [createStoreMixin(lineStore)],

  componentWillMount() {
    lineActionCreator.requestLines();
  },

  getStateFromStores() {
    var lines = lineStore.getLines();
    return {
      lines: lines,
      isLoading: !lines.size
    };
  },

  render: function() {
    console.log('rendering linelisting with lines:', this.state.lines);
    return (
      (this.state.isLoading) ?
      <h2>loading</h2> :
      <LineListing lines={this.state.lines}/>
    );
  }
});

var LineListing = React.createClass({

  getInitialState() {
    return {input: ''}
  },

  handleInput(ev) {
    this.setState({
      input: this.state.input + ev.target.value
    });
  },

  clearInput() {
    this.setState({input: ''});
  },

  render: function() {
    var input = this.state.input;
    var filteredList = [];

    var r = new RegExp(input, 'i');
    for(var line of this.props.lines.values()) {
      if(input) {
        if(r.test(line.id)) filteredList.push(line);
      } else {
        filteredList.push(line);
      }
    }

    var list = filteredList.map(bus => {
      var params = {id: bus.id};
      return [<Link to="/line/:id" params={params}> {bus.id} from: {bus.from} -- to: {bus.to} </Link>, <br/>];
    });

    if(list.length) {
      list = <ul>{list}</ul>
    } else {
      list = <h3> No lines for search {input}</h3>;
    }

    return (
      <div>
      <input type="text" value={this.state.input} readOnly placeholder="Search"/>
      <br />
      <input type="button" value="0" onClick={this.handleInput}/>
      <input type="button" value="1" onClick={this.handleInput}/>
      <input type="button" value="2" onClick={this.handleInput}/>
      <input type="button" value="3" onClick={this.handleInput}/>
      <input type="button" value="4" onClick={this.handleInput}/>
      <input type="button" value="5" onClick={this.handleInput}/>
      <input type="button" value="6" onClick={this.handleInput}/>
      <input type="button" value="7" onClick={this.handleInput}/>
      <input type="button" value="8" onClick={this.handleInput}/>
      <input type="button" value="9" onClick={this.handleInput}/>
      <br />
      <input type="button" value="clear" onClick={this.clearInput}/>
      <hr />
      {list}
      </div>
    )
  }
})

module.exports = BusLines;
