import L from 'leaflet';

// initializing map globally
var home = L.icon({
  iconUrl: '../img/home.png',
  iconSize: [30, 40]
});

var openStreet = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + '<a href="http://openstreetmap.org">OpenStreetMap</a>' + ' Contributors',
      maxZoom: 10,
    }),
  OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }),
  OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }),
  OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }),
  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }),
  CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });

var baseMaps = {
  "<span style='color: gray'>Open Street</span>": openStreet,
  'Grayscale': OpenStreetMap_BlackAndWhite,
  'Open Street DE': OpenStreetMap_DE,
  'Open Topo': OpenTopoMap,
  'ESRI Imagery': Esri_WorldImagery,
  'CartoDB Dark': CartoDB_DarkMatter
};

var map = L.map('map', {
  center: [48.77538056, 9.25277778],
  zoom: 14,
  layers: openStreet
});
L.control.layers(baseMaps).addTo(map);

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
