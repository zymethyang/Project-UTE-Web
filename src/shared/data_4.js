module.exports = {
    axisY: [{
        title: "Nhiệt độ",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        titleFontColor: "#C24642",
        suffix: "°C"
    }],
    toolTip: {
        shared: true
    },
    legend: {
        cursor: "pointer",
    },
    data: [
        {
            type: "line",
            name: "Nhiệt độ",
            color: "#C24642",
            axisYIndex: 0,
            showInLegend: true,
            markerSize: 0,
            dataPoints: []
        }
    ],
}