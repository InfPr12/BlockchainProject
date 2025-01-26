pragma solidity ^0.8.0;
import {Script} from "forge-std/Script.sol";
import {Token} from "../src/BridgeToken.sol";

contract DeployToken is Script {
    function run() external {
        vm.startBroadcast();
        Token token = new Token();
        vm.stopBroadcast();
    }
}