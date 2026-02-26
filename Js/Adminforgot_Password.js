$(document).ready(function () {
    Project_Id = GlobalInputs();
 
    //$("#frmforgot_psd").submit(function () {
    //    Username = $("#txtusername").val();
    //     ;
    //    $.ajax({
    //        url: "https://api.americanfragrances.com/Admin/Forgotpassword",
    //        type: "POST",
    //        data: { "project_id": Project_Id, "email": Username },
    //        dataType: "JSON",
    //        crossDomain: true,
    //        success: function (returndata) {
    //             ;
    //            if (returndata.responseCode = 1) {
    //                window.location.href = "otp.html?email=" + Username;
    //            }
    //            else {
    //                var message = "Invalid Username or Password";
    //                $("#validationdiv").text("");
    //                $("#validationdiv").text(message);
    //                $("#validationdiv").slideDown();
    //                $("#validationdiv").delay(5000).slideUp();
    //                $("#validationdiv").css("background", "orange");
    //            }
    //        }
    //    });

    //});

    $("#frmforgot_psd").submit(function () {
         ;
        var customer_email = $("#txtusername").val();
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/Forgotpassword",
            type: "POST",
            data: { "project_id": Project_Id, "email": customer_email },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                 ;
                console.log(returndata);
                if (returndata.responseCode == 1) {
                    //localStorage.setItem('customer_session', returndata.email);

                    //  var email = $("#custfrgmail").val(customer_email);
                    $("#validationdiv").text("");
                    $("#validationdiv").text(returndata.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                     ;
                    var location = "otp.html?email=" + customer_email;
                    window.location.href = location;
                }
                else {
                    $("#logindateerror").text("");
                    $("#logindateerror").text(returndata.responsemessage);
                    $("#logindateerror").slideDown();
                    $("#logindateerror").delay(5000).slideUp();
                }
            }
        });

    });

});
