define([
	'jquery',
	'underscore',
	'backbone',
	'ImageModel'
], function($, _, Backbone, ImageModel){

	/**
	  * This will hold a list of all the images
	  * @extends Backbone.Collection
	  */
	var ImageCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: ImageModel

	});

	/**
	  * Returns the object containing our extendedd Image Collection
	  * @return
	  */
	return ImageCollection;
});