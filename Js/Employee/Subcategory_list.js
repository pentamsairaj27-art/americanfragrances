$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar_employee();
     
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var Category_Id = params.get('id');

    console.log(Category_Id);
    var ProjectAuth = localStorage.getItem("Employee_auth");
   
    var msg = params.get('param');
    if (msg != null) {

        $("#validationdiv").text(msg);
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(10000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    getdatatable();
    //---------------------------------------Sub Category Create Method-----------------------------------------//
    $("#cat_subcreate").submit(function () {
        var imagestr = "";
        var catname = $("#subCategoryname").val();
        var file = $("#imgfile")[0].files[0];
        var catdiscount = $("#category_discount").val();
        //var categoryid = parameter_catid;
        var reader = new FileReader();
        reader.onloadend = function () {
            imagebase64 = reader.result;
            imagestr = imagebase64;
            var chkbox = "";
            if ($("#Featured").is(':checked')) {
                chkbox = true;
            }
            else {
                chkbox = false;
            }
            $.ajax({
                url: "https://api.americanfragrances.com/Subcategory/Create",
                type: "POST",
                data: { "name": catname, "authorid": ProjectAuth, "project_id": Project_Id, "category_id": Category_Id, "image": imagestr, "isfeature": chkbox, "discount": catdiscount },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    $("#subCategoryname").val("");
                    $("#imgfile").val("");
                    $("#category_discount").val("");
                     
                    data.responsemessage;
                    data.responseCode;
                    getdatatable();
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                      //  getdatatable();
                        var msg = data.responsemessage;
                        window.location.href = "/Category/Subcategory_list.html?param=" + msg + '&id=' + Category_Id;


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
    });
    //---------------------------------------Sub Category List Method-----------------------------------------//
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Subcategory/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&categoryid=" + Category_Id + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                 
                var cat = data.category;
                $("#catname").val(cat);
                $("#tblsubcategory_lst tbody").empty();
                $.each(data, function (Index, value) {
                    if (value.isfeature == true) {
                        var newrowContent = "<tr><td> " + value.name + "</a></td > <td> <img src='" + value.image + "' width='30' /></td><td><input type='checkbox' style='display: none;' value=" + value.isfeature + ">" + value.isfeature + "</td><td>" + value.discount + " <span>%</span></td><td> <button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    }
                    else {
                        var newrowContent = "<tr><td> " + value.name + "</a></td > <td> <img src='" + value.image + "' width='30' /></td><td><input type='checkbox' style='display: none;' value=" + value.isfeature + ">" + value.isfeature + "</td><td>" + value.discount + " <span>%</span></td><td> <button id=" + value.id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                    }
                    $("#tblsubcategory_lst tbody").append(newrowContent);
                    //$('#tblsubcategory_lst').DataTable();

                });

            }
        });
    };
    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        var getid = $(this).attr("id");
        $.ajax({
            url: " https://api.americanfragrances.com/Subcategory/Edit?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&category_id=" + Category_Id + "",
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                $("#edit_category_name").val(data.name);
                $("#ecategory_discount").val(data.discount);
                //$("#imgold").attr("src", data.image);
                if (data.image) {
                    $("#imgprew").css("background-image", "url(" + data.image + ")");
                }
                if ($("#editFeatured").prop("checked", true)) {
                    chkbox = true;
                }
                else {
                    chkbox = false;
                }
                $('#Editcategory').modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#cat_edit").submit(function () {
         
        var id = $("#hiddenid").val();
        var imagestr = "";
        var catname = $("#edit_category_name").val();
        var catdiscount = $("#ecategory_discount").val();
        if ($("#editFeatured").prop("checked", true)) {
            chkbox = true;
        }
        else {
            chkbox = false;
        }
        var file = $("#edit_imgfile")[0].files[0];
        if (file == undefined) {
            //var getid = $(this).attr("id");
            if (id != null) {
                $.ajax({
                    url: "https://api.americanfragrances.com/Subcategory/Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&category_id=" + Category_Id + "",
                    type: "POST",
                    data: {
                        "Project_Id": Project_Id, "id": id, "name": catname, "authorid": ProjectAuth, "category_id": Category_Id, "isfeature": chkbox, "discount": catdiscount
                    },
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
                           // getdatatable();
                            var msg = data.responsemessage;
                            window.location.href = "/Category/Subcategory_list.html?param=" + msg + '&id=' + Category_Id;

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
        }
        else {
            var reader = new FileReader();
            reader.onloadend = function () {
                imagebase64 = reader.result;
                imagestr = imagebase64;
                //var getid = $(this).attr("id");
                if (id != null) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Subcategory/Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&category_id=" + Category_Id + "",
                        type: "POST",
                        data: { "Project_Id": Project_Id, "id": id, "name": catname, "image": imagestr, "authorid": ProjectAuth, "category_id": Category_Id, "isfeature": chkbox, "discount": catdiscount },
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
                                //getdatatable();
                                var msg = data.responsemessage;
                                window.location.href = "/Category/Subcategory_list.html?param=" + msg + '&id=' + Category_Id;

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
            }
            reader.readAsDataURL(file);
        }
    });
    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblsubcategory_lst").on('click', ".Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Subcategory/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

