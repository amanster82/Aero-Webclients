define([
	'jquery',
	'underscore',
	'backbone', 
	'Network'
], function($, _, Backbone, Network){

	/**
	  * This model will hold a row of log message text sent over our network.
	  * @extends BackBone.Model
	  */
	var NetMessageModel = Backbone.Model.extend({

		initialize: function() {

		},

		// Default values if they aren't provided during initialization of the object
		defaults: {
			source: Network.ClientTypeEnum.Unknown;
			severity: 'debug',
			timestamp: _.now(),
			display: true
		}
	});

	/**
	  * Returns the object containing our extended Model
	  * @return
	  */
	return NetMessageModel;
});