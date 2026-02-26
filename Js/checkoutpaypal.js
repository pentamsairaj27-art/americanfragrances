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
        $("#emptycart").html('<br><center><img src="/Images/empty_order.png" class="mb-2"/></center><p style="text-align: center"><b>Your Shopping cart is currently empty.</b><br><br><a href="home.html"><button class="btn">RETURN TO SHOP</button></a><p><br>');
        $(".payment_summary").hide();
        $(".cart_table").hide();
    }

    //if (cust_auth) {
    //    $("#customer_notloggedin").hide();
    //    $("#customer_loggedin").show();
    //    getcustomeraddress()
    //} else {
    //    $("#customer_notloggedin").show();
    //    $("#customer_loggedin").hide();
    //}
    var deliverydate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    $("#deldate").text(deliverydate);
    $(".paybutton").click(function () {

        authorid = localStorage.getItem('authorid');

        
        if (authorid != null && authorid != "undefined" && authorid != "") {
            getcustomeraddress();
            var address = $("#Address_listcart").text();

            if (address != '') {
                var amount = $("#total_cart_amount").val();
                authorid = localStorage.getItem('authorid');
                initiatePayment(1, authorid);

               
            }
            else {
                window.location.href = "Address.html";
            }


        }
        else {
            //  $("#LoginModalCenter").modal();

            window.location.href = "Register.html";
        }


    });

   
    function initiatePayment(amount, authorid) {
        
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/InitiatePayment",
            type: "POST",
            data: { "amount": amount, "authorid": authorid },
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                
                if (response.success) {
                    
                    
                    var paymentUrl = response.data.instrumentResponse.redirectInfo.url;
                    window.location.href = paymentUrl;
                   
                   
                } else {
                    //console.log('Payment initiation failed:', response.errorMessage);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log('AJAX Error:', textStatus, errorThrown);
            }
        });
    }
    function getcustomeraddress() {

        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + cust_auth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data != "") {
                    
                    var i = 0;
                    $("#primary_address").empty();
                    $("#Address_listcart").empty();
                    $.each(data, function (Index, value) {

                        i = i + 1;
                        if (i == 1) {
                            localStorage.setItem("AddressID", value.id);
                            var newrowContent = ' <span class="Person_name" id="p_name">' + value.firstname + '</span><br /><span class="person_address">' + value.addressline1 + ' </span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' </span><span class="person_address"> ' + value.country + ' - </span><span class="person_address"> ' + value.pincode + ' </span><br><span class="person_mobile_no" id="add_cust_phn">Mobile:  ' + value.phone + ' </span><br>Email:  <span class="person_mobile_no" id="add_cust_eml">' + value.email + ' </span>'
                            var newrowContentcart = '<div class="col-md-6 "><p>&nbsp;&nbsp;</span><span class="Person_name">' + value.firstname + '</span> </p> <span class="person_address"> ' + value.addressline1 + ' ' + value.addressline2 + '</span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' </span><span class="person_address"> ' + value.country + ' </span><span class="person_address"> ' + value.pincode + ' </span><p class="person_mobile_no">Mobile: ' + value.phone + ' </p></div><div class="col-md-6"><p>Is this your Shipment Address?</p><a class="btn close primarybtn" id="defaultshipmentadd" data-dismiss="shipmentaddress">YES</a><a class="btn" href="Address.html">NO</a></div></div>'

                            $("#primary_address").append(newrowContent);
                            $("#Address_listcart").append(newrowContentcart);
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

    $(".change_address_cart").click(function () {
        if (cust_auth) {
            location.href = "/Address.html?id=fromcart";
        }

    });

});
