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
    $("#areacreate").submit(function () {
         
        var arename = $("#txtarea_name").val();
        var areapincode = $("#txtpincode").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Area/Create",
            type: "POST",
            data: { "Pincode": areapincode, "area_name": arename, "project_id": Project_Id, "authorid": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {

                if (data.responseCode == 1) {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    $("#txtarea_name").val("");
                    $("#txtpincode").val("");
                    getdatatable();

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
            url: "https://api.americanfragrances.com/Area/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#tblarea_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr><td> " + value.area_name + "</td ><td>" + value.pincode + "</td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                    $("#tblarea_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $("#tblarea_lst").on("click", ".edit", function () {
         
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Area/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                $("#edit_area_name").val(data.area_name);
                $("#edit_pincode").val(data.pincode);
                //$("#imgold").attr("src", data.image);
                if (data.image) {
                    $("#imgprew").css("background-image", "url(" + data.image + ")");
                }

                if ($("#editFeatured").is(":checked")) {
                    chkbox = true;
                }
                else {
                    chkbox = false;
                }

                $('#Editarea').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#area_edit").submit(function () {
         
        var id = $("#hiddenid").val();
        var areaname = $("#edit_area_name").val();
        var pincode = $("#edit_pincode").val();


        if (id != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Area/Edit",
                type: "POST",
                data: { "Project_Id": Project_Id, "id": id, "area_name": areaname, "authorid": ProjectAuth, "pincode": pincode },
                dataType: "json",
                traditional: true,
                success: function (data) {

                    data.responseCode;
                    data.responsemessage;
                    getdatatable();
                    $('#Editarea').modal('toggle');
                    if (data.responseCode == 1) {
                        $('#Editcategory').modal('toggle');
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        window.location.href = "Pincode.html";
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

    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblarea_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Area/Delete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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



