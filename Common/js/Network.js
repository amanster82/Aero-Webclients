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
			console.log("Connected to server");

			Connection.set({connected: true});

			var pkt = PacketFactory.Create("PacketClientType");
			pkt.serialize(ClientTypeEnum[ClientType]);

			Send(pkt);
		},
		
		onmessage: function(msg) {
			// Handle packet receive here
		},
		
		onclose: function() {
			if(Connection.get("connected") == false) {
				console.log("Failed to connect to server");
			} else {
				console.log("Connection to server closed");
				Connection.set({connected: false});
			}
		}
	};	
	
	/**
	  * Initializes a connection to the Datacenter server
	  * @export
	  */
	var ConnectToServer = function(clientType, host) {
		if(Connection.get("connected") == true)
		{
			console.log("Error: Already connected");
			return;
		}

		// Sanity checks
		ClientType = clientType || "Unknown";
		host = host || ServerIP; // Custom host can be provided

		CreateSocket("ws://"+host+":"+ServerPort);

		console.log("Connecting to server");
	};

	/**
	  * Creates a new WebSocket to the specified address
	  * @private
	  */
	var CreateSocket = function(address)
	{
		ServerSocket = new WebSocket(address);
		ServerSocket.binaryType = "arraybuffer";

		_.extend(ServerSocket, SocketFuncs);
	}
	
	/**
	  * Sends a packet to a connected server
	  * @export
	  */
	var Send = function(packet) {
		if(Connection.get("connected") == false)
		{
			console.log("Error: Cannot send packet, socket is not connected");
			return;
		}

		// Sanity checks
		if(packet !== undefined && packet.Buffer.getBuffer() instanceof ArrayBuffer)
		{
			ServerSocket.send(packet.Buffer.getBuffer); // The chain..
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