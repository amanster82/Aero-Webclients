define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'Logger',
	'SidebarView',
	'ImageView',
	'ImageQueueView',
	'RecognitionTuning'
], function($, _, Backbone, bootstrap, Network, Logger, SidebarView, ImageView, ImageQueueView, RecognitionTuning) {

	/**
	  * Singletons for the main view and collection objects
	  * @private
	  */	
	var sidebarView,
		imageView,
		imageQueueView,
		tuningView;

	/**
	  * Inititializes the Network
	  * @export
	  */	
	Initialize = function() {
		sidebarView = new SidebarView();

		imageView = new ImageView();

		imageQueueView = new ImageQueueView();

		tuningView = new RecognitionTuning();

		Network.Recv(this, "image", ImageReceived);

		Logger.Log({ severity: 'success', message: "Image Analyst started" });
	};

	/**
	  * Callback to receive image data
	  * @private
	  */	
	var ImageReceived = function(imagedata) {
		//AddImage(imagedata.image);
	};

	/**
	  * Add an image to the image collection given an object containing image data
	  * @export
	  */	
	var AddImage = function(image) {
		//imageCollection.add({ width: image.width, height: image.height, latitude: image.latitude, longitude: image.longitude,
		//						pitchAngle: image.pitchangle, guid: image.guid, rollAngle: image.rollangle, atltitude: image.atltitude,
		//						timestamp: image.timestamp, data: image.data});
	};

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Initialize: Initialize,
		AddImage: AddImage
	};
});