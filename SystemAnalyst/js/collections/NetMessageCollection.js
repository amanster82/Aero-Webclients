define([
	'jquery', 
	'underscore', 
	'backbone', 
	'NetMessageModel',
] function($, _, Backbone, NetMessageModel) {
	
	/*
	* Used by the SA Monitor to hold all messages sent over the network.
	* @extends Backbone.Collection
	*/
	var NetMessageCollection = Backbone.Collection.extend({
		
		//model used by this collection
		model: NetMessageModel;
		
	});
	
}
]);