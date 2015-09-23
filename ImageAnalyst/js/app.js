define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'CommonDesign',
	'Logger',
	'ImageAnalyst'
], function($, _, Backbone, Bootstrap, Network, CommonDesign, Logger, ImageAnalyst){

	var Initialize = function () {

		Logger.Initialize();
		Logger.Log({ message: "Logger initialized" });

		Network.Initialize();
		Network.ConnectToServer("ImageAnalyst");

		ImageAnalyst.Initialize();

		console.log("All systems go");
	};

	// Map public API functions to internal functions
	return {
		Initialize: Initialize
	};
});
