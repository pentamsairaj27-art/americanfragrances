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
    $("#activitiescreate").submit(function () {

        var txtactitivity = $("#txtactivities").val();
        var txtactivityurl = $("#txturl").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Activity/Create",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": txtactitivity, "url": txtactivityurl, "authorid": ProjectAuth },
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
                    window.location.href = "/Admin/Activities.html?param=" + msg;
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

    $("#activities_edit").submit(function () {
        var getid = $("#hiddenvalue").val();
        var txtactitivity = $("#edit_activities_name").val();
        var txtactivityurl = $("#edit_activities_url").val();
        
        $.ajax({
            url: "https://api.americanfragrances.com/Activity/Edit",
            type: "POST",
            data: { "Project_Id": Project_Id, "name": txtactitivity, "url": txtactivityurl, "authorid": ProjectAuth, "id": getid },
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
                    window.location.href = "/Admin/Activities.html?param=" + msg;
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
            url: "https://api.americanfragrances.com/Activity/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                /*console.log(data)*/
                /*let Data = data.sort((a, b) => a.localeCompare(b));*/
                $("#tblactivities tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td> " + value.name + " </td><td>" + value.url + "</td><td><button id=" + value.id + " class='btn activity_Edit'><i class='fa fa-edit'></i>&nbsp;&nbsp;</button><button id=" + value.id + " class='btn activity_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tblactivities tbody").append(newrowContent);


                });
            }
        });
    };

    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblactivities").on('click', ".activity_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Activity/Delete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

    $("#tblactivities").on('click', ".activity_Edit", function () {
         
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Activity/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            crossDomain: true,
            success: function (data) {
                $("#edit_activities_url").val(data.url);
                $("#hiddenvalue").val(getid);
                $("#edit_activities_name").val(data.name);
                $("#Editactivities").modal("show");
            },
            error: function (xhr) {
                //
            }
        });

    });

});

