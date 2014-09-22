/** @jsx React.DOM */

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

var DataBox = React.createClass({
    render: function () {
        return (
           <div>
           Test
           </div>
       );
    }
});

React.renderComponent(
    <DataBox />,
    document.getElementById('list')
);
