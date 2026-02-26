$(document).ready(function () {

    var Project_Id = GlobalInputs();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var minPrice = 0;
    var maxPrice = 1000;
    var minDiscount = 0;
    var maxDiscount = 100;
    var usersession = localStorage.getItem("authorid");
    var cust_auth = localStorage.getItem("authorid");
    if (window.location.hash === "#scrollToAnlyProducts") {
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $('#anlyproductsdv').offset().top
            }, 800);
        }, 500);
    }
    // Initialize phone input for "Join Us" section
    $(document).ready(function () {
        const homePhoneInputField = document.querySelector("#fd-user-phone");

        if (homePhoneInputField && typeof window.intlTelInput === 'function') {
            try {
                window.homePhoneInput = window.intlTelInput(homePhoneInputField, {
                    initialCountry: "us",
                    preferredCountries: ["us", "gb", "ca"],
                    separateDialCode: true,
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                    autoPlaceholder: "off",
                    formatOnDisplay: true
                });

                // Manually set the placeholder after initialization
                homePhoneInputField.placeholder = "Enter Phone";

                console.log('Home phone input initialized successfully');
            } catch (error) {
                console.error('Home phone input initialization failed:', error);
            }
        } else {
            console.log('Phone input field or intlTelInput not found');
        }
    });
    //defaultResetPriceslider();
    //defaultResetPersentSlider();

    function defaultResetPriceslider() {
        var rangeS = document.querySelectorAll(".range-slider input[type=range]");
        var numberS = document.querySelectorAll(".range-slider input[type=number]");

        var initialMinValue = 0;
        var initialMaxValue = 1000;

        rangeS[0].value = initialMinValue;
        rangeS[1].value = initialMaxValue;
        numberS[0].value = initialMinValue;
        numberS[1].value = initialMaxValue;

        localStorage.removeItem('priceDiscountData');
    }
    function defaultResetPersentSlider() {
        var rangeS2 = document.querySelectorAll(".range-slider2 input[type=range]");
        var numberS2 = document.querySelectorAll(".range-slider2 input[type=number]");

        var initialMinPercentage = 0;
        var initialMaxPercentage = 100;

        rangeS2[0].value = initialMinPercentage;
        rangeS2[1].value = initialMaxPercentage;
        numberS2[0].value = initialMinPercentage;
        numberS2[1].value = initialMaxPercentage;

        localStorage.removeItem('priceDiscountData');
    }


    var gender = "";


    var loginsection = params.get("login");

    var desc1;
    var desc2;
    var desc3;
    var desc4;
    var desc5;
    var desc6;
    var desc7;
    var desc8;
    var desc9;
    var desc10;

    $(".topPicks").hide();
    $("#after_login").show();
    $(".recommendProductsCon").show();
    $(".roboWelcome").hide();
    $(".before-login-sentence").show();
    if (usersession != null && usersession != "") {
        $(".before-login-sentence").hide();
        $(".roboWelcome").show();
        var subscripBt = $('<div class="loginRegisrttonCon pt-3" id=loginRegisrttonCon><div class="btn registerBut"><a type="button" class=logintext href=/SubscriptionHome.html>Enter AmeriFrag’s SUBSCRIPTION CLUB</a></div></div>');
        $("#LoginOrSubscribe").append(subscripBt);
        $("#howaboveItWorksheading").empty();
        $("#howaboveItWorksheading").text("Shop Products Using Your Amerifrag User Barcode");
    }
    /*  $(".profileHeading").show();*/
    if (usersession == null || usersession == "") {

        $(".topPicks").show();
        $("#after_login").hide();
        $("#noteProductsContainer").hide();
        $(".recommendProductsCon").hide();
        /*  $(".profileHeading").hide();*/
        var LoginBut = $('<div class="loginRegisrttonCon" id="loginRegisrttonCon">' +
            '<div class="btn registerBut">' +
            '<a class="logintext" id="loginText" >Login</a>' +
            ' / ' +
            '<a class="logintext"  href="register.html">Register</a>' +
            '</div>' +
            '</div>');
        $("#LoginOrSubscribe").append(LoginBut);
    }

    var login = params.get("login");
    if (login == true) {
        $("#login").modal("show");
    }
    var cart_id = localStorage.getItem("cart_id");

    if (cart_id) {
        cart_count(cart_id);
    }
    if (loginsection == 0) {
        window.location.hash = "after_login";
    }

    let Authkey = localStorage.getItem("authorid");
    $.ajax({

        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {

            desc1 = data.desc1;
            desc2 = data.desc2;
            desc3 = data.desc3;
            desc4 = data.desc4;
            desc5 = data.desc5;
            desc6 = data.desc6;
            desc7 = data.desc7;
            desc8 = data.desc8;
            desc9 = data.desc9;
            desc10 = data.desc10;
        },
        error: function (xhr) {
        }
    });

    $(".minp1").on('change', function () {
        $(this).css('background', `linear-gradient(to right, #4caf50)`);
    })
    var take = 8;
    var skip = 0;
    var Sub_Category = "FRAGRANCES";




    // Lazy load BestSeller when scrolled into view

    //getRecommendationsBestSeller();


    function getRecommendationsBestSeller() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Product/BestSeller?customerId=" + usersession + "&take=" + take + "&skip=" + skip,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (response) {

                $("#anlyproductsdv").empty();
                const products = response.Data || data.Products;

                if (!products || products.length === 0) {
                    $("#anlyproductsdv").append('<center class="my-3"><img src="Images/empty_order.png"><h6><b>Currently, No Products Available.</b></h6></center>');
                    return;
                }
                i = 0;
                $.each(response.Data, function (index, value) {
                    i = i + 1;
                    if (index < 4) {
                        const screenWidth = window.innerWidth;
                        if ((screenWidth <= 767 && index < 4) ||
                            (screenWidth > 767 && (data.length >= 8 || index < 8))) {
                            var product_id = value.id;
                            var salePrice = parseFloat(value.price).toFixed(2);
                            var originalPrice = parseFloat(value.rate).toFixed(2);
                            var categoryname = value.categoryname;
                            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


                            var newrowContent =
                                '<div class="col-md-4 col-lg-3 "><div class="product_box  position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                                value.id +
                                '"><img class="img-fluid w-100" src="' +
                                value.display_image +
                                '" alt="..."></a><div class="product-overlay">' +
                                stockStatus +
                                '<a class="btn"  href="Productview.html?id=' +
                                value.id +
                                '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec1' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeREC2' +
                                value.id +
                                '" ></div>' +
                                '<div class="product_name_wrapper">' +
                                '<div class="product_name_container">' +
                                '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                                (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                                '</div>' +
                                '<span class="cat_icon">' +
                                (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                    categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                        '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                                '</span>' +
                                '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                                '<div class="row align-items-center" > <div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                                value.brandname +
                                '"><b><u>' +
                                value.brandname +
                                "</u></b></a></p></div></div>" +
                                '<div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' +
                                salePrice +
                                '</div><div class="org_price"><strike>$' +
                                originalPrice +
                                '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                                value.discount +
                                '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                                product_id +
                                '"></div><span class="reviews_count">&nbsp;(<span>' +
                                value.rating_count +
                                "</span>)</span></div></div></div></div>";
                            $("#anlyproductsdv").append(newrowContent);
                            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                                var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                $("#bestbarcodeREC2" + product_id).append(newrow);
                                $("#cat_useranly_rec1" + product_id).text("AmeriFrag Barcode");

                            }

                            var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                            $starsContainer.empty();

                            var rating = value.rating;
                            var ratingCount = value.rating_count;

                            if (ratingCount > 0 && rating > 0) {
                                if (rating >= 4.6 && rating <= 5) {
                                    $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                } else if (rating >= 4.1 && rating < 4.6) {
                                    $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                } else if (rating >= 3.6 && rating < 4.1) {
                                    $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                } else if (rating >= 3.1 && rating < 3.6) {
                                    $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                } else if (rating >= 2.6 && rating < 3.1) {
                                    $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                } else if (rating >= 2.1 && rating < 2.6) {
                                    $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                } else if (rating >= 1.6 && rating < 2.1) {
                                    $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                } else if (rating >= 1.1 && rating < 1.6) {
                                    $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                } else if (rating >= 0.6 && rating < 1.1) {
                                    $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                } else if (rating > 0 && rating < 0.6) {
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                }
                            } else {
                                // Show 0.5 star (half star) when there are no reviews
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        }
                    }
                });
            },
        });

    }


    $.ajax({
        url:
            "https://api.americanfragrances.com/Customer/Edit?id=" +
            Authkey +
            "&authorid=" +
            Authkey +
            " &project_id= " +
            Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {

            var firstname = data.firstname;
            var lastname = data.lastname;
            var name = data.email;
            var Email = data.email;
            gender = data.gender;
            var pswd = data.password;
            var Phone = data.Phone;
            var qun1 = data.qun1;
            var qun2 = data.qun2;
            var qun3 = data.qun3;
            var qun4 = data.qun4;
            var qun5 = data.qun5;
            var qun6 = data.qun6;
            var qun7 = data.qun7;
            var qun8 = data.qun8;
            var qun9 = data.qun9;
            var qun10 = data.qun10;
            var completedDate = new Date(
                parseInt(data.dob.replace("/Date(", "").replace(")/"))
            );
            var dd = completedDate.getDate();
            var mm = completedDate.getMonth() + 1; //January is 0!
            var yyyy = completedDate.getFullYear();
            if (dd < 10) {
                dd = "0" + dd;
            }
            if (mm < 10) {
                mm = "0" + mm;
            }
            var datef = +dd + "/" + mm + "/" + yyyy;
            var datefs = "";
            var qun1Value = data.qun1;
            // qun1Value = qun1Value.split(' ')[0].slice(0, 4);


            var newrow =
                '<div class="py-3" style="background: #fcfcfc;"><div class="row align-items-center" > <h3 class="hero_title mb-4 headingColor"  style="font-size: 32px!important">Your Personalized Fragrance Journey Begins Here </h3>' +
                '<div class="col-md-4 p-5 text-center"></div><div class="col-md-4"><img src="' +
                data.image +
                '" class="centerimg" width="150" height="150" style="border-radius:80px"><h5 class="mt-2 text-center" style="font-weight:bold">' +
                data.firstname +
                '</h5>' +
                '</div > ' +
                '<div class="col-md-4 p-5 text-center"></div>' +

                '<div class="padding80 pb-0 pt-2"><h4 class="text-center mb-2"><b class="normal-heading">Your Personal Amerifrag Barcode<span class="d-none"><a type="button " class="btn DisclaimerBtn"  data-bs-toggle="modal" data-bs-target="#disclaimer">Disclaimer</a></span> </b></h4>' +
                '<div class="progress paddingx80 userprogressbar" style="background: transparent;"><div class="progress-bar bg-ten" role="progressbar" style="width:10%">' + qun1Value + '<div class="amerifragtooltip">Personality</div></div>' +
                '<div class="progress-bar bg-fourty" role="progressbar" style="width:10%">' + data.qun2 + '<div class="amerifragtooltip">Zodiac</div></div>' +
                '<div class="progress-bar bg-thirty" role="progressbar" style="width:10%">' + data.qun3 + ' <div class="amerifragtooltip">Strength</div></div>' +
                '<div class="progress-bar bg-fifty" role="progressbar" style="width:10%">' + data.qun4 + ' <div class="amerifragtooltip">Passion</div></div>' +
                '<div class="progress-bar bg-twenty" role="progressbar" style="width:10%">' + data.qun5 + ' <div class="amerifragtooltip">Entertainment</div></div>' +
                '<div class="progress-bar bg-ninety" role="progressbar" style="width:10%"> ' + data.qun6 + '<div class="amerifragtooltip">Style</div></div>' +
                '<div class="progress-bar bg-sixty" role="progressbar" style="width:10%"> ' + data.qun7 + '<div class="amerifragtooltip">Color</div></div>' +
                '<div class="progress-bar bg-seventy" role="progressbar" style="width:10%">' + data.qun8 + ' <div class="amerifragtooltip">Scent Note</div></div>' +
                '<div class="progress-bar bg-eighty" role="progressbar" style="width:10%">' + data.qun9 + ' <div class="amerifragtooltip">Mood</div></div>' +
                '<div class="progress-bar bg-hundered" role="progressbar" style="width:10%">' + data.qun10 + ' <div class="amerifragtooltip">Season</div></div>' +
                '</div>' +
                '<div class="d-none"><p class="px-3" style="text-align:justify"><span style="font-weight:700">' + firstname + ' : </span><span>' +
                desc1 + " " + desc2 + " " + desc3 + " " + desc4 + " " + desc5 + " " + desc6 + " " + desc7 + " " + desc8 + " " + desc9 + " " + desc10 + " " +
                '</span></p><div class="row "><div class="col-md-9 px-5 d-flex flex-column justify-content-center"><p class="headings-below-bold-text" style="margin-bottom:0px;">Immerse yourself into a world where every scent tells your story...</p></div><div class="col-md-3"><a type="button" class="btn amerifrgbutton" data-bs-toggle="modal" data-bs-target="#analyizepopup">Here’s What’s Waiting For You…</a></div></div></div></div></div>';

            $(".after-login").append(newrow);

        },
    });
    $.ajax({
        url: "https://api.americanfragrances.com/ProductAnalytics/GetProductsFromSimilarCustomers?customerId=" + usersession + "&take=" + take + "&skip=" + skip,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {

            $(".dv_title").append("Recommended Products");
            $("#anlyproductsdv").empty();
            var count = 0;
            if (data.OrderedProducts.length == 0 || data.OrderedProducts.length == null) {
                getRecommendationsBestSeller();
            } else {
                $.each(data.OrderedProducts, function (Index, value) {
                    count = count + 1;
                    if (data.OrderedProducts.length <= 4 || Index < 4) {
                        var product_id = value.id;
                        var salePrice = parseFloat(value.price).toFixed(2);
                        var originalPrice = parseFloat(value.rate).toFixed(2);
                        var categoryname = value.categoryname;
                        var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


                        var newrowContent =
                            '<div class="col-12 col-md-4 col-lg-3"><div class="product_box  position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                            value.id +
                            '"><img class="img-fluid w-100" src="' +
                            value.display_image +
                            '" alt="..."></a><div class="product-overlay">' +
                            stockStatus +
                            '<a class="btn"  href="Productview.html?id=' +
                            value.id +
                            '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeRECh' +
                            value.id +
                            '" ></div>' +
                            '<div class="product_name_wrapper">' +
                            '<div class="product_name_container">' +
                            '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                            (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                            '</div>' +
                            '<span class="cat_icon">' +
                            (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                    '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                            '</span>' +
                            '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                            '<div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                            value.brandname +
                            '"><b><u>' +
                            value.brandname +
                            "</u></b></a></p></div></div>" +
                            '<div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' +
                            salePrice +
                            '</div><div class="org_price"><strike>$' +
                            originalPrice +
                            '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                            value.discount +
                            '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                            product_id +
                            '"></div><span class="reviews_count">&nbsp;(<span>' +
                            value.rating_count +
                            "</span>)</span></div></div></div></div>";
                        $("#anlyproductsdv").append(newrowContent);
                        if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {
                            var newrow = `
        <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
            ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
        </div>
        <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
            ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
        </div>
        <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
            ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
        </div>
        <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
            ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
        </div>
        <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
            ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
        </div>
        <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
            ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
        </div>
        <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
            ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
        </div>
        <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
            ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
        </div>
        <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
            ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
        </div>
        <div class="progress-bar bg-hundered" role="progressbar" style="width:${value.BarcodeAnalytics.Data[9]}%">
            ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
        </div>
    `;

                            $("#bestbarcodeRECh" + product_id).append(newrow);
                            $("#cat_useranly_rec" + product_id).text("AmeriFrag Barcode");
                        } else {
                            $("#bestbarcodeREC" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');
                        }

                        // ✅ FIXED: Star rating logic with proper conditions
                        var $starsContainer = $(".product_box.position-relative").find(".stars" + product_id);
                        $starsContainer.empty();

                        var rating = value.rating;
                        var ratingCount = value.rating_count;

                        if (ratingCount > 0 && rating > 0) {
                            if (rating >= 4.6 && rating <= 5) {
                                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                            } else if (rating >= 4.1 && rating < 4.6) {
                                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                            } else if (rating >= 3.6 && rating < 4.1) {
                                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                            } else if (rating >= 3.1 && rating < 3.6) {
                                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                            } else if (rating >= 2.6 && rating < 3.1) {
                                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                            } else if (rating >= 2.1 && rating < 2.6) {
                                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                            } else if (rating >= 1.6 && rating < 2.1) {
                                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                            } else if (rating >= 1.1 && rating < 1.6) {
                                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                            } else if (rating >= 0.6 && rating < 1.1) {
                                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                            } else if (rating > 0 && rating < 0.6) {
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        } else {
                            // Show 0.5 star (half star) when there are no reviews
                            $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                        }
                    }

                });
                if (count === 0) {
                    $("#anlyproductsdv").append('<center><img class="pt-5" src="Images/empty_order.png"><h6><b>" Currently, No Products are Available… "</b></h6></center>');
                }
            }
            var newrowContent =
                $(".selectpicker").change(function () {
                    var sort = $(".selectpicker").val();
                    if (sort) {
                        fetchSortProducts(data, sort);
                    }
                });
        },
        failure: function (failureresp) {
            alert(failureresp);
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "Home.html";
                return;
            }
        },
    });
    $(document).on("click", "#anlyproductsdv .cartbtn", function () {
        var prod_id = $(this).attr("data");
        cartupadtion(prod_id);
    });

    AddsBanner()
    function AddsBanner() {
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/AddsBannerList",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent =
                        '<div class="item text-center" style="background:transparent !important;">' +
                        '<img src="' +
                        value.image +
                        '" style="width:100%;height:auto;"></div>';
                    $("#promotional_adds_Banner_carousel").append(newrowContent);

                    /*$("#brands-carousel").append(newrowContent);*/



                });
                $("#promotional_adds_Banner_carousel").owlCarousel({
                    loop: true,
                    margin: 10,
                    autoplay: true,
                    autoplayHoverPause: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: false,
                            dots: false,
                        },
                        767: {
                            items: 1,
                            nav: false,
                            dots: false,
                        },
                        1000: {
                            items: 1,
                            nav: false,
                            loop: true,
                            dots: false,
                            margin: 20,
                            autoHeight: true,
                        },
                    },
                });
            }
        });
    };




    eventsBanner()
    function eventsBanner() {
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/NewsEventList",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent =
                        '<div class="item text-center" style="background:transparent !important;">' +
                        '<img src="' +
                        value.image +
                        '" style="width:100%;height:auto;"></div>';
                    $("#promotional_Banner_carousel").append(newrowContent);

                    /*$("#brands-carousel").append(newrowContent);*/



                });
                $("#promotional_Banner_carousel").owlCarousel({
                    loop: true,
                    margin: 10,
                    autoplay: true,
                    autoplayHoverPause: false,
                    responsiveClass: true,
                    dots: true, // Set globally
                    responsive: {
                        0: {
                            items: 1,
                            dots: true,
                            nav: false,
                        },
                        767: {
                            items: 1,
                            nav: false,
                        },
                        1000: {
                            items: 1,
                            nav: false,
                            loop: true,
                            dots: true,
                            margin: 20,
                            autoHeight: true,
                        },
                    },
                });
            }
        });
    };
    $.ajax({
        url: "https://api.americanfragrances.com/Subscription/GetActiveSubscriptionDetails?customerId=" + Authkey,
        type: "GET",
        dataType: "json",
        traditional: true,
        success: function (data) {
            if (data.PlanName) {
                $("#usertakeSub").text("");
                $("#usertakeSub").text(data.PlanName);

            }

        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/Home.html";
                return;
            }
        }
    });


    BundleSetProducts();
    AmerifragChoceProducts();

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("User Analytics section is visible. Loading charts...");
                // getquestions();
                // analytics();
                // occanalytics();
                // moodanalytics();
                // toneanalytics();
                // seasonanalytics();
                // smellanalytics();
                // longevity();
                // timeanalytics();
                // ageanalytics();
                // presentationanalytics();

                observer.unobserve(entry.target); // Load once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    // Start observing the AI section
    const analyticsSection = document.querySelector(".user_analytics");
    if (analyticsSection) {
        observer.observe(analyticsSection);
    }
    $("#btnclosepop").click(function () {
        localStorage.setItem("popup", "tick");
    });
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var log = params.get("login");
    if (log == "yes") {
        $("#successlogin").modal("show");
    }


    $.ajax({
        url: "https://api.americanfragrances.com/Home/Banner?project_id=" +
            Project_Id +
            "&customerId=" +
            usersession,

        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $("#unified_banners").empty();
            var classname = "";
            var length = 3;  // Assume you want to display 3 slides in total

            for (var i = 1; i <= length; i++) {
                var value = data[i - 1];  // Use data[i-1] to access the correct index in the array
                classname = i === 1 ? "carousel-item active" : "carousel-item";

                if (i === 1) {
                    var timestamp = "";
                    if (value.EventDatetime) {
                        timestamp = parseInt(value.EventDatetime.match(/\d+/)[0]);
                    }

                    var countdownId = 'countdown-timer-' + i;

                    var unifiedContent = '<div class="' + classname + '" style="background-image:url(\'Images/home/roboimageBanner2.png\'); background-size:cover; background-position:center; background-repeat:no-repeat;"><div class="d-flex align-items-center" style="height:100%">' +
                        '<div class="col-4">' +
                        '<div class="px-1 d-flex align-items-center" style="background-size:cover; background-position:center;">' +
                        '<div class="d-block bannercontent"><h4 class="modal-heading bannertitle m-0 text-center" style="font-size:32px;padding-bottom:10px !important;text-align:center"> Shop Perfumes Using <span style="color:white;"> AI</span> </h4 > ' + value.buttonabovetext +
                        '<div class="text-center leftBtn">' +
                        '<a class="btn button-text" style="padding: 8px 32px !important;" role="button" href="' + value.buttonurl + '">' + value.buttontext + '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-4 text-center">' +

                        '</div>' +
                        '<div class="col-4">' +
                        '<div class="px-1 d-flex align-items-center">' +
                        '<div class="d-block">' +
                        '<h5 class="supersale bannertitle pb-2" style="text-align:center;font-family:Sofia Pro Regular Az !important;font-size:32px">' + value.saletext + '</h5>' +
                        '<h4 class="pb-2 happymot_day" style="color:#000000 !important; font-family:Sofia Pro Regular Az!important; font-weight:600; font-size:25px; text-align:center;">' + value.leftside + '</h4>' +
                        '<p class="quotetest" style="color:#000000;text-align:left;">' + value.rightside + "  " + value.authortext + '</p><br>' +
                        '<div class="text-center">' +
                        '<button class="btnn" style="background:black; pointer-events: none !important;" id="' + countdownId + '"></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    $("#unified_banners").append(unifiedContent);

                    if (value.EventDatetime) {
                        function updateCountdown(id, endTime) {
                            return function () {
                                var currentDate = new Date();
                                var differenceInMilliseconds = endTime - currentDate.getTime();

                                if (differenceInMilliseconds <= 0) {
                                    $("#" + id).hide();
                                    return;
                                }

                                var days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                                var hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                var minutes = Math.floor((differenceInMilliseconds % (1000 * 60)) / (1000 * 60));
                                var seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

                                days = days < 10 ? "0" + days : days;
                                hours = hours < 10 ? "0" + hours : hours;
                                minutes = minutes < 10 ? "0" + minutes : minutes;
                                seconds = seconds < 10 ? "0" + seconds : seconds;

                                var timeDifference = days + " D : " + hours + " H : " + minutes + " M : " + seconds + " S";

                                $("#" + id).text(timeDifference);
                            };
                        }

                        setInterval(updateCountdown(countdownId, timestamp), 1000);
                    }

                } else if (i === 2) {
                    if (usersession) {
                        var staticImageContent2 = '<div class="' + classname + '" style="text-center; background-image:url(\'Images/home/menBannerhome.png\'); background-size:cover; background-position:center; background-repeat:no-repeat;">' +
                            '<div class="row text-center" style="margin:0px;" >' +
                            '<div class="col-6"></div>' +
                            '<div class="col-6 d-flex flex-row justify-content-end align-items-start" style="margin:0px !important;padding:0px !important;" id="bannerImgContainer"><img src="Images/home/afterLoginMen2.png" style="width:100%;"  /></div > ' +
                            '</div>' +
                            '</div>';
                    } else {
                        var staticImageContent2 = '<div class="' + classname + '" style="text-center; background-image:url(\'Images/home/menBannerhome.png\'); background-size:cover; background-position:center; background-repeat:no-repeat;padding-right:0px !important">' +
                            '<div class="row text-center" style="margin:0px !important" >' +
                            '<div class="col-6"></div>' +
                            '<div class="col-6 d-flex flex-row justify-content-end align-items-start" style="margin:0px !important;padding:0px !important;" id="bannerImgContainer"><img src="Images/home/beforeLoginMen.png" style="width:100%;"  /></div > ' +
                            '</div>' +
                            '</div>';
                    }


                    $("#unified_banners").append(staticImageContent2);



                } else if (i === 3) {

                    if (usersession) {
                        var staticImageContent3 = '<div class="' + classname + '" style="text-center; background-image:url(\'Images/home/womenBannerHome.png\'); background-size:cover; background-position:center; background-repeat:no-repeat;">' +
                            '<div class="row text-center" style="margin:0px;" >' +
                            '<div class="col-6 d-flex flex-row justify-content-end align-items-start" style="margin:0px !important;padding:0px !important;" id="bannerImgContainer"><img src="Images/home/afterLoginWomen.png" style="width:100%;"  /></div > ' +
                            '<div class="col-6"></div>' +
                            '</div>' +
                            '</div>';
                    } else {
                        var staticImageContent3 = '<div class="' + classname + '" style="text-center;background-image:url(\'Images/home/womenBannerHome.png\'); background-size:cover; background-position:center;  background-repeat:no-repeat;">' +
                            '<div class="row text-center" style="margin:0px;" >' +
                            '<div class="col-6 d-flex flex-row justify-content-end align-items-start" style="margin:0px !important;padding:0px !important;" id="bannerImgContainer"><img src="Images/home/beforeLoginWomen.png" style="width:100%;"  /></div > ' +
                            '<div class="col-6"></div>' +
                            '</div>' +
                            '</div>';
                    }


                    $("#unified_banners").append(staticImageContent3);

                }
            }
        }

    });



    $(".sliderss").click(function () {
        var catname = $(this).text();
        var categoryname = $.trim(catname);
        window.location.href = "show-all.html?cat=" + categoryname;
    });
    $(".customer-logos").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        dots: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    });

    $.ajax({
        url:
            "https://api.americanfragrances.com/Home/Categorylist?project_id=" +
            Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $.each(data, function (Index, value) {
                var newrowContent = '<img src="' + value.image + '">';
                $("#Categorynames").append(newrowContent);
            });
        },
    });


    function getquestions() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/FilterQuestionlist?project_id=" +
                Project_Id,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var newrowContent =
                        '<div class="row py-2"><div class="col-md-6"><label class="form-label" for="qun1"><li>' +
                        value.question +
                        '</li></label></div><div class="col-md-6"><select class="modal-select"><option value="option1' +
                        value.id +
                        '" id="option1' +
                        value.id +
                        '">' +
                        value.option1 +
                        '</option><option value="option2' +
                        value.id +
                        '" id="option2' +
                        value.id +
                        '">' +
                        value.option2 +
                        '</option><option value="option3' +
                        value.id +
                        '" id="option3' +
                        value.id +
                        '">' +
                        value.option3 +
                        '</option><option value="option4' +
                        value.id +
                        '" id="option4' +
                        value.id +
                        '">' +
                        value.option4 +
                        "</option></select></div></div>";
                    $("#useranalytics").append(newrowContent);
                });
            },
        });
    }
    getNoteproducts()
    function getNoteproducts() {

        $.ajax({
            url: "https://api.americanfragrances.com/Home/GetNoteMatchedProductDetails?customerId=" + usersession + "&take=" + 50 + "&skip=" + skip,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#NoteProducts-curosel").empty();
                $("#emptyNoteProducts").empty();
                $("#selectedOptionNote").text(data.customernote);

                i = 0;

                var customerGender = data.gender === "Male" ? "Men" : (data.gender === "Female" ? "Women" : "Other");


                $.each(data.MatchedProducts, function (Index, value) {
                    if (value.BarcodeAnalytics.Labels[1] == data.customernote && (
                        (value.categoryname === 'Unisex' && (customerGender === 'Men' || customerGender === 'Women')) ||
                        customerGender === value.categoryname
                    )) {

                        var product_id = value.id;
                        var salePrice = parseFloat(value.price).toFixed(2);
                        var originalPrice = parseFloat(value.rate).toFixed(2);
                        var categoryname = value.categoryname;
                        var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';



                        i = i + 1;
                        if (i < 5) {
                            var newrowContent =
                                '<div class="col-12 col-md-12 col-lg-12"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                                value.id +
                                '"><img class="img-fluid w-100" src="' +
                                value.display_image +
                                '" alt="..."></a><div class="product-overlay">' +
                                stockStatus +
                                '<a class="btn"  href="Productview.html?id=' +
                                value.id +
                                '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_women' + product_id + '"></p><div class="barcode progress" id="barcode' +
                                value.id +
                                '" ></div>' +
                                '<div class="product_name_wrapper">' +
                                '<div class="product_name_container">' +
                                '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                                (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                                '</div>' +
                                '<span class="cat_icon">' +
                                (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                    categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                        '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                                '</span>' +
                                '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                                '<div class="row align-items-center" > <div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                                value.BrandName +
                                '"><b><u>' +
                                value.BrandName +
                                "</u></b></a></p></div></div>" +
                                '<div class="col-12 d-flex justify-content-center"><div class="sale_price">$' +
                                salePrice +
                                '</div><div class="org_price"><strike>$' +
                                originalPrice +
                                '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                                value.discount +
                                '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                                product_id +
                                '"></div><span class="reviews_count">&nbsp;(<span>' +
                                value.rating_count +
                                "</span>)</span></div></div></div></div>";




                            $("#NoteProducts-curosel").append(newrowContent);
                            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {


                                var newrow =
                                    `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;

                                $("#NoteProducts-curosel #barcode" + product_id).append(newrow);
                                $("#NoteProducts-curosel #cat_useranly_women" + product_id).text("AmeriFrag Barcode");

                            }

                            var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                            $starsContainer.empty();

                            var rating = value.rating;
                            var ratingCount = value.rating_count;

                            if (ratingCount > 0 && rating > 0) {
                                if (rating >= 4.6 && rating <= 5) {
                                    $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                } else if (rating >= 4.1 && rating < 4.6) {
                                    $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                } else if (rating >= 3.6 && rating < 4.1) {
                                    $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                } else if (rating >= 3.1 && rating < 3.6) {
                                    $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                } else if (rating >= 2.6 && rating < 3.1) {
                                    $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                } else if (rating >= 2.1 && rating < 2.6) {
                                    $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                } else if (rating >= 1.6 && rating < 2.1) {
                                    $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                } else if (rating >= 1.1 && rating < 1.6) {
                                    $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                } else if (rating >= 0.6 && rating < 1.1) {
                                    $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                } else if (rating > 0 && rating < 0.6) {
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                }
                            } else {
                                // Show 0.5 star (half star) when there are no reviews
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        }

                    }
                });
                if (i === 0) {
                    $("#emptyNoteProducts").append('<center><img class="pt-5" src="Images/empty_order.png"><h6><b>" Currently, No Products are Available… "</b></h6></center>');
                }
                $("#NoteProducts-curosel").owlCarousel({
                    loop: true,
                    margin: 10,
                    autoplay: true,
                    autoplayHoverPause: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: true,
                        },
                        767: {
                            items: 2,
                            nav: true,
                        },
                        1000: {
                            items: 3,
                            nav: true,
                            loop: true,
                            dots: false,
                            margin: 20,

                        },
                    },
                });
            },
        });
    }

    function AmerifragChoceProducts() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/FeatureProductsAmerifragChoice?customerId=" +
                usersession +
                "&take=" +
                3 +
                "&skip=" +
                0,
            type: "POST",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                i = 0;
                $(".Product_select_quantity").empty();
                $.each(data.SortedProducts, function (Index, value) {
                    var product_id = value.id;
                    var salePrice = parseFloat(value.price).toFixed(2);
                    var originalPrice = parseFloat(value.rate).toFixed(2);
                    var categoryname = value.categoryname;
                    var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                    i = i + 1;
                    if (i < 5) {
                        var newrowContent =
                            '<div class="col-12 col-md-6 col-lg-4"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                            value.id +
                            '"><img class="img-fluid w-100" src="' +
                            value.display_image +
                            '" alt="..."></a><div class="product-overlay">' +
                            stockStatus +
                            '<a class="btn"  href="Productview.html?id=' +
                            value.id +
                            '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_women1' + product_id + '"></p><div class="barcode progress" id="barcode' +
                            value.id +
                            '" ></div>' + '<div class="product_name_wrapper">' +
                            '<div class="product_name_container">' +
                            '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                            (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                            '</div>' +
                            '<span class="cat_icon">' +
                            (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                    '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                            '</span>' +
                            '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                            '<div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                            value.brandname +
                            '"><b><u>' +
                            value.brandname +
                            "</u></b></a></p></div></div>" +
                            '<div class="col-12 d-flex justify-content-center"><div class="sale_price">$' +
                            salePrice +
                            '</div><div class="org_price"><strike>$' +
                            originalPrice +
                            '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                            value.discount +
                            '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                            product_id +
                            '"></div><span class="reviews_count">&nbsp;(<span>' +
                            value.rating_count +
                            "</span>)</span></div></div></div></div>";

                        $("#womendv").append(newrowContent);

                        if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                            var newrow =
                                `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                            $("#barcode" + product_id).append(newrow);
                            $("#cat_useranly_women1" + product_id).text("AmeriFrag Barcode");
                        }

                        var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                        $starsContainer.empty();

                        var rating = value.rating;
                        var ratingCount = value.rating_count;

                        if (ratingCount > 0 && rating > 0) {
                            if (rating >= 4.6 && rating <= 5) {
                                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                            } else if (rating >= 4.1 && rating < 4.6) {
                                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                            } else if (rating >= 3.6 && rating < 4.1) {
                                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                            } else if (rating >= 3.1 && rating < 3.6) {
                                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                            } else if (rating >= 2.6 && rating < 3.1) {
                                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                            } else if (rating >= 2.1 && rating < 2.6) {
                                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                            } else if (rating >= 1.6 && rating < 2.1) {
                                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                            } else if (rating >= 1.1 && rating < 1.6) {
                                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                            } else if (rating >= 0.6 && rating < 1.1) {
                                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                            } else if (rating > 0 && rating < 0.6) {
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        } else {
                            // Show 0.5 star (half star) when there are no reviews
                            $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                        }
                    }


                });
            },
        });
    }


    function BundleSetProducts() {
        /*   var catnamw = $("#catnames").val();*/
        var take = 2;
        var skip = 0;
        var Sub_Category = "BUNDLE SETS";
        $.ajax({

            url: "https://api.americanfragrances.com/Home/FilterProducts?customerId=" + Authkey + "&Take=" + take + "&skip=" + skip + "&subcategory=" + Sub_Category,
            type: "POST",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                i = 0;
                $(".Product_select_quantity").empty();
                $.each(data.Products, function (Index, value) {
                    var product_id = value.id;
                    var salePrice = parseFloat(value.price).toFixed(2);
                    var originalPrice = parseFloat(value.rate).toFixed(2);
                    var categoryname = value.categoryname;
                    var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


                    i = i + 1;
                    if (i <= 2) {
                        var newrowContent =
                            '<div class="col-12 col-md-6 col-lg-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                            value.id +
                            '"><img class="img-fluid w-100" src="' +
                            value.display_image +
                            '" alt="..."></a><div class="product-overlay">' +
                            stockStatus +
                            '<a class="btn"  href="Productview.html?id=' +
                            value.id +
                            '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + product_id + '"></p><div class="barcode progress" id="barcode' +
                            value.id +
                            '" ></div>' +
                            '<div class="product_name_wrapper">' +
                            '<div class="product_name_container">' +
                            '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                            (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                            '</div>' +
                            '<span class="cat_icon">' +
                            (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                    '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                            '</span>' +
                            '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                            '<div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                            value.brandname +
                            '"><b><u>' +
                            value.brandname +
                            "</u></b></a></p></div></div>" +
                            '</p><div class="col-12 d-flex justify-content-center"><div class="sale_price">$' +
                            salePrice +
                            '</div><div class="org_price"><strike>$' +
                            originalPrice +
                            '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                            value.discount +
                            '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                            product_id +
                            '"></div><span class="reviews_count">&nbsp;(<span>' +
                            value.rating_count +
                            "</span>)</span></div></div></div></div>";


                        $("#mendv").append(newrowContent);
                        if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {



                            var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                            $("#mendv #barcode" + product_id).append(newrow);
                            $("#mendv #cat_useranly" + product_id).text("AmeriFrag Barcode");
                        }
                        else {

                            $("#mendv #barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                        }

                        var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                        $starsContainer.empty();

                        var rating = value.rating;
                        var ratingCount = value.rating_count;

                        if (ratingCount > 0 && rating > 0) {
                            if (rating >= 4.6 && rating <= 5) {
                                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                            } else if (rating >= 4.1 && rating < 4.6) {
                                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                            } else if (rating >= 3.6 && rating < 4.1) {
                                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                            } else if (rating >= 3.1 && rating < 3.6) {
                                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                            } else if (rating >= 2.6 && rating < 3.1) {
                                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                            } else if (rating >= 2.1 && rating < 2.6) {
                                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                            } else if (rating >= 1.6 && rating < 2.1) {
                                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                            } else if (rating >= 1.1 && rating < 1.6) {
                                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                            } else if (rating >= 0.6 && rating < 1.1) {
                                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                            } else if (rating > 0 && rating < 0.6) {
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        } else {
                            // Show 0.5 star (half star) when there are no reviews
                            $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                        }
                    }
                });
            },
        });
    }


    function cart_count(cartid) {

        if (cartid) {
            $.ajax({
                url:
                    "https://api.americanfragrances.com/Cart/Cartcount?project_id=" +
                    Project_Id +
                    "&cart_id=" +
                    cartid,
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                success: function (data) {
                    $(".cart_count").html(data);
                },
            });
        }
    }
    var area = localStorage.getItem("Area");
    if (area != null) {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Vendorlistarea?project_id=" +
                Project_Id +
                "&area=" +
                area,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#SLselectArea option:selected").text(area);
                i = 0;
                $.each(data, function (Index, value) {
                    var newrowContent =
                        '<div class="col-md-3 col-6"><div class="img-card-radious"><div class="VendorImage"><a href="show-all.html?vendor=' +
                        value.id +
                        '" style="color:#000000"><img src="' +
                        value.image +
                        '" width="100%" /></div><p class="item-title" style="color:#000000">' +
                        value.display_name +
                        '</p><p class="item-place" style="color:#000000">' +
                        value.area +
                        "</p></a></div></div>";
                    $("#VendorList").append(newrowContent);
                });
            },
        });
    } else {
        $("#locationpopup").modal("show");
        var newrowContent =
            '<div class="col-md-12 text-center">"Sorry no shops are available in your area ! try different area"</div>';
        $("#VendorList").append(newrowContent);
    }

    $(".banners-logos").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        arrows: true,
        dots: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
    $.ajax({
        url:
            "https://api.americanfragrances.com/Home/PremiumBrandlist_Caurosal?project_id=" +
            Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {

            $.each(data, function (Index, value) {
                if (value.ispremium === true) {
                    var newrowContent =
                        '<div class="item text-center" style="background:transparent !important; width:100%; height:100%; overflow:hidden;">' +
                        '<a href="show-all.html?brand=' +
                        (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) +
                        '"><img src="' +
                        value.logo +
                        '" style="width:100%; height:100%; object-fit:cover; display:block;"></a></div>';

                    $("#brands-carousel").append(newrowContent);
                }
            });

            $("#brands-carousel").owlCarousel({
                loop: true,
                autoplay: true,
                autoplayHoverPause: false,
                responsiveClass: true,
                dots: true, // Set globally
                nav: false, // Set globally
                responsive: {
                    0: {
                        items: 1,
                        margin: 25,
                    },
                    767: {
                        items: 2,
                        margin: 25,
                    },
                    1000: {
                        items: 6,
                        margin: 25,
                    },
                },
            });
        },

    });
    $.ajax({
        url:
            "https://api.americanfragrances.com/Home/Categorylist?project_id=" +
            Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $("#dvcat_blog").empty();
            $.each(data, function (Index, value) {
                var newrowContent =
                    '<a class="dropdown-item" href="show-all.html?cat=' +
                    (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) +
                    '">' +
                    (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) +
                    "</a>";
                $("#navbarDropdown-menu").append(newrowContent);
            });
        },
    });
    $(".regular").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
    $("#SLselectArea").change(function () {
        var vendorlocation = $("#SLselectArea option:selected").text();
        localStorage.setItem("Area", vendorlocation);
        location.reload();
    });
    $("#btnproceedloc").click(function () {
        var vendorlocation = $("#SLselectAreapop option:selected").text();
        localStorage.setItem("Area", vendorlocation);
        $("#locationpopup").modal("hide");
        location.reload();
    });
    $.ajax({
        url:
            "https://api.americanfragrances.com/Home/TestimonialList?project_id=" +
            Project_Id +
            "&authorid=" +
            usersession,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {

            $.each(data, function (Index, value) {
                var newrowContent =
                    '<div class="item"><div class="card testim_box"><img src="images/home/testim/quote.png" class="quote"><p class="testimonialcontent">' +
                    value.Content +
                    '</p><div class="d-flex flex-row justify-content-end"><img src="images/home/testim/quote.png" class="quoteImg quote"></div><div class="card-footer"><div class="row"><div class="col-4 p-0"><img src="' +
                    value.Image +
                    '" class="img-fluid"></div><div class="col-8"><p class="user_name">' +
                    (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) +
                    '</p><p class="user_designation">' +
                    value.Designation +
                    '</p></div></div></div></div></div>';

                $("#testimonial-carousel").append(newrowContent);
            });
            $("#testimonial-carousel").owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayHoverPause: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true,
                    },
                    767: {
                        items: 2,
                        nav: false,
                    },
                    1000: {
                        items: 3,
                        nav: true,
                        loop: true,
                    },
                },
            });
        },
    });





    $("#Amerifrag_Studio_carousel").owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            767: {
                items: 2,
                nav: false,
            },
            1000: {
                items: 3,
                nav: true,
                loop: true,
            },
        },
    });





    $(function () {
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 50) {
                $(".header").addClass("active");
            } else {
                $(".header").removeClass("active");
            }
        });
    });

    getbestsellers()

    function getbestsellers() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Product/BestSeller?customerId=" + usersession + "&take=" + take + "&skip=" + skip,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                if (data.Data.length == 0) {
                    $("#bestseller_carosel").append('<center><img src="Images/empty_order.png"><h6><b>" Currently, No Products are Available… "</b></h6></center>');
                }
                else {



                    $("#bestseller_carosel").empty();
                    i = 0;
                    $.each(data.Data, function (index, value) {
                        i = i + 1;
                        if (index < 8) {
                            const screenWidth = window.innerWidth;
                            if ((screenWidth <= 767 && index < 4) ||
                                (screenWidth > 767 && (data.length >= 8 || index < 8))) {
                                var product_id = value.id;
                                var salePrice = parseFloat(value.price).toFixed(2);
                                var originalPrice = parseFloat(value.rate).toFixed(2);
                                var categoryname = value.categoryname;
                                var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                                var newrowContent =
                                    '<div class="col-12 col-md-4 col-lg-3"><div class="product_box  position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                                    value.id +
                                    '"><img class="img-fluid w-100" src="' +
                                    value.display_image +
                                    '" alt="..."></a><div class="product-overlay">' +
                                    stockStatus
                                '<a class="btn"  href="Productview.html?id=' +
                                    value.id +
                                    '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + product_id + '"> </p><div class="barcode progress" id="bestbarcode' +
                                    value.id +
                                    '" ></div>' +
                                    '<div class="product_name_wrapper">' +
                                    '<div class="product_name_container">' +
                                    '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                                    (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                                    '</div>' +
                                    '<span class="cat_icon">' +
                                    (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                        categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                            '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                                    '</span>' +
                                    '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                                    '<div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                                    value.BrandName +
                                    '"><b><u>' +
                                    value.BrandName +
                                    "</u></b></a></p></div></div>" +
                                    '<div class="col-12 d-flex justify-content-center"><div class="sale_price">$' +
                                    salePrice +
                                    '</div><div class="org_price"><strike>$' +
                                    originalPrice +
                                    '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                                    value.discount +
                                    '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                                    product_id +
                                    '"></div><span class="reviews_count">&nbsp;(<span>' +
                                    value.rating_count +
                                    "</span>)</span></div></div></div></div>";
                                $("#bestseller_carosel").append(newrowContent);
                                if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                                    var newrow =
                                        `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;

                                    $("#bestbarcode" + product_id).append(newrow);
                                    $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
                                } else {
                                    $("#bestbarcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                }

                                var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                                $starsContainer.empty();

                                var rating = value.rating;
                                var ratingCount = value.rating_count;

                                if (ratingCount > 0 && rating > 0) {
                                    if (rating >= 4.6 && rating <= 5) {
                                        $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                    } else if (rating >= 4.1 && rating < 4.6) {
                                        $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                    } else if (rating >= 3.6 && rating < 4.1) {
                                        $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                    } else if (rating >= 3.1 && rating < 3.6) {
                                        $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                    } else if (rating >= 2.6 && rating < 3.1) {
                                        $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                    } else if (rating >= 2.1 && rating < 2.6) {
                                        $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                    } else if (rating >= 1.6 && rating < 2.1) {
                                        $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                    } else if (rating >= 1.1 && rating < 1.6) {
                                        $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                    } else if (rating >= 0.6 && rating < 1.1) {
                                        $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                    } else if (rating > 0 && rating < 0.6) {
                                        $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                    }
                                } else {
                                    // Show 0.5 star (half star) when there are no reviews
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                }

                            }
                        }
                    });
                }
            },
        });

    }



    var IntialrunningPrice = 1;
    if (IntialrunningPrice) {
        (async function () {
            var parent = document.querySelector(".range-slider");
            if (!parent) return;

            var rangeS = parent.querySelectorAll("input[type=range]"),
                numberS = parent.querySelectorAll("input[type=number]");

            rangeS.forEach(function (el) {
                el.oninput = function () {
                    var slide1 = parseFloat(rangeS[0].value),
                        slide2 = parseFloat(rangeS[1].value);

                    if (slide1 > slide2) {
                        [slide1, slide2] = [slide2, slide1];

                    }

                    numberS[0].value = slide1;
                    numberS[1].value = slide2;
                    if (IntialrunningPrice >= 2) {
                        minPrice = slide1;
                        maxPrice = slide2;

                        localStorage.setItem('priceDiscountData', JSON.stringify({
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                            minDiscount: minDiscount,
                            maxDiscount: maxDiscount
                        }));

                    }
                };
            });

            numberS.forEach(function (el) {
                el.oninput = function () {
                    var number1 = parseFloat(numberS[0].value),
                        number2 = parseFloat(numberS[1].value);

                    if (number1 > number2) {
                        var tmp = number1;
                        numberS[0].value = number2;
                        numberS[1].value = tmp;
                    }

                    rangeS[0].value = number1;
                    rangeS[1].value = number2;
                };
            });



        })();

        IntialrunningPrice += 1;

    };


    $("#rangeSliderRedirection").click(function () {
        redirectUser();
    });

    $(".resetPersValues").click(function () {
        var rangeS2 = document.querySelectorAll(".range-slider2 input[type=range]");
        var numberS2 = document.querySelectorAll(".range-slider2 input[type=number]");

        var initialMinPercentage = 0;
        var initialMaxPercentage = 100;

        rangeS2[0].value = initialMinPercentage;
        rangeS2[1].value = initialMaxPercentage;
        numberS2[0].value = initialMinPercentage;
        numberS2[1].value = initialMaxPercentage;

        localStorage.removeItem('priceDiscountData');
    });

    $(".resetPriceValues").click(function () {
        var rangeS = document.querySelectorAll(".range-slider input[type=range]");
        var numberS = document.querySelectorAll(".range-slider input[type=number]");

        var initialMinValue = 0;
        var initialMaxValue = 1000;

        rangeS[0].value = initialMinValue;
        rangeS[1].value = initialMaxValue;
        numberS[0].value = initialMinValue;
        numberS[1].value = initialMaxValue;

        localStorage.removeItem('priceDiscountData');
    });
    function resetprice() {
        var rangeS = document.querySelectorAll(".range-slider input[type=range]");
        var numberS = document.querySelectorAll(".range-slider input[type=number]");

        var initialMinValue = 0;
        var initialMaxValue = 1000;

        rangeS[0].value = initialMinValue;
        rangeS[1].value = initialMaxValue;
        numberS[0].value = initialMinValue;
        numberS[1].value = initialMaxValue;

    }

    var Intialrunningsale = 1;
    if (Intialrunningsale) {
        (function () {
            var parent = document.querySelector(".range-slider2");
            if (!parent) return;

            var rangeS2 = parent.querySelectorAll("input[type=range]");
            var numberS2 = parent.querySelectorAll("input[type=number]");

            rangeS2.forEach(function (el) {
                el.oninput = function () {
                    var slide1 = parseFloat(rangeS2[0].value);
                    var slide2 = parseFloat(rangeS2[1].value);

                    if (slide1 > slide2) {
                        [slide1, slide2] = [slide2, slide1];
                    }

                    numberS2[0].value = slide1;
                    numberS2[1].value = slide2;

                    if (Intialrunningsale >= 2) {
                        localStorage.setItem('priceDiscountData', JSON.stringify({
                            minPrice: parseFloat(document.querySelector(".range-slider input[type=range]:nth-child(1)").value),
                            maxPrice: parseFloat(document.querySelector(".range-slider input[type=range]:nth-child(2)").value),
                            minDiscount: slide1,
                            maxDiscount: slide2
                        }));
                    }
                };
            });

            numberS2.forEach(function (el) {
                el.oninput = function () {
                    var number1 = parseFloat(numberS2[0].value);
                    var number2 = parseFloat(numberS2[1].value);

                    if (number1 > number2) {
                        [number1, number2] = [number2, number1];
                    }

                    rangeS2[0].value = number1;
                    rangeS2[1].value = number2;
                };
            });
        })();

        Intialrunningsale += 1;
    }


    function redirectUser() {
        var rangeS = document.querySelectorAll(".range-slider input[type=range]");
        var minPrice = rangeS[0] ? parseFloat(rangeS[0].value) : 0;
        var maxPrice = rangeS[1] ? parseFloat(rangeS[1].value) : 1000;

        var rangeS2 = document.querySelectorAll(".range-slider2 input[type=range]");
        var minDiscount = rangeS2[0] ? parseFloat(rangeS2[0].value) : 0;
        var maxDiscount = rangeS2[1] ? parseFloat(rangeS2[1].value) : 100;

        var url = `/show-all.html?sub_cat=FRAGRANCES&selectedProducts=rangeProducts` +
            `&minPrice=${minPrice}&maxPrice=${maxPrice}` +
            `&minDiscount=${minDiscount}&maxDiscount=${maxDiscount}`;
        resetprice()
        window.location.href = url;
    }


    if (typeof usersession === 'undefined' || usersession == null || usersession == "") {
        $("#loginpopup").modal("show");
    }

    // =======================
    // UNIVERSAL ANALYTICS FUNCTION
    // =======================
    function renderAnalyticsChart({
        canvasId,
        questionId,
        labelHeading,
        colors
    }) {
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            async: true,
            success: function (response) {
                if (!response || response.length === 0) return;

                var ctx = document.getElementById(canvasId);
                if (!ctx) {
                    console.error(`Canvas element '${canvasId}' not found`);
                    return;
                }

                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Default equal data

                var myChart = new Chart(ctx.getContext("2d"), {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: colors,
                                borderWidth: 0
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: { display: false },
                            labels: {
                                render: (args) => {
                                    // Optionally wrap long labels
                                    const label = args.label || "";
                                    if (label.length > 12) {
                                        return label.replace(" ", "\n");
                                    }
                                    return label;
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                                textMargin: 6,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            evt.chart.canvas.style.cursor = activeEls.length ? "pointer" : "default";
                        },
                        onClick: function (e) {
                            var segment = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            )[0];

                            if (segment) {
                                var label = myChart.data.labels[segment.index];
                                window.location.href =
                                    "show-all.html?label=" +
                                    encodeURIComponent(label) +
                                    "&labelHeading=" +
                                    encodeURIComponent(labelHeading);
                            }
                        },
                    },
                });
            },
            error: function (xhr, status, error) {
                console.error(`Error loading analytics for ${canvasId}:`, error);
            },
        });
    }

    // =======================
    // INDIVIDUAL CHART CALLS
    // =======================

    // 1️⃣ STYLE
    renderAnalyticsChart({
        canvasId: "stylepie",
        questionId: "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339",
        labelHeading: "STYLE",
        colors: ["#330000", "#550000", "#770000", "#990000", "#BB0000", "#DD0000", "#FF0000", "#FF2222", "#FF4444", "#FF6666"]
    });

    // 2️⃣ OCCASION
    renderAnalyticsChart({
        canvasId: "occassionpie",
        questionId: "d84ee43f-6f45-4025-8755-fa04ea76667d",
        labelHeading: "OCCASION",
        colors: ["#4B5D26", "#416A2C", "#377736", "#2D843B", "#239142", "#199F48", "#0FAE4D", "#05BC53", "#00CA59", "#00D864"]
    });

    // 3️⃣ MOOD
    renderAnalyticsChart({
        canvasId: "moodpie",
        questionId: "c8f8dc67-b98b-436c-b74b-b21399bebc5c",
        labelHeading: "MOOD",
        colors: ["#FFC800", "#FFD400", "#FFDD00", "#FFE62C", "#FFE956", "#FFEC80", "#FFF28C", "#FFF695", "#FFFC9F", "#FFFFA8"]
    });

    // 4️⃣ NOTE / TONE
    renderAnalyticsChart({
        canvasId: "tonepie",
        questionId: "27059952-4128-4b44-be81-ea158ed8eb92",
        labelHeading: "NOTE",
        colors: ["#24408C", "#2B4D98", "#315AA3", "#3767AF", "#3E74BB", "#4471C6", "#4A7FD2", "#508CDE", "#5699E9", "#5CA7F5"]
    });

    // 5️⃣ SEASON
    renderAnalyticsChart({
        canvasId: "seasonpie",
        questionId: "cb6924f2-a52e-43f8-8c0b-492234c4345e",
        labelHeading: "SEASON",
        colors: ["#FF0066", "#FF1474", "#FF2880", "#FF3C8C", "#FF50A3", "#FF64AF", "#FF78BB", "#FF8CC7", "#FFA0D3", "#FFB4DF"]
    });

    // 6️⃣ SMELL INTENSITY
    renderAnalyticsChart({
        canvasId: "smellpie",
        questionId: "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4",
        labelHeading: "SMELL INTENSITY",
        colors: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999"]
    });

    // 7️⃣ LONGEVITY
    renderAnalyticsChart({
        canvasId: "longevitypie",
        questionId: "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae",
        labelHeading: "LONGEVITY",
        colors: ["#190B0B", "#251210", "#321716", "#3E1D1C", "#4B2422", "#582B28", "#64312E", "#713835", "#7E3F3B", "#8B4641"]
    });

    // 8️⃣ SPRAY TIME
    renderAnalyticsChart({
        canvasId: "timepie",
        questionId: "6239cda0-e527-4e32-be3b-be94f9447067",
        labelHeading: "SPRAY TIME",
        colors: ["#ff3300", "#ff4500", "#ff5722", "#ff6b3e", "#ff7f50", "#ff9363", "#ffaa77", "#ffc18b", "#ffd7a0", "#ffeaaf"]
    });

    // 9️⃣ AGE
    renderAnalyticsChart({
        canvasId: "agepie",
        questionId: "214c962f-7ee6-4158-bc0b-a4c8059a6cc2",
        labelHeading: "AGE",
        colors: ["#006666", "#007373", "#008080", "#008B8B", "#009898", "#00A5A5", "#00B2B2", "#00BFBF", "#00CCCC", "#00D9D9"]
    });

    // 🔟 PRESENTATION
    renderAnalyticsChart({
        canvasId: "presentationpie",
        questionId: "e64bd14d-cfac-490c-b80a-fe7329029bf8",
        labelHeading: "PRESENTATION",
        colors: ["#703470", "#7D417D", "#8A498A", "#975297", "#A35BA3", "#B068B0", "#BD70BD", "#CA79CA", "#D682D6", "#E28AE2"]
    });

    //function analytics() {
    //    var questionId = "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339"; // Replace with the question ID you want to retrieve options for

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("stylepie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#330000",
    //                                "#550000",
    //                                "#770000",
    //                                "#990000",
    //                                "#BB0000",
    //                                "#DD0000",
    //                                "#FF0000",
    //                                "#FF2222",
    //                                "#FF4444",
    //                                "#FF6666",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=STYLE"
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function occanalytics() {
    //    /*var questionId = "27059952-4128-4b44-be81-ea158ed8eb92"; */// Replace with the question ID you want to retrieve options for
    //    var questionId = "d84ee43f-6f45-4025-8755-fa04ea76667d";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("occassionpie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#4B5D26",
    //                                "#416A2C",
    //                                "#377736",
    //                                "#2D843B",
    //                                "#239142",
    //                                "#199F48",
    //                                "#0FAE4D",
    //                                "#05BC53",
    //                                "#00CA59",
    //                                "#00D864",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        // labels: {
    //                        //     render: function (optionLabels) {
    //                        //         return optionLabels.label;
    //                        //     },
    //                        //     fontColor: "white",
    //                        //     display: true,
    //                        //     position: "border",
    //                        //     fontSize: 8,
    //                        //     arc: false,
    //                        //     textMargin: 4,
    //                        //     overlap: true,
    //                        // },

    //                        labels: {
    //                               render: function (args) {
    //                               // Wrap long text or abbreviate
    //                               const label = args.label;
    //                               if (label === "Family Gathering") {
    //                                   return "Family\nGathering";
    //                                }
    //                                   return label;
    //                                },
    //                                fontColor: "white",
    //                                display: true,
    //                                position: "border",
    //                                fontSize: 8,
    //                                arc: false,
    //                                textMargin: 6,
    //                                overlap: true,
    //                                textWrap: true
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=OCCASION";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, err1or) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function moodanalytics() {
    //    var questionId = "c8f8dc67-b98b-436c-b74b-b21399bebc5c"; // Replace with the question ID you want to retrieve options for

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("moodpie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#FFC800",
    //                                "#FFD400",
    //                                "#FFDD00",
    //                                "#FFE62C",
    //                                "#FFE956",
    //                                "#FFEC80",
    //                                "#FFF28C",
    //                                "#FFF695",
    //                                "#FFFC9F",
    //                                "#FFFFA8",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,

    //                            maxWidth: 80,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=MOOD";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function toneanalytics() {
    //    var questionId = "27059952-4128-4b44-be81-ea158ed8eb92";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("tonepie").getContext("2d");

    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#24408C",
    //                                "#2B4D98",
    //                                "#315AA3",
    //                                "#3767AF",
    //                                "#3E74BB",
    //                                "#4471C6",
    //                                "#4A7FD2",
    //                                "#508CDE",
    //                                "#5699E9",
    //                                "#5CA7F5",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=NOTE";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function seasonanalytics() {
    //    /* var questionId = "d84ee43f-6f45-4025-8755-fa04ea76667d";*/ // Replace with the question ID you want to retrieve options for
    //    var questionId = "cb6924f2-a52e-43f8-8c0b-492234c4345e";
    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("seasonpie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#FF0066",
    //                                "#FF1474",
    //                                "#FF2880",
    //                                "#FF3C8C",
    //                                "#FF50A3",
    //                                "#FF64AF",
    //                                "#FF78BB",
    //                                "#FF8CC7",
    //                                "#FFA0D3",
    //                                "#FFB4DF",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=SEASON";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function smellanalytics() {
    //    /*var questionId = "214c962f-7ee6-4158-bc0b-a4c8059a6cc2";*/ // Replace with the question ID you want to retrieve options for
    //    var questionId = "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("smellpie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#000000",
    //                                "#111111",
    //                                "#222222",
    //                                "#333333",
    //                                "#444444",
    //                                "#555555",
    //                                "#666666",
    //                                "#777777",
    //                                "#888888",
    //                                "#999999",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=SMELL INTENSITY";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function longevity() {
    //    /*var questionId = "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4";*/ // Replace with the question ID you want to retrieve options for
    //    var questionId = "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("longevitypie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#190B0B",
    //                                "#251210",
    //                                "#321716",
    //                                "#3E1D1C",
    //                                "#4B2422",
    //                                "#582B28",
    //                                "#64312E",
    //                                "#713835",
    //                                "#7E3F3B",
    //                                "#8B4641",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=LONGEVITY";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function timeanalytics() {
    //    /*var questionId = "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae";*/ // Replace with the question ID you want to retrieve options for
    //    var questionId = "6239cda0-e527-4e32-be3b-be94f9447067";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("timepie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#ff3300",
    //                                "#ff4500",
    //                                "#ff5722",
    //                                "#ff6b3e",
    //                                "#ff7f50",
    //                                "#ff9363",
    //                                "#ffaa77",
    //                                "#ffc18b",
    //                                "#ffd7a0",
    //                                "#ffeaaf",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=SPRAY TIME";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function ageanalytics() {
    //    /*var questionId = "6239cda0-e527-4e32-be3b-be94f9447067";*/ // Replace with the question ID you want to retrieve options for
    //    var questionId = "214c962f-7ee6-4158-bc0b-a4c8059a6cc2";

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("agepie").getContext("2d");
    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels,
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#006666",
    //                                "#007373",
    //                                "#008080",
    //                                "#008B8B",
    //                                "#009898",
    //                                "#00A5A5",
    //                                "#00B2B2",
    //                                "#00BFBF",
    //                                "#00CCCC",
    //                                "#00D9D9",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    plugins: {
    //                        legend: {
    //                            display: false,
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=AGE";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}
    //function presentationanalytics() {
    //    var questionId = "e64bd14d-cfac-490c-b80a-fe7329029bf8"; // Replace with the question ID you want to retrieve options for

    //    $.ajax({
    //        url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //        type: "GET",
    //        data: { questionId: questionId },
    //        async: true,
    //        success: function (response) {
    //            var optionLabels = response;
    //            var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

    //            var ctx = document.getElementById("presentationpie").getContext("2d");

    //            var myChart = new Chart(ctx, {
    //                type: "pie",
    //                data: {
    //                    labels: optionLabels, // Use the optionLabels from the API response as chart labels
    //                    datasets: [
    //                        {
    //                            data: optionData,
    //                            backgroundColor: [
    //                                "#703470",
    //                                "#7D417D",
    //                                "#8A498A",
    //                                "#975297",
    //                                "#A35BA3",
    //                                "#B068B0",
    //                                "#BD70BD",
    //                                "#CA79CA",
    //                                "#D682D6",
    //                                "#E28AE2",
    //                            ],
    //                            borderWidth: 0, // Remove the border
    //                        },
    //                    ],
    //                },
    //                options: {
    //                    layout: {
    //                        padding: 2,
    //                    },
    //                    plugins: {
    //                        legend: {
    //                            display: false, // Hide the legend
    //                        },
    //                        labels: {
    //                            render: function (optionLabels) {
    //                                return optionLabels.label;
    //                            },
    //                            fontColor: "white",
    //                            display: true,
    //                            position: "border",
    //                            fontSize: 8,
    //                        },
    //                        tooltip: {
    //                            callbacks: {
    //                                label: (data) => ` ${data.label}`,
    //                            },
    //                        },
    //                    },
    //                    responsive: true,
    //                    onHover: (evt, activeEls) => {
    //                        activeEls.length > 0
    //                            ? (evt.chart.canvas.style.cursor = "pointer")
    //                            : (evt.chart.canvas.style.cursor = "default");
    //                    },
    //                    onClick: function (e) {
    //                        var segments = myChart.getElementsAtEventForMode(
    //                            e,
    //                            "nearest",
    //                            { intersect: true },
    //                            true
    //                        );
    //                        if (segments.length) {
    //                            var segment = segments[0];
    //                            var label = myChart.data.labels[segment.index];

    //                            $.ajax({
    //                                url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //                                type: "GET",
    //                                data: { questionId: questionId, selectedOption: label },
    //                                success: function (response) {
    //                                    window.location.href = "show-all.html?label=" + label + "&labelHeading=PRESENTATION";
    //                                },
    //                                error: function (xhr, status, error) {
    //                                    console.log(error);
    //                                },
    //                            });
    //                        }
    //                    },
    //                },
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(error);
    //        },
    //    });
    //}


    // Variables for home popup selections
    // var homeSelectedOptions = {
    //     style: null, note: null, mood: null, season: null, occasion: null,
    //     ageGroup: null, smellIntensity: null, longevity: null, sprayTime: null, presentation: null
    // };

    // // Initialize home analytics popup
    // var homeAnalyticsInitialized = false;

    // // Function to show the homepage analytics popup
    // function showHomeAnalyticsPopup() {
    //     if (!homeAnalyticsInitialized) {
    //         initializeHomeAnalyticsCharts();
    //         homeAnalyticsInitialized = true;
    //     }
    //     $('#homeAnalyticsPopup').fadeIn(300);
    //     $('body').addClass('freeze-scroll');
    // }

    // // Function to close the homepage analytics popup
    // function closeHomeAnalyticsPopup() {
    //     $('#homeAnalyticsPopup').fadeOut(300);
    //     $('body').removeClass('freeze-scroll');
    // }

    // // Button click handlers
    // $(document).on('click', '#openHomeMultiAnalytics', function(e) {
    //     e.preventDefault();
    //     showHomeAnalyticsPopup();
    //     return false;
    // });

    // $(document).on('click', '#closeHomeAnalytics', function() {
    //     closeHomeAnalyticsPopup();
    // });

    // $(document).on('click', '#homeShowProducts', function() {
    //     var queryParams = [];

    //     if (homeSelectedOptions.style) queryParams.push('selectedOption1=' + encodeURIComponent(homeSelectedOptions.style));
    //     if (homeSelectedOptions.note) queryParams.push('selectedOption2=' + encodeURIComponent(homeSelectedOptions.note));
    //     if (homeSelectedOptions.mood) queryParams.push('selectedOption3=' + encodeURIComponent(homeSelectedOptions.mood));
    //     if (homeSelectedOptions.season) queryParams.push('selectedOption4=' + encodeURIComponent(homeSelectedOptions.season));
    //     if (homeSelectedOptions.occasion) queryParams.push('selectedOption5=' + encodeURIComponent(homeSelectedOptions.occasion));
    //     if (homeSelectedOptions.ageGroup) queryParams.push('selectedOption6=' + encodeURIComponent(homeSelectedOptions.ageGroup));
    //     if (homeSelectedOptions.smellIntensity) queryParams.push('selectedOption7=' + encodeURIComponent(homeSelectedOptions.smellIntensity));
    //     if (homeSelectedOptions.longevity) queryParams.push('selectedOption8=' + encodeURIComponent(homeSelectedOptions.longevity));
    //     if (homeSelectedOptions.sprayTime) queryParams.push('selectedOption9=' + encodeURIComponent(homeSelectedOptions.sprayTime));
    //     if (homeSelectedOptions.presentation) queryParams.push('selectedOption10=' + encodeURIComponent(homeSelectedOptions.presentation));

    //     var redirectUrl = 'show-all.html?sub_cat=FRAGRANCES';
    //     if (queryParams.length > 0) {
    //         redirectUrl += '&' + queryParams.join('&');
    //     }

    //     closeHomeAnalyticsPopup();
    //     window.location.href = redirectUrl;
    // });

    // $(document).on('click', '#homeResetCharts', function() {
    //     homeSelectedOptions = {
    //         style: null, note: null, mood: null, season: null, occasion: null,
    //         ageGroup: null, smellIntensity: null, longevity: null, sprayTime: null, presentation: null
    //     };
    //     // Reset chart colors if needed - you can add chart color reset logic here
    //     resetAllChartColors();
    // });

    // // Function to reset all chart colors
    // function resetAllChartColors() {
    //     // This function can be implemented to reset chart segment colors to default
    //     console.log('Charts reset to default state');
    // }

    // // Initialize home analytics charts with proper segment labels
    // function initializeHomeAnalyticsCharts() {

    //     // Register the datalabels plugin globally
    //     Chart.register(ChartDataLabels);

    //     // Common chart options with visible labels
    // const commonOptions = {
    //     plugins: { 
    //         legend: { display: false },
    //         tooltip: {
    //             callbacks: {
    //                 label: (data) => ` ${data.label}`,
    //             },
    //         },
    //         datalabels: {
    //             color: 'white',
    //             font: {
    //                 weight: 'bold',
    //                 size: 7
    //             },
    //             formatter: function(value, context) {
    //                 return context.chart.data.labels[context.dataIndex];
    //             },
    //             display: true,
    //             textAlign: 'center',
    //             anchor: 'center',
    //             align: 'center'
    //         }
    //     },
    //     responsive: true,
    //     maintainAspectRatio: true,
    //     layout: {
    //         padding: 10
    //     },
    //     elements: {
    //         arc: {
    //             borderWidth: 0
    //         }
    //     }
    // };

    //     // 1. Style chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeStylepie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#cc0000", "#dd0000", "#ee0000", "#ff0000", "#ff1111", "#ff2222", "#ff3333", "#ff4444", "#ff5555", "#ff6666"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     plugins: {
    //                         ...commonOptions.plugins,
    //                         datalabels: {
    //                             ...commonOptions.plugins.datalabels,
    //                             color: 'white'
    //                         }
    //                     },
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.style = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 2. Note chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "27059952-4128-4b44-be81-ea158ed8eb92" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeTonepie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#1a3d7a", "#244986", "#2e5598", "#3861a7", "#426db6", "#4c79c5", "#5685d4", "#6091e3", "#6a9df2", "#74a9ff"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.note = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 3. Mood chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "c8f8dc67-b98b-436c-b74b-b21399bebc5c" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeMoodpie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#b8a000", "#c8b000", "#d8c000", "#e8d000", "#f8e000", "#fff000", "#fff222", "#fff444", "#fff666", "#fff888"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     plugins: {
    //                         ...commonOptions.plugins,
    //                         datalabels: {
    //                             ...commonOptions.plugins.datalabels,
    //                             color: 'white'
    //                         }
    //                     },
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.mood = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 4. Season chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "cb6924f2-a52e-43f8-8c0b-492234c4345e" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeSeasonpie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#cc0044", "#dd1155", "#ee2266", "#ff3377", "#ff4488", "#ff5599", "#ff66aa", "#ff77bb", "#ff88cc", "#ff99dd"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.season = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 5. Occasion chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "d84ee43f-6f45-4025-8755-fa04ea76667d" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeOccassionpie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#4B5D26", "#416A2C", "#377736", "#2D843B", "#239142", "#199F48", "#0FAE4D","#05BC53","#00CA59","#00D864",],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.occasion = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 6. Age Group chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "214c962f-7ee6-4158-bc0b-a4c8059a6cc2" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeAgepie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#004d4d", "#006060", "#007373", "#008686", "#009999", "#00acac", "#00bfbf", "#00d2d2", "#00e5e5", "#00f8f8"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.ageGroup = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 7. Smell Intensity chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeSmellpie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#000000", "#1a1a1a", "#333333", "#4d4d4d", "#666666", "#808080", "#999999", "#b3b3b3", "#cccccc", "#e6e6e6"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.smellIntensity = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 8. Longevity chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeLongevitypie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#2d0f0f", "#3d1515", "#4d1b1b", "#5d2121", "#6d2727", "#7d2d2d", "#8d3333", "#9d3939", "#ad3f3f", "#bd4545"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.longevity = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 9. Spray Time chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "6239cda0-e527-4e32-be3b-be94f9447067" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homeTimepie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#cc2200", "#dd3300", "#ee4400", "#ff5500", "#ff6622", "#ff7744", "#ff8866", "#ff9988", "#ffaaaa", "#ffbbcc"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     plugins: {
    //                         ...commonOptions.plugins,
    //                         datalabels: {
    //                             ...commonOptions.plugins.datalabels,
    //                             color: 'white'
    //                         }
    //                     },
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.sprayTime = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });

    //     // 10. Presentation chart
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
    //         type: "GET",
    //         data: { questionId: "e64bd14d-cfac-490c-b80a-fe7329029bf8" },
    //         success: function (response) {
    //             var ctx = document.getElementById("homePresentationpie").getContext("2d");
    //             new Chart(ctx, {
    //                 type: "pie",
    //                 data: {
    //                     labels: response,
    //                     datasets: [{
    //                         data: Array(response.length).fill(10),
    //                         backgroundColor: ["#552255", "#663366", "#774477", "#885588", "#996699", "#aa77aa", "#bb88bb", "#cc99cc", "#ddaadd", "#eebbee"],
    //                         borderWidth: 0,
    //                         borderColor: 'transparent'
    //                     }]
    //                 },
    //                 options: {
    //                     ...commonOptions,
    //                     onClick: function (e) {
    //                         var segments = this.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
    //                         if (segments.length) {
    //                             homeSelectedOptions.presentation = this.data.labels[segments[0].index];
    //                         }
    //                     }
    //                 },
    //                 plugins: [ChartDataLabels]
    //             });
    //         }
    //     });
    // }
    var carousel = $("#carousel").waterwheelCarousel({
        flankingItems: 3,
        movedToCenter: function ($item) {
            $("#callback-output").prepend(
                "movedToCenter: " + $item.attr("id") + "<br/>"
            );
        },
        movingFromCenter: function ($item) {
            $("#callback-output").prepend(
                "movingFromCenter: " + $item.attr("id") + "<br/>"
            );
        },
        movedFromCenter: function ($item) {
            $("#callback-output").prepend(
                "movedFromCenter: " + $item.attr("id") + "<br/>"
            );
        },
        clickedCenter: function ($item) {
            $("#callback-output").prepend(
                "clickedCenter: " + $item.attr("id") + "<br/>"
            );
        },

        autoPlay: true, // Enable autoplay
        autoPlaySpeed: 9000, // Delay between each slide (in milliseconds)
        flankingItems: 3, // Number of items on each side of the center item
        separation: 200, // Distance between items
        speed: 2000,
    });
    $("#carousel a img").on("click", function () {
        var anchorHref = $(this).parent().attr("href");
        if (anchorHref) {
            window.location.href = anchorHref;
        }
    });

    $("#prev").bind("click", function () {
        carousel.prev();
        return false;
    });

    $("#next").bind("click", function () {
        carousel.next();
        return false;
    });

    $("#reload").bind("click", function () {
        newOptions = eval("(" + $("#newoptions").val() + ")");
        carousel.reload(newOptions);
        return false;
    });
    $("#drSubmit").click(function () {


        var username = $("#dr-user-name").val();
        var useremail = $("#dr-user-email").val();
        var phone = $("#dr-phoneNumber").val()
        var usermessage = $("#dr-user-message").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Redeem/EmailsForClub",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": username, "phone": phone, "email": useremail, "description": usermessage },
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#dropshippopup").modal("hide");
                alert(data);
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            },

            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                    return;
                }
            }

        });

    });
    $("#whSubmit").click(function () {


        var username = $("#wh-user-name").val();
        var useremail = $("#wh-user-email").val();
        var phone = $("#wh-phoneNumber").val()
        var usermessage = $("#wh-user-message").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Redeem/EmailsForClub",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": username, "phone": phone, "email": useremail, "description": usermessage },
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#wholesalerpopup").modal("hide");
                alert(data);
                setTimeout(function () {
                    window.location.reload();
                }, 1000);

            },

            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                    return;
                }
            }

        });

    });
    $("#scSubmit").click(function () {


        var username = $("#sc-user-name").val();
        var useremail = $("#sc-user-email").val();
        var phone = $("#sc-phoneNumber").val()
        var usermessage = $("#sc-user-message").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Redeem/EmailsForClub",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": username, "phone": phone, "email": useremail, "description": usermessage },
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#subscribepopup").modal("hide");
                alert(data);
                setTimeout(function () {
                    window.location.reload();
                }, 1000);

            },

            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                    return;
                }
            }

        });

    });

    // $("#fedbackSubmit").click(function () {
    // var useremail = $("#fd-user-email").val().trim();
    // var username = $("#fd-user-message").val().trim();
    // var phone = $("#fd-user-phone").val().trim();

    // var missingFields = [];

    // if (username === "") {
    //     missingFields.push("Name");
    // }

    // // Check if both email and phone are empty, or email is invalid
    // var hasValidEmail = useremail !== "" && validateEmail(useremail);
    // var hasPhone = phone !== "";

    // if (!hasValidEmail && !hasPhone) {
    //     // Neither email nor phone provided
    //     if (missingFields.length > 0) {
    //         missingFields.push("Email (or) Phone");
    //     } else {
    //         missingFields.push("Email (or) Phone");
    //     }
    // } else if (useremail !== "" && !validateEmail(useremail)) {
    //     // Email provided but invalid, and no phone
    //     if (!hasPhone) {
    //         missingFields.push("Valid Email (or) Phone");
    //     }
    // }

    // if (missingFields.length > 0) {
    //     // Show all missing/invalid fields at once
    //     swal({
    //         title: "Missing Fields",
    //         text: "Please provide: " + missingFields.join(", "),
    //         icon: "error",
    //         button: "OK"
    //     });
    //     return false; // Prevent submission
    // }

    // // If validation passes, proceed with AJAX submission
    // $.ajax({
    //     url: "https://api.americanfragrances.com/Review/ContactForm",
    //     type: "POST",
    //     data: { "Project_Id": Project_Id, "email": useremail, "message": username, "phone": phone },
    //     dataType: "json",
    //     async: true,
    //     crossDomain: true,
    //     success: function (data) {
    //         $("#fd-user-email").val("");
    //         $("#fd-user-message").val("");
    //         $("#fd-user-phone").val("");

    //         // Custom styling for SweetAlert popup
    //         const style = document.createElement('style');
    //         style.type = 'text/css';
    //         style.id = 'custom-swal-style';
    //         style.innerHTML = `
    //             .swal2-actions::before { display:none !important; }
    //             .swal2-actions { display:none !important; }
    //             #swal2-content { color:#70b4bd !important; }
    //             .swal2-modal { border: 8px solid #70b4bd !important; }
    //         `;
    //         document.getElementsByTagName('head')[0].appendChild(style);

    //         swal({
    //             title: "",
    //             text: "Thank You for Joining Amerifrag!",
    //             icon: "warning",
    //             buttons: false,
    //             timer: 3000
    //         }).then(function () {
    //             const customStyle = document.getElementById('custom-swal-style');
    //             if (customStyle) {
    //                 customStyle.parentNode.removeChild(customStyle);
    //             }
    //         });
    //     },
    //     error: function (xhr) {
    //         if (xhr.status === 401) {
    //             window.location.href = "/Home.html";
    //         }
    //     }
    //   });
    // });
    // Email validation function
    function validateEmail(email) {
        // Strict email validation
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return false;
        }

        var domain = email.split('@')[1];
        if (!domain || domain.split('.').length < 2) {
            return false;
        }

        var tld = domain.split('.').pop();
        if (!tld || tld.length < 2) {
            return false;
        }

        return true;
    }

    $("#fedbackSubmit").click(function () {
        var useremail = $("#fd-user-email").val().trim();
        var username = $("#fd-user-message").val().trim();
        var phone = $("#fd-user-phone").val().trim();

        var missingFields = [];

        // Validate Name
        if (username === "") {
            missingFields.push("Name");
        }

        // NEW: If email field has ANY text, it MUST be valid
        if (useremail !== "" && !validateEmail(useremail)) {
            swal({
                title: "Invalid Email",
                text: "Please enter a valid email address (e.g., user@gmail.com, user@domain.co.in)",
                icon: "error",
                button: "OK"
            });
            return false; // Stop here - don't proceed
        }

        // Check if at least one contact method is provided
        if (useremail === "" && phone === "") {
            missingFields.push("Email or Phone");
        }

        if (missingFields.length > 0) {
            swal({
                title: "Missing Fields",
                text: "Please provide: " + missingFields.join(", "),
                icon: "error",
                button: "OK"
            });
            return false;
        }

        // If we reach here, validation passed
        $.ajax({
            url: "https://api.americanfragrances.com/Review/ContactForm",
            type: "POST",
            data: { "Project_Id": Project_Id, "email": useremail, "message": username, "phone": phone },
            dataType: "json",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#fd-user-email").val("");
                $("#fd-user-message").val("");
                $("#fd-user-phone").val("");

                const style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'custom-swal-style';
                style.innerHTML = `
                .swal2-actions::before { display:none !important; }
                .swal2-actions { display:none !important; }
                #swal2-content { color:#70b4bd !important; }
                .swal2-modal { border: 8px solid #70b4bd !important; }
            `;
                document.getElementsByTagName('head')[0].appendChild(style);

                swal({
                    title: "",
                    text: "Thank You for Joining Amerifrag!",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                }).then(function () {
                    const customStyle = document.getElementById('custom-swal-style');
                    if (customStyle) {
                        customStyle.parentNode.removeChild(customStyle);
                    }
                });
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                }
            }
        });
    });

    function cartupadtion(prod_id) {
        var prod_id = prod_id
        cart_id = localStorage.getItem("cart_id");
        var qty = "1";

        if (qty) {
            $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
            if (cart_id) {
                console.log("Update");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        cart_id: cart_id,
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                        customer_id: cust_auth
                    },
                    dataType: "JSON",
                    async: true,
                    crossDomain: true,
                    success: function (data) {
                        console.log(data);
                        if (data.responseCode == 1) {
                            cart_count(cart_id);
                            $("#" + prod_id).val("");

                            $("#validationdiv").text("Product successfully added to cart");
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#026633");

                            $(".dvcartbtns").show();
                            $(".btnsmall ").hide();
                        } else {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#dba23d");
                        }
                    },
                });
            } else {
                console.log("add");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                        customer_id: cust_auth
                    },
                    dataType: "JSON",
                    async: true,
                    crossDomain: true,
                    success: function (data) {
                        if (data.responseCode == 1) {
                            cart_count(cart_id);
                            $("#" + prod_id).val("");
                            localStorage.setItem("cart_id", data.cart_id);
                            cart_count(data.cart_id);
                            $("#" + prod_id).val("");
                            $("#validationdiv").text("Product successfully added to cart");
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#026633");

                            $(".dvcartbtns").show();
                            $(".btnsmall ").hide();
                        } else {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#dba23d");
                        }
                    },
                });
            }
        } else {
            $("input[id =" + prod_id + "]").css("border", "solid 1px red");
        }
    }
    $(document).on("click", ".cartbtn", function () {
        var prod_id = $(this).attr("data");
        cartupadtion(prod_id);
    });
    $('#two').prop('checked', true);

    function loadTabData(tabId, targetDiv, apiUrl) {
        $('#allProducts2, #newArrivals, #bestSeller, #topRated').empty();

        $.ajax({
            url: apiUrl,
            type: "POST",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                const products = data.SortedProducts || data.Products || data.Data;

                if (!products || products.length === 0) {
                    $(targetDiv).append('<center class="my-3"><img src="Images/empty_order.png"><h6><b>Currently, No Products Available.</b></h6></center>');
                    return;
                }

                let sortedProducts = products;

                // Apply rating-based sorting specifically for Top Rated tab
                if (tabId === 'four') {
                    // Sort by rating quality: prioritize products with reviews, then by weighted score
                    sortedProducts = [...products].sort(function (a, b) {
                        var ratingA = parseFloat(a.rating) || 0;
                        var ratingB = parseFloat(b.rating) || 0;
                        var countA = parseInt(a.rating_count) || 0;
                        var countB = parseInt(b.rating_count) || 0;

                        // Products with no reviews go to the end
                        if (countA === 0 && countB === 0) return 0;
                        if (countA === 0) return 1;
                        if (countB === 0) return -1;

                        // For products with reviews, prioritize by number of reviews first
                        if (countB !== countA) {
                            return countB - countA; // More reviews first
                        }

                        // If review counts are equal, then by rating
                        return ratingB - ratingA;
                    });

                    // Take only the top 8 highest-rated products with reviews
                    sortedProducts = sortedProducts.slice(0, 8);
                }

                $.each(sortedProducts, function (index, value) {
                    if (index < 8) { // Limit to 8 products for display
                        const screenWidth = window.innerWidth;
                        if ((screenWidth <= 767 && index < 4) ||
                            (screenWidth > 767 && (sortedProducts.length >= 8 || index < 8))) {

                            var product_id = value.id;
                            var salePrice = parseFloat(value.price).toFixed(2);
                            var originalPrice = parseFloat(value.rate).toFixed(2);
                            var categoryname = value.categoryname;
                            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                            var newrowContent =
                                '<div class="col-12 col-md-4 col-lg-3"><div class="product_box  position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
                                value.id +
                                '"><img class="img-fluid w-100" src="' +
                                value.display_image +
                                '" alt="..."></a><div class="product-overlay">' +
                                stockStatus +
                                '<a class="btn"  href="Productview.html?id=' +
                                value.id +
                                '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeREC' +
                                value.id +
                                '" ></div>' +
                                '<div class="product_name_wrapper">' +
                                '<div class="product_name_container">' +
                                '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '</p>' +
                                (value.name.length > 20 ? '<span class="product_name_tooltip">' + value.name + '</span>' : '') +
                                '</div>' +
                                '<span class="cat_icon">' +
                                (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' :
                                    categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' :
                                        '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') +
                                '</span>' +
                                '</div>' + '<p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                                '<div class="row align-items-center" > <div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
                                value.brandname +
                                '"><b><u>' +
                                value.brandname +
                                "</u></b></a></p></div></div>" +
                                '<div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' +
                                salePrice +
                                '</div><div class="org_price"><strike>$' +
                                originalPrice +
                                '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
                                value.discount +
                                '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
                                product_id +
                                '"></div><span class="reviews_count">&nbsp;(<span>' +
                                value.rating_count +
                                "</span>)</span></div></div></div></div>";
                            $(targetDiv).append(newrowContent);

                            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {
                                var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                $("#bestbarcodeREC" + product_id).append(newrow);
                                $("#cat_useranly_rec" + product_id).text("AmeriFrag Barcode");
                            }

                            var $starsContainer = $(".product_box").find(".stars" + product_id);
                            $starsContainer.empty();

                            // Fixed star rating logic
                            var rating = value.rating;
                            var ratingCount = value.rating_count;

                            if (ratingCount > 0 && rating > 0) {
                                if (rating >= 4.6 && rating <= 5) {
                                    $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                } else if (rating >= 4.1 && rating < 4.6) {
                                    $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                } else if (rating >= 3.6 && rating < 4.1) {
                                    $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                } else if (rating >= 3.1 && rating < 3.6) {
                                    $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                } else if (rating >= 2.6 && rating < 3.1) {
                                    $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                } else if (rating >= 2.1 && rating < 2.6) {
                                    $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                } else if (rating >= 1.6 && rating < 2.1) {
                                    $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                } else if (rating >= 1.1 && rating < 1.6) {
                                    $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                } else if (rating >= 0.6 && rating < 1.1) {
                                    $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                } else if (rating > 0 && rating < 0.6) {
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                }
                            } else {
                                // Show 0.5 star (half star) when there are no reviews
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            }
                        }
                    }
                });
            },
            error: function () {
                $(targetDiv).append('<p>Error loading data</p>');
            }
        });
    }

    $('input.radio').change(function () {
        loadSelectedTab(); // reusable logic
    });
    function loadSelectedTab() {
        let take = 8;
        let skip = 0;
        let Authkey = localStorage.getItem("authorid");
        let Sub_Category = "FRAGRANCES";

        if ($('#one').is(':checked')) {
            const url = `https://api.americanfragrances.com/Home/FilterProducts?customerId=${Authkey}&Take=${take}&skip=${skip}&subcategory=${Sub_Category}`;
            loadTabData('one', '#allProducts2', url);
        } else if ($('#two').is(':checked')) {
            const url = `https://api.americanfragrances.com/Product/NewArrivals?Take=${take}&skip=${skip}`;
            loadTabData('two', '#newArrivals', url);
        } else if ($('#three').is(':checked')) {
            const url = `https://api.americanfragrances.com/Product/BestSellers?Take=${take}&skip=${skip}`;
            loadTabData('three', '#bestSeller', url);
        } else if ($('#four').is(':checked')) {
            const topRatedTake = Math.max(take * 12, 300);
            const keyword = "toprated";
            const url = `https://api.americanfragrances.com/Product/ProductsByKeyword?keyword=${keyword}&customerId=${Authkey}&skip=${skip}&take=${topRatedTake}`;
            loadTabData('four', '#topRated', url);
        }
    }



    loadSelectedTab();

});

