define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * Used to render image models when displayed in the image queue
	  * @extends Backbone.View
	  */
	var ImageQueueItemView = Backbone.View.extend({

		template: _.template("<div class='queued-image'>" +
									"<div class='queued-image-properties'>" +
										"<div class='queued-image-title'>ID:</div>" +
										"<div class='queued-image-value'><%= imageID %></div>" +
									"</div>" +
									"<div class='queued-image-properties'>" +
										"<div class='queued-image-title'>Targets:</div>" +
										"<div class='queued-image-value'><%= targetCount %></div>" +
									"</div>" +
									"<% if(typeof(tag) !== 'undefined') { %>" +
										"<div class='queued-image-tag'><%= tag %></div>" +
									"<% } %>" +
								"</div>"),

		initialize: function() {

			// Listen to any changes on the model
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			// Update the UI when there's a change
			this.$el.html(this.template(this.model.attributes));

			// Return this in order to allow for render chaining
			return this;
		}

	});

	/**
	  * Returns the object containing our extended view
	  * @return
	  */
	return ImageQueueItemView;
});