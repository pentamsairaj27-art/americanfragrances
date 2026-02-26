$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var wishlist_id = localStorage.getItem("wishlist_id");
    var cust_auth = localStorage.getItem("authorid");

    if (cust_auth) {
        wishlist_index(cust_auth);
    }
    else {
        window.location.href = "home.html?login=1";
        $("#noproductss").html('<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Oops, Your Wishlist is Empty </b><p><br>');
    }
    var cart_id = localStorage.getItem("cart_id");
    if (cart_id) {
        cart_count(cart_id);
    }

    // WISHLIST
    if (cust_auth) {
        wishlist_count(cust_auth);
    }
    $(".wishlist-add").click(function () {

        //$(".title_sec").on('click', '.wishlist-add', function () {
        var prod_id = $(this).attr("data");
        if (wishlist_id) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: { "project_id": Project_Id, "product_id": prod_id, "authorid": cust_auth },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    data.responsemessage;
                    console.log(data);
                    if (data.responseCode == 1) {
                        wishlist_count(cust_auth);
                        $("#validationdiv").text("Product Added Successfully To Wishlist");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        $(".wishlist-added").show();
                        $(".wishlist").hide();
                        var loc = location.href;
                        //console.log(loc);
                        location.href = loc;

                    } else {

                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                        $(".wishlist-added").show();
                        $(".wishlist").hide();
                    }
                }
            });
        } else {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: { "project_id": Project_Id, "product_id": prod_id, "authorid": cust_auth },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    data.responsemessage;
                    console.log(data);
                    if (data.responseCode == 1) {
                        wishlist_count(cust_auth);
                        localStorage.setItem("wishlist_id", data.cart_id);
                        $("#validationdiv").text("Product Added Successfully To Wishlist");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#026633");
                        $(".wishlist-added").show();
                        $(".wishlist").hide();
                        var loc = location.href;
                        //console.log(loc);
                        location.href = loc;

                    } else {

                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(3000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                        $(".wishlist-added").show();
                        $(".wishlist").hide();
                    }

                }
            });
        }
    })

    //wishlist list display
    function wishlist_index(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Index?project_id=" + Project_Id + "&authorid=" + cust_auth,
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
                            var categoryname = value.categoryname;
                             
                            var stockStatus = value.stock != "0"
                                ? '<a class="btn cartbtn" data="' + prodid + '" type="button">Add to cart</a>'
                                : '<span class="btn out-of-stock-label">Sold Out</span>';

                            var newrowContent = '<div class="col-12 col-md-4 col-lg-3"><div class="product_box position-relative"><div class="remove-del"><a class="" data="' + value.id + '"><i class="fa-solid fa-trash-can"></i></a></div><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' + value.id + '"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus+ '<a class="btn"  href="Productview.html?id=' + value.product_id + '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + prodid + '"></p><div class="barcode progress" id="barcode' + prodid + '" ></div><p class="product_name">' + (value.name.length > 18 ? value.name.substring(0, 18) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="detailsdiv' + value.id + '"></div></div></div>'


                            $("#productdvs").append(newrowContent);
                            getdetails();
                            function getdetails() {
                                //var prodid = $(".details").attr("data");

                                //var prodid = value.product_id;
                                $.ajax({
                                    url: "https://api.americanfragrances.com/Home/Productview?project_id=" + Project_Id + "&id=" + prodid + "",
                                    type: "GET",
                                    dataType: "JSON",
                                    async: false,
                                    crossDomain: true,
                                    success: function (value2) {
                                        // $.each(data, function (Index, value) {
                                        var salePrice = parseFloat(value2.price).toFixed(2);
                                        var originalPrice = parseFloat(value2.rate).toFixed(2);
                                        var details = '<div class="row detailsdiv' + value2.id + ' align-items-center"><div class=""><p class="brandnm">by<a href="show-all.html?brand=' + value2.brandname + '"><b> <u>' + value2.brandname + '</u></b></a></p></div></div><div class="col-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value2.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value2.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + prodid + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div>'

                                        $(".detailsdiv" + value.id).append(details);

                                        // Make AJAX call to fetch chart data
                                        if (value2.subcategoryname == "FRAGRANCES" || value2.subcategoryname == "TESTERS") {
                                            $.ajax({
                                                url: "https://api.americanfragrances.com/ProductAnalytics/GetBarcodeData?productid=" + prodid,
                                                type: 'GET',
                                                dataType: 'json',
                                                async: false,
                                                success: function (data) {
                                                    // Assuming response.Data is the array of values and response.Labels is the array of labels
                                                    //$.each(response.Data, function (index, value) {
                                                    //    var label = response.Labels[index];
                                                    //    var width = (value / 12) * 100; // Adjust this calculation based on your data range
                                                    var response = data.Products
                                                    var newrow =
                                                        '<div class="progress-bar bg-ten" role="progressbar" style="width:' +
                                                        response.Data[0] +
                                                        '%">' +
                                                        response.Data[0] +
                                                        "% <div class='amerifragtooltip'>Style: " + response.Labels[0] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-twenty" role="progressbar" style="width:' +
                                                        response.Data[1] +
                                                        '%"  >' +
                                                        response.Data[1] +
                                                        "%<div class='amerifragtooltip'>Note: " + response.Labels[1] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-thirty" role="progressbar" style="width:' +
                                                        response.Data[2] +
                                                        '%">' +
                                                        response.Data[2] +
                                                        "%<div class='amerifragtooltip'>Mood: " + response.Labels[2] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-fourty" role="progressbar" style="width:' +
                                                        response.Data[3] +
                                                        '%">' +
                                                        response.Data[3] +
                                                        "%<div class='amerifragtooltip'>Season: " + response.Labels[3] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-fifty" role="progressbar" style="width:' +
                                                        response.Data[4] +
                                                        '%">' +
                                                        response.Data[4] +
                                                        "%<div class='amerifragtooltip'>Occasion: " + response.Labels[4] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-sixty" role="progressbar" style="width:' +
                                                        response.Data[5] +
                                                        '%">' +
                                                        response.Data[5] +
                                                        "%<div class='amerifragtooltip'>Age Group: " + response.Labels[5] +
                                                        '</div></div>' +
                                                        '<div class="progress-bar bg-seventy" role="progressbar" style="width:' +
                                                        response.Data[6] +
                                                        '%">' +
                                                        response.Data[6] +
                                                        "%<div class='amerifragtooltip'>Smell Intensity: " + response.Labels[6] +
                                                        "</div></div>" +
                                                        '<div class="progress-bar bg-eighty" role="progressbar" style="width:' +
                                                        response.Data[7] +
                                                        '%">' +
                                                        response.Data[7] +
                                                        "%<div class='amerifragtooltip'>Longevity: " + response.Labels[7] + 
                                                        "</div></div></div>" +
                                                        '<div class="progress-bar bg-ninety" role="progressbar" style="width:' +
                                                        response.Data[8] +
                                                        '%">' +
                                                        response.Data[8] +
                                                        "%<div class='amerifragtooltip'>Spray Time: " + response.Labels[8] + 
                                                        "</div></div></div>" +
                                                        '<div class="progress-bar bg-hundered" role="progressbar" style="width:' +
                                                        response.Data[9] +
                                                        '%">' +
                                                        response.Data[9] +
                                                        "%<div class='amerifragtooltip'>Presentation: " + response.Labels[9] +
                                                        "</div></div></div>";
                                                    $("#barcode" + prodid).append(newrow);
                                                    $("#cat_useranly" + prodid).text("AmeriFrag Barcode");


                                                    //});
                                                },
                                                error: function (error) {
                                                    console.log('Error:', error);
                                                }
                                            });
                                        }
                                        else {
                                            $("#barcode" + prodid).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                        }
                                        var $starsContainer = $(".product_box").find('.stars' + prodid); // Find the .stars element within the new review
                                        $starsContainer.empty();

                                        if (value.rating >= 4.6 && value.rating == 5) {
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
                                        // });
                                    }
                                });

                            };
                        });

                        ////var prodid = value.product_id;
                        //
                    } else {
                        $("#noproductss").html('<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Your Wishing List is currently empty.</b><br><br><a href="home.html"><button class="btn btnproceed">RETURN TO SHOP</button></a><p><br>');
                    }

                }
            });
            $(".cartbtn").click(function () {

                var prod_id = $(this).attr("data");
                //var qty = $("input[id =" + prod_id + "]").val();
                //var prev = $(this).parent().prev().find('input[type=number]');
                //var qty = $(prev).val();
                cart_id = localStorage.getItem("cart_id");
                var qty = "1";

                if (qty) {
                    $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
                    if (cart_id) {
                        console.log("Update");
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/AddCart",
                            type: "POST",
                            data: { "cart_id": cart_id, "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                            dataType: "JSON",
                            async: false,
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

                            }
                        });

                    } else {
                        console.log("add");
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/AddCart",
                            type: "POST",
                            data: { "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                            dataType: "JSON",
                            async: false,
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


                            }
                        });
                    }
                } else {
                    $("input[id =" + prod_id + "]").css("border", "solid 1px red");
                }


            });
        }

    }

    $(".cart_btn").click(function () {

        var prod_id = $(this).attr("data");
        var qty = "1";
        //var prev = $(this).parent().prev().find('input[type=number]');
        //var qty = $(prev).val();

        if (qty) {
            $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
            if (cart_id) {
                console.log("Update");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: { "cart_id": cart_id, "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                    dataType: "JSON",
                    async: false,
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

                    }
                });

            } else {
                console.log("add");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: { "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                    dataType: "JSON",
                    async: false,
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


                    }
                });
            }
        } else {
            $("input[id =" + prod_id + "]").css("border", "solid 1px red");
        }


    });
    function cart_count(cartid) {
        if (cartid) {

            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Cartcount?project_id=" + Project_Id + "&cart_id=" + cartid,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {

                    $(".cart_count").html(data);
                }
            });

        }

    }

    $(".remove-del").on('click', function () {

        var id = $(this).find('a').attr("data");
        //swal({
        //    title: "Are you sure?",
        //    text: "Are you sure do you want to Delete!",
        //    type: "warning",
        //    showCancelButton: true,
        //    confirmButtonColor: "#FFE802",
        //    confirmButtonText: "Yes, delete it!",
        //    cancelButtonText: "No, cancel!",
        //    closeOnConfirm: false,
        //    // closeOnCancel: false
        //},
        //    function (isConfirm) {
        //        if (isConfirm) {

        //            wishlist_delete(id);

        //            if (id == null) {
        //                alert("Oops!...Something wrong, please try after sometime");
        //            }

        //        } else {
        //            swal("Cancelled", "Your Wishlist products are safe :)", "error");
        //        }

        //    });

        swal({
            title: "Are you sure?",
            text: "Are you sure do you want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFE802",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then((result) => {
            console.log("Result:", result); // Debugging
            if (result.value) {
                console.log("Calling wishlist_delete with id:", id); // Debugging
                wishlist_delete(id);
            } else {
                swal("Cancelled", "Your Wishlist products are safe :)", "error");
            }
        });
    });



    //$(".remove-del").on('click', function () {
    //    var id = $(this).attr("data");

    //    swal({
    //        title: "Are you sure?",
    //        text: "Are you sure do you want to Delete!",
    //        type: "warning",
    //        showCancelButton: true,
    //        showConfirmButton: true,
    //        confirmButtonColor: "#FFE802",
    //        confirmButtonText: "Yes, delete it!",
    //        cancelButtonText: "No, cancel!",
    //    })
    //        .then((isConfirmed) => {
    //            if (isConfirmed.value == true) {

    //                wishlist_delete(id);

    //             // swal("Deleted!", "Your Wishlist product has been deleted!", "success");
    //                if (id == null) {
    //                    alert("Oops! Something went wrong. Please try again later.");
    //                }
    //            } else {
    //                swal("Cancelled", "Your Wishlist products are safe :)", "error");
    //            }
    //        });
    //});


    function wishlist_delete(id) {
        if (id != '') {

            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
                type: "POST",
                data: { "project_id": Project_Id, "id": id, "authorid": cust_auth },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    if (data.responseCode == 1) {
                         /*swal("Deleted!", "Your Wishlist product has been deleted!", "success");*/
                        //cart_index(cart_id);
                        var loc = location.href;
                        console.log(loc);
                        location.href = loc;
                    }
                }
            });

        }

    }
    function wishlist_count(cust_auth) {
        if (cust_auth) {

            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=" + Project_Id + "&authorid=" + cust_auth,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {

                    $(".wishlist_count").html(data);
                }
            });

        }

    }
})
