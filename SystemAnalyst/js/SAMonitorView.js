define([
	'jquery',
	'underscore',
	'backbone',
	'SAMessageView',
	'NetMessageModel'
], function($, _, Backbone, SAMessageView, NetMessageModel){


	// Whether to show certain messages
	var MsgVis = {
		//severity
		"critical": true, 
		"warning": true, 
		"success": true, 
		"debug": true, 

		//systems
		"dc": true, 
		"at": true,
		"uav": true, 
		"wc": true, 
		"ip": true
	};

	/**
	  * System Analyst Monitor view - gets messages sent over our
	  * network and displays them in the SA client.
	  * @extends Backbone.View
	  */
	var SAMonitorView = Backbone.View.extend({

		el: "#sa-monitor",

		initialize: function() {
			//listen for new messages in the collection
			this.listenTo(this.collection, "add", this.add);

			//listen for toggle button events
			$('.sa-sev-toggle').on('click', $.proxy(this.toggleSev, this));
			$('.sa-sys-toggle').on('click', $.proxy(this.toggleSys, this));
		},
		
		add: function(newMessage) {
			//check that the message is displayed and exists
			if (newMessage.get("display") === true && newMessage.get("message") !== undefined) {

				var view = new SAMessageView({model: newMessage});
				this.$el.append(view.render().el); //append message to div
				
			}
		},

		toggleSev: function(ev) {

			//name of severity to be toggled
			target = ev.target.id.split("-")[1];
			console.log(target);

			//toggle display variable for target
			MsgVis[target] = !MsgVis[target];
			val = MsgVis[target] //current display value
			console.log(MsgVis[target]);

			this.collection.each(function(msg) {
				if (msg.get("severity") == target) {
					msg.set({"display" : val});
				}
			});
		},

		toggleSys: function(ev) {
		}
	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return SAMonitorView;
});
