$(document).ready(function () {




    var Project_Id = GlobalInputs();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var product_id = params.get("id");
    var path = window.location.pathname;
    var couponAppliedProductID = localStorage.getItem("couponAppliedProductID");
    //var couponAppliedProductDiscount = localStorage.getItem("couponAppliedProductDiscount");
    //var DiscountAmount = localStorage.getItem("DiscountAmount");
    //var discount_price = localStorage.getItem("discount_price");


    //var usersession = localStorage.getItem("authorid");
    var cust_auth = localStorage.getItem("authorid");


    var wishlist_id = localStorage.getItem("wishlist_id");
    var cart_id = localStorage.getItem("cart_id");
    var couponLabel = "";
    var Sub_Category;
    $(".couponAppliedText").hide();




    if (cart_id) {
        cart_count(cart_id);
    }

    var style = "";
    var note = "";
    var mood = "";
    var season = "";
    var occasion = "";
    var ageGroup = "";
    var smellIntensity = "";
    var longevity = "";
    var sprayTime = "";
    var presentation = "";
    var SubcatForSimilar = "";


    getproduct();
    /* getdatatable();*/
    $("#btnclosepop").click(function () {
        localStorage.setItem("popup", "tick");
    });
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var log = params.get("login");
    if (log == "yes") {
        $("#successlogin").modal("show");
    }

    $(document).on("mouseenter", ".dupProWidth1", function () {
        $(this).find(".RemaingDupInforma").stop(true, true).fadeIn();
    }).on("mouseleave", ".dupProWidth1", function () {
        $(this).find(".RemaingDupInforma").stop(true, true).fadeOut();
    });
    var Type = "";
    var subcategoryname = "";

    function getproduct() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Productview?project_id=" +
                Project_Id +
                "&id=" +
                product_id +
                "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                var discountMessage = '';

                if (data.subcategoryname == "FRAGRANCES") {
                    discountMessage = '<h5 class="text-center mt-3 mb-2" style="color:#E8271B; text-decoration: underline;font-weight:bold;">INSTANT 5% DISCOUNT!</h5><p class="text-center" style="font-weight: 600;font-size:14px">Unlock an  <span style="color:#E8271B;"> Extra 5% discount </span>by completing our AmeriFrag product questionnaire at checkout and let our real-time user and AI-based analytics tailor your perfect fragrance experience.</p>';
                } else if (data.subcategoryname == "MAKE UP" || data.subcategoryname == "SKIN CARE" || data.subcategoryname == "HAIR CARE" || data.subcategoryname == "BATH & BODY" || data.subcategoryname == "AROMA" || data.subcategoryname == "ACCESSORIES") {
                    discountMessage = '<h5 class="text-center mt-3 mb-2" style="color:#E8271B; text-decoration: underline;font-weight:bold;">Handpicked For You!</h5><p class="text-center" style="font-weight: 600;font-size:14px">Discover beauty and self-care essentials—expertly curated for quality, performance, and everyday elegance to complement your lifestyle</p>';
                } else if (data.subcategoryname == "BUNDLE SETS") {
                    discountMessage = '<h5 class="text-center mt-3 mb-2" style="color:#E8271B; text-decoration: underline;font-weight:bold;">Perfect Pairings, Greater Savings!</h5><p class="text-center" style="font-weight: 600;font-size:14px">The more you buy, the more you save—unlock exclusive discounts on expertly paired products designed to complement each other effortlessly</p>';
                } else if (data.subcategoryname == "GIFT SETS") {
                    discountMessage = '<h5 class="text-center mt-3 mb-2" style="color:#E8271B; text-decoration: underline;font-weight:bold;">A Gift to Remember!</h5><p class="text-center" style="font-weight: 600;font-size:14px">Curated for every occasion—elevate your gesture with a touch of elegance, care, and timeless style</p>';
                }





                subcategoryname = data.subcategoryname;
                var brandname = data.brandname;
                let baseUrl = "https://api.americanfragrances.com/Home/FilterProducts";
                let filterObject = {
                    customerId: cust_auth || null,
                    subcategory: SubcatForSimilar,
                    brands: brandname,
                    skip: 0,
                    take: 24,

                };

                // Clean object
                Object.keys(filterObject).forEach(key => {
                    if (filterObject[key] === undefined || filterObject[key] === null) {
                        delete filterObject[key];
                    }
                });
                var ajaxData = filterObject;
                // Construct final URL


                $.ajax({
                    url: baseUrl,
                    type: "POST",
                    data: ajaxData,
                    dataType: "JSON",
                    async: true,
                    crossDomain: true,
                    success: function (data) {
                         
                        $("#brand_product_carosel").empty();
                        $("#brandProductCuroselNoProductsDiv").empty();
                        var productCount = 0;
                        $.each(data.Products, function (Index, value) {


                            var product_id = value.id;
                            var salePrice = parseFloat(value.price).toFixed(2);
                            var originalPrice = parseFloat(value.rate).toFixed(2);
                            var categoryname = value.categoryname;
                            var brandname = value.brandname || value.BrandName;
                            var stockStatus = value.stock != "0"
                                ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>'
                                : '<span class="btn out-of-stock-label">Sold Out</span>';
                            i = i + 1;
                            if (i < 50) {
                                var newrowContent = '<div class="col-12"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '" ></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + brandname + '"><b><u>' + brandname + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>'


                                $("#brand_product_carosel").append(newrowContent);
                                productCount++;
                                // Make AJAX call to fetch chart data
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
                                    $("#brand_product_carosel #barcode" + product_id).append(newrow);

                                    $("#brand_product_carosel #cat_useranly" + product_id).text("AmeriFrag Barcode");



                                } else {
                                    $("#brand_product_carosel #barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                }
                                
                                //rating or reviews
                                var $starsContainer = $(".product_box.position-relative").find('.stars' + product_id); // Find the .stars element within the new review
                                $starsContainer.empty();

                                if (value.rating >= 4.6 && value.rating <= 5) {
                                    $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                    $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                } else if (value.rating >= 3.6 && value.rating <= 4) {
                                    $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                    $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                } else if (value.rating >= 2.6 && value.rating <= 3) {
                                    $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                    $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                } else if (value.rating >= 1.6 && value.rating <= 2) {
                                    $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                    $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                } else if (value.rating >= 0.6 && value.rating <= 1) {
                                    $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                } else if (value.rating >= 0 && value.rating <= 0.5) {
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                } else {
                                    $starsContainer.append('<span>No reviews</span>'); // Clear the stars container if the rating doesn't match any range
                                }
                            }

                        });
                        if (productCount > 0) {
                            $("#brand_product_carosel").owlCarousel({
                                loop: true,
                                margin: 10,
                                autoplay: false,
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
                                        items: 4,
                                        nav: true,
                                        loop: true,
                                    },
                                },
                            });
                        } else {
                            // Optional: show a friendly message when there are no products
                            $("#brandProductCuroselNoProductsDiv").append('<center><img src="Images/empty_order.png"><h6><b>Currently, No Products Available From This Brand.... </b></h6></center>');
                        }
                    },
                    error: function (error) {
                        // Handle any errors
                        console.log(error);
                    }
                });




                $("#ProductBanner").hide();

                if (subcategoryname != null && subcategoryname !== "") {
                    $("#ProductBanner").show();
                    $("#ProductBanner").empty();

                    var imageSrc = "";

                    var bannerMap = {
                        "FRAGRANCES": "PRODUCT-PAGE-BANNERS2.jpg",
                        "MAKE UP": "PRODUCT-PAGE-BANNERS.jpg",
                        "SKIN CARE": "PRODUCT-PAGE-BANNERS.jpg",
                        "HAIR CARE": "PRODUCT-PAGE-BANNERS.jpg",
                        "BATH": "PRODUCT-PAGE-BANNERS.jpg",
                        "AROMA": "PRODUCT-PAGE-BANNERS.jpg",
                        "GIFT SETS": "PRODUCT-PAGE-BANNERS0.jpg",
                        "BUNDLE SETS": "PRODUCT-PAGE-BANNERS1.jpg",
                        "ACCESSORIES": "PRODUCT-PAGE-BANNERS.jpg",
                        "CLEARANCE": "PRODUCT-PAGE-BANNERS.jpg"
                    };

                    if (bannerMap[subcategoryname]) {
                        imageSrc = bannerMap[subcategoryname];
                    }

                    if (imageSrc !== "") {
                        $("#ProductBanner").append('<img src="Images/showall/' + imageSrc + '" style="width:100%; height:auto;" />');
                    }
                }

                SubcatForSimilar = data.subcategoryname;
                $("#orginal_products").empty();
                $("#dup_products").empty();
                Type = data.mood;
                var stock = "";
                $("#headingbasedonsubcat").text("Products With Similar AmeriFrag Barcode");
                if (subcategoryname !== "FRAGRANCES") {
                    $("#headingbasedonsubcat").text("Similar Products");
                    // $("#productview #barcodeheading").css("display", "none");
                    $(".user_analytics").css("display", "none");
                }

                if (data.stock != 0) {

                    stock = "In Stock";
                    //var productBlCon ="<h5 class='text-center'>What is the Character of this product?</h5><p>For the first time ever, explore the true essence of each product with cutting-edge <strong> AI and User Analytics.</strong> Our innovative personal barcode system bridges the gap between physical and digital shopping, offering you real-time, personalized insights.</p><p><strong>Dynamic Product Description</strong>Experience a real-time description that evolves based on global user preferences, reflecting the most popular choices and giving you the most up-to-date information.</p><p><strong>Insightful Visual Charts:</strong>Discover how each fragrance performs across various categories through engaging following charts. These visuals highlight collective user data, revealing the product's key attributes in Notes, Occasions, seasons, Style, Age Group, Strength and more.Step into a new era of personalized fragrance shopping, where each scent's story is uniquely tailored to you.</p>"
                    //$(".productViewBelowCon").append(productBlCon);
                    //$(".cart_btn").show();
                    //$(".attr-heading").show();
                    //$(".quantity").show();
                    //$(".addtocart").show();

                }
                else {
                    //var productBlCon = "<h5 class='text-center'>What is the Story of this product?</h5><p>For the first time ever, explore the true essence of each product with cutting-edge<strong> AI and User Analytics.</strong> Our innovative personal barcode system bridges the gap between physical and digital shopping, offering you real-time, personalized insights.</p><p><strong>Dynamic Product Description</strong>Experience a real-time description that evolves based on global user preferences, reflecting the most popular choices and giving you the most up-to-date information.</p><p><strong>Insightful Visual Charts:</strong>Discover how each fragrance performs across various categories through engaging following charts. These visuals highlight collective user data, revealing the product's key attributes in Notes, Occasions, seasons, Style, Age Group, Strength and more.Step into a new era of personalized fragrance shopping, where each scent's story is uniquely tailored to you.</p>"
                    //$(".productViewBelowCon").append(productBlCon);
                    stock = '<span class="text-center mb-4" style="color:red; margin-right:20px;">Out Of Stock</span>';
                    //$(".cart_btn").hide();
                    //$(".attr-heading").hide();
                    //$(".quantity").hide();
                    //$(".addtocart").hide();
                }
                var salePrice = parseFloat(data.price).toFixed(2);
                localStorage.setItem("SP", salePrice);
                var originalPrice = parseFloat(data.rate).toFixed(2);
                var discount_price = parseFloat(data.discount_price).toFixed(2);
                var stock_count = data.stock;
                var productNameSto = data.name;
                var description = data.description;

                // Create a temporary DOM element to hold the description
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = description;

                // Remove all inline styles from the description
                tempDiv.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));

                // Get the sanitized description back as a string
                description = tempDiv.innerHTML;
               
                var newrowcontent =
                    '<input id="catlbl" type="hidden"><input id="brandlabel" type="hidden">' +
                    '<div class="container-fluid">' +
                    '<div class="row  px-3 ">' +

                    // Product Images Carousel
                    '<div class="col-md-6 col-lg-4  proImgCuroDiv order-md-0">' +
                    '<div id="product-images" class="carousel slide " data-ride="carousel">' +
                    '<div class="carousel-inner">' +
                    '<div class="carousel-item active">' +
                    '<div class="mySlides disply_img">' +
                    '<a href="' + data.display_image + '" class="minipic" title="' + data.name + '">' +
                    '<img src="' + data.display_image + '" style="width:100%" class="magniflier">' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<div class="mySlides disply_img">' +
                    '<a href="' + data.sample_image1 + '" class="minipic" title="' + data.name + '">' +
                    '<img src="' + data.sample_image1 + '" style="width:100%" class="magniflier">' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<div class="mySlides disply_img">' +
                    '<a href="' + data.sample_image2 + '" class="minipic" title="' + data.name + '">' +
                    '<img src="' + data.sample_image2 + '" style="width:100%">' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<div class="mySlides disply_img">' +
                    '<a href="' + data.sample_image3 + '" class="minipic" title="' + data.name + '">' +
                    '<img src="' + data.sample_image3 + '" style="width:100%" class="magniflier">' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<div class="mySlides disply_img">' +
                    '<a href="' + data.sample_image4 + '" class="minipic" title="' + data.name + '">' +
                    '<img src="' + data.sample_image4 + '" style="width:100%" class="magniflier">' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<button class="carousel-control-prev " type="button" data-bs-target="#product-images" data-bs-slide="prev">' +
                    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                    '<span class="visually-hidden">Previous</span>' +
                    '</button>' +
                    '<button class="carousel-control-next " type="button" data-bs-target="#product-images" data-bs-slide="next">' +
                    '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                    '<span class="visually-hidden">Next</span>' +
                    '</button>' +
                    '</div>' +
                    //Zoom Button
                    //'<div class=" d-none img-container text-center mt-1" id="zoom-container"><img style="max-width:100%;"  id="zoom-image"  src="' + data.display_image + '" alt="Zoomable Image"></div><br>' +
                    //'<div class=zoomedImageDiv><img class="img-fluid" id="zoom-image" src="' + data.display_image + '" alt="Zoomable Image"></div>' +
                    //'<div class="text-center d-none"><button class="zoom-btn" style="background-color:#70b4bd; color:white;" id="zoom-button">ZOOM</button></div><br><br>' +
                    //'<div class="pt-3 searchProduct text-center"><a target="_blank" href="/AmerifragBlog.html"><img class="img-fluid" style="max-width:80%"  src="Images/home/perfumehelp.png" /></a></div>' +

                    // Product Thumbnails
                    '<div id="product-thumbnails" class="pt-4">' +
                    '<div><button type="button" data-bs-target="#productslider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1">' +
                    '<img class="d-block w-100 img-fluid" src="' + data.display_image + '">' +
                    '</button></div>' +
                    '<div><button type="button" data-bs-target="#productslider" data-bs-slide-to="1" aria-label="Slide 2">' +
                    '<img class="d-block w-100 img-fluid" src="' + data.sample_image1 + '">' +
                    '</button></div>' +
                    '<div><button type="button" data-bs-target="#productslider" data-bs-slide-to="2" aria-label="Slide 3">' +
                    '<img class="d-block w-100 img-fluid" src="' + data.sample_image2 + '">' +
                    '</button></div>' +
                    '<div><button type="button" data-bs-target="#productslider" data-bs-slide-to="3" aria-label="Slide 4">' +
                    '<img class="d-block w-100 img-fluid" src="' + data.sample_image3 + '">' +
                    '</button></div>' +
                    '<div><button type="button" data-bs-target="#productslider" data-bs-slide-to="4" aria-label="Slide 5">' +
                    '<img class="d-block w-100 img-fluid" src="' + data.sample_image4 + '">' +
                    '</button></div>' +
                    '</div>' +
                    '<div class="pt-5 text-center"><p style="font-size:20px;margin-bottom:0px;">Explore more of</p><p><a href="show-all.html?brand=' + data.brandname + '" style="font-weight:bold; font-size:25px;" class="websiteBlue">' + data.brandname + '</a></p></div>' +
                    '</div>' +

                    // Product Details
                    '<div class="col-md-12 col-lg-5 position-relative order-md-2 order-lg-1">' +
                    '<div class="row">' +
                    '<div class="col-md-11">' +
                    '<p class="product_name">' + data.name + '<span class="cat-icon" style="padding-left:10px;"></span></p>' +
                    '<div class="row "><div class="col-md-9">' +
                    ((data.subcategoryname == "FRAGRANCES")
                        ? `<p class="productSize" style="margin-bottom:0px !important">${data.mood}  ${data.dimension}</p>`
                        : `<div><p style="margin-bottom:3px !important"  class="productSize">${data.Shade} ${data.dimension}</p><p style="text-align:left;margin-bottom:0px !important" >${data.mood}</p></div>`) +
                    'by&nbsp;' +
                    '<a href="show-all.html?brand=' + data.brandname + '" style="text-decoration:underline!important">' + data.brandname + '</a>' +
                    '<p class="mt-2 category_line">' + data.subcategoryname + '</p>' +
                    '<p class="mt-2 category_line"><span>Product No: </span>' + data.SKU_ID + '</p>' +
                    '</div>' +
                    '<div class="col-md-3   recomededImgConProduct text-end pe-1 d-flex flex-column justify-content-center align-items-end' + (data.isfeature ? '' : 'd-none') + '" style="justify-content:right;">' +

                    '<img id="recomededImgProduct" src="Images/ameriftagRecommendedIcon.png" />' +
                    '</div></div>' +


                    // Pricing Information
                    '<div class="pricing d-flex justify-content-start align-items-center ">' +
                    '<div class="sale_price d-none">$' + salePrice + '</div>' +
                    '<div class="org_price d-none"><strike>$' + originalPrice + '</strike></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    // Stock Information, Reviews, and Actions
                    '<div class="row">' +
                    '<div class="col-lg-8 d-flex justify-content-between align-items-center notify">' + stock + '</div>' +
                    '<div class="col-md-4 text-center" >' +
                    '</div>' +
                    '</div>' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                    '<div class="d-flex flex-row"><div class="stars"></div> <a class="p-1" target="_blank" href ="/reviews.html?id=' + product_id + '" class="view_review" > (' + data.rating_count + ' Reviews)</a ></div>' +
                    '<a type="button" class="btn wrt_review">Write a Review</a>' +
                    '</div>' +

                    '<hr class="mt-40 mb-30">' +

                    // Product Description and Additional Information
                    '<p class="text-sm mb-4" style="text-align: justify; font-size: 16px; font-family: \'Sofia Pro Regular Az\';">' +
                    description +
                    '</p><div class="row"><p> <strong class="websiteBlue">' + (data.Additional_Addon_label1 || "") + ' </strong>' + (data.topnote || "") + '</p><p> <strong  class="websiteBlue">' + (data.Additional_Addon_label2 || "") + ' </strong>' + (data.heartnote || "") + '</p><p> <strong  class="websiteBlue">' + (data.Additional_Addon_label3 || "") + ' </strong>' + (data.basenote || "") + '</p></div>' +
                    //'<p class="text-sm mb-4" style="text-align:justify !important; font-weight:bold;font-size:14px">' + data.description + '</p>' +
                    '<div class="d-flex justify-content-between"><div></div></div>' +
                    // '<h6 id="highestValueLabel"></h6></div></div>' +
                    // Quantity Selector and Cart/Wishlist Buttons
                    '<div class="row d-flex flex-row justify-content-center">' +
                    '<div class="col-lg-3 quantityCol">' +
                    '<p class="attr-heading text-center">Quantity</p>' +
                    '<div class="d-flex flex-row justify-content-center"><div class="quantity d-flex">' +
                    '<button class="dec-btn minus"><i class="fa fa-minus"></i></button>' +
                    '<input class="form-control" id="' + data.id + '" type="text" value="1">' +
                    '<button class="inc-btn plus"><i class="fa fa-plus"></i></button>' +
                    '</div></div>' +
                    '</div>' +
                    '<div class="col-lg-9">' +
                    '<div class="d-flex   cart-btns">' +
                    '<div class="">' +
                    '<button class="btn wishlist-add mb-4 notifyback" data="' + data.id + '">Notify me</button>' +
                    '<button class="btn btn1 btn-dark cart_btn m-0 addtocart" data="' + data.id + '" type="button">Add to Queue</button>' +
                    // '<button class="btn btn-dark cart_btn m-0 viewcart" type="button" style="display:none"><a href="cart.html" style="color:#fff">Checkout</a></button>' +
                    '</div>' +
                    '<div class="">' +
                    '<button class="btn wishlist-add-view text-dark" data="' + data.id + '" href="#!">Add to Wishlist</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    // Barcode and Additional Features
                    '<div id="duplicate_product"></div>' +
                    '<div class="brands"><div class="owl-carousel owl-theme" id="brands-carousel"></div></div>' +
                    '</div>' +

                    // Price and Discount Information
                    '<div class="col-md-6 col-lg-3 order-md-1 order-lg-2">' +
                    '<div class="coupon-col">' +
                    '<h4 class="coupon-heading" >Sale Price</h4>' +
                    '<hr class="hr mt-20 mb-20">' +
                    '<div class="row">' +
                    '<div class="col-6"><p class="price-head fw-bold text-center">Our Price </p><h5 class="text-center">$' + salePrice + '</h5></div>' +
                    '<div class="col-6 mb-20"><p class="price-head text-center fw-bold">Retail Price </p><h5 class="text-center"><strike>$' + originalPrice + '</strike></h5></div>' +
                    '</div>' +
                    '<p class="save-text text-center fw-bold" id="saveText">SAVE: $' + discount_price + ' (' + data.discount + '% Off)</p>' +
                    '<hr class="hr mt-20 mb-30">' +
                    //coupon section
                    '<div class="couponUnlockDiv text-center"><button class="couponUnlockBt fw-bold">Unlock Special Price with COUPON</button><p class="couponAppliedText mt-2 fw-bold d-none"></p></div>' +
                    '<div class="freeShipping mt-3 text-center">' + (salePrice >= 75 ? '<img class="img-fluid pr-3" src="Images/products/shippingImg.png" /> Eligible for Free Shipping' : '') + '</div>' +
                    discountMessage +
                    '<div class="text-center"><img style="max-width:70%"  src="Images/certificate.png"/></div>' +
                    '<div class="row new_cont px-3 py-2 text-center">EARN REWARD POINTS FOR EACH PURCHASE TO UNLOCK SPECIAL DEALS AND COUPONS</div>' +
                    '</div>' +
                    '<div class="text-center pt-4 mt-2"><a type="button" class="DisclaimerProductView " data-bs-toggle="modal" data-bs-target="#disclaimer">Disclaimer</a></div>' +

                    '</div>' +
                    '</div>' +

                    '<br>' +
                    // Barcode
                    (subcategoryname === "FRAGRANCES" ?
                        '<div id="barcodeheading"><h4 class="text-center ">Amerifrag Barcode</h4>' +
                        '<div class="barcode progress barcodeHeight" id="barcodeview' + data.id + '"></div>' +
                        '<span class="d-flex flex-row justify-content-end pt-1">' +
                        '<a type="button" class="btn herewhatGo" data-bs-toggle="modal" data-bs-target="#analyizepopup2">Understanding the Amerifrag Barcode</a>' +
                        '</span></div>' : '') +
                    '</div></div>';
                $("#productview").append(newrowcontent);
                //Super sale coupon percentage calculation
                const superSaleDiscountPer = 20;
                if (originalPrice) {
                    const DiscountAmount = (originalPrice * superSaleDiscountPer) / 100;
                    $(document).on("click", ".couponUnlockBt", function () {
                        couponLabel = "AFRAGSC20";
                        if (cust_auth) {
                            localStorage.removeItem("couponAppliedProductID");
                            localStorage.setItem("couponAppliedProductID", product_id);
                            localStorage.setItem("couponAppliedProductDiscount", data.discount);
                            localStorage.setItem("DiscountAmount", DiscountAmount);
                            localStorage.setItem("discount_price", discount_price);
                            $(".couponUnlockBt").empty();
                            var amountVal = parseInt(originalPrice) - (parseInt(DiscountAmount) + parseInt(discount_price));
                            amountVal = parseFloat(amountVal).toFixed(2);
                            localStorage.removeItem("CouponAmount");
                            localStorage.setItem("CouponAmount", amountVal);

                            var couponHeadingtext = "Special Sale Price: $" + amountVal;
                            $(".couponUnlockBt").text(couponHeadingtext);
                            var couponAppliedText = "20% Coupon ‘AFRAGSC20’ Applied";
                            $(".couponAppliedText").text(couponAppliedText);
                            $(".couponAppliedText").removeClass("d-none");

                            $("#saveText").empty();
                            var totalDiscount = parseInt(superSaleDiscountPer) + parseInt(data.discount);
                            var totalSave = parseInt(discount_price) + parseInt(DiscountAmount);
                            var saveText = "SAVE: $" + parseFloat(totalSave).toFixed(2) + " (" + totalDiscount + "% Off)";
                            $("#saveText").append(saveText);
                            $('.couponUnlockBt').css({
                                'background': 'transparent',
                                'font-size': '20px'
                            });
                        } else {
                            //window.location.href = '/Home.html';
                            $("#loginpopup").modal("show");
                        }
                    });
                }



                $(".disply_img").show();
                var description =
                    ' <p class="descrptn_txt">' + data.description + "</p>";
                $("#lb_desptn").append(description);
                var categoryname = data.categoryname;
               
                $("#catlbl").append(categoryname);
                $("#brandlabel").append(brandname);
                if (stock_count === 0) {
                    $(".cart_btn").hide();
                    $(".attr-heading").hide();
                    $(".quantityCol").hide();
                    $(".addtocart").hide();
                    $(".notifyback").show();

                }
                if (stock_count !== 0) {

                    $(".attr-heading").show();
                    $(".quantityCol").show();
                    $(".addtocart").show();
                    $(".notifyback").hide();
                }
                if (categoryname == "Women") {
                    $(".cat-icon").append(' <i class="fa-solid fa-person-dress"></i>');
                    $("#catlbl").hide();
                } else if (categoryname == "Men") {
                    $(".cat-icon").append(' <i class="fa-solid fa-person"></i>');

                    $("#catlbl").hide();
                } else {
                    $(".cat-icon").append(
                        ' <i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>'
                    );
                }
                var subcat = data.subcategoryname.toLowerCase();

                var breadcrumbrow =
                    '<li class="breadcrumb-item"><a class="text-dark" href="home.html">Home</a></li>' +
                    '<li class="breadcrumb-item"><a class="catname text-dark" href="show-all.html?cat=' +
                    categoryname +
                    '">' +
                    categoryname +
                    "</a></li>" +
                    '<li class="breadcrumb-item"><a class="catname text-dark" href="show-all.html?cat=' +
                    categoryname +
                    "&sub_cat=" +
                    data.subcategoryname +
                    '">' +
                    subcat +
                    "</a></li>" +
                    '<li class="breadcrumb-item" aria-current="page">' +
                    data.name +
                    "</li>";
      /*          $(".breadcrumb").append(breadcrumbrow);*/
                $(".minus").click(function () {
                    var $input = $(this).parent().find("input");
                    var count = parseInt($input.val()) - 1;
                    count = count < 1 ? 1 : count;
                    $input.val(count);
                    $input.change();
                    return false;
                });
                $(".plus").click(function () {
                    var $input = $(this).parent().find("input");
                    $input.val(parseInt($input.val()) + 1);
                    $input.change();
                    return false;
                });
                //if (data.different_value) {
                //    var dup_products_weight = data.different_value;
                //    var dup_weight_array = dup_products_weight.split(",");
                //    var dup_products_id = data.different_id;
                //    var dup_products_array = dup_products_id.split(",");
                //    var dup_products_price = data.different_price;
                //    var dup_price_array = dup_products_price.split(",");
                //    var dup_product_gender = data.different_Gender;
                //    var dup_Gender_array = dup_product_gender.split(",");
                //    var dup_product_stock = data.different_stock(",")
                //    var dup_stock_array = dup_product_stock.split(",")
                //    if (
                //        data.different_dimension != null ||
                //        data.different_dimension != undefined
                //    ) {
                //        var dubdimension = data.different_dimension;
                //        var dubdimension_array = dubdimension.split(",");
                //    } else {
                //        var dubdimension = data.dimension;

                //    }
                //    var class_name = "";
                //    //var dup_product =
                //    //    '<h5 class="mb-2">View All "' +
                //    //    data.name +
                //    //    '"</h5><span  class="" id="dup_products"></span><div class="marg_bttm"></div>';

                //        //'<h6 class="mb-2 pt-3 d-flex flex-row justify-content-between selectSize ">Select Size <span><a style="text-decoration:underline!important;color:#70b4bd;font-size:12px;cursor:pointer;font-weight:bold !important;" id="ozml">OZ to ML Converter</a></span></h6><span  class="" id="dup_products"></span><div class="marg_bttm"></div>';
                //    var dup_product = '<h6 class="mb-2 pt-3 d-flex flex-row justify-content-between selectSize">Select Size ' +
                //        '<span class="d-flex flex-row">' +
                //        '<span id="gender" style="margin-right:10px;">Gender</span>' +
                //        '<span id="stock" style="margin-right:10px;">Stock</span>' +
                //        '<a style="text-decoration:underline!important;color:#70b4bd;font-size:12px;cursor:pointer;font-weight:bold !important;" id="ozml">' +
                //        'OZ to ML Converter' +
                //        '</a>' +
                //        '</span>' +
                //        '</h6>' +
                //        '<span class="" id="dup_products"></span>' +
                //        '<div class="marg_bttm"></div>';


                //    $("#duplicate_product").append(dup_product);
                //    var org_products = '<span  class="" id="org_product"></span>';
                //    $("#orginal_products").append(org_products);
                //    var i = 0;
                //    //var getl = dup_weight_array.length;
                //    //alert(getl);

                //    for (i = 0; i <= 0; i++) {

                //    }
                //    $.each(dup_weight_array, function (Index, value) {
                //        // var getl = dup_weight_array.length;
                //        if (dup_products_array[i] == product_id) {
                //            class_name = "prod_weight lbquanty_kg_active";
                //        } else {
                //            class_name = "prod_weight lbquanty_kg";
                //        }
                //        if (dubdimension_array != null) {
                //            //$("#dup_products").append(
                //            //    '<p class="d-block dupProWidth"><a href="Productview.html?id=' +
                //            //    dup_products_array[i] +
                //            //    '"><span id=' +
                //            //    dup_products_array[i] +
                //            //    ' class="' +
                //            //    class_name +
                //            //    '"> <b>' +
                //            //    dubdimension_array[i] +
                //            //    '&nbsp;&nbsp;&nbsp;<span class="text-end">Price: $' +
                //            //    dup_price_array[i]+
                //            //    ".00</span></b></span></a><p>"
                //            //);
                //            $("#dup_products").append(
                //                '<p class="d-block dupProWidth1"><a href="Productview.html?id=' +
                //                dup_products_array[i] +
                //                '"><span id=' +
                //                dup_products_array[i] +
                //                ' class="' +
                //                class_name +
                //                ' d-flex justify-content-between align-items-center"> <b>' +
                //                dubdimension_array[i] +
                //                '</b><span class="text-end fw-bold"> $' +
                //                dup_price_array[i] +
                //                '.00</span></span></a><p>'
                //            );



                //        } else {
                //            $("#dup_products").append(
                //                '<p class="d-block dupProWidth"><a href="Productview.html?id=' +
                //                dup_products_array[i] +
                //                '"><span id=' +
                //                dup_products_array[i] +
                //                ' class="' +
                //                class_name +
                //                'd-flex justify-content-between align-items-center"><b>' +
                //                dubdimension +
                //                '&nbsp;&nbsp;&nbsp; <span class="text-end fw-bold">$' +
                //                dup_products_price +
                //                ".00</span></div></b></span></a></P>"
                //            );
                //        }

                //        i = i + 1;
                //    });
                //} else {
                //    //$("#aval").hide();
                //    var org_products = '<span  class="" id="org_product"></span>';
                //    $("#orginal_products").append(org_products);
                //}
                if (data.different_value) {
                    var dup_products_weight = data.different_value;
                    var dup_weight_array = dup_products_weight.split(",");
                    var dup_products_id = data.different_id;
                    var dup_products_array = dup_products_id.split(",");
                    var dup_products_price = data.different_price;
                    var dup_price_array = dup_products_price.split(",");
                    var dup_product_gender = data.different_Gender;
                    var dup_Gender_array = dup_product_gender ? dup_product_gender.split(",") : [];
                    var dup_product_stock = data.different_stock;
                    var dup_stock_array = dup_product_stock ? dup_product_stock.split(",") : [];
                    var dup_shades_array = data.different_Shade ? data.different_Shade.split(",") : [];


                    // Check for dimensions
                    var dubdimension_array = [];
                    if (data.different_dimension) {
                        var dubdimension = data.different_dimension;
                        dubdimension_array = dubdimension.split(",");
                    } else if (data.dimension) {
                        dubdimension_array = [data.dimension];
                    }

                    var class_name = "";

                    var dup_product = `
                                <h6 class="mb-2 pt-3 d-flex flex-row justify-content-between selectSize">
                                    Select Size
            
            
                                </h6>
                                <span class="" id="dup_products"></span>
                                <div class="marg_bttm"></div>
                            `;
                    //<a style="text-decoration:underline!important;color:#70b4bd;font-size:12px;cursor:pointer;font-weight:bold !important;" id="ozml">
                    //    OZ to ML Converter
                    //</a>
                    // Append the product display section
                    var openProductGender = (data.categoryname === "Women") ? "Female" : (data.categoryname === "Men") ? "Male" : "Unisex";

                    $("#duplicate_product").append(dup_product);
                    var stockText = data.stock > 0 ? "In Stock" : "Sold Out";
                    var org_products = '<span class="" id="org_product"></span>';
                    $("#orginal_products").append(org_products);

                    // ✅ Corrected dimension & shade selection logic
                    //$("#dup_products").append(`
                    //        <button class="dupProWidth1 openedProduct">
                    //            <a  href="Productview.html?id=${data.id}">
                    //                <span id="${data.dimension}" class="${class_name} d-flex justify-content-between align-items-center lbquanty_kg">
                    //                    <span class="size">
                    //                        ${data.subcategoryname === "MAKE UP" ? data.Shade : data.dimension}
                    //                    </span>
                    //                </span>
                    //            </a>
                    //            <span class="RemaingDupInforma">
                    //                <span class="d-flex flex-row justify-content-between">
                    //                    <span style="padding-right:10px"><b> Gender: </b> ${openProductGender} </span>
                    //                    <span><b> Stock: </b> ${stockText} </span> &nbsp;  &nbsp;
           
                    //                </span>
                    //                  ${data.subcategoryname === "MAKE UP" ? `<span><b> Size: </b> ${data.dimension}</span>` : ""} &nbsp;
                    //                  ${data.subcategoryname !== "FRAGRANCES" && data.subcategoryname !== "TESTERS" && data.subcategoryname !== "MAKE UP" ? `<span><b> Shade:</b> ${data.Shade}</span>` : ""}
                    //                <span class="fw-bold"><b> Price: </b>$${originalPrice}</span>
                    //            </span>
                    //        </button>
                    //    `);

                    // ✅ Loop through duplicate products
                    $.each(dup_weight_array, function (i, value) {
                        if (!dup_products_array[i] || !dup_price_array[i]) return;

                        var class_name = (dup_products_array[i] == product_id) ? "prod_weight lbquanty_kg_active" : "prod_weight lbquanty_kg";
                        var shadeText = dup_shades_array[i] || "";
                        var sizeText = value || "";
                        var genderText = dup_Gender_array[i] || "";
                        var stockText = dup_stock_array[i] || "";
                        var dimensionText = dubdimension_array[i] || "";
                        var dupstockText = stockText > 0 ? "In Stock" : "Sold Out";

                        // ✅ Corrected the logic for dimensions & shades
                        $("#dup_products").append(`
        <button class="dupProWidth1">
            <a href="Productview.html?id=${dup_products_array[i]}">
                <span id="${dup_products_array[i]}" class="${class_name} d-flex justify-content-between align-items-center">
                    <span>${data.subcategoryname === "MAKE UP" ? shadeText : dimensionText}</span>
                </span>
            </a>
            <span class="RemaingDupInforma">
                <span class="d-flex flex-row justify-content-between">
                    <span style="padding-right:10px"><b>Type: </b> ${genderText}</span>
                    <span><b>Stock: </b> ${dupstockText}</span> &nbsp;  &nbsp;
            </span>
                 ${data.subcategoryname === "MAKE UP" ? `<span><b> Size:</b> ${dimensionText}</span>` : ""} &nbsp;
                 ${data.subcategoryname !== "FRAGRANCES" && data.subcategoryname !== "TESTERS" && data.subcategoryname !== "MAKE UP" ? `<span><b> Shade:</b> ${shadeText}</span>` : ""}
           
                <span class="fw-bold"><b>Price: </b>$${dup_price_array[i]}.00</span>
            </span>
        </button>
    `);
                    });

                } else {
                    var org_products = '<span  class="" id="org_product"></span>';
                    $("#orginal_products").append(org_products);
                }


                if (data.id == product_id) {
                    class_name = "prod_weight lbquanty_kg_active";
                }
                $("#org_product").append(
                    '<a href="Productview.html?id=' +
                    data.id +
                    '"><span id=' +
                    data.id +
                    ' class="' +
                    class_name +
                    '">' +
                    data.quantity +
                    " <b>" +
                    data.dimension +
                    "</b></span></a>"
                );

                if (data.discount == "0") {
                    $(".disp_save").hide();
                    $(".mrp_prc").hide();
                    $(".product_dss").hide();
                }

                //$(".cart_btn").click(function () {
                //    var prod_id = $(this).attr("data");
                //    var qty = $("input[id =" + prod_id + "]").val();
                //    //var prev = $(this).parent().prev().find('input[type=number]');
                //    //var qty = $(prev).val();

                //    if (qty) {
                //        $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
                //        if (cart_id) {
                //            $.ajax({
                //                url: "https://api.americanfragrances.com/Cart/AddCart",
                //                type: "POST",
                //                data: {
                //                    cart_id: cart_id,
                //                    project_id: Project_Id,
                //                    product_id: prod_id,
                //                    quantity: qty,
                //                    couponname: couponLabel,
                //                },
                //                dataType: "JSON",
                //                async: false,
                //                crossDomain: true,
                //                success: function (data) {
                //                    if (data.responseCode == 1) {
                //                        cart_count(cart_id);
                //                        //$("#" + prod_id).val("");

                //                        $("#validationdiv").text(
                //                            "Product successfully added to cart"
                //                        );
                //                        $("#validationdiv").slideDown();
                //                        $("#validationdiv").delay(10000).slideUp();
                //                        $("#validationdiv").css("background", "#026633");
                //                        $(".addtocart").show();
                //                        //  $(".viewcart").show();
                //                        $(".dvcartbtns").show();
                //                        $(".btnsmall ").hide();
                //                    } else {
                //                        $("#validationdiv").text(data.responsemessage);
                //                        $("#validationdiv").slideDown();
                //                        $("#validationdiv").delay(10000).slideUp();
                //                        $("#validationdiv").css("background", "#dba23d");
                //                    }
                //                },
                //            });
                //        } else {
                //            $.ajax({
                //                url: "https://api.americanfragrances.com/Cart/AddCart",
                //                type: "POST",
                //                data: {
                //                    project_id: Project_Id,
                //                    product_id: prod_id,
                //                    quantity: qty,
                //                    couponname: couponLabel,
                //                },
                //                dataType: "JSON",
                //                async: false,
                //                crossDomain: true,
                //                success: function (data) {
                //                    if (data.responseCode == 1) {
                //                        cart_count(cart_id);
                //                        /*  $("#" + prod_id).val("");*/
                //                        localStorage.setItem("cart_id", data.cart_id);
                //                        cart_count(data.cart_id);
                //                        //$("#" + prod_id).val("");
                //                        $("#validationdiv").text(
                //                            "Product successfully added to cart"
                //                        );
                //                        $("#validationdiv").slideDown();
                //                        $("#validationdiv").delay(10000).slideUp();
                //                        $("#validationdiv").css("background", "#026633");

                //                        $(".dvcartbtns").show();
                //                        //$(".btnsmall ").hide();
                //                        //$(".addtocart").hide();
                //                        $(".viewcart").show();
                //                    } else {
                //                        $("#validationdiv").text(data.responsemessage);
                //                        $("#validationdiv").slideDown();
                //                        $("#validationdiv").delay(10000).slideUp();
                //                        $("#validationdiv").css("background", "#dba23d");
                //                    }
                //                },
                //            });
                //        }
                //    } else {
                //        $("input[id =" + prod_id + "]").css("border", "solid 1px red");
                //    }
                //});

                $.ajax({
                    url:
                        "https://api.americanfragrances.com/ProductAnalytics/GetAllFeedbackChartData?productid=" +
                        product_id,
                    method: "GET",
                    dataType: "json",
                    async: true,
                    success: function (chartData) {
                        debugger
                        // Chart configurations
                        const chartConfigs = [
                            { id: "style", question: "question1", type: "bar", indexAxis: "y", colors: ["#330000", "#550000", "#770000", "#990000", "#BB0000", "#DD0000", "#FF0000", "#FF2222", "#FF4444", "#FF6666"] },
                            { id: "flavor", question: "question2", type: "bar", indexAxis: "y", colors: ["#24408C", "#2B4D98", "#315AA3", "#3767AF", "#3E74BB", "#4471C6", "#4A7FD2", "#508CDE", "#5699E9", "#5CA7F5"] },
                            { id: "mood", question: "question3", type: "bar", indexAxis: "x", colors: ["#FFC800", "#FFD400", "#FFDD00", "#FFE62C", "#FFE956", "#FFEC80", "#FFF28C", "#FFF695", "#FFFC9F", "#FFFFA8"] },
                            { id: "season", question: "question4", type: "bar", indexAxis: "x", colors: ["#FF0066", "#FF1474", "#FF2880", "#FF3C8C", "#FF50A3", "#FF64AF", "#FF78BB", "#FF8CC7", "#FFA0D3", "#FFB4DF"] },
                            { id: "occ_chart", question: "question5", type: "bar", indexAxis: "y", colors: ["#4B5D26", "#416A2C", "#377736", "#2D843B", "#239142", "#199F48", "#0FAE4D", "#05BC53", "#00CA59", "#00D864"] },
                            { id: "age", question: "question6", type: "doughnut", indexAxis: null, colors: ["#006666", "#007373", "#008080", "#008B8B", "#009898", "#00A5A5", "#00B2B2", "#00BFBF", "#00CCCC", "#00D9D9"], appendElement: "#agedata" },
                            { id: "smell", question: "question7", type: "bar", indexAxis: "y", colors: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999"] },
                            { id: "longlast", question: "question8", type: "doughnut", indexAxis: null, colors: ["#190B0B", "#251210", "#321716", "#3E1D1C", "#4B2422", "#582B28", "#64312E", "#713835", "#7E3F3B", "#8B4641"], appendElement: "#timedata" },
                            { id: "time", question: "question9", type: "bar", indexAxis: "y", colors: ["#ff3300", "#ff4500", "#ff5722", "#ff6b3e", "#ff7f50", "#ff9363", "#ffaa77", "#ffc18b", "#ffd7a0", "#ffeaaf"] },
                            { id: "shape", question: "question10", type: "doughnut", indexAxis: null, colors: ["#703470", "#7D417D", "#8A498A", "#975297", "#A35BA3", "#B068B0", "#BD70BD", "#CA79CA", "#D682D6", "#E28AE2"], appendElement: "#shapeData" }
                        ];

                        chartConfigs.forEach(config => {
                            const chartDataObject = chartData[config.question];
                            if (chartDataObject && Array.isArray(chartDataObject.labels)) {
                                createChart(
                                    document.getElementById(config.id).getContext("2d"),
                                    config.type,
                                    chartDataObject,
                                    config.colors,
                                    config.indexAxis,
                                    config.appendElement
                                );
                            }
                        });
                    },
                    error: function () {
                        console.log("Failed to fetch review data.");
                    },
                });
                if (subcategoryname == "FRAGRANCES" || subcategoryname == "TESTERS") {

                    $.ajax({
                        url:
                            "https://api.americanfragrances.com/ProductAnalytics/GetBarcodeData?productid=" +
                            product_id,
                        type: "POST",
                        dataType: "json",
                        async: false,
                        success: function (response) {
                            // Assuming response.Data is the array of values and response.Labels is the array of labels
                            //$.each(response.Data, function (index, value) {
                            //    var label = response.Labels[index];
                            //    var width = (value / 12) * 100; // Adjust this calculation based on your data range
                            $("#barcodeview" + product_id).empty();
                            //var maxIndex = response.Data.indexOf(Math.max(...response.Data)); // Find the index of the highest value
                         //   var maxLabel = response.Labels[maxIndex]; // Get the label corresponding to the highest value

                            style = response.Products.Labels[0];
                            note = response.Products.Labels[1];
                            mood = response.Products.Labels[2];
                            season = response.Products.Labels[3];
                            occasion = response.Products.Labels[4];
                            ageGroup = response.Products.Labels[5];
                            smellIntensity = response.Products.Labels[6];
                            longevity = response.Products.Labels[7];
                            sprayTime = response.Products.Labels[8];
                            presentation = response.Products.Labels[9];


                            if (SubcatForSimilar == "FRAGRANCES") {
                                Type = "";
                            }

                            let baseUrl = "https://api.americanfragrances.com/Home/FilterProducts";
                            let filterObject = {
                                customerId: cust_auth || null,
                                subcategory: SubcatForSimilar,
                                style: style,
                                note: note,
                                mood: mood,
                                skip: 0,
                                take: 24,
                                season: season,
                                occasion: occasion,
                                ageGroup: ageGroup,
                                smellIntensity: smellIntensity,
                                longevity: longevity,
                                sprayTime: sprayTime,
                                presentation: presentation,
                                Type: Type
                            };

                            // Clean object
                            Object.keys(filterObject).forEach(key => {
                                if (filterObject[key] === undefined || filterObject[key] === null) {
                                    delete filterObject[key];
                                }
                            });
                            var ajaxData = filterObject;
                            // Construct final URL

                            debugger;
                            $.ajax({
                                url: baseUrl,
                                type: "POST",
                                data: ajaxData,
                                dataType: "JSON",
                                async: true,
                                crossDomain: true,
                                success: function (data) {
                                    var productCount = 0;
                                    $.each(data.Products, function (Index, value) {


                                        var product_id = value.id;
                                        var salePrice = parseFloat(value.price).toFixed(2);
                                        var originalPrice = parseFloat(value.rate).toFixed(2);
                                        var categoryname = value.categoryname;
                                        var brandname = value.brandname || value.BrandName;
                                        var stockStatus = value.stock != "0"
                                            ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>'
                                            : '<span class="btn out-of-stock-label">Sold Out</span>';

                                        i = i + 1;
                                        if (i < 50) {
                                            var newrowContent = '<div class="col-12"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '" ></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + brandname + '"><b><u>' + brandname + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>'

                                            $("#product_carosel").append(newrowContent);
                                            productCount++;
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
                                                $("#barcode" + product_id).append(newrow);
                                                $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
                                            } else {
                                                $("#barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                            }
                                            //rating or reviews
                                            var $starsContainer = $(".product_box.position-relative").find('.stars' + product_id); // Find the .stars element within the new review
                                            $starsContainer.empty();

                                            if (value.rating >= 4.6 && value.rating <= 5) {
                                                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                            } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                            } else if (value.rating >= 3.6 && value.rating <= 4) {
                                                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                            } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                            } else if (value.rating >= 2.6 && value.rating <= 3) {
                                                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                            } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                            } else if (value.rating >= 1.6 && value.rating <= 2) {
                                                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                            } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                            } else if (value.rating >= 0.6 && value.rating <= 1) {
                                                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                            } else if (value.rating >= 0 && value.rating <= 0.5) {
                                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                            } else {
                                                $starsContainer.append('<span>No reviews</span>'); // Clear the stars container if the rating doesn't match any range
                                            }
                                        }

                                    });
                                    if (productCount > 0) {
                                        $("#product_carosel").owlCarousel({
                                            loop: true,
                                            margin: 10,
                                            autoplay: false,
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
                                                    items: 4,
                                                    nav: true,
                                                    loop: true,
                                                },
                                            },
                                        });
                                    } else {
                                        // Optional: show a friendly message when there are no products
                                        $("#productCuroselNoProductsDiv").append('<center><img src="Images/empty_order.png"><h6><b>Currently, No Similar Products Are Available For This Product....</b></h6></center>');
                                    }

                                },
                                error: function (error) {
                                    // Handle any errors
                                    console.log(error);
                                }
                            });
                           

                            var newrow =
                                '<div class="progress-bar bg-ten" role="progressbar" style="width:' +
                                response.Products.Data[0] +
                                '%">' +
                                response.Products.Labels[0] + ": " +
                                response.Products.Data[0] +
                                "% <div class='amerifragtooltip'>Scent Style" +
                                '</div></div>' +
                                '<div class="progress-bar bg-fourty" role="progressbar" style="width:' +
                                response.Products.Data[1] +
                                '%"  >' +
                                response.Products.Labels[1] + ": " +
                                response.Products.Data[1] +
                                "%<div class='amerifragtooltip'> Key Note" +
                                '</div></div>' +
                                '<div class="progress-bar bg-thirty" role="progressbar" style="width:' +
                                response.Products.Data[2] +
                                '%">' +
                                response.Products.Labels[2] + ": " +
                                response.Products.Data[2] +
                                "%<div class='amerifragtooltip' >Conveyed Mood" +
                                '</div></div>' +
                                '<div class="progress-bar bg-fifty" role="progressbar" style="width:' +
                                response.Products.Data[3] +
                                '%">' +
                                response.Products.Labels[3] + ": " +
                                response.Products.Data[3] +
                                "%<div class='amerifragtooltip'>Season" +

                                '</div></div>' +
                                '<div class="progress-bar bg-twenty" role="progressbar" style="width:' +
                                response.Products.Data[4] +
                                '%">' +
                                response.Products.Labels[4] + ": " +
                                response.Products.Data[4] +
                                "%<div class='amerifragtooltip'>Occasion " +

                                '</div></div>' +
                                '<div class="progress-bar bg-ninety" role="progressbar" style="width:' +
                                response.Products.Data[5] +
                                '%">' +
                                response.Products.Labels[5] + ": " +
                                response.Products.Data[5] +
                                "%<div class='amerifragtooltip'> Age Group" +
                                '</div></div>' +
                                '<div class="progress-bar bg-sixty" role="progressbar" style="width:' +
                                response.Products.Data[6] +
                                '%">' +
                                response.Products.Labels[6] + ": " +
                                response.Products.Data[6] +
                                "%<div class='amerifragtooltip'>Fragrance Strength" +

                                "</div></div>" +
                                '<div class="progress-bar bg-seventy" role="progressbar" style="width:' +
                                response.Products.Data[7] +
                                '%">' +
                                response.Products.Labels[7] + ": " +
                                response.Products.Data[7] +
                                "%<div class='amerifragtooltip'>Scent Life" +

                                "</div></div></div>" +
                                '<div class="progress-bar bg-eighty" role="progressbar" style="width:' +
                                response.Products.Data[8] +
                                '%">' +
                                response.Products.Labels[8] + ": " +
                                response.Products.Data[8] +
                                "%<div class='amerifragtooltip'> Best Time to Wear" +

                                "</div></div></div>" +
                                '<div class="progress-bar bg-hundered" role="progressbar" style="width:' +
                                response.Products.Data[9] +
                                '%">' +
                                response.Products.Labels[9] + ": " +
                                response.Products.Data[9] +
                                "%<div class='amerifragtooltip'>Bottle Design" +

                                "</div></div></div>";
                            $("#barcodeview" + product_id).append(newrow);
                           // $("#highestValueLabel").text(maxLabel); // Display the highest value label

                            //});
                        },
                        error: function (error) {
                            console.log("Error:", error);
                        },
                    });
                }



                var $starsContainer = $("#productview").find(".stars"); // Find the .stars element within the new review

                if (data.rating >= 4.6 && data.rating <= 5) {
                    $starsContainer.append(
                        '<img src="/images/stars/5star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 4.1 && data.rating <= 4.5) {
                    $starsContainer.append(
                        '<img src="/images/stars/4.5star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 3.6 && data.rating <= 4) {
                    $starsContainer.append(
                        '<img src="/images/stars/4star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 3.1 && data.rating <= 3.5) {
                    $starsContainer.append(
                        '<img src="/images/stars/3.5star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 2.6 && data.rating <= 3) {
                    $starsContainer.append(
                        '<img src="/images/stars/3star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 2.1 && data.rating <= 2.5) {
                    $starsContainer.append(
                        '<img src="/images/stars/2.5star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 1.6 && data.rating <= 2) {
                    $starsContainer.append(
                        '<img src="/images/stars/2star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 1.1 && data.rating <= 1.5) {
                    $starsContainer.append(
                        '<img src="/images/stars/1.5star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 0.6 && data.rating <= 1) {
                    $starsContainer.append(
                        '<img src="/images/stars/1star.png" class="img-fluid">'
                    );
                } else if (data.rating >= 0 && data.rating <= 0.5) {
                    $starsContainer.append(
                        '<img src="/images/stars/0.5star.png" class="img-fluid">'
                    );
                } else {
                    $starsContainer.empty(); // Clear the stars container if the rating doesn't match any range
                }
            },
        });
        var question1 = {
            Vintage: "A Vintage fragrance that transports you to a bygone era with its timeless blend of classic and elegant notes",
            Bohemian: "A Bohemian-style fragrance that encapsulates the free-spirited, electric allure of its unique unconventional charm",
            Chic: "A Chic fragrance that embodies sophistication and modernity with its clean, minimalist, and effortlessly elegant scent",
            Artsy: "An Artsy fragrance that combines avant-garde and eclectic notes to evoke a sense of creativity and individuality",
            Sexy: "A Sexy fragrance that is a seductive and alluring blend of sensuous notes that exudes confidence and allure",
            Casual: "A Casual scent that is light and easygoing, perfect for everyday wear with a calm and refreshing aroma",
            Rocker: "A Rocker fragrance that is bold, featuring edgy and intense notes that capture the essence of the rock 'n' roll spirit",
            Preppy: "A Preppy fragrance that is lively and vibrant with energizing and invigorating notes that add a dash of enthusiasm to any day",
            Classic: "A Classic style fragrance that exudes sophistication with a rich blend of elegant and luxurious notes that epitomize timeless beauty",
            Other: "A fragrance that offers a subtly Distinctive aroma that whispers individuality with some intriguing notes"
        };
        var question5 = {
            Dating: "Ideal for elevating a Romantic date, it leaves a long and captivating impression by setting the stage for an unforgettable special evening",
            Wedding: "Ideal for attending a Wedding, it symbolizes the significance of the joyous occasion, adding an elegant touch to your presence",
            Partying: "Ideal for a fun Night Out, it exudes a vibrant and captivating scent that perfectly complements the party's lively atmosphere",
            Professional: "Ideal for a Professional setting, it exudes a sophisticated and poised scent that adds a touch of confidence to your demeanor",
            'Sports & Gym': "Ideal for a Game or daily Workout, it offers a fresh and energizing scent that complements your active lifestyle and boosts your motivation",
            Travel: "Ideal for enhancing your Travels, it embodies the spirit of exploration with its versatile scent that is perfect for an on-the-go occasion",
            Adventures: "Ideal for a fun Adventure, its exhilarating scent amplifies the thrill of exploration, adding an extra layer of excitement to your journey.",
            'Family Gathering': "Ideal for special Family Gatherings, it adds a touch of warmth that enhances the togetherness of cherished moments spent together",
            Religious: "Ideal for Religious occasions, its subtle and reverent scent enhances the solemnity and spirituality of the event and sacred moments",
            'Any Occasion': "Ideal for Any Occasion, it compliments a wide range of experiences and adds an exquisite touch to your presence wherever you go"
        };
        var question3 = {
            Romantic: "This scent conveys a Romantic aura that evokes an intimate and passionate mood that is enveloped in love and affection",
            Energizing: "This scent conveys an Energizing aura that uplifts the spirit with its zesty and vibrant notes, creating a dynamic and revitalizing mood",
            Calming: "This scent conveys a Calming aura that envelopes you in a tranquil and serene mood with its soothing and gentle notes",
            Sensual: "This scent conveys a Sensual aura that ignites a seductive and alluring mood and evokes passion and desire with its rich and intoxicating notes",
            Fresh: "This scent conveys a Fresh aura that creates a revitalizing and invigorating mood with its clean and crisp notes that evoke a sense of rejuvenation",
            Adventurous: "This scent conveys an Adventurous aura that inspires a daring and exploratory mood with bold notes that ignite a sense of wanderlust",
            Playful: "This scent conveys a Playful aura that captures a joyful and light-hearted mood with its whimsical notes that create a sense of fun and spontaneity",
            Mysterious: "This scent conveys a Mysterious aura that envelops you in an enigmatic and captivating mood with its alluring notes that inspire fascination and curiosity",
            Confident: "This scent conveys a Confident aura that exudes self-assuredness with its bold and charismatic notes that evoke a sense of grace and poise",
            Other: "This scent is a Versatile fragrance that can seamlessly adapt to any mood with a harmonious blend of balanced notes that make you feel your best"
        };
        var question2 = {
            Citrus: "It has prominent Citrus notes that are fresh and vibrant, resembling the zesty and tangy aroma of citrus fruits like lemons, oranges, and limes",
            Floral: "It has prominent Floral notes that evoke the enchanting and diverse scents of blooming flowers",
            Fruity: "It has prominent Fruity notes that are a luscious medley of sweet and succulent aromas that add a playful and vibrant element to the fragrance",
            Herbaceous: "It has prominent Herbaceous notes that offer a green and invigorating aroma, reminiscent of fresh-cut herbs, giving it a natural and revitalizing quality",
            Spicy: "It has prominent Spicy notes that have a warm and aromatic essence, reminiscent of exotic spices and herbs that add a deep touch",
            Woody: "It has prominent Woody notes that have an earthy essence with warm scents of various types of wood that add a sense of depth to the aroma",
            Amber: "It has prominent Amber notes with a warm and resinous aroma, featuring a sweet, earthy, and slightly musky scent that adds sensuality to the fragrance",
            Gourmand: "It has prominent Gourmand notes that mimic the sweet aromatic scents of edible delights like vanilla, caramel, and chocolate",
            Oriental: "It has prominent Oriental notes that are a complex and exotic blend of warm, spicy, and resinous scents that add a sensuous and mysterious aura",
            Aquatic: "It has prominent Aquatic notes with crisp scents of the sea, water, and marine elements, adding a refreshing and breezy quality to the fragrance"
        };
        var question4 = {
            Spring: "It is perfect for the Spring as it embraces the blooming beauty of nature and compliments the vibrant atmosphere of this time of year",
            Rainy: "It is a delightful choice for the Rainy season, adding a touch of comfort to the cool and drizzly days for those cozy indoor moments",
            Monsoon: "It beautifully captures the essence of the Monsoon season, evoking a sense of refreshing tranquility amidst the rain and lush greenery",
            'Pre-Summer': "It perfectly complements the Pre-Summer season with its transitional charm of the warmth and energy of the approaching summer days",
            Summer: "It's perfect for the Summer with its refreshing and uplifting aura that captures the spirit of long sun-kissed days and balmy evenings",
            Fall: "It's perfect for the Fall with its cozy and earthy fall ambiance, perfect for brisk walks through falling leaves and pumpkin-spiced moments",
            'Pre-Winter': "It perfectly compliments the Pre-Winter season with its warm aura that anticipates the approaching chilly days and cozy moments",
            Winter: "It's perfect for the Winter as it wraps you in a cozy aura that beautifully complements the chilly elegance and festive enchantment of the season",
            Snowy: "It's perfect for the Snowy season as it encapsulates you in a magical and comforting embrace that complements the serene beauty of a white winter",
            'Any Season': "It's a timeless choice for Every Season with an adaptable scent that seamlessly complements the shifting tones and ambiance of each time of year"
        };
        var question7 = {
            Negligible: "This fragrance is mostly Negligible, almost like a secret with an enigmatic aura, revealing its gentle essence only to those who draw close",
            Faint: "This is a Faint fragrance that embodies a soft and ethereal aura, creating an atmosphere of tranquility and serenity",
            Delicate: "This is a Delicate fragrance that envelopes you in a cloud of gentle elegance, designed to accentuate your grace and charm",
            Subtle: "This is a Subtle fragrance that has nuanced notes that unfold lightly, leaving an impression that's both tender and enduring",
            Mild: "This is a Mild fragrance that offers a comforting aura that feels like a warm hug, providing a reassuring presence throughout your day",
            Moderate: "This is a Moderately intense fragrance that is neither too imposing nor too shy, making it adaptable to any occasion.",
            Balanced: "This fragrance has a Balanced intensity that strikes the perfect equilibrium of aroma with its well-rounded and harmonious scent",
            Strong: "This fragrance has a Strong intensity that asserts confidence with its powerful notes that make a statement wherever you go",
            Intense: "This is an Intense fragrance that is bold and captivating and demands attention with a mysterious sophistication that lingers wherever you go",
            Unknown: "This fragrance's intensity is Unknown with an enigmatic blend that is undiscovered, inviting curiosity with every hint of its aroma."
        };
        var question8 = {
            Fleeting: "It's normally Fleeting and disappears quite quickly, typically within an hour or less, like a delicate whisper of scent",
            'Short-lasting': "It’s normally Short-lasting and accompanies you for a few pleasant hours before fading away",
            Moderate: "It normally lasts for a Moderate time of 4 to 6 hours before it fades away, perfect for casual evenings",
            Lasting: "It normally lasts for a Substantial part of the day and lingers for around 8 hours before fading away",
            'Half-day': "It normally lasts for Half the day with its gentle lingering presence, perfect for a normal working day",
            Extended: "It normally lasts for an Extended amount of time, which ensures you stay captivating well into the evening",
            'All-day': "It normally lasts All Day and lingers on by keeping you enveloped in its aroma from dawn to dusk",
            Enduring: "It normally Endures from the morning well into the night and remains highly distinctive, perfect for special occasions",
            Persistent: "It's normally Persistent and lingers on your skin and clothes, creating a long-lasting aroma that leaves a distinctive trail wherever you go",
            Indomitable: "It's normally Indomitable as it is powerful and retains its aroma for an extraordinary amount of time, leaving an unforgettable trail"
        };
        var question9 = {
            Morning: "Mostly worn in the Morning, it begins your day with a pleasant aroma that awakens your senses and boosts your mood",
            Daytime: "Mostly worn during the Day, its subtle scents bring a pleasant and refreshing aura that's perfect for work or casual activities",
            Lunchtime: "Mostly worn during Lunchtime, its rejuvenating aroma leaves you feeling refreshed and confident for the afternoon ahead",
            Afternoon: "Mostly worn in the Afternoon, its refreshing and vibrant aura perfectly complements the day's energy and mood",
            Evening: "Mostly worn in the Evening, its rich and alluring aroma perfectly enhances the mood and elegance of nighttime occasions",
            Dinnertime: "Mostly worn during Dinnertime, its inviting aroma enhances the dining experience and adds an extra layer of allure to evening gatherings",
            Night: "Mostly worn at Night, its captivating and sensual aura harmonizes seamlessly with the mystique and allure of the starry night",
            'Late Night': "Mostly worn Late in the Night, it's perfect for late-night adventures with its sensual and mysterious aura, adding an alluring touch to the twilight hours.",
            Bedtime: "Mostly worn at Bedtime, its calming aroma enhances your relaxation and prepares you for a peaceful night's sleep",
            'Any Time': "Mostly worn at Any Time of the day, its versatile scent seamlessly transitions from morning to night and compliments your personal style"
        };
        var question6 = {
            'Under 10': "It's mostly favored by children under the age of 10 as it has a subtle and playful aroma",
            '10 - 16': "It's mostly favored by Teenagers as it captures their emerging sense of style with a youthful scent that resonates with them",
            '16 - 21': "It's mostly favored by late teens and Young Adults as it reflects their evolving tastes and resonates with their sense of self-expression",
            '21 - 30': "It's mostly favored by young individuals in their 20s as it reflects their vibrant and youthful energy and fun dynamic lifestyles",
            '30 - 40': "It's mostly favored by individuals in their 30s as it reflects their maturity and dissenting tastes that complement their evolving lifestyles",
            '40 - 50': "It's mostly favored by individuals in their 40s as it resonates with their refined and confident personas and compliments their established lifestyles",
            '50 - 60': "It's mostly favored by individuals in their 50s as it embodies a classic and elegant enduring aura that aligns with their refined lifestyles",
            '60 - 70': "It's mostly favored by individuals in their 60s as it reflects their timeless and sophisticated tastes that resonate with an enduring sense of grace",
            '70 - 80': "It's mostly favored by individuals in their 70s as it mirrors their enduring and distinctive taste that aligns with their lifelong experiences",
            'Any Age': "It's a timeless favorite by people of All Ages as it has a universally appealing aura that seamlessly complements a wide array of tastes and lifestyles"
        };
        var question10 = {
            Stylish: "Its overall Stylish presentation showcases a seamless blend of trendy aesthetics, epitomizing a chic and sophisticated allure",
            Elegant: "Its overall Elegant presentation exudes timeless elegance through its graceful design that conveys a sense of sophistication and prestige",
            Modern: "Its overall Modern presentation features contemporary and innovative designs that convey a sense of freshness and cutting-edge style",
            Luxurious: "Its overall Luxurious presentation exudes opulence and extravagance with its exquisite craftsmanship that showcases grandeur and sophistication",
            Artistic: "Its overall Artistic presentation showcases imaginative and unique design elements that evoke a sense of creativity and aesthetic beauty",
            Rustic: "Its overall Rustic presentation has a charming appeal with earthy tones and organic textures that evoke a sense of natural beauty",
            Antique: "Its overall Antique presentation has a timeless charm that features historical design elements that harken back to an era of old-time elegance",
            Vintage: "Its overall Vintage presentation captures the essence of classic designs and nostalgic charm that transports you to an era of timeless sophistication",
            Unique: "Its overall Unique presentation is one-of-a-kind and features distinctive and imaginative details that set it apart and ignite curiosity",
            Other: "Its overall presentation is unique and Unconventional, leaving an air of unpredictability and intrigue around its aesthetics"
        };
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetMostOccurredOptions?productId=" + product_id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                var data1 = {
                    question1: data.question1
                };
                //question2 is 5th
                var data2 = {
                    /*question2: data.question4*/
                    question2: data.question2
                };
                var data3 = {
                    question3: data.question3
                };
                //question4 is 2
                var data4 = {
                    /* question4: data.question5*/
                    question4: data.question4
                };
                //question5 is 4
                var data5 = {
                    /* question5: data.question2*/
                    question5: data.question5
                };
                //question6 is 7
                var data6 = {
                    /* question6: data.question9*/
                    question6: data.question6
                };
                var data7 = {
                    /*question7: data.question6*/
                    question7: data.question7
                };
                var data8 = {
                    /*question8: data.question7*/
                    question8: data.question8
                };
                var data9 = {
                    /*question9: data.question8*/
                    question9: data.question9
                };
                var data10 = {
                    question10: data.question10
                };
                var fragranceDescription1 = question1[data1.question1];
                var fragranceDescription2 = question2[data2.question2];
                var fragranceDescription3 = question3[data3.question3];
                var fragranceDescription4 = question4[data4.question4];
                var fragranceDescription5 = question5[data5.question5];
                var fragranceDescription6 = question6[data6.question6];
                var fragranceDescription7 = question7[data7.question7];
                var fragranceDescription8 = question8[data8.question8];
                var fragranceDescription9 = question9[data9.question9];
                var fragranceDescription10 = question10[data10.question10];
                 
                var text = '<p style="font-size:17px; text-align:justify;margin-bottom:0px !important;">' + fragranceDescription1 + '. ' + fragranceDescription2 + '. ' + fragranceDescription3 + '  ' + fragranceDescription4 + '. ' + fragranceDescription5 + '. ' + fragranceDescription6 + '. ' + fragranceDescription7 + '. ' + fragranceDescription8 + '. ' + fragranceDescription9 + '. ' + fragranceDescription10 + ',essence that defines our collection, designed to enhance your every moment.</p>';
                $(".detailtext").append(text);

            }
        });
    }

    //-----------------------------------Similar Products with Barcode----------------------------------------------//














    if (product_id == couponAppliedProductID) {

        $(".couponAppliedText").removeClass("d-none");
        var couponAppliedText = "20% Coupon ‘AFRAGSC20’ Applied";
        $(".couponAppliedText").text(couponAppliedText);
        var CouponAmount = localStorage.getItem("CouponAmount");
        var couponHeadingtext = "Special Sale Price: $" + CouponAmount;
        $(".couponUnlockBt").text(couponHeadingtext);
        $('.couponUnlockBt').css({
            'background': 'transparent',
            'font-size': '20px'
        });
        var couponAppliedProductDiscount = localStorage.getItem("couponAppliedProductDiscount");
        var DiscountAmount = localStorage.getItem("DiscountAmount");
        var discount_price = localStorage.getItem("discount_price");
        $("#saveText").empty();
        var totalDiscount = 20 + parseInt(couponAppliedProductDiscount);
        var totalSave = parseInt(discount_price) + parseInt(DiscountAmount);
        var saveText = "SAVE: $" + parseFloat(totalSave).toFixed(2) + " (" + totalDiscount + "% Off)";
        $("#saveText").append(saveText);

    }


    //coupons    
    $("#apply_btn").click(function () {
        var coupontxt = $(".coupons").val();

        $.ajax({
            url:
                "https://api.americanfragrances.com/Cart/Couponcheck?project_id=" +
                Project_Id +
                "&authorid=" +
                cust_auth +
                "&cart_id=" +
                cart_id +
                "&couponname=" +
                coupontxt +
                "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data.responseCode == 1) {
                    var discount = data.discount;
                    var disamt = data.discountamount;
                    var ttlamt = $("#total_cart_amount").val();

                    var finalamt = ttlamt - disamt;
                    $("#total_cart_amount").val(finalamt);
                    var grandttl = $("#total_cart_amount").val();

                    //var delcharge = "30";
                    //if (grandttl < 850) {

                    //    var grndgrndttl = grandttl + delcharge;

                    //}
                    $(".paybutton span").html(grandttl);
                    $(".cart_tot").html(grandttl);
                    $("#paymentamount").html(grandttl);

                    $("#validationdiv").text(coupontxt + " Coupon Applied successfully");
                    $(".coupons").val("");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#9FC443");

                    // Disable the button after applying the coupon
                    $(".apply_btn").prop("disabled", true);
                    $(".clear").css("display", "block");
                } else if (data.responseCode == 6) {
                    $("#validationdiv").text("Please Login");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#ff0000");
                } else {
                    $("#validationdiv").text("Invalid Coupon");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#ff0000");
                }
            },
        });
    });
    
   


    //wishlist
    $(".notify").on('click', '.wishlist-add', function () {
        var prod_id = $(this).attr("data");
        if (wishlist_id) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: {
                    project_id: Project_Id,
                    product_id: prod_id,
                    authorid: cust_auth,
                },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {

                    data.responsemessage;
                    console.log(data);
                    if (data.responseCode == 1) {
                        wishlist_count(cust_auth);
                        alert("We will update after product stock updated");
                        $("#validationdiv").text("We will update after product stock updated");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(300).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        var loc = location.href;
                        console.log(loc);
                        location.href = loc;
                    } else {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                    }
                },
            });
        } else {
            if (cust_auth) {
                wishlist_index(cust_auth);
            } else {
                window.location.href = "home.html?login=1";
                $("#noproductss").html(
                    '<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Oops, Your Wishlist is Empty </b><p><br>'
                );
            }
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: {
                    project_id: Project_Id,
                    product_id: prod_id,
                    authorid: cust_auth,
                },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    data.responsemessage;
                    console.log(data);
                    if (data.responseCode == 1) {
                        localStorage.setItem("wishlist_id", data.cart_id);
                        wishlist_count(cust_auth);

                        $("#validationdiv").text("We will update after product stock updated");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        var loc = location.href;
                        console.log(loc);
                        location.href = loc;
                    } else {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                    }
                },
            });
        }
    });
    $(document).on("click", ".wishlist-add-view", function () {

        //$(".title_sec").on('click', '.wishlist-add', function () {
        var prod_id = $(this).attr("data");
        if (wishlist_id) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: {
                    project_id: Project_Id,
                    product_id: prod_id,
                    authorid: cust_auth,
                },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    data.responsemessage;
                    console.log(data);
                    if (data.responseCode == 1) {
                        wishlist_count(cust_auth);
                        //   alert("Product Added Successfully To Wishlist");
                        $("#validationdiv").text("Product Added Successfully To Wishlist");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(300).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        window.location.href = location.href;

                    } else {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                    }
                },
            });
        } else {
            if (cust_auth) {
                wishlist_index(cust_auth);
                $.ajax({
                    url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                    type: "POST",
                    data: {
                        project_id: Project_Id,
                        product_id: prod_id,
                        authorid: cust_auth,
                    },
                    dataType: "JSON",
                    async: false,
                    crossDomain: true,
                    success: function (data) {
                        data.responsemessage;
                        console.log(data);
                        if (data.responseCode == 1) {
                            localStorage.setItem("wishlist_id", data.cart_id);
                            wishlist_count(cust_auth);

                            $("#validationdiv").text("Product Added Successfully To Wishlist");
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(3000).slideUp();
                            $("#validationdiv").css("background", "#026633");
                            var loc = location.href;
                            console.log(loc);
                            location.href = loc;
                        } else {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(3000).slideUp();
                            $("#validationdiv").css("background", "#dba23d");
                        }
                    },
                });
            } else {
                $("#loginpopup").modal('show');
                $("#noproductss").html(
                    '<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Oops, Your Wishlist is Empty </b><p><br>'
                );
            }

        }
    });
    function wishlist_index(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url:
                    "https://api.americanfragrances.comProductAnalytics/Index?project_id=" +
                    Project_Id +
                    "&authorid=" +
                    cust_auth,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    $("#productdvs").empty();
                    if (data.length > 0) {
                        $.each(data, function (Index, value) {
                            var prodid = value.product_id;
                            let item =
                                '<div class="col-md-3"><div class="card"><a class="remove-del" data="' +
                                value.id +
                                '"><i class="fa-solid fa-trash-can"></i></a><a class="cart cart_btn" data="' +
                                value.id +
                                '"><i class="fa fa-bag-shopping"></i></a><a href="Productview.html?id=' +
                                value.product_id +
                                '"><img class="card-img-top" src="' +
                                value.display_image +
                                '" alt="' +
                                value.name +
                                '"></a></div><div class="detailsdiv' +
                                value.product_id +
                                '" id="' +
                                value.id +
                                '"><input type="hidden" class="details" data="' +
                                value.product_id +
                                '"></div></div>';
                            //getdetails();

                            //var prodid = $(".details").attr("id");
                            //if (prodid) {
                            //    $.ajax({
                            //        url: "https://api.americanfragrances.comHome/Productview?project_id=" + Project_Id + "&id=" + prodid + "",
                            //        type: "GET",
                            //        dataType: "JSON",
                            //        async: false,
                            //        crossDomain: true,
                            //        success: function (value1) {
                            //            //$.each(data1, function (Index, value1) {
                            //            //var details = ;
                            //            //$(".detailsdiv").append(details);
                            //            $(".detailsdiv").append('<p class="product-name">' + value1.name + '</p><p class="fit-name">' + value1.categoryname + '</p><div class="d-flex justify-content-center"><div class="sale_price"><p>$' + value1.price + '</p></div><div class="org_price"><strike><p>$' + value1.rate + '</p></strike></div><div class="discount"><p>(' + value1.discount + '% Off)</p></div></div><p class="offer_price_text">Offer Price $' + value1.discount_price + '</p>');
                            //            // });
                            //        }
                            //    });
                            //};
                            //getdetails();
                            $("#productdvs").append(item);
                        });

                        ////var prodid = value.product_id;
                        //
                    } else {
                        $("#noproductss").html(
                            '<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Your Wishing List is currently empty.</b><br><br><a href="home.html"><button class="btn btnproceed">RETURN TO SHOP</button></a><p><br>'
                        );
                    }
                },
            });
        }
    }
    //stock notify me
    $("#productview").on("click", ".notifyback", function () {
        $("#stockPopup").modal("show");
    });
    $("#stockForm").submit(function () {
        var userEmail = $("#st-user-email").val();
        var phone = $("#st-phoneNumber").val();


        $.ajax({
            url: "https://api.americanfragrances.com/Customer/NotifyMe",
            type: "POST",
            data: {
                project_id: Project_Id,
                authorid: cust_auth,
                email: userEmail,
                phonenumber: phone,
                product_id: product_id,
            },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                $("#st-user-email").empty();
                if (returndata.responseCode == 0) {
                    $("#validationdiv2").text("");
                    $("#validationdiv2").text(returndata.responsemessage);
                    $("#validationdiv2").slideDown();
                    $("#validationdiv2").delay(10000).slideUp();
                    $("#validationdiv2").css("background", "orange");
                    $("#st-user-email").val("");
                    $("#st-phoneNumber").val("");

                    $("#stockPopup").modal("hide");
                    var loc = window.location;
                    window.location = loc;

                } else {
                    $("#logindateerror2").text("");
                    $("#logindateerror2").text(returndata.responsemessage);
                    $("#logindateerror2").slideDown();
                    $("#logindateerror2").delay(5000).slideUp();
                }
            },
        });
    });

    //Reviews
    $("#productview").on("click", ".wrt_review", function () {
        if (cust_auth == null || cust_auth == undefined) {
            $("#loginpopup").modal('show');
        } else {
            $("#reviewpopup").modal("show");
        }

    });

    $("#review").submit(function () {
        var name = $("#username").val();
        var comment = $("#reviewtxt").val();
        var rating = $("input[name='experience']:checked").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Review/Create",
            type: "POST",
            data: {
                project_id: Project_Id,
                authorid: cust_auth,
                comment: comment,
                title: name,
                rating: rating,
                product_id: product_id,
            },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                $("#custemail").empty();
                if (returndata.responseCode == 1) {
                    $("#validationdiv").text("");
                    $("#validationdiv").text(returndata.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    $("#username").val("");
                    $("#reviewtxt").val("");
                    $("input[name='experience']:checked").prop("checked", false);
                    $("#reviewpopup").modal("hide");
                    var loc = window.location;
                    window.location = loc;
                } else if (returndata.responseCode == 0) {
                    window.location = "home.html?login=1";
                } else {
                    $("#logindateerror").text("");
                    $("#logindateerror").text(returndata.responsemessage);
                    $("#logindateerror").slideDown();
                    $("#logindateerror").delay(5000).slideUp();
                }
            },
        });
    });

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
            if (data.length == 0) {
                /* $("#reviews").empty();*/
                $("#noReviewsDiv").append('<center><img src="Images/empty_order.png"><h6><b>" Currently, No Reviews Available.... "</b></h6></center>');
            } else {
                $("#noReviewsDiv").empty();
                $.each(data, function (Index, value) {

                    let dateObject = new Date(value.createdon);

                    // Extract the month, day, and year
                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                    let formattedDate = dateObject.toLocaleDateString('en-US', options);

                    console.log(formattedDate);
                    var newrowContent =
                        '<div class="item" style="background:#EBEBEB !important;box-shadow: 0px 4px 4px 0px #00000040 !important;">' +
                        '<div class="stars pt-3" style="width: 100%; display: flex; justify-content: center; align-items: center;"></div>' +
                        '<div class="card testim_box" style="background:#EBEBEB !important;">' +
                        '<div class="card-footer" style="border:none;background:#EBEBEB !important;">' +
                        '<div class="row px-4">' +
                        '<div class="col-md-12 justify-content-center text-center" >' +
                        '<p class="user_name m-0 "><b> - ' + (value.name || "") + '</b></p>' +
                        '<p class="pt-2">On ' + formattedDate + '</p>' +
                        '<p class="pt-3 pl-4 pr-4 reviewtext text-center">' + (value.comment || "") + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';


                    var $newReview = $(newrowContent); // Create a jQuery object for the new review

                    $("#reviews_carousel").append($newReview); // Append the new review to the container

                    var $starsContainer = $newReview.find(".stars"); // Find the .stars element within the new review

                    if (value.rating >= 4.6 && value.rating >= 5) {
                        $starsContainer.append('<img src="/images/stars/5star.png" style="width:25%" >');
                    } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                        $starsContainer.append('<img src="/images/stars/4.5star.png" style="width:25%" >');
                    } else if (value.rating >= 3.6 && value.rating <= 4) {
                        $starsContainer.append('<img src="/images/stars/4star.png" style="width:25%" >');
                    } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                        $starsContainer.append('<img src="/images/stars/3.5star.png" style="width:25%">');
                    } else if (value.rating >= 2.6 && value.rating <= 3) {
                        $starsContainer.append('<img src="/images/stars/3star.png" style="width:25%" >');
                    } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                        $starsContainer.append('<img src="/images/stars/2.5star.png" style="width:25%" >');
                    } else if (value.rating >= 1.6 && value.rating <= 2) {
                        $starsContainer.append('<img src="/images/stars/2star.png" style="width:25%">');
                    } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                        $starsContainer.append('<img src="/images/stars/1.5star.png" style="width:25%">');
                    } else if (value.rating >= 0.6 && value.rating <= 1) {
                        $starsContainer.append('<img src="/images/stars/1star.png" style="width:25%">');
                    } else if (value.rating >= 0 && value.rating <= 0.5) {
                        $starsContainer.append('<img src="/images/stars/0.5star.png" style="width:25%">');
                    } else {
                        $starsContainer.empty(); // Clear the stars container if the rating doesn't match any range
                    }
                });
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

    $("#reviews_carousel").owlCarousel({
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
                items: 2,
                nav: false,
                loop: true,
            },
        },
    });

    //Reviews
   
    //---------------------------------------Active class for images Method--------------------------------------------//
    $("#product_images div").click(function () {
        console.log(this.className);
        var active_class = this.className;
        var active_id = this.id;
        if (active_class.includes("columnactive")) {
            $(this).removeClass("columnactive");
        } else {
            $("#product_images div").removeClass("columnactive");
            $(this).addClass("columnactive");
        }
    });
    $("#productview").on("click", "#ozml", function () {
        $("#ozmlpopup").modal("show");
    });
    //---------------------------------------add cart ajax Method--------------------------------------------//

    $(".dvcartbtns").hide();

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
                async: false,
                crossDomain: true,
                success: function (data) {
                    $(".cart_count").html(data);
                },
            });
        }
    }
    function wishlist_count(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=" + Project_Id + "&authorid=" + cust_auth + "",
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    $(".wishlist_count").html(data);
                },
            });
        }
    }

    //---------------------------------------Similar product slick slider ajax Method--------------------------------------------//
    //-------------------Analytics-------------------------------//
    function createChart(ctx, chartType, chartData, colorPalette, indexAxis, appendElement = null) {
        var colors = chartData.labels.map(
            (label, index) => colorPalette[index % colorPalette.length]
        );

        const chartOptions = {
            maintainAspectRatio: false, // ADD THIS LINE
            responsive: true, // ensure chart is responsive
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var value = context.raw;
                            var dataset = context.dataset.label || "";
                            return dataset + ': ' + value.toFixed(2) + '%';
                        },
                    },
                },
            },
            animation: true,
            scales: {
                x: {
                    // Ensure x-axis is displayed if indexAxis is 'x' for bar charts
                    display: chartType === 'bar' && indexAxis === 'x',
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                        },
                        color: '#000',
                    },
                    beginAtZero: true,
                    max: 100,
                },
                y: {
                    // Ensure y-axis is displayed if indexAxis is 'y' for bar charts
                    display: chartType === 'bar' && indexAxis === 'y',
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                        },
                        color: '#000',
                    },
                    beginAtZero: true,
                    max: 100,
                },
            },
        };

        if (chartType === "doughnut") {
            chartOptions.cutout = "80%";
            chartOptions.scales.x.display = false; // Always hide x-axis for doughnut
            chartOptions.scales.y.display = false; // Always hide y-axis for doughnut
        } else if (chartType === "bar") {
            chartOptions.indexAxis = indexAxis;
            // barThickness should only be applied to bar charts
            chartOptions.datasets = [{
                barThickness: indexAxis === "y" ? 12 : 20,
            }];
        }


        new Chart(ctx, {
            type: chartType,
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Percentage",
                        data: chartData.data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1,
                        // Apply barThickness here for bar charts
                        barThickness: chartType === "bar" ? (indexAxis === "y" ? 12 : 20) : undefined,
                    },
                ],
            },
            options: chartOptions,
        });

        // Append list items for doughnut charts
        if (appendElement) {
            // Clear previous content before appending
            $(appendElement).empty();
            chartData.data.forEach(function (value, index) {
                var label = chartData.labels[index];
                var color = colors[index];
                var fdata =
                    '<div class="col-6"><div class="d-flex justify-content-between align-items-center mb-0"><p class="m-0 list-name"><i class="fa fa-circle" style="background-color:' +
                    color +
                    '; border-radius:50px;"></i>' +
                    label +
                    '</p><p class="m-0 percentage">' +
                    value.toFixed(2) +
                    "%</p></div></div>";
                $(appendElement).append(fdata);
            });
        }
    }

    const $image = $('#zoom-image');
    const $zoomedImageDiv = $('.zoomedImageDiv');
    const $zoomButton = $('#zoom-button');
    let zoomLevel = 1;

    $zoomButton.on('click', function () {
        if (zoomLevel === 1) {
            zoomLevel = 2; // Zoom in
            $zoomedImageDiv.show(); // Show the zoomed image
            $zoomButton.text('Hide');
        } else {
            zoomLevel = 1; // Reset to original
            $zoomedImageDiv.hide(); // Hide the zoomed image
            $zoomButton.text('ZOOM');
        }
    });

 

    $("#frmlogin1").submit(function () {
        $("#dateerror").empty();
        var username = $("#username1").val();
        var paassword = $("#Lpassword1").val();
        if (username && paassword) {
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/login",
                type: "POST",
                data: { "project_id": Project_Id, "email": username, "password": paassword },
                dataType: "json",
                crossDomain: true,
                success: function (data) {

                    if (data.responseCode == 1) {
                        localStorage.setItem("username1", data.name)
                        localStorage.setItem("authorid", data.authorid);
                        localStorage.setItem("userGender", data.gender)
                        var usersession = localStorage.getItem("authorid");
                        var name = localStorage.getItem("username1");
                        if (usersession != null) {
                            var cartid = localStorage.getItem("cart_id");
                            if (cartid != null && cartid != undefined) {
                                window.location.href = "cart.html";
                            }
                            //else {
                            //     
                            //    // Modify the URL to include the anchor
                            //    if (redirectingClick != "" && redirectingClick != null) {
                            //        window.location.href = redirectingClick;
                            //        localStorage.removeItem("redirectionpage");//remove from local storage

                            //    }
                            //    else {
                            //        window.location.href = "Home.html?login=after_login";

                            //        // Refresh the current page with the modified URL
                            //        location.reload();
                            //    }

                            //}
                            $(".myaccount").show();
                            $(".cLogin").hide();
                            $(".offer-text").hide();
                            $(".cust_name").val(name);
                            $('#loginpopup').modal('hide');
                            //location.reload();
                            var SP = localStorage.getItem("amount")
                            const superSaleDiscountPer = 20;
                            if (SP) {
                                //const DiscountAmount = (SP * superSaleDiscountPer) / 100;
                                //couponLabel = "AFRAGSC20";
                                //$(".couponUnlockBt").empty();
                                //var amountVal = SP - DiscountAmount;
                                //amountVal = parseFloat(amountVal).toFixed(2);
                                //var couponHeadingtext = "Special Sale Price: $" + amountVal;
                                //$(".couponUnlockBt").text(couponHeadingtext);
                                //var couponAppliedText = "20% Coupon ‘AFRAGSC20’ Applied";
                                //$(".couponAppliedText").text(couponAppliedText);
                                //$(".couponAppliedText").removeClass("d-none");


                                //localStorage.removeItem("couponAppliedProductID");
                                //localStorage.setItem("couponAppliedProductID", product_id);
                                //$(".couponUnlockBt").empty();
                                //var amountVal = originalPrice - DiscountAmount;
                                //amountVal = parseFloat(amountVal).toFixed(2);
                                //localStorage.removeItem("CouponAmount");
                                //localStorage.setItem("CouponAmount", amountVal);
                                //var couponHeadingtext = "Special Sale Price: $" + amountVal;
                                //$(".couponUnlockBt").text(couponHeadingtext);
                                //var couponAppliedText = "20% Coupon ‘AFRAGSC20’ Applied";
                                //$(".couponAppliedText").text(couponAppliedText);
                                //$(".couponAppliedText").removeClass("d-none");

                            }
                        }

                        $("#validationdiv").text("Logged in successfully");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        $('#loginpopup').modal('hide');
                    }
                    else {
                        $("#logindateerror").text("Sorry, Invalid Username or Password");
                        $("#logindateerror").slideDown();
                        $("#logindateerror").delay(10000).slideUp();
                        $("#logindateerror").css("background", "red");
                    }

                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        $("#logindateerror").text("Oops!...Something went wrong, Please <a href='/'>go back>></a> and try again");
                    }
                }
            });
        }
        else {
            $("#logindateerror").text("Please enter Username/Password to proceed further!!!");
        }
    });




    //function cartupadtion(prod_id) {
    //    var prod_id = prod_id
    //    //var qty = $("input[id =" + prod_id + "]").val();
    //    //var prev = $(this).parent().prev().find('input[type=number]');
    //    //var qty = $(prev).val();
    //    cart_id = localStorage.getItem("cart_id");
    //    var qty = "1";

    //    if (qty) {
    //        $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
    //        if (cart_id) {
    //            console.log("Update");
    //            $.ajax({
    //                url: "https://api.americanfragrances.com/Cart/AddCart",
    //                type: "POST",
    //                data: {
    //                    cart_id: cart_id,
    //                    project_id: Project_Id,
    //                    product_id: prod_id,
    //                    quantity: qty,
    //                },
    //                dataType: "JSON",
    //                async: false,
    //                crossDomain: true,
    //                success: function (data) {
    //                    console.log(data);
    //                    if (data.responseCode == 1) {
    //                        cart_count(cart_id);
    //                        $("#" + prod_id).val("");

    //                        $("#validationdiv").text("Product successfully added to cart");
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(10000).slideUp();
    //                        $("#validationdiv").css("background", "#026633");

    //                        $(".dvcartbtns").show();
    //                        $(".btnsmall ").hide();
    //                    } else {
    //                        $("#validationdiv").text(data.responsemessage);
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(10000).slideUp();
    //                        $("#validationdiv").css("background", "#dba23d");
    //                    }
    //                },
    //            });
    //        } else {
    //            console.log("add");
    //            $.ajax({
    //                url: "https://api.americanfragrances.com/Cart/AddCart",
    //                type: "POST",
    //                data: {
    //                    project_id: Project_Id,
    //                    product_id: prod_id,
    //                    quantity: qty,
    //                },
    //                dataType: "JSON",
    //                async: false,
    //                crossDomain: true,
    //                success: function (data) {
    //                    if (data.responseCode == 1) {
    //                        cart_count(cart_id);
    //                        $("#" + prod_id).val("");
    //                        localStorage.setItem("cart_id", data.cart_id);
    //                        cart_count(data.cart_id);
    //                        $("#" + prod_id).val("");
    //                        $("#validationdiv").text("Product successfully added to cart");
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(10000).slideUp();
    //                        $("#validationdiv").css("background", "#026633");

    //                        $(".dvcartbtns").show();
    //                        $(".btnsmall ").hide();
    //                    } else {
    //                        $("#validationdiv").text(data.responsemessage);
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(10000).slideUp();
    //                        $("#validationdiv").css("background", "#dba23d");
    //                    }
    //                },
    //            });
    //        }
    //    } else {
    //        $("input[id =" + prod_id + "]").css("border", "solid 1px red");
    //    }
    //}
    //$(".cartbtn").click(function () {
    //    var prod_id = $(this).attr("data");
    //    cartupadtion(prod_id);
    //});







    //appending code based on path contains

    var parentpage = localStorage.getItem("parentpage");




    //this is used when MySubscription   page is parent page 

    function AppendDetailsOfProduct(product_id, ChooseProductBtId) {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Productview?project_id=" +
                Project_Id +
                "&id=" +
                product_id +
                "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                var salePrice = parseFloat(data.price).toFixed(2);
                var originalPrice = parseFloat(data.rate).toFixed(2);
                var discount_price = parseFloat(data.discount_price).toFixed(2);
                var stock_count = data.stock;
                var productName = data.name;
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-name-edit').text(productName);
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.productImg-edit').attr("src", data.display_image);

                if (data.stock != 0) {

                    Stock = "In Stock"
                    var $targetCard = parent.$(`#${ChooseProductBtId}`).closest('.card2');
                    //  $(`#${ChooseProductBtId}`).closest('.card2').find('.productAllDetails-edit').removeClass('d-none');
                    $targetCard.find('.product-name-edit').text(productName);
                    $targetCard.find('.brandName-edit').text(data.brandname);
                    $targetCard.find('.produtSize-edit').text(data.dimension);
                    $targetCard.find('.ProdctPrice-edit').text(salePrice);
                    /*$(`#${ChooseProductBtId}`).closest('.card').find('.ProdctStocK').text(Stock);*/
                    $targetCard.find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
                    $targetCard.find('.productImg-edit').attr("src", data.display_image);
                } else {
                    showPopup("Out Of Stock")

                }





            },
        });
    }



    //this is used when subscription plan details  page is parent page 
    function AppendDetailsOfProduct2(product_id, ChooseProductBtId) {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Productview?project_id=" +
                Project_Id +
                "&id=" +
                product_id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                var salePrice = parseFloat(data.price).toFixed(2);
                var originalPrice = parseFloat(data.rate).toFixed(2);
                var discount_price = parseFloat(data.discount_price).toFixed(2);
                var stock_count = data.stock;
                var productName = data.name;
                var Stock = "";

                if (data.stock != 0) {
                    Stock = "In Stock";

                    // Use parent document to find the target card
                    var $targetCard = parent.$(`#${ChooseProductBtId}`).closest('.card');

                    $targetCard.find('.productAllDetails').removeClass('d-none');
                    $targetCard.find('.product-name').text(productName);
                    $targetCard.find('.brandName').text(data.brandname);
                    $targetCard.find('.produtSize').text(data.mood + " " + data.dimension);
                    $targetCard.find('.ProdctPrice').text(salePrice);
                    $targetCard.find('.product-id').val(product_id);
                    $targetCard.find('.productImg').attr("src", data.display_image);

                } else {
                    parent.showPopup("Out Of Stock"); // make sure showPopup is also accessible in parent
                }
            },
        });
    }



    $(document).on("click", ".cart_btn, .cartbtn", function () {

        var product_id = $(this).attr("data");
        //$('#ProductViewPopup').modal('toggle');
        parent.$('#ProductViewPopup').modal('hide');
        parent.$('#analyizepopup').modal('hide');
        var ChooseProductBtId = localStorage.getItem("chosenProductDV");
        if (parentpage.includes("SubscriptionPlanDetails.html")) {
            AppendDetailsOfProduct2(product_id, ChooseProductBtId);
        } else {
            AppendDetailsOfProduct(product_id, ChooseProductBtId);
        }
      
        localStorage.removeItem("chosenProductDV");

    });
    $(document).on("click", ".viewDetails", function () {



        var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
        parent.$('#analyizepopup').modal('hide');

        // Construct the iframe with the correct product ID and dimensions
        var newrowcontent = '<iframe sandbox="allow-scripts allow-same-origin" id="subscriptionIframe"  src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';
        // parent.$('#ProductViewPopup .modal-body').empty();
        // Insert the new iframe content into the modal body
        parent.$('#ProductViewPopup .modal-body').html(newrowcontent);

        // Show the Product View popup modal
        parent.$('#ProductViewPopup').modal('show');

    });







   
 












});








