define([
	'jquery',
	'underscore',
	'backbone',
	'LogMessageView'
], function($, _, Backbone, LogMessageView){


	// Whether to show certain messages
	var ShowWarnings = true,
		ShowCritical = true,
		ShowDebug = true;

	/**
	  * The LoggerView will monitor for any changes in the LoggerCollection
	  * and append new LogMessage objects to the view
	  * @extends Backbone.View
	  */
	var LoggerView = Backbone.View.extend({

		// The div to update
		el: "#log-footer",

		events: {
			'click .filter-warning' : 'filterWarning',
			'click .filter-debug' : 'filterDebug',
			'click .filter-critical' : 'filterCritical'
		},

		initialize: function() {

			// Update when a new model is added to the collection
			this.listenTo(this.collection, "add", this.add);
			this.listenTo(this.collection, "change", this.render);
		},

		render: function() {

			// Clear all elements
			this.$el.find("#logger-view").html("");
			
			// Re-render them
			this.collection.each(this.add, this);

			// Return this in order to allow for render chaining
			return this;
		},

		// Render the new model
		add: function(logmessage) {
			// Only display it if its set and exists
			if(logmessage.get("display") === true && logmessage.get("message") !== undefined)
			{
				var view = new LogMessageView({model: logmessage});
				this.$el.find("#logger-view").prepend(view.render().el);
			}
		},

		// Turn warnings on and off
		filterWarning: function() {
			ShowWarnings = !ShowWarnings;

			this.collection.each(function(log) {
				if(log.get("severity") === "warning") {
					log.set( { "display" : ShowWarnings } );
				}
			});
		},

		// Turn debug messages on and off
		filterDebug: function() {
			ShowDebug = !ShowDebug;

			this.collection.each(function(log) {
				if(log.get("severity") === "debug") {
					log.set( { "display" : ShowDebug } );
				}
			});
		},

		// Turn critical messages on and off
		filterCritical: function() {
			ShowDebug = !ShowDebug;

			this.collection.each(function(log) {
				if(log.get("severity") === "critical") {
					log.set( { "display" : ShowDebug } );
				}
			});
		}

	});

	/**
	  * Returns the object containing our extended Connection View
	  * @return
	  */
	return LoggerView;
});