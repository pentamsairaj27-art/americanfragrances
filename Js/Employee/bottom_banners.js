
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Employee_auth");
$(document).ready(function () {
    Navbar_employee();
    getdatatable();
    //---------------------------------------Banner Create Method-----------------------------------------//
    $("#mainbanner_create").submit(function () {
         
        var imagestr = "";
        var file = $("#imgfile")[0].files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            imagebase64 = reader.result;
            imagestr = imagebase64;
            $.ajax({
                url: "https://api.americanfragrances.com/Bottombanner/Create",
                type: "POST",
                data: { "Project_Id": Project_Id, "image": imagestr, "authorid": ProjectAuth },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    getdatatable();
                    $("#imgfile").val("");
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
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
                        $("#validationdiv").delay(10000).slideUp();
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
        reader.readAsDataURL(file);
    });
    //---------------------------------------Banner List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Bottombanner/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $("#main_banner tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr><td> <img src='" + value.image + "' width='30' /></td><td><button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"


                    $("#main_banner tbody").append(newrowContent);
                    //$('#main_banner').DataTable();

                });
            }
        });
    };

    //---------------------------------------Banner Method-----------------------------------------//

    $("#main_banner").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Bottombanner/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

