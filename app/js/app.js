!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var a;n.r(t);var r=(a=void 0!==a?new Web3(a.currentProvider):new Web3(new Web3.providers.HttpProvider("http://85.214.224.112:8545"))).eth.contract([{anonymous:!1,inputs:[{indexed:!1,name:"oliAddr",type:"address"},{indexed:!1,name:"txTime",type:"uint256[]"},{indexed:!1,name:"txValue",type:"uint32[]"},{indexed:!1,name:"blockNumber",type:"uint256[]"},{indexed:!1,name:"blockHash",type:"bytes32[]"},{indexed:!1,name:"txGasPrice",type:"uint256[]"}],name:"ProTransactionEvent",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"oliAddr",type:"address"},{indexed:!1,name:"eTime",type:"uint256"},{indexed:!1,name:"enerAmount",type:"uint32"}],name:"EnerProductionEvent",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"pvAddr",type:"address"},{indexed:!1,name:"owner",type:"string"},{indexed:!1,name:"deviceType",type:"string"},{indexed:!1,name:"peakPowerPos",type:"uint32"},{indexed:!1,name:"peakPowerNeg",type:"uint32"},{indexed:!1,name:"latitude",type:"uint32"},{indexed:!1,name:"longitude",type:"uint32"},{indexed:!1,name:"voltageLevel",type:"uint32"},{indexed:!1,name:"location",type:"string"},{indexed:!1,name:"installDate",type:"string"}],name:"ProducerRegs",type:"event"},{constant:!1,inputs:[{name:"_enerValue",type:"uint32"}],name:"setEnerProduction",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_owner",type:"string"},{name:"_deviceType",type:"string"},{name:"_peakPowerPos",type:"uint32"},{name:"_peakPowerNeg",type:"uint32"},{name:"_latitude",type:"uint32"},{name:"_longitude",type:"uint32"},{name:"_voltageLevel",type:"uint32"},{name:"_location",type:"string"},{name:"_installDate",type:"string"}],name:"setProducer",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{constant:!0,inputs:[],name:"countProducers",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getEnerProduction",outputs:[{name:"",type:"address"},{name:"",type:"uint256"},{name:"",type:"uint32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_proAccntAddr",type:"address"}],name:"getProAccntDetails",outputs:[{name:"",type:"string"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getProAccntsList",outputs:[{name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_proAccntAddr",type:"address"}],name:"getProBalance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getProducer",outputs:[{name:"",type:"address"},{name:"",type:"string"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"string"},{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_proAccntAddr",type:"address"}],name:"getProEnerProduction",outputs:[{name:"",type:"address"},{name:"",type:"uint256[]"},{name:"",type:"uint32[]"},{name:"",type:"uint256[]"},{name:"",type:"bytes32[]"},{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"proAccntList",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"producerAddr",type:"address"}],name:"proAccntsArr",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}]).at("0x87c5213a66dc68c32b75e61d61b777fd447c4975"),o=a.eth.contract([{anonymous:!1,inputs:[{indexed:!1,name:"oliAddr",type:"address"},{indexed:!1,name:"txTime",type:"uint256[]"},{indexed:!1,name:"txValue",type:"uint32[]"},{indexed:!1,name:"blockNumber",type:"uint256[]"},{indexed:!1,name:"blockHash",type:"bytes32[]"},{indexed:!1,name:"txGasPrice",type:"uint256[]"}],name:"ConsTransactionEvent",type:"event"},{constant:!1,inputs:[{name:"_owner",type:"string"},{name:"_deviceType",type:"string"},{name:"_peakPowerPos",type:"uint32"},{name:"_peakPowerNeg",type:"uint32"},{name:"_latitude",type:"uint32"},{name:"_longitude",type:"uint32"},{name:"_voltageLevel",type:"uint32"},{name:"_location",type:"string"},{name:"_installDate",type:"string"}],name:"setConsumer",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{anonymous:!1,inputs:[{indexed:!1,name:"oliAddr",type:"address"},{indexed:!1,name:"eTime",type:"uint256"},{indexed:!1,name:"enerAmount",type:"uint32"}],name:"EnerConsumptionEvent",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"pvAddr",type:"address"},{indexed:!1,name:"owner",type:"string"},{indexed:!1,name:"deviceType",type:"string"},{indexed:!1,name:"peakPowerPos",type:"uint32"},{indexed:!1,name:"peakPowerNeg",type:"uint32"},{indexed:!1,name:"latitude",type:"uint32"},{indexed:!1,name:"longitude",type:"uint32"},{indexed:!1,name:"voltageLevel",type:"uint32"},{indexed:!1,name:"location",type:"string"},{indexed:!1,name:"installDate",type:"string"}],name:"ConsumerRegs",type:"event"},{constant:!1,inputs:[{name:"_enerValue",type:"uint32"}],name:"setEnerConsumption",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"consAccntList",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"consumerAddr",type:"address"}],name:"consAccntsArr",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"countConsumers",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_consAccntAddr",type:"address"}],name:"getConsAccntDetails",outputs:[{name:"",type:"string"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getConsAccntsList",outputs:[{name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_consAccntAddr",type:"address"}],name:"getConsBalance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_consAccntAddr",type:"address"}],name:"getConsEnerConsumption",outputs:[{name:"",type:"address"},{name:"",type:"uint256[]"},{name:"",type:"uint32[]"},{name:"",type:"uint256[]"},{name:"",type:"bytes32[]"},{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getConsumer",outputs:[{name:"",type:"address"},{name:"",type:"string"},{name:"",type:"string"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"uint32"},{name:"",type:"string"},{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getEnerConsumption",outputs:[{name:"",type:"address"},{name:"",type:"uint256"},{name:"",type:"uint32"}],payable:!1,stateMutability:"view",type:"function"}]).at("0xbc6c781f40223eff7ccef5b730c01791789d20dc"),i=a;function s(e){var t=new Date(1e3*e),n=t.getFullYear(),a=("0"+t.getMonth()).slice(-2);return("0"+t.getDate()).slice(-2)+"-"+a+"-"+n+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)}function u(){var e=i.eth.getBlock("latest"),t=new Date(1e3*e.timestamp),n=t.getFullYear(),a=t.getUTCMonth()+1,r=("0"+t.getUTCDate()).slice(-2),o=t.getHours(),s="0"+t.getMinutes(),u="0"+t.getSeconds();return n+"-"+a+"-"+r+" "+o+":"+s.substr(-2)+":"+u.substr(-2)}var p=L.icon({iconUrl:"../img/home.png",iconSize:[30,40]}),c=L.map("map").setView([48.77538056,9.35277778],14);L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',maxZoom:10}).addTo(c);var l=L.marker([48.77538056,9.16277778],{icon:p}).addTo(c);l.bindPopup("OLI Systems GmbH"),l.on("mouseover",function(e){this.openPopup()}),l.on("mouseout",function(e){this.closePopup()});var d=c;var m=[];m.push(["Eth Address","Owner","Device Type","Peak Power (-) [W]","Coordinates [Lat-Long]","Voltage Level [V]","Location","Install Date"]),$("#consRegInfoButton").click(function(){o.consAccntsArr($("#inputConsAddr").val(),function(e,t){e?console.log(e):$("#consRegInfo").html(" "+t)})}),$("#resetConsButton").click(function(){document.getElementById("inputConsAddr").value="",$("#consRegInfo").html("")}),document.getElementById("consAccountList").addEventListener("click",function(e){if("LI"==e.target.nodeName){document.getElementById("consAccntTitle").innerHTML=e.target.innerHTML,o.getConsAccntDetails(e.target.innerHTML,function(e,t){e?console.log(e):$("#consAccntRegDetails").html("<b>Owner: </b>"+t[0]+"<br><b>Device Type: </b>"+t[1]+"<br><b>Peak Power (-) [W]: </b>"+t[2]+"<br><b>Location Type: </b>"+t[3]+"<br><b>Latitude: </b>"+t[4]/1e4+"<br><b>Longitude: </b>"+t[5]/1e4+"<br><b>Install Date: </b>"+t[6])}),o.getConsBalance(e.target.innerHTML,function(e,t){e?console.log(e):$("#consAccntBalance").html(""+t)}),o.getConsEnerConsumption(e.target.innerHTML,function(e,t){if(e)console.error(e);else{var n=document.getElementById("consAccount");n.innerHTML="";var a=[];a.push(["Eth Address","Time","Power [W]","Block Number","BlockHash","Gas Price [wei]"]);for(var r=0;r<t[1].length;r++)a.push([t[0],s(t[1][r].c),t[2][r].c,t[3][r].c,t[4][r],t[5][r].c]);var n=document.getElementById("consAccount");n.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";for(var o=a[0].length,i=n.insertRow(-1),r=0;r<o;r++){var u=document.createElement("TH");u.innerHTML=a[0][r],i.appendChild(u)}for(var r=1;r<a.length;r++){i=n.insertRow(-1);for(var p=0;p<o;p++){var c=i.insertCell(-1);c.innerHTML=a[r][p]}}}});for(var t=0;t<e.target.parentNode.children.length;t++)e.target.parentNode.children[t].classList.remove("active");e.target.classList.add("active")}});var y=[],g=[],b=[],v=[];v.push(["Eth Address","Time","Amount"]);var f=[];f.push(["Eth Address","Owner","Device Type","Peak Power (+) [W]","Coordinates [Lat-Long]","Voltage Level [V]","Location","Install Date"]),$("#proRegInfoButton").click(function(){r.proAccntsArr($("#inputProAddr").val(),function(e,t){e?console.log(e):$("#proRegInfo").html(" "+t)})}),$("#resetProButton").click(function(){document.getElementById("inputProAddr").value="",$("#proRegInfo").html("")});var h=[],w=[],P=[],T=[];T.push(["Eth Address","Time","Amount"]),document.getElementById("proAccountList").addEventListener("click",function(e){if("LI"==e.target.nodeName){document.getElementById("proAccntTitle").innerHTML=e.target.innerHTML,r.getProAccntDetails(e.target.innerHTML,function(e,t){e?console.log(e):$("#proAccntRegDetails").html("<b>Owner: </b>"+t[0]+"<br><b>Device Type: </b>"+t[1]+"<br><b>Peak Power (+) [W]: </b>"+t[2]+"<br><b>Location Type: </b>"+t[3]+"<br><b>Latitude: </b>"+t[4]/1e4+"<br><b>Longitude: </b>"+t[5]/1e4+"<br><b>Install Date: </b>"+t[6])}),r.getProBalance(e.target.innerHTML,function(e,t){e?console.log(e):$("#proAccntBalance").html(""+t)}),r.getProEnerProduction(e.target.innerHTML,function(e,t){if(e)console.error(e);else{var n=document.getElementById("proAccount");n.innerHTML="";var a=[];a.push(["Eth Address","Time","Power [W]","Block Number","BlockHash","Gas Price [wei]"]);for(var r=0;r<t[1].length;r++)a.push([t[0],s(t[1][r].c),t[2][r].c,t[3][r].c,t[4][r],t[5][r].c]);var o=document.getElementById("proAccount");o.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";for(var i=a[0].length,u=o.insertRow(-1),r=0;r<i;r++){var p=document.createElement("TH");p.innerHTML=a[0][r],u.appendChild(p)}for(var r=1;r<a.length;r++){u=o.insertRow(-1);for(var c=0;c<i;c++){var l=u.insertCell(-1);l.innerHTML=a[r][c]}}}});for(var t=0;t<e.target.parentNode.children.length;t++)e.target.parentNode.children[t].classList.remove("active");e.target.classList.add("active")}}),window.onload=(r.ProducerRegs({},{fromBlock:0,toBlock:"latest"}).get(function(e,t){if(e)console.error(e);else{for(var n=0;n<t.length;n++)f.push([t[n].args.pvAddr,t[n].args.owner,t[n].args.deviceType,t[n].args.peakPowerPos,t[n].args.latitude/1e4+" "+t[n].args.longitude/1e4,t[n].args.voltageLevel,t[n].args.location,t[n].args.installDate]);var a=document.createElement("Table");a.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";var r=f[0].length,o=a.insertRow(-1);for(n=0;n<r;n++){var i=document.createElement("TH");i.innerHTML=f[0][n],o.appendChild(i)}for(n=1;n<f.length;n++){o=a.insertRow(-1);for(var s=0;s<r;s++)o.insertCell(-1).innerHTML=f[n][s]}var u=document.getElementById("proRegs");u.innerHTML="",u.appendChild(a);var p=L.icon({iconUrl:"../img/producer.png",iconSize:[50,50]}),c=[],l=[],m=[];for(n=0;n<t.length;n++)l.push(t[n].args.latitude/1e4),m.push(t[n].args.longitude/1e4),c.push(t[n].args.latitude/1e4+", "+t[n].args.longitude/1e4);for(n=0;n<l.length;n++){var y=m[n],g=l[n],b="Eth address: "+t[n].args.pvAddr.slice(0,7)+"...<br>Producer: "+t[n].args.owner+"<br>Location: "+t[n].args.latitude/1e4+", "+t[n].args.longitude/1e4,v=new L.LatLng(g,y);c=new L.Marker(v,{icon:p}),d.addLayer(c),c.bindPopup(b)}}}),r.ProducerRegs({fromBlock:"latest",toBlock:"latest"}).watch(function(e,t){e&&console.log(e)}),r.getProAccntsList(function(e,t){if(e)console.log(e);else{t.shift();for(var n=0;n<t.length;n++)$("#proAccountList").prepend("<li>"+t[n]+"</li>")}}),r.countProducers(function(e,t){e?console.log(e):$("#proCounter").html(" "+t)}),r.EnerProductionEvent({fromBlock:"latest",toBlock:"latest"}).watch(function(e,t){if(e)console.log(e);else{T.push([t.args.oliAddr,s(t.args.eTime),t.args.enerAmount]);var n=document.createElement("Table");n.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";for(var a=T[0].length,r=n.insertRow(-1),o=0;o<a;o++){var i=document.createElement("TH");i.innerHTML=T[0][o],r.appendChild(i)}for(o=1;o<T.length;o++){r=n.insertRow(-1);for(var p=0;p<a;p++)r.insertCell(-1).innerHTML=T[o][p]}var c=document.getElementById("realTimeProdunction");c.innerHTML="",c.appendChild(n),h.push(t.args.enerAmount.c[0]),w.push(u());var l=[],d=[],m={};for(var b in w.forEach((e,t)=>m[e]=h[t]),m)m.hasOwnProperty(b);var v={},f={};v.time=b,f.energy=m[b];var L=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(v,f);P.push(L);var x={};P.forEach(function(e){x.hasOwnProperty(e.time)?x[e.time]=x[e.time]+e.energy:x[e.time]=e.energy});var A=[];for(var k in x)A.push({time:k,energy:x[k]});for(var b in A)A.hasOwnProperty(b)&&(d.push(A[b].time),l.push(A[b].energy));function M(e){return new Date(e)}w=d,(h=l).length>10&&(h=h.slice(-10),w=w.slice(-10));var E=[{type:"date",mode:"lines+markers",name:"Producer",x:w.map(M),y:h,line:{color:"#009933"}},{type:"scatter",mode:"lines+markers",name:"Consumer",x:g.map(M),y:y,line:{color:"#cc6600"}}];Plotly.newPlot("realTimeProGraph",E,{xaxis:{title:"Time",tickformat:"%H:%M:%S",linecolor:"lightgray",linewidth:.5,titlefont:{color:"black"}},yaxis:{title:"Energy [kWh] per Block",tickformat:"none",linecolor:"lightgray",linewidth:.5,titlefont:{color:"black"}},margin:{l:80,r:30,b:50,t:15,pad:4}})}}),o.ConsumerRegs({},{fromBlock:0,toBlock:"latest"}).get(function(e,t){if(e)console.error(e);else{for(var n=0;n<t.length;n++)m.push([t[n].args.pvAddr,t[n].args.owner,t[n].args.deviceType,t[n].args.peakPowerNeg,t[n].args.latitude/1e4+" "+t[n].args.longitude/1e4,t[n].args.voltageLevel,t[n].args.location,t[n].args.installDate]);var a=document.createElement("Table");a.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";var r=m[0].length,o=a.insertRow(-1);for(n=0;n<r;n++){var i=document.createElement("TH");i.innerHTML=m[0][n],o.appendChild(i)}for(n=1;n<m.length;n++){o=a.insertRow(-1);for(var s=0;s<r;s++)o.insertCell(-1).innerHTML=m[n][s]}var u=document.getElementById("consRegs");u.innerHTML="",u.appendChild(a);var p=L.icon({iconUrl:"../img/consumer.png",iconSize:[50,50]}),c=[],l=[],y=[];for(n=0;n<t.length;n++)l.push(t[n].args.latitude/1e4),y.push(t[n].args.longitude/1e4),c.push(t[n].args.latitude/1e4+", "+t[n].args.longitude/1e4);for(n=0;n<l.length;n++){var g=y[n],b=l[n],v="Eth address: "+t[n].args.pvAddr.slice(0,7)+"...<br>Consumer: "+t[n].args.owner+"<br>Location: "+t[n].args.latitude/1e4+", "+t[n].args.longitude/1e4,f=new L.LatLng(b,g);c=new L.Marker(f,{icon:p}),d.addLayer(c),c.bindPopup(v)}}}),o.getConsAccntsList(function(e,t){if(e)console.log(e);else{t.shift();for(var n=0;n<t.length;n++)$("#consAccountList").prepend("<li>"+t[n]+"</li>")}}),o.countConsumers(function(e,t){e?console.log(e):$("#consCounter").html(" "+t)}),void o.EnerConsumptionEvent({fromBlock:"latest",toBlock:"latest"}).watch(function(e,t){if(e)console.log(e);else{v.push([t.args.oliAddr,s(t.args.eTime),t.args.enerAmount]);var n=document.createElement("Table");n.style.cssText="table-layout: fixed;  width: 100%; font-size: 12px; word-break: break-word:display: block;";for(var a=v[0].length,r=n.insertRow(-1),o=0;o<a;o++){var i=document.createElement("TH");i.innerHTML=v[0][o],r.appendChild(i)}for(o=1;o<v.length;o++){r=n.insertRow(-1);for(var p=0;p<a;p++)r.insertCell(-1).innerHTML=v[o][p]}var c=document.getElementById("realTimeConsumption");c.innerHTML="",c.appendChild(n),y.push(t.args.enerAmount.c[0]),g.push(u());var l=[],d=[],m={};for(var f in g.forEach((e,t)=>m[e]=y[t]),m)m.hasOwnProperty(f);var h={},w={};h.time=f,w.energy=m[f];var L=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(h,w);b.push(L);var P={};b.forEach(function(e){P.hasOwnProperty(e.time)?P[e.time]=P[e.time]+e.energy:P[e.time]=e.energy});var T=[];for(var x in P)T.push({time:x,energy:P[x]});for(var f in T)T.hasOwnProperty(f)&&(d.push(T[f].time),l.push(T[f].energy));g=d,(y=l).length>10&&(y=y.slice(-10),g=g.slice(-10))}}))}]);
//# sourceMappingURL=app.js.map