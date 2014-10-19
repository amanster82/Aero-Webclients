$('.footer').click(function() {
  
  if ($(this).height() > 40) {
    
    $(this).animate({ 
      height: "40px"
    }, 600, 'swing', function() {
      $(this).html("Click me!");
    });
    
  } else {
    
    $(this).animate({ 
      height: "450px" 
    }, 600, 'swing', function() {
      $(this).html("Click me again!");                
    });
    
  }
});