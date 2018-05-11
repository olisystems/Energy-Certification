// setting up the provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// instance of energy production contract
var productionABI = web3.eth.contract([{"anonymous":false,"inputs":[{"indexed":false,"name":"oliAddr","type":"address"},{"indexed":false,"name":"txTime","type":"uint256[]"},{"indexed":false,"name":"txValue","type":"uint32[]"},{"indexed":false,"name":"blockNumber","type":"uint256[]"},{"indexed":false,"name":"blockHash","type":"bytes32[]"},{"indexed":false,"name":"txGasPrice","type":"uint256[]"}],"name":"ProTransactionEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oliAddr","type":"address"},{"indexed":false,"name":"eTime","type":"uint256"},{"indexed":false,"name":"enerAmount","type":"uint32"}],"name":"EnerProductionEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pvAddr","type":"address"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"deviceType","type":"string"},{"indexed":false,"name":"peakPowerPos","type":"uint32"},{"indexed":false,"name":"peakPowerNeg","type":"uint32"},{"indexed":false,"name":"latitude","type":"uint32"},{"indexed":false,"name":"longitude","type":"uint32"},{"indexed":false,"name":"voltageLevel","type":"uint32"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"installDate","type":"string"}],"name":"ProducerRegs","type":"event"},{"constant":false,"inputs":[{"name":"_enerValue","type":"uint32"}],"name":"setEnerProduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"string"},{"name":"_deviceType","type":"string"},{"name":"_peakPowerPos","type":"uint32"},{"name":"_peakPowerNeg","type":"uint32"},{"name":"_latitude","type":"uint32"},{"name":"_longitude","type":"uint32"},{"name":"_voltageLevel","type":"uint32"},{"name":"_location","type":"string"},{"name":"_installDate","type":"string"}],"name":"setProducer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"countProducers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEnerProduction","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_proAccntAddr","type":"address"}],"name":"getProAccntDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProAccntsList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_proAccntAddr","type":"address"}],"name":"getProBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProducer","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_proAccntAddr","type":"address"}],"name":"getProEnerProduction","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256[]"},{"name":"","type":"uint32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proAccntList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"producerAddr","type":"address"}],"name":"proAccntsArr","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]);
var productionContract = productionABI.at('0xa11d42634f06abe9cb459886820b3e67aa29542a');

// instance of energy consumption contract
var consumptionABI = web3.eth.contract([{"anonymous":false,"inputs":[{"indexed":false,"name":"oliAddr","type":"address"},{"indexed":false,"name":"txTime","type":"uint256[]"},{"indexed":false,"name":"txValue","type":"uint32[]"},{"indexed":false,"name":"blockNumber","type":"uint256[]"},{"indexed":false,"name":"blockHash","type":"bytes32[]"},{"indexed":false,"name":"txGasPrice","type":"uint256[]"}],"name":"ConsTransactionEvent","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"string"},{"name":"_deviceType","type":"string"},{"name":"_peakPowerPos","type":"uint32"},{"name":"_peakPowerNeg","type":"uint32"},{"name":"_latitude","type":"uint32"},{"name":"_longitude","type":"uint32"},{"name":"_voltageLevel","type":"uint32"},{"name":"_location","type":"string"},{"name":"_installDate","type":"string"}],"name":"setConsumer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oliAddr","type":"address"},{"indexed":false,"name":"eTime","type":"uint256"},{"indexed":false,"name":"enerAmount","type":"uint32"}],"name":"EnerConsumptionEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pvAddr","type":"address"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"deviceType","type":"string"},{"indexed":false,"name":"peakPowerPos","type":"uint32"},{"indexed":false,"name":"peakPowerNeg","type":"uint32"},{"indexed":false,"name":"latitude","type":"uint32"},{"indexed":false,"name":"longitude","type":"uint32"},{"indexed":false,"name":"voltageLevel","type":"uint32"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"installDate","type":"string"}],"name":"ConsumerRegs","type":"event"},{"constant":false,"inputs":[{"name":"_enerValue","type":"uint32"}],"name":"setEnerConsumption","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"consAccntList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"consumerAddr","type":"address"}],"name":"consAccntsArr","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countConsumers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_consAccntAddr","type":"address"}],"name":"getConsAccntDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getConsAccntsList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_consAccntAddr","type":"address"}],"name":"getConsBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_consAccntAddr","type":"address"}],"name":"getConsEnerConsumption","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256[]"},{"name":"","type":"uint32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getConsumer","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEnerConsumption","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}]);
var consumptionContract = consumptionABI.at('0xdad2e75913e79590c3c49e40a466486a90c6dd29');

