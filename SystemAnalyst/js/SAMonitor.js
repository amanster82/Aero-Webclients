define([
	'jquery',
	'underscore',
	'backbone',
	'SAMonitorView', 
	'NetMessageModel',
	'NetMessageCollection'
], function($, _, Backbone, SAMonitorView, NetMessageModel, NetMessageCollection) {
	
	
	var msgCollection, msgView;
	
	var Initialize = function() {
		msgCollection = new NetMessageCollection();
		msgView = new SAMonitorView({collection: msgCollection});
	};

});