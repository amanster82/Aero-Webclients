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
	var ServerIP = "datacenter.uvicaero.com",
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
		PacketFactory.Initialize();
		
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

			var pkt = PacketFactory.Create("PacketClientType");
			pkt.serialize(ClientTypeEnum[ClientType]);

			Send(pkt);
		},
		
		onmessage: function(msg) {
			if(msg.data instanceof ArrayBuffer)
			{
				var data = new DataView(msg.data);
				var json = "";

				for(var i = 4; i < msg.data.byteLength; i++)
					json += String.fromCharCode(data.getUint8(i, true));

				Logger.Log( { message: "Received " + msg.data.byteLength + " Byte length json string"} );

				PacketFactory.PacketReceived(json);
			}
		},
		
		onclose: function(event) {
			var reason;

			switch(event.code)
			{
				case 1000:
					reason = "Connection fulfilled.";
					break;
				case 1001:
		            reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
		       		break;
		        case 1002:
		            reason = "An endpoint is terminating the connection due to a protocol error";
		        	break;
		        case 1003:
		            reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
		        	break;
		        case 1004:
		            reason = "Reserved. The specific meaning might be defined in the future.";
		        	break;
		        case 1005:
		            reason = "No status code was actually present.";
		        	break;
		        case 1006:
		           reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
		        	break;
		        case 1007:
		            reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
		        	break;
		        case 1008:
		            reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
		        	break;
		        case 1009:
		           reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
		        	break;
		        case 1010:
		            reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. Specifically, the extensions that are needed are: " + event.reason;
		        	break;
		        case 1011:
		            reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
		        	break;
		        case 1015:
		            reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
		        	break;
		        default:
		            reason = "Unknown reason.";
			}

			if(Connection.get("connected") === false)
				Logger.Log({ severity: 'critical', message: "Failed to connect to server. Reason: " + reason });
			else
			{
				Logger.Log({ severity: 'warning', message: "Connection to server closed. Reason: " + reason });
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
		else
		{
			Logger.Log({ severity: "warning", message: "Failed to send packet: Invalid data or packet" });
		}
	};

	/**
	  * Sets up a callback on an object with a function to call when
	  * a particular packet gets received.
	  * @export
	  */
	var Recv = function(object, type, callback) {
		PacketFactory.BindPacketEvent(object, type, callback)
	};

	/**
	  * Called when the Connect/Disconnect button is clicked
	  * @param {boolean} currentState Whether the client is currently connected
	  * @private
	  */
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
		Send: Send,
		ClientType: ClientTypeEnum,
		Recv: Recv
	};
});