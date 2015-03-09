define([
	'jquery',
	'underscore',
	'backbone',
	'ImageQueueView'
], function($, _, Backbone, ImageQueueView){

	/**
	  * @extends Backbone.View
	  */
	var ImageView = Backbone.View.extend({

		// The div to update
		el: "#image-analyst",

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

			var view = new ImageQueueView({model: image});

			this.$el.find("#imagequeue-container").prepend(view.render().el);
		},
	});

	/**
	  * Returns the object containing our extended image view
	  * @return
	  */
	return ImageView;
});