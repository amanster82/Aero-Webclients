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
		el: "#connection-view",

		events: {
		},

		initialize: function() {

			// Listen to any changes on the model
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {

			// Update the UI when there's a change
			this.$el.html("Connected: " + this.model.get("connected"));

			// Return this in order to allow for render chaining
			return this;
		}

	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return ConnectionView;
});