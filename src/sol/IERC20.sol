pragma solidity ^0.4.20;

contract IERC20 {

    /* 1. declaring the meta information for the coin */
    string public constant name = 'Oli Coin';
    string public constant symbol = 'OLC';

    /** E.g. decimals = 2, value 100 => 1.00
     * E.g. decimals = 1, value 100 => 10.0
     */
    uint8 public constant decimals = 2;
    uint256 public totalSupply;

    /* 2. mapping  */
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    /* 3. events */
    event Transfer(address indexed _from, address indexed _to, uint256 _tokens);
    event Approval(address indexed _tokenOwner, address indexed _spender, uint256 _tokens);

    /* 4. functions */

    /* transfer tokens function  */
    function transfer(address _to, uint256 _value) returns (bool success);
    /* checking out the balances */
    function balanceOf(address _owner) constant returns (uint256 balance);
    /* approve spender to spend tokens */
    function approve(address _spender, uint256 _value) returns (bool success);
    /* checking the amount of allowed tokens */
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);
    /* spending allowed tokens on behalf of owner */
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);

}
