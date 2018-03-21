//and call what you want
agents.getAllAddedOlis();
  var map = L.map('map').setView([48.77538056, 9.16277778], 14);
  mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 18,
    }).addTo(map);
  var marker = L.marker([48.77538056, 9.16277778]).addTo(map);

// binding popoup
  marker.bindPopup("OLI Systems GmbH");
  marker.on('mouseover', function(e) {
    this.openPopup();
  });
  marker.on('mouseout', function(e) {
    this.closePopup();
  });

// showing mouse click position
  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);
