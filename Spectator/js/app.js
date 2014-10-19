define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'Logger'
], function($, _, Backbone, Bootstrap, Network, Logger){

	var Initialize = function () {
	
		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });
		
		Network.Initialize();
		Network.ConnectToServer("Spectator");
		
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});