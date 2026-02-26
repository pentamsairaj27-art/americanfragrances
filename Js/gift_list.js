$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");

    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#gift_create").submit(function () {
        
        var giftname = $("#giftname").val();
        var Value = $("#giftvalue").val();
        var validdate = $("#Expriydate").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Coupons/CreateGiftCard",
            type: "POST",
            data: { "Project_Id": Project_Id, "Name": giftname, "Value": Value, "authorid": ProjectAuth, "ExpiryDate": validdate },
            dataType: "json",
            traditional: true,
            success: function (data) {

                $('#Addcategory').modal('toggle');
                if (data.responseCode == 1) {
                    $('#Addcategory').modal('toggle');
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    var dataurl = window.location.href;
                    window.location = dataurl;
                }
                else if (data.responseCode == 2) {
                    window.location.href = "/Admin/Login.html";
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
                    window.location.href = "/Admin/Login.html";
                    return;
                }
            }
        });
    });
    //---------------------------------------Category List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/coupons/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#tblcategory_lst tbody").empty();
                $.each(data, function (Index, value) {
                    
                    var newrowContent = "<tr><td> " + value.name + "</td ><td>" + value.discount + " <span>%</span></td><td>" + value.max_discountamount + " </td><td>" + value.minimum_amount + " </td><td>" + value.no_of_time_use + " </td><td>" + value.expiredon + "</td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>&nbsp;<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                    $("#tblgift_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/coupons/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                
                var nowDate = new Date(parseInt(data.expiredon.substr(6)));
                var dateObject = new Date(nowDate);
                var dt = new Date(dateObject);
                var dateedit= (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear();
                $("#editid").val(data.id);
                $("#editcouponname").val(data.name);
                $("#editcoupoundiscount").val(data.discount);
                $("#lbldateEdit").text(dateedit);
                $("#editmaxdiscount").val(data.max_discountamount);
                $("#editmindiscount").val(data.minimum_amount);
                $("#editNotimeuse").val(data.no_of_time_use);
                $('#Editcoupon').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#coupon_edit").submit(function () {
        var couponname = $("#editcouponname").val();
        var coupondicount = $("#editcoupoundiscount").val();
        var validdate = $("#editExpriydate").val();
        if (validdate=="") {
            var maxdiscountamount = $("#editmaxdiscount").val();
            var mindiscountamount = $("#editmindiscount").val();
            var No_timeuse = $("#editNotimeuse").val();
            var id = $("#editid").val();
            if (id != null) {
                $.ajax({
                    url: "https://api.americanfragrances.com/coupons/Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth,
                    type: "POST",
                    data: { "Project_Id": Project_Id, "name": couponname, "discount": coupondicount, "authorid": ProjectAuth, "max_discountamount": maxdiscountamount, "minimum_amount": mindiscountamount, "no_of_time_use": No_timeuse, "id": id },
                    dataType: "json",
                    traditional: true,
                    success: function (data) {

                        // getdatatable();
                        $('#Editcoupon').modal('toggle');
                        if (data.responseCode == 1) {
                            $('#Editcategory').modal('toggle');
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "orange");
                            var dataurl = window.location.href;
                            window.location = dataurl;
                        }
                        else if (data.responseCode == 2) {
                            window.location.href = "/Admin/Login.html";
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
                            window.location.href = "/Admin/Login.html";
                            return;
                        }
                    }
                });
            }
        }
        else {
            var maxdiscountamount = $("#editmaxdiscount").val();
            var mindiscountamount = $("#editmindiscount").val();
            var No_timeuse = $("#editNotimeuse").val();
            var id = $("#editid").val();
            if (id != null) {
                $.ajax({
                    url: "https://api.americanfragrances.com/coupons/Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth,
                    type: "POST",
                    data: { "Project_Id": Project_Id, "name": couponname, "discount": coupondicount, "authorid": ProjectAuth, "expiredon": validdate, "max_discountamount": maxdiscountamount, "minimum_amount": mindiscountamount, "no_of_time_use": No_timeuse, "id": id },
                    dataType: "json",
                    traditional: true,
                    success: function (data) {

                        // getdatatable();
                        $('#Editcoupon').modal('toggle');
                        if (data.responseCode == 1) {
                            $('#Editcategory').modal('toggle');
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "orange");
                            var dataurl = window.location.href;
                            window.location = dataurl;
                        }
                        else if (data.responseCode == 2) {
                            window.location.href = "/Admin/Login.html";
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
                            window.location.href = "/Admin/Login.html";
                            return;
                        }
                    }
                });
            }
        }


    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblgift_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");

            $.ajax({
                url: "https://api.americanfragrances.com/coupons/Delete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "POST",
                data: { "id": getid },
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    if (data.responseCode == 1) {
                        $("#" + getid).closest("tr").css("background", "tomato");
                        $("#" + getid).closest("tr").css("color", "#fff");
                        $("#" + getid).closest("tr").fadeOut(1000, function () {
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

});

