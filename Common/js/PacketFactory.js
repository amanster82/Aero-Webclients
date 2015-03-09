define([
	'jquery',
	'underscore',
	'backbone',
	'Logger',
	'PacketBuffer',
], function($, _, Backbone, Logger, PacketBuffer){

	var PacketEventListener = {};

	/**
	  * Used to set up the Packet Factory to support event handling, etc
	  * @export
	  */
	Initialize = function() {
		_.extend(PacketEventListener, Backbone.Events);
	}

	/**
	  * Factory method. Creates a base packet and then extends it with the requested packets
	  * methods and properties
	  * @export
	  */
	Create = function(packet) {
		var pkt = new Packet();
		
		if(typeof PacketMapping[packet] !== 'object')
		{
			Logger.Log({ severity: "critical", message: "Invalid packet " + packet + " requested" });
			return undefined;
		}

		if(packet !== undefined)
			_.extend(pkt, PacketMapping[packet]);		
		
		return pkt;
	}

	/**
	  * Returns of the object of the parsed packet
	  * @export
	  */
	Deserialize = function(message) {
		return JSON.parse(message);
	}

	/**
	  * Binds an event listener for a particular packet type.
	  * Arguments are the object that is listening, the type of packet, and the callback function
	  * @export
	  */
	BindPacketEvent = function(object, packet, functor) {
		if(object !== undefined && packet !== undefined && functor !== undefined)
			PacketEventListener.listenTo(object, packet, functor);
	}

	/**
	  * Called with a JSON payload when a packet is received and must be propogated
	  * @export
	  */
	PacketReceived = function(message) {

		var Packet = Deserialize(message);

		if(Packet === undefined)
			return;

		if(typeof Packet.image === "object")
			PacketEventListener.trigger("image", Packet);
		else if(typeof Packet.target ==="object")
			PacketEventListener.trigger("target", Packet);
		else if(typeof Packet.config ==="object")
			PacketEventListener.trigger("config", Packet);
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

			Logger.Log({ message: "Sent out " + size + " byte " + this.Name + " packet" });
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
		Create: Create,
		Initialize: Initialize,
		Deserialize: Deserialize,
		BindPacketEvent: BindPacketEvent,
		PacketReceived: PacketReceived
	};
});