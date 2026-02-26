$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#Addcategory").submit(function () {


        var imagestr = "";
        var files = $("#imgfile")[0].files[0];
        if (files == "" || files == null) {

            $("#lblimgreq").show();
            $("#lblimgreq").css("color", "red");

        }
        var reader = new FileReader();
        reader.onloadend = function () {
            imagebase64 = reader.result;
            imagestr = imagebase64;
            $.ajax({
                url: "https://api.americanfragrances.com/Banner/AddBannerCreate",
                type: "POST",
                data: { "image": imagestr },
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
    });
    //---------------------------------------Category List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/AddsBannerList",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td><img src=" + value.image + " width='50' /></td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tbltesti_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {

        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/GetAddsBannerById?bannerId=" + getid,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $("#hiddenid").val(data.id);

                if (data.image) {
                    $("#imgprew").css("background-image", "url(" + data.image + ")");
                }
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
        var bannerId = $("#hiddenid").val();
        var imagestr = "";
        var file = $("#edit_imgfile")[0].files[0];      
            var reader = new FileReader();
            reader.onloadend = function () {
                imagebase64 = reader.result;
                imagestr = imagebase64;
                $.ajax({
                    url: "https://api.americanfragrances.com/Banner/UpdateAddsBanner",
                    type: "POST",
                    data: { "id": bannerId, "image": imagestr },
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
            }
            reader.readAsDataURL(file);
        
    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tbltesti_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Banner/DeleteAddsBanner?id" + getid + "&project_id=" + Project_Id + "&AdminID=" + ProjectAuth + "",
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

