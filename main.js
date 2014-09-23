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

infscroll(document.getElementByID('list'), Datum, getFakeData);
