pragma solidity ^0.4.20;

import './Owned.sol';

contract EnergyConsumption is Owned {

  struct Consumer {
    string owner;
    string deviceType;
    uint32 peakPowerPos;
    uint32 peakPowerNeg;
    uint32 latitude;
    uint32 longitude;
    uint32 voltageLevel;
    string location;
    string installDate;
  }

  struct EnerConsumption {
    uint enerTime;
    uint32 enerValue;
  }

  struct ConsTransaction {
    uint[] txTime;
    uint32[] txValue;
    uint[] blockNumber;
    bytes32[] blockHash;
    uint[] txGasPrice;
  }

  event ConsumerRegs(address pvAddr, string owner, string deviceType, uint32 peakPowerPos, uint32 peakPowerNeg, uint32 latitude, uint32 longitude, uint32 voltageLevel, string location, string installDate);
  event EnerConsumptionEvent(address oliAddr, uint256 eTime, uint32 enerAmount);
  event ConsTransactionEvent(address oliAddr, uint[] txTime, uint32[] txValue, uint[] blockNumber, bytes32[] blockHash, uint[] txGasPrice);

  mapping (address => Consumer) consumers;
  mapping (address => uint) accntIndexArr;
  mapping (address => EnerConsumption) enerConsumptions;
  mapping (address => uint) consBalance;
  mapping (address => ConsTransaction) transactions;

  address[] public consAccntList;

  function EnergyConsumption() {
    // position 0 flag invalid address
    consAccntList.push(0x0);
  }

  /*
  * Registration
  */

  function setConsumer(string _owner, string _deviceType, uint32 _peakPowerPos, uint32 _peakPowerNeg, uint32 _latitude, uint32 _longitude, uint32 _voltageLevel, string _location, string _installDate) onlyOwner {
    if (!consAccntsArr(tx.origin)) {
      // mapping address to index
      accntIndexArr[tx.origin] = consAccntList.length;
      consumers[tx.origin] = Consumer(_owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
      consAccntList.push(tx.origin) -1;
      ConsumerRegs(tx.origin, _owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
    }
  }

  // check if an address is already registered or not
  function consAccntsArr(address consumerAddr) constant returns (bool) {
    // address 0x0 is not valid if pos 0 is not in the array
    if (consumerAddr != 0x0 && accntIndexArr[consumerAddr] > 0) {
      return true;
    }
    return false;
  }

  // getting registration details
  function getConsumer() constant returns (address, string, string, uint32, uint32, uint32, uint32, uint32, string, string) {
    return (tx.origin, consumers[tx.origin].owner, consumers[tx.origin].deviceType, consumers[tx.origin].peakPowerPos, consumers[tx.origin].peakPowerNeg, consumers[tx.origin].latitude, consumers[tx.origin].longitude, consumers[tx.origin].voltageLevel, consumers[tx.origin].location, consumers[tx.origin].installDate);
  }

  // get registation details for individual accounts
  function getConsAccntDetails(address _consAccntAddr) constant returns (string, string, uint32, string, uint32, uint32, string) {
    return (consumers[_consAccntAddr].owner, consumers[_consAccntAddr].deviceType, consumers[_consAccntAddr].peakPowerPos, consumers[_consAccntAddr].location, consumers[_consAccntAddr].latitude, consumers[_consAccntAddr].longitude, consumers[_consAccntAddr].installDate);
  }

  // consumer accounts list
  function getConsAccntsList() constant returns (address[]) {
    return consAccntList;
  }

  // count for consumer accounts
  function countConsumers() constant returns (uint) {
    return (consAccntList.length) - 1;
  }

  /*
  * Energy mapping setup
  */

  // getting energy time and amount
  function setEnerConsumption(uint32 _enerValue) onlyOwner {
    // check if consumer already exist
    if (consAccntsArr(tx.origin)) {
      enerConsumptions[tx.origin] = EnerConsumption(now, _enerValue);

      // total energy balance
      consBalance[tx.origin] += _enerValue;

      // indidual accounts transaction history
      transactions[tx.origin].txTime.push(now) -1;
      transactions[tx.origin].txValue.push(_enerValue) -1;
      transactions[tx.origin].blockNumber.push(block.number);
      transactions[tx.origin].blockHash.push(block.blockhash(block.number -1));
      transactions[tx.origin].txGasPrice.push(tx.gasprice) -1;
    }

    EnerConsumptionEvent(tx.origin, now, _enerValue);

  }

  function getEnerConsumption()constant returns(address, uint, uint32) {
    return (tx.origin, enerConsumptions[tx.origin].enerTime, enerConsumptions[tx.origin].enerValue);
  }

  // getting energy consumption details for individual accounts

  function getConsEnerConsumption(address _consAccntAddr)constant returns (address, uint[], uint32[], uint[], bytes32[], uint[]) {
    return (_consAccntAddr, transactions[_consAccntAddr].txTime, transactions[_consAccntAddr].txValue, transactions[_consAccntAddr].blockNumber, transactions[_consAccntAddr].blockHash, transactions[_consAccntAddr].txGasPrice);
  }

  // retrieving individula consumer total amount of energy consumed

  function getConsBalance(address _consAccntAddr)constant returns (uint) {
    return (consBalance[_consAccntAddr]);
  }

}
