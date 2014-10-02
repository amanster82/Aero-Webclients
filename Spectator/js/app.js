define([
'jquery',
'underscore',
'backbone',
'Network',
], function($, _, Backbone, Network){

	var Initialize = function () {
	
		Network.Initialize();
		Network.ConnectToServer("Spectator");
		
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});