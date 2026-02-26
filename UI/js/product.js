  $(document).ready(function() {
  // handle thumbnail clicks
  $('.thumbnail-link').click(function(e) {
    e.preventDefault();
    var slideIndex = $(this).data('slide-to');
    $('#product-images').carousel(slideIndex);
    var newImageSrc = $(this).find('img').attr('src').replace('-thumbnail', '');
    $('#product-images .carousel-item.active img').attr('src', newImageSrc);
    clearInterval(carouselInterval);
  });

  // auto-scroll carousel
  var carouselInterval = setInterval(function() {
    var activeSlide = $('#product-images .carousel-item.active');
    var nextSlide = activeSlide.next('.carousel-item');
    if (!nextSlide.length) {
      nextSlide = $('#product-images .carousel-item').first();
    }
    var slideIndex = nextSlide.index();
    $('#product-images').carousel(slideIndex);
    var newImageSrc = nextSlide.find('img').attr('src').replace('-thumbnail', '');
    $('#product-images .carousel-item.active img').attr('src', newImageSrc);
    activeSlide.removeClass('active');
    nextSlide.addClass('active');
  }, 3000);

  // pause auto-scroll when user clicks on carousel or thumbnail
  $('#product-images, .thumbnail-link').click(function() {
    clearInterval(carouselInterval);
  });
   
// carousel
$('#brands-carousel').owlCarousel({
  loop:true,
  margin:10,
  responsiveClass:true,
  responsive:{
      0:{
          items:1,
          nav:true
      },
      767:{
          items:2,
          nav:false
      },
      1000:{
          items:5,
          nav:true,
          loop:false
      }
  }
}) 
// end pf carousel

// progress bar
const ctx = document.getElementById("chart").getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["5 - 11", "12 - 18", "19 - 21", "22 - 30", "31 - 40", "41 - 50", "51 - 60", "61 - 70", "71 - 80", "80+"],
    datasets: [{
      label: '',
      backgroundColor: 'rgba(161, 198, 247, 1)',
      borderColor: 'rgb(47, 128, 237)',
      data: [18, 34, 73, 58, 60, 47, 40, 36, 7, 1],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  },
});
  
});