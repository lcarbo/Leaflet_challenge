function createMap(earthQuakes) {
    var myMap = L.map("map", {
        center: [40.7, -73.95],
        zoom: 11
      });
    
      var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });
    
    
      // Create a baseMaps object to hold the lightmap layer
      var baseMaps = {
        "Light Map": lightmap
      };
    
      // Create an overlayMaps object to hold the bikeStations layer
      var overlayMaps = {
        "Earthquakes": earthQuakes
      };

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
    

}

function createMarkers(quakes) {

    // Pull the "stations" property off of response.data
    var quakesites = quakes.features.geometry;
  
    // Initialize an array to hold bike markers
    var quakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < quakesites.length; index++) {
      var quakePlace = quakesites.coordinates[0,1];
  
      // For each station, create a marker and bind a popup with the station's name
      var quakeMarker = L.marker([quakePlace.lat, quake.lon])
        .bindPopup("<h3>" + quake.id + "<h3><h3>Magnitude: " + quake.mag + "</h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);
    }


  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(quakeMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", createMarkers);
