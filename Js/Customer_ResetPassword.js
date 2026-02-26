

$(document).ready(function () {
    var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
let Authkey = localStorage.getItem("authorid");
if (Authkey == null && Authkey == undefined) {
    window.location = "home.html?login=1";
}
    $("#resetpassword").submit(function (e) {
        console.log("Form submitted");
        $(".alert-success").hide();
        $(".alert-danger").hide();
         
        e.preventDefault();
        e.stopPropagation()
        // var Project_Id = GlobalInputs();
        // let Authkey = localStorage.getItem("authorid");
        var Password = $("#pass_log_id").val();
        var Password2 = $("#Con_pass_log_id").val();
        if (Password == Password2) {
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/Password",
                type: "POST",
                data: { "project_id": Project_Id, "authorid": Authkey, "password": Password, },
                dataType: "json",
                traditional: true,
                crossDomain: true,
                beforeSend: function() {
                    console.log("Starting AJAX request");
                },
                success: function (data) {
     
                    //if (data.responseCode == 1) {
                    //    $("#validationdiv").text(data.responsemessage);
                    //    $(".alert-danger").hide();
                    //}
                    //else if (data.responseCode == 2) {
                    //    window.location.href = "Home.html";
                    //}
                    //else if (data.responseCode == 6) {
                    //    $("#returnmessage").text("Sorry, Something went wrong");
                    //}
                    //else if (data.responseCode == 0) {
                    //     
                    //    $("#validationdivs").text(data.responsemessage);

                    //    $(".alert-success").hide();
                    //}
                    const style = document.createElement('style');
                    style.type = 'text/css';
                    style.id = 'custom-swal-style';
                    style.innerHTML = `
                        .swal2-actions::before {
                             display:none !important;
                        }
                        .swal2-actions {
                            display:none !important;
                           
                        }
                        #swal2-content{
                            color:#70b4bd !important;
                        }
                       .swal2-modal {
                            border: 8px solid #70b4bd !important;
                        }
                    `;
                    document.getElementsByTagName('head')[0].appendChild(style);

                    swal({
                        title: "",
                        text: data.responsemessage,
                        icon: "warning",
                        buttons: false,
                        timer: 1000
                    }).then(function () {
                        const customStyle = document.getElementById('custom-swal-style');

                        if (customStyle) {
                            customStyle.parentNode.removeChild(customStyle);
                        }
                    });
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
    
                },
                complete: function() {
                    console.log("AJAX request completed");
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                    console.log(status);
                    console.log(error);
                }
    
            });
        }
        else {
            
            $("#validationdivs").text("Enter Confirm Password Correctly");
            $(".alert-success").attr('style', 'display: none !important');
        
            //$(".alert-success").hide();
          
    
          //  $("#returnmessage").text("Enter Confirm Password Correctly");
        }
    
    });
    $.ajax({
        url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {

            //var bindingprofile = '<div class="row"> <div class="col-md-3"> <p class="lbl_label">Name</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.name + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Email Id</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.email + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Mobile Number</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.phone + '</p> </div> </div>';
            //$("#dvfetchcust_details").append(bindingprofile);
            //var hellotext = "Hello, " + data.name;
            $(".Hello_txt_big").text(data.firstname);
        },
        error: function (xhr) {
        }
    });
    $(".close").click(function () {
        window.location = "Resetpassword.html"
    });
});