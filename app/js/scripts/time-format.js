import web3 from './contracts.js';

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

export{timeConverter, currentTime};
