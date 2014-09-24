/** @jsx React.DOM */

var Test = React.createClass({
  render: function() {
    return (
      <div> Foobared </div>
    )
  }
});

React.renderComponent(
  <Test />,
  document.getElementById('example')
);
