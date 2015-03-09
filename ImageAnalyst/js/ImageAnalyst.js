define([
	'jquery',
	'underscore',
	'backbone',
	'Network',
	'Logger',
	'ImageView',
	'ImageCollection',
	'ImageModel'
], function($, _, Backbone, Network, Logger, ImageView, ImageCollection, ImageModel) {

	/**
	  * Singletons for the main view and collection objects
	  * @private
	  */	
	var imageCollection,
		imageView;

	/**
	  * Inititializes the Network
	  * @export
	  */	
	Initialize = function() {
		imageCollection = new ImageCollection({ model: ImageModel });
		imageView = new ImageView({ collection: imageCollection });

		Network.Recv(this, "image", ImageReceived);

		Logger.Log({ severity: 'success', message: "Image Analyst started" });
	};

	/**
	  * Callback to receive image data
	  * @private
	  */	
	var ImageReceived = function(imagedata) {
		Logger.Log( { message : "Image received" } )
	}

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Initialize: Initialize
	};
});