require([
	'jquery', 
	'underscore',
	'backbone',	
	'Util'
] function($, _, Backbone) {
	
	/*
	* View used for displaying log messages in the SA monitor.
	* #extends Backbone.View
	*/
	var SAMessageView = Backbone.View.Extend({
	
		initialize: function() {
			//listen for changes to message data
			this.listenTo(this.model, "change", this.render);
		}, 
		
		render: function() {
			//TODO: format message HTML
			var msgFormat = JSON.stringify(this.model);
			
			//change message in UI
			this.$el.html(msgFormat);
			
			return this;
		}
	
	});
	
});