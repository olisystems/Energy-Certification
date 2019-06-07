import web3 from './contracts.js';
const $ = require("jquery");

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
      console.log(block.transactions);
      block.transactions.forEach(tx => {
        // filter out transactions for a specific smart contract
        if (contractAddress == tx.to) {
          $("#txHashes").prepend("<li>" + tx.hash + "</li>");
          $("#txObject").html(JSON.stringify(tx, null, 2));
          //console.log(parseInt(tx.input.slice(tx.input.length - 5, tx.input.length)));
          $("#smart-contract").html(contractAddress);
          $("#start-block").html(startBlockNumber);
          $("#end-block").html(endBlockNumber);
        }
      });
    }
  }
}

// 0xB35ade92c443B3b111ddA47C6af8872110fB7a03
// 0x3BF16b8f02669a046551a3380aDC154cd3BcFB38

$('#search-button').click(() => {
  let test = $('#contract-address').val().split(',');
  // document.getElementById("smart-contract").innerHTML = $('#contract-address').val();
  $("#txHashes").empty();
  $("#display-data-div").removeClass("remove");
  $("#infographics-div").removeClass("remove");
  getTxsByAccount($('#contract-address').val().trim());
  //getTxsByAccount("0xDDaD3758d3A062d17792093fdaB71b962969F9a0");
  // clear input box
  $('#contract-address').val('');
});
// enabling enter to submit input data
$("#contract-address").keyup(event => {
  if (event.keyCode === 13) {
    $("#search-button").click();
  }
});

// individual tx object
$('#txHashes').click(getTxObject);

async function getTxObject(e) {
  if (e.target.nodeName == 'LI') {
    let txObj = await web3.eth.getTransaction($(e.target).html());
    // filter out empty blocks
      $("#txObject").html(JSON.stringify(txObj, null, 2));

      // removing the background color for ul-selected items
      for (var i = 0; i < e.target.parentNode.children.length; i++) {
        e.target.parentNode.children[i].classList.remove('active');
      }
      // adding background color to active item
      $(e.target).addClass('active');
  }
}
