pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address private _admin;

    constructor() ERC20("Token", "CT") {
        _admin = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == _admin, "Only admin can mint");
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        require(msg.sender == _admin, "Only admin can burn");
        _burn(msg.sender, amount);
    }
}