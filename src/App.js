import React, { Component } from 'react';
import axios from 'axios';

const data_1 = require('./shared/data_1');
const data_2  = require('./shared/data_1');
const data_3 = require('./shared/data_1');
const data_4 = require('./shared/data_1');

const headers = {
  headers: {
    'Content-Type': 'application/json',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      realtime: {
        nhietdo: 0,
        doam: 0
      }
    }
  }

  handleData = () => {
    const [year, month, day] = window.$('#datepicker').val().split('-');

    const phBody = { type: 'ph', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', phBody, headers).then((res) => {
      const phBodyMin = { type: 'min_ph', time: `${year}-${month}-${day}` };
      
      axios.post('http://data.solavo.net:6093/range/get', phBodyMin, headers).then((min_ph) => {

        const phBodyMax = { type: 'max_ph', time: `${year}-${month}-${day}` };
        axios.post('http://data.solavo.net:6093/range/get', phBodyMax, headers).then((max_ph) => {
          this.renderPhCharts(res.data,min_ph.data,max_ph.data);
        });
      });
    });

    const ecBody = { type: 'ec', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', ecBody, headers).then((res) => {

      const ecBodyMin = { type: 'min_ec', time: `${year}-${month}-${day}` };
      
      axios.post('http://data.solavo.net:6093/range/get', ecBodyMin, headers).then((min_ec) => {

        const ecBodyMax = { type: 'max_ec', time: `${year}-${month}-${day}` };
        axios.post('http://data.solavo.net:6093/range/get', ecBodyMax, headers).then((max_ec) => {
          this.renderECCharts(res.data,min_ec.data,max_ec.data);
        });
      });
    });


    const tempBody = { type: 'temp', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', tempBody, headers).then((res) => {
      const tempRangeBody = { time: `${year}-${month}-${day}` };

      axios.post('http://data.solavo.net:6093/range/get/temp', tempRangeBody, headers).then((range) => {
        this.renderTempCharts(res.data,range.data);
      });
    });

    const waterBody = { type: 'water', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', waterBody, headers).then((res) => {
      const waterBodyMin = { type: 'min_ec', time: `${year}-${month}-${day}` };
      axios.post('http://data.solavo.net:6093/range/get/water/min', waterBodyMin, headers).then((min_water) => {
        const waterBodyMax = { type: 'max_ec', time: `${year}-${month}-${day}` };
        axios.post('http://data.solavo.net:6093/range/get/water/max', waterBodyMax, headers).then((max_water) => {
          this.renderWaterCharts(res.data,min_water.data,max_water.data);
        });
      });

    });

    
  }

  renderPhCharts = (ph,min_ph,max_ph) => {
    data_1.data[0].dataPoints = ph;
    data_1.axisY[0].title = "pH";
    data_1.axisY[0].lineColor = "#6a1b9a";
    data_1.axisY[0].tickColor = "#6a1b9a";
    data_1.axisY[0].labelFontColor = "#6a1b9a";
    data_1.axisY[0].titleFontColor = "#6a1b9a";
    data_1.axisY[0].suffix = "";
    data_1.data[0].name = "pH";
    data_1.data[0].color = "#6a1b9a";

    data_1.data[1] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_1.data[1].dataPoints = min_ph;
    data_1.data[1].name = "min pH";
    data_1.data[1].color = "black";

    data_1.data[2] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_1.data[2].dataPoints = max_ph;
    data_1.data[2].name = "max pH";
    data_1.data[2].color = "black";

    var chart = new window.CanvasJS.Chart("phChartContainer", data_1);
    chart.render();
  }

  renderECCharts = (ec,min_ec,max_ec) => {
    data_2.data[0].dataPoints = ec;
    data_2.axisY[0].title = "Ec";
    data_2.axisY[0].lineColor = "#2e7d32";
    data_2.axisY[0].tickColor = "#2e7d32";
    data_2.axisY[0].labelFontColor = "#2e7d32";
    data_2.axisY[0].titleFontColor = "#2e7d32";
    data_2.axisY[0].suffix = "mS/cm";
    data_2.data[0].name = "Ec";
    data_2.data[0].color = "#2e7d32";

    data_2.data[1] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_2.data[1].dataPoints = min_ec;
    data_2.data[1].name = "min Ec";
    data_2.data[1].color = "black";

    data_2.data[2] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_2.data[2].dataPoints = max_ec;
    data_2.data[2].name = "max Ec";
    data_2.data[2].color = "black";

    var chart = new window.CanvasJS.Chart("ecChartContainer", data_2);
    chart.render();
  }

  renderTempCharts = (temp,range) => {
    data_3.data[0].dataPoints = temp;
    data_3.axisY[0].title = "Temperature";
    data_3.axisY[0].lineColor = "#e57373";
    data_3.axisY[0].tickColor = "#e57373";
    data_3.axisY[0].labelFontColor = "#e57373";
    data_3.axisY[0].titleFontColor = "#e57373";
    data_3.axisY[0].suffix = "°C";
    data_3.data[0].name = "Temperature";
    data_3.data[0].color = "#e57373";

    data_3.data[1] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };
    data_3.data[1].dataPoints = range;
    data_3.data[1].name = "30°C";
    data_3.data[1].color = "black";

    var chart = new window.CanvasJS.Chart("tempChartContainer", data_3);
    chart.render();
  }

  renderWaterCharts = (water,water_min,water_max) => {
    data_4.data[0].dataPoints = water;
    data_4.axisY[0].title = "Water";
    data_4.axisY[0].lineColor = "#2196f3";
    data_4.axisY[0].tickColor = "#2196f3";
    data_4.axisY[0].labelFontColor = "#2196f3";
    data_4.axisY[0].titleFontColor = "#2196f3";
    data_4.axisY[0].suffix = "";
    data_4.data[0].name = "Water";
    data_4.data[0].color = "#2196f3";

    data_4.data[1] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_4.data[1].dataPoints = water_min;
    data_4.data[1].name = "Water min";
    data_4.data[1].color = "black";

    data_4.data[2] = {
      type: "line",
      name: "Nhiệt độ",
      color: "#C24642",
      axisYIndex: 0,
      showInLegend: true,
      markerSize: 0,
      dataPoints: []
    };

    data_4.data[2].dataPoints = water_max;
    data_4.data[2].name = "Water max";
    data_4.data[2].color = "black";

    var chart = new window.CanvasJS.Chart("waterChartContainer", data_4);
    chart.render();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col l2 offset-l5">
            <label htmlFor="start">Start date:</label>
            <input type="date" id="datepicker" style={{ textAlign: 'center' }} />
            <a onClick={() => this.handleData()} className="waves-effect waves-light btn" style={{ width: '100%' }}>Show Data</a>
          </div>
        </div>
        <div className="row">
          <div id="phChartContainer" style={{ height: '80vh', width: '95vw' }}></div>
        </div>
        <div className="row">
          <div id="ecChartContainer" style={{ height: '80vh', width: '95vw' }}></div>
        </div>
        <div className="row">
          <div id="tempChartContainer" style={{ height: '80vh', width: '95vw' }}></div>
        </div>
        <div className="row">
          <div id="waterChartContainer" style={{ height: '80vh', width: '95vw' }}></div>
        </div>
      </div>
    );
  }
}

export default App;
