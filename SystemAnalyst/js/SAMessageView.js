define([
	'jquery', 
	'underscore',
	'backbone',	
	'Util'
], function($, _, Backbone, Util) {
	
	/*
	* View used for displaying log messages in the SA monitor.
	* @extends Backbone.View
	*/
	var SAMessageView = Backbone.View.extend({
		
		//tag to use
		tagName: "div",
	
		initialize: function() {
			//listen for changes to the model
			this.listenTo(this.model, "change", this.render);
		}, 
		
		render: function() {
			//TODO: format message HTML
			var msgFormat = "<div class=\"sa-msg\">[" + Util.FormatTimestamp(this.model.get("timestamp")) + "] "
					+ this.model.get("message") + "</div>";
			
			//change message in UI
			this.$el.html(msgFormat);
			
			return this;
		}
	
	});
	
	//return view object
	return SAMessageView;
	
});