// unix time conversion
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = ("0" + a.getMonth()).slice(-2);
  var date = ("0" + a.getDate()).slice(-2);
  var hour = ("0" + a.getHours()).slice(-2);
  var min = ("0" + a.getMinutes()).slice(-2);
  var sec = ("0" + a.getSeconds()).slice(-2);
  var parsingTime = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  return parsingTime;
};

// setting up current time
function currentTime() {
  var info = web3.eth.getBlock('latest');
  var date = new Date((info.timestamp) * 1000);

  var year = date.getFullYear();
  //var month = ("0" + date.getMonth()).slice(-2);
  var month = date.getUTCMonth() + 1; //months from 1-12
  //var currentDate = ("0" + date.getDate()).slice(-2);
  var day = ("0" + date.getUTCDate()).slice(-2);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}
/*
 * Energy Production Contract
 */

//Registration
var proRegEvent;

function watchNewProducers() {
  proRegEvent = productionContract.ProducerRegs({
    fromBlock: 'latest',
    toBlock: 'latest'
  });
  proRegEvent.watch(function(error, result) {
    if (error) {
      console.log(error);
    } else {
      //document.getElementById("newProducer").innerHTML +="<br />" +  "<br />" + result.args.pvAddr + ', ' + result.args.owner + ', ' + result.args.deviceType + ', ' + result.args.manufacturer + ', ' + result.args.peakPowerPos + ', ' + result.args.peakPowerNeg + ', ' + (result.args.latitude)/10000 + ', ' + (result.args.longitude)/10000 + ', ' + result.args.voltageLevel + ', ' + result.args.location + ', ' + result.args.installDate;
    }
  });
}
 // initializing map globally
 var home = L.icon({
   iconUrl: './img/home.png',
   iconSize: [30,40]
 });

var map = L.map('map').setView([48.77538056, 9.35277778], 14);
mapLink =
  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 10,
  }).addTo(map);

// producer registration
// creating table header
var proHeader = [];
proHeader.push(['Eth Address', 'Owner', 'Device Type', 'Peak Power +', 'Peak Power -', 'Coordinates [Lat-Long]', 'Voltage Level', 'Location', 'Install Date']);

