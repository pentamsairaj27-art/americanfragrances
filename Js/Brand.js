$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Brand Create Method-----------------------------------------//
    $("#cat_create").submit(function () {

        var catname = $("#category_name").val();
        var bannerheader = $("#mytextarea").val();
        var serialno = Number($("#serialno").val());
        var logo = "";
        var Image = "";
        var BannerImage = "";
        var chkbox = false;

        if ($("#Premium").is(":checked")) {
            chkbox = true;
        }
        var files = $("#imgfile")[0].files[0];
        if (files == "" || files == null) {

            $("#lblimgreq").show();
            $("#lblimgreq").css("color", "red");

        }

        var imgfile = $("#imgfile")[0].files[0];
        var file = $("#logo")[0].files[0];
        var banner = $("#bannerimage")[0].files[0];
        if (imgfile) {
            logo = $("#Addimgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file) {
            Image = $("#Addimgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (banner) {
            BannerImage = $("#Addimgprew3").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }


        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Create",
            type: "POST",
            data: {
                "Project_Id": Project_Id,
                "bannerheader": bannerheader,
                "name": catname,
                "bannerimage": BannerImage,
                "authorid": ProjectAuth,
                "logo": logo,
                "image": Image,
                "ispremium": chkbox,
                "serialno": serialno
            },
            dataType: "json",
            traditional: true,
            success: function (data) {
                getdatatable();

                $('#Addcategory').modal('toggle');
                if (data == "Brand created successfully") {
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
       
    });
    //---------------------------------------Brand List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#tblcategory_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td > " + value.name + " </td><td><img src=" + value.logo + " width='50' /></td><td><img src=" + value.image + " width='50' /></td><td><img src=" + value.bannerimage + " width='50' /></td><td>" + value.bannerheader + "</td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>&nbsp;&nbsp; <button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i></button></td ></tr >";

                    $("#tblcategory_lst tbody").append(newrowContent);


                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                $("#edit_category_name").val(data.name);
                $("#edit_serialno").val(data.serialno);

                if (data.logo) {
                    $("#imgprew").css("background-image", "url(" + data.logo + ")");
                }

                if (data.image) {
                    $("#imgprew1").css("background-image", "url(" + data.image + ")");
                } if (data.bannerimage) {
                    $("#imgprew2").css("background-image", "url(" + data.bannerimage + ")");
                }
                $("#edit_mytextarea").summernote('code', data.bannerheader);
                var premium = data.ispremium;

                if (premium) {
                    $("#edit_Premium").prop("checked", true);
                } else {
                    $("#edit_Premium").prop("checked", false);
                }
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {

        var logo1 = "";
        var Image1 = "";
        var BannerImage1 = "";
        var logo = $("#edit_imgfile")[0].files[0];
        var Image = $("#edit_logo")[0].files[0];
        var BannerImage = $("#edit_bannerimage")[0].files[0]
        var id = $("#hiddenid").val();
        var catname = $("#edit_category_name").val();
        var serialno = $("#edit_serialno").val();
        var chkbox = false;
        var bannerStatement = $("#edit_mytextarea").val();
        if (logo) {
            logo1 = $("#imgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (Image) {
            Image1 = $("#imgprew1").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (BannerImage) {
            BannerImage1 = $("#imgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
       
        if ($("#edit_Premium").is(":checked")) {
            chkbox = true;
        }
        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Edit",
            type: "POST",
            data: {
                "Project_Id": Project_Id,
                "id": id,
                "name": catname,
                "image": Image1,
                "authorid": ProjectAuth,
                "ispremium": chkbox,
                "serialno": serialno,
                "logo": logo1,
                "bannerimage": BannerImage1,
                "bannerheader": bannerStatement
            },
            dataType: "json",
            traditional: true,
            success: function (data) {
                getdatatable();

                $('#Editcategory').modal('toggle');
                if (data.responseCode == 1) {
                    $('#Editcategory').modal('toggle');
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
     
    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblcategory_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Brand/Delete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