//$(document).on("click", ".whishlistPro", function () {
//    var $this = $(this); // Store reference to the clicked element
//    var prod_id = $this.attr("id");
//    var Prowishlist_id = $this.attr("wishlistid");
//    var cust_auth = localStorage.getItem("authorid");

//    if (cust_auth == null || cust_auth == undefined) {
//        $("#loginpopup").modal('show');
//    } else {
//        $.ajax({
//            url: "https://api.americanfragrances.com/ProductAnalytics/Create",
//            type: "POST",
//            data: {
//                project_id: Project_Id,
//                product_id: prod_id,
//                authorid: cust_auth,
//            },
//            dataType: "JSON",
//            crossDomain: true,
//            success: function (data) {
//                if (data.responseCode == 1) {
//                    localStorage.setItem("wishlist_id", data.cart_id);
//                    wishlist_count(cust_auth);

//                    $("#validationdiv").text("Product Added Successfully To Wishlist")
//                        .css("background", "#026633")
//                        .slideDown().delay(3000).slideUp();

//                    $this.closest(".wishlistIcon").find('.fa-heart')
//                        .addClass('redColor').removeClass('whiteColor');
//                } else if (data.responseCode == 0) {
//                    //$("#validationdiv").text(data.responsemessage)
//                    //    .css("background", "#dba23d")
//                    //    .slideDown().delay(3000).slideUp();

