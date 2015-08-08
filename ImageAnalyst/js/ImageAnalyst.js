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
		Network.Recv(this, "targets", TargetsReceived);

		Logger.Log({ severity: 'success', message: "Image Analyst started" });
	};

	/**
	  * Callback to receive image data
	  * @private
	  */	
	var ImageReceived = function(imagedata) {
		console.log(imagedata);

		var canvas = document.getElementById('image-canvas');
		var context = canvas.getContext('2d');
		var img = new Image();

		img.onload = function() {
		  context.drawImage(this, 0, 0, canvas.width, canvas.height);
		}

		img.src = "data:image/jpg;base64," + imagedata.image.data;
	};

	/**
	  * Callback to receive target data
	  * @private
	  */	
	var TargetsReceived = function(targets) {
		console.log(targets);
	};


	/**
	  * API Mapping
	  * @return
	  */
	return {
		Initialize: Initialize
	};
});