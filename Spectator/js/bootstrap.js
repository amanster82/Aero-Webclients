require.config({
	baseUrl: "js/", // Base directory for this application
	paths: {
		// Load all of the common modules
		jquery: '../../Common/js/libs/jquery/jquery',
		underscore: '../../Common/js/libs/underscore/underscore',
		backbone: '../../Common/js/libs/backbone/backbone',
		Network: '../../Common/js/Network',
		PacketBuffer: '../../Common/js/PacketBuffer',
		PacketFactory: '../../Common/js/PacketFactory',
		ConnectionModel: '../../Common/js/models/ConnectionModel',
		ConnectionView: '../../Common/js/views/ConnectionView',
		Logger: '../../Common/js/Logger',
		LoggerCollection: '../../Common/js/collections/LoggerCollection',
		LogMessageView: '../../Common/js/views/LogMessageView',
		LoggerView: '../../Common/js/views/LoggerView',
		LogMessageModel: '../../Common/js/models/LogMessageModel'
	}
});

// Load our app once configuration is complete
require([
	// app.js will be loaded and passed as the object APP
	'app',
], function(App){
	// App entry point
	App.Initialize();
});