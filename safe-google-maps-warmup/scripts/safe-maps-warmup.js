// File: safe-maps.js
// Description: Javascript file controlling functionality of Safe Maps Application for
// CS106S Workshop.
// Last Updated: Winter '17

/**************		Global Variables		****************/
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;					// Reference to Google Map object
var origin = null;			// Starting point
var destination = null;		// Ending point
var waypoints = [];			// Mid-way stops
var markers = [];			// Contains markers for all points on trip (origin, destination, and waypoints)
var crimes = JSON.parse(crimes);		// crime data from crimes.json
var relavantCrimeDist = 0.0008;



/**********************************************  TO-DO  ***************************************************
 * When the user changes the route displayed on the map, our starter code calls scoreRoute(route) to determine 
 * the crime score of the route being displayed. Your job is to determine this score. The score should be 
 * indicative of how "unsafe" a route is, with 0 being safest and high numbers being unsafe. Right now, we 
 * always return 0 as the score for the route.
 */
/**********************************************************************************************************/
function scoreRoute(route) {
	var crimeScore = 0;		// Set crimeScore to be the actual score of this route. 

	// TODO: Calculate crimescore given the route.
	// Hint 1: console.log(route) so you can see what it is!
	// Hint 2: you will have to refer to the "crimes" variable, which is an array of crime locations.
	//         refer to the data/SF_crime_data.json file to see the format of the crimes variable.
	//
	// Hint 3: Each element in route represents a leg of the trip, and has latitude and longitude start and 
	//         end points. You can get the value of these points for example by calling: 
	//
	//         var starting_lng = route[0].start_point.lat()

	// Hint 4: If you're struggling, try to think of how you'd determine the safest routes by hand (without coding).
	// 		   After determining that, try to code your "by hand" implementation :)


	return crimeScore;
}


/*	Function: initializeGoogleMap()
 *	Initializes Google Map by filling div with ID "map_canvas" with a map of SF
 */
function initializeGoogleMap() {
	var sanfran = new google.maps.LatLng(37.7847515, -122.433567);
	var myOptions = {
		zoom: 16,
		maxZoom:16,
      	minZoom:16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: sanfran,
		draggable: false
	}
	return new google.maps.Map(document.getElementById("map_canvas"), myOptions);


}

/*	Function: plotCrimeMarkers()
 *	Plots a Google Maps Marker for each crime in our crimes.json. For debugging purposes only - will lead to a very
 *	cluttered map if called.
 */
function plotCrimeMarkers() {
	for (var i = 0; i < crimes.length; i++) {
		var marker = new google.maps.Marker({
	      position: {lat:crimes[i].lat, lng:crimes[i].lng},
	      map: map,
	      title: 'lat:' + crimes[i].lat + " long: " + crimes[i].lng
	    });
	}
}

/************** 1. Initialization ****************/
/*	Function: initialize()
 *	Called upon website loading. This creates everything that the user sees.
 */
function initialize() {
	// initialization of display, data, and map
	directionsDisplay = new google.maps.DirectionsRenderer();
	map = initializeGoogleMap();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));
	origin = new google.maps.LatLng(37.78721971989918, -122.43211269378662);
	destination = new google.maps.LatLng(37.781928690563745, -122.43582487106323);
	addMarker(new google.maps.LatLng(37.78721971989918, -122.43211269378662));
	addMarker(new google.maps.LatLng(37.781928690563745, -122.43582487106323));

	// Initialization of helper visualizations (crime markers)
	plotCrimeMarkers();
	calcRoute();
}


/************** 	2. UX	 ****************/
// These helper functions are used to aid in the use of the app.

/*	Function: addMarker(latlng)
 *	Adds a waypoint to a route.
 *	DO NOT EDIT
 */
function addMarker(latlng) {
	markers.push(new google.maps.Marker({
		position: latlng, 
		map: map,
		icon: "http://maps.google.com/mapfiles/marker" + String.fromCharCode(markers.length + 65) + ".png"
	}));    
}

/*	Function: clearMarkers()
 *	Helper function for setting all markers to null so that we don't double-plot markers on the map.
 *	DO NOT EDIT
 */
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}

/*	Function: reset()
 *	Called when user clicks on "Reset" button. Clears the map and all settings.
 *	DO NOT EDIT
 */
function reset() {
	clearMarkers();
	markers = [];
	waypoints = [];
	origin = null;
	destination = null;
	directionsDisplay.setMap(null);
	directionsDisplay.setPanel(null);
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));    
}


/************** 	3. Route Calculations	 ****************/

function setScore(num) {
	document.getElementById("currScore").innerHTML = "" + num;
}

/*	Function: calcFastestRoute()
 *	Called when user clicks "Get Directions" button. Calculates routes and returns fastest routes to user.
 */
function calcRoute() {
	// Make sure we have an origin and destination at minimum.
	if (origin == null) {
    	alert("Click on the map to add a start point");
    	return;
  	}
  
  	if (destination == null) {
    	alert("Click on the map to add an end point");
    	return;
 	}
  
	var mode = google.maps.DirectionsTravelMode.WALKING;
  
  	var request = {
		origin: origin,
		destination: destination,
		waypoints: waypoints,
		travelMode: mode,
		optimizeWaypoints: true,
		avoidHighways: true,
		avoidTolls: true,
		provideRouteAlternatives: true
	};

	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var editedResponse = response;
			setScore(scoreRoute(editedResponse.routes[0].legs[0].steps));
			directionsDisplay.setDirections(editedResponse);
			google.maps.event.addListener(directionsDisplay, 'routeindex_changed', function() { 
				setScore(scoreRoute(directionsDisplay.directions.routes[directionsDisplay.getRouteIndex()].legs[0].steps));
            });
		}
  	});
  
	clearMarkers();
}