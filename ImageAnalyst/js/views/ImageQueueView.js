define([
	'jquery',
	'underscore',
	'backbone',
	'ImageQueueItemView'
], function($, _, Backbone, QueueItemView){

	/**
	  * @extends Backbone.View
	  */
	var ImageQueueView = Backbone.View.extend({

		// The tag to use
		el: "#image-queue-view",

		initialize: function() {

			// Update when a new model is added to the collection
			this.listenTo(this.collection, "add", this.add);
		},

		render: function() {

			// Return this in order to allow for render chaining
			return this;
		},

		add: function(image) {

			var view = new QueueItemView({model: image});

			this.$el.find("#imagequeue-container").prepend(view.render().el);
		}

	});

	/**
	  * Returns the object containing our extended view
	  * @return
	  */
	return ImageQueueView;
});