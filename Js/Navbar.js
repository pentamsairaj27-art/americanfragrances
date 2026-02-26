
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var list = "";
    var men = "";
    var women = "";
    var unisex = "";
    var tester = "";
    var brand = "";
    var ProjectAuth = localStorage.getItem("Admin_auth");
    let Authkey = localStorage.getItem("authorid");
    getcategorynames();

    subcategorymenu();
    function getcategorynames() {

        $.ajax({
            url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $.each(data, function (Index, value) {
                    list += '<div class=""><div class="col-megamenu"><ul class="list-unstyled Cat' + value.id + '"></ul></div></div>'
                    if (value.name == 'Men') {

                        men += '<div class="col-megamenu"><div class="row  men' + value.id + '"></div></div>'
                    } else if (value.name == 'Women') {
                        women += '<div class="col-megamenu"><div class="row women' + value.id + '"></div></div>'
                    } else if (value.name == 'Unisex') {
                        unisex += '<div class="col-megamenu"><div class="row unisex' + value.id + '"></div></div>'
                    } else if (value.name == 'Tester') {
                        tester += '<div class="col-megamenu"><div class="row tester' + value.id + '"></div></div>'
                    }
                    // else if (value.name == 'brand') {
                    // }
                });

            }
        });

        //----------------------------loding sweet alert css and js in every html page---------------------------//

        function loadCSS(href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }

        // Function to add JS CDN
        function loadJS(src) {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true; // Ensures the script is executed after parsing
            document.head.appendChild(script);
        }

        // Add CSS CDNs
        loadCSS('https://cdn.jsdelivr.net/npm/sweetalert2@7.12.15/dist/sweetalert2.min.css');
        loadCSS('https://cdn.rawgit.com/t4t5/sweetalert/v0.2.0/lib/sweet-alert.css');

        // Add JS CDNs
        loadJS('https://cdn.jsdelivr.net/npm/sweetalert2@7.12.15/dist/sweetalert2.all.min.js');


        function getquestions() {
            $.ajax({
                url: "https://api.americanfragrances.com/Home/FeedbackQuestionlist?project_id=" + Project_Id,
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    $.each(data, function (Index, value) {
                        var qunid = value.id;
                        if (qunid == "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339") {
                            var qun1 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=STYLE">' + value.option1 + '</a></li>' + '<li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=STYLE">' + value.option2 + '</a></li>' + '<li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=STYLE">' + value.option3 + '</a></li>' + '<li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=STYLE">' + value.option4 + '</a></li>' + '<li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=STYLE">' + value.option5 + '</a></li>' + '<li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=STYLE">' + value.option6 + '</a></li>' + '<li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=STYLE">' + value.option7 + '</a></li>' + '<li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=STYLE">' + value.option8 + '</a></li>' + '<li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=STYLE">' + value.option9 + '</a></li>' + '<li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=STYLE">' + value.option10 + '</a></li>';
                            $("#m1").append(qun1);
                        } else if (qunid == "27059952-4128-4b44-be81-ea158ed8eb92") {
                            var qun2 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=NOTE">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=NOTE">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=NOTE">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=NOTE">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=NOTE">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=NOTE">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=NOTE">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=NOTE">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=NOTE">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=NOTE">' + value.option10 + '</a></li>';

                            $("#m2").append(qun2);
                        } else if (qunid == "c8f8dc67-b98b-436c-b74b-b21399bebc5c") {
                            var qun3 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=MOOD">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=MOOD">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=MOOD">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=MOOD">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=MOOD">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=MOOD">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=MOOD">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=MOOD">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=MOOD">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=MOOD">' + value.option10 + '</a></li>';
                            $("#m3").append(qun3);
                        } else if (qunid == "cb6924f2-a52e-43f8-8c0b-492234c4345e") {
                            var qun4 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=SEASON">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=SEASON">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=SEASON">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=SEASON">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=SEASON">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=SEASON">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=SEASON">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=SEASON">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=SEASON">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=SEASON">' + value.option10 + '</a></li>';

                            $("#m4").append(qun4);
                        } else if (qunid == "d84ee43f-6f45-4025-8755-fa04ea76667d") {
                            var qun5 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=OCCASION">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=OCCASION">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=OCCASION">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=OCCASION">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=OCCASION">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=OCCASION">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=OCCASION">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=OCCASION">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=OCCASION">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=OCCASION">' + value.option10 + '</a></li>';

                            $("#m5").append(qun5);
                        } else if (qunid == "214c962f-7ee6-4158-bc0b-a4c8059a6cc2") {
                            var qun6 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=AGE GROUP">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=AGE GROUP">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=AGE GROUP">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=AGE GROUP">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=AGE GROUP">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=AGE GROUP">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=AGE GROUP">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=AGE GROUP">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=AGE GROUP">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=AGE GROUP">' + value.option10 + '</a></li>';

                            $("#m6").append(qun6);
                        } else if (qunid == "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4") {
                            var qun7 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=SMELL INTENSITY">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=SMELL INTENSITY">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=SMELL INTENSITY">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=SMELL INTENSITY">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=SMELL INTENSITY">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=SMELL INTENSITY">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=SMELL INTENSITY">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=SMELL INTENSITY">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=SMELL INTENSITY">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=SMELL INTENSITY">' + value.option10 + '</a></li>';

                            $("#m7").append(qun7);
                        } else if (qunid == "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae") {
                            var qun8 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=LONGEVITY">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=LONGEVITY">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=LONGEVITY">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=LONGEVITY">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=LONGEVITY">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=LONGEVITY">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=LONGEVITY">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=LONGEVITY">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=LONGEVITY">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=LONGEVITY">' + value.option10 + '</a></li>';
                            $("#m8").append(qun8);
                        } else if (qunid == "6239cda0-e527-4e32-be3b-be94f9447067") {
                            var qun9 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=SPRAY TIME">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=SPRAY TIME">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=SPRAY TIME">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=SPRAY TIME">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=SPRAY TIME">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=SPRAY TIME">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=SPRAY TIME">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=SPRAY TIME">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=SPRAY TIME">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=SPRAY TIME">' + value.option10 + '</a></li>';
                            $("#m9").append(qun9);
                        } else if (qunid == "e64bd14d-cfac-490c-b80a-fe7329029bf8") {
                            var qun10 = '<li id="option1' + value.id + '"><a href="show-all.html?label=' + value.option1 + '&labelHeading=PRESENTATION">' + value.option1 + '</a></li><li id="option2' + value.id + '"><a href="show-all.html?label=' + value.option2 + '&labelHeading=PRESENTATION">' + value.option2 + '</a></li><li id="option3' + value.id + '"><a href="show-all.html?label=' + value.option3 + '&labelHeading=PRESENTATION">' + value.option3 + '</a></li><li id="option4' + value.id + '"><a href="show-all.html?label=' + value.option4 + '&labelHeading=PRESENTATION">' + value.option4 + '</a></li><li id="option5' + value.id + '"><a href="show-all.html?label=' + value.option5 + '&labelHeading=PRESENTATION">' + value.option5 + '</a></li><li id="option6' + value.id + '"><a href="show-all.html?label=' + value.option6 + '&labelHeading=PRESENTATION">' + value.option6 + '</a></li><li id="option7' + value.id + '"><a href="show-all.html?label=' + value.option7 + '&labelHeading=PRESENTATION">' + value.option7 + '</a></li><li id="option8' + value.id + '"><a href="show-all.html?label=' + value.option8 + '&labelHeading=PRESENTATION">' + value.option8 + '</a></li><li id="option9' + value.id + '"><a href="show-all.html?label=' + value.option9 + '&labelHeading=PRESENTATION">' + value.option9 + '</a></li><li id="option10' + value.id + '"><a href="show-all.html?label=' + value.option10 + '&labelHeading=PRESENTATION">' + value.option10 + '</a></li>';
                            $("#m10").append(qun10);
                        }
                        //var newrowContent = '<div class="row py-2"><div class="col-md-6"><label class="form-label" for="qun1"><li>' + value.question + '</li></label></div><div class="col-md-6"><select class="modal-select" id="'+value.id+'"><option value="option1' + value.id + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="option2' + value.id + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="option3' + value.id + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="option4' + value.id + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="option5' + value.id + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="option6' + value.id + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="option7' + value.id + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="option8' + value.id + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="option9' + value.id + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="option10' + value.id + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        //$("#useranalytics").append(newrowContent);
                    });
                }
            });
        };

        var useranalytics = '<div class="dropdown-menu megamenu" role="menu" data-bs-popper="none"><div class="col-megamenu"><div class="row"><div class="dropdown-submenu"><p><a class="" href="#">Style</a></p><ul class="dropdown-menu" id="m1"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Note</a></p><ul class="dropdown-menu" id="m2"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Mood</a></p><ul class="dropdown-menu" id="m3"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Season</a></p><ul class="dropdown-menu" id="m4"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Occasion</a></p><ul class="dropdown-menu" id="m5"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Age Group</a></p><ul class="dropdown-menu" id="m6"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Smell Intensity</a></p><ul class="dropdown-menu" id="m7"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Longevity</a></p><ul class="dropdown-menu" id="m8"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Spray Time</a></p><ul class="dropdown-menu" id="m9"></ul></div><div class="dropdown-submenu"><p><a class="" href="#">Presentation</a></p><ul class="dropdown-menu" id="m10"></ul></div></div></div></div>';
        var newrowContent = '<div class="dropdown-menu " role="menu" data-bs-popper="none"><div class="row">' + list + '</div></div>';
        var menrow = '<div class="dropdown-menu " role="menu" data-bs-popper="none">' + men + '</div>';
        var womenrow = '<div class="dropdown-menu " role="menu" data-bs-popper="none">' + women + '</div>';

        var unisexrow = '<div class="dropdown-menu " role="menu" data-bs-popper="none">' + unisex + '</div>';
        var testerrow = '<div class="dropdown-menu " role="menu" data-bs-popper="none">' + tester + '</div>';
        var brandrow = '<div class="dropdown-menu " role="menu" data-bs-popper="none"><div class="col-megamenu"><div class="row brand"></div></div></div>';
        //var nav_cust = '<nav class="navbar navbar-expand-sm header"><div class="container-fluid"><a class="navbar-brand" href="Home.html"><img src="images/logo.png" class=""></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"><span class="navbar-toggler-icon"><i></i></span></button><div class="collapse navbar-collapse" id="collapsibleNavbar"><ul class="navbar-nav navbar-light"><li class="nav-item dropdown"><a class="nav-link" href="#" aria-expanded="true">USER ANALYTICS</a>' + useranalytics + '</li><li class="nav-item dropdown has-megamenu"><a class="nav-link" href="show-all.html?cat=Men" aria-expanded="true"> MEN</a>' + menrow + '</li><li class="nav-item dropdown has-megamenu"><a class="nav-link" href="show-all.html?cat=Women" aria-expanded="true"> WOMEN</a>' + womenrow + '</li><li class="nav-item dropdown has-megamenu"><a class="nav-link" aria-expanded="true">BRANDS</a>' + brandrow + '</li></ul></li></ul></div><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1"><span class="navbar-toggler-icon"><i></i></span></button><div class="collapse navbar-collapse" id="collapsibleNavbar1"><ul class="navbar-nav navbar-light navbar-right"><li class="nav-item border-end-dark"><a class="nav-link" href="inspireme.html"><i class="fa fa-lightbulb pe-2"></i>Inspire Me</a></li><li class="nav-item border-end-dark"><a class="nav-link" href="giftvoucher.html"><i class="fa fa-gift pe-2"></i>Gift voucher</a></li><li class="nav-item border-end-dark"><div class="dvcategoryserach" style="display:none"><ul class="licategoryserach"></ul></div><a class="nav-link search" href="#"><input type="text" class="searchbox" placeholder="Search..." style="display:none;border:0px !important; border-bottom:1px solid !important;"/><i class="fa fa-search pe-2"></i><span class="searchlabel">Search</span><div><ul id="suggestions"></ul></div></a></li><li class="nav-item border-end-dark" ><a class="nav-link " href="refilprogram.html"><i class="fa-solid fa-bolt pe-2"></i>Refill</a></li><li class="nav-item border-end-dark"><a class="nav-link" href="wishlist.html"><span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span><i class="fa fa-heart"></i></a></li><li class="nav-item border-end-dark"><a class="nav-link" href="cart.html" id="cart-icon-container"><span class="cart_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span><img src="../assets/images/bag.png" width="15px" /></a></li><li class="nav-item cLogin"><a class="nav-link pe-0" href="home.html?login=1"><i class="fa fa-sign-in-alt pe-2"></i>Login</a></li><li class="nav-item myaccount"><a class="nav-link pe-0" href="Myprofile.html"><i class="fa fa-user pe-2"></i><span id="customername"></span></a></li></ul></div></div></nav>'      
        //var nav_cust = '<nav class="navbar navbar-expand-sm header"><div class="container-fluid"><a class="navbar-brand" href="Home.html"><img src="images/logo.png" class=""></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1"><span class="navbar-toggler-icon"><i></i></span></button><div class="collapse navbar-collapse" id="collapsibleNavbar1"><ul class="navbar-nav navbar-light navbar-right"><li class="nav-item dropdown"><a class="nav-link" href="#" aria-expanded="true">AI RECOMMENDATIONS</a>' + useranalytics + '</li><li class="nav-item dropdown "><a class="nav-link" href="show-all.html?cat=Men" aria-expanded="true"> MEN</a>' + menrow + '</li><li class="nav-item dropdown  "><a class="nav-link" aria-expanded="true">BRANDS</a>' + brandrow + '</li><li class="nav-item border-end-dark insPading"><a class="nav-link" href="inspireme.html"><i class="fa fa-lightbulb pe-2"></i>Inspire Me</a></li><li class="nav-item border-end-dark"><a class="nav-link giftRedirction" id="giftRedirction" ><i class="fa fa-gift pe-2"></i>Gift voucher</a></li><li class="nav-item border-end-dark"><div class="dvcategoryserach" style="display:none"><ul class="licategoryserach"></ul></div><a class="nav-link search" href="#"><input type="text" class="searchbox" placeholder="Search..." style="display:none;border:0px !important; border-bottom:1px solid !important;"/><i class="fa fa-search pe-2"></i><span class="searchlabel">Search</span><div><ul id="suggestions"></ul></div></a></li><li class="nav-item border-end-dark" ><a class="nav-link " id="refillredire"><i class="fa-solid fa-bolt pe-2"></i>Refill</a></li><li class="nav-item border-end-dark"><a class="nav-link" href="wishlist.html"><span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span><i class="fa fa-heart"></i></a></li><li class="nav-item border-end-dark"><a class="nav-link" href="cart.html" id="cart-icon-container"><span class="cart_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span><img src="../assets/images/bag.png" width="15px" /></a></li><li class="nav-item cLogin"><a class="nav-link pe-0" href="home.html?login=1"><i class="fa fa-sign-in-alt pe-2"></i>Login</a></li><li class="nav-item myaccount"><a class="nav-link pe-0" href="Myprofile.html"><i class="fa fa-user pe-2"></i><span id="customername"></span></a><p style="font-size:12px;margin-bottom:0px;color:#c83538;position:absolute;right:2%;top:88%;">Aroma Points : <span id="AromaPoints"></span></p></li></ul></div></div></nav>'      
        //         var nav_cust = `
        // <nav class="navbar  navbar-expand-sm header transition-all duration-300">
        //   <div class="container-fluid transition-all duration-300 justify-content-between" id="mobileView">
        //    <!-- Navbar Toggler for Mobile View -->

        //   <a class="navbar-brand d-none d-lg-inline " href="Home.html">
        //     <img src="images/logo.png" class="nav_logo transition-all duration-300" style="padding-bottom:10px;height:66px">
        //   </a>
        //     <button class="navbar-toggler d-inline  d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1">
        //     <span class="navbar-toggler-icon"><i></i></span>
        //   </button>
        //    <a class="navbar-brand d-lg-none d-inline" href="Home.html">
        //     <img src="images/logo.png" class="nav_logo transition-all duration-300">
        //   </a>
        //    <div class=' d-flex flex justify-content-center d-inline d-md-none'>
        //            <div class="nav-item position-relative ">
        //                     <div class="dvcategoryserach" style="display:none">
        //                       <ul class="licategoryserach"></ul>
        //                     </div>
        //                     <i class="fa fa-search searchIcon" id="searchIcon" style="
        //     padding: 0px 15px 0px 0px;
        // "></i>
        //                   </div>
        //            </div>
        //         <div class="w-100 d-inline d-lg-none" id="AllNavIconTab">
        //                  <div class="d-flex flex-row justify-content-between" style="z-index:999999 !important;">
        //                      <div class="nav-item cLogin">
        //                         <a class="nav-link p-3 pe-0" id="loginText">
        //                           <i class="fa-solid fa-sign-in-alt fa-2xl"></i>
        //                         </a>
        //                       </div>
        //                        <div class="nav-item myaccount dropdown ">
        //                                 <a class="nav-link p-3" href="Myprofile.html">
        //                                   <i class="fa-solid fa-user fa-2xl"></i>
        //                                 </a>
        //                                  <div class="dropdown-menu" id="myAccountDropdownMenu" role="menu" data-bs-popper="none"><div class="col-megamenu"><div class="row"><div class=""><p><a href="/show-all.html?analytics=products"> My AI Recommendations</a></p></div><div class=""><p><a href="/MySubscription.html">My Subscriptions</a></p></div> <div class=""><p><a href="/Order.html">My Orders / Returns</a></p></div><div class=""><p ><a class="cust_logout">Logout</a></p></div>  </div></div></div>
        //                       </div>

        //                               <div class="nav-item">
        //                                 <a class="nav-link p-3" href="Home.html" id="refillredire">
        //                                   <i class="fa-solid fa-home fa-2xl"></i>
        //                                 </a>
        //                               </div>
        //                       <div class="nav-item">
        //                         <a class="nav-link p-3" id="wishListRedire" href="wishlist.html">
        //                           <span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center" style="font-size: 15px;font-weight: 500;"> 0</span>
        //                           <i class="fa-solid fa-heart fa-2xl"></i>
        //                         </a>
        //                       </div>
        //                       <div class="nav-item">
        //                         <a class="nav-link p-3" href="cart.html" id="cart-icon-container">
        //                           <span class="cart_count cart_count_circle d-flex align-items-center justify-content-center" style="font-size: 15px;font-weight: 500;">0</span>
        //                           <i class="fa-solid fa-cart-shopping fa-2xl"></i>
        //                           <img class="d-none" src="../assets/images/bag.png" width="15px" />
        //                         </a>
        //                       </div>  
        //                  </div>
        //         </div>
        //         <div class="d-inline d-md-none">
        //         <div class="AmerifragPoinsCon" style="font-size:12px;margin-bottom:0px;color:#70b4bd;position:absolute;right:35%;top:95%; font-weight:600 !important;">
        //               Amerifrag Points : <span id="AromaPoints1"></span>
        //           </div>
        //         </div>
        //     <div class="collapse navbar-collapse" id="collapsibleNavbar1">
        //       <div class="d-flex flex-row w-100" >
        //         <!-- Left Side (First 4 options after logo) -->
        //         <ul class="navbar-nav" style="width:100%!important">
        //            <li class="nav-item dropdown">
        //             <a class="nav-link" href="#" aria-expanded="true"> Women</a>
        //             ${womenrow}
        //           </li>
        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="#" aria-expanded="true"> Men</a>
        //             ${menrow}
        //           </li>         

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" aria-expanded="true">Brands</a>
        //             ${brandrow}
        //             <li class="nav-item dropdown">
        //                 <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Discover</a>  
        //                 <div class="dropdown-menu" role="menu" data-bs-popper="none">
        //                     <div class="testersDv">
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Premium">Premium</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=luxury">Luxury</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Designer">Designer</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Niche">Niche</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Celebrity">Celebrity</a></p>
        //                     <p style="margin-bottom:8px!important"><a href="show-all.html?keyword=Natural">Natural</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Indie">Indie</a></p>
        //                      <p style="margin-bottom:8px"><a href="show-all.html?keyword=Specialty">Specialty</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=MassMarket">Mass Market</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=Economical">Economical</a></p>
        //                     <p style="margin-bottom:8px"></p>
        //                     </div>
        //                 </div>
        //             </li>
        //             <li class="nav-item dropdown">
        //                 <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Curate</a>  
        //                 <div class="dropdown-menu" role="menu" data-bs-popper="none">
        //                     <div class="testersDv">
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=newarrivals">New Arrivals</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=bestsellers">Best Sellers</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?keyword=toprated">Top Rated</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?choice=featureProducts">AmeriFrag's Choice</a></p>
        //                     <p style="margin-bottom:8px!important"><a href="show-all.html?sub_cat=BUNDLE%20SETS">Bundle Sets</a></p>
        //                     <p style="margin-bottom:8px"><a href="show-all.html?sub_cat=Gift%20Sets">Gift Sets</a></p>

        //                     <p style="margin-bottom:8px"><a href="/show-all.html?sub_cat=Clearance">Clearance</a></p>
        //                    <p style="margin-bottom:8px"></p>
        //                     </div>
        //                 </div>
        //             </li>
        //             <li class="nav-item dropdown">
        //                 <a class="nav-link" href="#" aria-expanded="true" style="font-weight: 700;">AI Analytics</a>
        //                 ${useranalytics}
        //             </li>
        //         </ul>
        //         <ul class="navbar-nav navbar-right  d-none d-md-flex d-lg-none">
        //          <li class="nav-item position-relative" >
        //             <div class="dvcategoryserach" style="display:none">

        //             </div>
        //             <i class="fa fa-search searchIcon" id="searchIcon" style="
        //     padding: 0px 15px 0px 0px;
        // "></i>
        //           </li>
        //           </ul>
        //         <!-- Right Side (Remaining options) -->
        //         <ul class="navbar-nav navbar-right  d-none d-lg-flex">
        //          <li class="nav-item position-relative" >

        //          <div class="dvcategoryserach" style="display:none">

        //              </div>
        //              <i class="fa fa-search searchIcon" id="searchIcon" style="
        //     padding: 0px 15px 0px 0px;
        // "></i>


        //           </li>
        //            <li class="nav-item">
        //             <a class="nav-link giftRedirction" id="giftRedirction" title="e-Gift Card">
        //               <i class="fa fa-gift pe-2"></i>
        //             </a>
        //           </li>
        //           <li class="nav-item">
        //             <a class="nav-link" id="refillredire" title="Refill">
        //               <i class="fa-solid fa-bolt pe-2"></i>
        //             </a>
        //           </li>
        //           <li class="nav-item">
        //             <a class="nav-link" id="wishListRedire" title="My Wishlist">
        //               <span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span>
        //               <i class="fa fa-heart"></i>
        //             </a>
        //           </li>
        //           <li class="nav-item">
        //             <a class="nav-link" href="cart.html" id="cart-icon-container" title="Cart">
        //               <span class="cart_count cart_count_circle d-flex align-items-center justify-content-center"> 0</span>
        //               <i class="fa-solid fa-cart-shopping"></i>
        //               <img class="d-none" src="../assets/images/bag.png" width="15px" />
        //             </a>
        //           </li>
        //           <li class="nav-item cLogin">
        //   <a class="nav-link pe-0 d-flex align-items-center" id="loginText">
        //     <i class="fa fa-sign-in-alt pe-2"></i>Login
        //   </a>
        // </li>
        //        <li class="nav-item myaccount dropdown d-none d-md-inline" 
        //     style="display: inline-flex !important; align-items: center !important; position: relative; min-width: auto !important;">

        //     <a class="nav-link pe-0 dropdown-toggle" href="Myprofile.html" data-bs-toggle="dropdown" aria-expanded="false"
        //        style="display: inline-flex !important; align-items: center !important; gap: 5px !important; white-space: nowrap !important; flex-wrap: nowrap !important; min-width: auto !important; text-decoration: none !important;"
        //        onclick="window.location.href='Myprofile.html'; return false;">
        //         <i class="fa fa-user pe-2" style="flex-shrink: 0 !important;"></i>
        //         <span id="customername" style="display: inline !important; white-space: nowrap !important; flex-shrink: 0 !important;"></span>
        //     </a>

        //     <div class="dropdown-menu" id="myAccountDropdownMenu" role="menu" data-bs-popper="none" 
        //          style="position: absolute; top: 100%; left: 0; z-index: 1000; display: none;">
        //         <div class="col-megamenu">
        //             <div class="row">
        //                 <div class="">
        //                     <p><a href="/show-all.html?analytics=products"> My AI Recommendations</a></p>
        //                 </div>
        //                 <div class="">
        //                     <p><a href="/MySubscription.html">My Subscriptions</a></p>
        //                 </div>
        //                 <div class="">
        //                     <p><a href="/Order.html">My Orders / Returns</a></p>
        //                 </div>
        //                 <div class="">
        //                     <p><a class="cust_logout">Logout</a></p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </li>
        //           <p class="AmerifragPoinsCon" style="font-size:12px;margin-bottom:0px;color:#70b4bd;position:absolute;right:1%;top:80%; font-weight:600 !important;">
        //               Amerifrag Points : <span id="AromaPoints"></span>
        //             </p>
        //         </ul>
        //       </div>
        //     </div>
        //   </div>

        //   <!-- Commented Search Popup
        //   <div class="modal fade" id="SearchPopup" role="dialog" aria-modal="false" style="top:10 !important" >
        //     <div class="modal-dialog modal-dialog-centered modal-lg" style="top:10 !important">
        //         <div class="modal-content" style="padding-bottom: 10px">
        //             <div class="modal-header">
        //                 <div class="d-block m-auto">

        //                 </div>
        //                 <button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>
        //             </div>

        //             <div class="modal-body py-1">
        //                 <div class="row p-1">
        //                     <div class="dvcategoryserach" style="display:none">
        //                         <ul class="licategoryserach"></ul>
        //                     </div>
        //                     <a class="nav-link search" href="#">
        //                         <input type="text" class="searchbox" id="searchLiItem2" placeholder="Search..." style="border:none !important; height:25px;"/>
        //                         <span class="searchlabel" style="font-size:14px !important;display:none;">Search</span>
        //                         <div><ul id="suggestions"></ul></div>
        //                     </a>
        //                 </div> 
        //             </div>
        //         </div> 
        //     </div>
        // </div>--> <div class="modal fade" id="loginpopup" role="dialog">
        //         <div class="modal-dialog modal-dialog-centered modal-lg">
        //             <div class="modal-content" style="border: 10px solid black; padding-bottom: 10px">
        //                 <div class="modal-header">
        //                     <div class="d-block m-auto">
        //                         <h4 class="modal-heading m-0 text-center" style="font-size:32px;">
        //                             <!--Step into a Fragrant Paradise – Log in to Reveal your Unique Aroma!-->
        //                             Choose the Right Perfume Using <span class="text-white">AI</span>
        //                         </h4>
        //                         <!--<p class="m-0 text-center">if you are an existing Customer </p>-->
        //                     </div>
        //                     <button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>
        //                 </div>


        //                 <div class="modal-body py-1">
        //                     <div class="row p-1">
        //                         <div class="col-md-5 p-1">
        //                             <p class="register-text">
        //                                 If you are an existing Customer
        //                             </p>
        //                             <form id="frmlogin" onsubmit="return false">
        //                                 <div id="logindateerror" class="logindateerror_message"></div>
        //                                 <div class="text-center">
        //                                     <div id="validationdiv2" class="validation_message"></div>
        //                                 </div>
        //                                 <label class="form-label" for="email">Email address </label>
        //                                 <input class="form-control " type="email" id="username" required>
        //                                 <div class="d-flex justify-content-between">
        //                                     <div>
        //                                         <label class="form-label mt-10" for="Lpassword">Password </label>
        //                                     </div>
        //                                     <div>
        //                                         <a href="Forgotpassword.html" class="m-0 pswd" type="button">Forgot password?</a>
        //                                     </div>
        //                                 </div>

        //                               <div class="password-wrapper position-relative mb-3">
        //     <input class="form-control mb-20" type="password" id="Lpassword">
        //     <span toggle="#Lpassword" class="fa fa-fw field_icon toggle-password fa-eye position-absolute"></span>
        // </div>
        //                                 <div class="">
        //                                     <div class="form-group text-center">
        //                                         <button class="btn  btn-dark cust_login" style="margin: 0px !important; padding: 7px 25px !important;" id="loginBut" type="submit">LOGIN</button>
        //                                     </div>

        //                                 </div>
        //                             </form>

        //                             <p class="m-0 p-3 text-center">(Or)</p>

        //                             <h4 class="customer-head white-text">New Customer?</h4>

        //                             <p style="font-weight:500;">
        //                                 <!--Please Sign up and participate in our AI based survey to experience the personalised display to choose the right products that suits your Taste and Persona.-->
        //                                 Sign up now and let our advanced AI match you with the perfect scents, curated just for your unique preferences. Enjoy exclusive discounts and discover the art of tailored aromas today!
        //                             </p>
        //                             <div style="text-align:center;">
        //                                 <a href="register.html" class="btn white-text" id="createAccount" style="margin: 0px !important; padding: 7px 25px !important;" type="button">CREATE ACCOUNT</a>

        //                             </div>
        //                         </div>
        //                         <div class="col-md-7 d-flex flex-column justify-content-center">

        //                             <img class="img-fluid w-100" src="Images/home/supersaleImg.png" />

        //                         </div>


        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div> <div class="modal fade" id="giftvocherLogin" role="dialog"></div>
        //       <div class="search-box">
        //       <div class="container d-flex justify-content-center">
        //         <i class="fa fa-search "></i>
        //         <input class="searchbox" type="text" placeholder="Search here..." />
        //        <i class="fa-solid fa-xmark"></i>

        //       </div>
        //        <ul class="licategoryserach p-0 container justify-content-center"></ul>
        //       </div>

        // </nav>`;

        // ============================================
        // FILE 1: navigation.js (JavaScript Code)
        // ============================================

        //         var nav_cust = `
        // <style>
        // /* Mobile-specific menu items - hide on desktop/tablet */
        // @media (min-width: 768px) {
        //   .mobile-menu-item,
        //   .mobile-menu-header,
        //   .shop-header,
        //   .account-header,
        //   .menu-header,
        //   .menu-close-btn {
        //     display: none !important;
        //     visibility: hidden !important;
        //     opacity: 0 !important;
        //     height: 0 !important;
        //     overflow: hidden !important;
        //   }
        // }

        // /* Show mobile menu items only on mobile */
        // @media (max-width: 767px) {
        //   .mobile-menu-item {
        //     display: block !important;
        //   }
        //   .mobile-menu-header,
        //   .shop-header,
        //   .account-header,
        //   .menu-header {
        //     display: block !important;
        //   }
        // }
        // </style>

        // <nav class="navbar navbar-expand-sm header transition-all duration-300">
        //   <div class="container-fluid transition-all duration-300 justify-content-between" id="mobileView">

        //     <!-- MOBILE VIEW - Compact Single Line Layout -->
        //     <div class="d-flex d-md-none w-100 align-items-start flex-column" style="padding: 5px 0;">
        //       <div class="d-flex w-100 align-items-center">
        //         <!-- Hamburger Menu - Far Left -->
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1" aria-controls="collapsibleNavbar1" aria-expanded="false" style="border: none; padding: 5px; margin: 0; order: 1;">
        //           <span class="navbar-toggler-icon" style="width: 25px; height: 25px;"></span>
        //         </button>

        //         <!-- Logo - Center -->
        //         <a class="navbar-brand flex-grow-1 text-center" href="Home.html" style="margin: 0; padding: 0 10px; order: 2;">
        //           <img src="images/logo.png" class="nav_logo" style="height: 45px; max-width: 180px;">
        //         </a>

        //         <!-- Search and Cart - Far Right -->
        //         <div class="d-flex align-items-center" style="gap: 12px; order: 3;">
        //           <!-- Search Icon -->
        //           <div class="nav-item position-relative" style="margin: 0; padding: 0;">
        //             <i class="fa fa-search searchIcon" id="searchIcon" style="font-size: 22px; cursor: pointer; color: #000;"></i>
        //             <div class="dvcategoryserach" style="display:none">
        //               <ul class="licategoryserach"></ul>
        //             </div>
        //           </div>

        //           <!-- Cart Icon with Badge -->
        //           <div class="nav-item position-relative" style="margin: 0; padding: 0;">
        //             <a href="cart.html" id="cart-icon-container" style="position: relative; display: block; text-decoration: none; color: #000;">
        //               <i class="fa-solid fa-cart-shopping" style="font-size: 22px;"></i>
        //               <span class="cart_count cart_count_circle" style="font-size: 11px; font-weight: 600; position: absolute; top: -8px; right: -10px; min-width: 18px; height: 18px; border-radius: 50%; background: #007bff; color: #fff; display: flex; align-items: center; justify-content: center; padding: 2px;">0</span>
        //             </a>
        //           </div>
        //         </div>
        //       </div>

        //       <!-- Mobile: Amerifrag Points Below Header -->
        //       <div class="w-100 text-end" style="font-size:12px; color:#70b4bd; font-weight:600; padding: 2px 0; padding-right: 5px;">
        //         Amerifrag Points: <span id="AromaPoints_mobile">0</span>
        //       </div>
        //     </div>

        //     <!-- DESKTOP LOGO -->
        //     <a class="navbar-brand d-none d-lg-inline" href="Home.html">
        //       <img src="images/logo.png" class="nav_logo transition-all duration-300" style="padding-bottom:10px;height:66px">
        //     </a>

        //     <!-- Menu Overlay -->
        //     <div class="menu-overlay" id="menuOverlay"></div>

        //     <!-- COLLAPSIBLE MENU -->
        //     <div class="collapse navbar-collapse" id="collapsibleNavbar1">
        //       <!-- Close Button for Mobile -->
        //       <button class="menu-close-btn d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1">
        //         <i class="fa-solid fa-xmark"></i>
        //       </button>

        //       <!-- Menu Header - Mobile Only -->
        //       <div class="menu-header d-md-none mobile-menu-header">Main Menu</div>

        //       <div class="d-flex flex-row w-100">
        //         <!-- Left Side Navigation -->
        //         <ul class="navbar-nav" style="width:100%!important">

        //           <!-- AI RECOMMENDATIONS - Mobile Only -->
        //           <li class="nav-item mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center" href="/show-all.html?analytics=products">
        //               <i class="fa-solid fa-brain me-2"></i>
        //               <span>My AI Recommendations</span>
        //             </a>
        //           </li>

        //           <!-- Shop Header - Mobile Only -->
        //           <div class="shop-header mobile-menu-header">SHOP</div>

        //           <!-- Main Navigation Items (Visible on All Devices) -->
        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="#" aria-expanded="true">Women</a>
        //             ${womenrow}
        //           </li>

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="#" aria-expanded="true">Men</a>
        //             ${menrow}
        //           </li>         

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" aria-expanded="true">Brands</a>
        //             ${brandrow}
        //           </li>

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Discover</a>  
        //             <div class="dropdown-menu" role="menu" data-bs-popper="none">
        //               <div class="testersDv">
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Premium">Premium</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=luxury">Luxury</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Designer">Designer</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Niche">Niche</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Celebrity">Celebrity</a></p>
        //                 <p style="margin-bottom:8px!important"><a href="show-all.html?keyword=Natural">Natural</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Indie">Indie</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Specialty">Specialty</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=MassMarket">Mass Market</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=Economical">Economical</a></p>
        //               </div>
        //             </div>
        //           </li>

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Curate</a>  
        //             <div class="dropdown-menu" role="menu" data-bs-popper="none">
        //               <div class="testersDv">
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=newarrivals">New Arrivals</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=bestsellers">Best Sellers</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?keyword=toprated">Top Rated</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?choice=featureProducts">AmeriFrag's Choice</a></p>
        //                 <p style="margin-bottom:8px!important"><a href="show-all.html?sub_cat=BUNDLE%20SETS">Bundle Sets</a></p>
        //                 <p style="margin-bottom:8px"><a href="show-all.html?sub_cat=Gift%20Sets">Gift Sets</a></p>
        //                 <p style="margin-bottom:8px"><a href="/show-all.html?sub_cat=Clearance">Clearance</a></p>
        //               </div>
        //             </div>
        //           </li>

        //           <li class="nav-item dropdown">
        //             <a class="nav-link" href="#" aria-expanded="true" style="font-weight: 700;">AI Analytics</a>
        //             ${useranalytics}
        //           </li>

        //           <!-- Account Section Header - Mobile Only -->
        //           <div class="account-header mobile-menu-header">MY ACCOUNT</div>

        //           <!-- Home - Mobile Only -->
        //           <li class="nav-item mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center" href="Home.html">
        //               <i class="fa-solid fa-home me-2"></i>
        //               <span>Home</span>
        //             </a>
        //           </li>

        //           <!-- Login Button - Mobile Only -->
        //           <li class="nav-item cLogin mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center" id="loginTextMobile">
        //               <i class="fa-solid fa-sign-in-alt me-2"></i>
        //               <span>Login</span>
        //             </a>
        //           </li>

        //           <!-- My Account - Mobile Only (shown when logged in) -->
        //           <li class="nav-item myaccount mobile-menu-item" style="display: none;">
        //             <a class="nav-link d-flex align-items-center" href="Myprofile.html">
        //               <i class="fa-solid fa-user me-2"></i>
        //               <span id="customername_mobile"></span>
        //             </a>
        //           </li>

        //           <!-- My Subscriptions - Mobile Only -->
        //           <li class="nav-item myaccount mobile-menu-item" style="display: none;">
        //             <a class="nav-link d-flex align-items-center" href="/MySubscription.html">
        //               <i class="fa-solid fa-repeat me-2"></i>
        //               <span>My Subscriptions</span>
        //             </a>
        //           </li>

        //           <!-- My Orders - Mobile Only -->
        //           <li class="nav-item myaccount mobile-menu-item" style="display: none;">
        //             <a class="nav-link d-flex align-items-center" href="/Order.html">
        //               <i class="fa-solid fa-box me-2"></i>
        //               <span>My Orders / Returns</span>
        //             </a>
        //           </li>

        //           <!-- Wishlist - Mobile Only -->
        //           <li class="nav-item mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center position-relative" id="wishListRedire" href="wishlist.html">
        //               <i class="fa-solid fa-heart me-2"></i>
        //               <span>Wishlist</span>
        //               <span class="wishlist_count cart_count_circle ms-auto">0</span>
        //             </a>
        //           </li>

        //           <!-- Gift Card - Mobile Only -->
        //           <li class="nav-item mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center giftRedirction" id="giftRedirction">
        //               <i class="fa fa-gift me-2"></i>
        //               <span>e-Gift Card</span>
        //             </a>
        //           </li>

        //           <!-- Refill - Mobile Only -->
        //           <li class="nav-item mobile-menu-item">
        //             <a class="nav-link d-flex align-items-center" id="refillredire">
        //               <i class="fa-solid fa-bolt me-2"></i>
        //               <span>Refill</span>
        //             </a>
        //           </li>

        //           <!-- Logout Button - Mobile Only -->
        //           <li class="nav-item myaccount mobile-menu-item" style="display: none;">
        //             <a class="nav-link d-flex align-items-center cust_logout">
        //               <i class="fa-solid fa-sign-out-alt me-2"></i>
        //               <span>Logout</span>
        //             </a>
        //           </li>
        //         </ul>

        //         <!-- Desktop Right Side -->
        //         <ul class="navbar-nav navbar-right d-none d-lg-flex">
        //           <li class="nav-item position-relative">
        //             <div class="dvcategoryserach" style="display:none"></div>
        //             <i class="fa fa-search searchIcon" id="searchIcon" style="padding: 0px 15px 0px 0px;"></i>
        //           </li>

        //           <li class="nav-item">
        //             <a class="nav-link giftRedirction" id="giftRedirction" title="e-Gift Card">
        //               <i class="fa fa-gift pe-2"></i>
        //             </a>
        //           </li>

        //           <li class="nav-item">
        //             <a class="nav-link" id="refillredire" title="Refill">
        //               <i class="fa-solid fa-bolt pe-2"></i>
        //             </a>
        //           </li>

        //           <li class="nav-item">
        //             <a class="nav-link" id="wishListRedire" title="My Wishlist">
        //               <span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center">0</span>
        //               <i class="fa fa-heart"></i>
        //             </a>
        //           </li>

        //           <li class="nav-item">
        //             <a class="nav-link" href="cart.html" id="cart-icon-container" title="Cart">
        //               <span class="cart_count cart_count_circle d-flex align-items-center justify-content-center">0</span>
        //               <i class="fa-solid fa-cart-shopping"></i>
        //             </a>
        //           </li>

        //           <li class="nav-item cLogin">
        //             <a class="nav-link pe-0 d-flex align-items-center" id="loginText">
        //               <i class="fa fa-sign-in-alt pe-2"></i>Login
        //             </a>
        //           </li>

        //           <li class="nav-item myaccount dropdown d-none d-md-inline" 
        //               style="display: inline-flex !important; align-items: center !important;">
        //             <a class="nav-link pe-0 dropdown-toggle" href="#" data-bs-toggle="dropdown">
        //               <i class="fa fa-user pe-2"></i>
        //               <span id="customername"></span>
        //             </a>
        //             <div class="dropdown-menu" id="myAccountDropdownMenu">
        //               <div class="col-megamenu">
        //                 <div class="row">
        //                   <div><p><a href="Myprofile.html">My Profile</a></p></div>
        //                   <div><p><a href="/show-all.html?analytics=products">My AI Recommendations</a></p></div>
        //                   <div><p><a href="/MySubscription.html">My Subscriptions</a></p></div>
        //                   <div><p><a href="/Order.html">My Orders / Returns</a></p></div>
        //                   <div><p><a class="cust_logout">Logout</a></p></div>
        //                 </div>
        //               </div>
        //             </div>
        //           </li>

        //           <p class="AmerifragPoinsCon" style="font-size:12px;margin-bottom:0px;color:#70b4bd;position:absolute;right:1%;top:80%;font-weight:600 !important;">
        //             Amerifrag Points: <span id="AromaPoints">0</span>
        //           </p>
        //         </ul>
        //       </div>
        //     </div>

        //     <!-- Search Box -->
        //     <div class="search-box">
        //       <div class="container d-flex justify-content-center">
        //         <i class="fa fa-search"></i>
        //         <input class="searchbox" type="text" placeholder="Search here..." />
        //         <i class="fa-solid fa-xmark"></i>
        //       </div>
        //       <ul class="licategoryserach p-0 container justify-content-center"></ul>
        //     </div>

        //   </div>
        // </nav>

        // <!-- Login Popup Modal -->
        // <div class="modal fade" id="loginpopup" role="dialog">
        //   <div class="modal-dialog modal-dialog-centered modal-lg">
        //     <div class="modal-content" style="border: 10px solid black; padding-bottom: 10px">
        //       <div class="modal-header">
        //         <div class="d-block m-auto">
        //           <h4 class="modal-heading m-0 text-center" style="font-size:32px;">
        //             Choose the Right Perfume Using <span class="text-white">AI</span>
        //           </h4>
        //         </div>
        //         <button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>
        //       </div>
        //       <div class="modal-body py-1">
        //         <div class="row p-1">
        //           <div class="col-md-5 p-1">
        //             <p class="register-text">If you are an existing Customer</p>
        //             <form id="frmlogin" onsubmit="return false">
        //               <div id="logindateerror" class="logindateerror_message"></div>
        //               <div class="text-center">
        //                 <div id="validationdiv2" class="validation_message"></div>
        //               </div>
        //               <label class="form-label" for="email">Email address</label>
        //               <input class="form-control" type="email" id="username" required>
        //               <div class="d-flex justify-content-between">
        //                 <div><label class="form-label mt-10" for="Lpassword">Password</label></div>
        //                 <div><a href="Forgotpassword.html" class="m-0 pswd" type="button">Forgot password?</a></div>
        //               </div>
        //               <div class="password-wrapper position-relative mb-3">
        //                 <input class="form-control mb-20" type="password" id="Lpassword">
        //                 <span toggle="#Lpassword" class="fa fa-fw field_icon toggle-password fa-eye position-absolute"></span>
        //               </div>
        //               <div class="">
        //                 <div class="form-group text-center">
        //                   <button class="btn btn-dark cust_login" style="margin: 0px !important; padding: 7px 25px !important;" id="loginBut" type="submit">LOGIN</button>
        //                 </div>
        //               </div>
        //             </form>
        //             <p class="m-0 p-3 text-center">(Or)</p>
        //             <h4 class="customer-head white-text">New Customer?</h4>
        //             <p style="font-weight:500;">
        //               Sign up now and let our advanced AI match you with the perfect scents, curated just for your unique preferences. Enjoy exclusive discounts and discover the art of tailored aromas today!
        //             </p>
        //             <div style="text-align:center;">
        //               <a href="register.html" class="btn white-text" id="createAccount" style="margin: 0px !important; padding: 7px 25px !important;" type="button">CREATE ACCOUNT</a>
        //             </div>
        //           </div>
        //           <div class="col-md-7 d-flex flex-column justify-content-center">
        //             <img class="img-fluid w-100" src="Images/home/supersaleImg.png" />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        // <div class="modal fade" id="giftvocherLogin" role="dialog"></div>
        // `;
        var nav_cust = `
<style>
/* Mobile-specific menu items - hide on desktop/tablet */
@media (min-width: 768px) {
  .mobile-menu-item,
  .mobile-menu-header,
  .shop-header,
  .account-header,
  .menu-header,
  .menu-close-btn {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
  }
}

/* Show mobile menu items only on mobile */
@media (max-width: 767px) {
  .mobile-menu-item {
    display: block !important;
  }
  .mobile-menu-header,
  .shop-header,
  .account-header,
  .menu-header {
    display: block !important;
  }
}

/* CRITICAL: Prevent text wrapping and force compact layout */
.nav-link {
  white-space: nowrap !important;
}

/* DESKTOP NAVIGATION COMPACT MODE */
@media (min-width: 992px) {
  /* Ultra-compact navigation spacing */
  body .navbar .container-fluid {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  body .navbar-nav .nav-item {
    margin-right: 0px !important;
    padding: 0 1px !important;
  }
  
  body .navbar-nav .nav-link {
    padding-left: 3px !important;
    padding-right: 3px !important;
    font-size: 11.5px !important;
  }
  
  /* Right side even more compact */
  body .navbar-right .nav-item {
    margin-right: 0px !important;
    padding: 0 1px !important;
  }
  
  body .navbar-right .nav-link {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
  
  body .navbar-right .nav-link i {
    font-size: 14px !important;
  }
  
  /* Reduce logo */
  body .navbar-brand img.nav_logo {
    height: 56px !important;
  }
  
  /* Compact dropdown */
  body .myaccount.dropdown .dropdown-toggle {
    padding-right: 2px !important;
    font-size: 11px !important;
  }
  
  /* Points positioning */
  body .AmerifragPoinsCon {
    font-size: 9px !important;
    right: 0.2% !important;
    top: 87% !important;
  }

  /* Prevent wrapping */
  body .navbar-expand-sm .navbar-collapse {
    flex-wrap: nowrap !important;
  }
  
  body .navbar-expand-sm .navbar-nav {
    flex-wrap: nowrap !important;
  }
}

/* Hide points on smaller desktop screens */
@media (min-width: 992px) and (max-width: 1100px) {
  body .AmerifragPoinsCon {
    display: none !important;
  }
}
</style>
<nav class="navbar navbar-expand-sm header transition-all duration-300">
  <div class="container-fluid transition-all duration-300 justify-content-between" id="mobileView">
   
    <!-- MOBILE VIEW - Compact Single Line Layout -->
    <div class="d-flex d-md-none w-100 align-items-start flex-column" style="padding: 5px 0;">
      <div class="d-flex w-100 align-items-center">
        <!-- Hamburger Menu - Far Left -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1" aria-controls="collapsibleNavbar1" aria-expanded="false" style="border: none; padding: 5px; margin: 0; order: 1;">
          <span class="navbar-toggler-icon" style="width: 25px; height: 25px;"></span>
        </button>
        
        <!-- Logo - Center -->
        <a class="navbar-brand flex-grow-1 text-center" href="Home.html" style="margin: 0; padding: 0 10px; order: 2;">
          <img src="images/logo.png" class="nav_logo" style="height: 45px; max-width: 180px;">
        </a>
        
        <!-- Search and Cart - Far Right -->
        <div class="d-flex align-items-center" style="gap: 12px; order: 3;">
          <!-- Search Icon -->
          <div class="nav-item position-relative" style="margin: 0; padding: 0;">
            <i class="fa fa-search searchIcon" id="searchIcon" style="font-size: 22px; cursor: pointer; color: #000;"></i>
            <div class="dvcategoryserach" style="display:none">
              <ul class="licategoryserach"></ul>
            </div>
          </div>
          
          <!-- Cart Icon with Badge -->
          <div class="nav-item position-relative" style="margin: 0; padding: 0;">
            <a href="cart.html" id="cart-icon-container" style="position: relative; display: block; text-decoration: none; color: #000;">
              <i class="fa-solid fa-cart-shopping" style="font-size: 22px;"></i>
              <span class="cart_count cart_count_circle" style="font-size: 11px; font-weight: 600; position: absolute; top: -8px; right: -10px; min-width: 18px; height: 18px; border-radius: 50%; background: #007bff; color: #fff; display: flex; align-items: center; justify-content: center; padding: 2px;">0</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Mobile: Amerifrag Points Below Header -->
      <div class="w-100 text-end" style="font-size:12px; color:#70b4bd; font-weight:600; padding: 2px 0; padding-right: 5px;">
        Amerifrag Points: <span id="AromaPoints_mobile">0</span>
      </div>
    </div>

    <!-- DESKTOP LOGO -->
    <a class="navbar-brand d-none d-lg-inline" href="Home.html">
      <img src="images/logo.png" class="nav_logo transition-all duration-300" style="padding-bottom:10px;height:66px">
    </a>
      
    <!-- Menu Overlay -->
    <div class="menu-overlay" id="menuOverlay"></div>

    <!-- COLLAPSIBLE MENU -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar1">
      <!-- Close Button for Mobile -->
      <button class="menu-close-btn d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Menu Header - Mobile Only -->
      <div class="menu-header d-md-none mobile-menu-header">Main Menu</div>
      
      <div class="d-flex flex-row w-100">
        <!-- Left Side Navigation -->
        <ul class="navbar-nav" style="width:100%!important">
          
          <!-- AI RECOMMENDATIONS - Mobile Only -->
          <li class="nav-item mobile-menu-item">
            <a class="nav-link d-flex align-items-center" href="/show-all.html?analytics=products">
              <i class="fa-solid fa-brain me-2"></i>
              <span>My AI Recommendations</span>
            </a>
          </li>

          <!-- Shop Header - Mobile Only -->
          <div class="shop-header mobile-menu-header">SHOP</div>

          <!-- Main Navigation Items (Visible on All Devices) -->
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" aria-expanded="true">Women</a>
            ${womenrow}
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" aria-expanded="true">Men</a>
            ${menrow}
          </li>         
        
          <li class="nav-item dropdown">
            <a class="nav-link" aria-expanded="true">Brands</a>
            ${brandrow}
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Discover</a>  
            <div class="dropdown-menu" role="menu" data-bs-popper="none">
              <div class="testersDv">
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Premium">Premium</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=luxury">Luxury</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Designer">Designer</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Niche">Niche</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Celebrity">Celebrity</a></p>
                <p style="margin-bottom:8px!important"><a href="show-all.html?keyword=Natural">Natural</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Indie">Indie</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Specialty">Specialty</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=MassMarket">Mass Market</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=Economical">Economical</a></p>
              </div>
            </div>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link" href="show-all.html?sub_cat=TESTERS" aria-expanded="true">Curate</a>  
            <div class="dropdown-menu" role="menu" data-bs-popper="none">
              <div class="testersDv">
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=newarrivals">New Arrivals</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=bestsellers">Best Sellers</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?keyword=toprated">Top Rated</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?choice=featureProducts">AmeriFrag's Choice</a></p>
                <p style="margin-bottom:8px!important"><a href="show-all.html?sub_cat=BUNDLE%20SETS">Bundle Sets</a></p>
                <p style="margin-bottom:8px"><a href="show-all.html?sub_cat=Gift%20Sets">Gift Sets</a></p>
                <p style="margin-bottom:8px"><a href="/show-all.html?sub_cat=Clearance">Clearance</a></p>
              </div>
            </div>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" aria-expanded="true" style="font-weight: 700; white-space: nowrap;">AI Analytics</a>
            ${useranalytics}
          </li>

          <!-- Account Section Header - Mobile Only -->
          <div class="account-header mobile-menu-header">MY ACCOUNT</div>

          <!-- Home - Mobile Only -->
          <li class="nav-item mobile-menu-item">
            <a class="nav-link d-flex align-items-center" href="Home.html">
              <i class="fa-solid fa-home me-2"></i>
              <span>Home</span>
            </a>
          </li>
          
          <!-- Login Button - Mobile Only (Hidden when logged in) -->
          <li class="nav-item cLogin mobile-menu-item">
            <a class="nav-link d-flex align-items-center" id="loginTextMobile" style="cursor: pointer;">
              <i class="fa-solid fa-sign-in-alt me-2"></i>
              <span>Login</span>
            </a>
          </li>
          
          <!-- My Account - Mobile Only (shown when logged in) -->
          <li class="nav-item myaccount mobile-menu-item" style="display: none;">
            <a class="nav-link d-flex align-items-center" href="Myprofile.html">
              <i class="fa-solid fa-user me-2"></i>
              <span id="customername_mobile"></span>
            </a>
          </li>
          
          <!-- My Subscriptions - Mobile Only -->
          <li class="nav-item myaccount mobile-menu-item" style="display: none;">
            <a class="nav-link d-flex align-items-center" href="/MySubscription.html">
              <i class="fa-solid fa-repeat me-2"></i>
              <span>My Subscriptions</span>
            </a>
          </li>
          
          <!-- My Orders - Mobile Only -->
          <li class="nav-item myaccount mobile-menu-item" style="display: none;">
            <a class="nav-link d-flex align-items-center" href="/Order.html">
              <i class="fa-solid fa-box me-2"></i>
              <span>My Orders / Returns</span>
            </a>
          </li>
          
          <!-- Wishlist - Mobile Only -->
          <li class="nav-item mobile-menu-item">
            <a class="nav-link d-flex align-items-center position-relative" id="wishListRedire" href="wishlist.html">
              <i class="fa-solid fa-heart me-2"></i>
              <span>Wishlist</span>
              <span class="wishlist_count cart_count_circle ms-auto">0</span>
            </a>
          </li>
          
          <!-- Gift Card - Mobile Only -->
          <li class="nav-item mobile-menu-item">
            <a class="nav-link d-flex align-items-center giftRedirction" id="giftRedirction" style="cursor: pointer;">
              <i class="fa fa-gift me-2"></i>
              <span>e-Gift Card</span>
            </a>
          </li>
          
          <!-- Refill - Mobile Only -->
          <li class="nav-item mobile-menu-item">
            <a class="nav-link d-flex align-items-center" id="refillredire" style="cursor: pointer;">
              <i class="fa-solid fa-bolt me-2"></i>
              <span>Refill</span>
            </a>
          </li>
          
          <!-- Logout Button - Mobile Only -->
          <li class="nav-item myaccount mobile-menu-item" style="display: none;">
            <a class="nav-link d-flex align-items-center cust_logout" style="cursor: pointer;">
              <i class="fa-solid fa-sign-out-alt me-2"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>

        <!-- Desktop Right Side -->
        <ul class="navbar-nav navbar-right d-none d-lg-flex">
          <li class="nav-item position-relative">
            <div class="dvcategoryserach" style="display:none"></div>
            <i class="fa fa-search searchIcon" id="searchIcon" style="padding: 0px 10px 0px 0px; cursor: pointer;"></i>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" id="wishListRedire" title="My Wishlist" style="position: relative;">
              <span class="wishlist_count cart_count_circle d-flex align-items-center justify-content-center" style="position: absolute; top: -5px; right: -5px;">0</span>
              <i class="fa fa-heart"></i>
            </a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" href="cart.html" id="cart-icon-container" title="Cart" style="position: relative;">
              <span class="cart_count cart_count_circle d-flex align-items-center justify-content-center" style="position: absolute; top: -5px; right: -5px;">0</span>
              <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </li>
          
         <li class="nav-item cLogin">
  <a class="nav-link pe-0 d-flex align-items-center gap-2" id="loginText">
    <i class="fa fa-sign-in-alt"></i>
    <span>login</span>
  </a>
</li>
          
          <li class="nav-item myaccount dropdown d-none d-md-inline" 
              style="display: inline-flex !important; align-items: center !important;">
            <a class="nav-link pe-0 dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <i class="fa fa-user pe-2"></i>
              <span id="customername"></span>
            </a>
            <div class="dropdown-menu" id="myAccountDropdownMenu">
              <div class="col-megamenu">
                <div class="row">
                  <div><p><a href="Myprofile.html">My Profile</a></p></div>
                  <div><p><a href="/show-all.html?analytics=products">My AI Recommendations</a></p></div>
                  <div><p><a href="/MySubscription.html">My Subscriptions</a></p></div>
                  <div><p><a href="/Order.html">My Orders / Returns</a></p></div>
                  <div><p><a class="giftRedirction" id="giftRedirction_desktop">e-Gift Card</a></p></div>
                  <div><p><a id="refillredire_desktop">Refill</a></p></div>
                  <div><p><a class="cust_logout">Logout</a></p></div>
                </div>
              </div>
            </div>
          </li>
          
          <p class="AmerifragPoinsCon" style="font-size:11px;margin-bottom:0px;color:#70b4bd;position:absolute;right:0.5%;top:85%;font-weight:600 !important;white-space:nowrap;">
            Amerifrag Points: <span id="AromaPoints">0</span>
          </p>
        </ul>
      </div>
    </div>
    
    <!-- Search Box -->
    <div class="search-box">
      <div class="container d-flex justify-content-center">
        <i class="fa fa-search"></i>
        <input class="searchbox" type="text" placeholder="Search here..." />
        <i class="fa-solid fa-xmark"></i>
      </div>
      <ul class="licategoryserach p-0 container justify-content-center"></ul>
    </div>
    
  </div>
</nav>

<!-- Login Popup Modal -->
<div class="modal fade" id="loginpopup" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content" style="border: 10px solid black; padding-bottom: 10px">
      <div class="modal-header">
        <div class="d-block m-auto">
          <h4 class="modal-heading m-0 text-center" style="font-size:32px;">
            Choose the Right Perfume Using <span class="text-white">AI</span>
          </h4>
        </div>
        <button type="button" class="btn-close ms-0" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body py-1">
        <div class="row p-1">
          <div class="col-md-5 p-1">
            <p class="register-text">If you are an existing Customer</p>
            <form id="frmlogin" onsubmit="return false">
              <div id="logindateerror" class="logindateerror_message"></div>
              <div class="text-center">
                <div id="validationdiv2" class="validation_message"></div>
              </div>
              <label class="form-label" for="email">Email address</label>
              <input class="form-control" type="email" id="username" required>
              <div class="d-flex justify-content-between">
                <div><label class="form-label mt-10" for="Lpassword">Password</label></div>
                <div><a href="Forgotpassword.html" class="m-0 pswd" type="button">Forgot password?</a></div>
              </div>
              <div class="password-wrapper position-relative mb-3">
                <input class="form-control mb-20" type="password" id="Lpassword">
                <span toggle="#Lpassword" class="fa fa-fw field_icon toggle-password fa-eye position-absolute"></span>
              </div>
              <div class="">
                <div class="form-group text-center">
                  <button class="btn btn-dark cust_login" style="margin: 0px !important; padding: 7px 25px !important;" id="loginBut" type="submit">Login</button>
                </div>
              </div>
            </form>
            <p class="m-0 p-3 text-center">(Or)</p>
            <h4 class="customer-head white-text">New Customer?</h4>
            <p style="font-weight:500;">
              Sign up now and let our advanced AI match you with the perfect scents, curated just for your unique preferences. Enjoy exclusive discounts and discover the art of tailored aromas today!
            </p>
            <div style="text-align:center;">
              <a href="register.html" class="btn white-text" id="createAccount" style="margin: 0px !important; padding: 7px 25px !important;" type="button">Create Account</a>
            </div>
          </div>
          <div class="col-md-7 d-flex flex-column justify-content-center">
            <img class="img-fluid w-100" src="Images/home/supersaleImg.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="giftvocherLogin" role="dialog"></div>
`;

        getquestions();

        $(".dvnavcust").append(nav_cust);

        // Add required CSS for mobile menu with visible close button
        const mobileMenuStyles = `
<style>
/* Mobile menu close button - CRITICAL */
.menu-close-btn {
  display: none !important; /* Hidden on desktop */
}

@media (max-width: 767px) {
  /* Show close button ONLY on mobile */
  .menu-close-btn {
    display: inline-block !important;
    background: #70b4bd;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
    z-index: 9999;
    color: white;
    padding: 0;
    line-height: 30px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    float: right;
    margin-top: -5px;
    margin-right: 15px;
  }
  
  .menu-close-btn:hover {
    background: #5a9aa2;
    transform: scale(1.1);
  }
  
  .menu-close-btn i {
    display: block;
    line-height: 30px;
  }
  
  /* Ensure X symbol is visible */
  .menu-close-btn::before {
    content: 'X';
    font-size: 24px;
    line-height: 30px;
    font-weight: 300;
  }
  
  /* Mobile menu overlay */
  .menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1040;
  }
  
  /* Show overlay when menu is open */
  .navbar-collapse.show ~ .menu-overlay {
    display: block !important;
  }
  
  /* Mobile menu container */
  .navbar-collapse {
    position: fixed;
    top: 0;
    left: -100%;
    width: 85%;
    max-width: 320px;
    height: 100vh;
    background: white;
    z-index: 1050;
    overflow-y: auto;
    transition: left 0.3s ease;
    box-shadow: 2px 0 15px rgba(0,0,0,0.3);
    padding-top: 0;
  }
  
  .navbar-collapse.show {
    left: 0 !important;
  }
  
  /* Prevent body scroll when menu open */
  body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
  
  /* Menu header styling - with flexbox for close button alignment */
  .menu-header, .mobile-menu-header, .shop-header, .account-header {
    padding: 15px 20px;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .menu-header {
    background: #f8f8f8;
  }
  
  .shop-header, .account-header {
    font-size: 13px;
    color: #70b4bd;
    margin-top: 10px;
  }
  
  /* Menu items */
  .navbar-nav .nav-item {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .navbar-nav .nav-link {
    padding: 15px 20px !important;
    color: #333;
    font-size: 15px;
  }
  
  .mobile-menu-item .nav-link i {
    width: 25px;
    color: #70b4bd;
  }
}

/* Desktop - hide mobile elements */
@media (min-width: 768px) {
  .menu-close-btn,
  .mobile-menu-item,
  .mobile-menu-header,
  .shop-header,
  .account-header,
  .menu-header {
    display: none !important;
  }
}
</style>
`;

        // Inject styles into head
        if (!document.getElementById('mobile-menu-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'mobile-menu-styles';
            styleElement.innerHTML = mobileMenuStyles.replace(/<\/?style>/g, '');
            document.head.appendChild(styleElement);
        }

        // Function to open login modal
        function openLoginModal() {
            const loginPopup = document.getElementById('loginpopup');
            if (!loginPopup) {
                console.error('Login popup element not found');
                return;
            }

            console.log('Opening login modal...');

            loginPopup.style.display = '';
            loginPopup.removeAttribute('aria-hidden');

            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                console.log('Using Bootstrap 5 Modal');
                let modalInstance = bootstrap.Modal.getInstance(loginPopup);
                if (!modalInstance) {
                    modalInstance = new bootstrap.Modal(loginPopup, {
                        backdrop: true,
                        keyboard: true,
                        focus: true
                    });
                }
                modalInstance.show();
            }
            else if (typeof $ !== 'undefined' && $.fn.modal) {
                console.log('Using jQuery Modal');
                $(loginPopup).modal('show');
            }
            else {
                console.log('Using fallback modal method');
                loginPopup.classList.add('show');
                loginPopup.style.display = 'block';
                loginPopup.setAttribute('aria-modal', 'true');
                loginPopup.removeAttribute('aria-hidden');
                document.body.classList.add('modal-open');

                if (!document.querySelector('.modal-backdrop')) {
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop fade show';
                    document.body.appendChild(backdrop);
                }
            }
        }

        // Function to close mobile menu
        function closeMobileMenu() {
            const navbarCollapse = document.getElementById('collapsibleNavbar1');
            const toggler = document.querySelector('.navbar-toggler');

            if (!navbarCollapse) {
                console.log('Navbar collapse not found');
                return;
            }

            console.log('Closing mobile menu...');

            // Remove show class to close menu
            navbarCollapse.classList.remove('show');
            navbarCollapse.classList.remove('collapsing');

            // Update hamburger button state
            if (toggler) {
                toggler.classList.add('collapsed');
                toggler.setAttribute('aria-expanded', 'false');
            }

            // Remove body scroll lock
            document.body.classList.remove('modal-open');
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Setup all event listeners after a short delay
        setTimeout(function () {
            console.log('Setting up mobile menu event listeners...');

            // 1. Close button click handler
            $(document).on('click', '.menu-close-btn', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('✓ Close button clicked');
                closeMobileMenu();
            });

            // 2. Overlay click handler
            $(document).on('click', '.menu-overlay, #menuOverlay', function (e) {
                console.log('✓ Overlay clicked');
                closeMobileMenu();
            });

            // 3. Menu item click (auto-close on mobile)
            $(document).on('click', '#collapsibleNavbar1 .mobile-menu-item .nav-link', function () {
                if (window.innerWidth < 768) {
                    console.log('✓ Menu item clicked');
                    setTimeout(closeMobileMenu, 150);
                }
            });

            // 4. Hamburger menu toggle
            $('.navbar-toggler').on('click', function () {
                setTimeout(function () {
                    const navbarCollapse = document.getElementById('collapsibleNavbar1');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        console.log('✓ Menu opened');
                        document.body.classList.add('modal-open');
                    }
                }, 100);
            });

            // 5. Bootstrap collapse event handlers
            $('#collapsibleNavbar1').on('hidden.bs.collapse', function () {
                console.log('✓ Menu hidden');
                document.body.classList.remove('modal-open');
                document.body.style.position = '';
                document.body.style.width = '';
            });

            $('#collapsibleNavbar1').on('shown.bs.collapse', function () {
                console.log('✓ Menu shown');
                document.body.classList.add('modal-open');
            });

            console.log('✓ Mobile menu setup complete');

        }, 500);
        // Inject styles into head
        if (!document.getElementById('mobile-menu-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'mobile-menu-styles';
            styleElement.innerHTML = mobileMenuStyles.replace(/<\/?style>/g, '');
            document.head.appendChild(styleElement);
        }

        // Function to open login modal
        function openLoginModal() {
            const loginPopup = document.getElementById('loginpopup');
            if (!loginPopup) {
                console.error('Login popup element not found');
                return;
            }

            console.log('Opening login modal...');

            loginPopup.style.display = '';
            loginPopup.removeAttribute('aria-hidden');

            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                console.log('Using Bootstrap 5 Modal');
                let modalInstance = bootstrap.Modal.getInstance(loginPopup);
                if (!modalInstance) {
                    modalInstance = new bootstrap.Modal(loginPopup, {
                        backdrop: true,
                        keyboard: true,
                        focus: true
                    });
                }
                modalInstance.show();
            }
            else if (typeof $ !== 'undefined' && $.fn.modal) {
                console.log('Using jQuery Modal');
                $(loginPopup).modal('show');
            }
            else {
                console.log('Using fallback modal method');
                loginPopup.classList.add('show');
                loginPopup.style.display = 'block';
                loginPopup.setAttribute('aria-modal', 'true');
                loginPopup.removeAttribute('aria-hidden');
                document.body.classList.add('modal-open');

                if (!document.querySelector('.modal-backdrop')) {
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop fade show';
                    document.body.appendChild(backdrop);
                }
            }
        }

        // Function to close mobile menu
        function closeMobileMenu() {
            const navbarCollapse = document.getElementById('collapsibleNavbar1');
            const toggler = document.querySelector('.navbar-toggler');

            if (!navbarCollapse) {
                console.log('Navbar collapse not found');
                return;
            }

            console.log('Closing mobile menu...');

            // Remove show class to close menu
            navbarCollapse.classList.remove('show');
            navbarCollapse.classList.remove('collapsing');

            // Update hamburger button state
            if (toggler) {
                toggler.classList.add('collapsed');
                toggler.setAttribute('aria-expanded', 'false');
            }

            // Remove body scroll lock
            document.body.classList.remove('modal-open');
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Setup all event listeners after a short delay
        setTimeout(function () {
            console.log('Setting up mobile menu event listeners...');

            // 1. Close button click handler
            $(document).on('click', '.menu-close-btn', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('✓ Close button clicked');
                closeMobileMenu();
            });

            // 2. Overlay click handler
            $(document).on('click', '.menu-overlay, #menuOverlay', function (e) {
                console.log('✓ Overlay clicked');
                closeMobileMenu();
            });

            // 3. Menu item click (auto-close on mobile)
            $(document).on('click', '#collapsibleNavbar1 .mobile-menu-item .nav-link', function () {
                if (window.innerWidth < 768) {
                    console.log('✓ Menu item clicked');
                    setTimeout(closeMobileMenu, 150);
                }
            });

            // 4. Hamburger menu toggle
            $('.navbar-toggler').on('click', function () {
                setTimeout(function () {
                    const navbarCollapse = document.getElementById('collapsibleNavbar1');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        console.log('✓ Menu opened');
                        document.body.classList.add('modal-open');
                    }
                }, 100);
            });

            // 5. Bootstrap collapse event handlers
            $('#collapsibleNavbar1').on('hidden.bs.collapse', function () {
                console.log('✓ Menu hidden');
                document.body.classList.remove('modal-open');
                document.body.style.position = '';
                document.body.style.width = '';
            });

            $('#collapsibleNavbar1').on('shown.bs.collapse', function () {
                console.log('✓ Menu shown');
                document.body.classList.add('modal-open');
            });

            console.log('✓ Mobile menu setup complete');

        }, 500);

        // Mobile login button
        setTimeout(function () {
            const loginTextMobile = document.getElementById('loginTextMobile');
            if (loginTextMobile) {
                console.log('Mobile login button found and attached');
                loginTextMobile.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Mobile login button clicked');

                    closeMobileMenu();

                    setTimeout(function () {
                        openLoginModal();
                    }, 300);
                });
            } else {
                console.warn('Mobile login button not found');
            }

            // Desktop login button
            const loginText = document.getElementById('loginText');
            if (loginText) {
                console.log('Desktop login button found and attached');
                loginText.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Desktop login button clicked');
                    openLoginModal();
                });
            }
        }, 500);
        $(document).ready(function () {
            const $nav = $(".navbar");
            const $dvtopnav = $("#dvtopnav");
            const $navexp = $(".navbar-expand-sm");
            const $searchIcon = $(".searchIcon");
            const $closeIcon = $(".fa-xmark");
            const $navOpenBtn = $(".navOpenBtn");
            const $navlogo = $(".nav_logo");
            const $navpoints = $("#mobileView");
            const $licategoryserach = $("#licategoryserach");
            const $navCloseBtn = $(".navCloseBtn");

            const $body = $("body");
            const modalBackdrop = '<div class="modal-backdrop fade show"></div>';

            function addModalBackdrop() {
                if ($(".modal-backdrop").length === 0) {
                    $body.append(modalBackdrop);
                }
            }

            function removeModalBackdrop() {
                $(".modal-backdrop").remove();
            }

            // $searchIcon.on("click", function () {
            //     $nav.toggleClass("openSearch").removeClass("openNav");

            //     if ($nav.hasClass("openSearch")) {
            //          $searchIcon.removeClass("fa fa-search").addClass("fa-solid fa-xmark");
            //          $navlogo.addClass("invisible");
            //         // $navpoints.addClass("invisible");

            //          addModalBackdrop();
            //          $navexp.css("z-index", "99999");
            //          $dvtopnav.css("z-index", "99999");
            //          $dvtopnav.css("position", "relative");
            //     } else {
            //         $(".searchbox").val("");
            //         $(".licategoryserach ").empty();
            //         $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
            //         $navlogo.removeClass("invisible");
            //         $navpoints.removeClass("invisible");
            //         $licategoryserach.hide();
            //         removeModalBackdrop();
            //         $dvtopnav.css("position", "static");
            //     }
            // });
            //              $searchIcon.on("click", function () {
            //     $nav.toggleClass("openSearch").removeClass("openNav");
            //     const $navbarRight = $(".navbar-right"); // Desktop right side icons

            //     if ($nav.hasClass("openSearch")) {
            //          $searchIcon.removeClass("fa fa-search").addClass("fa-solid fa-xmark");
            //          $navlogo.addClass("invisible");
            //          $navbarRight.addClass("invisible"); // Hide cart, wishlist, profile

            //          addModalBackdrop();
            //          $navexp.css("z-index", "99999");
            //          $dvtopnav.css("z-index", "99999");
            //          $dvtopnav.css("position", "relative");
            //     } else {
            //         $(".searchbox").val("");
            //         $(".licategoryserach").empty();
            //         $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
            //         $navlogo.removeClass("invisible");
            //         $navbarRight.removeClass("invisible"); // Show cart, wishlist, profile again
            //         $navpoints.removeClass("invisible");
            //         $licategoryserach.hide();
            //         removeModalBackdrop();
            //         $dvtopnav.css("position", "static");
            //     }
            // });
            //             $closeIcon.on("click", function () {
            //                 $(".searchbox").val("");
            //                 $(".licategoryserach ").empty();
            //                 $nav.removeClass("openSearch openNav");
            //                 $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
            //                 $navlogo.removeClass("invisible");
            //                 $navpoints.removeClass("invisible");
            //                 $licategoryserach.hide();
            //                 removeModalBackdrop();
            //                 $dvtopnav.css("position", "static");
            //             });

            $searchIcon.on("click", function () {
                $nav.toggleClass("openSearch").removeClass("openNav");
                const $navbarRight = $(".navbar-right");

                if ($nav.hasClass("openSearch")) {
                    $searchIcon.removeClass("fa fa-search").addClass("fa-solid fa-xmark");
                    $navlogo.addClass("invisible");
                    $navbarRight.addClass("invisible");

                    // Freeze page scroll
                    $body.addClass("modal-open");
                    $body.css({
                        'overflow': 'hidden',
                        'position': 'fixed',
                        'width': '100%'
                    });

                    addModalBackdrop();
                    $navexp.css("z-index", "99999");
                    $dvtopnav.css("z-index", "99999");
                    $dvtopnav.css("position", "relative");
                } else {
                    $(".searchbox").val("");
                    $(".licategoryserach").empty();
                    $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
                    $navlogo.removeClass("invisible");
                    $navbarRight.removeClass("invisible");
                    $navpoints.removeClass("invisible");
                    $licategoryserach.hide();

                    // Unfreeze page scroll
                    $body.removeClass("modal-open");
                    $body.css({
                        'overflow': '',
                        'position': '',
                        'width': ''
                    });

                    removeModalBackdrop();
                    $dvtopnav.css("position", "static");
                }
            });

            $closeIcon.on("click", function () {
                const $navbarRight = $(".navbar-right");

                $(".searchbox").val("");
                $(".licategoryserach").empty();
                $nav.removeClass("openSearch openNav");
                $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
                $navlogo.removeClass("invisible");
                $navbarRight.removeClass("invisible"); // Show cart, wishlist, profile again
                $navpoints.removeClass("invisible");
                $licategoryserach.hide();

                // Unfreeze page scroll
                $body.removeClass("modal-open");
                $body.css({
                    'overflow': '',
                    'position': '',
                    'width': ''
                });

                removeModalBackdrop();
                $dvtopnav.css("position", "static");
            });


            $navOpenBtn.on("click", function () {
                $nav.addClass("openNav").removeClass("openSearch");
                $searchIcon.removeClass("fa-solid fa-xmark").addClass("fa fa-search");
                $navlogo.removeClass("invisible");
                $navpoints.removeClass("invisible");
                removeModalBackdrop();
                $dvtopnav.css("position", "static");
            });

            $navCloseBtn.on("click", function () {
                $nav.removeClass("openNav");
                removeModalBackdrop();
                $dvtopnav.css("position", "static");
            });
        });





        // Open the nested submenus on click for the first level
        $('.dropdown-submenu > p > a.dropdown-item.dropdown-toggle').on("click", function (e) {
            $(this).next('ul.dropdown-menu').toggle();
            e.stopPropagation();
            e.preventDefault();
        });

        // Open the nested submenus on hover for the second level
        $('.dropdown-submenu').on("mouseenter", function () {
            $(this).find('ul.dropdown-menu').show();
        });
        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + ProjectAuth + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {


                if (data.firstname !== null) {
                    var nameLimited;

                    if (data.firstname.length > 10) {
                        nameLimited = data.firstname.slice(0, 8) + "..";
                    } else {
                        nameLimited = data.firstname.slice(0, 10);
                    }

                    var rewardPoints = data.reward_points.toString().slice(0, 6);
                    var bindingname = '<b>' + nameLimited.charAt(0).toUpperCase() + nameLimited.slice(1) + '</b>';

                    $("#customername").append(bindingname);
                    $("#AromaPoints").append(rewardPoints);
                    $("#AromaPoints1").append(rewardPoints);
                }


            },
            error: function (xhr) {
            }
        });
        $('.dropdown-submenu').on("mouseleave", function () {
            $(this).find('ul.dropdown-menu').hide();
        });
        // Hide all submenus at the start
        $('ul.dropdown-menu').hide();


    };
    if (Authkey == null || Authkey == "" || Authkey == undefined) {
        // User NOT logged in - Show login button, hide account items
        $(".AmerifragPoinsCon").hide();
        $(".cLogin").show();
        $(".myaccount").hide();

        // Mobile specific - show login, hide account items
        $("#loginTextMobile").closest("li").show();
        $(".mobile-menu-item.myaccount").hide();
    } else {
        // User IS logged in - Hide login button, show account items
        $(".AmerifragPoinsCon").show();
        $(".cLogin").hide();
        $(".myaccount").show();

        // Mobile specific - HIDE LOGIN, show account items
        $("#loginTextMobile").closest("li").hide();
        $(".mobile-menu-item.myaccount").show();
    }

    // $(".cust_logout").click(function () {
    //     const style = document.createElement('style');
    //     style.type = 'text/css';
    //     style.id = 'custom-swal-style'; // ID to easily identify and remove the style later
    //     style.innerHTML = `
    //     .swal2-confirm::before {
    //         content: "";
    //         color: white;
    //         text-align:center !important;
    //     }
    //     .swal2-confirm {
    //         content: "Yes";
    //         color: white !important; /* Hide the button's original text */
    //     }
    // `;
    //     document.getElementsByTagName('head')[0].appendChild(style);

    //     swal({
    //         title: "",
    //         text: "Are you sure you want to logout?",
    //         icon: "warning",
    //         buttons: {
    //             confirm: {
    //                 text: "YES",
    //                 value: true,
    //                 visible: true,
    //                 className: "",
    //                 closeModal: false
    //             }
    //         }
    //         //buttons: {
    //         //    cancel: {
    //         //        text: "No, cancel!",
    //         //        visible: true,
    //         //        closeModal: true
    //         //    },
    //         //    confirm: {
    //         //        text: "Yes, Logout!",
    //         //        value: true,
    //         //        closeModal: false
    //         //    }
    //         //},


    //     }).then(function (isConfirm) {
    //         const customStyle = document.getElementById('custom-swal-style');
    //         if (customStyle) {
    //             customStyle.parentNode.removeChild(customStyle);
    //         }

    //         if (isConfirm) {
    //             var usersession = localStorage.getItem("authorid");
    //             if (usersession !== null) {
    //                 localStorage.clear();
    //                 //swal({
    //                 //    title: "Logged out!",
    //                 //    text: "You logged out successfully.",
    //                 //    icon: "success",
    //                 //    button: "Ok",
    //                 //});
    //                 setTimeout(function () {
    //                     window.location.href = "Home.html";
    //                 }, 2000);
    //             }
    //         } else {
    //             swal("Cancelled", "Your session is safe :)", "error");
    //         }
    //     });
    // });


    //$(".searchbox").autocomplete({
    //    autoFocus: true,
    //    source: function (request, response) {

    //        $(".dvcategoryserach").hide();
    //        $.ajax({
    //            url: "https://api.americanfragrances.com/Home/Search",
    //            type: "POST",
    //            dataType: "json",
    //            data: { Project_Id: Project_Id, name: request.term },
    //            success: function (data) {

    //                if (data != "") {
    //                    response($.map(data, function (item) {
    //                        return { label: item.name };
    //                    }))
    //                }

    //            }
    //        })
    //    },
    //    messages: {
    //        noResults: "", results: ""
    //    }
    //});

    // Handle input changes in the search field
    $(".cust_logout").click(function () {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'custom-swal-style';
        style.innerHTML = `
        .swal2-confirm::before {
            content: "";
            color: white;
            text-align:center !important;
        }
        .swal2-confirm {
            content: "Yes";
            color: white !important;
        }
    `;
        document.getElementsByTagName('head')[0].appendChild(style);

        swal({
            title: "",
            text: "Are you sure you want to logout?",
            icon: "warning",
            buttons: {
                confirm: {
                    text: "YES",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: false
                }
            }
        }).then(function (isConfirm) {
            const customStyle = document.getElementById('custom-swal-style');
            if (customStyle) {
                customStyle.parentNode.removeChild(customStyle);
            }

            if (isConfirm) {
                var usersession = localStorage.getItem("authorid");
                if (usersession !== null) {
                    // ✅ STEP 1: Save cart to database before logout
                    var cartItems = localStorage.getItem("cart_items");

                    if (cartItems && usersession) {
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/SyncCart",
                            type: "POST",
                            dataType: "JSON",
                            data: {
                                customer_id: usersession,
                                cart_items: cartItems,
                                project_id: Project_Id
                            },
                            success: function (response) {
                                console.log("✅ Cart saved to database before logout");
                            },
                            error: function (error) {
                                console.log("❌ Error saving cart:", error);
                            }
                        });
                    }

                    // ✅ STEP 2: Clear all localStorage
                    localStorage.clear();

                    swal("Logged Out!", "You have been logged out successfully", "success");

                    setTimeout(function () {
                        window.location.href = "Home.html";
                    }, 2000);
                }
            } else {
                swal("Cancelled", "Your session is safe :)", "error");
            }
        });
    });

    $('.searchbox').on('input', function () {
        const query = $(this).val().trim();
        // Make an AJAX request to fetch product suggestions
        $.ajax({
            url: 'https://api.americanfragrances.com/Home/SearchByName?searchName=' + query,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                $(".dvcategoryserach").show();
                $('.licategoryserach').empty();

                if ((data.Brands && data.Brands.length > 0) || (data.Products && data.Products.length > 0)) {

                    // Header HTML
                    var defaultHTML = `
                <li class='searchproduct_heading mt-1 p-2'>
                    <div class='row d-flex justify-content-around'>
                        <div class='col-5 d-flex flex-row align-items-center'><b style='color: #5d5d5d;'>Brand</b></div>
                        <div class='col-6 d-flex flex-row align-items-center'><b style='color: #5d5d5d;'>Products</b></div>
                    </div>
                </li>
            `;
                    $('.licategoryserach').append(defaultHTML);

                    // Prepare all brands (in one div)
                    var brandsHTML = "";
                    if (data.Brands && data.Brands.length > 0) {
                        $.each(data.Brands, function (i, brand) {
                            var encodedBrandName = encodeURIComponent(brand.name);
                            brandsHTML += `<a class='prodname d-block mb-1 py-1' href='show-all.html?brand=${encodedBrandName}'>${brand.name}</a>`;
                        });
                    }

                    // Prepare all products (in one div)
                    var productsHTML = "";
                    if (data.Products && data.Products.length > 0) {
                        $.each(data.Products, function (i, product) {
                            var categoryIcon = (product.categoryname === 'Women') ? "<i class='fa-solid fa-person-dress'></i>" :
                                (product.categoryname === 'Men') ? "<i class='fa-solid fa-person'></i>" :
                                    "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>";

                            productsHTML += `
                        <div class='d-flex flex-row align-items-center mb-2'>
                            <img style='width:30px; height:30px; object-fit:cover; margin-right:5px;' src='${product.display_image}' />
                            <div>
                                <a class='prodname' href='Productview.html?id=${product.id}'>${product.name}</a>
                                <p style='margin-bottom:0px; color:#6c6c6c;'>by <a href='show-all.html?brand=${product.brandname}'><b><u>${product.brandname}</u></b></a></p>
                            </div>
                            <span class='cat_icon ms-2'>${categoryIcon}</span>
                        </div>
                    `;
                        });
                    }

                    // Final combined list item
                    var combinedHTML = `
                <li class='searchproduct p-2'>
                    <div class='row d-flex justify-content-around'>
                        <div class='col-5 d-flex flex-column align-items-start'>
                            ${brandsHTML || '<span style="color:#999;">No Brands</span>'}
                        </div>
                        <div class='col-6 d-flex flex-column align-items-start'>
                            ${productsHTML || '<span style="color:#999;">No Products</span>'}
                        </div>
                    </div>
                </li>
            `;

                    $('.licategoryserach').append(combinedHTML);

                } else {
                    $('.licategoryserach').append("<div class='row d-flex justify-content-around'><h5 class='text-center my-3'>Product Not Found</h5></div>");
                }
            },
            error: function () {
                console.log('Error fetching suggestions.');
            }
        });

    });
    //handle input changes in the search field
    $('.searchbox2').on('input', function () {
        const query = $(this).val().trim();
        // Make an AJAX request to fetch product suggestions
        $.ajax({
            url: 'https://api.americanfragrances.com/Home/SearchByName?searchName=' + query,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                $(".dvcategoryserach2").show();
                $('.licategoryserach2').empty();

                if ((data.Brands && data.Brands.length > 0) || (data.Products && data.Products.length > 0)) {

                    // Header HTML
                    var defaultHTML = `
                <li class='searchproduct_heading mt-1 p-2'>
                    <div class='row d-flex justify-content-around'>
                        <div class='col-5 d-flex flex-row align-items-center'><b style='color: #5d5d5d;'>Brand</b></div>
                        <div class='col-6 d-flex flex-row align-items-center'><b style='color: #5d5d5d;'>Products</b></div>
                    </div>
                </li>
            `;
                    $('.licategoryserach2').append(defaultHTML);

                    // Prepare all brands (in one div)
                    var brandsHTML = "";
                    if (data.Brands && data.Brands.length > 0) {
                        $.each(data.Brands, function (i, brand) {
                            brandsHTML += `<a class='prodname d-block mb-1 py-1' href='show-all.html?brand=${brand.name}'>${brand.name}</a>`;
                        });
                    }

                    // Prepare all products (in one div)
                    var productsHTML = "";
                    if (data.Products && data.Products.length > 0) {
                        $.each(data.Products, function (i, product) {
                            var categoryIcon = (product.categoryname === 'Women') ? "<i class='fa-solid fa-person-dress'></i>" :
                                (product.categoryname === 'Men') ? "<i class='fa-solid fa-person'></i>" :
                                    "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>";

                            productsHTML += `
                        <div class='d-flex flex-row align-items-center mb-2'>
                            <img style='width:30px; height:30px; object-fit:cover; margin-right:5px;' src='${product.display_image}' />
                            <div>
                                <a class='prodname' href='Productview.html?id=${product.id}'>${product.name}</a>
                                <p style='margin-bottom:0px; color:#6c6c6c;'>by <a href='show-all.html?brand=${product.brandname}'><b><u>${product.brandname}</u></b></a></p>
                            </div>
                            <span class='cat_icon ms-2'>${categoryIcon}</span>
                        </div>
                    `;
                        });
                    }

                    // Final combined list item
                    var combinedHTML = `
                <li class='searchproduct p-2'>
                    <div class='row d-flex justify-content-around'>
                        <div class='col-5 d-flex flex-column align-items-start'>
                            ${brandsHTML || '<span style="color:#999;">No Brands</span>'}
                        </div>
                        <div class='col-6 d-flex flex-column align-items-start'>
                            ${productsHTML || '<span style="color:#999;">No Products</span>'}
                        </div>
                    </div>
                </li>
            `;

                    $('.licategoryserach2').append(combinedHTML);

                } else {
                    $('.licategoryserach2').append("<div class='row d-flex justify-content-around'><h5 class='text-center my-3'>Product Not Found</h5></div>");
                }
            },
            error: function () {
                console.log('Error fetching suggestions.');
            }
        });

    });


    function subcategorymenu() {

        $.ajax({
            url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id + "&categoryname=" + value.name,
                        type: "GET",
                        dataType: "JSON",
                        async: true,
                        crossDomain: true,
                        success: function (data) {


                            $.each(data, function (ind, values) {
                                var name = values.name.toLowerCase()
                                if (data) {
                                    var last = data.length - 1;
                                }
                                $(".Cat" + value.id).append('<li><a  href="show-all.html?cat=' + value.name + '&sub_cat=' + values.id + '">' + name + '</a></li>');
                                if (values.name != "TESTERS") {
                                    $(".men" + value.id).append('<div class=""><p style="margin-bottom:8px;"><a class="textcase" href="show-all.html?cat=' + value.name + '&sub_cat=' + values.name + '">' + name + '</a></p></div>');
                                    $(".women" + value.id).append('<div class=""><p  style="margin-bottom:8px;"><a class="textcase" style="" href="show-all.html?cat=' + value.name + '&sub_cat=' + values.name + '">' + name + '</a></p></div>');
                                    $(".unisex" + value.id).append('<div class=""><p  style="margin-bottom:8px;"><a class="textcase" style="" href="show-all.html?cat=' + value.name + '&sub_cat=' + values.name + '">' + name + '</a></p></div>');

                                } if (last == ind) {
                                    $(".men" + value.id).append('<div class=""><p style="margin-bottom:8px;"><a class="textcase" href="show-all.html?sub_cat=Clearance&cat=Men"> Clearance </a></p></div>');
                                    $(".women" + value.id).append('<div class=""><p  style="margin-bottom:8px;"><a class="textcase" style="" href="show-all.html?sub_cat=Clearance&cat=Women">Clearance</a></p></div>');

                                }
                                //$(".tester" + value.id).append('<div class=""><p><a href="show-all.html?cat=' + value.name + '&sub_cat=' + values.name + '">' + values.name + '</a></p></div>');
                            });

                        }
                    });

                });
            }
        });
        $.ajax({
            url: "https://api.americanfragrances.com/Home/PremiumBrandlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                //var filteredAndSortedData = data.filter(item => item.serialno !== null && item.ispremium === true).sort((a, b) => a.serialno - b.serialno);


                //var newrowContent = '<div class="item"><a href="show-all.html?brand=' + value.name + '"><img src="' + value.image + '" style="width:100%;height:100px;"></a></div>';
                //$("#brands-carousel").append(newrowContent);
                $.each(data, function (Index, value) {
                    if (value.ispremium === true & value.serialno <= 10) {
                        var newrow = '<div class=""><p style="margin-bottom:8px"><a href="show-all.html?brand=' + value.name + '">' + value.name + '</a></p></div>'
                        $(".brand").append(newrow);
                    }

                    // brand += '<div class="col-megamenu"><div class="row brand"></div></div>';

                });
                var morerow = '<div class=""><p style="text-align:center !important;"><a style="color:#70b4bd !important;font-weight:bold !important;" href="Brands.html">More + </a></p></div>';
                $(".brand").append(morerow);
            }
        });
    }


    //$(".search").click(function () {
    //    $(".searchlabel").hide();
    //    $(".searchbox").show();
    //});
    $(".searchbox2").click(function () {
        /*  $(".search2").addClass("d-none");*/
    });
    $('body').on('click', function (event) {
        var searchdiv = $(".dvcategoryserach").hide();
        if (!searchdiv.is(event.target) && searchdiv.has(event.target).length === 0) {
            searchdiv.hide();
        }
    });
    $('body').on('click', function (event) {
        var searchdiv = $(".dvcategoryserach2").hide();
        $(".searchbox2").val('');
        if (!searchdiv.is(event.target) && searchdiv.has(event.target).length === 0) {
            searchdiv.hide();
        }

    });
    //$(".searchbox").click(function () {
    //    $.ajax({
    //        url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
    //        type: "Get",
    //        dataType: "json",
    //        success: function (data) {


    //            if (data.length > 0) {
    //                $(".dvcategoryserach").show();
    //                $(".licategoryserach").empty();
    //                $.each(data, function (index, val) {
    //                    var list = "<li class='pt-2 pl-2 mt-1 categorySerch' style='border:1px solid black; margin:5px; padding-left:5px;'>" +
    //                        "<a style='' href='show-all.html?cat=" + val.name + "'><p style='margin-bottom:0px !important'>" + val.name +
    //                        "<span class='cat_icon'>" +
    //                        (val.name === 'Women' ? "<i class='fa-solid fa-person-dress'></i>" :
    //                            val.name === 'Men' ? "<i class='fa-solid fa-person'></i>" :
    //                                "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>") +
    //                        "</span></p></a></li>";

    //                    $(".licategoryserach").append(list);
    //                });
    //            }
    //            else {
    //                //
    //            }

    //        }
    //    })
    //    $.ajax({
    //        url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id,
    //        type: "Get",
    //        dataType: "json",
    //        success: function (data) {


    //            if (data.length > 0) {
    //                $(".dvcategoryserach").show();
    //                $(".licategoryserach").empty();
    //                $.each(data, function (index, val) {
    //                    var list = "<li class='p-2 mt-1 mb-1' style='border:1px solid black; margin:5px;'>" +
    //                        "<a style='padding:10px' href='show-all.html?cat=" + val.name + "'>" + val.name + "</a>" +
    //                        "<span class='cat_icon'>" +
    //                        (val.name === 'Women' ? "<i class='fa-solid fa-person-dress'></i>" :
    //                            val.name === 'Men' ? "<i class='fa-solid fa-person'></i>" :
    //                                "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>") +
    //                        "</span></li>";

    //                    $(".licategoryserach").append(list);
    //                });
    //            }
    //            else {
    //                //
    //            }

    //        }
    //    })
    //});

    $(".searchbox2").click(function () {
        //$.ajax({
        //    url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
        //    type: "Get",
        //    dataType: "json",
        //    success: function (data) {


        //        if (data.length > 0) {
        //            $(".dvcategoryserach2").show();
        //            $(".licategoryserach2").empty();
        //            $.each(data, function (index, val) {
        //                var list = "<li class='pt-2 pl-2 mt-1 categorySerch' style='border:1px solid black; margin:5px; padding-left:5px;'>" +
        //                    "<a style='' href='show-all.html?cat=" + val.name + "'><p style='margin-bottom:0px !important'>" + val.name +
        //                    "<span class='cat_icon'>" +
        //                    (val.name === 'Women' ? "<i class='fa-solid fa-person-dress'></i>" :
        //                        val.name === 'Men' ? "<i class='fa-solid fa-person'></i>" :
        //                            "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>") +
        //                    "</span></p></a></li>";
        //                $(".licategoryserach2").append(list);
        //            });
        //        }
        //        else {
        //            //
        //        }

        //    }
        //})
        //$.ajax({
        //    url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id,
        //    type: "Get",
        //    dataType: "json",
        //    success: function (data) {


        //        if (data.length > 0) {
        //            $(".dvcategoryserach2").show();
        //            $(".licategoryserach2").empty();
        //            $.each(data, function (index, val) {
        //                var list = "<li class='p-2 mt-1 mb-1' style='border:1px solid black; margin:5px;'>" +
        //                    "<a style='padding:10px' href='show-all.html?cat=" + val.name + "'>" + val.name + "</a>" +
        //                    "<span class='cat_icon'>" +
        //                    (val.name === 'Women' ? "<i class='fa-solid fa-person-dress'></i>" :
        //                        val.name === 'Men' ? "<i class='fa-solid fa-person'></i>" :
        //                            "<i class='fa-solid fa-person'></i><i class='fa-solid fa-person-dress'></i>") +
        //                    "</span></li>";
        //                $(".licategoryserach2").append(list);
        //            });
        //        }
        //        else {
        //            //
        //        }

        //    }
        //})
    });

    $(".dropdown-item").click(function () {
        var catname = $(this).text();
        var categoryname = $.trim(catname);
        window.location.href = "show-all.html?cat=" + categoryname;
    });





    $("#dvnavb,#closenav").click(function () {
        $("#DivmobileNav").slideToggle();
    });

    //$('.searchbox').keypress(function (event) {
    //   var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        var getnames = $("#searchbox").val();
    //        var getname = $.trim(getnames);
    //        window.location.href = "show-all.html?productname=" + getname;
    //    }
    //});
    //$(".searchbox").autocomplete({
    //    autoFocus: true,
    //    source: function (request, response) {
    //        $.ajax({
    //            url: "https://api.americanfragrances.com/Home/Search",
    //            type: "POST",
    //            dataType: "json",
    //            data: { productname: request.term },
    //            success: function (data) {
    //                if (data != "") {
    //                    response($.map(data, function (item) {
    //                        return { label: item.display_name };
    //                    }))
    //                } else {
    //                    alert("No products were found matching your selection.");
    //                }
    //            }
    //        })
    //    },
    //    messages: {
    //        noResults: "", results: ""
    //    }
    //});

    $('.Ad_searchbox').keyup(function (e) {
        if (e.keyCode == 13) {
            var getnames = $("#searchbox").val();
            var getname = $.trim(getnames);
            $.ajax({
                url: "https://api.americanfragrances.com/Home/Searchresultvendor?productname=" + getname + "&project_id=" + Project_Id,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    // $("#prdctid").val(data.category_id);
                    var getid = data[0].id
                    window.location.href = "show-all.html?vendor=" + getid;
                }
            });
        }
    });
    $("#btnsearch").click(function () {
        var getnames = $("#searchbox").val();
        var getname = $.trim(getnames);

        $.ajax({
            url: "https://api.americanfragrances.com/Home/Searchresultvendor?productname=" + getname + "&project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                // $("#prdctid").val(data.category_id);
                var getid = data[0].id
                window.location.href = "show-all.html?vendor=" + getid;
            }
        });
    });
    $(".ui-menu-item").click(function () {

        var catname = $(this).val();
        var categoryname = $.trim(catname);
        window.location.href = "show-all.html?cat=" + categoryname;
    });


    // megamenu
    //$(".dropdown").hover(
    //    function () {
    //        $('.megamenu', this).not('.in .megamenu').stop(true, true).slideDown("400");
    //        $(this).toggleClass('open');
    //    },
    //    function () {
    //        $('.megamenu', this).not('.in .megamenu').stop(true, true).slideUp("400");
    //        $(this).toggleClass('open');
    //    }
    //);


    $(".dropdown").hover(function () {
        var dropdownMenu = $(this).children(".dropdown-menu");
        if (dropdownMenu.is(":visible")) {
            dropdownMenu.parent().toggleClass("open");
        }
    });
    var newModalContent =
        '<div class="modal-dialog modal-dialog-centered modal-lg">' +
        '<div class="modal-content" style="border:6px solid #70b4bd !important;max-width:90%;border-radius:0px">' +
        '<div class="modal-header">' +
        '<div class="d-block m-auto">' +
        '<h4 class="modal-heading m-0 text-center" style="text-transform:none !important">' +
        'e-Gift Card' +
        '</h4>' +
        '</div>' +
        '<button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>' +
        '</div>' +
        '<div class="modal-body" style="padding-top:0px !important;">' +
        '<div class="row p-3 align-items-baseline">' +
        '<h6 class="m-0 text-center"><a style="font-size:15px;font-weight: 500" href="/register.html">Register</a> or <a style="font-size:15px;font-weight: 500" id="loginText">Login</a> </h6>' +
        '<p style="color:black; font-size:14px;" class="pt-2">' +
        "Surprise your loved ones with the gift of choice! Log in or register now to purchase and send a personalized e-gift card to someone special!" +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    var refillPopup =
        '<div class="modal-dialog modal-dialog-centered modal-lg">' +
        '<div class="modal-content" style="border:6px solid #70b4bd !important;max-width:90%;border-radius:0px !important">' +
        '<div class="modal-header">' +
        '<div class="d-block m-auto">' +
        '<h4 class="modal-heading m-0 text-center" style="text-transform:none !important">' +
        'Refill Program' +
        '</h4>' +
        '</div>' +
        '<button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>' +
        '</div>' +
        '<div class="modal-body" style="padding-top:0px !important;">' +
        '<div class="row p-3 align-items-baseline">' +
        '<h6 class="m-0 text-center"><a style="font-size:15px;font-weight: 500" href="/register.html">Register</a> or <a style="font-size:15px;font-weight: 500" id="loginText">Login</a> </h6>' +
        '<p style="color:black; font-size:14px;" class="pt-2">' +
        "Keep your favorites flowing! Join our Refill Program and enjoy continuous savings on every reorder. Log in or register now to stay stocked up and never miss out on the products you love." +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    var wishListPopup =
        '<div class="modal-dialog modal-dialog-centered modal-lg">' +
        '<div class="modal-content" style="border:6px solid #70b4bd !important;max-width:90%;border-radius:0px !important">' +
        '<div class="modal-header">' +
        '<div class="d-block m-auto">' +
        '<h4 class="modal-heading m-0 text-center" style="text-transform:none !important">' +
        'My Wish List' +
        '</h4>' +
        '</div>' +
        '<button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>' +
        '</div>' +
        '<div class="modal-body" style="padding-top:0px !important;">' +
        '<div class="row p-3 align-items-baseline">' +
        '<h6 class="m-0 text-center"><a style="font-size:15px;font-weight: 500" href="/register.html">Register</a> or <a style="font-size:15px;font-weight: 500" id="loginText">Login</a> </h6>' +
        '<p style="color:black; font-size:14px;" class="pt-2">' +
        "Love this product? Login or Register now to add it to your favorites and start building your personalized collection of must-haves!" +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'


    $(document).on('click', '#loginText', function () {
        $(".modal").modal('hide');
        $("#loginpopup").modal('show');
    });
    //$(document).on('click', '#navSearchIcon', function () {
    //    $(".modal").modal('hide');
    //    $("#SearchPopup").modal('show');
    //});

    $(document).on('click', '.modal .btn-close', function () {
        localStorage.removeItem("redirectionpage");
    });
    var path;
    $(document).on('click', '#collapsibleNavbar1 .nav-link', function () {

        var id = $(this).attr("id");
        if (id === 'giftRedirction') {

            if (Authkey == null || Authkey == "") {
                $("#giftvocherLogin").empty();
                $("#giftvocherLogin").append(newModalContent);
                localStorage.removeItem("redirectionpage");
                localStorage.setItem("redirectionpage", "/giftvoucher.html");
                $("#giftvocherLogin").modal('show');
            }
            else {
                window.location.href = "/giftvoucher.html";
            }

        } else if (id === 'refillredire') {

            if (Authkey == null || Authkey == "") {
                localStorage.removeItem("redirectionpage");
                localStorage.setItem("redirectionpage", "/refilprogram.html");
                $("#giftvocherLogin").empty();
                $("#giftvocherLogin").append(refillPopup);
                $("#giftvocherLogin").modal('show');
            }
            else {
                window.location.href = "/refilprogram.html";
            }

        }
        else if (id === 'wishListRedire') {

            if (Authkey == null || Authkey == "") {
                localStorage.removeItem("redirectionpage");
                localStorage.setItem("wishListRedire", "/wishlist.html");
                $("#giftvocherLogin").empty();
                $("#giftvocherLogin").append(wishListPopup);
                $("#giftvocherLogin").modal('show');
            }
            else {
                window.location.href = "/wishlist.html";
            }

        }

    });

    //$(document).on("mouseenter", ".dropdown-menu ul li", function () {
    //    // Change the color of closest .dropdown-submenu p a
    //    $(this).closest('.dropdown-submenu').find('p a').css('color', '#70b4bd ');
    //    // Change the color of the current item and related nav-link
    //    $(this).find("a").css('color', '#70b4bd');
    //    $(this).closest("li.nav-item").find(".nav-link").attr('style', 'color: #70b4bd !important');

    //    /*  $(this).closest("li.nav-item").find(".nav-link").css('color', '#70b4bd');*/
    //}).on("mouseleave", ".dropdown-menu ul li", function () {
    //    // Reset the colors
    //    $(this).find("a").css('color', '#000');
    //    $(this).closest('.dropdown-submenu').find('p a').css('color', '#000');
    //    $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');
    //});

    //$(document).on("mouseenter", ".dropdown-submenu p", function () {
    //    $(this).find("a").css('color', '#70b4bd');
    //    $(this).closest("li.nav-item").find(".nav-link").css('color', '#70b4bd');
    //}).on("mouseleave", ".dropdown-submenu p", function () {
    //    $(this).find("a").css('color', '#000');
    //    /* $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');*/
    //    $(this).closest("li.nav-item").find(".nav-link").attr('style', 'color: #70b4bd !important');

    //});

    //$(document).on("mouseenter", ".dropdown-menu .col-megamenu .row div p", function () {
    //    $(this).find("a").css('color', '#70b4bd');
    //    $(this).find(".textcase").css('color', '#70b4bd');
    //    /*        $(this).closest("li.nav-item").find(".nav-link").css('color', '#70b4bd');*/
    //    $(this).closest("li.nav-item").find(".nav-link").attr('style', 'color: #70b4bd !important');


    //}).on("mouseleave", ".dropdown-menu .col-megamenu .row div p", function () {
    //    $(this).find("a").css('color', '#000');
    //    $(this).find(".textcase").css('color', '#000');
    //    $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');
    //});

    //$(document).on("mouseenter", ".dropdown-menu .testersDv p", function () {
    //    $(this).find("a").css('color', '#70b4bd');
    //    $(this).closest("li.nav-item").find(".nav-link").attr('style', 'color: #70b4bd !important');
    //}).on("mouseleave", ".dropdown-menu .testersDv p", function () {
    //    $(this).find("a").css('color', '#000');
    //    $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');
    //});

    //$(document).on("mouseenter", ".nav-link", function () {
    //    $(this).css('color', '#70b4bd');
    //}).on("mouseleave", ".nav-link", function () {
    //    $(this).css('color', '#000');
    //});
    /////////////////////////////////////////////////////////////
    $(document).on("mouseenter", ".testersDv p", function () {
        $(this).find("a")[0].style.setProperty("color", "#70b4bd", "important");
    }).on("mouseleave", ".testersDv p", function () {
        $(this).find("a")[0].style.setProperty("color", "#000", "important");
    });
    $(document).on("mouseenter", ".dropdown-menu", function () {

        $(this).closest("li.nav-item").find(".nav-link").attr('style', 'color: #70b4bd !important');

    }).on("mouseleave", ".dropdown-menu", function () {
        $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');

    });
    $(document).on("mouseenter", ".dropdown-menu ul", function () {
        // Change the color of closest .dropdown-submenu p a
        $(this).closest('.dropdown-submenu').find('p a').css('color', '#70b4bd');
    });

    $(document).on("mouseleave", ".dropdown-menu ul", function () {
        // Reset the colors
        $(this).closest('.dropdown-submenu').find('p a').css('color', '#000');
    });

    $(document).on("mouseenter", ".dropdown-menu ul li", function () {
        // Change color of the anchor tag inside the hovered li
        $(this).find("a").css('color', '#70b4bd');
    }).on("mouseleave", ".dropdown-menu ul li", function () {
        // Reset color when mouse leaves li
        $(this).find("a").css('color', '#000');
    });



    $(document).on("mouseenter", ".dropdown-submenu p", function () {
        $(this).find("a").css('color', '#70b4bd');

    }).on("mouseleave", ".dropdown-submenu p", function () {
        $(this).find("a").css('color', '#000');
        /* $(this).closest("li.nav-item").find(".nav-link").css('color', '#000');*/


    });

    $(document).on("mouseenter", ".dropdown-menu .col-megamenu .row div p", function () {
        $(this).find("a").css('color', '#70b4bd');
        $(this).find(".textcase").css('color', '#70b4bd');
        /*        $(this).closest("li.nav-item").find(".nav-link").css('color', '#70b4bd');*/



    }).on("mouseleave", ".dropdown-menu .col-megamenu .row div p", function () {
        $(this).find("a").css('color', '#000');
        $(this).find(".textcase").css('color', '#000');

    });



    $(document).on("mouseenter", ".nav-link", function () {
        $(this).css('color', '#70b4bd');
    }).on("mouseleave", ".nav-link", function () {
        $(this).css('color', '#000');
    });




    ////////////////////////////////////////////////////////////


    //var giftIcon;
    //

    //var path = window.location.pathname;

    //var newModalContent=
    //'<div class="modal-dialog modal-dialog-centered modal-lg">' +
    //'<div class="modal-content">' +
    //'<div class="modal-header">' +
    //'<div class="d-block m-auto">' +
    //'<h4 class="modal-heading m-0 text-center">' +
    //'Gift Voucher' +
    //'</h4>' +
    //'<br />' +
    //'<h6 class="m-0 text-center"><a style="font-size:15px;font-weight: 500" href="/register.html">Register</a> or <a style="font-size:15px;font-weight: 500" href="/Home.html">Login</a> </h6>' +
    //'</div>' +
    //'<button type="button" class="btn-close ms-0" data-bs-dismiss="modal"></button>' +
    //'</div>' +
    //'<div class="modal-body py-2">' +
    //'<div class="row p-3 align-items-baseline">' +
    //'<p style="color:black; font-size:14px;">' +
    //"To send e-Gift Cards and Vouchers, please log in or register. By joining, you'll gain access to exclusive offers and personalized recommendations.Share the perfect fragrance experience with your loved ones today!" +
    //'</p>' +
    //'</div>' +
    //'</div>' +
    //'</div>' +
    //'</div>' 

    //$("#giftvocherLogin").append(newModalContent);
    //$(".giftRedirction").click(function () {        

    //    if (Authkey == null || Authkey == "") {
    //        giftIcon = $(this).attr("id");
    //        localStorage.setItem("giftVocherpage", giftIcon);
    //        $("#giftvocherLogin").modal('show');



    //    }
    //    else {
    //        window.location.href = "/giftvoucher.html";
    //    }
    //})


    $(document).on('click', '.toggle-password', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $("#Lpassword");
        input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')
    });
    // Function to update the cart count badge position
    //function updateCartCountPosition() {
    //    var $iconContainer = $('#cart-icon-container');
    //    var $cartCountBadge = $iconContainer.find('.cart_count_circle');

    //    var iconOffset = $iconContainer.offset();
    //    var top = iconOffset.top;
    //    var left = iconOffset.left;

    //    $cartCountBadge.css({
    //        top: top + 'px',
    //        left: left + 'px'
    //    });
    //}










    // Call the function initially
    /* updateCartCountPosition();*/

    // Listen for window resize events and reposition the badge when the window size changes
    /*window.addEventListener('resize', updateCartCountPosition);*/
});

