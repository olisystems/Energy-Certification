import {
  oliCoinContract,
  productionContract
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

    // gettitg current producer device Type
    oliCoinContract.proDeviceType(e.target.innerHTML, function (error, result) {
      if (!error) {
        $('#proDeviceType').html(result);
      } else {
        console.log(error);
      }
    })



    // // getting current producer location Type
    // oliCoinContract.proLocationType(e.targer.innerHTML, function (error, result) {
    //   if (!error) {
    //
    //     $('#proLocationType').html(result[0]);
    //   }else {
    //     console.log(error);
    //   }
    // })

    // // total amount of energy produced by individual producer
    // productionContract.getProBalance(e.target.innerHTML, function (error, result) {
    //   if (!error) {
    //     $('#proAccntBalance').html(result);
    //   } else {
    //     console.log(error);
    //   }
    // })
    //
    // // getting balance of current Producer
    // oliCoinContract.balanceOf(e.targer.innerHTML, function (error, result) {
    //   if (!error) {
    //     $('#proCoinBalance').html(result);
    //   }else {
    //     console.log(error);
    //   }
    // })

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

// minting new tokens

function mintToken() {
  oliCoinContract.mintToken();
}

function tokenization() {

  producerList();

}
window.onload = tokenization();

export default mintToken;
