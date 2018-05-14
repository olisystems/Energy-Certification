import {getAllProducers, watchNewProducers, producerList, getProCounter, wathRealTimeEnergy} from './production.js';
import {getAllConsumers, consumerList, getConsCounter, consRealTimeEner} from './consumption.js';

// windows onload functions
function start() {
  getAllProducers();
  watchNewProducers();
  producerList();
  getProCounter();
  wathRealTimeEnergy();

  getAllConsumers();
  consumerList();
  getConsCounter();
  consRealTimeEner();
}
window.onload = start();
