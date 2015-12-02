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
	  * System Analyst Monitor view - gets messages sent over our
	  * network and displays them in the SA client.
	  * @extends Backbone.View
	  */
	var SAMonitorView = Backbone.View.extend({

		el: "#sa-monitor",
		
		initialize: function() {
			//listen for new messages in the collection
			this.listenTo(this.collection, "add", add);
		},
		
		add: function(newMessage) {
			//check that the message is displayed and exists
			if (newMessage.get("display") === true && newMessage.get("message") !== undefined) {
				//add message view here
			}
		}
	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return SAMonitorView;
});