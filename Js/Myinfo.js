
var url = window.location.search;
var params = new URLSearchParams(url);
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {

    $("#dvbtns").hide();
    $("#restpsd").hide();
    $(".p-image").hide();
    $("#btnedit").click(function () {
        $("#dvbtns").show();
        $("#myprofile").show();
        $("#restpsd").hide();
        $(".p-image").show();
    });
    $("#btncancel").click(function () {
        $("#dvbtns").hide();
    });
    $("#btnreset").click(function () {
        $("#restpsd").show();
        $("#myprofile").hide();
    });
    $("#btncancelpswd").click(function () {
        $("#myprofile").show();
        $("#restpsd").hide();
    });
    Navbar();
    getdatatable();
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Admin/Myinfo?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
            
                $("#Email").val(data.info_email);

                if (data.logo) {

                    $("#imgprew").attr("src", data.logo);
                    $("#imgprewfrpswddiv").attr("src", data.logo);
                }
            }
        });
    };

});
$("#myprofile").submit(function () {

    var adid = Project_Id;
    var imagestr = "";
 
    var distEmail = $("#Email").val();
    var file = $("#edit_imgfile")[0].files[0];
    //var dataval = { "cc": { "project_id": Project_Id, "id": Project_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr, } };
    if (file == undefined) {
        if (adid != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Admin/Myinfo?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "POST",
                data: { "project_id": Project_Id, "id": Project_Id, "authorid": ProjectAuth,"info_email": distEmail, "logo": imagestr },
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                     
                    data.responsemessage;

                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        window.location.href = "Myinfo.html";
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
                    //
                }
            });
        }
    }
    else {
        var reader = new FileReader();
        reader.onloadend = function () {
            imagebase64 = reader.result;
            imagestr = imagebase64;
            if (adid != null) {
                $.ajax({
                    url: "https://api.americanfragrances.com/Admin/Myinfo?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                    type: "POST",
                    data: { "project_id": Project_Id, "id": Project_Id, "authorid": ProjectAuth,  "info_email": distEmail, "logo": imagestr },
                    async: false,
                    dataType: "JSON",
                    crossDomain: true,
                    success: function (data) {
                         
                        data.responsemessage;
                       
                        if (data.responseCode == 1) {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "orange");
                            window.location.href = "Myinfo.html";
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
                        //
                    }
                });
            }
        }
        reader.readAsDataURL(file);
    }
});



