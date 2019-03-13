import {
  productionContract
} from './contracts.js';
import {
  timeConverter,
  currentTime
} from './time-format.js';
import {
  currentConsTxTime,
  enerConsumption
} from './consumption.js';
import map from './map.js';
import web3 from './contracts.js';

const $ = require("jquery");
import Plotly from 'plotly.js-dist';

/*
 * Energy Production Contract
 */

//Registration
function watchNewProducers() {
  productionContract.events.ProducerRegs({
    fromBlock: 0,
    toBlock: 'latest'
  }, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      //document.getElementById("newProducer").innerHTML +="<br />" +  "<br />" + result.args.pvAddr + ', ' + result.args.owner + ', ' + result.args.deviceType + ', ' + result.args.manufacturer + ', ' + result.args.peakPowerPos + ', ' + result.args.peakPowerNeg + ', ' + (result.args.latitude)/10000 + ', ' + (result.args.longitude)/10000 + ', ' + result.args.voltageLevel + ', ' + result.args.location + ', ' + result.args.installDate;
    }
  });
}

// producer registration
// creating table header
var proHeader = [];
proHeader.push(['Eth Address', 'Owner', 'Device Type', 'Peak Power (+) [W]', 'Coordinates [Lat-Long]', 'Voltage Level [V]', 'Location', 'Install Date']);

function getAllProducers() {
  // refresh page to load new events
  productionContract.getPastEvents('ProducerRegs', {
    fromBlock: 0,
    toBlock: 'latest'
  }, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      // table starts from here
      for (let i = 0; i < result.length; i++) {
        proHeader.push([result[i].returnValues.pvAddr, result[i].returnValues.owner, result[i].returnValues.deviceType, result[i].returnValues.peakPowerPos, (result[i].returnValues.latitude) / 10000 + ' ' + (result[i].returnValues.longitude) / 10000, result[i].returnValues.voltageLevel, result[i].returnValues.location, result[i].returnValues.installDate]);
        //header.push([addrArray[i], ownerArray[i], deviceTypeArray[i], peakPowerPosArray[i], peakPowerNegArray[i], coordinatesArray[i], voltageLevelArray[i], locationArray[i], installDateArray[i]]);
      }
      //Create a HTML Table element.
      let proTable = document.createElement("Table");
      proTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      let columnCount = proHeader[0].length;

      //Add the header row.
      let row = proTable.insertRow(-1);

      for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = proHeader[0][i];
        row.appendChild(headerCell);
      }

      //Add the data rows.
      for (let i = 1; i < proHeader.length; i++) {
        row = proTable.insertRow(-1);
        for (let j = 0; j < columnCount; j++) {
          let cell = row.insertCell(-1);
          cell.innerHTML = proHeader[i][j];
        }
      }

      let proRegTable = document.getElementById("proRegs");
      proRegTable.innerHTML = "";
      proRegTable.appendChild(proTable);

      // spatial distribution map
      // difining marker icons

      let producer = L.icon({
        iconUrl: '../img/producer.png',
        iconSize: [50, 50]
      });
      let proMarkers = [];
      let proLat1 = [];
      let proLon1 = [];

      for (let i = 0; i < result.length; i++) {
        proLat1.push((result[i].returnValues.latitude) / 10000);
        proLon1.push((result[i].returnValues.longitude) / 10000);
        proMarkers.push((result[i].returnValues.latitude) / 10000 + ', ' + (result[i].returnValues.longitude) / 10000);
      }

      for (let i = 0; i < proLat1.length; i++) {
        let proLongitude = proLon1[i];
        let proLatitude = proLat1[i];
        let proPopup = "Eth address: " + result[i].returnValues.pvAddr.slice(0, 7) + '...' + "<br>" + "Producer: " + result[i].returnValues.owner + "<br>" + "Location: " + ((result[i].returnValues.latitude) / 10000) + ", " + ((result[i].returnValues.longitude) / 10000);

        let proMarkerLocation = new L.LatLng(proLatitude, proLongitude);
        proMarkers = new L.Marker(proMarkerLocation, {
          icon: producer
        });
        map.addLayer(proMarkers);
        proMarkers.bindPopup(proPopup);
      }
    }
  });
}

// check if a producer is already registered or not
$('#proRegInfoButton').click(function() {
  productionContract.methods.proAccntsArr($('#inputProAddr').val()).call(function(error, result) {
    if (!error) {
      $('#proRegInfo').html(' ' + result);
    } else {
      console.log(error);
      console.log(result);
    }
  });
});

$('#resetProButton').click(function() {
  document.getElementById('inputProAddr').value = "";
  $('#proRegInfo').html('');
});

