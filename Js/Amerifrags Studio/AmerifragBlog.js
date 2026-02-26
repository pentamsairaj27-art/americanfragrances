$(document).ready(function () {
    var AmerifragBlog = [
        { img: './Images/inspireme/spayonperBanner.png', description: '<a href="sprayonperfume.html" class="amerifrag-studio-img-text">How to spray perfume the right way </a>' },
        { img: './Images/inspireme/buyngperfume.png', description: '<a href="buyingaPerfume.html" class="amerifrag-studio-img-text">Essential tips before buying your next perfume</a>' },
        { img: './Images/inspireme/fragranceNotes.png', description: '<a href="knowaboutFragrance.html" class="amerifrag-studio-img-text">Unveiling fragrance notes</a>' },
        { img: './Images/inspireme/fragrancefamilies.png', description: '<a href="FragranceFamilies.html" class="amerifrag-studio-img-text">Unpacking Fragrance Families</a>' },
        { img: './Images/inspireme/helpfulqa.png', description: '<a href="HelpfulQAs.html" class="amerifrag-studio-img-text">Fragrance Q&A: Your Scent Questions Answered Here!</a>' },
        { img: './Images/inspireme/famousperfumenew.png', description: '<a href="famousperfume.html" class="amerifrag-studio-img-text">Unmasking Common Perfume Myths</a>' },
        { img: './Images/inspireme/layeronPernewBanner.png', description: '<a href="layeronperfumes.html" class="amerifrag-studio-img-text">Create Your Signature Scent with Expert Perfume Layering</a>' },
        { img: './Images/inspireme/inspire8.png', description: '<a href="uniquesignature.html" class="amerifrag-studio-img-text"> Crafting Your Unique Signature Fragrance: A Personalized Guide</a>' },
        { img: './Images/inspireme/layeronPerBanner.png', description: '<a href="fraganceComplexity.html" class="amerifrag-studio-img-text">Beyond Notes: Fragrance Insights</a>' },
        { img: './Images/inspireme/zodaic10.png', description: '<a href="ZodiacGuidance.html" class="amerifrag-studio-img-text">Discover Your Perfect Fragrance with Zodiac Guidance</a>' },
        { img: 'Images/inspireme/inspire11.png', description: '<a href="ChooseYourFragrance.html" class="amerifrag-studio-img-text">Selecting Scents: Setting the Perfect Mood</a>' },
        { img: 'Images/inspireme/inspire11.png', description: '<a href="ChooseYourFragrance.html" class="amerifrag-studio-img-text">Human Psychology & Aroma</a>' },

    ]
    AmerifragBlog.forEach(function (item) {
        $('#amerifragBlog').append('<div class="col-md-4 text-center my-4"><figure ><img src = "' + item.img + '" style = "width:300px;height:250px" class= "img-fluid amerifrag-img-shadow" /><figcaption><h5 class="my-2">' + item.description + '</h5></figcaption></figure></div> ');
    });

    var AmerifragCommunity = [
        { img: './Images/Amsfacebook.png', alt: 'face book' },
        { img: './Images/instagram.png', alt: 'Instagram' },
        { img: './Images/ams3.png', alt: 'Instagram' },
        { img: './Images/ams4.png', alt: 'Youtube' },
        { img: './Images/ams5.png', alt: 'Instagram' },
        { img: './Images/ams6.png', alt: 'whatsapp' },

    ]
    AmerifragCommunity.forEach(function (item) {
        $('#amerifragCommunity').append('<div class="col-4 community-card-primary"><div class="card amerifrag-img-shadow community-contact"><img src="' + item.img + '" alt="' + item.alt + '" class="community-img-primary img-fluid"></div></div>');
    });

    var AmerifragOccasions = [
        { img: './Images/occasion/wedding.jpg', alt: 'Wedding', description: 'Wedding' },
        { img: './Images/occasion/adventure.jpg', alt: 'Adventure', description: 'Adventure' },
        { img: './Images/occasion/dating.jpg', alt: 'Dating', description: 'Dating' },
        { img: './Images/occasion/family.jpg', alt: 'Family', description: 'Family' },
        { img: './Images/occasion/partying.jpg', alt: 'Partying', description: 'Partying' },
        { img: './Images/occasion/professional.jpg', alt: 'Professional', description: 'Professional' },
        { img: './Images/occasion/sports.jpg', alt: 'Sports', description: 'Sports' },
        { img: './Images/occasion/travel.jpg', alt: 'Travel', description: 'Travel' },
        { img: './Images/occasion/religious.png', alt: 'Religious', description: 'Religious' },
        { img: './Images/occasion/others.jpg', alt: 'Others', description: 'Others' },
    ]
    AmerifragOccasions.forEach(function (item) {
        $('#amerifragOccasions').append('<div class="occasionCard my-2 "><figure class="my-1"><img src="' + item.img + '" alt="' + item.alt + '" style="width:100%"><figcaption class="occasion-buttons my-1"><button class="contact">' + item.description + '</button></figcaption></figure></div>');
    });

    $(document).on("click", ".btn.more_btn", function () {
        var targetSection = $(this).data("target"); // Get the target section from the data attribute

        if ($(targetSection).length) { // Check if the target section exists
            $("html, body").animate({
                scrollTop: $(targetSection).offset().top
            }, 1000); // Scroll to the target section smoothly
        }
    });

    getdatatable()
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/TrendsNews/List_News",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#NewsPosts").empty();
                $.each(data, function (Index, value) {
                    function formatDate(jsonDate) {
                        // Extract the timestamp from the JSON date string
                        var timestamp = parseInt(jsonDate.match(/\d+/)[0], 10); // Extract digits and convert to integer
                        var date = new Date(timestamp); // Create a Date object from the timestamp
                        var day = String(date.getDate()).padStart(2, '0'); // Two-digit day
                        var month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month (0-based index)
                        var year = date.getFullYear(); // Four-digit year
                        return month + '/' + day + '/' + year; // Return formatted date
                    }
                    var news = `<div class="col-md-6"><div class="row d-flex flex-row"><div class="col-md-9 ">
                                <div class="d-flex flex-column">
                                <h5><a href="#" class="text-primary">${value.Heading}</a></h5>
                                <p class="text-muted">by ${value.Author} | ${formatDate(value.Date)}</p>
                                <p>${value.Description}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <img src="${value.Image}" alt="${value.Heading}" class="img-fluid rounded" style="width:100% !important;">
                            </div></div></div>`;



                    
                    $("#NewsPosts").append(news);
                });
            }
        });
    };
    getTrends()
    function getTrends() {
        $.ajax({
            url: "https://api.americanfragrances.com/TrendsNews/List_Trends",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#TrendsPosts").empty();
                $.each(data, function (Index, value) {
                    function formatDate(jsonDate) {
                        // Extract the timestamp from the JSON date string
                        var timestamp = parseInt(jsonDate.match(/\d+/)[0], 10); // Extract digits and convert to integer
                        var date = new Date(timestamp); // Create a Date object from the timestamp
                        var day = String(date.getDate()).padStart(2, '0'); // Two-digit day
                        var month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month (0-based index)
                        var year = date.getFullYear(); // Four-digit year
                        return month + '/' + day + '/' + year; // Return formatted date
                    }
                    var news = `<div class="col-md-12"><div class="row d-flex flex-row"><div class="col-md-9 ">
                                <div class="d-flex flex-column">
                                <h5><a href="#" class="text-primary">${value.Heading}</a></h5>
                                <p class="text-muted">by ${value.Author} | ${formatDate(value.Date)}</p>
                                <p>${value.Description}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <img src="${value.Image}" alt="${value.Heading}" class="img-fluid rounded" style="width:100% !important;">
                            </div></div></div>`;




                    $("#TrendsPosts").append(news);
                });
            }
        });
    };

})


