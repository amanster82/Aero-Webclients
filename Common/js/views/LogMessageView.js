define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * The LogMessageView controls how each individual log message is styled and controlled
	  * @extends Backbone.View
	  */
	var LogMessageView = Backbone.View.extend({

		// The tag to use
		tagName: "span",

		initialize: function() {

			// Listen to any changes on the model
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {

			// Update the UI when there's a change
			this.$el.html("[" + this.model.get("timestamp") + "] " + 
				this.model.get("severity") + ": " + this.model.get("message"));

			// Return this in order to allow for render chaining
			return this;
		},

	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return LogMessageView;
});