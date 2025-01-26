pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/BridgeToken.sol";

contract MintToken is Script {
    function run() external {
        address tokenAddress = 0xDAdA6de1dba7668DD187Da5879aF4895e6C93Dd4;
        
        address toAddress = 0xDa3Aa228729B51587617969EeA7CB055C9311428;
        
        uint256 amount = 1000 * 10 ** 18;

        Token token = Token(tokenAddress);

        vm.startBroadcast();

        token.mint(toAddress, amount);

        vm.stopBroadcast();
    }
}