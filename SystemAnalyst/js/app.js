define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'CommonDesign',
	'Logger',
	'GoogleMapCanvas'
], function($, _, Backbone, Bootstrap, Network, CommonDesign, Logger){

	var Initialize = function () {

		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });

		Network.Initialize();
		Network.ConnectToServer("SystemAnalyst");
		
		Map.Initialize();

		console.log("All systems go");
	};

	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});
