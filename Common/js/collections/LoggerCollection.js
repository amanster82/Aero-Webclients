define([
	'jquery',
	'underscore',
	'backbone',
	'LogMessageModel'
], function($, _, Backbone, LogMessageModel){

	/**
	  * This will hold a list of all the log messages
	  * @extends Backbone.Collection
	  */
  var LoggerCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: LogMessageModel

  });

	/**
	  * Returns the object containing our extended Logger Collection
	  * @return
	  */
	return LoggerCollection;
});