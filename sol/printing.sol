pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract Printing {

    struct OEM {
        string name;
        string company;
        string addr;
        address account;
    }

    struct PrintingService {
        address account;
        uint numParts;
        mapping(uint => Part) parts;
    }

    struct Part {
        string gcodeUrl;
        uint price;
        string material;
        address owner; //OEM
        string uuid;
    }

    mapping(address => PrintingService) printingServices; //printing service address -> PrintingService
    mapping(string => Part) printableParts; //uuid -> Part
    address adrCustomer;
    address adrOem;

    function Printing() {
        adrOem = msg.sender;
    }

    function giveRightToPrint(address adrOfPrintingService, string uuidOfPart) public {
        uint index = getIndexOfPart(msg.sender, uuidOfPart);
        var part = printingServices[msg.sender].parts[index];
        if (msg.sender != part.owner) return;
        var printingService = printingServices[adrOfPrintingService];
        printingService.parts[printingService.numParts++] = printableParts[uuidOfPart];
    }

    function registerSenderAsPrintingService() public {
        PrintingService service;
        service.account = msg.sender;
        printingServices[msg.sender] = service;
    }

    function addPart(string _gcodeUrl, uint _price, string _material, string _uuid) public {
        if (msg.sender != adrOem) return;
        printableParts[_uuid].gcodeUrl = _gcodeUrl;
        printableParts[_uuid].price = _price;
        printableParts[_uuid].material = _material;
        printableParts[_uuid].owner = msg.sender;
    }

    function print(string uuidOfPart) public returns (string gcodeUrl, uint price, string material) {
        uint index = getIndexOfPart(msg.sender, uuidOfPart);
        if (index == printingServices[msg.sender].numParts) return; // part is not on the list of parts that the msg.sender is allowed to print
        var part = printingServices[msg.sender].parts[index];
        gcodeUrl = part.gcodeUrl;
        price = part.price;
        material = part.material;
        delete printingServices[msg.sender].parts[index];
        msg.sender.transfer(price * 4 / 5); // printing service gets 80% of the money
        part.owner.transfer(price * 1 / 5); // OEM gets 20%
    }

    function getPrice(string uuidOfPart) public returns (uint price) {
        price = printableParts[uuidOfPart].price;
    }

    function orderPrint(string uuidOfPart) public payable returns (bool) {
        if (msg.value != printableParts[uuidOfPart].price) return false; // customer does not have enough money
        adrCustomer = msg.sender;
        return true;
    }

    function getIndexOfPart(address adrOfPrintingService, string uuidOfPart) view returns (uint i) {
        var printingService = printingServices[adrOfPrintingService];
        for (i = 0; i < printingService.numParts; ++i) {
            if (keccak256(printingService.parts[i].uuid) == keccak256(uuidOfPart)) {
                return;
            }
        }
    }
}