//                    $.ajax({
//                        url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
//                        type: "POST",
//                        data: {
//                            "project_id": Project_Id,
//                            "id": Prowishlist_id,
//                            "authorid": cust_auth
//                        },
//                        dataType: "JSON",
//                        crossDomain: true,
//                        success: function (data) {
//                            if (data.responseCode == 1) {
//                                wishlist_count(cust_auth);
//                                $this.closest(".wishlistIcon").find('.fa-heart')
//                                    .removeClass('redColor').addClass('whiteColor');
//                            }
//                        }
//                    });
//                } else {
//                    //$("#validationdiv").text(data.responsemessage)
//                    //    .css("background", "#dba23d")
//                    //    .slideDown().delay(3000).slideUp();
//                }
//            }
//        });
//    }

//    function wishlist_count(cust_auth) {
//        if (cust_auth) {
//            $.ajax({
//                url: `https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=${Project_Id}&authorid=${cust_auth}`,
//                type: "GET",
//                dataType: "JSON",
//                crossDomain: true,
//                success: function (data) {
//                    $(".wishlist_count").html(data);
//                }
//            });
//        }
//    }
//});

$(document).off("click", ".whishlistPro").on("click", ".whishlistPro", function () {
    var $this = $(this); // Store reference to the clicked element
    var prod_id = $this.attr("id");
    var Prowishlist_id = $this.attr("wishlistid");
    var cust_auth = localStorage.getItem("authorid");

    if (cust_auth == null || cust_auth == undefined) {
        $("#loginpopup").modal('show');
    } else {
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/Create",
            type: "POST",
            data: {
                project_id: Project_Id,
                product_id: prod_id,
                authorid: cust_auth,
            },
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                if (data.responseCode == 1) {
                    localStorage.setItem("wishlist_id", data.cart_id);
                    wishlist_count(cust_auth);
                    $this.attr("wishlistid", data.id);
                    $("#validationdiv").text("Product Added Successfully To Wishlist")
                        .css("background", "#026633")
                        .slideDown().delay(3000).slideUp();

                    $this.closest(".wishlistIcon").find('.fa-heart')
                        .addClass('redColor').removeClass('whiteColor');
                    //setTimeout(function () {
                    //    window.location.reload();
                    //},1000)
                } else if (data.responseCode == 0) {
                    //$("#validationdiv").text(data.responsemessage)
                    //    .css("background", "#dba23d")
                    //    .slideDown().delay(3000).slideUp();

                    $.ajax({
                        url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
                        type: "POST",
                        data: {
                            "project_id": Project_Id,
                            "id": Prowishlist_id,
                            "authorid": cust_auth
                        },
                        dataType: "JSON",
                        crossDomain: true,
                        success: function (data) {
                            if (data.responseCode == 1) {
                                wishlist_count(cust_auth);
                                $this.closest(".wishlistIcon").find('.fa-heart')
                                    .removeClass('redColor').addClass('whiteColor');
                                $("#validationdiv").text("Product Removed  From Wishlist Successfully")
                                    .css("background", "#026633")
                                    .slideDown().delay(3000).slideUp();
                            }
                        }
                    });
                } else {
                    //$("#validationdiv").text(data.responsemessage)
                    //    .css("background", "#dba23d")
                    //    .slideDown().delay(3000).slideUp();
                }
            }
        });
    }

    function wishlist_count(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url: `https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=${Project_Id}&authorid=${cust_auth}`,
                type: "GET",
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    $(".wishlist_count").html(data);
                }
            });
        }
    }
});