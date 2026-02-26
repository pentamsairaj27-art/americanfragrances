var fname, lname, addr1, addr2, city, state, pincode, country, phone, email;
$(document).ready(function () {
    getamount = localStorage.getItem("tax_amt")
    
   
    var cart_id = localStorage.getItem("cart_id");
    var cust_auth = localStorage.getItem("authorid");
    getcustomeraddress();
    if (cart_id) {
        cart_index(cart_id);
        cart_count(cart_id);
    }
    cart_amount()
    function cart_index(cartid) {

        if (cartid) {
            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Index?project_id=" + Project_Id + "&cart_id=" + cartid,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                     
                    $("#cart_list").empty();
                    $("#noProducts").empty();

                    if (data.length > 0 && data != "Cart is empty") {
                        $.each(data, function (Index, value) {
                            var discamt =
                                parseFloat(value.specialcouponamount || 0) +
                                parseFloat(value.additinal_discountamount || 0) +
                                parseFloat(value.discount_amount || 0);

                            var salePrice = parseFloat(value.price).toFixed(2);
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
                                    value.name +
                                    '</a></p><p>' +
                                    value.mood +
                                    '</a></p><p>By:<a class="brand' + value.brandname +
                                    ' brandunderline" href="">' +
                                    value.brandname +
                                    "</a></p></div > " +
                                    "</div></div></th>" +
                                    '<td class="align-middle">' +
                                    value.dimension +
                                    '</td>' +
                                    '<td class="align-middle"><div class="quantity d-flex"><button class="dec-btn minus"><i class="fa fa-minus "></i></button><input class="form-control quanty_value' +
                                    value.id +
                                    '" id="' +
                                    value.id +
                                    '" type="text" value="' +
                                    value.quantity +
                                    '"><button class="inc-btn plus"><i class="fa fa-plus "></i></button></div></td> ' +
                                    '<td class="align-middle text-center brandunderline">' + (value.additinal_discountamount === 0 || value.additinal_discountamount === null
                                        ? '<span style="font-weight:600" class="instantdiscount discount-btn" data-product-id="' + value.product_id + '"> GET INSTANT 5% DISCOUNT'
                                        : '') +
                                    '</td>' +
                                    '<td class="align-middle text-center"><p class="">$' + perPrice + '</p>' + (value.specialcouponamount > 0 ? '<p style="color:red;">- $' + value.specialcouponamount + ' (20% Exclusive Coupon Applied)</p>' : '') + (value.additinal_discountamount > 0 ? '<p style="color:red;">- $' + value.additinal_discountamount + ' (5% Questionnaire Discount Applied)</p>' : '') + '</td>' +
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
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name +
                                    '</a></p><p>' + value.mood + '</p><p>By:<a class="brand' + value.brandname + ' brandunderline" href="">' + value.brandname +
                                    "</a></p></div>" +
                                    '</div></div></th><td  class="align-middle"><p>' + value.quantity + '</p></td><td class="align-middle"><span class="">$' +
                                    value.rate +
                                    "</span><span class='text-danger px-2'>(-$" + discamt + ")</span></td>" +
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
                                    amount +
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
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name ourpricebold" href="Productview.html?id=' +
                                    value.product_id +
                                    '">' +
                                    value.name +
                                    '</a></p><p>' +
                                    value.mood +
                                    '</p><p>By:<a class="brand ' + value.brandname +
                                    ' brandunderline" href="">' +
                                    value.brandname +
                                    "</a></p></div>" +
                                    "</div></div></th>" +
                                    '<td class="align-middle">' +
                                    value.dimension +
                                    "</td>" +
                                    '<td class="align-middle"><div class="quantity d-flex"><button class="dec-btn minus"><i class="fa fa-minus "></i></button><input class="form-control quanty_value' +
                                    value.id +
                                    '" id="' +
                                    value.id +
                                    '" type="text" value="' +
                                    value.quantity +
                                    '"><button class="inc-btn plus"><i class="fa fa-plus "></i></button></div></td><td></td>' +
                                    '<td class="align-middle text-center"><p class="">$' + perPrice + '</p>' + (value.specialcouponamount > 0 ? '<p style="color:red;">- $' + value.specialcouponamount + ' (20% Exclusive Coupon Applied)</p>' : '') + (value.additinal_discountamount > 0 ? '<p style="color:red;">- $' + value.additinal_discountamount + ' (5% Questionnaire Discount Applied)</p>' : '') + '</td>' +
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
                                    '<div class="d-block text-start"><div class="ms-3"><p><a class="prduct_name ourpricebold" href="Productview.html?id=' +
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
                        //localStorage.setItem("cart_tax", taxamount);
                        var totalWithTax = (amount).toFixed(2);
                        localStorage.setItem("tax_amt", totalWithTax);
                       /* $("#tax").html(taxamount);*/
                        $(".cart_tot").html(totalWithTax);

                        $(".cart_pay").html(amount);
                        $(".paybutton span").html(amount);
                        $("#total_cart_amount").val(amount);
                        //var shippingCharge = parseFloat(data.shippingCharge).toFixed(2);
                        //$("#shippingAmt").html(isNaN(parseFloat(data.shippingCharge)) ? "0.00" : parseFloat(data.shippingCharge).toFixed(2));

                        var amounttotal = parseFloat(data.price).toFixed(2);
                        $("#amounttotal").html(amounttotal);
                        if (data.discount_amount) {
                            var totaldiscount = parseFloat(data.discount_amount).toFixed(2);
                        } else {
                            var totaldiscount = 0.00;
                        }
                        $("#totaldiscount").html(totaldiscount);
                        var totalgst = parseFloat(data.gst_amount).toFixed(2);
                        $("#totalgst").html(totalgst);
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
                        $("#gift_success").empty();
                        $("#gift_success").show();
                        $("#gift_success").text(data.giftcardname);
                        $(".giftcard").val(data.giftcardname);
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
     
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: getamount
                    },
                    shipping: {
                        name: {
                            full_name: `${fname} ${lname}`
                        },
                        address: {
                            address_line_1: addr1,
                            admin_area_2: city,
                            admin_area_1: city,
                            postal_code: pincode,
                            country_code: "US"
                        }
                    }
                }],
                payer: {
                    name: {
                        given_name: fname,
                        //surname: lname
                    },
                    email_address: email,
                    phone: {
                        phone_number: {
                            national_number: phone // Only numbers, no formatting (e.g., "1234567890")
                        }
                    },
                    address: {
                        address_line_1: addr1,
                        admin_area_2: city,
                        admin_area_1: city,
                        postal_code: pincode,
                        country_code: "US"
                    }
                }

            });
        },
        onApprove: function (data, actions) {
             
            return actions.order.capture().then(function (details) {

                var cart_id = localStorage.getItem("cart_id");
                var cust_auth = localStorage.getItem("authorid");
                var tax_amount = localStorage.getItem("tax_amt");
                var giftcardid_name = localStorage.getItem('giftcardid_name');
                var giftcardamount = localStorage.getItem('giftcardamount');
                alert('Payment successful! Transaction ID: ' + details.id);
                 
                var transid = details.id;
                var status = details.status;
                // Get the element with the class "cart_tot"
                localStorage.removeItem("cartTotalAmt")
                 
                const element = document.querySelector(".cart_tot");
                 
                // Get the text content of the element
                const amount = element.textContent;                    // You can perform further actions here after successful payment
                window.location.href = "payment.html?Id=" + transid + '&amount=' + amount + '&authorid=' + cust_auth + '&cartID=' + cart_id + '&tax_amount=' + tax_amount + '&status=' + status;
            });
        }
    }).render('#paypal-button-container');
    function getcustomeraddress() {
        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + cust_auth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data != "") {
                    $("#primary_address").empty();
                    var i = 0;
                    $.each(data, function (Index, value) {
                        i = i + 1;
                        if (i == 1) {
                            fname = value.firstname;
                            lname = value.lastname;
                            email = value.email;
                            phone = value.phone;
                            addr1 = value.addressline1;
                            addr2 = value.addressline2;
                            city = value.city;
                            state = value.state;
                            pincode = value.pincode;
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
});
