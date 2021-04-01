// var graymap = L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY
//   }
// );
// var map = L.map("map", {
//   center: [
//     40.7, -94.5
//   ],
//   zoom: 3
// });

// graymap.addTo(map);
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function(data) {
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.geometry.coordinates[2]),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }
//   function getColor(depth) {
//     switch (true) {
//     case depth > 90:
//       return "#EA2C2C";
//     case depth > 70:
//       return "#EA822C";
//     case depth > 50:
//       return "#EE9C00";
//     case depth > 30:
//       return "#EECC00";
//     case depth > 10:
//       return "#D4EE00";
//     default:
//       return "#98EE00";
//     }
//   }
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }
//   L.geoJson(data, {
//     // We turn each feature into a circleMarker on the map.
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng);
//     },
//     style: styleInfo,
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(
//         "Magnitude: "
//           + feature.properties.mag
//           + "<br>Depth: "
//           + feature.geometry.coordinates[2]
//           + "<br>Location: "
//           + feature.properties.place
//       );
//     }
//   }).addTo(map);
//   var legend = L.control({
//     position: "bottomright"
//   });
  
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var grades = [-10, 10, 30, 50, 70, 90];
//     var colors = [
//       "#98EE00",
//       "#D4EE00",
//       "#EECC00",
//       "#EE9C00",
//       "#EA822C",
//       "#EA2C2C"
//     ];
//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
//       + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };
//   legend.addTo(map);
// });





var map = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(map);
var earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(earthquakes, function(response) {
  console.log(response);
  function styleInfo(feature) {
      return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
      };
  }
  function getColor(depth) {
      switch (true) {
          case depth > 90:
              return "#EA2C2C";
          case depth > 70:
              return "#EA822C";
          case depth > 50:
              return "#EE9C00";
          case depth > 30:
              return "#EECC00";
          case depth > 10:
              return "#D4EE00";
          default:
              return "#98EE00";
      }
  }
  function getRadius(magnitude) {
      if (magnitude === 0) {
          return 1;
      }
      return magnitude * 3;
  }
  L.geoJson (response, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker (latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Magnitude:" + feature.properties.mag + "<br> Location:" + feature.properties.place);
      }
  }).addTo(map)
});
function getColor(depth) {
  switch (true) {
      case depth > 90:
          return "#EA2C2C";
      case depth > 70:
          return "#EA822C";
      case depth > 50:
          return "#EE9C00";
      case depth > 30:
          return "#EECC00";
      case depth > 10:
          return "#D4EE00";
      default:
          return "#98EE00";
  }
}
var legend = L.control({
  position: "bottomright"
});
legend.onAdd = function (map) {
  var div = L
      .DomUtil
      .create("div", "info legend"),
      grades = [0,10,30,50,70,90],
      labels = [],
      from, to;
  for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
          '<i style="background:' + getColor(from + 1) + '"></i> ' +
          from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend.addTo(map);