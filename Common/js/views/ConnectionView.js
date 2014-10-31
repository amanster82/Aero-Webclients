define([
	'jquery',
	'underscore',
	'backbone',
	'ConnectionModel'
], function($, _, Backbone, ConnectionModel){

	/**
	  * This view will listen on the ConnectionModel and update the specific div when
	  * the model data is changed.
	  * @extends Backbone.View
	  */
	var ConnectionView = Backbone.View.extend({

		// The div to update
		el: "#connection-status",

		events: {
			'click #connect-btn' : 'connectButtonEvent'
		},

		initialize: function() {

			// Listen to any changes on the model
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			var text = "<div id=\"connection-text\">Status: <span id=\"connection-state\" class=\"connection-state-" + (this.model.get("connected") === true ? "connected" : "disconnected") +
			"\">" + (this.model.get("connected") === true ? "Connected" : "Disconnected") + "</span></div>";
			// Update the UI when there's a change
			this.$el.find("#connection-view").html(text);
			this.$el.find("#connect-btn").html((this.model.get("connected") === true ? "Disconnect" : "Connect"));

			// Return this in order to allow for render chaining
			return this;
		},

		// Trigger the event with whether the client is currently connected or not
		connectButtonEvent: function() {
			this.trigger("connectionButtonClick", this.model.get("connected") );
		}

	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return ConnectionView;
});