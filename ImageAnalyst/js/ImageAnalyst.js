define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrapjs',
	'Network',
	'Logger',
	'ImageModel',
	'SidebarView',
	'ImageView',
	'ImageQueueView',
	'RecognitionTuning'
], function($, _, Backbone, bootstrap, Network, Logger, ImageModel, SidebarView, ImageView, ImageQueueView, RecognitionTuning) {

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
	var Initialize = function() {
		sidebarView = new SidebarView();

		imageView = new ImageView({model: new ImageModel()});

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
		imageView.model.set(new ImageModel(imagedata.image).toJSON());
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
