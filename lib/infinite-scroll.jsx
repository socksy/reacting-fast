/** @jsx React.DOM */
React = require('react');

module.exports = function(where, Datum, getFakeData) {

    //Each time you call this function, it gets the next 10 data points
    //The purpose of the anonymous function is to provide a closure
    var newData = (function() {
        currentBase = 1;
        currentStep = 10;
        return function (callback) {
            var returnedData = null;
            getFakeData(currentBase, currentStep, 
                        function(err, data) {callback(err, data)});
            currentBase += currentStep;
        }
    })();


    var DataBox = React.createClass({
        //DidMount is the function called after it's instantiated into a DOM object
        componentDidMount: function() {
            window.addEventListener('scroll', this.updateListener);
        },

        updateWithNewData: function(err, newData) {
            if (err) {
                return;
            }
            this.setState({data: this.state.data.concat(newData)});
        },
        
        updateListener: function() {
            var node = this.getDOMNode();
            //scroll height is total scrolled area
            //inner height is visible area
            //want threshold to be when the top is a page and a bit away from the end
            var threshold = node.scrollHeight - (window.innerHeight * 1.1);
            if (window.scrollY > threshold) {
                newData(this.updateWithNewData);
            }
        },

        render: function() {
            var dataList = this.state.data.map(function(dataPoint) {
                return (
                    <Datum key={dataPoint.id} name={dataPoint.name}>        
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
            newData(this.updateWithNewData);
            return {data: []};
        }

    });


    React.renderComponent(
        <DataBox />,
        where
    );
}
