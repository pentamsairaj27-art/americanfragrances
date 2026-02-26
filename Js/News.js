$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#Addcategory").submit(function () {

        var Heading = $("#Heading").val();
        var Description = $("#Description").val();
        var Author = $("#Author").val();
       
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
                url: "https://api.americanfragrances.com/TrendsNews/CreateNews",
                type: "POST",
                data: { "heading": Heading, "description": Description, "image": imagestr, "author": Author },
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
            url: "https://api.americanfragrances.com/TrendsNews/List_News",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {
                    function formatDate(jsonDate) {
                        // Extract the timestamp from the JSON date string
                        var timestamp = parseInt(jsonDate.match(/\d+/)[0], 10); // Extract digits and convert to integer
                        var date = new Date(timestamp); // Create a Date object from the timestamp
                        var day = String(date.getDate()).padStart(2, '0'); // Two-digit day
                        var month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month (0-based index)
                        var year = date.getFullYear(); // Four-digit year
                        return month + '/' + day + '/' + year; // Return formatted date
                    }
                    var newrowContent = "<tr><td> " + value.Heading + " </td><td>" + value.Author + "</td><td><img src=" + value.Image + " width='50' /></td><td>" + formatDate(value.Date) + "</td><td><button id=" + value.Id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.Id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tbltesti_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/TrendsNews/GetNewsById?newsId=" + getid ,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $("#hiddenid").val(data.Id);
                $("#edit_Heading").val(data.Heading);
                $("#edit_Description").val(data.Description);
                $("#edit_Author").val(data.Author);
                
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
        
        var Heading = $("#edit_Heading").val();
        var Description = $("#edit_Description").val();
        var Author = $("#edit_Author").val();
        var imagestr = "";
        var file = $("#edit_imgfile")[0].files[0];
        var id = $("#hiddenid").val();
        if (file == undefined) {
            $.ajax({
                url: "https://api.americanfragrances.com/TrendsNews/UpdateNews",
                type: "POST",
                data: { "newsId": id, "heading": Heading, "description": Description, "author": Author },
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
                    url: "https://api.americanfragrances.com/TrendsNews/UpdateNews",
                    type: "POST",
                    data: { "newsId": id, "heading": Heading, "description": Description, "image": imagestr, "author": Author },
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
                url: "https://api.americanfragrances.com/TrendsNews/DeleteNews?newsId=" + getid,
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

