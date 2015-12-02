define([
	'jquery',
	'underscore',
	'backbone',
	'SAMonitorView', 
	'NetMessageModel',
	'NetMessageCollection'
], function($, _, Backbone, SAMonitorView, NetMessageModel, NetMessageCollection) {
	
	//view and collection objects
	var msgCollection, msgView;
	
	/*
	* Initializes the SA Monitor
	*/
	var Initialize = function() {
		msgCollection = new NetMessageCollection();
		msgView = new SAMonitorView({collection: msgCollection});
	};
	
	//return SA Monitor object
	return {
		Initialize: Initialize
	};

});