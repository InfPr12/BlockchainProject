pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/BridgeToken.sol";

contract BurnToken is Script {
    function run() external {
        address tokenAddress = 0xDAdA6de1dba7668DD187Da5879aF4895e6C93Dd4;
        
        uint256 amount = 100 * 10 ** 18;

        Token token = Token(tokenAddress);

        vm.startBroadcast();

        token.burn(amount);

        vm.stopBroadcast();
    }
}