function getAllProducers() {
  productionContract.ProducerRegs({}, {
    fromBlock: 0,
    toBlock: 'latest'
  }).get(function(error, result) {
    if (error) {
      console.error(error);
    } else {

      // table starts from here
      for (var i = 0; i < result.length; i++) {
        proHeader.push([result[i].args.pvAddr, result[i].args.owner, result[i].args.deviceType, result[i].args.peakPowerPos, result[i].args.peakPowerNeg, (result[i].args.latitude) / 10000 + ' ' + (result[i].args.longitude) / 10000, result[i].args.voltageLevel, result[i].args.location, result[i].args.installDate]);
        //header.push([addrArray[i], ownerArray[i], deviceTypeArray[i], peakPowerPosArray[i], peakPowerNegArray[i], coordinatesArray[i], voltageLevelArray[i], locationArray[i], installDateArray[i]]);
      }

      //Create a HTML Table element.
      var proTable = document.createElement("Table");
      proTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      var columnCount = proHeader[0].length;

      //Add the header row.
      var row = proTable.insertRow(-1);

      for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = proHeader[0][i];
        row.appendChild(headerCell);
      }

      //Add the data rows.
      for (var i = 1; i < proHeader.length; i++) {
        row = proTable.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
          var cell = row.insertCell(-1);
          cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
          cell.innerHTML = proHeader[i][j];
        }
      }

      var proRegTable = document.getElementById("proRegs");
      proRegTable.innerHTML = "";
      proRegTable.appendChild(proTable);

      // spatial distribution map

      // difining marker icons

      var producer = L.icon({
        iconUrl: './img/producer.png',
        iconSize: [50,50]
      });

      var proMarkers = [];
      var proLat1 = [];
      var proLon1 = [];

      for (var i = 0; i < result.length; i++) {
        proLat1.push((result[i].args.latitude) / 10000);
        proLon1.push((result[i].args.longitude) / 10000);
        proMarkers.push((result[i].args.latitude) / 10000 + ', ' + (result[i].args.longitude) / 10000);
      }

      var homeMarker = L.marker([48.77538056, 9.16277778], {icon: home}).addTo(map);
      homeMarker.bindPopup("OLI Systems GmbH");
      homeMarker.on('mouseover', function(e) {
        this.openPopup();
      });
      homeMarker.on('mouseout', function(e) {
        this.closePopup();
      });
      for (var i = 0; i < proLat1.length; i++) {
        var proLongitude = proLon1[i];
        var proLatitude = proLat1[i];
        var proPopup = "Eth address: " + result[i].args.pvAddr.slice(0, 7) + '...' + "<br>" + "Producer: " + result[i].args.owner + "<br>" + "Location: " + ((result[i].args.latitude) / 10000) + ", " + ((result[i].args.longitude) / 10000);

        var proMarkerLocation = new L.LatLng(proLatitude, proLongitude);
        var proMarkers = new L.Marker(proMarkerLocation, {icon: producer});
        map.addLayer(proMarkers);
        proMarkers.bindPopup(proPopup);
      }

    }
  });
}

// check if a producer is already registered or not
$('#proRegInfoButton').click(function() {
  productionContract.proAccntsArr($('#inputProAddr').val(), function(error, result) {
    if (!error) {
      $('#proRegInfo').html(' ' + result);
    } else {
      console.log(error);
    }
  })
})
$('#resetProButton').click(function() {
  document.getElementById('inputProAddr').value = "";
  $('#proRegInfo').html('');
});

// producer accounts list

function producerList() {
  productionContract.getProAccntsList(function(error, result) {
    if (!error) {
      result.shift();
      for (var i = 0; i < result.length; i++) {
        $("#proAccountList").prepend("<li>" + result[i] + "</li>");
      }
    } else {
      console.log(error);
    }
  })
}

// producer Counter
function getProCounter() {
  productionContract.countProducers(function(error, result) {
    if (!error) {
      $('#proCounter').html(' ' + result);
    } else {
      console.log(error);
    }
  })
}

// Energy production mapping setup
var EnerProductionEvent;
// real time energy time graph
var enerProduction = [];
var currentProTxTime = [];
var enerProBlockValues = [];
var header1 = [];
header1.push(['Eth Address', 'Time', 'Amount']);

