define([
	'jquery',
	'underscore',
	'backbone',
	'PacketBuffer',
	'PacketFactory',
	'ConnectionModel',
	'ConnectionView'
], function($, _, Backbone, PacketBuffer, PacketFactory, ConnectionModel, ConnectionView) {

	/**
	  * Internal properties
	  * @properties
	  * @private
	  */
	var ServerIP = "127.0.0.1",
		ServerPort = "24000",
		ServerSocket,
		ClientType,
		Connection;
	
	/**
	  * Maps named client types to their integer values
	  * @enum
	  */
	var ClientTypeEnum = {
		"Unknown" : -1,
		"DC" : 0,
		"AntennaTracker" : 1,
		"UAV" : 2,
		"ImageAnalyst" : 3, 
		"SystemAnalyst" : 4,
		"Recon" : 5,
		"Spectator" : 6,
		"Judge" : 7,
		"ImageProcessing" : 8
	};

	/**
	  * Inititializes the Network
	  * @export
	  */	
	var Initialize = function() {
		Connection = new ConnectionModel();

		var ConnectView = new ConnectionView({ model:Connection });

		Connection.set({connected: false});

		console.log("Network initialized");
	};
	
	/**
	  * Socket function callbacks used by the WebSocket object
	  * @extends
	  */
	var SocketFuncs = {
		onopen: function() {
			Connection.set({connected: true});

			var pkt = PacketFactory.Create("PacketClientType");
			pkt.serialize(ClientTypeEnum["ImageAnalyst"]);
		},
		
		onmessage: function(msg) {
		
		},
		
		onclose: function() {
			Connection.set({connected: false});
		}
	};	
	
	/**
	  * Connects to the Datacenter server
	  * @export
	  */
	var ConnectToServer = function(clientType, host) {
	
		var destination = host || ServerIP; // Custom host can be provided
	
		ServerSocket = new WebSocket("ws://"+destination+":"+ServerPort);
	
		_.extend(ServerSocket, SocketFuncs);

		console.log("connecting to server");
	};
	
	/**
	  * Sends a packet to a connected server
	  * @export
	  */
	var Send = function(packet) {
		if(packet !== undefined)
		{
			ServerSocket.send(packet);
		}
	};
	
	/**
	  * API Mapping
	  * @return
	  */
	return {
		Initialize: Initialize,
		ConnectToServer: ConnectToServer,
		Send: Send
	};
});