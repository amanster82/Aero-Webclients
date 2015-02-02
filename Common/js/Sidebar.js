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

var pendingReflow = null;

$(window).on('scroll resize', function () {
	if (pendingReflow === null) {
		pendingReflow = requestAnimationFrame(function () {
			ResizeSidebar();
			pendingReflow = null;
		});
	}
});

ResizeSidebar();