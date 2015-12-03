define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'CommonDesign',
	'Logger',
	'GoogleMapCanvas', 
	'SAMonitor'
], function($, _, Backbone, Bootstrap, Network, CommonDesign, Logger, Map, SAMonitor){

	var Initialize = function () {

		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });

		Network.Initialize();
		Network.ConnectToServer("SystemAnalyst");
		
		SAMonitor.Initialize();
		SAMonitor.Log({message: "test", source: "SystemAnalyst", severity: "Debug"});
		
		Map.Initialize();

		console.log("All systems go");
	};

	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});
