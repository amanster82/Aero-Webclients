define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * @extends Backbone.View
	  */
	var ImageView = Backbone.View.extend({

		// The div to update
		el: "#image-view",

		events: {
		},

		initialize: function() {

		},

		render: function() {

			// Return this in order to allow for render chaining
			return this;
		}
	});

	/**
	  * Returns the object containing our extended image view
	  * @return
	  */
	return ImageView;
});