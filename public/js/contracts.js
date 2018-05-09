if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

// creating the instance of contract
var fooContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_foo",
				"type": "bytes32"
			}
		],
		"name": "setFoo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFoo",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

var foo = fooContract.at('0xaf65fdcba09090091ac2a1f3c5895687cbbebd50');

export {fooContract, foo};
