import {
  oliCoinContract,
  productionContract,
  parentContract,
  childContract
} from './contracts.js';

// producer accounts list

function producerList() {
  productionContract.getProAccntsList(function (error, result) {
    if (!error) {
      result.shift();
      for (var i = 0; i < result.length; i++) {
        $("#proAccountList").prepend("<li>" + result[i] + "</li>");
      }
    } else {
      console.log(error);
    }
  })
}

function totalSupply(){
  oliCoinContract.getTotalSupply(function (error, result) {
    if(!error){
      $('#totalSuppy').html(result);
    } else {
      console.log(error);
    }
  })
}

// individual producer account details table
var proAccntList = document.getElementById('proAccountList');
proAccntList.addEventListener('click', activateProAccnt);

function activateProAccnt(e) {
  if (e.target.nodeName == 'LI') {

    // getting balance of current Producer
    setInterval(function () {

      oliCoinContract.balanceOf(e.target.innerHTML, function (error, result) {
        if (!error) {
          $('#proCoinBalance').html(result.c[0]);
        }else {
          console.log(error);
        }
      })

    }, 3000);

    // get registration details for individual account
    productionContract.getProAccntDetails(e.target.innerHTML, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        $('#proOwner').html(result[0]);
        $('#proDeviceType').html(result[1]);
        // $('#proPeakPower').html(result[2]);
        document.getElementById('proPeakPower').innerHTML = result[2];
        $('#proLocationType').html(result[3]);
        $('#proLat').html(result[4] / 10000);
        $('#proLon').html(result[5] / 10000);
        $('#proInstallDate').html(result[6]);}
    })

    // total amount of energy produced by individual producer
    productionContract.getProBalance(e.target.innerHTML, function (error, result) {
      if (!error) {
        document.getElementById('proAccntBalance').innerHTML = result;
      } else {
        console.log(error);
      }
    })



    // removing the background color for ul-selected items
    for (var i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('active');
    }
    // adding background color to active item

    e.target.classList.add('active');

  }

}
function test() {
  // minting new tokens
  console.log(2);
childContract.getValue(0x40e3779cb0808012556e3b3d0593bc80f24d3458, function (error, result) {
  if (!error) {
    console.log(result);
  }
});

}


function tokenization() {

  producerList();
  // test();

}
window.onload = tokenization();

export default test;
