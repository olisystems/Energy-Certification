import {
  getAllProducers,
  watchNewProducers,
  producerList,
  getProCounter,
  watchRealTimeEnergy
} from './production.js';
import {
  getAllConsumers,
  consumerList,
  getConsCounter,
  consRealTimeEner
} from './consumption.js';

// browser detection
import Bowser from 'bowser';
const browser = Bowser.getParser(window.navigator.userAgent);
//console.log(`The current browser is "${browser.getBrowserName()}"`);
const getBrowser = browser.getBrowserName();
if (getBrowser != "Chrome") {
  alert("Hi there, please open the link in Google Chrome for the best experience!");
}

// windows onload functions
async function start() {
  getAllProducers();
  watchNewProducers();
  producerList();
  getProCounter();
  await watchRealTimeEnergy();

  getAllConsumers();
  consumerList();
  getConsCounter();
  await consRealTimeEner();
}
window.onload = start();
