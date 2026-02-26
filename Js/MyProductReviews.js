
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    $.ajax({
        url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {
            $(".Hello_txt_big").text(data.firstname);
        },
        error: function (xhr) {
        }
    });
    

    $.ajax({
        url: "https://api.americanfragrances.com/Review/GetReviewsForCustomer?authorid=" + Authkey + "",
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $.each(data, function (index, value) {
                var newrowContent = "<tr><td><a href='Productview.html?id=" + value.productid + "'>" + value.ProductName + "</a></td><td>" + value.Rating + "</td><td>" + value.Comment + "</td><td><button id=" + value.Id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button></td></tr>";
                $("#order_list tbody").append(newrowContent);
               
            });
        }
    });
  //---------------------------------------------------------Edit method-------------------------------------------//
    $(".edit").click(function () {
        
        var getid = $(this).attr("Id");
        $.ajax({
            url: "https://api.americanfragrances.com/Review/EditReviewsForCustomer?authorid="+ Authkey+ "&id=" + getid +"",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                
                console.log(data);
                $("#hiddenid").val(data.id);
                $("#edit_review").val(data.comment);
                $("#edit_rating").val(data.rating); 
                $("#productId").val(data.product_id);
                $("#title").val(data.title);
                $('#Editreview').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    //-------------------------------------------------------submit update review ------------------------------------------------//
    $("#cat_edit").submit(function () {
        var review = $("#edit_review").val();
        var rating = $("#edit_rating").val();
        var productid = $("#productId").val();
        var title = $("#title").val()      
        var id = $("#hiddenid").val();
       
            $.ajax({
                url: "https://api.americanfragrances.com/Review/UpdateReviewsForCustomer",
                type: "POST",
                data: { "id": id, "authorid": Authkey,  "comment": review, "title": title, "rating": rating, "product_id": productid, "project_id": Project_Id},
                dataType: "json",
                traditional: true,
                success: function (data) {
                    
                    // getdatatable();
                    $('#Editreview').modal('toggle');
                    if (data.responseCode == 1) {
                        $('#Editreview').modal('toggle');
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
        
    //    else {

    //        var reader = new FileReader();
    //        reader.onloadend = function () {
    //            imagebase64 = reader.result;
    //            imagestr = imagebase64;
    //            $.ajax({
    //                url: "https://api.americanfragrances.com/Home/AddTestimonial",
    //                type: "POST",
    //                data: { "id": id, "Project_Id": Project_Id, "Name": username, "Email": useremail, "createdby": ProjectAuth, "Image": imagestr, "Designation": user_designation, "Content": Description },
    //                dataType: "json",
    //                traditional: true,
    //                success: function (data) {
    //                    getdatatable();

    //                    $('#Editcategory').modal('toggle');
    //                    if (data.responseCode == 1) {
    //                        $('#Editcategory').modal('toggle');
    //                        $("#validationdiv").text(data.responsemessage);
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(10000).slideUp();
    //                        $("#validationdiv").css("background", "orange");
    //                        getdatatable();
    //                        var dataurl = window.location.href;
    //                        window.location = dataurl;
    //                    }
    //                    else if (data.responseCode == 2) {
    //                        window.location.href = "/Admin/Login.html";
    //                    }
    //                    else if (data.responseCode == 6) {
    //                        $("#returnmessage").text("Sorry, Something went wrong");
    //                    }
    //                    else if (data.responseCode == 0) {
    //                        $("#validationdiv").text(data.responsemessage);
    //                        $("#validationdiv").slideDown();
    //                        $("#validationdiv").delay(5000).slideUp();
    //                        $("#validationdiv").css("background", "orange");
    //                    }

    //                },

    //                error: function (xhr) {
    //                    if (xhr.status === 401) {
    //                        window.location.href = "/Admin/Login.html";
    //                        return;
    //                    }
    //                }

    //            });
    //        }
    //        reader.readAsDataURL(file);
    //    }
    });
    //------------------------------------------------------end submit update review---------------------------------------------------//
  
 });


