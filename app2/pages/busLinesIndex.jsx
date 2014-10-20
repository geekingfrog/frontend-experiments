/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Promise = require('bluebird');
var lineActionCreator = require('../actions/lineActionCreator');
var lineStore = require('../stores/lineStore');
var createStoreMixin = require('../mixins/createStoreMixin');

var BusLines = React.createClass({

  mixins: [createStoreMixin(lineStore)],

  componentWillMount() {
    console.log('going to mount component busLinesIndex');
    lineActionCreator.requestLines();
  },

  getStateFromStores() {
    var lines = lineStore.getLines();
    console.log('getting state from stores here', !lines);
    return {
      lines: lines,
      isLoading: !lines
    };
  },

  render: function() {
    console.log('this.state?', this.state, this.state.isLoading);
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
    var filteredList = this.props.lines;

    if(input) {
      var r = new RegExp(input, 'i');
      console.log('filtering with input %s', input);
      filteredList = filteredList.filter(bus => {
        return r.test(bus.id);
      });
    }

    var list = filteredList.map(bus => {
      var params = {id: bus.id};
      return [<Link to="/line/:id" params={params}> {bus.id} from: {bus.from} -- to: {bus.to} </Link>, <br/>];
    }).toArray();

    console.log('list length: %d', list.length);
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
