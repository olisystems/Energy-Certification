// initializing map globally
var home = L.icon({
  iconUrl: '../img/home.png',
  iconSize: [30, 40]
});

var map = L.map('map').setView([48.77538056, 9.35277778], 14);
var mapLink =
  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 10,
  }).addTo(map);


var homeMarker = L.marker([48.77538056, 9.16277778], {
  icon: home
}).addTo(map);
homeMarker.bindPopup("OLI Systems GmbH");
homeMarker.on('mouseover', function(e) {
  this.openPopup();
});
homeMarker.on('mouseout', function(e) {
  this.closePopup();
});

export default map;
