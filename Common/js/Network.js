define([
	'jquery',
	'underscore',
	'backbone',
	'Logger',
	'PacketBuffer',
	'PacketFactory',
	'ConnectionModel',
	'ConnectionView'
], function($, _, Backbone, Logger, PacketBuffer, PacketFactory, ConnectionModel, ConnectionView) {

	/**
	  * Internal properties
	  * @properties
	  * @private
	  */
	var ServerIP = "127.0.0.1",
		ServerPort = "24000",
		UseSSL = false, // Disabled by default so network can be debugged more easily
		UseSSLPort = "24001",
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

		// Start istening to changes in the connection model state
		_.extend(this, Backbone.Events);

		this.listenTo(ConnectView, "connectionButtonClick", ConnectionChangeEvent);

		Logger.Log({ message: "Network initialized" });
	};
	
	/**
	  * Socket function callbacks used by the WebSocket object
	  * @extends
	  */
	var SocketFuncs = {
		onopen: function() {
			Logger.Log({ severity: 'success', message: "Connected to server" });

			Connection.set({connected: true});

			// Inform the DC what client we are
			var pkt = PacketFactory.Create("PacketClientType");
			pkt.serialize(ClientTypeEnum[ClientType]);

			Send(pkt);

			// Debug the JSON transmission
			var json = "{ \"packet\": { \"id\": 1 } }";
			var jspkt = PacketFactory.Create("PacketJSONPayload");
			jspkt.serialize(json);

			Send(jspkt);
		},
		
		onmessage: function(msg) {
			// Handle packet receive here
		},
		
		onclose: function() {
			if(Connection.get("connected") == false)
				Logger.Log({ severity: 'critical', message: "Failed to connect to server" });
			else
			{
				Logger.Log({ severity: 'warning', message: "Connection to server closed" });
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
			Logger.Log({ severity: 'warning', message: "Network already connected" });
			return;
		}

		// Sanity checks
		ClientType = clientType || "Unknown";
		host = host || ServerIP; // Custom host can be provided

		if(UseSSL == false)
			CreateSocket("ws://"+host+":"+ServerPort);
		else
			CreateSocket("wss://"+host+":"+UseSSLPort);

		Logger.Log({ message: "Connecting to server" });
	};

	/**
	  * Creates a new WebSocket to the specified address
	  * @private
	  */
	var CreateSocket = function(address) {
		ServerSocket = new WebSocket(address);
		ServerSocket.binaryType = "arraybuffer";

		_.extend(ServerSocket, SocketFuncs);
	};

	var DestroySocket = function() {
		delete ServerSocket;
		Connection.set( { connected: false });
		Logger.Log({ severity: 'warning', message: "Disconnected from server" });
	};
	
	/**
	  * Sends a packet to a connected server
	  * @export
	  */
	var Send = function(packet) {
		if(Connection.get("connected") == false)
		{
			Logger.Log({ severity: 'critical', message: "Error: Cannot send packet, socket is not connected" });
			return;
		}

		// Sanity checks
		if(packet !== undefined && packet.Buffer.getBuffer() instanceof ArrayBuffer)
		{
			ServerSocket.send(packet.Buffer.getBuffer()); // The chain..
		}
	};

	/**
	  * Handles calling the correct function corresponding to a received packet
	  * @private
	  */
	var Recv = function(packet) {

	};

	var ConnectionChangeEvent = function(currentState) {
		if(currentState === true) {
			DestroySocket();
		} else {
			ConnectToServer(ClientType);
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