// producer accounts list
function producerList() {
  productionContract.methods.getProAccntsList().call(function(error, result) {

    if (!error) {
      result.shift();
      for (let i = 0; i < result.length; i++) {
        $("#proAccountList").prepend("<li>" + result[i] + "</li>");
      }
    } else {
      console.log(error);
    }
  });
}

// producer Counter
function getProCounter() {
  productionContract.methods.countProducers().call(function(error, result) {
    if (!error) {
      $('#proCounter').html(' ' + result);
    } else {
      console.log(error);
    }
  });
}

// Energy production mapping setup
// real time energy time graph
let enerProduction = [];
let currentProTxTime = [];
let enerProBlockValues = [];
let header1 = [];
header1.push(['Eth Address', 'Time', 'Power [W]']);

async function watchRealTimeEnergy() {
  productionContract.events.ProTransactionEvent({
    fromBlock: 'latest',
    toBlock: 'latest'
  }, async function(error, result) {
    if (!error) {
      // table starts from here
      header1.push([result.returnValues[0], timeConverter(result.returnValues[1]), result.returnValues[2]]);
      //Create a HTML Table element.
      let table1 = document.createElement("Table");
      table1.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

      //Get the count of columns.
      let columnCount = header1[0].length;
      //Add the header row.
      let row = table1.insertRow(-1);
      for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = header1[0][i];
        row.appendChild(headerCell);
      }
      //Add the data rows.
      for (let i = 1; i < header1.length; i++) {
        row = table1.insertRow(-1);
        for (let j = 0; j < columnCount; j++) {
          let cell = row.insertCell(-1);
          cell.innerHTML = header1[i][j];
        }
      }

      let realTimeEnergyProductionTable = document.getElementById("realTimeProdunction");
      realTimeEnergyProductionTable.innerHTML = "";
      realTimeEnergyProductionTable.appendChild(table1);

      // ploting real time energy production graph
      // slicing last ten values
      enerProduction.push(Number(result.returnValues.enerAmount));
      currentProTxTime.push(await currentTime());

      // 1
      let enerProductionNew = [],
        currentTxTimeNew = [];
      // 2 creating single sorted object
      let outputObject = {};
      currentProTxTime.forEach((key, i) => outputObject[key] = enerProduction[i]);

      // 3 conveting object into single arrays
      for (var property in outputObject) {
        if (!outputObject.hasOwnProperty(property)) {
          continue;
        }
      }

      // 4 assigning key and value names
      let timeObject = {};
      let energyValueObject = {};
      let key = "time";
      let value = "energy";
      timeObject[key] = property;
      energyValueObject[value] = outputObject[property];

      // 5 combining keys and values pairs into single array of objects
      function extend(obj, src) {
        for (let key in src) {
          if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
      }

      let combinedObject = extend(timeObject, energyValueObject);
      enerProBlockValues.push(combinedObject);

      // 6 sum up values for same keys
      let holder = {};
      enerProBlockValues.forEach(function(d) {

        if (holder.hasOwnProperty(d.time)) {
          holder[d.time] = holder[d.time] + d.energy;
        } else {
          holder[d.time] = d.energy;
        }
      });

      let combinedObject2 = [];
      for (let prop in holder) {
        combinedObject2.push({
          time: prop,
          energy: holder[prop]
        });
      }

      // 7 conveting object into single arrays
      for (let property in combinedObject2) {
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

      let proData = {
        type: 'date',
        mode: "lines+markers",
        name: 'Producer',

        x: currentProTxTime.map(toDate),
        y: enerProduction,
        line: {
          color: '#009933'
        }
      };
      let consData = {
        type: "scatter",
        mode: "lines+markers",
        name: 'Consumer',
        x: currentConsTxTime.map(toDate),
        y: enerConsumption,
        line: {
          color: '#cc6600'
        }
      };

      let data = [proData, consData];
      let layout = {
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
          tickformat: ",d",
          linecolor: 'lightgray',
          linewidth: 0.5,
          titlefont: {
            color: 'black'
          },
          exponentformat: 'e'
        },
        margin: {
          l: 90,
          r: 70,
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
let proAccntList = document.getElementById('proAccountList');
proAccntList.addEventListener('click', activateProAccnt);
let currentProMarker = {};

// latest block number
let latestBlockNumber;

web3.eth.getBlockNumber().then(data => {
  latestBlockNumber = data;
});

function activateProAccnt(e) {
  if (e.target.nodeName == 'LI') {

    // current pro map popup
    productionContract.getPastEvents('ProducerRegs', {
      fromBlock: 0,
      toBlock: 'latest'
    }, function(error, result) {
      if (error) {
        console.log(error);
      } else {

        let ethAddr = [];
        let proLoc = [];
        let proLocObject = {};
        let proLocEntries = [];
        let currentProCord = [];

        for (let i = 0; i < result.length; i++) {
          proLoc.push((result[i].returnValues.latitude) / 10000 + ', ' + (result[i].returnValues.longitude) / 10000);
          ethAddr.push(result[i].returnValues.pvAddr);
        }

        // mapping eth address to the coordinates in a single object
        ethAddr.forEach((key, i) => proLocObject[key] = proLoc[i]);

        // storing entries of single object into list of items
        for (let i = 0; i < Object.keys(proLocObject).length; i++) {
          proLocEntries.push(Object.entries(proLocObject)[i]);
        }

        for (let i = 0; i < proLocEntries.length; i++) {
          if (e.target.innerHTML == proLocEntries[i][0]) {
            currentProCord = (proLocObject[e.target.innerHTML]);
            currentProCord = currentProCord.split(',')

            let currentProLat = currentProCord[0].trim();
            let currentProLon = currentProCord[1].trim();

            let currentProIcon = L.icon({
              iconUrl: '../img/producer.png',
              iconSize: [30, 40]
            });

            let popupContent = "Eth address: " + result[i].returnValues.pvAddr.slice(0, 7) + '...' + "<br>" + "Producer: " + result[i].returnValues.owner + "<br>" + "Location: " + ((result[i].returnValues.latitude) / 10000) + ", " + ((result[i].returnValues.longitude) / 10000);
            let popupOptions = {
              'maxWidth': '500',
              'className': 'currentPro-popup' // classname for another popup
            };

            if (currentProMarker != undefined) {
              map.removeLayer(currentProMarker);
            }

            currentProMarker = L.marker([currentProLat, currentProLon], {
              icon: currentProIcon
            }).addTo(map);
            currentProMarker.bindPopup(popupContent, popupOptions).openPopup();
          }
        }
      }
    });

    // displaying pro registration details
    document.getElementById('proAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    productionContract.methods.getProAccntDetails(e.target.innerHTML).call(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#proOwner').html(result[0]);
        $('#proDeviceType').html(result[1]);
        $('#proPeakPower').html(result[2]);
        $('#proLocationType').html(result[3]);
        $('#proLat').html(result[4] / 10000);
        $('#proLon').html(result[5] / 10000);
        $('#proInstallDate').html(result[6]);
      }
    });

    // total amount of energy produced by individual producer
    productionContract.methods.getProBalance(e.target.innerHTML).call(function(error, result) {
      if (!error) {
        document.getElementById('proAccntBalance').innerHTML = result;
      } else {
        console.log(error);
      }
    });

    // producer account table
    productionContract.methods.getProEnerProduction(e.target.innerHTML).call(function(error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        let proAccountTable = document.getElementById("proAccount");
        proAccountTable.innerHTML = '';

        let header3 = [];
        header3.push(['Eth Address', 'Time', 'Power [W]', 'Block Number', 'BlockHash', 'Gas Price [wei]']);

        // table starts from here
        productionContract.getPastEvents('ProTransactionEvent', {
          fromBlock: (latestBlockNumber - 100),
          toBlock: 'latest'
        }, function(error, result) {
          if (!error) {

            for (let i = 0; i < result.length; i++) {
              if (result[i].returnValues[0] == e.target.innerHTML) {
                header3.push([result[i].returnValues[0], timeConverter(result[i].returnValues[1]), result[i].returnValues[2], result[i].returnValues[3], result[i].returnValues[4], result[i].returnValues[5]]);
              }
            }

            //Create a HTML Table element.
            let proAccntTable = document.getElementById('proAccount');
            proAccntTable.style.cssText = 'table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;';

            //Get the count of columns.
            let columnCount = header3[0].length;

            //Add the header row.
            let row = proAccntTable.insertRow(-1);

            for (let i = 0; i < columnCount; i++) {
              let headerCell = document.createElement("TH");
              headerCell.innerHTML = header3[0][i];
              row.appendChild(headerCell);
            }

            //Add the data rows.
            for (let i = 1; i < header3.length; i++) {
              row = proAccntTable.insertRow(-1);
              for (let j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = header3[i][j];
              }
            }
          }
        });
      }
    });

    // removing the background color for ul-selected items
    for (var i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('active');
    }
    // adding background color to active item
    e.target.classList.add('active');
  }
}

setInterval(function() {
  // block number of latest mined block
  web3.eth.getBlockNumber().then(data => {
    document.getElementById('blockNumber').innerHTML = data;
  });

  // count for the transactions mined in the latest block
  web3.eth.getBlockTransactionCount('latest').then(data => {
    document.getElementById('txMined').innerHTML = data;
  });

  // gas used in latest block
  web3.eth.estimateGas(web3.eth.getBlock('latest')).then(data => {
    document.getElementById('gasUsed').innerHTML = (data / 1000000).toFixed(2);

  });

}, 3000);

export {
  getAllProducers,
  watchNewProducers,
  producerList,
  getProCounter,
  watchRealTimeEnergy
};
