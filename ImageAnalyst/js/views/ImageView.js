define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * @extends Backbone.View
	  */
	var ImageView = Backbone.View.extend({

		// The div to update
		el: "#image-view",

		imageTemplate: _.template("<div class='image-properties-header'>" +
								"Properties - ID: <%= guid %>" +
								"</div>" +
								"<div class='col-md-6'>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Width:</div>" +
										"<div class='image-property-value'><%= width %></div>" +
									"</div>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Height:</div>" +
										"<div class='image-property-value'><%= height %></div>" +
									"</div>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Location:</div>" +
										"<div class='image-property-value'>Lon: <%= latitude %>, Lat: <%= longitude %></div>" +
									"</div>" +
								"</div>" +
								"<div class='col-md-6'>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Plane Pitch:</div>" +
										"<div class='image-property-value'><%= pitchangle %> Degrees</div>" +
									"</div>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Plane Roll:</div>" +
										"<div class='image-property-value'><%= rollangle %> Degrees</div>" +
									"</div>" +
									"<div class='image-property'>" +
										"<div class='image-property-title'>Plane Altitude</div>" +
										"<div class='image-property-value'><%= altitude %> Ft.</div>" +
									"</div>" +
								"</div>"),

		targetTemplate: _.template("<div class='image-properties-header'>" +
								"2 Targets" +
								"</div>" +
								"<div class='image-targets-container'>" +
									"<div class='image-target'>" +
										"<div class='image-target-property col-md-2'>" +
											"<div class='image-target-title'>ID:</div>" +
											"<div class='image-target-value'>1</div>" +
										"</div>" +
										"<div class='image-target-property col-md-3'>" +
											"<div class='image-target-title'>Shape:</div>" +
											"<div class='image-target-value'>Square</div>" +
										"</div>" +
										"<div class='image-target-property col-md-3'>" +
											"<div class='image-target-title'>Colour:</div>" +
											"<div class='image-target-value'>Blue</div>" +
										"</div>" +
										"<div class='image-target-property col-md-4'>" +
											"<div class='image-target-title'>Found By:</div>" +
											"<div class='image-target-value'>Computer Vision</div>" +
										"</div>" +
									"</div>" +
								"</div>"),

		events: {
		},

		initialize: function() {
			this.listenTo(this.model, "change", this.renderImageProperties);

			this.render();
		},

		render: function() {

			this.renderImageProperties();
			//this.$el.find("#target-properties-container")

			// Return this in order to allow for render chaining
			return this;
		},

		renderImageProperties: function() {
			this.$el.find("#image-properties-container").html(this.imageTemplate(this.model.attributes));

			if(this.model.attributes.data !== undefined)
			{
				var canvas = document.getElementById('image-canvas');
				var context = canvas.getContext('2d');
				var img = new Image();

				img.onload = function() {
					context.drawImage(this, 0, 0, canvas.width, canvas.height);
				};

				img.src = "data:image/jpg;base64," + this.model.attributes.data;
			}

			return this;
		}
	});

	/**
	  * Returns the object containing our extended image view
	  * @return
	  */
	return ImageView;
});
