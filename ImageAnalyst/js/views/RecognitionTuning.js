define([
	'jquery',
	'jqueryui',
	'underscore',
	'backbone'
], function($, ui, _, Backbone){

	/**
	  * @extends Backbone.View
	  */
	var RecognitionTuning = Backbone.View.extend({

		// The div to update
		el: "#recognition-tuning",

		events: {
		},

		initialize: function() {
			$( "#gaussian" ).slider({
				min: 1,
				max: 55,
				step: 1,
				slide: function( event, ui ) {
					$( "#gaussian-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});
			
			$( "#canny-low" ).slider({
				min: 1,
				max: 255,
				step: 1,
				slide: function( event, ui ) {
					$( "#canny-low-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});
			
			$( "#canny-high" ).slider({
				min: 1,
				max: 255,
				step: 1,
				slide: function( event, ui ) {
					$( "#canny-high-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});

			$( "#hough-vote" ).slider({
				min: 1,
				max: 255,
				step: 1,
				slide: function( event, ui ) {
					$( "#hough-vote-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});

			$( "#hough-length" ).slider({
				min: 0,
				max: 255,
				step: 1,
				slide: function( event, ui ) {
					$( "#hough-length-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});

			$( "#hough-distance" ).slider({
				min: 0,
				max: 255,
				step: 1,
				slide: function( event, ui ) {
					$( "#hough-distance-val" ).html( ui.value );
				},
				stop: function(event, ui) {
				}
			});
		},

		render: function() {

			return this;
		}
	});

	/**
	  * Returns the object containing our extended container
	  * @return
	  */
	return RecognitionTuning;
});