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

		}
	});

	/**
	  * Returns the object containing our extended Model
	  * @return
	  */
	return ImageModel;
});