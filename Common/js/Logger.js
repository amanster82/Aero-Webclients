define([
	'jquery',
	'underscore',
	'backbone',
	'LoggerView',
	'LoggerCollection',
	'LogMessageModel'
], function($, _, Backbone, LoggerView, LoggerCollection, LogMessageModel) {

	/**
	  * Singletons for the main view and collection objects
	  * @private
	  */
	var logCollection,
		logView;

	/**
	  * Inititializes the logger
	  * @export
	  */
	var Initialize = function() {
		logCollection = new LoggerCollection({ model: LogMessageModel });
		logView = new LoggerView({ collection: logCollection });
	};

	/**
	  * Writes a log message with the given properties.
	  * Defaults if properties other than message are omitted
	  * @export
	  */
	var Log = function(properties) {
		if(typeof properties !== "object")
		{
			LogMessage(properties);
			return;
		}

		var msg = properties.message;

		if(properties.message === undefined) {
			return;
		}

		var severity = properties.severity;
		var timestamp = properties.timestamp;

		logCollection.add({ message: msg, severity: severity, timestamp: timestamp });
	};

	/**
	  * Simpler version of the Log function where only a message needs to be given
	  * @export
	  */
	var LogMessage = function(msg) {
		if(msg === undefined) {
			return;
		}

		logCollection.add({ message: msg });
	};

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Initialize: Initialize,
		Log: Log,
		LogMessage: LogMessage
	};
});
