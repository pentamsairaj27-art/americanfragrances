// reviews section
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      lazyLoad: true,
      responsiveClass:true
    });
  });
  
  $('.mynav-next').click(function() {
      $(".owl-carousel").trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('.mynav-prev').click(function() {
      $(".owl-carousel").trigger('prev.owl.carousel');
  })


  