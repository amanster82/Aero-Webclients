// Various functions to support the design of the layouts

// For footer:
$('#log-footer').click(function(event) {

	// Stops the footer from receiving clicks if a button is clicked
	if($(event.target).is(".filter-button") || $(event.target).is("label"))
		return;

	$(this).toggleClass('footer-closed');

	if ($(this).height() > 40) {
		$('#logger-view').css("overflow-y","scroll");

	}
	else {
		$('#logger-view').css("overflow-y","hidden");
	}
});

// For sidebar:
$('.sidebar-wrapper').click(function(event) {

	// Stops the sidebar from receiving specific events
	//if($(event.target).is(".filter-button") || $(event.target).is("label"))
	//	return;

	$(this).toggleClass('sidebar-closed');
	$('#log-footer').toggleClass('sidebar-closed');
	$('#aero-body').toggleClass('sidebar-closed');
});

// Because the page is static and doesn't scroll, this function is very simple for now
function ResizeSidebar() {
	var scrollTop = window.pageYOffset;
	var viewportHeight = document.documentElement.clientHeight;
	var headerHeight = 60; // Set to the header height
	
	var visibleHeaderHeight = Math.max(0, headerHeight - scrollTop);
	$('.sidebar-wrapper').height(viewportHeight - visibleHeaderHeight);
	
	return;
}

// For body:
function ResizeBody() {
	var scrollTop = window.pageYOffset;
	var viewportHeight = document.documentElement.clientHeight;
	var bodyHeight = 152; // Set to the header + footer + logger heighs (default)
	
	var visibleBodyHeight = Math.max(0, bodyHeight - scrollTop);
	$('#aero-body').height(viewportHeight - visibleBodyHeight);
	
	return;
}

var pendingReflow = null;

$(window).on('scroll resize', function () {
	if (pendingReflow === null) {
		pendingReflow = requestAnimationFrame(function () {
			ResizeSidebar();
			ResizeBody();
			pendingReflow = null;
		});
	}
});

ResizeSidebar();
ResizeBody();