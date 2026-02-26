
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var product_id = params.get("id");
    var reviewdata;
    $('#allbtn').attr('href', '/reviews.html?id=' + product_id);


    //function appendReviews(data) {
    //     $(".reviewsContainer").empty();

    //    $.each(data, function (Index, value) {
    //        

    //        var newrowContent2 = '<div class="reviewcon"><div class="col-md-4 pl-3"><div class="stars"></div></div> <br> <div><p class="user_name m-0"><b>  ' + value.title + '</b></p></div> <br> <p> ' + value.comment + '</p></div>';

    //        var $newReview2 = $(newrowContent2); // Create a jQuery object for the new review
    //        $(".reviewsContainer").append($newReview2);// Append the new review to the container


    //        var $starsContainer = $newReview2.find(".stars"); // Find the .stars element within the new review

    //        if (value.rating >= 4.6 && value.rating == 5) {
    //            $starsContainer.append('<img src="/images/stars/5star.png">');
    //        } else if (value.rating >= 4.1 && value.rating <= 4.5) {
    //            $starsContainer.append('<img src="/images/stars/4.5star.png">');
    //        } else if (value.rating >= 3.6 && value.rating <= 4) {
    //            $starsContainer.append('<img src="/images/stars/4star.png">');
    //        } else if (value.rating >= 3.1 && value.rating <= 3.5) {
    //            $starsContainer.append('<img src="/images/stars/3.5star.png">');
    //        } else if (value.rating >= 2.6 && value.rating <= 3) {
    //            $starsContainer.append('<img src="/images/stars/3star.png">');
    //        } else if (value.rating >= 2.1 && value.rating <= 2.5) {
    //            $starsContainer.append('<img src="/images/stars/2.5star.png">');
    //        } else if (value.rating >= 1.6 && value.rating <= 2) {
    //            $starsContainer.append('<img src="/images/stars/2star.png">');
    //        } else if (value.rating >= 1.1 && value.rating <= 1.5) {
    //            $starsContainer.append('<img src="/images/stars/1.5star.png">');
    //        } else if (value.rating >= 0.6 && value.rating <= 1) {
    //            $starsContainer.append('<img src="/images/stars/1star.png">');
    //        } else if (value.rating >= 0 && value.rating <= 0.5) {
    //            $starsContainer.append('<img src="/images/stars/0.5star.png">');
    //        } else {
    //            $starsContainer.empty(); // Clear the stars container if the rating doesn't match any range
    //        }
    //    });

    //}
    function appendReviews(data) {
        $(".reviewsContainer").empty();

        var pageSize = 100; // Number of reviews per page

        // Split data into chunks of pageSize
        var chunks = [];
        for (var i = 0; i < data.length; i += pageSize) {
            chunks.push(data.slice(i, i + pageSize));
        }

        // Loop through each chunk and display its reviews
        $.each(chunks, function (chunkIndex, chunk) {
            // Loop through reviews in the chunk
            $.each(chunk, function (Index, value) {
                let dateObject = new Date(value.createdon);

                // Extract the month, day, and year
                let options = { year: 'numeric', month: 'long', day: 'numeric' };
                let formattedDate = dateObject.toLocaleDateString('en-US', options);

                console.log(formattedDate);
                var newrowContent2 = '<div class="reviewcon text-center" style="margin-left:20px !important; margin-right:20px !important;"><div class="col-md-12 pl-3"><div class="stars"></div></div> <br> <div><p class="user_name m-0"><b>  ' + (value.name || "") + '</b></p><p class="user_name m-0">  ' + (formattedDate || "") + '</p></div> <br> <p> ' + (value.comment || "")+ '</p></div>';
                var $newReview2 = $(newrowContent2); // Create a jQuery object for the new review
                $(".reviewsContainer").append($newReview2); // Append the new review to the container

                var $starsContainer = $newReview2.find(".stars"); // Find the .stars element within the new review

                // Append stars based on rating
                if (value.rating >= 4.6 && value.rating == 5) {
                    $starsContainer.append('<img src="/images/stars/5star.png">');
                } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                    $starsContainer.append('<img src="/images/stars/4.5star.png">');
                } else if (value.rating >= 3.6 && value.rating <= 4) {
                    $starsContainer.append('<img src="/images/stars/4star.png">');
                } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                    $starsContainer.append('<img src="/images/stars/3.5star.png">');
                } else if (value.rating >= 2.6 && value.rating <= 3) {
                    $starsContainer.append('<img src="/images/stars/3star.png">');
                } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                    $starsContainer.append('<img src="/images/stars/2.5star.png">');
                } else if (value.rating >= 1.6 && value.rating <= 2) {
                    $starsContainer.append('<img src="/images/stars/2star.png">');
                } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                    $starsContainer.append('<img src="/images/stars/1.5star.png">');
                } else if (value.rating >= 0.6 && value.rating <= 1) {
                    $starsContainer.append('<img src="/images/stars/1star.png">');
                } else if (value.rating >= 0 && value.rating <= 0.5) {
                    $starsContainer.append('<img src="/images/stars/0.5star.png">');
                } else {
                    $starsContainer.empty(); // Clear the stars container if the rating doesn't match any range
                }
            });
        });

        // Create pagination links in ascending order
        for (var i = chunks.length; i >=1 ; i--) {
            var $pagination = $('<div class="pagination" data-page="' + i + '">' + i + '</div>'); // Changed the content of pagination
            $(".reviewsContainer").append($pagination);
        }

        // Pagination click event
        $(".pagination").click(function () {
            var page = $(this).data("page");
            $(".reviewcon").hide(); // Hide all reviews
            $(".pagination").removeClass("active"); // Remove active class from all pagination links
            $(this).addClass("active"); // Add active class to clicked pagination link

            // Show reviews for the clicked page
            $(".reviewsContainer")
                .find(".reviewcon")
                .slice((page - 1) * pageSize, page * pageSize)
                .show();
        });

        // Show reviews for the first page initially
        $(".pagination:last").addClass("active").click();
    }









    

    $.ajax({
        url:
            "https://api.americanfragrances.com/Review/Index?project_id=" +
            Project_Id +
            "&product_id=" +
            product_id,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            reviewdata = data;
            
            if (data.length == 0) {
                $("#reviews").append('<center><img src="Images/empty_order.png"><h6><b>" Currently, No Reviews Available.... "</b></h6></center>');
            } else {
                var sortedData = data.sort(function (value1, value2) {
                    return value2.rating - value1.rating;
                });
                appendReviews(sortedData)
                
            }
        },
    });
    function starrating() {
        $(".star-rating").each(function () {
            const rating = parseFloat($(this).data("rating"));
            const stars = $(this).find(".star-rating::before");

            stars.addClass("star-filled");
        });
    }
    $("#star1").click(function () {
        var filteredData = $.grep(reviewdata, function (value) {
            return value.rating == 1;
        });
        
        if (filteredData.length == 0) {
            $(".reviewsContainer").empty();
            $(".reviewsContainer").text("No Reviews Available.... ").css("padding-top", "10px");
        }
        else {
            appendReviews(filteredData);
        }

    })
    $("#star2").click(function () {
        var filteredData = $.grep(reviewdata, function (value) {
            return value.rating == 2;
        });
        
        if (filteredData.length == 0) {
            $(".reviewsContainer").empty();
            $(".reviewsContainer").text("No Reviews Available.... ").css("padding-top", "10px");
        }
        else {
            appendReviews(filteredData);
        }

    })
    $("#star3").click(function () {
        var filteredData = $.grep(reviewdata, function (value) {
            return value.rating == 3;
        });
        
        if (filteredData.length == 0) {
            $(".reviewsContainer").empty();
            $(".reviewsContainer").text("No Reviews Available....").css("padding-top", "10px");
        }
        else {
            appendReviews(filteredData);
        }
        
    })
    $("#star4").click(function () {
        var filteredData = $.grep(reviewdata, function (value) {
            return value.rating == 4;
        });
        if (filteredData.length == 0) {
            $(".reviewsContainer").empty();
            $(".reviewsContainer").text("No Reviews Available....").css("padding-top", "10px");
        }
        else {
            appendReviews(filteredData);
        }
    })
    $("#star5").click(function () {
        var filteredData = $.grep(reviewdata, function (value) {
            return value.rating == 5;
        });
        if (filteredData.length == 0) {
            $(".reviewsContainer").empty();
            $(".reviewsContainer").text("No Reviews Available....").css("padding-top", "10px");
        }
        else {
            appendReviews(filteredData);
        }
    })

    
})