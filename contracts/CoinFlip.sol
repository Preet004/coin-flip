// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _choice) external payable returns (bool) {
        require(msg.value > 0, "Must send some ETH to play");

        bool result = (block.timestamp % 2) == 0; // Simple coin flip logic
        if (result == _choice) {
            payable(msg.sender).transfer(msg.value * 2); // Double the amount if user wins
        }
        return result;
    }
}
