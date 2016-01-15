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
		"DC": true, 
		"AntennaTracker": true,
		"UAV": true, 
		"WebClients": true, 
		"IP": true
	};

	//CONSTANT: Web Client IDs
	var wc = ["ImageAnalyst", "SystemAnalyst", "Recon", "Spectator", "Judge"]; //enum [3, 7]

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

			return this; //return view object
		},

		toggleSev: function(ev) {

			//name of severity to be toggled
			var target = ev.target.id.split("-")[1];

			//whether system is being turned on or off
			var checked = document.getElementById(ev.target.id).checked;

			this.collection.each(function(msg) {
				if (msg.get("severity") == target) {

					//determine source element
					var src = "sa-";
					if ($.inArray(msg.get("source"), wc) > -1) {
						//source is a web client
						src = src + "WebClients";
					} else {
						//everything else
						src = src + msg.get("source");
					}

					msg.set({"display" : checked && document.getElementById(src).checked});
				}
			});

			this.render();
		},

		toggleSys: function(ev) {
			
			//get system to be toggled
			var target = ev.target.id.split("-")[1];

			//whether system is being turned on or off
			var checked = document.getElementById(ev.target.id).checked;

			//special case: web clients
			if (target == "WebClients") {
				
				//toggle display if source is any of the above values
				this.collection.each(function(msg) {
					if ($.inArray(msg.get("source"), wc) > -1) {
						//messages display only if their severity and system toggles are both ON
						msg.set({"display" : checked && document.getElementById('sa-' + msg.get("severity")).checked});
					}
				});

				this.render();
				return;
			}

			this.collection.each(function(msg) {
				if (msg.get("source") == target) {
					msg.set({"display" : checked && document.getElementById('sa-' + msg.get("severity")).checked});
				}
			});

			this.render();
		}
	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return SAMonitorView;
});
