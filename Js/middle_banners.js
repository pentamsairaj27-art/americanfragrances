
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {

    Navbar();

    getdatatable();
    //---------------------------------------Banner Create Method-----------------------------------------//
    $("#mainbanner_create").submit(function () {
         
        var imagestr = "";
        var file = $("#imgfile")[0].files[0];
        var url = $("#url").val();
        var saledate = $("#saledate").val();

        var reader = new FileReader();
        reader.onloadend = function () {
            imagebase64 = reader.result;
            imagestr = imagebase64;
            $.ajax({
                url: "https://api.americanfragrances.com/Middlebanner/Create",
                type: "POST",
                data: { "Project_Id": Project_Id, "image": imagestr, "url":url, "saledate":saledate, "authorid": ProjectAuth },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    getdatatable();
                    getdatatable();
                    $("#imgfile").val("");
                    if (data.responseCode == 1) {
                        
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        window.location.href = "middle_banners.html";
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
            url: "https://api.americanfragrances.com/Middlebanner/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $("#main_banner tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr><td> <img src='" + value.image + "' width='30' /></td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;&nbsp;</button>  &nbsp;&nbsp<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"


                    $("#main_banner tbody").append(newrowContent);
                    //$('#main_banner').DataTable();

                });
            }
        });
    };

    //---------------------------------------delete Method-----------------------------------------//

    $("#main_banner").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Middlebanner/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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
    //---------------------------------------Banner Edit Method-----------------------------------------//
    $("#main_banner").on('click', ".edit", function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/MiddleBanner/GetMiddleBannerById/?bannerId=" + getid,
            type: "GET",
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                console.log(data);
                var completedDate = new Date(parseInt(data.saledate.replace("/Date(", "").replace(")/")) );
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0!
                var yyyy = completedDate.getFullYear();
                if (dd < 10) {
                    dd = "0" + dd;
                }
                if (mm < 10) {
                    mm = "0" + mm;
                }
                var datef = +yyyy + "-" + mm + "-" + dd;
                var datefs = "";
                $("#hiddenid").val(data.id);
                $("#edit_fl_mainimgview").css("background", "url(" + data.image + ")");
                $("#edit_url").val(data.url);
                $("#edit_saledate").val(datef);
                $('#Editcategory').modal('toggle');

            },
            error: function (xhr) {
                //
            }
        });
    });



    $("#cat_edit").submit(function () {
        /*event.preventDefault();*/
        var id = $("#hiddenid").val();
        var imagestr = "";    
        var url = $("#edit_url").val();
        var saledate = $("#edit_saledate").val();

        var file = $("#edit-imgfile")[0].files[0];
        if (file) {
            imagestr = $("#edit_fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        $.ajax({
            url: "https://api.americanfragrances.com/MiddleBanner/UpdateMiddleBanner",
            type: "POST",
            data: { "id": id, "image": imagestr, "url": url, "saledate": saledate, "authorid": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {

                // getdatatable();
                $('#Editcategory').modal('toggle');
                if (data.responseCode == 1) {
                   // $('#Editcategory').modal('toggle');
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(5000).slideUp();
                    $("#validationdiv").css("background", "orange !important");
                    var dataurl = window.location.href;
                    window.location = dataurl;
                }
                else if (data.responseCode == 2) {
                    window.location.href = "/Admin/Login.html";
                }
                else if (data.responseCode == 6) {
                    $("#validationdiv").text("Sorry, Something went wrong");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(5000).slideUp();
                    $("#validationdiv").css("background", "orange !important");
                }
                else if (data.responseCode == 0) {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(5000).slideUp();
                    $("#validationdiv").css("background", "orange !important");
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
});

