import web3 from './contracts.js';

async function getTxsByAccount(contractAddress, startBlockNumber, endBlockNumber) {
  // check endBlockNumber is null
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber();
  }
  // check startBlockNumber
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 10;
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
        if (contractAddress == tx.to) {
          $("#txHashes").prepend("<li>" + tx.hash + "</li>");
          $("#txObject").html(JSON.stringify(tx,  null, 2));
          //console.log(parseInt(tx.input.slice(tx.input.length - 5, tx.input.length)));
          $("#smart-contract").html(contractAddress);
          $("#start-block").html(startBlockNumber);
          $("#end-block").html(endBlockNumber);
        }
      });
    }
  }
}

//0xDDaD3758d3A062d17792093fdaB71b962969F9a0
//0x757aAf7309b999b5e4173409A69cbc3743F66B47

$('#search-button').click(function () {
  let test = $('#contract-address').val().split(',');
  // document.getElementById("smart-contract").innerHTML = $('#contract-address').val();
  $("#txHashes").empty();
  $("#display-data-div").removeClass("remove");
  $("#infographics-div").removeClass("remove");
  getTxsByAccount($('#contract-address').val());
  //getTxsByAccount("0xDDaD3758d3A062d17792093fdaB71b962969F9a0");
  // clear input box
  $('#contract-address').val('');
});
