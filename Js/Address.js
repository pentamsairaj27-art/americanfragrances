



$(document).ready(function () {
    var Project_Id = GlobalInputs();

    $("#add_address").hide();
    $("#yaab-alert-box").hide();
    var path = window.location.pathname;
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var address = params.get('address');
    if (address != null) {
        $("#yaab-alert-box").show();
    }
    var msg = params.get('param');
    if (msg != null) {

        $("#validationdiv").text(msg);
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(10000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    $("#edit_address").hide();
    $("#btn_add_address").click(function () {
        $("#address_list").hide();
        $("#edit_address").hide();
        $("#add_address").show();
    });
    var Project_Id = GlobalInputs();
    //var ProjectAuth = localStorage.getItem("Admin_auth");
    let Authkey = localStorage.getItem("authorid");
    var authorid = localStorage.getItem("authorid");
    $.ajax({
        url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {
           /* $(".Hello_txt_big").text(data.firstname);*/
            $(".Hello_txt_big").text(data.firstname);
        },
        error: function (xhr) {
        }
    });
    //----------------------------------------adding dropdown to state field--------------------------------//
    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const dropdown = $("#State, #edit_State");
    states.forEach(function (state) {
        dropdown.append($('<option>', {
            value: state,
            text: state
        }));
    });


    //---------------------------------------Address Create Method-----------------------------------------//
    $("#Add_Address").submit(function () {

        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var txt_phone = $("#txtphone").val();
        var txt_City = $("#City").val();
        var txt_State = $("#State").val();
        var addline1 = $("#addline1").val();
        var addline2 = $("#addline2").val();
        var country = $("#Country").val();
        var txt_pincode = $("#txtpincode").val();
       // var defaultaddress = $("#default").is(":checked");
        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Create",
            type: "POST",
            data: { "Project_id": Project_Id, "firstname": fname, "lastname": lname, "authorid": Authkey, "phone": txt_phone, "addressline1": addline1, "addressline2": addline2, "city": txt_City, "state": txt_State, "country": country, "pincode": txt_pincode, "isprimary": true },
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data.responseCode == 0) {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                }
                else {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    // data.responsemessage;
                    // getdatatable();
                    var cart_id = localStorage.getItem("cart_id");

                    //if (cart_id) {
                    //    var msg = data.responsemessage;
                    //    window.location.href = "shippingOptions.html";
                    //} else {
                    //    window.location.href = "Address.html";
                    //}
                    window.location.reload();
                   
                }
                


                // 
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "Home.html";
                    return;
                }
            }
        });
    });


    if (Authkey != "null") {
        getdatatable();
    }
    else {
        window.location.href = "home.html?login=1";
    }
    //---------------------------------------Address List Method-----------------------------------------//
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + Authkey + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,

            success: function (data) {

                if (data != "" && data.id != "00000000-0000-0000-0000-000000000000") {
                    data.responsemessage;
                    i = 0;
                    $.each(data, function (Index, value) {
                        if (value.isprimary) {

                            var newrowContent = '<div class="col-md-4 removediv p-2"><div class="address_box addressbox"><div><p>Shipment Address :</p></div><hr><p><input type="radio" id=' + value.id + ' checked name="address"/><span>&nbsp;&nbsp;</span><span class="Person_name">' + value.firstname + ' ' + value.lastname + '</span> </p> <span class="person_address"> ' + value.addressline1 + '</span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' </span><span class="person_address"> ' + value.country + ' </span><span class="person_address"> ' + value.pincode + ' </span><p class="person_mobile_no">Mobile: ' + value.phone + ' </p><hr><span id=' + value.id + ' class="lbl_edit edit btnedit">Edit</span><span id=' + value.id + ' class="addressdel Delete">Remove</span></div></div>'
                        }
                        else {

                            var newrowContent = '<div class="col-md-4 removediv p-2"><div class="address_box addressbox"><div><p class="setaddress">Set as Shipment Address :</p></div><hr><p><input type="radio" id=' + value.id + ' name="address"/><span>&nbsp;&nbsp;</span><span class="Person_name">' + value.firstname + '</span> </p> <span class="person_address"> ' + value.addressline1 + ' </span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' </span><span class="person_address"> ' + value.country + ' </span><span class="person_address"> ' + value.pincode + ' </span><p class="person_mobile_no">Mobile: ' + value.phone + ' </p><hr><span id=' + value.id + ' class="lbl_edit edit btnedit">Edit</span><span id=' + value.id + ' class="addressdel Delete">Remove</span></div></div>'
                        }
                        $("#Address_list").append(newrowContent);


                    });
                } else {
                    $("#address_list").hide();
                    $("#edit_address").hide();
                    $("#add_address").show();
                }
                //else {

                //    var newrowContent = '<table style=""><tr><td><div class="icon_dv"><div class="lbl_icon_circle"> <span class="iconify lbl_icon" data-icon="ic:outline-add-location-alt" data-inline="false"></span></div></div></td><td><h6 class="txt_sm">Add your Address & Enjoy Faster Checkout</h6></td></tr></table>'
                //    $("#Address_list").append(newrowContent);
                //}


            }
        });
    };


    //---------------------------------------Address Edit Method--------------------------------------------//
    $(".lbl_edit").click(function () {
        var getid = $(this).attr("id");

        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + authorid + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                $("#hiddenid").val(data.id);
                $("#edit_fname").val(data.firstname);
                $("#edit_lname").val(data.lastname);
                $("#edit_phone").val(data.phone);
                $("#edit_City").val(data.city);
                $("#edit_State").val(data.state);
                $("#edit_addline1").val(data.addressline1);
                $("#edit_addline2").val(data.addressline2);
                $("#edit_country").val(data.country);
                $("#edit_pincode").val(data.pincode);
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#Edit_Address").submit(function () {
        var id = $("#hiddenid").val();

        var fname = $("#edit_fname").val();
        var lname = $("#edit_lname").val();
        var txt_phone = $("#edit_phone").val();
        var txt_City = $("#edit_City").val();
        var txt_State = $("#edit_State").val();
        var addline1 = $("#edit_addline1").val();
        var addline2 = $("#edit_addline2").val();
        var country = $("#edit_country").val();
        var txt_pincode = $("#edit_pincode").val();

        if (id != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Addressbook/Edit?id=" + id + "&authorid=" + ProjectAuth + "",
                type: "POST",
                data: { "Project_id": Project_Id, "firstname": fname, "lastname": lname, "authorid": Authkey, "phone": txt_phone, "addressline1": addline1, "addressline2": addline2, "city": txt_City, "state": txt_State, "country": country, "pincode": txt_pincode },
                dataType: "json",
                traditional: true,
                success: function (data) {

                    //getdatatable();
                    if (data.responseCode == 1) {
                        //$('#Editcategory').modal('toggle');
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        var msg = data.responsemessage;
                        if (path == "/shipping.html") {
                            window.location.href = "/shipping.html?param=" + msg;
                        } else {
                            window.location.href = "Address.html?param=" + msg;
                        }
                      

                    }
                    else if (data.responseCode == 2) {
                        window.location.href = "Home.html";
                    }
                    else if (data.responseCode == 6) {
                        $("#returnmessage").text("Sorry, Something went wrong");
                    }
                    else if (data.responseCode == 0) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(5000).slideUp();
                        $("#validationdiv").css("background", "orange");
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = "Home.html";
                        return;
                    }
                }
            });
        }
    });
    //---------------------------------------Address Delete  Method-----------------------------------------//
    $("#Address_list").on('click', ".Delete", function () {

        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Addressbook/Delete?project_id=" + Project_Id + "&authorid=" + Authkey + "",
                type: "POST",
                data: { "id": getid },
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    data.responsemessage;

                    if (data.responseCode == 1) {
                        $("#" + getid).closest(".removediv").css("background", "tomato");
                        $("#" + getid).closest(".removediv").css("color", "#fff");
                        $("#" + getid).closest(".removediv").fadeOut(1000, function () {
                            $(this).remove();
                        });
                    }
                },
                error: function (xhr) {
                    //
                }
            });
        }
    });

    //checkig checked primary addeess is there or not
    $('#shipping').on('click', function () {
        // Query for a radio input with name "address" that is checked
        var primaryAddress = $('input[name="address"]:checked');

        if (primaryAddress.length > 0) {
            // Primary address exists
            window.location.href = '/shippingOptions.html';
            // Optionally, perform further actions, e.g., proceeding to the next step
        } else {
            alert("Please add address or Select address")
        }
    });




    $('input:radio[name="address"]').change(
        function () {
            if ($(this).is(':checked')) {
                var getid = $(this).attr("id");
                var shippingpage = "shipping.html";
                var SubscriptionAddress = "Address.html";
                $.ajax({
                    url: "https://api.americanfragrances.com/Addressbook/Defaultaddress",
                    type: "POST",
                    data: { "Project_id": Project_Id, "authorid": Authkey, "id": getid },
                    dataType: "json",
                    traditional: true,
                    success: function (data) {
                        if (path.includes(shippingpage)) {
                            window.location.href = "checkoutPayment.html";
                        } else if (path.includes(SubscriptionAddress)) {
                           //closing modal
                        }
                        else {
                            data.responsemessage;
                            add = "adderess";
                            window.location.href = "cart.html?address=" + add;
                          
                            //$("#yaab-alert-box").show();
                        }
                        
                        
                    },
                    error: function (xhr) {
                        if (xhr.status === 401) {
                            window.location.href = "Home.html";
                            return;
                        }
                    }
                });
            }
        });

    $("#addcnl").click(function () {
        $("#add_address").hide();
        $("#edit_address").hide();
        $("#address_list").show();
    });
    $("#editcnl").click(function () {
        $("#add_address").hide();
        $("#edit_address").hide();
        $("#address_list").show();
    });
    $(".btnedit").click(function () {
        $("#add_address").hide();
        $("#address_list").hide();
        $("#edit_address").show();

    });
});

