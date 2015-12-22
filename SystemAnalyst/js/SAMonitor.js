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
		msgCollection = new NetMessageCollection({model: NetMessageModel});
		msgView = new SAMonitorView({collection: msgCollection});

		//listen for toggle button events
		$('.sa-sev-toggle').on('click', msgView.toggleMsg);
		$('.sa-sys-toggle').on('click', msgView.toggleMsg);
	};
	
	var Log = function(msg) {
		// do not add if message text not defined
		if (msg.message === undefined) {
			return;
		}
		
		var message = msg.message;
		var source = msg.source;
		var severity = msg.severity;
		
		msgCollection.add({message: message, source: source, severity: severity});
	}
	
	//return SA Monitor object
	return {
		Initialize: Initialize,
		Log: Log
	};

});
