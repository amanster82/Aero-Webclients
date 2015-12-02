define([
	'jquery',
	'underscore',
	'backbone',
	'LogMessageView'
], function($, _, Backbone, LogMessageView){


	// Whether to show certain messages
	var ShowWarnings = true,
		ShowCritical = true,
		ShowDebug = true,
		ShowSuccess = true;

	/**
	  * The LoggerView will monitor for any changes in the LoggerCollection
	  * and append new LogMessage objects to the view
	  * @extends Backbone.View
	  */
	var SAMonitorView = Backbone.View.extend({
		
	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return SAMonitorView;
});