define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/**
	  * This model will hold the current connection status of the WebSocket
	  * @extends BackBone.Model
	  */
	var ConnectionModel = Backbone.Model.extend({

		initialize: function() {
			this.on("change:connected", function(model) {
				var connected = model.get("connected");
			});
		},

		defaults: {
			connected: ''
		}
	});

	/**
	  * Returns the object containing our extended Connection Model
	  * @return
	  */
	return ConnectionModel;
});
