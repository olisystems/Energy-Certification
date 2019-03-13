import web3 from './contracts.js';

// unix time conversion
function timeConverter(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let year = newDate.getFullYear();
  let month = (("0" + (newDate.getMonth() + 1)).slice(-2));
  let date = ("0" + newDate.getDate()).slice(-2);
  let hour = ("0" + newDate.getHours()).slice(-2);
  let min = ("0" + newDate.getMinutes()).slice(-2);
  let sec = ("0" + newDate.getSeconds()).slice(-2);
  let parsingTime = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  return parsingTime;
};

// setting up current time
async function currentTime() {

  let block = await web3.eth.getBlock('latest');
  let date = new Date((block.timestamp) * 1000);
  let year = date.getFullYear();
  //var month = ("0" + date.getMonth()).slice(-2);
  let month = date.getUTCMonth() + 1; //months from 1-12
  //var currentDate = ("0" + date.getDate()).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  let formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}
export {
  timeConverter,
  currentTime
};
