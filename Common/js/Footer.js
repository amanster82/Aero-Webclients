$('#log-footer').click(function(event) {

	if($(event.target).is(".filter-button"))
		return;

	if ($(this).height() > 40) {
		$(this).animate({ 
		  height: "40px"
		}, 0, 'swing', function() {
			$(this).toggleClass('footer-closed');
		});

	} else {
		$(this).animate({ 
		  height: "450px" 
		}, 0, 'swing', function() {
			   $(this).toggleClass('footer-closed');
		});
	}
});

// Stops the footer from receiving clicks if a button is clicked
