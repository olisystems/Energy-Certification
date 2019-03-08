import web3 from './contracts.js';

async function getTxsByAccount(contractAddress, startBlockNumber, endBlockNumber) {

  // check endBlockNumber is null
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber();
  }
  // check startBlockNumber
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 3;
  }
  //console.log("Searching for transactions from account " + contractAddress + " within blocks " + startBlockNumber + " and " + endBlockNumber);
  // loop through the blocks to get block transactions
  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    /*
     * If true, the returned block will contain all transactions as objects
     * if false it will only contains the transaction hashes
     * var block = await web3.eth.getBlock(i, true);
     */
    let block = await web3.eth.getBlock(i, true);
    // filter out empty blocks
    if (block.transactions.length != 0) {

      block.transactions.forEach(tx => {
        // filter out transactions for a specific smart contract
        //console.log((tx.to));
        if (contractAddress == tx.to) {

          $("#txHashes").prepend("<li>" + tx.hash + "</li>");
          document.getElementById("txObject").innerHTML = JSON.stringify(tx,  null, 2);
          //console.log(parseInt(tx.input.slice(tx.input.length - 5, tx.input.length)));
          document.getElementById("smart-contract").innerHTML = contractAddress;
          document.getElementById("start-block").innerHTML = startBlockNumber;
          document.getElementById("end-block").innerHTML = endBlockNumber;

        }
      });
    }
  }
}

//0xDDaD3758d3A062d17792093fdaB71b962969F9a0
//0x757aAf7309b999b5e4173409A69cbc3743F66B47

let search = document.getElementById('search-button');
search.addEventListener('click', function () {
  let test = $('#contract-address').val().split(',');
  // document.getElementById("smart-contract").innerHTML = $('#contract-address').val();
  $("#txHashes").empty();
  document.getElementById("display-data-div").classList.remove("remove");
  document.getElementById("infographics-div").classList.remove("remove");
  getTxsByAccount($('#contract-address').val());
  //getTxsByAccount("0xDDaD3758d3A062d17792093fdaB71b962969F9a0");
  // clear input box
  $('#contract-address').val('');
});
