import {
  consumptionContract
} from './contracts.js';
import {
  timeConverter,
  currentTime
} from './time-format.js';
import map from './map.js';

/*
 * Energy Consumption Contract
 */

//Registration
var consRegEvent;

function watchNewConsumers() {
  consRegEvent = consumptionContract.ConsumerRegs({
    fromBlock: 'latest',
    toBlock: 'latest'
  });
  consRegEvent.watch(function (error, result) {
    if (error) {
      console.log(error);
    } else {
      //document.getElementById("newProducer").innerHTML +="<br />" +  "<br />" + result.args.pvAddr + ', ' + result.args.owner + ', ' + result.args.deviceType + ', ' + result.args.manufacturer + ', ' + result.args.peakPowerPos + ', ' + result.args.peakPowerNeg + ', ' + (result.args.latitude)/10000 + ', ' + (result.args.longitude)/10000 + ', ' + result.args.voltageLevel + ', ' + result.args.location + ', ' + result.args.installDate;
    }
  });
}

// creating table header
var consHeader = [];

consHeader.push(['Eth Address', 'Owner', 'Device Type', 'Peak Power (-) [W]', 'Coordinates [Lat-Long]', 'Voltage Level [V]', 'Location', 'Install Date']);

function getAllConsumers() {
  consumptionContract.ConsumerRegs({}, {
    fromBlock: 0,
    toBlock: 'latest'
  }).get(function (error, result) {
    if (error) {
      console.error(error);
    } else {

      // table starts from here
      for (var i = 0; i < result.length; i++) {
        consHeader.push([result[i].args.pvAddr, result[i].args.owner, result[i].args.deviceType, result[i].args.peakPowerNeg, (result[i].args.latitude) / 10000 + ' ' + (result[i].args.longitude) / 10000, result[i].args.voltageLevel, result[i].args.location, result[i].args.installDate]);
        //header.push([addrArray[i], ownerArray[i], deviceTypeArray[i], peakPowerPosArray[i], peakPowerNegArray[i], coordinatesArray[i], voltageLevelArray[i], locationArray[i], installDateArray[i]]);
      }

      //Create a HTML Table element.
      var consTable = document.createElement("Table");
      consTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';
      //consTable.style.cssText = '  position: -webkit-sticky; position: sticky; top: -1px;z-index: 5; background: #fff; table-layout: fixed; width: 100%; font-size: 12px; word-break: break-word; display: block;'
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
          //cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
          cell.innerHTML = consHeader[i][j];
        }
      }


      var consRegTable = document.getElementById("consRegs");
      consRegTable.innerHTML = "";
      consRegTable.appendChild(consTable);

      // spatial distribution map
      var consumer = L.icon({
        iconUrl: '../img/consumer.png',
        iconSize: [50, 50]
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
        var consMarkers = new L.Marker(consMarkerLocation, {
          icon: consumer
        });
        map.addLayer(consMarkers);
        consMarkers.bindPopup(consPopup);
      }
    }
  })
}

// check if a consumer is already registered or not
$('#consRegInfoButton').click(function () {
  consumptionContract.consAccntsArr($('#inputConsAddr').val(), function (error, result) {
    if (!error) {
      $('#consRegInfo').html(' ' + result);
    } else {
      console.log(error);
    }
  })
})
$('#resetConsButton').click(function () {
  document.getElementById('inputConsAddr').value = "";
  $('#consRegInfo').html('');
});

// producer accounts list

function consumerList() {
  consumptionContract.getConsAccntsList(function (error, result) {
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
  consumptionContract.countConsumers(function (error, result) {
    if (!error) {
      $('#consCounter').html(' ' + result);
    } else {
      console.log(error);
    }
  })
}

// individual consumer account details table
var consAccntList = document.getElementById('consAccountList');
consAccntList.addEventListener('click', activateConsAccnt);

function activateConsAccnt(e) {
  if (e.target.nodeName == 'LI') {
    document.getElementById('consAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    consumptionContract.getConsAccntDetails(e.target.innerHTML, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#consAccntRegDetails').html('<b>Owner: </b>' + result[0] + '<br>' + '<b>Device Type: </b>' + result[1] + '<br>' + '<b>Peak Power (-) [W]: </b>' + result[2] + '<br>' + '<b>Location Type: </b>' + result[3] + '<br>' + '<b>Latitude: </b>' + result[4] / 10000 + '<br>' + '<b>Longitude: </b>' + result[5] / 10000 + '<br>' + '<b>Install Date: </b>' + result[6]);
      }
    })

    // total amount of energy consumed by individual consumer
    consumptionContract.getConsBalance(e.target.innerHTML, function (error, result) {
      if (!error) {
        $('#consAccntBalance').html('' + result);
      } else {
        console.log(error);
      }
    })

    // * table
    consumptionContract.getConsEnerConsumption(e.target.innerHTML, function (error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        var consAccountTable = document.getElementById("consAccount");
        consAccountTable.innerHTML = '';

        var header4 = [];
        header4.push(['Eth Address', 'Time', 'Power [W]', 'Block Number', 'BlockHash', 'Gas Price [wei]']);
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
            cell.innerHTML = header4[i][j];
          }
        }

      }
    })

    // removing the background color for ul-selected items
    for (var i = 0; i < e.target.parentNode.children.length; i++) {
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

  EnerConsumptionEvent.watch(function (error, result) {

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
          //cell.style.cssText = 'white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;';
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
      enerConsBlockValues.forEach(function (d) {
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

export {
  currentConsTxTime,
  enerConsumption,
  getAllConsumers,
  consumerList,
  getConsCounter,
  consRealTimeEner
};
