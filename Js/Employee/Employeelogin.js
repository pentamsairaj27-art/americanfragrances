$(document).ready(function () {
    localStorage.clear();
    var Project_Id, Username, Password;
    Project_Id = GlobalInputs();
   
    $("#frmLogin").submit(function () {
        Username = $("#txtusername").val();
        Password = $("#txtpassword").val();
        Ajaxcall(Project_Id, Username, Password);  
        function Ajaxcall(Proj_id, User, Pass) {
            $.ajax({
                url: "https://api.americanfragrances.com/Employee/login",
                type: "POST",
                data: { "project_id": Proj_id, "email": User, "password": Pass },
                dataType: "JSON",
                crossDomain: true,
                success: function (returndata) {
                    if (returndata.responseCode == 1) {
                        localStorage.setItem('Admin_auth', returndata.authorid);
                        localStorage.setItem('EmplyeeMyprofile', returndata.authorid);
                        localStorage.removeItem("AdminMyprofile");
                        localStorage.setItem('Employeevendor_Projid', returndata.project_id);
                        localStorage.setItem('Employee_email', returndata.email);
                        window.location = "/Category/Category_list.html"
                    }
                    else {
                        var message = "Invalid Username or Password";
                        $("#validationdiv").text("");
                        $("#validationdiv").text(message);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(5000).slideUp();
                        $("#validationdiv").css("background", "orange");
                    }
                }
            });
        }
    });
});


