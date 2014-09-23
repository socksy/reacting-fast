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
//Has access to this.props.name, and this.props.children,
//the latter being the description in this implementation.
//TODO: make this mord flexible
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
    //Takes 
    //- a DOM element where to render the list
    //- a React JSX element as to how to render each item
    //- the function for getting data, assuming an offset, limit and callback
    infscroll(document.getElementById('list'), Datum, getFakeData);
}
