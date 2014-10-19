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
			var msg = "<div class=\"log-message\"><span class=\"log-timestamp\">[" + this.model.get("timestamp") +
						"] </span><span class=\"log-severity log-severity-\"" + this.model.get("severity") +
							"\">" + this.model.get("severity") + ": </span><span class=\"logmessage-text\">" +  
							this.model.get("message") + "</span></div>";

			// Update the UI when there's a change
			this.$el.html(msg);

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