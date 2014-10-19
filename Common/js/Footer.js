$('.log-footer').click(function() {
	if ($(this).height() > 40) {
		$(this).animate({ 
		  height: "40px"
		}, 0, 'swing', function() {
			$(this).removeClass('footer-open').addClass('footer-closed');
		});

	} else {
		$(this).animate({ 
		  height: "450px" 
		}, 0, 'swing', function() {
			   $(this).removeClass('footer-closed').addClass('footer-open');
		});
	}
});

// Stops the footer from receiving clicks if a button is clicked
$('.filter-button').click(function(event) {
	event.stopPropagation();
});