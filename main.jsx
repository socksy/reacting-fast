/** @jsx React.DOM */
var React = require('react');
var infscroll = require('./lib/infinite-scroll.js');

function getFakeData(offset, limit, callback) {
  var data = [];

  for (var i=0; i<limit; i++) {
    var id = offset + i;
    data.push({
      id: id,
      name: "Name " + id,
      description: "Description " + id
    });
  }

  callback(null, data);
};
 
//the JSX representation of a single point, easily changed
var Datum = React.createClass({
    render: function() {
        return (
            <div className="datum">
            <h2>
            {this.props.name}
            </h2>
            <span>{this.props.children}</span>
            </div>
        );
    }
});

window.onload = function() {
    infscroll(document.getElementById('list'), Datum, getFakeData);
}
