define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'Logger',
	'Footer',
	'Sidebar'
], function($, _, Backbone, Bootstrap, Network, Logger, Footer, Sidebar){

	var Initialize = function () {
	
		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });

		Network.Initialize();
		Network.ConnectToServer("SystemAnalyst");
		
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});