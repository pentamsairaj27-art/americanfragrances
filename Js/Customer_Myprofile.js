
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    let Authkey = localStorage.getItem("authorid");
    $("#editprfdv").hide();
    $(".lbl_edit ").click(function () {
        $("#editprfdv").show();
        $("#myprfdv").hide();
    });
    $(".btncancels").click(function () {
        $("#editprfdv").hide();
        $("#myprfdv").show();
    });
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'Images/favicon.png'; // Adjust the path if necessary
    document.head.appendChild(link);
  
    var url = window.location.search;

    var params = new URLSearchParams(url);
    var status = params.get("status");

    //if (status =="updated") {
    //    $("#validationdiv").text("Profile Updated Successfully");
    //    $(".alert-danger").hide();
    //}
    //else {
    //    $("#validationdivs").text("Something Went Wrong");
    //    $(".alert-success").hide();

    //}

    if (Authkey == null && Authkey == undefined) {
        window.location = "home.html?login=1";
    }

    getdatatable();
    function getdatatable() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Customer/Edit?id=" +
                Authkey +
                "&authorid=" +
                Authkey +
                " &project_id= " +
                Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                var datef = "";
                if (data.dob == null) {
                    var datef = null;
                } else {
                    var completedDate = new Date(
                        parseInt(data.dob.replace("/Date(", "").replace(")/"))
                    );
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0!
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) {
                        dd = "0" + dd;
                    }
                    if (mm < 10) {
                        mm = "0" + mm;
                    }
                    var datef = +dd + "/" + mm + "/" + yyyy;
                    var datefs = "";
                }
                $("#name").val(data.name);
                $("#phone").val(data.phone);
                $("#first_name").val(data.firstname);
                $("#lastname").val(data.lastname);
                $("#email").val(data.email);
                $("#Gender").val(data.gender);
                $("#profession").val(data.profession);
                $("#location").val(data.location);
                $("#about").val(data.address);
                document.getElementById("about").readOnly = true;
                $("#qun1").val(data.qun1);
                $("#qun2").val(data.qun2);
                $("#qun3").val(data.qun3);
                $("#qun4").val(data.qun4);
                $("#qun5").val(data.qun5);
                $("#qun6").val(data.qun6);
                $("#qun7").val(data.qun7);
                $("#qun8").val(data.qun8);
                $("#qun9").val(data.qun9);
                $("#qun10").val(data.qun10);
                $("#dateofbirth").val(datef);
                $("#hiddendob").append(hiddendob);
                $("#imgprofile").attr("src", data.image);
                if (data.image) {
                    $("#imgprofile").css("background-image", "url(" + data.image + ")");
                }
                //var bindingprofile = '<div class="row"> <div class="col-md-3"> <p class="lbl_label">Username</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.name + '</p> </div> </div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Firstname</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.firstname + '</p> </div> </div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Lastname</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.lastname + '</p> </div> </div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Email Id</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.email + '</p> </div> </div> '+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Mobile Number</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.phone + '</p> </div> </div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Gender</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.gender + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Dob</p> </div> <div class="col-md-8"> <p class="lbl_value">' + datef + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Profession</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.profession + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Location</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.location + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Personality:</p> </div> <div class="col-md-8"> <p class="lbl_value"> ' + data.qun1 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Zodiac:</p>  </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun2 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Core Strength: </p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun3 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Main Passion:</p>  </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun4 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Entertainment: </p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun5 + '</p></div></div>' +
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Style:</p>  </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun6 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Smell Note:</p>  </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun7 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Mood: </p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.qun8 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Season:  </p></div> <div class="col-md-8"> <p class="lbl_value">' + data.qun9 + '</p></div></div>'+
                //'<div class="row"> <div class="col-md-3"> <p class="lbl_label">Favorite Color:  </p></div> <div class="col-md-8"> <p class="lbl_value">' + data.qun10 + '</p></div></ul></div></div>' ;
                //$("#dvfetchcust_details").append(bindingprofile);
                ////var hellotext = "Hello, " + data.name;
             $(".after-login").empty();
                var qun1Value = data.qun1;
                qun1Value = qun1Value.split(' ')[0].slice(0, 4);
               //var newrow= 
               //     '<div class="progress mb-4 paddingx80 userprogressbar"><div class="progress-bar bg-ten" role="progressbar" style="width:10%">Personality <div class="amerifragtooltip">' + data.qun1 + '</div></div>' +
               //     '<div class="progress-bar bg-twenty" role="progressbar" style="width:10%">Zodiac  <div class="amerifragtooltip">' + data.qun2 + '</div></div>' +
               //     '<div class="progress-bar bg-thirty" role="progressbar" style="width:10%">Strength <div class="amerifragtooltip">' + data.qun3 + '</div></div>' +
               //     '<div class="progress-bar bg-fourty" role="progressbar" style="width:10%">Passion <div class="amerifragtooltip">' + data.qun4 + '</div></div>' +
               //     '<div class="progress-bar bg-fifty" role="progressbar" style="width:10%">Entertainment <div class="amerifragtooltip">' + data.qun5 + '</div></div>' +
               //     '<div class="progress-bar bg-sixty" role="progressbar" style="width:10%">Style <div class="amerifragtooltip">' + data.qun6 + '</div></div>' +
               //     '<div class="progress-bar bg-hundered" role="progressbar" style="width:10%">Color <div class="amerifragtooltip">' + data.qun7 + '</div></div>' +
               //     '<div class="progress-bar bg-seventy" role="progressbar" style="width:10%">Scent Note <div class="amerifragtooltip">' + data.qun8 + '</div></div>' +
               //     '<div class="progress-bar bg-eighty" role="progressbar" style="width:10%">Mood <div class="amerifragtooltip">' + data.qun9 + '</div></div>' +
               //     '<div class="progress-bar bg-ninety" role="progressbar" style="width:10%">Season <div class="amerifragtooltip">' + data.qun10 + '</div></div>'
                var newrow =
                    '<div class="progress mb-4 paddingx80 userprogressbar">' +
                    '<div class="progress-bar bg-ten" role="progressbar" style="width:10%">' + qun1Value + '<div class="amerifragtooltip">Personality</div></div>' +
                    '<div class="progress-bar bg-twenty" role="progressbar" style="width:10%">' + data.qun2 + '<div class="amerifragtooltip">Zodiac</div></div>' +
                    '<div class="progress-bar bg-thirty" role="progressbar" style="width:10%">' + data.qun3 + '<div class="amerifragtooltip">Strength</div></div>' +
                    '<div class="progress-bar bg-fourty" role="progressbar" style="width:10%">' + data.qun4 + '<div class="amerifragtooltip">Passion</div></div>' +
                    '<div class="progress-bar bg-fifty" role="progressbar" style="width:10%">' + data.qun5 + '<div class="amerifragtooltip">Entertainment</div></div>' +
                    '<div class="progress-bar bg-sixty" role="progressbar" style="width:10%">' + data.qun6 + '<div class="amerifragtooltip">Style</div></div>' +
                    '<div class="progress-bar bg-hundered" role="progressbar" style="width:10%">' + data.qun7 + '<div class="amerifragtooltip">Color</div></div>' +
                    '<div class="progress-bar bg-seventy" role="progressbar" style="width:10%">' + data.qun8 + '<div class="amerifragtooltip">Scent Note</div></div>' +
                    '<div class="progress-bar bg-eighty" role="progressbar" style="width:10%">' + data.qun9 + '<div class="amerifragtooltip">Mood</div></div>' +
                    '<div class="progress-bar bg-ninety" role="progressbar" style="width:10%">' + data.qun10 + '<div class="amerifragtooltip">Season</div></div>' +
                    '</div>';


                $(".after-login").append(newrow);
                $(".Hello_txt_big").text(data.firstname);
                $(".cust_name").text(data.firstname);
            },
            error: function (xhr) { },
        });
    }

    //------------------------------------------Edit Method------------------------------------//
    $(".edit").click(function () {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Customer/Edit?id=" +
                Authkey +
                "&authorid=" +
                Authkey +
                " &project_id= " +
                Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#hiddenid").val(data.id);
                var hiddendob = data.dob;
                var datef = "";
                if (data.dob == null) {
                    var datef = null;
                } else {
                    var completedDate = new Date(
                        parseInt(data.dob.replace("/Date(", "").replace(")/"))
                    );
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0!
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) {
                        dd = "0" + dd;
                    }
                    if (mm < 10) {
                        mm = "0" + mm;
                    }
                    var datef = +yyyy + "-" + mm + "-" + dd;
                    var datefs = "";
                }

                $("#edit_name").val(data.name);
                $("#edit_phone").val(data.phone);
                $("#editfirst_name").val(data.firstname);
                $("#edit_lastname").val(data.lastname);
                $("#edit_email").val(data.email);
                $("#gender").val(data.gender);
                $("#edit_profession").val(data.profession);
                $("#edit_location").val(data.location);
                $("#edit_about").val(data.address);
                $("#dqun1").val(data.qun1);
                $("#dqun2").val(data.qun2);
                $("#dqun3").val(data.qun3);
                $("#dqun4").val(data.qun4);
                $("#dqun5").val(data.qun5);
                $("#dqun6").val(data.qun6);
                $("#dqun7").val(data.qun7);
                $("#dqun8").val(data.qun8);
                $("#dqun9").val(data.qun9);
                $("#dqun10").val(data.qun10);
                $("#edit_dob").val(datef);
                $("#hiddendob").append(hiddendob);
               // $("#edit_userimg").attr("src", data.image);
                if (data.image) {
                     
                    $("#edit_userimg").css("background-image", "url(" + data.image + ")");
                }
             
            },
            error: function (xhr) {
                //
            },
        });
    });
    $("#Profl_edit").submit(function () {
        $(".alert-success").hide();
        $(".alert-danger").hide();
        var dob = "";

        // Define a change event handler for edit_dob
        $("#edit_dob").change(function () {
            dob = $(this).val(); // Update dob with the edited value
        });

        // Trigger the change event to capture the initial value if it's edited
        $("#edit_dob").trigger("change");

        // If dob is still empty, use the original value
        if (dob === "" || dob === null) {
            dob = $("#dob").text();
        }
        var Edit_imagestr = "";
        var id = $("#hiddenid").val();
        var name = $("#edit_name").val();
        var phone = $("#edit_phone").val();
        var email = $("#edit_email").val();
        var profession = $("#edit_profession").val();
        var location = $("#edit_location").val();
        var about = $("#edit_about").val();
        var firstname = $("#editfirst_name").val();
        var lastname = $("#edit_lastname").val();
        var gender = $("#gender option:selected").text();
        var fqun1 = $("#dqun1 option:selected").text();
        var fqun2 = $("#dqun2 option:selected").text();
        var fqun3 = $("#dqun3 option:selected").text();
        var fqun4 = $("#dqun4 option:selected").text();
        var fqun5 = $("#dqun5 option:selected").text();
        var fqun6 = $("#dqun6 option:selected").text();
        var fqun7 = $("#dqun7 option:selected").text();
        var fqun8 = $("#dqun8 option:selected").text();
        var fqun9 = $("#dqun9 option:selected").text();
        var fqun10 = $("#dqun10 option:selected").text();
        var file = $("#imgfile")[0].files[0];
        
        //var reader = new FileReader();
        //reader.onloadend = function () {
        //    imagebase64 = reader.result;
        //    Edit_imagestr = imagebase64;

        if (file) {
             
            
            Edit_imagestr = $("#edit_userimg").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
            /*$("#edit_userimg").attr("src", Edit_imagestr);*/
        }


        
        if (id != null) {
            $.ajax({
                url:
                    "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
                type: "POST",
                data: {
                    project_id: Project_Id,
                    name: name,
                    dob: dob,
                    firstname: firstname,
                    lastname: lastname,
                    address: about,
                    phone: phone,
                    email: email,
                    gender: gender,
                    location: location,
                    profession: profession,
                    image: Edit_imagestr,
                    qun1: fqun1,
                    qun2: fqun2,
                    qun3: fqun3,
                    qun4: fqun4,
                    qun5: fqun5,
                    qun6: fqun6,
                    qun7: fqun7,
                    qun8: fqun8,
                    qun9: fqun9,
                    qun10: fqun10,
                },
                dataType: "json",
                traditional: true,
                success: function (data) {
                   
                    getdatatable();
                
                    $("#Editcategory").modal("toggle");
                    if (data.responseCode == 1) {
                        $(".alert-success").show();
                        $("#Editcategory").modal("toggle");
                        
                        $("#validationdiv").text(data.responsemessage);
                        setTimeout(function () {
                            window.location = "Myprofile.html";
                        }, 2000);
                       
                       
                    } else if (data.responseCode == 2) {
                        window.location.href = "Home.html";
                    } else if (data.responseCode == 6) {
                        $(".alert-danger").show();
                        $("#validationdivs").text("Sorry, Something went wrong");
                    } else if (data.responseCode == 0) {
                        $(".alert-danger").show();
                        $("#validationdivs").text(data.responsemessage);
                        
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = "Home.html";
                        return;
                    }
                },
            });
            }
        //}
        //reader.readAsDataURL(file);
    });

    $(".close").click(function () {
        window.location = "Myprofile.html";
    });
    $(".number").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $("#errmsg")
                .html("Enter mobile number")
                .stop()
                .show()
                .delay(2000)
                .fadeOut();
            return false;
        }
    });

  
     

});
//$("#edit_profile").click(function () {
//
//    var name = $("#edit_name").val();
//    var phone = $("#edit_phone").val();
//    var email = $("#edit_email").val();
//    var dataval = { "cc": { "project_id": Project_Id, "name": name, "phone": phone, "email": email } };
//    $.ajax({
//        url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
//        type: "POST",
//        data: dataval,
//        dataType: "JSON",
//        crossDomain: true,
//        success: function (data) {
//            if (data.responseCode == 1) {
//                window.location = "Myprofile.html"
//            }
//        }
//    });
//});