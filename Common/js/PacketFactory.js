define([
'jquery',
'underscore',
'backbone',
], function($, _, Backbone){

	/**
	  * Factory method. Creates a base packet and then extends it with the requested packets
	  * methods and properties
	  * @export
	  */
	Create = function(packet) {
		var pkt = new Packet();
		
		_.extend(pkt, PacketMapping[packet]);		
		
		return pkt;
	}

	/**
	  * Base class for packets
	  * @export
	  */
	var Packet = function() {
		this.OpCode = undefined;
		this.Name = undefined;
		
		this.recv = function() {
			console.log("Invalid packet created");
		}
		
		this.serialize = function(buffer) {
			console.log("Serializing invalid packet");
		}
	};

	/**
	  * Used to transmit JSON data between the clients and server
	  * @extends
	  */
	var PacketJSONPayload = {
		OpCode: 0x120,
		Name: "PacketJSONPayload",
		
		recv: function() {
			console.log("Received JSON packet");
		},
		
		serialize: function(buffer) {
			console.log("Serializing JSON packet");
		}
	};
		
	/**
	  * Maps a string query to a packet
	  * @struct
	  */
	var PacketMapping = {
		"PacketJSONPayload" : PacketJSONPayload
	};

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Create: Create
	};
});