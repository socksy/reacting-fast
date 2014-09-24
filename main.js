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
  setTimeout(function(){ // <- first version was missing this timeout
      callback(null, data);
  }, 0)
};
 
//the JSX representation of a single point, easily changed
//Has access to this.props.name, and this.props.children,
//the latter being the description in this implementation.
//TODO: make this mord flexible
var Datum = React.createClass({displayName: 'Datum',
    render: function() {
        return (
            React.DOM.div({className: "datum"}, 
            React.DOM.h2(null, 
            this.props.name
            ), 
            React.DOM.span(null, this.props.children)
            )
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
