pragma solidity ^0.4.20;

contract Owned{

    address public owner;

    function Owned() {

        owner = msg.sender;
    }

    modifier onlyOwner {

        require(msg.sender == owner);

        _;
    }

}
