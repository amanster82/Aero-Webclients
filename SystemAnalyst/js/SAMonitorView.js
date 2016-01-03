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

	// function to determine whether or not message is displayed
	var toBeDisplayed = function(msg) {
		return !(msg.get("message") == undefined) && msg.get("display") == true;
	}

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

			//render if there are any pre-existing messages in collection
			if (this.collection.length == 0) {
				this.render();
			}
			
		},
		
		add: function(newMessage) {
			//check that the message is displayed and exists
			if (toBeDisplayed(newMessage)) {

				var view = new SAMessageView({model: newMessage});
				this.$el.append(view.render().el); //append message to div
				
			}
		},

		render: function() {

			var mhtml = this.collection.filter(toBeDisplayed) //filter out hidden or invalid messages
			.map( function(msg) {return (new SAMessageView({model : msg})).render().el;} ) //get message view objects
			.reduce( function(html, view) { return html + view.outerHTML; }, "" ); //concatenate all SA message HTML

			//clear and add HTML chunk to view
			this.$el.html("").append(mhtml);
			console.log(this.$el.html);

			return this; //return view object
		},

		toggleSev: function(ev) {

			//name of severity to be toggled
			var target = ev.target.id.split("-")[1];
			console.log(target);

			//toggle display variable for target
			MsgVis[target] = !MsgVis[target];
			var val = MsgVis[target] //current display value
			console.log(MsgVis[target]);

			this.collection.each(function(msg) {
				if (msg.get("severity") == target) {
					msg.set({"display" : val});
				}
			});

			this.render();
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
