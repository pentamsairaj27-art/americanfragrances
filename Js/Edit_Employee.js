
var url = window.location.search;
var params = new URLSearchParams(url);
var dist_Id = params.get('id');

var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var dist_Id = params.get('id');
    getrole();
    Navbar();
    getdatatable();
    //var param1 = getParameterByName('id'); //return productid
    $("#hiddenid").val(dist_Id);
    function getdatatable() {
        
        $.ajax({
            url: "https://api.americanfragrances.com/Employee/Edit?id=" + dist_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                $("#storemanageename").val(data.name);
                $("#Phone").val(data.phone);
                $("#ddlrole option[value='" + data.role_id + "']").prop('selected', true);
                // $("#password").val(data.password);
                //$("#Email").val(data.email);
                $("#address").val(data.address);
                if (data.image) {
                    $("#imgprew").css("background-image", "url(" + data.image + ")");
                }
                if (data.aadhar_front) {
                    $("#imgprew1").css("background-image", "url(" + data.aadhar_front + ")");
                }
                if (data.aadhar_end) {
                    $("#imgprew2").css("background-image", "url(" + data.aadhar_end + ")");
                }
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
});

$("#storemanager_edit").submit(function () {
    var roleid = $("#ddlrole").find(":selected").val();
    var Edit_imagestr = "";
    var Edit_imagestr1 = "";
    var Edit_imagestr2 = "";
    var distname = $("#storemanageename").val();
    var distphone = $("#Phone").val();
    // var distPassword = $("#password").val();
    var distaddress = $("#address").val();
    var file = $("#Edit_imgfile")[0].files[0];
    var file1 = $("#Edit_imgfile1")[0].files[0];
    var file2 = $("#Edit_imgfile2")[0].files[0];
    if (file) {
        Edit_imagestr = $("#imgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file1) {
        Edit_imagestr1 = $("#imgprew1").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file2) {
        Edit_imagestr2 = $("#imgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    var dataval = {
        "cc": {
            "project_id": Project_Id, "id": dist_Id, "name": distname, "authorid": ProjectAuth, "phone": distphone, "image": Edit_imagestr, "aadhar_front": Edit_imagestr1, "aadhar_end": Edit_imagestr2, "address": distaddress, "role_id": roleid
        }
    };
    $.ajax({
        url: "https://api.americanfragrances.com/Employee/Edit ",
        type: "POST",
        data: dataval,
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {

            data.responsemessage;

            if (data.responseCode == 1) {
                $("#validationdiv").text(data.responsemessage);
                $("#validationdiv").slideDown();
                $("#validationdiv").delay(10000).slideUp();
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
            //
        }
    });
});




