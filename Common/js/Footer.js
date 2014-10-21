$('#log-footer').click(function(event) {

	// Stops the footer from receiving clicks if a button is clicked
	if($(event.target).is(".filter-button") || $(event.target).is("label"))
		return;

	$(this).toggleClass('footer-closed');

	if ($(this).height() > 40) {
		$(this).css("overflow-y","scroll");
	}
	else {
		$(this).css("overflow-y","hidden");
	}
});

