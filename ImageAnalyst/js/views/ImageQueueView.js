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
			this.newView = new QueueSubView( { el: "#imagequeue-new", collection: new ImageCollection({ model: ImageModel }) });

			// DUMMY DATA
			this.confirmedView.collection.add({ imageID: 1, targetCount: 1, width: 1920, height: 1080, latitude: _.random(50, 150), longitude: _.random(50, 150),
								pitchAngle: _.random(50, 150), guid: "guid", rollAngle: _.random(50, 150), atltitude: _.random(100, 150),
								timestamp: "now", data: "data", tag: "SEEN"});

			this.confirmedView.collection.add({ imageID: 0, targetCount: 2, width: 1920, height: 1080, latitude: _.random(50, 150), longitude: _.random(50, 150),
								pitchAngle: _.random(50, 150), guid: "guid", rollAngle: _.random(50, 150), atltitude: _.random(100, 150),
								timestamp: "now", data: "data", tag: "CURRENT"});

			this.newView.collection.add({ imageID: 4, targetCount: 0, width: 1920, height: 1080, latitude: _.random(50, 150), longitude: _.random(50, 150),
								pitchAngle: _.random(50, 150), guid: "guid", rollAngle: _.random(50, 150), atltitude: _.random(100, 150),
								timestamp: "now", data: "data", tag: "SEEN"});
			this.newView.collection.add({ imageID: 3, targetCount: 0, width: 1920, height: 1080, latitude: _.random(50, 150), longitude: _.random(50, 150),
								pitchAngle: _.random(50, 150), guid: "guid", rollAngle: _.random(50, 150), atltitude: _.random(100, 150),
								timestamp: "now", data: "data", tag: "SEEN"});
			this.newView.collection.add({ imageID: 2, targetCount: 1, width: 1920, height: 1080, latitude: _.random(50, 150), longitude: _.random(50, 150),
								pitchAngle: _.random(50, 150), guid: "guid", rollAngle: _.random(50, 150), atltitude: _.random(100, 150),
								timestamp: "now", data: "data", tag: undefined});
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