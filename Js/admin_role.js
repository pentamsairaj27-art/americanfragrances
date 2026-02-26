$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var msg = params.get('param');

    if (msg != null) {

        $("#validationdiv").text(msg);
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(10000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#rolecreate").submit(function () {
        var txtrole = $("#txtrole").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Role/Create",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": txtrole, "authorid": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {
                
                if (data.responseCode == 1) {
                    $('#Addcategory').modal('toggle');
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    var msg = data.responsemessage;
                    window.location.href = "/Admin/Roles.html?param=" + msg;
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
            url: "https://api.americanfragrances.com/Role/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $("#tblroles tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td> " + value.name + " </td><td><button id=" + value.id + " class='btn role_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tblroles tbody").append(newrowContent);


                });
            }
        });
    };

    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblroles").on('click', ".role_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Role/Delete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

