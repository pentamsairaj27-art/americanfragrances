$(document).ready(function () {
    Project_Id = GlobalInputs();
    var Project_Id, Username;
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var em = params.get('email');
    if (em != null) {
        $("#custfrgmail").val(em);
    }
    $("#frmotp").submit(function () {
         
        var customer_email = $("#custfrgmail").val();
        //var otp = $("#txtotp").val();
         
        var otp1 = $("#txt1").val();
        var otp2 = $("#txt2").val();
        var otp3 = $("#txt3").val();
        var otp4 = $("#txt4").val();


        var otp = otp1 + otp2 + otp3 + otp4;

        $.ajax({
            url: "https://api.americanfragrances.com/Employee/Otp",
            type: "POST",
            data: { "project_id": Project_Id, "email": customer_email, "otp": otp },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                 
                console.log(returndata);
                if (returndata.responseCode == 1) {

                    localStorage.setItem('Admin_auth', returndata.authorid);
                    localStorage.setItem('Admin_Projid', returndata.project_id);
                    localStorage.setItem('Admin_email', returndata.email);
                    window.location = "/Employee/Category/Category_list.html"

                }
                else {
                    // var message = "Invalid Email";
                    $("#logindateerror").text("");
                    $("#logindateerror").text(returndata.responsemessage);
                    $("#logindateerror").slideDown();
                    $("#logindateerror").delay(5000).slideUp();
                    // $("#logindateerror").css("background", "orange");
                    //$("#logindateerror").text("Sorry, Invalid username or password");
                }

            }
        });

    });
});