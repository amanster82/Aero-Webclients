define([
	'jquery',
	'underscore',
	'backbone',
	'LogMessageView'
], function($, _, Backbone, LogMessageView){

	/**
	  * The LoggerView will monitor for any changes in the LoggerCollection
	  * and append new LogMessage objects to the view
	  * @extends Backbone.View
	  */
	var LoggerView = Backbone.View.extend({

		// The div to update
		el: "#logger-view",

		events: {
		},

		initialize: function() {

			// Update when a new model is added to the collection
			this.listenTo(this.collection, "add", this.add);
		},

		render: function() {
			
			// Return this in order to allow for render chaining
			return this;
		},

		// Render the new model
		add: function(logmessage) {
			var view = new LogMessageView({model: logmessage});
			this.$el.prepend(view.render().el);
		}

	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return LoggerView;
});