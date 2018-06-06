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
import test from './token.js';

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
  proRegEvent.watch(function (error, result) {
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
  productionContract.ProducerRegs({}, {
    fromBlock: 0,
    toBlock: 'latest'
  }).get(function (error, result) {
    if (error) {
      console.error(error);
    } else {

      // table starts from here
      for (var i = 0; i < result.length; i++) {
        proHeader.push([result[i].args.pvAddr, result[i].args.owner, result[i].args.deviceType, result[i].args.peakPowerPos, (result[i].args.latitude) / 10000 + ' ' + (result[i].args.longitude) / 10000, result[i].args.voltageLevel, result[i].args.location, result[i].args.installDate]);
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
          cell.innerHTML = proHeader[i][j];
        }
      }

      var proRegTable = document.getElementById("proRegs");
      proRegTable.innerHTML = "";
      proRegTable.appendChild(proTable);

      // spatial distribution map
      // difining marker icons

      var producer = L.icon({
        iconUrl: '../img/producer.png',
        iconSize: [50, 50]
      });

      var proMarkers = [];
      var proLat1 = [];
      var proLon1 = [];

      for (var i = 0; i < result.length; i++) {
        proLat1.push((result[i].args.latitude) / 10000);
        proLon1.push((result[i].args.longitude) / 10000);
        proMarkers.push((result[i].args.latitude) / 10000 + ', ' + (result[i].args.longitude) / 10000);
      }

      for (var i = 0; i < proLat1.length; i++) {
        var proLongitude = proLon1[i];
        var proLatitude = proLat1[i];
        var proPopup = "Eth address: " + result[i].args.pvAddr.slice(0, 7) + '...' + "<br>" + "Producer: " + result[i].args.owner + "<br>" + "Location: " + ((result[i].args.latitude) / 10000) + ", " + ((result[i].args.longitude) / 10000);

        var proMarkerLocation = new L.LatLng(proLatitude, proLongitude);
        var proMarkers = new L.Marker(proMarkerLocation, {
          icon: producer
        });
        map.addLayer(proMarkers);
        proMarkers.bindPopup(proPopup);
      }

    }
  });
}

// check if a producer is already registered or not
$('#proRegInfoButton').click(function () {
  productionContract.proAccntsArr($('#inputProAddr').val(), function (error, result) {
    if (!error) {
      $('#proRegInfo').html(' ' + result);
    } else {
      console.log(error);
    }
  })
})
$('#resetProButton').click(function () {
  document.getElementById('inputProAddr').value = "";
  $('#proRegInfo').html('');
});

// producer accounts list

function producerList() {
  productionContract.getProAccntsList(function (error, result) {
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
  productionContract.countProducers(function (error, result) {
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
header1.push(['Eth Address', 'Time', 'Power [W]']);

function wathRealTimeEnergy() {
  EnerProductionEvent = productionContract.EnerProductionEvent({
    fromBlock: 'latest',
    toBlock: 'latest'
  });

  EnerProductionEvent.watch(function (error, result) {
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

      enerProBlockValues.forEach(function (d) {
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
        line: {
          color: '#cc6600'
        }
      }

      var data = [proData, consData];

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

      test();
      console.log(1);

    } else {
      console.log(error);
    }
  });
}

// individual producer account details table
var proAccntList = document.getElementById('proAccountList');
proAccntList.addEventListener('click', activateProAccnt);
var currentProMarker = {};

function activateProAccnt(e) {
  if (e.target.nodeName == 'LI') {

    // current pro map popup
    productionContract.ProducerRegs({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).get(function (error, result) {
      if (error) {
        console.error(error);
      } else {

        var ethAddr = [];
        var proLoc = [];
        var proLocObject = {};
        var proLocEntries = [];
        var currentProCord = [];

        for (var i = 0; i < result.length; i++) {
          proLoc.push((result[i].args.latitude) / 10000 + ', ' + (result[i].args.longitude) / 10000);
          ethAddr.push(result[i].args.pvAddr);
        }

        // mappin eth address to the coordinates in a single object
        ethAddr.forEach((key, i) => proLocObject[key] = proLoc[i]);

        // storing entries of single object into list of items
        for (var i = 0; i < Object.keys(proLocObject).length; i++) {
          proLocEntries.push(Object.entries(proLocObject)[i]);
        }

        for (var i = 0; i < proLocEntries.length; i++) {
          if (e.target.innerHTML == proLocEntries[i][0]) {
            currentProCord = (proLocObject[e.target.innerHTML]);
            currentProCord = currentProCord.split(',')

            var currentProLat = currentProCord[0].trim();
            var currentProLon = currentProCord[1].trim();

            var currentProIcon = L.icon({
              iconUrl: '../img/producer.png',
              iconSize: [30, 40]
            });

            var popupContent = "Eth address: " + result[i].args.pvAddr.slice(0, 7) + '...' + "<br>" + "Producer: " + result[i].args.owner + "<br>" + "Location: " + ((result[i].args.latitude) / 10000) + ", " + ((result[i].args.longitude) / 10000);
            var popupOptions = {
              'maxWidth': '500',
              'className': 'currentPro-popup' // classname for another popup
            }

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
    })

    // displaying pro registration details
    document.getElementById('proAccntTitle').innerHTML = e.target.innerHTML;

    // get registration details for individual account
    productionContract.getProAccntDetails(e.target.innerHTML, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#proOwner').html(result[0]);
        $('#proDeviceType').html(result[1]);
        // $('#proPeakPower').html(result[2]);
        document.getElementById('proPeakPower').innerHTML = result[2];
        $('#proLocationType').html(result[3]);
        $('#proLat').html(result[4] / 10000);
        $('#proLon').html(result[5] / 10000);
        $('#proInstallDate').html(result[6]);}
    })

    // total amount of energy produced by individual producer
    productionContract.getProBalance(e.target.innerHTML, function (error, result) {
      if (!error) {
        document.getElementById('proAccntBalance').innerHTML = result;
      } else {
        console.log(error);
      }
    })

    // producer account table
    productionContract.getProEnerProduction(e.target.innerHTML, function (error, result) {
      if (error) {
        console.error(error);
      } else {
        // empty table before switching account
        var proAccountTable = document.getElementById("proAccount");
        proAccountTable.innerHTML = '';

        var header3 = [];
        header3.push(['Eth Address', 'Time', 'Power [W]', 'Block Number', 'BlockHash', 'Gas Price [wei]']);

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
            cell.innerHTML = header3[i][j];
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

setInterval(function () {

  var blockNumber = web3.eth.blockNumber;
  var txNumber = web3.eth.getBlockTransactionCount('latest');
  var gasUsed = (web3.eth.getBlock('latest').gasUsed) / 1000000;
  gasUsed = gasUsed.toFixed(2);

  document.getElementById('blockNumber').innerHTML = blockNumber;
  document.getElementById('txMined').innerHTML = txNumber;
  document.getElementById('gasUsed').innerHTML = gasUsed;

}, 3000);

export {
  getAllProducers,
  watchNewProducers,
  producerList,
  getProCounter,
  wathRealTimeEnergy
};
