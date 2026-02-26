$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var msg = params.get('param');
    if (msg != null) {

        $("#validationdiv").text(msg);
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(10000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    getassignedroleslist();
    getdatatable();
    function getdatatable() {
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
        $.ajax({
            url: "https://api.americanfragrances.com/Activity/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#ddlactivity").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.id + "'> " + value.name + "</option> "
                    $("#ddlactivity").append(newrowContent);
                });
            }
        });
    };

    $("#assignrole").submit(function () {
        var getrole = $("#ddlrole").find(":selected").val();
        var selectedactivities = $("#ddlactivity").val();
        var idlst = "";
        $.each(selectedactivities, function (key, value) {
            idlst += value + ",";
        })
        idlst = idlst.replace(/,\s*$/, "");
        $.ajax({
            url: "https://api.americanfragrances.com/Role/Assignrole",
            type: "POST",
            data: { "Project_Id": Project_Id, "role_id": getrole, "activities_id": idlst, "authorid": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data.responseCode == 1) {
                    getassignedroleslist();
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
    function getassignedroleslist() {
        $.ajax({
            url: "https://api.americanfragrances.com/Role/Assignactivitylist?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                
                $("#tblassign tbody").empty();
                $.each(data, function (Index, value) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Role/Edit?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&id=" + value.role_id,
                        type: "GET",
                        dataType: "JSON",
                        async: false,
                        crossDomain: true,
                        success: function (datasec) {
                            $.ajax({
                                url: "https://api.americanfragrances.com/Activity/Edit?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&id=" + value.activities_id,
                                type: "GET",
                                dataType: "JSON",
                                async: false,
                                crossDomain: true,
                                success: function (response) {
                                    var newrowContent = "<tr><td> " + datasec.name + " </td><td> " + response.name + " </td><td><button id=" + value.id + " class='btn assign_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                                    $("#tblassign tbody").append(newrowContent);
                                }
                            });
                        }
                    });
                });
            }
        });
    };

    //---------------------------------------Delete Method-----------------------------------------//
    $("#tblassign").on('click', ".assign_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Role/AssignDelete?id" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
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

