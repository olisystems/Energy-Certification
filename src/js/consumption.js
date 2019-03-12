import {
  consumptionContract
} from './contracts.js';
import {
  timeConverter,
  currentTime
} from './time-format.js';
import map from './map.js';
import web3 from './contracts.js';

const $ = require("jquery");
/*
 * Energy Consumption Contract
 */

//Registration
function watchNewConsumers() {
  consumptionContract.events.ConsumerRegs({
    fromBlock: 0,
    fromBlock: 'latest'
  }, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      //document.getElementById("newProducer").innerHTML +="<br />" +  "<br />" + result.args.pvAddr + ', ' + result.args.owner + ', ' + result.args.deviceType + ', ' + result.args.manufacturer + ', ' + result.args.peakPowerPos + ', ' + result.args.peakPowerNeg + ', ' + (result.args.latitude)/10000 + ', ' + (result.args.longitude)/10000 + ', ' + result.args.voltageLevel + ', ' + result.args.location + ', ' + result.args.installDate;
    }
  });
}

// consumer registration
// creating table header
var consHeader = [];
consHeader.push(['Eth Address', 'Owner', 'Device Type', 'Peak Power (-) [W]', 'Coordinates [Lat-Long]', 'Voltage Level [V]', 'Location', 'Install Date']);

