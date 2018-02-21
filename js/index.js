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
		"constant": true,
		"inputs": [],
		"name": "part",
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
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "uuid",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"constant": true,
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
		"stateMutability": "view",
		"type": "function"
	}
]);

var printing = printingContract.at('0xbbf289d846208c16edc8474705c748aff07732db');
console.log(printing);
var oemAccount = printingContract.at('0xca35b7d915458ef540ade6068dfe2f44e8fa733c');
var printingService = printingContract.at('0x14723a09acff6d2a60dcdf7aa4aff308fddc160c');
var customer = printingContract.at('0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db');

/*
coursetro.getInstructor(function(error, result){
	if(!error)
	{
		$("#instructor").html(result[0]+' ('+result[1]+' years old)');
		console.log(result);
	}
	else
		console.error(error);
});

$("#button").click(function() {
	coursetro.setInstructor($("#name").val(), $("#age").val());
});*/
