if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var printingContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuidOfPart",
				"type": "string"
			}
		],
		"name": "print",
		"outputs": [
			{
				"name": "gcodeUrl",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "material",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuidOfPart",
				"type": "string"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "registerSenderAsPrintingService",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "adrOfPrintingService",
				"type": "address"
			},
			{
				"name": "uuidOfPart",
				"type": "string"
			}
		],
		"name": "giveRightToPrint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "adrOfPrintingService",
				"type": "address"
			},
			{
				"name": "uuidOfPart",
				"type": "string"
			}
		],
		"name": "getIndexOfPart",
		"outputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_gcodeUrl",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			},
			{
				"name": "_material",
				"type": "string"
			},
			{
				"name": "_uuid",
				"type": "string"
			}
		],
		"name": "addPart",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuidOfPart",
				"type": "string"
			}
		],
		"name": "orderPrint",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	}
]);

var printingContractInstance = printingContract.at('0xbbf289d846208c16edc8474705c748aff07732db');
console.log(printingContractInstance);
var oemAccount = printingContract.at('0xca35b7d915458ef540ade6068dfe2f44e8fa733c');
var printingService = printingContract.at('0x14723a09acff6d2a60dcdf7aa4aff308fddc160c');
var customer = printingContract.at('0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db');