//$(document).on("click", ".whishlistPro", function () {
//    debugger;
//    var $this = $(this);
//    var heartIcon = $this.closest(".wishlistIcon").find(".fa-heart");

//    var isLoved = heartIcon.hasClass("redColor"); // ✅ correct check

//    var prod_id = $this.attr("id");
//    var wishlistId = $this.attr("wishlistid");
//    var cust_auth = localStorage.getItem("authorid");

//    if (!cust_auth) {
//        $("#loginpopup").modal("show");
//        return;
//    }

//    // ---------------- DELETE (Already in Wishlist) ----------------
//    if (isLoved) {
//        $.ajax({
//            url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
//            type: "POST",
//            dataType: "JSON",
//            data: {
//                project_id: Project_Id,
//                id: wishlistId,
//                authorid: cust_auth
//            },
//            success: function (data) {
//                if (data.responseCode === 1) {
//                    wishlist_count(cust_auth);

//                    heartIcon.removeClass("redColor").addClass("whiteColor");

//                    $("#validationdiv")
//                        .text("Product Removed From Wishlist Successfully")
//                        .css("background", "#026633")
//                        .slideDown().delay(3000).slideUp();
//                }
//            }
//        });
//    }

//    // ---------------- CREATE (Not in Wishlist) ----------------
//    else {
//        $.ajax({
//            url: "https://api.americanfragrances.com/ProductAnalytics/Create",
//            type: "POST",
//            dataType: "JSON",
//            data: {
//                project_id: Project_Id,
//                product_id: prod_id,
//                authorid: cust_auth
//            },
//            success: function (data) {
//                if (data.responseCode === 1) {
//                    wishlist_count(cust_auth);

