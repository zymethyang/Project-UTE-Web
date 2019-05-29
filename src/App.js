import React, { Component } from 'react';
import axios from 'axios';

const data = require('./shared/data');

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
      this.renderPhCharts(res.data);
    });

    const ecBody = { type: 'ec', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', ecBody, headers).then((res) => {
      this.renderECCharts(res.data);
    });


    const tempBody = { type: 'temp', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', tempBody, headers).then((res) => {
      this.renderTempCharts(res.data);
    });

    const waterBody = { type: 'water', date: `${year}-${month}-${day}` };
    axios.post('http://data.solavo.net:6093', waterBody, headers).then((res) => {
      this.renderWaterCharts(res.data);
    });
  }

  renderPhCharts = (ph) => {
    data.data[0].dataPoints = ph;
    data.axisY[0].title = "pH";
    data.axisY[0].lineColor = "#6a1b9a";
    data.axisY[0].tickColor = "#6a1b9a";
    data.axisY[0].labelFontColor = "#6a1b9a";
    data.axisY[0].titleFontColor = "#6a1b9a";
    data.axisY[0].suffix = "";
    data.data[0].name = "pH";
    data.data[0].color = "#6a1b9a";

    var chart = new window.CanvasJS.Chart("phChartContainer", data);
    function toogleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    data.legend.itemclick = toogleDataSeries;
    chart.render();
  }

  renderECCharts = (ec) => {
    data.data[0].dataPoints = ec;
    data.axisY[0].title = "EC";
    data.axisY[0].lineColor = "#2e7d32";
    data.axisY[0].tickColor = "#2e7d32";
    data.axisY[0].labelFontColor = "#2e7d32";
    data.axisY[0].titleFontColor = "#2e7d32";
    data.axisY[0].suffix = "mS/cm";
    data.data[0].name = "EC";
    data.data[0].color = "#2e7d32";
    var chart = new window.CanvasJS.Chart("ecChartContainer", data);
    function toogleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    data.legend.itemclick = toogleDataSeries;
    chart.render();
  }

  renderTempCharts = (temp) => {
    data.data[0].dataPoints = temp;
    data.axisY[0].title = "Temperature";
    data.axisY[0].lineColor = "#e57373";
    data.axisY[0].tickColor = "#e57373";
    data.axisY[0].labelFontColor = "#e57373";
    data.axisY[0].titleFontColor = "#e57373";
    data.axisY[0].suffix = "°C";
    data.data[0].name = "Temperature";
    data.data[0].color = "#e57373";
    var chart = new window.CanvasJS.Chart("tempChartContainer", data);
    function toogleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    data.legend.itemclick = toogleDataSeries;
    chart.render();
  }

  renderWaterCharts = (water) => {
    data.data[0].dataPoints = water;
    data.axisY[0].title = "Water";
    data.axisY[0].lineColor = "#2196f3";
    data.axisY[0].tickColor = "#2196f3";
    data.axisY[0].labelFontColor = "#2196f3";
    data.axisY[0].titleFontColor = "#2196f3";
    data.axisY[0].suffix = "";
    data.data[0].name = "Water";
    data.data[0].color = "#2196f3";
    var chart = new window.CanvasJS.Chart("waterChartContainer", data);
    function toogleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    data.legend.itemclick = toogleDataSeries;
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
