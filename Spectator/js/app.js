define([
'jquery',
'underscore',
'backbone',
], function($, _, Backbone){

	var initialize = function () {
		console.log("All systems go");
	}
	
	// Map public API functions to internal functions
	return {
		Initialize: initialize
	};
});