//                    $this.attr("wishlistid", data.id);

//                    heartIcon.addClass("redColor").removeClass("whiteColor");

//                    $("#validationdiv")
//                        .text("Product Added Successfully To Wishlist")
//                        .css("background", "#026633")
//                        .slideDown().delay(3000).slideUp();
//                }
//            }
//        });
//    }
//});


// Mobile Menu - Left Slide-in with Outside Click Close
(function () {
    if (window.innerWidth <= 992) {
        document.addEventListener('DOMContentLoaded', function () {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const body = document.body;

            if (!navbarToggler || !navbarCollapse) return;

            // Function to close menu
            function closeMenu() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                body.classList.remove('menu-open');
            }

            // Toggle menu-open class when hamburger is clicked
            navbarToggler.addEventListener('click', function (e) {
                e.stopPropagation();
                setTimeout(() => {
                    if (navbarCollapse.classList.contains('show')) {
                        body.classList.add('menu-open');
                    } else {
                        body.classList.remove('menu-open');
                    }
                }, 50);
            });

            // Prevent clicks inside menu from closing it
            navbarCollapse.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            // Close menu when clicking outside overlay
            document.addEventListener('click', function (event) {
                const isClickInsideMenu = navbarCollapse.contains(event.target);
                const isClickOnToggler = navbarToggler.contains(event.target);

                if (body.classList.contains('menu-open') &&
                    !isClickInsideMenu &&
                    !isClickOnToggler) {
                    closeMenu();
                }
            });

            // Also close when clicking on the overlay
            body.addEventListener('click', function (event) {
                if (event.target === body && body.classList.contains('menu-open')) {
                    closeMenu();
                }
            });

            // Close menu when clicking any menu link
            const menuLinks = navbarCollapse.querySelectorAll('.nav-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    // Allow link to work, then close menu
                    setTimeout(() => {
                        closeMenu();
                    }, 100);
                });
            });

            // Listen to Bootstrap collapse events
            navbarCollapse.addEventListener('hidden.bs.collapse', function () {
                body.classList.remove('menu-open');
            });

            navbarCollapse.addEventListener('shown.bs.collapse', function () {
                body.classList.add('menu-open');
            });
        });
    }

    // Reset on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            document.body.classList.remove('menu-open');
        }
    });
})();

