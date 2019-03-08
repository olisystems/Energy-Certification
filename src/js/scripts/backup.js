//const Web3 = require('web3');
//const web3 = new Web3("ws://85.214.224.112:8547");
//const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

/*
 * Executes a message call transaction, which is directly executed in the VM of the node,
 * but never mined into the blockchain.
 * https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=web3.eth.call#call
 */

// web3.eth.call({
//     from: "0x757aaf7309b999b5e4173409a69cbc3743f66b47", // contract address
//     data: "0xfd3c13ab"
// }).then(console.log);

// get accounts
// var firstAcc;
// web3.eth.getAccounts().then(console.log);

// web3.eth.getTransaction("0x561cc370ace56577fd4e934151b3f1c49f7b1bf0cbd66539052582838da54a08")
// .then(console.log);
//

async function getTxsByAccount(contractAddress) {
  // get current block number
  let blockNumber = await web3.eth.getBlockNumber();
  // get block data
  let block = await web3.eth.getBlock(blockNumber, true);
  // loop through each transaction
  block.transactions.forEach(tx => {
    // filter out transactions for a specific smart contract
    console.log((tx.to));
    if (contractAddress == tx.to) {
      console.log(tx);
    }
  });
}
