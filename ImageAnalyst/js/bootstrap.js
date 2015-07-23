require.config({
	baseUrl: "js/", // Base directory for this application
	shim: {
		bootstrapjs: { "deps" : ['jquery'] },
		CommonDesign: { "deps" : ['jquery'] },
		jqueryui: { "deps" : ['jquery']},
		RecognitionTuning: { "deps" : ['jqueryui']}
	},
	paths: {
		// Load all of the common modules
		jquery: '../../Common/js/libs/jquery/jquery',
		jqueryui: '../../Common/js/libs/jquery/ui',
		underscore: '../../Common/js/libs/underscore/underscore',
		backbone: '../../Common/js/libs/backbone/backbone',
		async: '../../Common/js/libs/require/async',
		bootstrapjs: '../../Common/js/libs/bootstrap/bootstrap.min',
		Network: '../../Common/js/Network',
		PacketBuffer: '../../Common/js/PacketBuffer',
		PacketFactory: '../../Common/js/PacketFactory',
		ConnectionModel: '../../Common/js/models/ConnectionModel',
		ConnectionView: '../../Common/js/views/ConnectionView',
		CommonDesign: '../../Common/js/CommonDesign',
		SidebarView: 'views/SidebarView',
		LoggerCollection: '../../Common/js/collections/LoggerCollection',
		LogMessageView: '../../Common/js/views/LogMessageView',
		LoggerView: '../../Common/js/views/LoggerView',
		LogMessageModel: '../../Common/js/models/LogMessageModel',
		Util: '../../Common/js/Util',
		Logger: '../../Common/js/Logger',
		ImageAnalyst: 'ImageAnalyst',
		ImageView: 'views/ImageView',
		ImageCollection: 'collections/ImageCollection',
		ImageModel: 'models/ImageModel',
		ImageQueueView: 'views/ImageQueueView',
		ImageQueueSubView: 'views/ImageQueueSubView',
		ImageQueueItemView: 'views/ImageQueueItemView',
		RecognitionTuning: 'views/RecognitionTuning'
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