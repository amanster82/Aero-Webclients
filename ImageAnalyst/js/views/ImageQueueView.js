define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * Used to render image models when displayed in the image queue
	  * @extends Backbone.View
	  */
	var ImageQueueView = Backbone.View.extend({

		// The tag to use
		tagName: "span",

		initialize: function() {

			// Listen to any changes on the model
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			var view = "<div class=\"queued-image\">" + this.model.get("guid") + "</div>";

			// Update the UI when there's a change
			this.$el.html(view);

			// Return this in order to allow for render chaining
			return this;
		},

	});

	/**
	  * Returns the object containing our extended view
	  * @return
	  */
	return ImageQueueView;
});