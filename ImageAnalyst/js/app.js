define([
'jquery',
'underscore',
'backbone',
'Network',
], function($, _, Backbone, Network){

	var Initialize = function () {
	
		Network.Initialize();
		Network.ConnectToServer("ImageAnalyst");
		
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});