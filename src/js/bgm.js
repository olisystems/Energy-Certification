import Plotly from 'plotly.js-dist';

Plotly.d3.csv("https://raw.githubusercontent.com/m-yahya/bgm-mockup/master/Deviation%20Mockup.csv", function(err, rows) {

  function unpack(rows, key) {
    return rows.map(function(row) {
      return row[key];
    });
  }

  let data = [{
    type: "scatter",
    fill: 'tonexty',
    fillcolor: '#17BECF',
    mode: "lines",
    x: unpack(rows, 'Date'),
    y: unpack(rows, 'Deviations'),
    line: {
      color: '#17BECF'
    }
  }];

  let layout = {
    title: 'BRP Load Deviations',
    xaxis: {
      ticks: "outside",
      autotick: true,
      tickwidth: 1,
      tickangle: 40,
      ticklen: 5,
      showline: true,
      showgrid: false
    }
  };

  Plotly.newPlot('myDiv', data, layout);
});
