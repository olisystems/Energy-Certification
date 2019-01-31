pragma solidity ^0.4.20;

import './IERC20.sol';
import './SafeMath.sol';
import './Owned.sol';
import './EnergyProduction.sol';

contract OliCoin is IERC20, Owned {

  using SafeMath for uint;
  /* instantiating parent contract*/
  EnergyProduction p = EnergyProduction(0x038f160ad632409bfb18582241d9fd88c1a072ba);
  uint256 public totalSupply;

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

  /* minting new coins */
  function mintToken() {
    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("Battery")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Urban"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 1;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 1;
    }
    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("Battery")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Rural"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 2;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 2;
    }

    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("CHP")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Urban"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 2;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 2;
    }
    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("CHP")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Rural"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 3;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 3;
    }

    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("Wind")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Urban"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 3;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 3;
    }
    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("Wind")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Rural"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 4;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 4;
    }

    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("PV")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Urban"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 4;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 4;
    }
    if (uint(keccak256(p.getDeviceTypeForCoin(msg.sender))) == uint(keccak256("PV")) && uint(keccak256(p.getLocationForCoin(msg.sender))) == uint(keccak256("Rural"))){
      balances[msg.sender] += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 5;
      totalSupply += (p.getEnerProductionForCoin(msg.sender)[p.getEnerProductionForCoin(msg.sender).length - 1]) * 5;
    }

  }

}

"a", "Battery", 54,45,45,45,45, "Rural"