function wathRealTimeEnergy() {
  EnerProductionEvent = productionContract.EnerProductionEvent({
    fromBlock: 'latest',
    toBlock: 'latest'
  });

  EnerProductionEvent.watch(function(error, result) {
    if (!error) {
      // table starts from here
      header1.push([result.args.oliAddr, timeConverter(result.args.eTime), result.args.enerAmount]);
      //Create a HTML Table element.
      var table1 = document.createElement("Table");
      table1.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      var columnCount = header1[0].length;
      //Add the header row.
      var row = table1.insertRow(-1);
      for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = header1[0][i];
        row.appendChild(headerCell);
      }
      //Add the data rows.
      for (var i = 1; i < header1.length; i++) {
        row = table1.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
          var cell = row.insertCell(-1);
          cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
          cell.innerHTML = header1[i][j];
        }
      }

      var realTimeEnergyProductionTable = document.getElementById("realTimeProdunction");
      realTimeEnergyProductionTable.innerHTML = "";
      realTimeEnergyProductionTable.appendChild(table1);

      // ploting real time energy production graph
      // slicing last ten values
      enerProduction.push(result.args.enerAmount.c[0]);
      currentProTxTime.push(currentTime());

      // 1
      var enerProductionNew = [],
        currentTxTimeNew = [];
      // 2 creating single sorted object
      var outputObject = {};
      currentProTxTime.forEach((key, i) => outputObject[key] = enerProduction[i]);

      // 3 conveting object into single arrays
      for (var property in outputObject) {
        if (!outputObject.hasOwnProperty(property)) {
          continue;
        }

      }

      // 4 assigning key and value names
      var timeObject = {};
      var energyValueObject = {};
      var key = "time";
      var value = "energy";
      timeObject[key] = property;
      energyValueObject[value] = outputObject[property];

      // 5 combining keys and values pairs into single array of objects
      function extend(obj, src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
      }

      var combinedObject = extend(timeObject, energyValueObject);
      enerProBlockValues.push(combinedObject);

      // 6 sum up values for same keys

      var holder = {};

      enerProBlockValues.forEach(function(d) {
        if (holder.hasOwnProperty(d.time)) {
          holder[d.time] = holder[d.time] + d.energy;
        } else {
          holder[d.time] = d.energy;
        }
      });

      var combinedObject2 = [];

      for (var prop in holder) {
        combinedObject2.push({
          time: prop,
          energy: holder[prop]
        });
      }

      // 7 conveting object into single arrays
      for (var property in combinedObject2) {
        if (!combinedObject2.hasOwnProperty(property)) {
          continue;
        }
        // currentTxTimeNew.push(property);
        // enerProductionNew.push(combinedObject2[property]);
        currentTxTimeNew.push(combinedObject2[property].time);
        enerProductionNew.push(combinedObject2[property].energy);
      }

      // replacing the original values
      currentProTxTime = currentTxTimeNew;
      enerProduction = enerProductionNew;
      if (enerProduction.length > 10) {
        enerProduction = enerProduction.slice(-10);
        currentProTxTime = currentProTxTime.slice(-10);
      }

  function toDate(ts) {
    return new Date(ts);
  }

  var proData = {
    type: 'date',
    mode: "lines+markers",
    name: 'Producer',

    x: currentProTxTime.map(toDate),
    y: enerProduction,
    line: {
      color: '#009933'
    }
  }
      var consData = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Consumer',
        x: currentConsTxTime.map(toDate),
        y: enerConsumption,
        line: {color: '#cc6600'}
      }

      var data = [proData,consData];

      var layout = {
        xaxis: {
          title: 'Time',
          tickformat: "%H:%M:%S",
          //tickvals: currentConsTxTime.map(toDate),
          linecolor: 'lightgray',
          linewidth: 0.5,
          titlefont: {
            color: 'black'
          }
        },
        yaxis: {
          title: 'Energy [kWh] per Block',
          tickformat: "none",
          linecolor: 'lightgray',
          linewidth: 0.5,
          titlefont: {
            color: 'black'
          },
        },
        margin: {
          l: 80,
          r: 30,
          b: 50,
          t: 15,
          pad: 4
        }
      };

      Plotly.newPlot('realTimeProGraph', data, layout);

    } else {
      console.log(error);
    }
  });
}

// individual producer account details table
proAccntList = document.getElementById('proAccountList');

