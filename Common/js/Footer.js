$('#log-footer').click(function(event) {

	// Stops the footer from receiving clicks if a button is clicked
	if($(event.target).is(".filter-button") || $(event.target).is("label"))
		return;

	if ($(this).height() > 40) {
		$(this).animate({ 
		  height: "40px"
		}, 0, 'swing', function() {
			$(this).toggleClass('footer-closed');
		});

	} else {
		$(this).animate({ 
		  height: '30%'
		}, 0, 'swing', function() {
			   $(this).toggleClass('footer-closed');
		});
	}
});

