// File: safe-maps.js
// Description: Javascript file controlling functionality of Safe Maps Application for
// CS106S Workshop.
// Last Updated: Winter '17

/**************		Global Variables		****************/
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;					// Reference to Google Map object
var origin = null;			// Starting point
var destination = null;		// Ending point
var waypoints = [];			// Mid-way stops
var markers = [];			// Contains markers for all points on trip (origin, destination, and waypoints)
var crimes = JSON.parse(crimes);		// crime data from crimes.json
var crimeHeatMapData;					// global variable for heat map data
var relavantCrimeDist = 0.0008;

/*	Function: getHeatMapData()
 *	Iterates through crimes.json file and creates array of long, latitude points.
 */
function getHeatMapData() {
	var heatMapData = [];
	for (var i = 0; i < crimes.length; i++) {
		heatMapData.push(new google.maps.LatLng(crimes[i].lat, crimes[i].lng));
	}
	return heatMapData;
}

/*	Function: initializeGoogleMap()
 *	Initializes Google Map by filling div with ID "map_canvas" with a map of SF
 */
function initializeGoogleMap() {
	var sanfran = new google.maps.LatLng(37.7749295, -122.4194155);
	var myOptions = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: sanfran
	}
	return new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

/*	Function: initializeHeatMap()
 *	Plots a heat map layer on top of the map to show which areas have high concentrations of assault.
 *	For visual purposes only - not required for assignment.
 */
function initializeHeatMap() {
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: crimeHeatMapData,
		dissipating: false,
		radius: 0.005,
		opacity: 0.4
	});
	heatmap.setMap(map);
	var gradient = ['rgba(0, 255, 255, 0)','rgba(0, 255, 255, 1)','rgba(0, 191, 255, 1)','rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)', 'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)'];
	heatmap.set('gradient', gradient);
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
	crimeHeatMapData = getHeatMapData();
	map = initializeGoogleMap();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	// Add "click" event listener to map so that when user clicks on map, a marker is added
	google.maps.event.addListener(map, 'click', function(event) {
		if (origin == null) {
			origin = event.latLng;
			addMarker(origin);
		} else if (destination == null) {
			destination = event.latLng;
			addMarker(destination);
		} else {
			// Max of 8 waypoints so that we don't go too crazy with the directions
			if (waypoints.length < 9) {
				waypoints.push({ location: destination, stopover: true });
				destination = event.latLng;
				addMarker(destination);
			} else {
				alert("Maximum number of waypoints reached");
			}
		}
	});

	// Initialization of helper visualizations (crime heatmap, crime markers)
	initializeHeatMap();
	//plotCrimeMarkers();
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
// TODO: These functions calculate the route the user should take to get from point A to B.
// You will need to help write code that determines the SAFEST route (fastest is already given)

/*	Function: scorePath(step)
 *	Given a step, which is a start -> end segment, return a score for how safe traversing that path is.
 *  Higher returned score = more dangerous.
 */
function scorePath(step) {

	// For mathematical simplicity, we label long/lat coordinates of our path to be x and y coordinates.
	var end_y = step.end_point.lat();
	var end_x = step.end_point.lng();
	var start_y = step.start_point.lat();
	var start_x = step.start_point.lng();

	// m is the slope of our current step path, and mp is the perpendicular slope to that.
	var m = (end_y - start_y) / (end_x - start_x);
	var mp = -1 * (1 / m);
	
	// score keeps track of the number of crimes that are within relavantCrimeDist to our path/step
	var score = 0;

	// Iterate through each crime and determien if it is close to our path
	for (var i = 0; i < crimes.length; i++) {

		// we use point-slope formula to get the perpendicular intersection of our crime's location to our step
		var inter_x = ((mp * crimes[i].lng) - (m * start_x) + (start_y) - (crimes[i].lat)) / (mp - m);
		var inter_y = m * (inter_x - start_x) + start_y;
		var dist = Math.sqrt( Math.pow((inter_x - crimes[i].lng), 2)  + Math.pow((inter_y - crimes[i].lat), 2) );

		// If the projection of that crime onto the segment is on the original segment, we just have to make sure the crime was within relvantCrimeDistance
		if ((inter_x <= end_x && inter_x >= start_x || inter_x >= end_x && inter_x <= start_x) && (inter_y <= end_y && inter_y >= start_y || inter_y >= end_y && inter_y <= start_y)) {
			if (dist < relavantCrimeDist) {
				score = score + 1;
			}
		} else {

			// or else, the only other way this crime is within relevantCrimeDist to our path is if its projection is not
			// on the segment but its projection is still within relevantCrimeDistance to either start or end point
			var distInterToStart = Math.sqrt( Math.pow((inter_x - start_x), 2)  + Math.pow((inter_y - start_y), 2) );
			var distInterToEnd = Math.sqrt( Math.pow((inter_x - end_x), 2)  + Math.pow((inter_y - end_y), 2) );
			if (dist < relavantCrimeDist && (distInterToEnd < relavantCrimeDist || distInterToStart < relavantCrimeDist)) {
				score = score + 1;
			}
		}
	}
	return score;
}


/*	Function: getSafestRoute(routes)
 *	TODO: Return safest route of the array of routes
 *	
 * 	Currently only returns the first route in the array of routes.
 */
function getSafestRoute(routes) {

	// If we only have one returned route, just return it.
	if (routes.length == 1) {
		return routes[0];
	}

	// Otherwise, iterate through all routes and find the route that passes through the least crime
	safestScore = -1;
	safestRoute = 0;
	for (var routeIndex in routes) {
		path = routes[routeIndex].legs[0].steps;
		var crimeScore = 0;

		// for each route, iterate through each step in its path
		for (var stepIndex in path) {
			var step = path[stepIndex];
			crimeScore = crimeScore + scorePath(step);
		}

		// Update safest score/safest route
		if (safestScore == -1 || crimeScore < safestScore) {
			safestRoute = routeIndex;
			safestScore = crimeScore;
		}
	}
	return routes[safestRoute];
}

/*	Function: calcFastestRoute()
 *	Called when user clicks "Get Directions" button. Calculates routes and returns fastest routes to user.
 */
function calcRoute(safest) {
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
			if (safest) {
				var bestRoute = getSafestRoute(response.routes);		// Pass in all routes and returns safest route
				editedResponse.routes = [bestRoute];					// Set response routes variable to have only the safest route
			} else {
				editedResponse.routes = [response.routes[0]];
			}
			directionsDisplay.setDirections(editedResponse);
		}
  	});
  
	clearMarkers();
}