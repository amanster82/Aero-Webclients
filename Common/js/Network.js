define([
'jquery',
'underscore',
'backbone',
'PacketBuffer',
'Packets',
], function($, _, Backbone, PacketBuffer, Packets){

	var Initialize = function() {
		console.log("Network up");
	}
	
	return {
		Initialize: Initialize
	};
});