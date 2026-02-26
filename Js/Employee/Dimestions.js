$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar_employee();
    var ProjectAuth = localStorage.getItem("Employee_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#cat_create").submit(function () {

        var catname = $("#category_name").val();
 
            $.ajax({
                url: "https://api.americanfragrances.com/Dimension/Create",
                type: "POST",
                data: { "Project_Id": Project_Id, "name": catname, "authorid": ProjectAuth },
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
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Dimension/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                  
                $("#tblcategory_lst tbody").empty();
                $.each(data, function (Index, value) {
                   
                        var newrowContent = "<tr><td>" + value.name + "</td ><td><button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                   
                    
                    $("#tblcategory_lst tbody").append(newrowContent);


                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Dimension/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                $("#edit_category_name").val(data.name);
            
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
        var id = $("#hiddenid").val();
        var catname = $("#edit_category_name").val();
    
     
            //var getid = $(this).attr("id");
            if (id != null) {
                $.ajax({
                    url: "https://api.americanfragrances.com/Dimension/Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth,
                    type: "POST",
                    data: { "Project_Id": Project_Id, "id": id, "name": catname, "authorid": ProjectAuth },
                    dataType: "json",
                    traditional: true,
                    success: function (data) {
                          
                        getdatatable();
                        $('#Editcategory').modal('toggle');
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
    $("#tblcategory_lst").on('click', ".Cat_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Dimension/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

