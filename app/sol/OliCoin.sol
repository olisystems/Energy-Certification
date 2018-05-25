pragma solidity ^0.4.20;

import './IERC20.sol';
import './SafeMath.sol';

contract OliCoin is IERC20 {

  using SafeMath for uint256;

  /* setting up the value for the total supply in the constructor function */
  function OliCoin(uint256 initialSupply) {
    totalSupply = 1000;

    /* assign the total supply to the balance of the owner */
    balances[msg.sender] = totalSupply;
  }

  /* transfer tokens function  */
  function transfer(address _to, uint256 _tokens) returns (bool success) {
    /* check if sender has enough token to transfer */
    require(balances[msg.sender] >= _tokens && _tokens > 0);

    balances[msg.sender] = balances[msg.sender].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);

    Transfer(msg.sender, _to, _tokens);
    return true;
  }

  /* checking out the balances */
  function balanceOf(address _tokenOwner) constant returns(uint256 _tokens) {
    return balances[_tokenOwner];
  }

  /* approve spender to spend tokens */
  function approve(address _spender, uint256 _tokens) returns (bool success) {
    require(_tokens > 0
      && balances[msg.sender] > 0);

    allowances[msg.sender][_spender] = _tokens;

    Approval(msg.sender, _spender, _tokens);
    return true;
  }

  /* checking the amount of allowed tokens */
  function allowance(address _tokenOwner, address _spender) constant returns (uint remaining) {
    return allowances[_tokenOwner][_spender];
  }

  /* spending allowed tokens on behalf of owner */
  function transferFrom(address _from, address _to, uint256 _tokens) returns (bool success) {
    require(_tokens > 0
      && balances[_from] >= _tokens
      && allowances[_from][msg.sender] >= _tokens);

    balances[_from] = balances[_from].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);

    allowances[_from][msg.sender] = allowances[_from][msg.sender].sub(_tokens);

    Transfer(_from, _to, _tokens);
    return true;
  }
}
