var subMap;

function initSubMap() {    
    subMap = new google.maps.Map(document.getElementById('subMap'), {
      zoom: 4,
      disableDefaultUI: false,
      center: new google.maps.LatLng(-25.7,134.5),
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
}

function langSubpageMap(item) {
  var lat = item.Latitude;
  var long = item.Longitude;
  //Now map the language subpage marker
  var latLng = new google.maps.LatLng(lat, long);
  var icon = {
      url: "https://www.kaffeewiki.de/images/thumb/7/78/Red_dot.png/240px-Red_dot.png", // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  var marker = new google.maps.Marker({
      position: latLng,
      icon: icon,
      map: subMap
  });

  //recenter and zoom map
  var newCenter = latLng;
  var newZoom = 6;
  //subMap.setCenter(newCenter);
  subMap.setOptions({"zoom": newZoom, "center" : latLng});
}