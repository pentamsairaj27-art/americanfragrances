$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.megamenu', this).not('.in .megamenu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        },
        function() {
            $('.megamenu', this).not('.in .megamenu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        }
    );
});