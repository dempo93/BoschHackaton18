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
        string name;
        string company;
        string addr;
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

    struct Customer {
    }

    //struct PrintingLicense {
    //}

    OEM oem;
    //PrintingLicense public printingLicense;
    Customer customer;
    mapping(address => PrintingService) printingServices;
    mapping(string => Part) printableParts;

    function giveRightToPrint(address adrOfPrintingService, string uuidOfPart) public {
        uint index = getIndexOfPart(msg.sender, uuidOfPart);
        var part = printingServices[msg.sender].parts[index];
        if (msg.sender != part.owner) return;
        var printingService = printingServices[adrOfPrintingService];
        printingService.parts[printingService.numParts++] = printableParts[uuidOfPart];
    }

    function print(string uuidOfPart) public returns (string gcodeUrl, uint price, string material) {
        uint index = getIndexOfPart(msg.sender, uuidOfPart);
        var part = printingServices[msg.sender].parts[index];
        if (msg.sender != part.owner) return;
        gcodeUrl = part.gcodeUrl;
        price = part.price;
        material = part.material;
        delete printingServices[msg.sender].parts[index];
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