proAccntList.addEventListener('click', activateProAccnt);
function activateProAccnt(e) {
  if (e.target.nodeName == 'LI') {

    document.getElementById('proAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    productionContract.getProAccntDetails(e.target.innerHTML, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#proAccntRegDetails').html('<b>Owner: </b>' + result[0] + '<br>' + '<b>Device Type: </b>' + result[1] + '<br>' + '<b>Peak Power (+): </b>' + result[2] + '<br>' + '<b>Location Type: </b>' + result[3] + '<br>' + '<b>Latitude: </b>' + result[4] / 10000 + '<br>' + '<b>Longitude: </b>' + result[5] / 10000 + '<br>' + '<b>Install Date: </b>' + result[6]);
      }
    })

    // total amount of energy produced by individual producer
    productionContract.getProBalance(e.target.innerHTML, function(error, result) {
      if (!error) {
        $('#proAccntBalance').html('' + result);
      } else {
        console.log(error);
      }
    })

    // producer account table
    productionContract.getProEnerProduction(e.target.innerHTML, function(error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        var proAccountTable = document.getElementById("proAccount");
        proAccountTable.innerHTML = '';

        var header3 = [];
        header3.push(['Eth Address', 'Time', 'Energy', 'Block Number', 'BlockHash', 'Gas Price [wei]']);

        // table starts from here
        for (var i = 0; i < result[1].length; i++) {
          header3.push([result[0], timeConverter(result[1][i].c), result[2][i].c, result[3][i].c, result[4][i], result[5][i].c]);
        }

        //Create a HTML Table element.
        var proAccntTable = document.getElementById('proAccount');
        proAccntTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

        //Get the count of columns.
        var columnCount = header3[0].length;

        //Add the header row.
        var row = proAccntTable.insertRow(-1);

        for (var i = 0; i < columnCount; i++) {
          var headerCell = document.createElement("TH");
          headerCell.innerHTML = header3[0][i];
          row.appendChild(headerCell);
        }

        //Add the data rows.
        for (var i = 1; i < header3.length; i++) {
          row = proAccntTable.insertRow(-1);
          for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
            cell.innerHTML = header3[i][j];
          }
        }

      }
    })

    // removing the background color for ul-selected items
    for (i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('active');
    }
    // adding background color to active item

    e.target.classList.add('active');

  }
}

/*
 * Energy Consumption Contract
 */

//Registration
var consRegEvent;

function watchNewProducers() {
  consRegEvent = consumptionContract.ConsumerRegs({
    fromBlock: 'latest',
    toBlock: 'latest'
  });
  consRegEvent.watch(function(error, result) {
    if (error) {
      console.log(error);
    } else {
      //document.getElementById("newProducer").innerHTML +="<br />" +  "<br />" + result.args.pvAddr + ', ' + result.args.owner + ', ' + result.args.deviceType + ', ' + result.args.manufacturer + ', ' + result.args.peakPowerPos + ', ' + result.args.peakPowerNeg + ', ' + (result.args.latitude)/10000 + ', ' + (result.args.longitude)/10000 + ', ' + result.args.voltageLevel + ', ' + result.args.location + ', ' + result.args.installDate;
    }
  });
}

// creating table header
var consHeader = [];
consHeader.push(['Eth Address', 'Owner', 'Device Type', 'Peak Power +', 'Peak Power -', 'Coordinates [Lat-Long]', 'Voltage Level', 'Location', 'Install Date']);

function getAllConsumers() {
  consumptionContract.ConsumerRegs({}, {
    fromBlock: 0,
    toBlock: 'latest'
  }).get(function(error, result) {
    if (error) {
      console.error(error);
    } else {

      // table starts from here
      for (var i = 0; i < result.length; i++) {
        consHeader.push([result[i].args.pvAddr, result[i].args.owner, result[i].args.deviceType, result[i].args.peakPowerPos, result[i].args.peakPowerNeg, (result[i].args.latitude) / 10000 + ' ' + (result[i].args.longitude) / 10000, result[i].args.voltageLevel, result[i].args.location, result[i].args.installDate]);
        //header.push([addrArray[i], ownerArray[i], deviceTypeArray[i], peakPowerPosArray[i], peakPowerNegArray[i], coordinatesArray[i], voltageLevelArray[i], locationArray[i], installDateArray[i]]);
      }

      //Create a HTML Table element.
      var consTable = document.createElement("Table");
      consTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      var columnCount = consHeader[0].length;

      //Add the header row.
      var row = consTable.insertRow(-1);

      for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = consHeader[0][i];
        row.appendChild(headerCell);
      }

      //Add the data rows.
      for (var i = 1; i < consHeader.length; i++) {
        row = consTable.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
          var cell = row.insertCell(-1);
          cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
          cell.innerHTML = consHeader[i][j];
        }
      }

      var consRegTable = document.getElementById("consRegs");
      consRegTable.innerHTML = "";
      consRegTable.appendChild(consTable);

      // spatial distribution map
      var consumer = L.icon({
        iconUrl: './img/consumer.png',
        iconSize: [50,50]
      });

      var consMarkers = [];
      var consLat1 = [];
      var consLon1 = [];

      for (var i = 0; i < result.length; i++) {
        consLat1.push((result[i].args.latitude) / 10000);
        consLon1.push((result[i].args.longitude) / 10000);
        consMarkers.push((result[i].args.latitude) / 10000 + ', ' + (result[i].args.longitude) / 10000);
      }

      for (var i = 0; i < consLat1.length; i++) {
        var consLongitude = consLon1[i];
        var consLatitude = consLat1[i];
        var consPopup = "Eth address: " + result[i].args.pvAddr.slice(0, 7) + '...' + "<br>" + "Consumer: " + result[i].args.owner + "<br>" + "Location: " + ((result[i].args.latitude) / 10000) + ", " + ((result[i].args.longitude) / 10000);

        var consMarkerLocation = new L.LatLng(consLatitude, consLongitude);
        var consMarkers = new L.Marker(consMarkerLocation, {icon: consumer});
        map.addLayer(consMarkers);
        consMarkers.bindPopup(consPopup);
      }
    }
  })
}

