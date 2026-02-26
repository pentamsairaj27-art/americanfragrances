$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    Navbar();
    getdatatable();


    //---------------------------------------Category Create Method-----------------------------------------//
    $("#feedqun_create").submit(function () {

        var question = $("#qun").val();
        var option1 = $("#opt1").val();
        var option2 = $("#opt2").val();
        var option3 = $("#opt3").val();
        var option4 = $("#opt4").val();
        var option5 = $("#opt5").val();
        var option6 = $("#opt6").val();
        var option7 = $("#opt7").val();
        var option8 = $("#opt8").val();
        var option9 = $("#opt9").val();
        var option10 = $("#opt10").val();
        var colorcode = $("#colorcode").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Category/CreateFeedback?project_id=" + Project_Id,
            type: "POST",
            data: { "Project_Id": Project_Id, "question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "option5": option5, "option6": option6, "option7": option7, "option8": option8, "option9": option9, "option10": option10, "colorcode": colorcode, "authorid": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {
                getdatatable();
                $('#Addcategory').modal('toggle');
                if (data.responseCode == 1) {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    getdatatable();
                    window.location.href = "/Admin/Feedback.html";


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
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Category/ListofFeedbacks?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#tblfeedqun_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowqun = "<tr><td>" + value.question + "</td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button></td></tr>";
                    $("#tblfeedqun_lst tbody").append(newrowqun);
                });
            }
        });
    };

    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Category/EditFeedback?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);

                $("#edit_qun").val(data.question);
                $("#edit_opt1").val(data.option1);
                $("#edit_opt2").val(data.option2);
                $("#edit_opt3").val(data.option3);
                $("#edit_opt4").val(data.option4);
                $("#edit_opt5").val(data.option5);
                $("#edit_opt6").val(data.option6);
                $("#edit_opt7").val(data.option7);
                $("#edit_opt8").val(data.option8);
                $("#edit_opt9").val(data.option9);
                $("#edit_opt10").val(data.option10);
                $("#edit_colorcode").val(data.colorcode);


                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
 
    $("#feedqun_edit").submit(function () {
        var id = $("#hiddenid").val();
        var question = $("#edit_qun").val();
        var option1 = $("#edit_opt1").val();
        var option2 = $("#edit_opt2").val();
        var option3 = $("#edit_opt3").val();
        var option4 = $("#edit_opt4").val();
        var option5 = $("#edit_opt5").val();
        var option6 = $("#edit_opt6").val();
        var option7 = $("#edit_opt7").val();
        var option8 = $("#edit_opt8").val();
        var option9 = $("#edit_opt9").val();
        var option10 = $("#edit_opt10").val();
        var colorcode = $("#edit_colorcode").val();
              //var getid = $(this).attr("id");
        if (id != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Category/EditFeedback?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth,
                type: "POST",
                data: { "Project_Id": Project_Id, "id": id, "question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "option5": option5, "option6": option6, "option7": option7, "option8": option8, "option9": option9, "option10": option10, "colorcode": colorcode, "authorid": ProjectAuth },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    $('#Editcategory').modal('toggle');
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        getdatatable();
                        window.location.href = "/Admin/Feedback.html";

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


    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblqun_lst").on('click', ".Color_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Category/Deletecolor",
                type: "POST",
                data: { "id": getid, "project_id": Project_Id, "authorid": ProjectAuth },
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