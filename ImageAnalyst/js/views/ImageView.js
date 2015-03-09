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
		el: "",

		events: {
		},

		initialize: function() {
			
			// Update when a new model is added to the collection
			this.listenTo(this.collection, "add", this.add);
		},

		render: function() {

			// Return this in order to allow for render chaining
			return this;
		},

		add: function(image) {
		},
	});

	/**
	  * Returns the object containing our extended image view
	  * @return
	  */
	return ImageView;
});