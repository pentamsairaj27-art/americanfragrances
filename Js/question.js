$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    Navbar();
    getdatatable();


    //---------------------------------------Category Create Method-----------------------------------------//
    $("#qun_create").submit(function () {

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
        var option11 = $("#opt11").val();
        var option12 = $("#opt12").val();
        var option13 = $("#opt13").val();
        var option14 = $("#opt14").val();
        var option15 = $("#opt15").val();
        var option16 = $("#opt16").val();
        var description1 = $("#des1").val();
        var description2 = $("#des2").val();
        var description3 = $("#des3").val();
        var description4 = $("#des4").val();
        var description5 = $("#des5").val();
        var description6 = $("#des6").val();
        var description7 = $("#des7").val();
        var description8 = $("#des8").val();
        var description9 = $("#des9").val();
        var description10 = $("#des10").val();
        var description11 = $("#des11").val();
        var description12 = $("#des12").val();
        var description13 = $("#des13").val();
        var description14 = $("#des14").val();
        var description15 = $("#des15").val();
        var description16 = $("#des16").val();

        var colorcode = $("#colorcode").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Category/CreateFilter?project_id=" + Project_Id,
            type: "POST",
            data: { "Project_Id": Project_Id, "question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "option5": option5, "option6": option6, "option7": option7, "option8": option8, "option9": option9, "option10": option10, "option11": option11, "option12": option12, "option13": option13, "option14": option14, "option15": option15, "option16": option16, "desc1": description1, "desc2": description2, "desc3": description3, "desc4": description4, "desc5": description5, "desc6": description6, "desc7": description7, "desc8": description8, "desc9": description9, "desc10": description10, "desc11": description11, "desc12": description12, "desc13": description13, "desc14": description14, "desc15": description15, "desc16": description16, "colorcode": colorcode, "authorid": ProjectAuth },
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
                    window.location.href = "/Admin/Questions.html";


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
            url: "https://api.americanfragrances.com/Category/ListofFilters?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#tblqun_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowqun = "<tr><td>" + value.question + "</td><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button></td></tr>";
                    $("#tblqun_lst tbody").append(newrowqun);
                });
            }
        });
    };

    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Category/EditFilter?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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
                $("#edit_opt11").val(data.option11);
                $("#edit_opt12").val(data.option12);
                $("#edit_opt13").val(data.option13);
                $("#edit_opt14").val(data.option14);
                $("#edit_opt15").val(data.option15);
                $("#edit_opt16").val(data.option16);
                $("#edit_des1").val(data.desc1);
                $("#edit_des2").val(data.desc2);
                $("#edit_des3").val(data.desc3);
                $("#edit_des4").val(data.desc4);
                $("#edit_des5").val(data.desc5);
                $("#edit_des6").val(data.desc6);
                $("#edit_des7").val(data.desc7);
                $("#edit_des8").val(data.desc8);
                $("#edit_des9").val(data.desc9);
                $("#edit_des10").val(data.desc10);
                $("#edit_des11").val(data.desc11);
                $("#edit_des12").val(data.desc12);
                $("#edit_des13").val(data.desc13);
                $("#edit_des14").val(data.desc14);
                $("#edit_des15").val(data.desc15);
                $("#edit_des16").val(data.desc16);
                $("#edit_colorcode").val(data.colorcode);


                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
 
    $("#qun_edit").submit(function () {
        
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
        var option11 = $("#edit_opt11").val();
        var option12 = $("#edit_opt12").val();
        var option13 = $("#edit_opt13").val();
        var option14 = $("#edit_opt14").val();
        var option15 = $("#edit_opt15").val();
        var option16 = $("#edit_opt16").val();
        var description1 = $("#edit_des1").val();
        var description2 = $("#edit_des2").val();
        var description3 = $("#edit_des3").val();
        var description4 = $("#edit_des4").val();
        var description5 = $("#edit_des5").val();
        var description6 = $("#edit_des6").val();
        var description7 = $("#edit_des7").val();
        var description8 = $("#edit_des8").val();
        var description9 = $("#edit_des9").val();
        var description10 = $("#edit_des10").val();
        var description11 = $("#edit_des11").val();
        var description12 = $("#edit_des12").val();
        var description13 = $("#edit_des13").val();
        var description14 = $("#edit_des14").val();
        var description15 = $("#edit_des15").val();
        var description16 = $("#edit_des16").val();

        var colorcode = $("#edit_colorcode").val();
              //var getid = $(this).attr("id");
        if (id != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Category/EditFilter?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth,
                type: "POST",
                data: { "Project_Id": Project_Id, "id": id, "question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "option5": option5, "option6": option6, "option7": option7, "option8": option8, "option9": option9, "option10": option10, "option11": option11, "option12": option12, "option13": option13, "option14": option14, "option15": option15, "option16": option16, "desc1": description1, "desc2": description2, "desc3": description3, "desc4": description4, "desc5": description5, "desc6": description6, "desc7": description7, "desc8": description8, "desc9": description9, "desc10": description10, "desc11": description11, "desc12": description12, "desc13": description13, "desc14": description14, "desc15": description15, "desc16": description16, "colorcode": colorcode, "authorid": ProjectAuth },
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
                        window.location.href = "/Admin/Questions.html";

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