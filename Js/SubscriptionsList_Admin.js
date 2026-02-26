$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();

    //---------------------------------------Brand List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/ListofSubscriptionsForAdmin?AdminId=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                var data = data.data;
                 
                $("#tblcategory_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var startdate = new Date(value.StartDate);
                    var formattedStartDate = startdate.toLocaleDateString();
                    var Enddate = new Date(value.EndDate);
                    var formattedEndDate = Enddate.toLocaleDateString();
                    var amount = parseFloat(value.Amount).toFixed(2);
                    var refundAmount ="0.00";
                    if (value.RefundAmount) {
                         refundAmount = parseFloat(value.RefundAmount).toFixed(2);
                    }
                    
                    var newrowContent = "<tr><td> " + value.CustomerName + " </td><td> " + value.CustomerEmail + " </td><td> " + value.CustomerPhone + " </td><td> " + value.PlanName + " </td><td> $" + amount + " </td><td>$ " + (refundAmount || "0") + " </td></tr>"

                    $("#tblcategory_lst tbody").append(newrowContent);


                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/GetById?id=" + getid + "&authorId=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.ID);

                // Set the form field values
                $("#edit_Subscription_Name").val(data.Name);
                $("#edit_Days").val(data.Days);
                $("#edit_Price").val(data.Price);
                $("#edit_Product_Count").val(data.ProductCount);

                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
        var id = $("#hiddenid").val();
        var subscriptionName = $('#edit_Subscription_Name').val();
        var Days = $('#edit_Days').val();
        var Price = $('#edit_Price').val();
        var ProductCount = $('#edit_Product_Count').val();

        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/Update?id=" + id,
            type: "POST",
            data: { "id": id, "Name": subscriptionName, "Days": Days, "Price": Price, "ProductCount": ProductCount, "AuthorId": ProjectAuth },

            dataType: "json",
            traditional: true,
            success: function (data) {
                 
                // getdatatable();
                $('#Editcategory').modal('toggle');
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


    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblcategory_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Subscription/Delete?id" + getid + "&authorId=" + ProjectAuth + "",
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

