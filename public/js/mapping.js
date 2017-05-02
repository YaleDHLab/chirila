//Google Map Scripts
function initMap() {    
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    disableDefaultUI: true,
    center: new google.maps.LatLng(-27.5,134.5),
    mapTypeId: 'terrain',
    styles: [
        {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
        },
        {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
        },
        {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
        },
        {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
        },
        {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
        },
        {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
        },
        {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
        },
        {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
        },
        {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
        },
        {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
        },
        {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
        },
        {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
        },
        {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
        },
        {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
        },
        {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
        },
        {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
        },
        {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
        },
        {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
        },
        {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
        }
      ]
  });
};

var markers = [];
var infowindows = [];
var lastIndex = -1;

function populateLangMap(item, lastIndex) {
  //this will be the index where the marker gets stored
  var numMarkers = lastIndex + 1;
  lastIndex = numMarkers;

  //Get langName from data and convert -> string
  var langName = item.StdLanguageName;
  var lat = item.Latitude;
  var long = item.Longitude;
  var latLng = new google.maps.LatLng(lat, long);

  //This div holds the "info window" content
  var infowincontent = document.createElement('div');
  //Title creation
  var strong = document.createElement('strong');
  strong.setAttribute('style', 'white-space: pre; line-height: 1.6em; font-family: "Roboto Slab"; font-size: 14px; font-weight: 700');
  strong.textContent = langName;
  //Add title tp the info window
  infowincontent.appendChild(strong);
  //Add a line break
  infowincontent.appendChild(document.createElement('br'));

  //NEW VARS FOR READABILITY
  var langname = langName;
  var langid = item.StdLangID.toString();
  var family = item.Family.toString();
  var subgroup = item.Subgroup.toString();
  var variety = item.Variety.toString();
  var isocode = item.ISO639.toString();
  var glottocode = item.Glottolog_ID.toString();
  var aiatsis = item.AIATSIS_Code.toString();

  // Add hr 
  infowincontent.appendChild(document.createElement('hr'));
  //Create text element
  var text = document.createElement('text');
  text.setAttribute('style', 'white-space: pre; line-height: 1.6em; font-family: "Roboto Slab"; font-size: 12px;');
  text.textContent = "Standard Language ID: " + langid + "\r\n";
  text.textContent += "Variety/Dialect: " + variety + "\r\n";
  text.textContent += "Subgroup: " + subgroup + "\r\n";
  text.textContent += "Family: " + family + "\r\n";
  //Append all that to infowindow
  infowincontent.appendChild(text);

  //Create map icon
  var icon = {
      url: "https://www.kaffeewiki.de/images/thumb/7/78/Red_dot.png/240px-Red_dot.png", // url
      scaledSize: new google.maps.Size(10, 10), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  //Add infowindow, and marker to appropriate array
  //Define function to display on click
  infowindows[numMarkers] = new google.maps.InfoWindow({
      content: infowincontent
  });
  markers[numMarkers] = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: icon
  });
  google.maps.event.addListener(markers[numMarkers], 'click', (function(marker, i) {
      return function() {
          infowindows[i].open(map, markers[i]);
      }
  })(markers[numMarkers], numMarkers));
}