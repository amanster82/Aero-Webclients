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
		
		// SA monitor test messages
		SAMonitor.Log({message: "Test critical message.", severity:"critical"});
		SAMonitor.Log({message: "Test warning message.", severity:"warning"});
		SAMonitor.Log({message: "Test success message.", severity:"success"});
		SAMonitor.Log({message: "Test debug message.", severity:"debug"});

		Map.Initialize();

		console.log("All systems go");
	};

	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});
