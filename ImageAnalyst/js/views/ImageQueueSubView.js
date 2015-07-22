define([
	'jquery',
	'underscore',
	'backbone',
	'ImageQueueItemView'
], function($, _, Backbone, QueueItemView){

	/**
	  * @extends Backbone.View
	  */
	var ImageQueueSubView = Backbone.View.extend({


		events: {

			'drop .imagequeue': 'drop',

		},

		initialize: function() {

			// Update when a new model is added to the collection
			this.listenTo(this.collection, "add", this.add);

			this.$el.find('.imagequeue').droppable({
				activeclass: "droppable-active",
				hoverclass: "droppable-hover"
			});
		},

		render: function() {

			// Return this in order to allow for render chaining
			return this;
		},

		add: function(image) {

			var view = new QueueItemView({model: image});

			this.$el.find('.imagequeue').prepend(view.render().el);
		},

		dragStart: function(event,data, clone, element) {
			console.log("drag start");
		},
		dragEnter: function(event, clone, element) {
			console.log("drag enter");
		},
		dragLeave: function(event, clone, element) {
			console.log("drag leave");
		},
		drop: function(event, ui) {
			console.log("drag drop");
		},
		dragEnd: function(event, clone, element) {
			console.log("drag end");
		}

	});

	/**
	  * Returns the object containing our extended view
	  * @return
	  */
	return ImageQueueSubView;
});