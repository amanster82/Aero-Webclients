define([
	'jquery',
	'underscore',
	'backbone',
	'Network',
	'Logger'
], function($, _, Backbone, Network, Logger){

	var Initialize = function () {
	
		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });
	
		Network.Initialize();
		Network.ConnectToServer("ImageAnalyst");
		
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});