$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var cart_id = localStorage.getItem("cart_id");
    var cust_auth = localStorage.getItem("authorid");
    var date = new Date();
    date.setDate(date.getDate() + 2);
    var deliverydateshow = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    $("#deldateforcust").text(deliverydateshow);
    var avail = $("#pincheck").text();
    if (avail == "Available") {
        $(".paybutton").prop("disabled", false);
    }
    else {
        $(".paybutton").prop("disabled", true);
    }
    if (cart_id) {
        cart_index(cart_id);
        cart_count(cart_id);
    }
    else {
        $("#cart_list").html('');
        $("#noProducts").show();
        $(".payment_summary").hide();
    }
    if (cust_auth) {
        $("#customer_notloggedin").hide();
        $("#customer_loggedin").show();
        getcustomeraddress()
        $("#customerid").append(cust_auth);
    } else {
        $("#customer_notloggedin").show();
        $("#customer_loggedin").hide();
    }
    var deliverydate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    $("#deldate").text(deliverydate);

    function getcustomeraddress() {
        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + cust_auth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data != "") {
                    //console.log(data);
                    var i = 0;
                    $("#primary_address").empty();
                    $.each(data, function (Index, value) {
                        if (data.length > 0) {
                            localStorage.setItem("Address_details", JSON.stringify(data[0]));
                        }

                        i = i + 1;
                        if (i == 1) {
                            localStorage.setItem("AddressID", value.id);
                            var newrowContent = ' <span class="Person_name" id="p_name">' + value.firstname + '&nbsp;' + value.lastname + '</span><br /><span class="person_address">' + value.addressline1 + ', ' + value.addressline2 + ' </span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' - ' + value.pincode + ' </span><br><span class="person_address"> ' + value.country + ' </span><span class="person_mobile_no" id="add_cust_phn">Mobile:  ' + value.phone + ' </span><br>Email:  <span class="person_mobile_no" id="add_cust_eml">' + value.email + ' </span>'
                            $("#primary_address").append(newrowContent);
                        }
                    });
                }
                else {
                    //var newrowContent = '<table style="margin:0px auto!important"><tr><td><div class="icon_dv"><div class="lbl_icon_circle"> <span class="iconify lbl_icon" data-icon="ic:outline-add-location-alt" data-inline="false"></span></div></div></td><td><h6 class="txt_sm">Add your Address & Enjoy Faster Checkout</h6></td></tr></table>'
                    //$("#Address_list").append(newrowContent);
                }
            }
        });
    };

    function cart_index(cartid) {

        if (cartid) {
            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Index?project_id=" + Project_Id + "&cart_id=" + cartid,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    debugger;
                    $("#cart_list").empty();
                    $("#noProducts").empty();

                    if (data.length > 0 && data != "Cart is empty") {
                        $.each(data, function (Index, value) {
                            var discamt = value.discount;

                            var salePrice = parseFloat(value.price).toFixed(2);
                            var retail_price = parseFloat(value.rate).toFixed(2);
                            var perPrice = parseFloat(value.per_price).toFixed(2);
                            var amount = parseFloat(value.amount).toFixed(2);
                            if (
                                value.subcategoryname == "FRAGRANCES" ||
                                value.subcategoryname == "TESTERS"
                            ) {

                                var cart_data = '<tr><th class="ps-0 py-3" scope="row">' +
                                    '<div class="d-flex align-items-center"><a href="Productview.html?id=' +
                                    value.product_id +
                                    '"><img src="' +
                                    value.image +
                                    '" alt="..." width="70"></a>' +
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name+
                                    '</a></p><p>' +
                                    value.mood +
                                    '</p><p>' +
                                    value.dimension +
                                    '</p><p>By:<a class="brand' + value.brandname +
                                    ' brandunderline" href="">' +
                                    value.brandname +
                                    "</a></p></div > " +
                                    "</div></div></th>" +
                                  
                                    '<td class="align-middle"><div class="quantity d-flex"><button class="dec-btn minus"><i class="fa fa-minus "></i></button><input class="form-control quanty_value' +
                                    value.id +
                                    '" id="' +
                                    value.id +
                                    '" type="text" value="' +
                                    value.quantity +
                                    '"><button class="inc-btn plus"><i class="fa fa-plus "></i></button></div></td> ' +
                                    '<td class="align-middle text-center brandunderline">' + (value.additinal_discountamount === 0 || value.additinal_discountamount === null
                                    ? '<button style="font-weight:600" class="btn instantdiscount discount-btn text-wrap" data-product-id="' + value.product_id + '"> Answer the Questionnaire for an extra 5% Discount</button>'
                                        : '') +
                                    '</td>' +
                                    '<td class="align-middle text-center"><strike class="d-flex" style="color:#838383"><p class="d-flex" style="color:#838383">$' + retail_price + '</p></strike><p class="d-flex">$' + perPrice + '</p>' + (value.specialcouponamount > 0 ? '<p class="d-flex" style="color:red;">- $' + value.specialcouponamount + ' (20% Special Coupon Applied on Retail)</p>' : '') + (value.additinal_discountamount > 0 ? '<p class="d-flex" style="color:red;">- $' + value.additinal_discountamount + ' (5% Questionnaire Discount Applied)</p>' : '') + '</td>' +
                                    '<td class="align-middle"><div class="d-flex justify-content-between"><p>$<span class="ourpricebold" id="insdis' +
                                    value.product_id +
                                    '">' +
                                    amount +
                                    "</span></p>" +
                                    '<td class="align-middle"><a class="reset-anchor" href="#!"><i class="fas fa-times-circle cart_del" data="' +
                                    value.id +
                                    '"></i></a><a class="reset-anchor" href="#!"><i class="fas fa-heart  whishlistProCart" style="color: ' +
                                    (value.iswishlist
                                        ? "rgb(201 58 60)"
                                        : "#000") +
                                    '" wishlistid="' +
                                    value.wishlist_id +
                                    '" data="' +
                                    value.product_id +
                                    '"></i></a></div></td></td></tr>';
                                var cart_data_list =
                                    '<tr><th class="ps-0 py-3" scope="row">' +
                                    '<div class="d-flex align-items-center"><a href="Productview.html?id=' +
                                    value.product_id +
                                    '"><img src="' +
                                    value.image +
                                    '" alt="..." width="70"></a>' +
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name d-flex w-250 ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name +
                                    '</a></p><p>' + value.mood + '</p><p>By:<a class="brand' + value.brandname + ' brandunderline" href="">' + value.brandname +
                                    "</a></p></div>" +
                                    '</div></div></th><td  class="align-middle"><p>' + value.quantity + '</p></td><td class="align-middle"><p class="">$' +
                                    value.per_price +
                                    "</p></td>" +
                                    '<td class="align-middle">' +
                                    value.dimension +
                                    (value.additinal_discountamount === 0 && value.additinal_discountamount === null
                                        ? '<button class="discount-btn btn more_btn" data-product-id="' + value.product_id + '"> <span style="font-weight:600"> Answer the questionnaire </span> <br> for an extra 5% discount</button>'
                                        : ''
                                    ) +
                                    "</td>" +
                                    '<td class="align-middle"><div class="d-flex justify-content-between"><p>$<span id="insdis' +
                                    value.product_id +
                                    '">' +
                                    salePrice +
                                    "</span></p></div></td></tr>";
                            }

                            else {

                                //var cart_data = '<div class="row"><div class="col-md-2 col-6"> <div class="cart_item_img"> <img src="' + value.image + '" width="100%" /> </div> </div> <div class="col-md-3 col-6"> <div> <span class="aditem_title">' + value.name + '</span> <br /> <span class="aditem_quanity">' + value.weight + '</span><span class="aditem_quanity">' + value.dimension + '</span><br /><span class="aditem_price">Rs.' + value.per_price + '</span><span class="aditem_offerprice">Rs. ' + value.rate + ' </span><span class="product_ds">' + value.discount + '%off</span><br><span class="dis_prcs"> Save Per Unit : Rs . ' + value.per_discountamount + ' /-</span></div> </div> <div class="col-md-3 Ad_quantitytbls"> <table><tr><td><label class="qtylabel">Qty : </label></td><td><input class="quanty_value" id="' + value.id + '" min="1" name="quantity" type="number" value="' + value.quantity + '"></td></tr></table></div> <div class="col-md-2"></div> <div class="col-md-2"> <br /> <table> <tr> <td><p class="aditem_price">Rs.' + value.price + '</p></td> <td>&nbsp;</td> <td class="light_txt"><p>|</p></td> <td>&nbsp;</td> <td class="light_txt"><p><i data="' + value.id + '" class="fa fa-trash cart_del"></i></p></td> </tr> </table><span class="dis_prcs">Total Saved  Rs.' + value.discount_amount + '/-</span></div> </div>  <hr /><br/>';
                                var cart_data =
                                    '<tr><th class="ps-0 py-3" scope="row">' +
                                    '<div class="d-flex align-items-center"><a href="Productview.html?id=' +
                                    value.product_id +
                                    '"><img src="' +
                                    value.image +
                                    '" alt="..." width="70"></a>' +
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name d-flex w-250 ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name +
                                    '</a></p><p>' +
                                    value.mood +
                                    '</p><p>' +
                                    value.dimension +
                                    '</p><p>By:<a class="brand ' + value.brandname +
                                    ' brandunderline" href="">' +
                                    value.brandname +
                                    "</a></p></div>" +
                                    "</div></div></th>" +
                                   
                                    '<td class="align-middle"><div class="quantity d-flex"><button class="dec-btn minus"><i class="fa fa-minus "></i></button><input class="form-control quanty_value' +
                                    value.id +
                                    '" id="' +
                                    value.id +
                                    '" type="text" value="' +
                                    value.quantity +
                                    '"><button class="inc-btn plus"><i class="fa fa-plus "></i></button></div></td><td></td>' +
                                    '<td class="align-middle text-center"><strike class="d-flex" style="color:#838383"><p class="d-flex" style="color:#838383">$' + retail_price + '</p></strike><p class="d-flex">$' + perPrice + '</p>' + (value.specialcouponamount > 0 ? '<p class="d-flex" style="color:red;">- $' + value.specialcouponamount + ' (20% Special Coupon Applied on Retail)</p>' : '') + (value.additinal_discountamount > 0 ? '<p class="d-flex" style="color:red;">- $' + value.additinal_discountamount + ' (5% Questionnaire Discount Applied)</p>' : '') + '</td>' +
                                    '<td class="align-middle"><div class="d-flex justify-content-between"><p>$<span class="ourpricebold" id="insdis' +
                                    value.product_id +
                                    '">' +
                                    amount +
                                    "</span></p>" +
                                    '<td class="align-middle"><a class="reset-anchor" href="#!"><i class="fas fa-times-circle cart_del" data="' +
                                    value.id +
                                    '"></i></a><a class="reset-anchor" href="#!"><i class="fas fa-heart  whishlistProCart" style="color: ' +
                                    (value.iswishlist
                                        ? "rgb(201 58 60)"
                                        : "#000") +
                                    '" wishlistid="' +
                                    value.wishlist_id +
                                    '" data="' +
                                    value.product_id +
                                    '"></i></a></div></td></td></tr>';
                                var cart_data_list =
                                    '<tr><th class="ps-0 py-3" scope="row">' +
                                    '<div class="d-flex align-items-center"><a href="Productview.html?id=' +
                                    value.product_id +
                                    '"><img src="' +
                                    value.image +
                                    '" alt="..." width="70"></a>' +
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name d-flex ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name +
                                    '</a></p><p>' +
                                    value.mood +
                                    '</p><p>By:<a class="brand' + value.brandname +
                                    ' brandunderline" href="">' +
                                    value.brandname +
                                    "</a></p></div>" +
                                    '</div></div></th><td  class="align-middle"><p>' + value.quantity + '</p></td><td class="align-middle"><p class="">$' +
                                    value.per_price +
                                    "</p></td>" +
                                    '<td class="align-middle">' +
                                    value.dimension +
                                    "" +
                                    "</td>" +
                                    '<td class="align-middle"><div class="d-flex justify-content-between"><p>$<span id="insdis' +
                                    value.product_id +
                                    '">' +
                                    salePrice +
                                    "</span></p></div></td></tr>";
                            }
                            $("#cart_list").append(cart_data);
                            $("#checkout_cart_list").append(cart_data_list);
                            if (value.subcategoryname == null) {
                                $(".prduct_categ" + value.product_id).css("display", "none");
                            } else {
                                $(".prduct_categ" + value.product_id).show();
                            }
                        });

                        $('.minus').click(function () {
                            var $input = $(this).closest('.quantity').find('input');
                            var count = parseInt($input.val()) - 1;
                            count = count < 1 ? 1 : count;
                            $input.val(count);
                            $input.change();
                            var id = $input.attr('id');
                            var qty = $input.val();

                            if (id != '' && qty != '') {
                                cart_update(id, qty);
                            }
                            return false;
                        });
                        $('.plus').click(function () {
                            var $input = $(this).closest('.quantity').find('input');
                            $input.val(parseInt($input.val()) + 1);
                            $input.change();
                            var id = $input.attr('id');
                            var qty = $input.val();

                            if (id != '' && qty != '') {
                                cart_update(id, qty);
                            }
                            return false;
                        });
                        cart_amount();

                        $('.quanty_value').on('input', function () {
                            console.log("value changed");
                            var id = this.id;
                            var qty = this.value;

                            if (id != '' && qty != '') {
                                cart_update(id, qty);
                            }
                        });

                        $(document).on('click', ".cart_del", function () {
                            var r = confirm("Do you want to Delete the product from Cart");
                            if (r == true) {
                                var id = $(this).attr("data");
                                if (id) {
                                    cart_delete(id);
                                } else {
                                    alert("Oops!...Something wrong, please try after sometime");
                                }
                            }
                        });

                    } else {
                        // $("#noProducts")
                        $("#noProducts").html('<br><center><img src="/Images/empty_order.png"/></center><p style="text-align: center"><b>Your Shopping cart is currently empty.</b><br><br><a href="home.html"><button class="btn returnShop">RETURN TO SHOP</button></a><p><br>');
                        $(".cart_table").hide();
                        $(".payment_summary").hide();
                    }
                }
            });

        } else {

        }
    }
    var orderamount = localStorage.getItem('tax_amt');
    if (orderamount < 75) {
        var toaddress = JSON.parse(localStorage.getItem("Address_details"));

        $.ajax({
            url: "https://api.americanfragrances.com/ShipStation/GetRates",
            type: "POST",
            data: {
                "carrierCode": "stamps_com",
                "fromPostalCode": "10314",
                "toState": toaddress.state,
                "toCountry": "US",
                "toPostalCode": toaddress.pincode,
                "toCity": toaddress.city,
                "weight": {
                    "value": 3,
                    "units": "pounds"
                },
                "dimensions": {
                    "units": "inches",
                    "length": 10,
                    "width": 6,
                    "height": 4
                },
                "confirmation": "delivery",
                "residential": true
            },
            dataType: "JSON",
            async: false,
            crossDomain: true,
            async: false,
            success: function (response) {
                const services = response;
                const firstShipmentCost = services[0].shipmentCost;
                localStorage.setItem('firstShipmentCost', firstShipmentCost);
                $("#shippingAmt").html(firstShipmentCost)
                $("#shippingAmtdisable").html(firstShipmentCost)
                cart_amount()
            },
            error: function (xhr, status, error) {
                console.error("Rate fetch failed:", error);
            }
        });
    }
    function cart_amount() {

        if (cart_id) {
            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Cartamount?project_id=" + Project_Id + "&cart_id=" + cart_id,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    if (data) {
                        var totamount = parseFloat(data.amount);
                        var giftcardamount = localStorage.getItem('giftcardamount');

                        if (giftcardamount) {
                            var cartamount = totamount - parseFloat(giftcardamount);
                        } else {
                            var cartamount = totamount;
                        }
                        var charges = localStorage.getItem("firstShipmentCost");
                        if (charges) {
                            var amount = cartamount + parseFloat(charges);
                        } else {
                            var amount = cartamount;
                        }
                        if (amount < 0) {
                            amount = 0;
                        }
                        //var tax = amount * 0.05;
                        //var taxamount = (tax).toFixed(2);
                        var totalWithTax = (amount).toFixed(2);
                        localStorage.setItem("tax_amt", totalWithTax);
                       /* $("#tax").html(taxamount);*/
                        $(".cart_tot").html(totalWithTax);

                        $(".cart_pay").html(amount);
                        $(".paybutton span").html(amount);
                        $("#total_cart_amount").val(amount);
                        var shippingCharge = parseFloat(data.shippingCharge).toFixed(2);
                        $("#shippingAmt").html(isNaN(parseFloat(data.shippingCharge)) ? "0.00" : parseFloat(data.shippingCharge).toFixed(2));

                        var amounttotal = parseFloat(data.price).toFixed(2);
                        $("#amounttotal").html(amounttotal);
                        var totaldiscount = parseFloat(data.discount_amount).toFixed(2);
                        $("#totaldiscount").html(totaldiscount);
                        var totalgst = parseFloat(data.gst_amount).toFixed(2);
                     /*   $("#totalgst").html(totalgst);*/
                        var ttlamt = $("#total_cart_amount").val();
                        var ttlamtlll = parseFloat(ttlamt).toFixed(2);
                        localStorage.setItem("cartTotalAmt", ttlamtlll);
                        $("#coupon_success").empty();
                        $("#coupon_amount").empty();
                        $("#coupon_success").show();
                        $("#coupon_amount").show();
                        $("#coupon_success").text(data.couponname);
                        if (data.coupon_amount) {
                            $("#coupon_amount").text(function (_, currentText) {
                                return currentText + " $" + data.coupon_amount + "";
                            });
                            $("#coupon-btn").hide();
                            $(".clear").show();

                        } else {
                            $("#coupon_amount").hide();
                        }

                        $(".coupons").val(data.couponname);
                        var giftcardid_name = localStorage.getItem('giftcardid_name');
                        var giftcardamount = localStorage.getItem('giftcardamount');
                        if (giftcardid_name) {
                            $(".GiftCardclear").show();
                            $("#Gift-btn").hide();
                            $("#gift_success").empty();
                            $("#gift_success").show();
                            $("#giftcard_amount").show();
                            $("#gift_success").text(giftcardid_name);
                            $("#giftcard_amount").text(giftcardamount);
                            $(".giftcard").val(giftcardid_name);

                        } else {
                            $("#gift_success").hide();
                            $("#giftcard_amount").hide();
                        }
                        $("#couponName").html(data.couponname);
                        $("#couponAmt").html(isNaN(parseFloat(data.coupon_amount)) ? "0.00" : parseFloat(data.coupon_amount).toFixed(2));

                        $("#GIftName").html(data.giftcardname);
                        $("#GiftAmt").html(isNaN(parseFloat(data.giftcardamount)) ? "0.00" : parseFloat(data.giftcardamount).toFixed(2));

                        $("#SpeCouponName").html(data.specialcouponname);
                        $("#SpecouponAmt").html(isNaN(parseFloat(data.specialcouponamount)) ? "0.00" : parseFloat(data.specialcouponamount).toFixed(2));
                        $("#InstantDiscount").html(isNaN(parseFloat(data.additinal_discountamount)) ? "0.00" : parseFloat(data.coupon_amount).toFixed(2));

                        //var delcharge = "45";
                        //var eqlt = 1000;
                        //if (ttlamtlll < eqlt) {
                        //    var grndgrndttl = parseFloat(ttlamt) + parseFloat(delcharge);

                        //    $("#total_cart_amount").val(grndgrndttl);
                        //    $(".paybutton span").html(grndgrndttl);
                        //    $("#delcharge").text("45");
                        //    $(".cart_pay").html(grndgrndttl);
                        //}
                        //else {
                        //    $("#total_cart_amount").val(amount);

                        //}
                        if (totaldiscount == "0") {
                            $("#totaldiscount").hide();
                            $(".hiderupee").hide();
                        }
                    } else {
                        $(".payment_summary").hide();
                    }

                }
            });
            
        }
        
    }
    
    localStorage.removeItem('firstShipmentCost');
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

    function cart_update(id, qty) {
        if (id != '' && qty != '') {
            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Update",
                type: "POST",
                data: { "project_id": Project_Id, "id": id, "quantity": qty },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    if (data.responseCode == 1) {
                        console.log(qty);
                        //cart_index(cart_id);
                        //cart_amount();
                        //var loc = location.href;
                        //console.log(loc);
                        //location.href = loc;

                        if (cart_id) {
                            cart_index(cart_id);
                            cart_count(cart_id);
                            cart_amount()
                        }
                    } else {

                        $("#validationdiv").text("Sorry!, " + data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(5000).slideUp();
                        $("#validationdiv").css("background", "#dba23d");
                    }
                }
            });
        }
    }

    function cart_delete(id) {
        if (id != '') {

            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Delete",
                type: "POST",
                data: { "project_id": Project_Id, "id": id },
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    if (data.responseCode == 1) {
                        //cart_index(cart_id);
                        var loc = location.href;
                        console.log(loc);
                        location.href = loc;
                    }


                }
            });

        }

    }

    $(".change_address_cart").click(function () {
        if (cust_auth) {
            location.href = "/Address.html?id=fromcart";
        }
    });

    $(".paybutton").click(function () {

        authorid = localStorage.getItem('authorid');

        if (authorid) {
            //$("#Addnewaddress").modal();
            razorpay();

        } else {
            //  $("#LoginModalCenter").modal();
            window.location.href = "home.html?login=1";
        }

    });
    //coupons
    var previousTotalAmount = null;
    $("#apply_btn").click(function () {

        var coupontxt = $(".coupons").val();
        if (coupontxt == "AFRAGSC20") {
            $("#validationdiv").text("This Coupon Not Applicable");
            $("#validationdiv").slideDown();
            $("#validationdiv").delay(10000).slideUp();
            $("#validationdiv").css("background", "#9FC443");
        } else {
            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Couponcheck?project_id=" + Project_Id + "&authorid=" + cust_auth + "&cart_id=" + cart_id + "&couponname=" + coupontxt + "",
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    if (data.responseCode == 1) {
                        //var grandttl = $("#total_cart_amount").val();
                        //previousTotalAmount = grandttl;
                        //var discount = data.discount;
                        //var disamt = data.discountamount;
                        //var ttlamt = $("#total_cart_amount").val();
                        //var finalamt = ttlamt - disamt;
                        //$(".paybutton span").html(grandttl);
                        //$(".cart_tot").html(grandttl);
                        //$("#paymentamount").html(grandttl);
                        //$("#total_cart_amount").val(finalamt);
                        //$("#coupon_success").empty();
                        $("#coupon_success").show();
                        $("#coupon_amount").show();
                        $("#coupon-btn").hide();
                        var grandttl = $("#total_cart_amount").val();
                        $("#coupon").css("display", "none");

                        //var delcharge = "30";
                        //if (grandttl < 850) {

                        //    var grndgrndttl = grandttl + delcharge;

                        //}


                        $("#validationdiv").text(coupontxt + " Coupon Applied successfully");
                        $("#coupon_success").append(coupontxt);
                        $(".coupons").val("");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "#9FC443");

                        // Disable the button after applying the coupon
                        $("#apply_btn").prop("disabled", true);
                        $(".clear").css("display", "block");

                        //calling cart amount
                        cart_amount()

                    }
                    else if (data.responseCode == 6) {
                        $("#validationdiv").text("Please Login");
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "#ff0000");
                    }
                    else {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "#ff0000");
                    }


                }
            });
        }



    });

    $(".clear").click(function () {
        $(".coupons").val("");
        $("#apply_btn").prop("disabled", false);
        $(".clear").hide();
        $("#coupon-btn").show();
        $("#coupon_success").hide();
        $("#coupon_amount").hide();


        var x = document.getElementById("coupon");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        // for changing text on button
        var y = document.getElementById("coupon-btn");
        if (y.innerHTML == "") {
            // y.innerHTML = 'C';
            y.innerHTML = 'Add Coupon'
            $(".clear").css("display", "none");
        } else {
            y.innerHTML = 'Add Coupon';
        }
        $("#coupon").hide();

        var giftcardid = $(".coupons").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Cart/RemoveCoupon?project_id=" + Project_Id + "&cart_id=" + cart_id + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data.responseCode === 1) {
                    //alert("Gift Card Was Used Successfully");
                    $("#validationdiv").text(data.responseMessage);
                    /* $("#gift_success").append(giftcardid);*/
                    //  $(".coupons").val("");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#9FC443");
                    //calling cart amount
                    cart_amount()
                }
                else {
                    //alert(data.responsemessage);
                    $("#validationdiv").text(data.responsemessage);
                    //   $("#coupon_success").append(coupontxt);
                    //  $(".coupons").val("");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#9FC443");
                }

            }
        });


        // Restore the previous total amount when "Clear" is clicked
        //if (previousTotalAmount !== null) {
        //    $("#total_cart_amount").val(previousTotalAmount);
        //    $(".cart_tot").html(previousTotalAmount);
        //    $("#total_cart_amount_hidden").text("$" + previousTotalAmount);
        //}
    });


    $("#gift_btn").click(function () {

        var giftcardid = $(".giftcard").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Cart/GiftCardCheck?project_id=" + Project_Id + "&authorid=" + cust_auth + "&cart_id=" + cart_id + "&giftcardid=" + giftcardid + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data.responseCode == 1) {
                    //alert("Gift Card Was Used Successfully");
                    $("#Gift").css("display", "none");
                    $("#validationdiv").text("Gift Card Was Used Successfully");
                    $("#gift_success").append(giftcardid);
                    //  $(".coupons").val("");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#9FC443");
                    localStorage.setItem("giftcardamount", data.responsemessage)
                    localStorage.setItem("giftcardid_name", giftcardid)
                    $(".GiftCardclear").show();
                    $("#Gift-btn").hide();
                    //calling cart amount
                    cart_amount()
                }
                else {
                    //alert(data.responsemessage);
                    $("#validationdiv").text(data.responsemessage);
                    //   $("#coupon_success").append(coupontxt);
                    //  $(".coupons").val("");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#9FC443");
                }

            }
        });


    });

    $(".GiftCardclear").click(function () {

        $("#gift_btn").prop("disabled", false);
        $(".GiftCardclear").hide();
        $("#Gift-btn").show();
        $("#gift_success").hide();
        $("#giftcard_amount").hide();
        $("#gift_success").text("");
        $("#giftcard_amount").text("");
        var x = document.getElementById("Gift");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        // for changing text on button
        var y = document.getElementById("Gift-btn");
        if (y.innerHTML == "") {
            // y.innerHTML = 'C';
            y.innerHTML = 'Add Gift Certificate'
            $(".GiftCardclear").css("display", "none");
        } else {
            y.innerHTML = 'Add Gift Certificate';
        }
        $("#Gift").hide();
        localStorage.removeItem("giftcardamount")
        localStorage.removeItem("giftcardid_name")

        var giftcardid = $(".giftcard").val();

        //$.ajax({
        //    url: "https://api.americanfragrances.com/Cart/RemoveGiftCard?project_id=" + Project_Id + "&authorid=" + cust_auth + "&cart_id=" + cart_id + "&giftcardid=" + giftcardid + "",
        //    type: "GET",
        //    dataType: "JSON",
        //    async: false,
        //    crossDomain: true,
        //    success: function (data) {
        //        if (data.IsRedeemed === false) {
        //            //alert("Gift Card Was Used Successfully");
        //            $(".giftcard").val("");
        //            $("#validationdiv").text("Gift Card Removed Successfully");
        //            $("#gift_success").empty();
        //            //  $(".coupons").val("");
        //            $("#validationdiv").slideDown();
        //            $("#validationdiv").delay(10000).slideUp();
        //            $("#validationdiv").css("background", "#9FC443");
        //            //calling cart amount
        //            cart_amount()
        //        }
        //        else {
        //            //alert(data.responsemessage);
        //            $("#validationdiv").text(data.responsemessage);
        //            //   $("#coupon_success").append(coupontxt);
        //            //  $(".coupons").val("");
        //            $("#validationdiv").slideDown();
        //            $("#validationdiv").delay(10000).slideUp();
        //            $("#validationdiv").css("background", "#9FC443");
        //        }

        //    }
        //});



        // Restore the previous total amount when "Clear" is clicked
        //if (previousTotalAmount !== null) {
        //    $("#total_cart_amount").val(previousTotalAmount);
        //    $(".cart_tot").html(previousTotalAmount);
        //    $("#total_cart_amount_hidden").text("$" + previousTotalAmount);
        //}
    });

    $(".btnproceed").click(function () {
        authorid = localStorage.getItem('authorid');
        if (authorid) {
            //$("#Addnewaddress").modal();
            razorpay();

        } else {
            //$("#LoginModalCenter").modal();
            window.location.href = "home.html?login=1";
        }

    });
    function razorpay(options) {

        console.log($("#total_cart_amount").val());
        var name = $("#p_name").text();

        //var address = $("." + person_address).html();
        var email = $("#add_cust_eml").text();
        var amount = $("#total_cart_amount").val() * 100;// without *100 it is showimg invalid amount
        var delchrg = $("#delcharge").text();
        if (delchrg == 45) {
            var delivery_charge = delchrg;
        }
        else {
            var delivery_charge = 0;
        }
        var phone = $("#add_cust_phn").text();
        var address = $(".person_address").text();
        var timein = $("#timein").text();
        var timeout = $("#timeout").text();

        var deliverydate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        $("#deldate").val(deliverydate);
        var deldate = $("#deldate").val();

        if (name != '' && phone != '' && address != '') {

            var options = {
                "key": "rzp_test_yyW6qoXWE6ll1W", /*rzp_live_RIPDhzp47Y3TPj*/
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
                "currency": "INR",
                "name": "American Fragrance",
                "description": "Payment for American Fragrance",
                "image": "../images/logo_on.png",
                "handler": function (response) {
                    if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
                        console.log(response);
                        //redirect_url = '../../error.html';
                    } else {

                        //address = $(".add_address").val();
                        //City = $(".add_city").val();
                        //State = $(".add_state").val();
                        //zip = $(".add_pin_code").val();
                        redirect_url = 'payment.html?Id=' + response.razorpay_payment_id + '&cartID=' + cart_id + '&timein=' + timein + '&timeout=' + timeout + '&delivery_charge=' + delivery_charge;
                    }
                    window.location = redirect_url;
                },
                "prefill": {
                    "name": name,
                    "email": email,
                    "contact": phone
                },
                "notes": {
                    "address": address
                },
                "theme": {
                    "color": "#F37254"
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();

        } else {
            alert("Please add your Address");
        }

    }

    $(document).on("click", ".timeslot", function () {


        var timein = $(this).attr("timein");
        var timeout = $(this).attr("timeout");

        $("#timein").text(timein);
        $("#timeout").text(timeout);
        $("#timein").val(timein);
        $("#timeout").val(timeout);


    });
    $(".apply_btnAmerican Fragrance").click(function () {

        var codetxt = $(".txtpincode").val();


        $.ajax({
            url: "https://api.americanfragrances.com/Pincode/Check?project_id=" + Project_Id + "&authorid=" + cust_auth + "&code=" + codetxt + "",
            type: "POST",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                if (data.responseCode == 1) {

                    $("#pincheck").text("Order will be delivered in 2 to 5 working days.");
                    $("#pincheck").css("color", "#ca8d31");
                    $(".paybutton").prop("disabled", false);


                }
                else {
                    $("#pincheck").text("Currently unavailable");
                    $("#pincheck").css("color", "red");

                    $(".paybutton").prop("disabled", true);

                }


            }
        });


    });

    $(document).on("click", ".discount-btn", function () {
        var productid = $(this).attr('data-product-id');
        $("#prod_id").append(productid);
        $("#feedbaclmodal").show();
    });

    getquestions();
    //Questions Fetch
    function getquestions() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/FeedbackQuestionlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, value) {
                    var qunid = value.id;
                    if (qunid == "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339") {
                        var qun1 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun1" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun1opt modal-select" id="qun1" required><option value="" >Select</option> <option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun1").append(qun1);
                    } else if (qunid == "27059952-4128-4b44-be81-ea158ed8eb92") {
                        var qun2 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun2" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun2opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun2").append(qun2);
                    } else if (qunid == "c8f8dc67-b98b-436c-b74b-b21399bebc5c") {
                        var qun3 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun3" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun3opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun3").append(qun3);
                    } else if (qunid == "cb6924f2-a52e-43f8-8c0b-492234c4345e") {
                        var qun4 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun4" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun4opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun4").append(qun4);
                    } else if (qunid == "d84ee43f-6f45-4025-8755-fa04ea76667d") {
                        var qun5 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun5" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun5opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun5").append(qun5);
                    } else if (qunid == "214c962f-7ee6-4158-bc0b-a4c8059a6cc2") {
                        var qun6 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun6" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun6opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun6").append(qun6);
                    } else if (qunid == "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4") {
                        var qun7 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun7" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun7opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun7").append(qun7);
                    } else if (qunid == "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae") {
                        var qun8 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun8" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun8opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun8").append(qun8);
                    } else if (qunid == "6239cda0-e527-4e32-be3b-be94f9447067") {
                        var qun9 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun9" id="' + value.id + '">' + value.question + '</label></div><div class="col-md-4"><select class="qun9opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun9").append(qun9);
                    } else if (qunid == "e64bd14d-cfac-490c-b80a-fe7329029bf8") {
                        var qun10 = '<div class="row align-items-center"><div class="col-md-8"><label class="form-label" for="qun10" id="' + value.id + '" >' + value.question + '</label></div><div class="col-md-4"><select class="qun10opt modal-select" id="qun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun10").append(qun10);
                    }


                });
            }
        });
    };
    $(document).on('submit', "#feedback", function () {

        if (cust_auth == null || cust_auth == undefined || cust_auth == '') {
            window.location = "home.html?login=1";
        } else {
            var question1 = "1";
            var question2 = "2";
            var question3 = "3";
            var question4 = "4";
            var question5 = "5";
            var question6 = "6";
            var question7 = "7";
            var question8 = "8";
            var question9 = "9";
            var question10 = "10";
            var questionIds = [];
            questionIds.push(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10);
            var qun1option = $(".qun1opt option:selected").val();
            var qun2option = $(".qun2opt option:selected").val();
            var qun3option = $(".qun3opt option:selected").val();
            var qun4option = $(".qun4opt option:selected").val();
            var qun5option = $(".qun5opt option:selected").val();
            var qun6option = $(".qun6opt option:selected").val();
            var qun7option = $(".qun7opt option:selected").val();
            var qun8option = $(".qun8opt option:selected").val();
            var qun9option = $(".qun9opt option:selected").val();
            var qun10option = $(".qun10opt option:selected").val();

            var prodt_id = $("#prod_id").text();
            var qty = $('.quantity').on('input', function () {
                var inputValue = $(this).val();
                return inputValue;
            });


            const productAmountElement = $("#insdis" + prodt_id);
            const productAmountText = productAmountElement.text();

            // Attempt to parse the productAmountText as a float, with a default of 0
            var productAmount = parseFloat(productAmountText) || 0;
            var selectedOptionNumbers = [];
            selectedOptionNumbers.push(qun1option, qun2option, qun3option, qun4option, qun5option, qun6option, qun7option, qun8option, qun9option, qun10option);

            const requestData = {
                questionIds: questionIds,
                selectedOptionNumbers: selectedOptionNumbers,
                authorid: Authkey,
                productid: prodt_id,
                cartid: cart_id
            };

            // Log the complete request data
            console.log("Complete Request Data:", requestData);

            $.ajax({
                url: "https://api.americanfragrances.com//ProductAnalytics/CreateUserFeedback",
                type: "POST",
                dataType: "json",
                data: { questionIds: questionIds, selectedOptionNumbers: selectedOptionNumbers, authorid: Authkey, productid: prodt_id, cartid: cart_id },
                success: function (response) {

                    //alert("Successfully submitted");

                    $("#feedbaclmodal").hide();
                    $(".discount-btn").hide();

                    cart_index(cart_id);
                    var loc = location.href;
                    console.log(loc);
                    location.href = loc;

                },
                error: function (error) {
                    // Handle error response
                    console.error(error);
                }
            });
        }

    });
    //giftcard
    $("#formgift").submit(function () {

        var yourname = $("#username").val();
        var recipientname = $("#recipientusername").val();
        var yourmail = $("#email").val();
        var recipientmail = $("#recipientemail").val();
        var amount = $("#giftamount").val();
        var message = $("#giftmessage").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Coupons/CreateAndSendGiftCard",
            type: "POST",
            data: { "Project_Id": Project_Id, "CreatedBy": cust_auth, "yourname": yourname, "recipientname": recipientname, "yourmail": yourmail, "recipientmail": recipientmail, "amount": amount, "message": message },
            dataType: "json",
            traditional: true,
            success: function (data) {

                alert(data.message);
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/home.html?login=1";
                    return;
                }
            }
        });
    });

    $("#giftMessageEdit").hide();
    $("#giftMessageSubmit").click(function () {

        var gift_message = $("#giftMessage").val();
        localStorage.setItem("gift_message", gift_message);
        $("#giftMessage").val("");
        $("#giftMessageSubmit").hide();
        $("#giftMessageEdit").show();


    });
    $("#giftMessageEdit").click(function () {

        var gift_mes = localStorage.getItem("gift_message");
        $("#giftMessage").val(gift_mes);
        $("#giftMessageEdit").hide();
        $("#giftMessageSubmit").show();


    });

    $("#cartNext").click(function () {
        if (cust_auth != "" && cust_auth != undefined && cust_auth != null) {
            window.location.href = "shipping.html";
        }
        else {
            $("#loginpopup").modal('show')
        }
    });





    $("#NoteProducts-curosel2").owlCarousel({
        loop: true,
        margin: 0,
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
                dots: false,
                margin: 0,

            },
        },
    });

    function cartupadtion(prod_id) {
        var prod_id = prod_id
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
                    data: {
                        cart_id: cart_id,
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                    },
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
                    },
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
                    },
                });
            }
        } else {
            $("input[id =" + prod_id + "]").css("border", "solid 1px red");
        }
    }

    $(document).on("click", "#NoteProducts-curosel2 .cartbtn", function () {
        var prod_id = $(this).attr("data");
        cartupadtion(prod_id)
        window.location.reload();
    });
    $(document).on("click", ".whishlistProCart", function () {
        var $this = $(this); // Store reference to the clicked element
        var prod_id = $this.attr("data");
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

                        $this.closest(".whishlistProCart").find('.fa-heart')
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
                                    $this.closest(".whishlistProCart").find('.fa-heart')
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

    $(document).on("click", ".whishlistProCart2", function () {
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
    });


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
    };
});
