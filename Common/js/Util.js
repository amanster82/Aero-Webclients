define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){


	var UppercaseFirst = function(str) {
		str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});

		return str;
	};

	var FormatTimestamp = function(timestamp) {
		var date = new Date(timestamp);

		var hours = "0" + date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();

		var format = hours.substr(hours.length-2) + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);

		return format;
	};

	/**
	  * Returns a list of public utility functions
	  * @return
	  */
	return {
		UppercaseFirst: UppercaseFirst,
		FormatTimestamp: FormatTimestamp
	};
});
