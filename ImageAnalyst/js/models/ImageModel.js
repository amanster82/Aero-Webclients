define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * This model will hold all data associated to an image
	  * @extends BackBone.Model
	  */
	var ImageModel = Backbone.Model.extend({

		initialize: function() {

		},

		// Default values if they aren't provided during initialization of the object
		defaults: {
			width: 0,
			height: 0,
			pitchangle: 0,
			rollangle: 0,
			guid: "",
			altitude: 0,
			timestamp: 0,
			data: "",
			url: "",
			latitude: 0,
			longitude: 0
		}
	});

	/**
	  * Returns the object containing our extended Model
	  * @return
	  */
	return ImageModel;
});