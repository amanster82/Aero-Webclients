define([
	'jquery',
	'underscore',
	'backbone',
	'async!http://maps.google.com/maps/api/js?sensor=false!callback' // Async load the GMaps API v3
], function($, _, Backbone, GMaps) {

	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		  center: new google.maps.LatLng(48.4610741,-123.3104351),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map;

	var Initialize = function() {
		map = new google.maps.Map(mapCanvas, mapOptions);
	}

	return {
		Initialize: Initialize
	}
});