function getAllConsumers() {
  consumptionContract.getPastEvents('ConsumerRegs', {
    fromBlock: 0,
    toBlock: 'latest'
  }, function(error, result) {
    if (error) {
      console.error(error);
    } else {

      // table starts from here
      for (var i = 0; i < result.length; i++) {
        consHeader.push([result[i].returnValues.pvAddr, result[i].returnValues.owner, result[i].returnValues.deviceType, result[i].returnValues.peakPowerNeg, (result[i].returnValues.latitude) / 10000 + ' ' + (result[i].returnValues.longitude) / 10000, result[i].returnValues.voltageLevel, result[i].returnValues.location, result[i].returnValues.installDate]);
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
        consLat1.push((result[i].returnValues.latitude) / 10000);
        consLon1.push((result[i].returnValues.longitude) / 10000);
        consMarkers.push((result[i].returnValues.latitude) / 10000 + ', ' + (result[i].returnValues.longitude) / 10000);
      }

      for (var i = 0; i < consLat1.length; i++) {
        var consLongitude = consLon1[i];
        var consLatitude = consLat1[i];
        var consPopup = "Eth address: " + result[i].returnValues.pvAddr.slice(0, 7) + '...' + "<br>" + "Consumer: " + result[i].returnValues.owner + "<br>" + "Location: " + ((result[i].returnValues.latitude) / 10000) + ", " + ((result[i].returnValues.longitude) / 10000);

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
$('#consRegInfoButton').click(function() {
  consumptionContract.methods.consAccntsArr($('#inputConsAddr').val()).call(function(error, result) {
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

// consumer accounts list
function consumerList() {
  consumptionContract.methods.getConsAccntsList().call(function(error, result) {
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
  consumptionContract.methods.countConsumers().call(function(error, result) {
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
var currentConsMarker = {};

// latest block number
var latestBlockNumber;

web3.eth.getBlockNumber().then(data => {
  latestBlockNumber = data;
});

function activateConsAccnt(e) {
  if (e.target.nodeName == 'LI') {

    // current pro map popup
    consumptionContract.getPastEvents('ConsumerRegs', {
      fromBlock: 0,
      toBlock: 'latest'
    }, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        var ethAddr = [];
        var consLoc = [];
        var consLocObject = {};
        var consLocEntries = [];
        var currentConsCord = [];

        for (var i = 0; i < result.length; i++) {

          consLoc.push((result[i].returnValues.latitude) / 10000 + ', ' + (result[i].returnValues.longitude) / 10000);
          ethAddr.push(result[i].returnValues.pvAddr);
        }



        // mappin eth address to the coordinates in a single object
        ethAddr.forEach((key, i) => consLocObject[key] = consLoc[i]);

        // storing entries of single object into list of items
        for (var i = 0; i < Object.keys(consLocObject).length; i++) {
          consLocEntries.push(Object.entries(consLocObject)[i]);
        }

        for (var i = 0; i < consLocEntries.length; i++) {
          if (e.target.innerHTML == consLocEntries[i][0]) {
            currentConsCord = (consLocObject[e.target.innerHTML]);
            currentConsCord = currentConsCord.split(',')
            var currentConsLat = currentConsCord[0].trim();
            var currentConsLon = currentConsCord[1].trim();

            var currentConsIcon = L.icon({
              iconUrl: '../img/consumer.png',
              iconSize: [30, 40]
            });

            var popupContent = "Eth address: " + result[i].returnValues.pvAddr.slice(0, 7) + '...' + "<br>" + "Consumer: " + result[i].returnValues.owner + "<br>" + "Location: " + ((result[i].returnValues.latitude) / 10000) + ", " + ((result[i].returnValues.longitude) / 10000);
            var popupOptions = {
              'maxWidth': '500',
              'className': 'currentCons-popup'
            }

            if (currentConsMarker != undefined) {
              map.removeLayer(currentConsMarker);
            };

            currentConsMarker = L.marker([currentConsLat, currentConsLon], {
              icon: currentConsIcon
            }).addTo(map);
            currentConsMarker.bindPopup(popupContent, popupOptions).openPopup();

          }
        }
      }
    })

    // displaying cons registration details
    document.getElementById('consAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    consumptionContract.methods.getConsAccntDetails(e.target.innerHTML).call(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#consOwner').html(result[0]);
        $('#consDeviceType').html(result[1]);
        // $('#test2').html(result[2]);
        document.getElementById('consPeakPower').innerHTML = result[2];
        $('#consLocationType').html(result[3]);
        $('#consLat').html(result[4] / 10000);
        $('#consLon').html(result[5] / 10000);
        $('#consInstallDate').html(result[6]);
      }
    })

    // total amount of energy consumed by individual consumer
    consumptionContract.methods.getConsBalance(e.target.innerHTML).call(function(error, result) {
      if (!error) {
        document.getElementById('consAccntBalance').innerHTML = result;
      } else {
        console.log(error);
      }
    })

    // * table
    consumptionContract.methods.getConsEnerConsumption(e.target.innerHTML).call(function(error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        var consAccountTable = document.getElementById("consAccount");
        consAccountTable.innerHTML = '';

        var header4 = [];
        header4.push(['Eth Address', 'Time', 'Power [W]', 'Block Number', 'BlockHash', 'Gas Price [wei]']);
        // table starts from here
        consumptionContract.getPastEvents('ConsTransactionEvent', {
          fromBlock: (latestBlockNumber - 100),
          toBlock: 'latest'
        }, function(error, result) {
          if (!error) {

            for (var i = 0; i < result.length; i++) {
              if (result[i].returnValues[0] == e.target.innerHTML) {


          header4.push([result[i].returnValues[0], timeConverter(result[i].returnValues[1]), result[i].returnValues[2], result[i].returnValues[3], result[i].returnValues[4], result[i].returnValues[5]]);

        }
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
  }
})

    // removing the background color for ul-selected items
    for (var i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('activeConsumer');
    }
    // adding background color to active item
    e.target.classList.add('activeConsumer');
  }
}

// ** Energy consumption mapping setup

// real time energy time graph
var enerConsumption = [];
var currentConsTxTime = [];
var enerConsBlockValues = [];

// real time energy table
// creating table header
var header2 = [];
header2.push(['Eth Address', 'Time', 'Power [W]']);

async function consRealTimeEner() {
  consumptionContract.events.ConsTransactionEvent({
    fromBlock: 'latest',
    toBlock: 'latest'
  }, async function(error, result) {
    if (!error) {
      // table starts from here
      header2.push([result.returnValues.oliAddr, timeConverter(result.returnValues.eTime), result.returnValues.enerAmount]);
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
      enerConsumption.push(Number(result.returnValues.enerAmount));
      currentConsTxTime.push(await currentTime());

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

export {
  currentConsTxTime,
  enerConsumption,
  getAllConsumers,
  consumerList,
  getConsCounter,
  consRealTimeEner
};
