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

var Datum = React.createClass({
    render: function() {
        return (
            <div class="datum">
            <h2>
            {this.props.name}
            </h2>
            <span>{this.props.children}</span>
            </div>
        );
    }
});

var DataBox = React.createClass({
    render: function() {
        var dataList = this.state.data.map(function(dataPoint) {
            return (
                <Datum name={dataPoint.name}>        
                  {dataPoint.description}
                </Datum>
           );
        });
        return (
           <div id="dataBox">
           {dataList}
           </div>
       );
    },

    getInitialState: function() {
        return {data: [{name: "Name 0", description: "Description 0"}]};
    }

});

React.renderComponent(
    <DataBox />,
    document.getElementById('list')
);
