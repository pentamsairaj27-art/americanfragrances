var Project_Id = GlobalInputs();
let Authkey = localStorage.getItem("authorid");
if (Authkey == null || Authkey == "") {
    window.location.href = "/Home.html"
}
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var getparm = params.get('order');
 

    //$.ajax({
    //    url: "https://api.americanfragrances.com/Subscription/ListOfSubscriptionTypesForCustomer",
    //    type: "GET",
    //    dataType: "json",
    //    traditional: true,
    //    success: function (data) {
    //        $.each(data, function (Index, value) {
    //             
    //            var subscriptionCard = $('<div class=col-md-4><div class="card m-4 p-3"><h4 class=text-center id=planename> ' + value.Name + '</h4><br><br><div class=plan-Details><p class=ProductCount> Product Count :  ' + value.ProductCount + '<p class=Price>Price :   ' + value.Price + '<p class=Days>Days :  ' + value.Days + '</div><form onsubmit=return!1><div><select id="products' + value.ID + '"><option value="">Select</select><p class="mb-0 mt-1">Select Start Date</p><input class=form-control id=startDate type=date><p class="mb-0 mt-1">Select End Date</p><input class=form-control id=EndDate type=date><br></div><div class=text-center><button class="btn more_btn" id=' + value.ID + ' type=submit>Subscribe</button></div></form></div></div>');
    //            $('.cardsContaner').append(subscriptionCard);
    //            $.ajax({
    //                url:
    //                    "https://api.americanfragrances.com/Home/products?project_id=" +
    //                    Project_Id,
    //                type: "GET",
    //                dataType: "JSON",
    //                async: false,
    //                crossDomain: true,

    //                success: function (data) {
    //                    $.each(data, function (Index, value) {
    //                        var newrowContent = "<option value='" + value.id + "'>" + value.name + "</option>";
    //                        $("#products"+value.Id).append(newrowContent);
    //                    });
    //                },
    //            });
    //        });


    //    },
    //    error: function (xhr) {
    //        if (xhr.status === 401) {
    //            window.location.href = "/Admin/Login.html";
    //            return;
    //        }
    //    }
    //});
    getdatatable();
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                //var bindingprofile = '<div class="row"> <div class="col-md-3"> <p class="lbl_label">Name</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.name + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Email Id</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.email + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Mobile Number</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.phone + '</p> </div> </div>';
                //$("#dvfetchcust_details").append(bindingprofile); 
                $(".Hello_txt_big").text(data.firstname);

            },
            error: function (xhr) {
            }
        });
    };

    $.ajax({
        url: "https://api.americanfragrances.com/Subscription/ListofSubscriptionsOFCustomer?CustomerId=" + Authkey,
        type: "GET",
        dataType: "json",
        traditional: true,
        success: function (data) {
           
            $.each(data, function (Index, value) {
              
                //var startTimestamp = parseInt(value.StartDate.replace('/Date(', '').replace(')/', ''), 10);
                //var endTimestamp = parseInt(value.EndDate.replace('/Date(', '').replace(')/', ''), 10);

             
                //var startdate = new Date(startTimestamp);
                //var enddate = new Date(endTimestamp);

             
                //var formattedStartDate = startdate.toLocaleDateString();
                //var formattedEndDate = enddate.toLocaleDateString();

                // Format the amount
                var amount = parseFloat(value.Amount).toFixed(2);

                // Construct the new row content
                var newrowContent = "<tr><td> " + value.id + " </td> <td>" + value.Name + "</td><td>" + ('$' + amount || "") + "</td> <td>" + (value.ProductCount || "") + "</td> <td>" + (value.Status == true ? "Active" : "In Active") + "</td>  </tr>";

                // Append the new row to the table
                $("#order_list tbody").append(newrowContent);
            });
            $('#order_list').DataTable();
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/Admin/Login.html";
                return;
            }
        }
    });

    $(".cardsContaner").on('click', ".more_btn", function () {
        var subscriptionTypeId = $(this).attr("id");        
        var startdate = $("#startDate" + subscriptionTypeId).val();
        var enddate = $("#EndDate" + subscriptionTypeId).val();
        var planName = $(this).data("name");
        var price = $(this).data("price");
        var days = $(this).data("days");
        var productCount = $(this).data("productCount");
        localStorage.setItem("subscriptionTypeId", subscriptionTypeId);
        localStorage.setItem("Substartdate", startdate);
        localStorage.setItem("Subenddate", enddate);
        localStorage.setItem("SubplanName", planName);
        localStorage.setItem("Subprice", price );
        localStorage.setItem("Subdays", days);
        localStorage.setItem("productCount", productCount);

        if (!startdate || !enddate) {
            alert("Please select both start date and end date.");
            return; // Exit the function if validation fails
        }

        if (startdate && enddate) {
            window.location.href = '/SubscriptionPayment.html'
        }

       
        //        
     
    });


});