// check if a consumer is already registered or not
$('#consRegInfoButton').click(function() {
  consumptionContract.consAccntsArr($('#inputConsAddr').val(), function(error, result) {
    if (!error) {
      $('#consRegInfo').html(' ' + result);
    } else {
      console.log(error);
    }
  })
})
$('#resetConsButton').click(function() {
  document.getElementById('inputConsAddr').value = "";
  $('#consRegInfo').html('');
});

// producer accounts list

function consumerList() {
  consumptionContract.getConsAccntsList(function(error, result) {
    if (!error) {
      result.shift();
      for (var i = 0; i < result.length; i++) {
        $("#consAccountList").prepend("<li>" + result[i] + "</li>");
      }
    } else {
      console.log(error);
    }
  })
}

// consumer Counter
function getConsCounter() {
  consumptionContract.countConsumers(function(error, result) {
    if (!error) {
      $('#consCounter').html(' ' + result);
    } else {
      console.log(error);
    }
  })
}

// individual consumer account details table
consAccntList = document.getElementById('consAccountList');
consAccntList.addEventListener('click', activateConsAccnt);

function activateConsAccnt(e) {
  if (e.target.nodeName == 'LI') {
    document.getElementById('consAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    consumptionContract.getConsAccntDetails(e.target.innerHTML, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#consAccntRegDetails').html('<b>Owner: </b>' + result[0] + '<br>' + '<b>Device Type: </b>' + result[1] + '<br>' + '<b>Peak Power (+): </b>' + result[2] + '<br>' + '<b>Location Type: </b>' + result[3] + '<br>' + '<b>Latitude: </b>' + result[4] / 10000 + '<br>' + '<b>Longitude: </b>' + result[5] / 10000 + '<br>' + '<b>Install Date: </b>' + result[6]);
      }
    })

    // total amount of energy consumed by individual consumer
    consumptionContract.getConsBalance(e.target.innerHTML, function(error, result) {
      if (!error) {
        $('#consAccntBalance').html('' + result);
      } else {
        console.log(error);
      }
    })

    // * table
    consumptionContract.getConsEnerConsumption(e.target.innerHTML, function(error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        var consAccountTable = document.getElementById("consAccount");
        consAccountTable.innerHTML = '';

        var header4 = [];
        header4.push(['Eth Address', 'Time', 'Energy', 'Block Number', 'BlockHash', 'Gas Price [wei]']);

        // table starts from here
        for (var i = 0; i < result[1].length; i++) {
          header4.push([result[0], timeConverter(result[1][i].c), result[2][i].c, result[3][i].c, result[4][i], result[5][i].c]);

        }

        //Create a HTML Table element.
        var consAccountTable = document.getElementById('consAccount');
        consAccountTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

        //Get the count of columns.
        var columnCount = header4[0].length;

        //Add the header row.
        var row = consAccountTable.insertRow(-1);

        for (var i = 0; i < columnCount; i++) {
          var headerCell = document.createElement("TH");
          headerCell.innerHTML = header4[0][i];
          row.appendChild(headerCell);
        }

        //Add the data rows.
        for (var i = 1; i < header4.length; i++) {
          row = consAccountTable.insertRow(-1);
          for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
            cell.innerHTML = header4[i][j];
          }
        }

      }
    })

    // removing the background color for ul-selected items
    for (i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('active');
    }
    // adding background color to active item
    e.target.classList.add('active');
  }
}

