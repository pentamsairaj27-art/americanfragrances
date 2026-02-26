$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#Addcategory").submit(function () {

        var Question = $("#question").val();       
        var Answer = $("#answer").val();        
        
       
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/CreateFAQ",
            type: "POST",
            data: { "question": Question, "answer": Answer},
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
       
    });
    //---------------------------------------Category List Method-----------------------------------------//
   /* url: "https://api.americanfragrances.com"*/
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/ListFAQs",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#tbltesti_lst tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td> " + value.question + " </td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#tbltesti_lst tbody").append(newrowContent);
                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/GetFAQById/?id=" + getid ,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $("#hiddenid").val(data.id);
                $("#edit_question").val(data.question);             
                $("#edit_answer").summernote('code', data.answer);
                
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
        
        var id = $("#hiddenid").val();   
        var Question = $("#edit_question").val();
        var Answer = $("#edit_answer").val();  
        
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/UpdateFAQ",
            type: "POST",
            data: { "id": id, "question": Question, "answer": Answer },
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

    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tbltesti_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Admin/DeleteFAQ/?id" + getid,
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