// ============================================
// Menu Toggle JavaScript
// ============================================
// document.addEventListener('DOMContentLoaded', function() {
//     const navbarToggler = document.querySelector('.navbar-toggler');
//     const navbarCollapse = document.getElementById('collapsibleNavbar1');
//     const menuOverlay = document.getElementById('menuOverlay');
//     const menuCloseBtn = document.querySelector('.menu-close-btn');

//     // Toggle menu and overlay
//     if (navbarToggler) {
//         navbarToggler.addEventListener('click', function() {
//             setTimeout(function() {
//                 if (navbarCollapse.classList.contains('show')) {
//                     menuOverlay.classList.add('active');
//                 } else {
//                     menuOverlay.classList.remove('active');
//                 }
//             }, 10);
//         });
//     }

//     // Close menu when clicking overlay
//     if (menuOverlay) {
//         menuOverlay.addEventListener('click', function() {
//             if (navbarCollapse.classList.contains('show')) {
//                 navbarToggler.click();
//                 menuOverlay.classList.remove('active');
//             }
//         });
//     }

//     // Close menu when clicking close button
//     if (menuCloseBtn) {
//         menuCloseBtn.addEventListener('click', function() {
//             menuOverlay.classList.remove('active');
//         });
//     }

//     // Close menu when clicking any link
//     const menuLinks = navbarCollapse.querySelectorAll('.nav-link');
//     menuLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             if (window.innerWidth < 992) {
//                 setTimeout(function() {
//                     if (navbarCollapse.classList.contains('show')) {
//                         navbarToggler.click();
//                         menuOverlay.classList.remove('active');
//                     }
//                 }, 200);
//             }
//         });
//     });
// });
