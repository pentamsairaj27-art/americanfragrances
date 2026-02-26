

$(document).ready(function () {
    
    var Project_Id = GlobalInputs();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    var ProjectAdminAuth = localStorage.getItem("AdminMyprofile");
    var ProjectEmployeeAuth = localStorage.getItem("EmplyeeMyprofile");
    if (ProjectAdminAuth) {
        var url = window.location.search;
        var params = new URLSearchParams(url);
        var respswdreq = params.get('req');
        var fltrmsg = params.get('msg');
        if (fltrmsg == "updated") {
            $("#validationdiv").text("Profile Updated Successfully");
            $("#validationdiv").slideDown();
            $("#validationdiv").delay(10000).slideUp();
            $("#validationdiv").css("background", "orange");
        }
        if (fltrmsg == "updateds") {
            $("#validationdiv").text("Password Updated Successfully");
            $("#validationdiv").slideDown();
            $("#validationdiv").delay(10000).slideUp();
            $("#validationdiv").css("background", "orange");
        }
        if (respswdreq == "restpsd") {
            $("#restpsd").show();
            $("#myprofile").hide();
            $("#dvbtns").hide();
        }
        else {
            $("#dvbtns").hide();
            $("#restpsd").hide();
            $(".p-image").hide();
        }



        //$('#name').focus();
        //$('#Phone').focus();
        //$('#Email').focus();

        $('#name').attr('readonly', true);
        $('#Phone').attr('readonly', true);
        $('#Email').attr('readonly', true);
        $("#btnedit").click(function () {
            $("#dvbtns").show();
            $("#myprofile").show();
            $("#restpsd").hide();
            $(".p-image").show();
            $(".hideemail").hide();
            $('#name').attr('readonly', false);
            $('#Phone').attr('readonly', false);
            $('#Email').attr('readonly', false);

        });


        $("#btncancel").click(function () {
            //$("#dvbtns").hide();
            //$("myprfdv").show();
            ;
            window.location.href = "Myprofile.html";
        });
        $("#btnreset").click(function () {
            $("#restpsd").show();
            $("#myprofile").hide();
            $(".hidetxt").hide();
        });
        $("#btncancelpswd").click(function () {
            $("#myprofile").show();
            $("#restpsd").hide();


        });   
        Navbar();
        getdatatable();
        function getdatatable() {

            $.ajax({
                url: "https://api.americanfragrances.com/Admin/Myprofile?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                success: function (data) {
                    $("#hiddenid").val(data.id);
                    $("#name").val(data.name);
                    $("#Phone").val(data.phone);
                    $("#Email").val(data.email);

                    if (data.image) {
                        $("#imgprew").attr("src", data.image);
                        $("#imgprewfrpswddiv").attr("src", data.image);
                    }
                }
            });
        };


        $("#myprofile").submit(function () {

            var adid = Project_Id;
            var imagestr = "";
            var distname = $("#name").val();
            var distphone = $("#Phone").val();
            var distEmail = $("#Email").val();
            var file = $("#edit_imgfile")[0].files[0];
            //var dataval = { "cc": { "project_id": Project_Id, "id": Project_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr, } };
            if (file == undefined) {
                if (adid != null) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Admin/Myprofile?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                        type: "POST",
                        data: { "project_id": Project_Id, "id": Project_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr },
                        async: false,
                        dataType: "JSON",
                        crossDomain: true,
                        success: function (data) {
                            
                            data.responsemessage;

                            if (data.responseCode == 1) {
                                //$("#validationdiv").text(data.responsemessage);
                                //$("#validationdiv").slideDown();
                                //$("#validationdiv").delay(10000).slideUp();
                                //$("#validationdiv").css("background", "orange");
                                //getdatatable();
                                //$("#myprofile").show();
                                //$("#dvbtns").hide();
                                //$("#restpsd").hide();
                                //$(".p-image").hide();
                                //$("#Email").show();
                                // alert("Profile Updated")
                                msg = "updated";
                                window.location.href = "Myprofile.html?msg=" + msg;
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
                            url: "https://api.americanfragrances.com/Admin/Myprofile?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                            type: "POST",
                            data: { "project_id": Project_Id, "id": Project_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr },
                            async: false,
                            dataType: "JSON",
                            crossDomain: true,
                            success: function (data) {

                                data.responsemessage;

                                if (data.responseCode == 1) {
                                    //$("#validationdiv").text(data.responsemessage);
                                    //$("#validationdiv").slideDown();
                                    //$("#validationdiv").delay(10000).slideUp();
                                    //$("#validationdiv").css("background", "orange");
                                    //getdatatable();
                                    //$("#myprofile").show();
                                    //$("#dvbtns").hide();
                                    //$("#restpsd").hide();
                                    //$(".p-image").hide();

                                    msg = "updated";
                                    window.location.href = "Myprofile.html?msg=" + msg;
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

        $("#resetpassword").submit(function () {

            var Password = $("#Password").val();
            $.ajax({
                url: "https://api.americanfragrances.com/Admin/Password",
                type: "POST",
                data: { "project_id": Project_Id, "authorid": ProjectAuth, "password": Password, },
                dataType: "json",
                traditional: true,
                crossDomain: true,
                success: function (data) {
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        msg = "updateds";
                        window.location.href = "Myprofile.html?msg=" + msg;
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
    }
    else if (ProjectEmployeeAuth) {
        Navbar_employee();
        var url = window.location.search;
        var params = new URLSearchParams(url);
        var respswdreq = params.get('req');
        var fltrmsg = params.get('msg');
        if (fltrmsg == "updated") {
            $("#validationdiv").text("Profile Updated Successfully");
            $("#validationdiv").slideDown();
            $("#validationdiv").delay(10000).slideUp();
            $("#validationdiv").css("background", "orange");
        }
        if (fltrmsg == "updateds") {
            $("#validationdiv").text("Password Updated Successfully");
            $("#validationdiv").slideDown();
            $("#validationdiv").delay(10000).slideUp();
            $("#validationdiv").css("background", "orange");
        }
        if (respswdreq == "restpsd") {
            $("#restpsd").show();
            $("#myprofile").hide();
            $("#dvbtns").hide();
        }
        else {
            $("#dvbtns").hide();
            $("#restpsd").hide();
            $(".p-image").hide();
        }


        $('#name').attr('readonly', true);
        $('#Phone').attr('readonly', true);
        $('#Email').attr('readonly', true);
        $("#btnedit").click(function () {
            $("#dvbtns").show();
            $("#myprofile").show();
            $("#restpsd").hide();
            $(".p-image").show();
            $(".hideemail").hide();
            $('#name').attr('readonly', false);
            $('#Phone').attr('readonly', false);
            $('#Email').attr('readonly', false);

        });


        $("#btncancel").click(function () {

            window.location.href = "Myprofile.html";
        });
        $("#btnreset").click(function () {
            $("#restpsd").show();
            $("#myprofile").hide();
            $(".hidetxt").hide();
        });
        $("#btncancelpswd").click(function () {
            $("#myprofile").show();
            $("#restpsd").hide();


        });

        getdatatable();
        function getdatatable() {

            $.ajax({
                url: "https://api.americanfragrances.com/Employee/Edit?id=" + ProjectAuth + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                success: function (data) {

                    $("#hiddenid").val(data.id);
                    $("#name").val(data.name);
                    $("#Phone").val(data.phone);
                    $("#Email").val(data.email);

                    if (data.image) {
                        $("#imgprew").attr("src", data.image);
                        $("#imgprewfrpswddiv").attr("src", data.image);
                    }
                }
            });
        };

        $("#myprofile").submit(function () {

            var adid = ProjectAuth;
            var imagestr = "";
            var distname = $("#name").val();
            var distphone = $("#Phone").val();
            var distEmail = $("#Email").val();
            var file = $("#edit_imgfile")[0].files[0];
            if (file == undefined) {
                if (adid != null) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Employee/Edit?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                        type: "POST",
                        data: { "project_id": Project_Id, "id": ProjectAuth, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr },
                        async: false,
                        dataType: "JSON",
                        crossDomain: true,
                        success: function (data) {

                            data.responsemessage;

                            if (data.responseCode == 1) {
                                //$("#validationdiv").text(data.responsemessage);
                                //$("#validationdiv").slideDown();
                                //$("#validationdiv").delay(10000).slideUp();
                                //$("#validationdiv").css("background", "orange");
                                //getdatatable();
                                //$("#myprofile").show();
                                //$("#dvbtns").hide();
                                //$("#restpsd").hide();
                                //$(".p-image").hide();
                                //$("#Email").show();
                                // alert("Profile Updated")
                                msg = "updated";
                                window.location.href = "Myprofile.html?msg=" + msg;
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
                            url: "https://api.americanfragrances.com/Employee/Edit?id=" + Project_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                            type: "POST",
                            data: { "project_id": Project_Id, "id": Project_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "email": distEmail, "image": imagestr },
                            async: false,
                            dataType: "JSON",
                            crossDomain: true,
                            success: function (data) {

                                data.responsemessage;

                                if (data.responseCode == 1) {
                                    //$("#validationdiv").text(data.responsemessage);
                                    //$("#validationdiv").slideDown();
                                    //$("#validationdiv").delay(10000).slideUp();
                                    //$("#validationdiv").css("background", "orange");
                                    //getdatatable();
                                    //$("#myprofile").show();
                                    //$("#dvbtns").hide();
                                    //$("#restpsd").hide();
                                    //$(".p-image").hide();

                                    msg = "updated";
                                    window.location.href = "Myprofile.html?msg=" + msg;
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

        $("#resetpassword").submit(function () {

            var Password = $("#Password").val();
            $.ajax({
                url: "https://api.americanfragrances.com/Employee/Password",
                type: "POST",
                data: { "project_id": Project_Id, "authorid": ProjectAuth, "password": Password, },
                dataType: "json",
                traditional: true,
                crossDomain: true,
                success: function (data) {
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        msg = "updateds";
                        window.location.href = "Myprofile.html?msg=" + msg;
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
    }
});



