$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    /*$(".cust_login").submit(function () {

        var username = $("#username").val();
        var reviewtext = $("reviewtxt").val();
        var ratings = $('input[name="experience"]:checked').val();
        
        
            $.ajax({
                url: "https://api.americanfragrances.com/Review/ReviewList ",
                type: "POST",
                data: { "Project_Id": Project_Id, "Name": username, "": reviewtext, "createdby": ProjectAuth,    },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    getdatatable();

                    $('#Addcategory').modal('toggle');
                    if (data.responseCode == 1) {
                        $('#Addcategory').modal('toggle');
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        getdatatable();
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
        reader.readAsDataURL(files);
    });*/
    //---------------------------------------Category List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Review/ReviewList?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
               
                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td> " + value.title + " </td><td>" + value.comment + "</td><td>" + value.rating + "</td><td><button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tbltesti_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tbltesti_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Review/DeleteReview?id" + getid + "&project_id=" + Project_Id + "&AdminID=" + ProjectAuth + "",
                type: "GET",
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

