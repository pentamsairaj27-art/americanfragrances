$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");

    getrole();
    getdatatable();
    //---------------------------------------Category Create Method-----------------------------------------//
    $("#storemanager_create").submit(function () {
        var roleid = $("#ddlrole").find(":selected").val();
        var imagestr = "";
        var imagestr1 = "";
        var imagestr2 = "";
        var txt_name = $("#storemanagername").val();
        var txt_email = $("#Email").val();
        var txt_phone = $("#Phone").val();
        var txt_designation = $("#Designation").val();
        var txt_address = $("#Address").val();
        var txt_password = $("#Password").val();
        var file = $("#imgfile")[0].files[0];
        var file1 = $("#imgfile1")[0].files[0];
        var file2 = $("#imgfile2")[0].files[0];
        if (file) {
            imagestr = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file1) {
            imagestr1 = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file2) {
            imagestr2 = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        $.ajax({
            url: "https://api.americanfragrances.com/Employee/Create",
            type: "POST",
            data: { "Project_id": Project_Id, "name": txt_name, "authorid": ProjectAuth, "email": txt_email, "phone": txt_phone, "password": txt_password, "address": txt_address, "designation": txt_designation, "image": imagestr, "aadhar_front": imagestr1, "aadhar_end": imagestr2, "role_id": roleid },
            dataType: "json",
            traditional: true,
            success: function (data) {
                data.responsemessage;
                getdatatable();
                txt_email = "";
                if (data.responseCode == 1) {
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(5000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    window.location.href = "Employee_list.html";
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
            url: "https://api.americanfragrances.com/Employee/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                
                $("#storemanager_list tbody").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = "<tr><td><span><img src='" + value.image + "' width='30' /></span>  " + value.name + " </td><td>" + value.email + "</td> <td>" + value.phone + "</td><td><img src='" + value.aadhar_front + "' width='30' /></td><td><img src='" + value.aadhar_end + "' width='30' /></td><td> <a href='Edit_Employee.html?id=" + value.id + " '><i class='fa fa-edit'></i>&nbsp;</a>  &nbsp;&nbsp;<button id=" + value.id + " class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"

                    $("#storemanager_list tbody").append(newrowContent);
                    //$('#storemanager_list').DataTable();
                });
            }
        });
    };
    function getrole() {
        $.ajax({
            url: "https://api.americanfragrances.com/Role/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#ddlrole").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.id + "'> " + value.name + "</option> "
                    $("#ddlrole").append(newrowContent);
                });
            }
        });
    }
    //---------------------------------------Delete Method-----------------------------------------//
    $("#storemanager_list").on('click', ".Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Employee/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

