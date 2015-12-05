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
			var msgFormat = "<div class=\"sa-msg " + this.model.get("severity") + "\"><table><td class=\"sa-msg-info\"><span class=\"sa-msg-src\">" + this.model.get("source") + 
				"<br></span><span class=\"sa-msg-severity\">[" + this.model.get("severity").toUpperCase() + "]</span></td>" + 
					"<td class=\"sa-msg-text\"><b>[" + Util.FormatTimestamp(this.model.get("timestamp")) + "]:</b> "
						+ this.model.get("message") + "</td></div>";
			
			//change message in UI
			this.$el.html(msgFormat);
			
			return this;
		}
	
	});
	
	//return view object
	return SAMessageView;
	
});