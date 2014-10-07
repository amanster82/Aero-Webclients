define([
	'jquery',
	'underscore',
	'backbone',
	'PacketBuffer',
], function($, _, Backbone, PacketBuffer){

	/**
	  * Factory method. Creates a base packet and then extends it with the requested packets
	  * methods and properties
	  * @export
	  */
	Create = function(packet) {
		var pkt = new Packet();
		
		if(packet !== undefined)
			_.extend(pkt, PacketMapping[packet]);		
		
		return pkt;
	}

	/**
	  * Base class for packets
	  * @protected
	  */
	var Packet = function() {
		this.OpCode = undefined;
		this.Name = undefined;
		
		this.recv = function() {
			console.log("Invalid packet created");
		}
		
		this.serialize = function() {
			console.log("Serializing invalid packet");
		}
	};

	/**
	  * Used to transmit JSON data between the clients and server
	  * @protected
	  */
	var PacketJSONPayload = {
		OpCode: 0x120,
		Name: "PacketJSONPayload",
		
		recv: function() {
			console.log("Received JSON packet");
		},
		
		serialize: function(payload) {
			if(typeof payload !== 'string')
				return;

			var size = 2 + 2 + payload.length;

			this.Buffer = PacketBuffer.Create(size);

			this.Buffer.write(this.OpCode, this.Buffer.VarType["ushort"]);
			this.Buffer.write(payload.length, this.Buffer.VarType["ushort"]);
			this.Buffer.write(payload);

			console.log("Serializing JSON packet");
		}
	};
	
	/**
	  * Used to inform the DC what type of client we are
	  * @protected
	  */
	var PacketClientType = {
		OpCode: 0x105,
		Name: "PacketClientType",
		Size: 3, // Predefined size
		Buffer: undefined,
		
		recv: function() {
		
		},
		
		serialize: function(clientType) {
			this.Buffer = PacketBuffer.Create(this.Size);

			this.Buffer.write(this.OpCode, this.Buffer.VarType["ushort"]);
			this.Buffer.write(clientType, this.Buffer.VarType["uchar"]);
		}
	};
		
	/**
	  * Maps a string query to a packet
	  * @struct
	  */
	var PacketMapping = {
		"PacketJSONPayload" : PacketJSONPayload,
		"PacketClientType" : PacketClientType
	};

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Create: Create
	};
});