$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#Addcategory").submit(function () {

        var username = $("#user_name").val();
        var useremail = $("#user_email").val();
        var user_designation = $("#user_designation").val();
        var Description = $("#testimonial_txt").val();
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
                url: "https://api.americanfragrances.com/Home/AddTestimonial",
                type: "POST",
                data: { "Project_Id": Project_Id, "Name": username, "Email": useremail, "createdby": ProjectAuth, "Image": imagestr, "Designation": user_designation, "Content": Description },
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
            url: "https://api.americanfragrances.com/Home/TestimonialList?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td> " + value.Name + " </td><td>" + value.Email + "</td><td><img src=" + value.Image + " width='50' /></td><td><button id=" + value.ID + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.ID + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tbltesti_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Home/Edit_Testimonial?id=" + getid + "&project_id=" + Project_Id + "&AdminID=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $("#hiddenid").val(data.ID);
                $("#edit_user_name").val(data.Name);
                $("#edit_user_email").val(data.Email);
                $("#edit_user_designation").val(data.Designation);
                $("#edit_testimonial_txt").val(data.Content);
                if (data.Image) {
                    $("#imgprew").css("background-image", "url(" + data.Image + ")");
                }
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
        
        var username = $("#edit_user_name").val();
        var user_designation = $("#edit_user_designation").val();
        var useremail = $("#edit_user_email").val();
        var Description = $("#edit_testimonial_txt").val();
        var imagestr = "";
        var file = $("#edit_imgfile")[0].files[0];
        var id = $("#hiddenid").val();
        if (file == undefined) {
            $.ajax({
                url: "https://api.americanfragrances.com/Home/AddTestimonial",
                type: "POST",
                data: { "id": id, "Project_Id": Project_Id, "Name": username, "Email": useremail, "createdby": ProjectAuth, "Image": imagestr, "Designation": user_designation, "Content": Description },
                dataType: "json",
                traditional: true,
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
        else {

            var reader = new FileReader();
            reader.onloadend = function () {
                imagebase64 = reader.result;
                imagestr = imagebase64;
                $.ajax({
                    url: "https://api.americanfragrances.com/Home/AddTestimonial",
                    type: "POST",
                    data: { "id": id, "Project_Id": Project_Id, "Name": username, "Email": useremail, "createdby": ProjectAuth, "Image": imagestr, "Designation": user_designation, "Content": Description },
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
        }
    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tbltesti_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Home/Delete_Testimonial?id" + getid + "&project_id=" + Project_Id + "&AdminID=" + ProjectAuth + "",
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

