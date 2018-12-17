import React from "react";
import Chart from "react-apexcharts";

class LineChart extends React.Component {
  render() {
    // get data from props
    const { options, series, type, width, height } = this.props;
    return (
      <div className="chartWrapper">
        <Chart
          className="chart"
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

export default LineChart;
