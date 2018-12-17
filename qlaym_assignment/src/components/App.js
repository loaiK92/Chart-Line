import React, { Component } from "react";
import ApexCharts from "apexcharts";
import oboe from "oboe";

import LineChart from "./LineChart";
import Input from "./Input";

class App extends Component {
  state = {
    type: "line", // chart type
    width: "100%", // chart width
    height: "300", // chart height
    options: {
      // chart option
      chart: {
        id: "line_chart",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 20
          }
        },
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      title: {
        text: "Search To Draw Your Chart",
        align: "center",
        style: {
          fontSize: "18px",
          color: "#008ffb"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "numeric",
        range: 200
      },
      legend: {
        show: false
      }
    },
    series: [
      // chart series
      {
        name: "",
        data: []
      }
    ]
  };

  // empty array to push the fetched data from the server
  data = [];

  // interval is a function to drow the chart. has 3 parameters:
  //        chartData = data to drow the line chart
  //        name = variable name to set it as a name to the series
  //        limit = number to increase the data
  interval = (chartData, name, limit) => {
    // set interval
    const _interval = setInterval(() => {
      // update the series each 20ms
      ApexCharts.exec("line_chart", "updateSeries", [
        {
          name: name,
          data: chartData.slice(0, limit++)
        }
      ]);
      // if the drawing is completed clear the interval and empty the data array
      if (limit === chartData.length) {
        clearInterval(_interval);
        this.data = [];
      }
    }, 20);
    return _interval;
  };

  // searchVariable is a function to fetch data from server.
  // has on parameter:  variable = input value
  searchVariable = variable => {
    // dataCounter is a counter to add XaxisAnnotation
    let dataCounter = 0;

    // limit is a number to specify the amount of data that will appear when you got any data from the server, and then this number will be incremented to draw the line chart one by one
    let limit = 200;

    // check if the data array already has some data, return alert to avoid some difficulties with animation
    if (this.data.length > 0) return alert("Please wait to finish drawing");

    // oboe is a streaming JSON loading for Node and browser.
    // I use it to receive data from the server as a stream
    oboe(`http://localhost:8000/${variable}`).node(`${variable}`, value => {
      // some values in the data are null, so I replace it with 0
      if (value === null) value = 0;
      // push each value as Y value and counter as X value to data array
      this.data.push({ x: dataCounter++, y: value });
    });

    // setTimeout wait for 1s to ensure that we have some data before start drawing the line chart
    setTimeout(() => {
      // update series with limit value for first drawing
      ApexCharts.exec("line_chart", "updateSeries", [
        {
          name: variable,
          data: this.data.slice(0, limit)
        }
      ]);
      // then run interval function to update series and continue drawing one by one
      this.interval(this.data, variable, limit);
    }, 200);
  };
  render() {
    // get the state
    const { type, width, height, options, series } = this.state;
    return (
      <div className="App">
        <Input searchVariable={this.searchVariable} />
        <LineChart
          options={options}
          series={series}
          type={type}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default App;
