
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
