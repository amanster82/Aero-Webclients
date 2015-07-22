define([
	'jquery',
	'underscore',
	'backbone',
	'ImageQueueSubView',
	'ImageCollection',
	'ImageModel'
], function($, _, Backbone, QueueSubView, ImageCollection, ImageModel){

	/**
	  * @extends Backbone.View
	  */
	var ImageQueueView = Backbone.View.extend({

		// The tag to use
		el: "#image-queue-view",

		initialize: function() {

			this.confirmedView = new QueueSubView( { el: "#imagequeue-confirmed", collection: new ImageCollection({ model: ImageModel }) });
			this.newView = new QueueSubView( { el: "imagequeue-new", collection: new ImageCollection({ model: ImageModel }) });

		},

		render: function() {

			// Return this in order to allow for render chaining
			return this;
		}

	});

	/**
	  * Returns the object containing our extended view
	  * @return
	  */
	return ImageQueueView;
});