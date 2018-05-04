var map;
var markers = [];

var doctors_online_by_state_url = "http://localhost:8080/api/online_by_state.json";
var doctors_online_url = "http://localhost:8080/api/online_now.json";

// HTTP GET Requests to get doctor data
$.get(doctors_online_by_state_url, function(data) {
    doctors_by_state = data,
    $.get(doctors_online_url, function(data) {
        online_doctors = data,
        init();
    });
});

function create_map() {
  return new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 37.090, lng: -95.712}
            });
}

function init() {

  var map = create_map();

  for (var state in doctors_by_state) {
      var mapLabel = new MapLabel({
        text: doctors_by_state[state].count + (doctors_by_state[state].count > 1 ? ' docs' : ' doc'),
        position: new google.maps.LatLng(doctors_by_state[state].lat_long.lat, doctors_by_state[state].lat_long.lng),
        map: map,
        fontSize: 22,
        align: 'right'
      });
  }

  for (var doctor in online_doctors) { 
      var contentstring = '<h1>'+ online_doctors[doctor]["name"]+'</h1>' + '<h2> '+ online_doctors[doctor]["specialty"]+' </h2>';
      var doctor_marker = new google.maps.Marker({
        title : contentstring,
        position: {lat: online_doctors[doctor].lat_long[0], lng: online_doctors[doctor].lat_long[1]},
        map: null,
        icon: 'img/ht.png'
      });

      var infowindow = new google.maps.InfoWindow({
      });

      google.maps.event.addListener(doctor_marker,'click', function(){
        infowindow.setContent(this.title);
        infowindow.open(map, this)
      });
      markers.push(doctor_marker);
  }

  map.addListener('zoom_changed', function() {
    var zoom = map.getZoom();
    console.log("Zoom changed");
    console.log(zoom);
    length = markers.length
      for (var i = 0; i < markers.length; i++) {
        if (zoom > 6) {
          markers[i].setMap(map);
        }
        else {
          markers[i].setMap(null);
        }
      }
  });
}