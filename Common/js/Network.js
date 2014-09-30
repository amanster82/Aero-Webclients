define([
'jquery',
'underscore',
'backbone',
'PacketBuffer',
'Packets',
], function($, _, Backbone, PacketBuffer, Packets){

	var Initialize = function() {
		console.log("Network up");
		
		var Buffer = PacketBuffer.Create(12);
		Buffer.write(1000, Buffer.VarType["ushort"]);
	}
	
	return {
		Initialize: Initialize
	};
});