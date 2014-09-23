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

//Each time you call this function, it gets the next 10 data points
//The purpose of the anonymous function is to provide a closure
newData = (function() {
    currentBase = 1;
    currentStep = 10;
    return function () {
        var returnedData = null;
        getFakeData(currentBase, currentStep, 
                    function(err, data) {
                        returnedData = data;
                    });
        currentBase += currentStep;
        return returnedData;
    }
})();

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

var DataBox = React.createClass({displayName: 'DataBox',
    //DidMount is the function called after it's instantiated into a DOM object
    componentDidMount: function() {
        window.addEventListener('scroll', this.updateListener);
    },
    
    updateListener: function() {
        var node = this.getDOMNode();
        //scroll height is total scrolled area
        //inner height is visible area
        //want threshold to be when the top is a page and a bit away from the end
        var threshold = node.scrollHeight - (window.innerHeight * 1.1);
        if (window.scrollY > threshold) {
            this.setState({data: this.state.data.concat(newData())});
        }
    },

    render: function() {
        var dataList = this.state.data.map(function(dataPoint) {
            return (
                Datum({name: dataPoint.name}, 
                dataPoint.description
                )
           );
        });
        return (
           React.DOM.div({id: "dataBox"}, 
           dataList
           )
       );
    },

    getInitialState: function() {
        return {data: newData()};
    }

});


React.renderComponent(
    DataBox(null),
    document.getElementById('list')
);
