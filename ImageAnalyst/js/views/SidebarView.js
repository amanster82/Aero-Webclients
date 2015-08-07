define([
	'jquery',
	'underscore',
	'backbone',
	'Network',
	'PacketFactory'
], function($, _, Backbone, Network, PacketFactory){

	var urlPattern = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

	/**
	  * @extends Backbone.View
	  */
	var Sidebar = Backbone.View.extend({

		// The div to update
		el: "#sidebar-container",

		events: {
			'click button[data-toggle="popover"]': 'togglePopover',
			'click #action-send-test-image': 'sendTestImage'
		},

		initialize: function() {
			$('#send-test-image').popover({
		 		trigger: 'manual',
		 		html: true,
		 		content: '<div class="input-group input-group-sm"><span class="input-group-addon" id="basic-addon1">http://</span><input type="url" class="form-control" id="action-test-image-url" placeholder="" aria-describedby="basic-addon1"><span class="input-group-btn"><button class="btn btn-default" type="button" id="action-send-test-image">SEND</button></span></div>'
			});
		},

		render: function() {

			return this;
		},

		sendTestImage: function(ev) {
			var uri = $("#action-test-image-url").val().toString();

			if(uri.lastIndexOf("http://", 0) === -1 && uri.lastIndexOf("https://", 0) === -1)
				uri = "http://".concat(uri);

			if(uri.match(urlPattern) === null)
			{
				$("#action-test-image-url").parent().addClass("input-form-error");
				return;
			}
			else
			{
				$("#action-test-image-url").parent().removeClass("input-form-error");
				$('#send-test-image').popover('hide');

				// Now we need to send the image to the DC
				var json = "{ \"image\": { \"url\": \"" + uri + "\" } }";
				console.log(json);
				var jspkt = PacketFactory.Create("PacketJSONPayload");
				jspkt.serialize(json);

				Network.Send(jspkt);
			}
		},

		togglePopover: function(ev) {
			if($(ev.target).data("toggle") === "popover") {
				$(ev.target).popover('toggle');
			}
		}
	});

	/**
	  * Returns the object containing our extended container
	  * @return
	  */
	return Sidebar;
});