// ** Energy consumption mapping setup

var EnerConsumptionEvent;
// real time energy time graph
var enerConsumption = [];
var currentConsTxTime = [];
var enerConsBlockValues = [];

// real time energy table
// creating table header
var header2 = [];
header2.push(['Eth Address', 'Time', 'Amount']);

function consRealTimeEner() {
  EnerConsumptionEvent = consumptionContract.EnerConsumptionEvent({
    fromBlock: 'latest',
    toBlock: 'latest'
  });

  EnerConsumptionEvent.watch(function(error, result) {

    if (!error) {

      // table starts from here
      header2.push([result.args.oliAddr, timeConverter(result.args.eTime), result.args.enerAmount]);
      //Create a HTML Table element.
      var table2 = document.createElement("Table");
      table2.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      var columnCount = header2[0].length;
      //Add the header row.
      var row = table2.insertRow(-1);
      for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = header2[0][i];
        row.appendChild(headerCell);
      }
      //Add the data rows.
      for (var i = 1; i < header2.length; i++) {
        row = table2.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
          var cell = row.insertCell(-1);
          cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
          cell.innerHTML = header2[i][j];
        }
      }

      var realTimeEnergyConsTable = document.getElementById("realTimeConsumption");
      realTimeEnergyConsTable.innerHTML = "";
      realTimeEnergyConsTable.appendChild(table2);

      // ploting real time energy production graph
      // slicing last ten values
      enerConsumption.push(result.args.enerAmount.c[0]);
      currentConsTxTime.push(currentTime());

      // 1
      var enerConsumptionNew = [],
        currentConsTxTimeNew = [];
      // 2 creating single sorted object
      var outputObject = {};
      currentConsTxTime.forEach((key, i) => outputObject[key] = enerConsumption[i]);

      // 3 conveting object into single arrays
      for (var property in outputObject) {
        if (!outputObject.hasOwnProperty(property)) {
          continue;
        }

      }

      // 4 assigning key and value names
      var timeObject = {};
      var energyValueObject = {};
      var key = "time";
      var value = "energy";
      timeObject[key] = property;
      energyValueObject[value] = outputObject[property];

      // 5 combining keys and values pairs into single array of objects
      function extend(obj, src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
      }

      var combinedObject = extend(timeObject, energyValueObject);
      enerConsBlockValues.push(combinedObject);

      // 6 sum up values for same keys
      var holder = {};
      enerConsBlockValues.forEach(function(d) {
        if (holder.hasOwnProperty(d.time)) {
          holder[d.time] = holder[d.time] + d.energy;
        } else {
          holder[d.time] = d.energy;
        }
      });

      var combinedObject2 = [];

      for (var prop in holder) {
        combinedObject2.push({
          time: prop,
          energy: holder[prop]
        });
      }

      // 7 conveting object into single arrays
      for (var property in combinedObject2) {
        if (!combinedObject2.hasOwnProperty(property)) {
          continue;
        }
        // currentTxTimeNew.push(property);
        // enerProductionNew.push(combinedObject2[property]);
        currentConsTxTimeNew.push(combinedObject2[property].time);
        enerConsumptionNew.push(combinedObject2[property].energy);
      }

      // replacing the original values
      currentConsTxTime = currentConsTxTimeNew;
      enerConsumption = enerConsumptionNew;
      if (enerConsumption.length > 10) {
        enerConsumption = enerConsumption.slice(-10);
        currentConsTxTime = currentConsTxTime.slice(-10);
      }

      //Plotly.newPlot('realTimeProGraph', data, timeSeriesGraphLayout);

    } else {
      console.log(error);
    }
  });
}

// windows onload functions
function start() {
  getAllProducers();
  watchNewProducers();
  producerList();
  consumerList();
  getProCounter();
  wathRealTimeEnergy();
  consRealTimeEner();
  getAllConsumers();
  getConsCounter();
}
window.onload = start();
