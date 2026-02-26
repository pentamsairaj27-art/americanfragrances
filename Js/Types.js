$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#cat_create").submit(function () {

        var catname = $("#category_name").val();
 
            $.ajax({
                url: "https://api.americanfragrances.com/Type/CreateType?Name=" + catname + "&AdminID=" + ProjectAuth,
                type: "POST",                
                dataType: "json",
                traditional: true,
                success: function (data) {
                    getdatatable();
                    $('#Addcategory').modal('toggle');
                    if (data.status="200") {
                        $("#validationdiv").text();
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
                    else   {
                        $("#validationdiv").text(data.message);
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
            url: "https://api.americanfragrances.com/Type/GetAllTypes",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                  
                $("#tblcategory_lst tbody").empty();
                $.each(data, function (Index, value) {
                   
                        var newrowContent = "<tr><td>" + value.Name + "</td ><td><button id=" + value.ID + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.ID + " class='btn Cat_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                   
                    
                    $("#tblcategory_lst tbody").append(newrowContent);


                });
            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Type/GetTypeById?id=" + getid,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.data.ID);
                $("#edit_category_name").val(data.data.Name);
            
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
                    url: "https://api.americanfragrances.com/Type/UpdateType?id=" + id + "&Name=" + catname + "&AdminID=" + ProjectAuth,
                    type: "POST",                   
                    dataType: "json",
                    traditional: true,
                    success: function (data) {
                          
                        getdatatable();
                        $('#Editcategory').modal('toggle');
                        window.location.reload();
                        if (data.status == "200") {
                            $("#validationdiv").text("Updated Successfully");
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
                        else {
                            $("#validationdiv").text(data.message);
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
                url: "https://api.americanfragrances.com/Type/DeleteType?id=" + getid + "&AdminID=" + ProjectAuth + "",
                type: "POST",
                data: { "id": getid },
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    window.location.reload();
                    if (data.status == "200") {
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

