pragma solidity ^0.4.20;

contract OliCoin {

    uint public constant _totalSupply = 1000000;

    string public constant symbol = "OLC";
    string public constant name = "Oli Coin";
    uint8 public constant decimals = 3;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    event Transfer(address indexed _from, address indexed _to, uint256 _tokens);
    event Approval(address indexed _tokenOwner, address indexed _spender, uint256 _tokens);

    function OliCoin(){

        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() constant returns(uint256 totalSupply){

        return _totalSupply;
    }

    // checking the balance of an account
    function balanceOf(address _tokenOwner) constant returns (uint256 balance){

        return balances[_tokenOwner];
    }

    // trnasfer tokens
    function trnasfer(address _to, uint256 _tokens) returns (bool success) {

        require(balances[msg.sender] >= _tokens && _tokens > 0);

        balances[msg.sender] -= _tokens;
        balances[_to] += _tokens;

        Transfer(msg.sender, _to, _tokens);
        return true;
    }

    // checking permissions to spend tokens
    function transferFrom(address _from, address _to, uint256 _tokens) returns (bool success){

        require (allowed[_from][msg.sender] >= _tokens
        && balances[_from] >= _tokens
        && _tokens > 0);

        balances[_from] -= _tokens;
        balances[_to] += _tokens;

        // decrement the allownce

        allowed[_from][msg.sender] -= _tokens;
        Transfer (_from, _to, _tokens);
        return true;
    }

    // allow to withdraw tokens
    function approve(address _spender, uint256 _tokens) returns (bool success){

        allowed[msg.sender][_spender] = _tokens;
        Approval(msg.sender, _spender, _tokens);
        return true;

    }

    // returns the remaining number of allowed tokens
    function allownce(address _tokenOwner, address _spender) constant returns (uint256 remaining){

        return allowed[_tokenOwner][_spender];
    }

}
