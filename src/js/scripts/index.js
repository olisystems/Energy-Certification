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
const getName = browser.getBrowserName();
if (getName != "Chrome") {
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
<<<<<<< HEAD
  getEthAccounts();
}
=======
  }
>>>>>>> d0f02c8c549f9e3f425fcbfe56999c48b34b534b
window.onload = start();
