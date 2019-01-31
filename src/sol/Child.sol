pragma solidity ^0.4.20;

import './Parent.sol';

contract Child {

  /* instantiating parent contract*/
  Parent p = Parent(0xbbf289d846208c16edc8474705c748aff07732db);
  uint256[] values;

  uint256 public totalSupply;
  mapping (address => uint256) balances;

  /* inheriting account info from parent contract*/

  function account(address addr)constant returns (uint256[]){
    return p.accountTx(addr);
  }

  /* minting coins */


  function mint (address addr) {

      for ( uint i = 0; i < p.accountTx(addr).length; i++){

          balances[addr] += (p.accountTx(addr))[i];

      }

      totalSupply += balances[addr];

  }



      //totalSupply += p.accountTx(msg.sender)[p.accountTx(msg.sender).length-1];



  function getLength() constant returns (uint){
      return p.accountTx(msg.sender).length;
  }

  function checkBalance(address addr)constant returns(uint256){
      return balances[addr];
  }

}
