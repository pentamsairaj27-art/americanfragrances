$(document).ready(function () {

    
   
    $.ajax({
        url: "https://api.americanfragrances.com/Product/BestSeller?customerId=null&take=8&skip=0",
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            const products = data.SortedProducts || data.Products || data.Data;

            if (!products || products.length === 0) {
                $("#bestSeller").append('<center class="my-3"><img src="Images/empty_order.png"><h6><b>Currently, No Products Available.</b></h6></center>');
                return;
            }

            let sortedProducts = products;

           

            $.each(sortedProducts, function (index, value) {
                if (index < 4) { // Limit to 8 products for display
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
                        $("#bestSeller").append(newrowContent);

                        const hasBarcodeAnalytics =
                            value.BarcodeAnalytics &&
                            Array.isArray(value.BarcodeAnalytics.Data) &&
                            Array.isArray(value.BarcodeAnalytics.Labels) &&
                            value.BarcodeAnalytics.Data.length >= 10 &&
                            value.BarcodeAnalytics.Labels.length >= 10;

                        if ((value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") && hasBarcodeAnalytics) {
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
            $("#bestSeller").append('<p>Error loading data</p>');
        }
    });






  
});

