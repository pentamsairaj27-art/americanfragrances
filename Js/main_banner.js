
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {

    Navbar();

    var AdminEmail = localStorage.getItem("Admin_email");
    getdatatable();
    //---------------------------------------Banner Create Method-----------------------------------------//
    $("#mainbanner_create").submit(function () {
         
        var imagestr = "";
        var leftside =  $("#leftside").val();
        var rightside = $("#rightside").val();
        var middletext= $("#middletext").val();
        var saletext =  $("#saletext").val();
        var authortext = $("#authortext").val();
        var buttontext = $("#buttontext").val();
        var buttonurl = $("#buttonurl").val();
        var ButtonAboveContent = $("#ButtonAboveContent").val();
        var topLine = $("#topLine").val();
        var EventDatetime = $("#DateTime").val()
        var chkbox = false;
        if ($("#Featured").is(":checked")) {
            chkbox = true;
        }
      
        var file = $("#imgfile")[0].files[0];
        if (file) {
            imagestr = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        // var reader = new FileReader();
        // reader.onloadend = function () {
        //     imagebase64 = reader.result;
        //     imagestr = imagebase64;
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/Create",
            type: "POST",
            data: {
                "Project_Id": Project_Id, "islogin": chkbox, "image": imagestr, "leftside": leftside, "saletext": saletext, "rightside": rightside, "authortext": authortext, "middletext": middletext, "authorid": ProjectAuth, "buttontext": buttontext, "buttonabovetext": ButtonAboveContent, "buttonurl": buttonurl, "topline": topLine, "EventDatetime": EventDatetime
            },
            dataType: "json",
            traditional: true,
            crossdomain:true,
            success: function (data) {
                getdatatable();
                $("#imgfile").val("");
                $("#leftside").val("");
                $("#rightside").val("");
                $("#middletext").val("");
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

            //     });

            // }
            // reader.readAsDataURL(file);
        });
    });
    //$("#mainbanner_create").submit(function () {

    //    var imagestr = "";
    //    var file = $("#imgfile")[0].files[0];
    //    var reader = new FileReader();
    //    reader.onloadend = function () {
    //        imagebase64 = reader.result;
    //        imagestr = imagebase64;
    //        $.ajax({
    //            url: "https://api.americanfragrances.com/Banner/Create",
    //            type: "POST",
    //            data: { "Project_Id": Project_Id, "image": imagestr, "authorid": ProjectAuth },
    //            dataType: "json",
    //            traditional: true,
    //            success: function (data) {
    //                getdatatable();
    //                $("#imgfile").val("");
    //                if (data.responseCode == 1) {
    //                    $("#validationdiv").text(data.responsemessage);
    //                    $("#validationdiv").slideDown();
    //                    $("#validationdiv").delay(10000).slideUp();
    //                    $("#validationdiv").css("background", "orange");
    //                    getdatatable();
    //                }
    //                else if (data.responseCode == 2) {
    //                    window.location.href = "/Admin/Login.html";
    //                }
    //                else if (data.responseCode == 6) {
    //                    $("#returnmessage").text("Sorry, Something went wrong");
    //                }
    //                else if (data.responseCode == 0) {
    //                    $("#validationdiv").text(data.responsemessage);
    //                    $("#validationdiv").slideDown();
    //                    $("#validationdiv").delay(10000).slideUp();
    //                    $("#validationdiv").css("background", "orange");
    //                }
    //            },
    //            error: function (xhr) {
    //                if (xhr.status === 401) {
    //                    window.location.href = "/Admin/Login.html";
    //                    return;
    //                }
    //            }

    //        });

    //    }
    //    reader.readAsDataURL(file);
    //});
    //---------------------------------------Banner List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $("#main_banner tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr><td> <img src='" + value.image + "' width='30' /></td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;&nbsp;</button>  &nbsp;&nbsp  <button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"


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
                url: "https://api.americanfragrances.com/Banner/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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
            url: "https://api.americanfragrances.com/Banner/GetBannerById?bannerId=" + getid ,
            type: "GET",
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
              
                console.log(data);
                if (data.EventDatetime) {
                    var timestamp = parseInt(data.EventDatetime.match(/\d+/)[0]);
                    var date = new Date(timestamp);
                    // Adjust for local time zone offset
                    var offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
                    var localDate = new Date(date.getTime() - offset);
                    // Format the date into YYYY-MM-DDTHH:MM
                    var formattedDate = localDate.toISOString().slice(0, 16);
                    $("#EditDateTime").val(formattedDate);
                }
                
                    $("#hiddenid").val(data.id);
                    $("#edit_fl_mainimgview").css("background", "url(" + data.image + ")");
                    $("#edit_leftside").val(data.leftside);
                    $("#edit_saletext").val(data.saletext);
                    $("#edit_rightside").val(data.rightside);
                    $("#edit_authortext").val(data.authortext);
                $("#edit_middletext").val(data.middletext);

                var featuredValue = data.islogin;

                if (featuredValue) {
                   $("#Edit_Featured").prop("checked", true);
                } else {
                    $("#Edit_Featured").prop("checked", false);
                }
                $("#edit_buttontext").val(data.buttontext);
                $("#edit_buttonurl").val(data.buttonurl);
                $("#edit_ButtonAboveContent").summernote('code', data.buttonabovetext);
                $("#edit_topLine").summernote('code', data.topline);
               
                    $('#Editcategory').modal('show');
                
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function (e) {
        e.preventDefault();
        var id = $("#hiddenid").val();  
        var imagestr = "";
        var leftside = $("#edit_leftside").val();
        var rightside = $("#edit_rightside").val();
        var middletext = $("#edit_middletext").val();
        var saletext = $("#edit_saletext").val();
        var authortext = $("#edit_authortext").val();   
        var buttontext = $("#edit_buttontext").val();
        var buttonurl = $("#edit_buttonurl").val();
        var ButtonAboveContent = $("#edit_ButtonAboveContent").val();
        var topLine = $("#edit_topLine").val();
        var EventDatetime = $("#EditDateTime").val()
        var chkbox = false;
        if ($("#Edit_Featured").is(":checked")) {
            chkbox = true;
        }
       
        var file = $("#edit_imgfile")[0].files[0];
        if (file) {
            imagestr = $("#edit_fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        $.ajax({
            url: "https://api.americanfragrances.com/Banner/UpdateBanner",
            type: "POST",
            data: { "id": id, "image": imagestr, "islogin": chkbox, "leftside": leftside, "saletext": saletext, "rightside": rightside, "authortext": authortext, "middletext": middletext, "authorid": ProjectAuth, "buttontext": buttontext, "buttonabovetext": ButtonAboveContent, "buttonurl": buttonurl, "topline": topLine, "EventDatetime": EventDatetime },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {

                // getdatatable();
                $('#Editcategory').modal('toggle');
                if (data.responseCode == 1) {
                    $('#Editcategory').modal('toggle');
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
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
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
});

