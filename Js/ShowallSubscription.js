$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var vendor = params.get('vendor');
    var Category_name = params.get('cat');
    var more = params.get('more');
    console.log(more)
    var Sub_Category = params.get('sub_cat');
    var cart_id = localStorage.getItem("cart_id");
    let Authkey = localStorage.getItem("authorid");
    var usersession = localStorage.getItem("authorid");
    var brand_name = params.get('brand');
    var TesterGender = params.get('Testergender');
    var label = params.get('label');
    var labelHeading = params.get('labelHeading');
    if (labelHeading) {
        labelHeading = labelHeading.toLowerCase();
    } else {
        labelHeading = ''; // or handle as needed
    }
    var appliedFilter = false;
    var type = params.get('type');
    var rangeSliderProducts = params.get('selectedProducts')
    var userGender = localStorage.getItem("userGender");
    var keyword = params.get('keyword');
    var allproducts = params.get('more');
    var choice = params.get('choice');    
    var recomendedAnalytics = params.get('analytics');
    // var multyanaliticsclick = false;
    //For handling Side menu
    setTimeout(function () {
        window.scrollTo(0, 50); // Scroll 2px down after loading
    }, 10000); 

    var savedData = localStorage.getItem('priceDiscountData');
    //multianalyyics barcode hiding intially.when user click shop then only it is showing
    $('#barcodeSelected').hide();
    var pricemin = parseFloat($("#minp").val());
    var pricemax = parseFloat($("#maxp").val());
    var minpercen = parseFloat($("#minpercen").val());
    var maxpercen = parseFloat($("#maxpercen").val());


    $("#bannerTextDes").hide();
    $("#showallBanner").hide();
    $("#brandImgCon").hide();
    if ((Sub_Category != null && Sub_Category !== "") || params.has('choice')) {
        $("#showallBanner").show();
        $("#showallBannerImg").empty(); // Move outside to avoid redundancy
        var imageSrc = "";

        var bannerMap = {
            "MAKE UP": { "Men": "1.jpg", "Women": "2.jpg" },
            "SKIN CARE": { "Men": "3.jpg", "Women": "4.jpg" },
            "HAIR CARE": { "Men": "5.jpg", "Women": "6.jpg" },
            "BATH ": { "Men": "7.jpg", "Women": "8.jpg" },
            "AROMA": { "Men": "9.jpg", "Women": "10.jpg" },
            "GIFT SETS": { "Men": "11.jpg", "Women": "12.jpg" },
            "BUNDLE SETS": { "Men": "13.jpg", "Women": "14.jpg" },
            "ACCESSORIES": { "Men": "16.jpg", "Women": "15.jpg" },
            "Clearance": { "Men": "17.jpg", "Women": "18.jpg" }

        };

        // Trim and handle null/undefined Category_name
        var genderKey = Category_name ? Category_name.trim() : "";
        var subCatKey;
        if (Sub_Category) {
            subCatKey = Object.keys(bannerMap).find(key => key.toLowerCase() === Sub_Category.toLowerCase());
        }


        // If Category_name is missing or empty, default to showing the Women image
        if (subCatKey) {
            if (!genderKey && bannerMap[subCatKey]["Women"]) {
                imageSrc = bannerMap[subCatKey]["Women"];
            } else if (bannerMap[subCatKey][genderKey]) {
                imageSrc = bannerMap[subCatKey][genderKey];
            }
        } else if (params.has('choice')) {
            imageSrc = "AmerifragChoiceBanner.jpg";
        } else if (params.has('keyword')) {

        }
        if (imageSrc !== "") {
            $("#showallBannerImg").append('<img src="Images/showall/' + imageSrc + '" style="width:100%; height:auto;" />');
        }
    }
    else {
        if (params.has('brand')) {
            $("#showallBanner").hide();
            $("#showallBannerImg").empty();
            $("#brandsBannerIMG").empty();
            $("#brandImgCon").show();
            $("#bannerTextDes").show();
            $.ajax({
                url: "https://api.americanfragrances.com/Brand/GetBrandDetails?brandname=" + brand_name,
                type: "GET",
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {

                    if (data.bannerimage) {
                        $("#brandsBannerIMG").append('<img src="' + data.bannerimage + '"  style="width:100%; height:400px;" />');

                    }
                    $("#bannerTextDes").empty();
                    $("#bannerTextDes").text(data.bannerheader);

                },
                error: function (xhr) {
                    //
                }
            });




        }
    }






    //Price Range

    (function () {
        var parent = document.querySelector(".range-slider");
        if (!parent) return;

        var rangeS = parent.querySelectorAll("input[type=range]"),
            numberS = parent.querySelectorAll("input[type=number]");

        rangeS.forEach(function (el) {
            el.oninput = function () {
                var slide1 = parseFloat(rangeS[0].value),
                    slide2 = parseFloat(rangeS[1].value);

                if (slide1 > slide2) {
                    [slide1, slide2] = [slide2, slide1];

                }

                numberS[0].value = slide1;
                numberS[1].value = slide2;
            };
        });

        numberS.forEach(function (el) {
            el.oninput = function () {
                var number1 = parseFloat(numberS[0].value),
                    number2 = parseFloat(numberS[1].value);

                if (number1 > number2) {
                    var tmp = number1;
                    numberS[0].value = number2;
                    numberS[1].value = tmp;
                }

                rangeS[0].value = number1;
                rangeS[1].value = number2;
            };
        });
    })();
    //--------------------------------shop by sale-----------------------------------//

    (function () {
        var parent = document.querySelector(".range-slider2");
        if (!parent) return;

        var rangeS2 = parent.querySelectorAll("input[type=range]"),
            numberS2 = parent.querySelectorAll("input[type=number]");
        rangeS2.forEach(function (el) {
            el.oninput = function () {
                var slide1 = parseFloat(rangeS2[0].value),
                    slide2 = parseFloat(rangeS2[1].value);

                if (slide1 > slide2) {
                    [slide1, slide2] = [slide2, slide1];

                }

                numberS2[0].value = slide1;
                numberS2[1].value = slide2;
            };
        });

        numberS2.forEach(function (el) {
            el.oninput = function () {
                var number1 = parseFloat(numberS2[0].value),
                    number2 = parseFloat(numberS2[1].value);

                if (number1 > number2) {
                    var tmp = number1;
                    numberS2[0].value = number2;
                    numberS2[1].value = tmp;
                }

                rangeS2[0].value = number1;
                rangeS2[1].value = number2;
            };
        });
    })();

    if (savedData) {
        savedData = JSON.parse(savedData);  // Parse the data from localStorage

        var rangeS = document.querySelectorAll(".range-slider input[type=range]"),
            numberS = document.querySelectorAll(".range-slider input[type=number]");

        // Set the values for the first range-slider
        rangeS[0].value = savedData.minPrice;
        rangeS[1].value = savedData.maxPrice;
        numberS[0].value = savedData.minPrice;
        numberS[1].value = savedData.maxPrice;

        // Set the values for the second range-slider2
        var rangeS2 = document.querySelectorAll(".range-slider2 input[type=range]"),
            numberS2 = document.querySelectorAll(".range-slider2 input[type=number]");

        rangeS2[0].value = savedData.minDiscount;
        rangeS2[1].value = savedData.maxDiscount;
        numberS2[0].value = savedData.minDiscount;
        numberS2[1].value = savedData.maxDiscount;

        $("#minp").val(savedData.minPrice);
        $("#maxp").val(savedData.maxPrice);
        $("#minpercen").val(savedData.minDiscount);
        $("#maxpercen").val(savedData.maxDiscount);

        // Call the function to handle the slider update
        /*  priceRangeSlide();*/
        pricemin = parseFloat($("#minp").val());
        pricemax = parseFloat($("#maxp").val());
        minpercen = parseFloat($("#minpercen").val());
        maxpercen = parseFloat($("#maxpercen").val());
        getproducts()
        localStorage.removeItem('priceDiscountData');
    }

    $(".recommendedProfileParentCon").hide();
    $(".AIrecommendationsSideBar").hide();
    $(".profileBasedRecomendationsCon").addClass("d-none");
    $(".chooseProductsHeadingCon").hide();
    $(".multiAnalytics").hide();
    $("#testimonialCon").hide();
    $("#AmerifragAIShowall").hide();
    //--------------------------------------If User Not Login Redirecting to Home page when click on shop button of AI Recommendations----------------------------//
    $(document).on("click", "#profileBasedRecomendations", function () {



        window.location.href = "/show-allSubscription.html?analytics=products";


    })
    //---------------------------------------------------------------------------------------------------------//
    if (Authkey != null) {
        if (recomendedAnalytics != null && recomendedAnalytics != "") {
             
            profileDescriptions();
            customerProfile();
            $(".recommendedProfileParentCon").show();
            $(".chooseProductsHeadingCon").show();
            $("#bothRecomendationsCon").hide();
            $(".multiAnalytics").show();
            $(".breadCrumbCon").css("background-color", "#d3d3d3");
            $(".recommendedProfileParentCon").removeClass("d-none");
            //  $(".recommendedProfileParentCon").css("background-image", "url('Images/showall/BG VIDEO.gif')");
        } else {
            $(".breadCrumbCon").css("background-color", "white");
            //  $(".recommendedProfileParentCon").css("background-image", "");
            $(".recommendedProfileParentCon").addClass("d-none");
            $(".profileBasedRecomendationsCon").removeClass("d-none");
        }
    }


    if (recomendedAnalytics != null && recomendedAnalytics != "") {
        $("#testimonialCon").show();
        $("#AmerifragAIShowall").show();
        $("#showallBanner").attr("style", "display: none !important;");
        $("#decarative2").hide();
         
    }

    var OptionBasedProducs = [];




    if (Category_name != null && Sub_Category != null) {
        $(".cat_title_breadcrumb").text(Category_name);
        $(".cat_title_breadcrumb").attr("href", "show-all.html?cat=" + Category_name);
    }
    else {
        $(".categotyList_breadcrumb").hide();
    }

    /*$(".recomendationsSection").hide();*/
    $("#loadmoreDiv").hide();
    $("#loginShowSen").show()

    //intially hiding two analytics
    $("#bothRecomendationsCon").hide();


    if (Sub_Category == "FRAGRANCES" || Sub_Category == "TESTERS" || label != null || keyword == "luxury" || keyword == "timeless" || keyword == "celebrity" || keyword == "toprated" || keyword == "newarrivals" || keyword == "bestsellers") {

        $("#shopByanalytics").show();
        $(".recomendationsSection").show();
        $("#bothRecomendationsCon").show();

    } else if (Sub_Category == null) {
        $("#shopByanalytics").show();
        $(".recomendationsSection").show();

    }
    else {
        $("#shopByanalytics").hide();
        $(".recomendationsSection").hide();

    }


    if (allproducts != null && allproducts != "") {
        $("#loadmoreDiv").show();
    }

    //hide profile all the time

    //if (Category_name != "TESTERS") {
    //    $("#showallBannerImg").empty();
    //    $("#showallBannerImg").append('<img src="Images/showall/showallBanner1.png" style="width:100%; height:auto;" />');

    //}

    if (Authkey != null && Authkey != "") {
        $("#loginShowSen").hide();

    }

    if (Category_name == null) {
        var brand_name = params.get('brand');
        $(".subcat").hide();
        $("#showMoreSub").hide();

    }
    else {
        getsubcatlist();
    };

    var selectpickerdata;
    var getname = params.get('analytics');
    if (cart_id) {
        cart_count(cart_id);
    }
    var take = 50;
    var skip = 0;
    var displayedProducts = []; // Keep track of displayed products
    getcategorynames();
    if (getname == 'products') {
        getanalytics();

        $("#loadmoreDiv").show();
    } else {
        var take = 50;
        var skip = 0;
        getproducts();
    }

    var area = localStorage.getItem("Area");
    if (area != null) {
        $("#SLselectArea option:selected").text(area);
    }
    $("#btnclosepop").click(function () {
        localStorage.setItem('popup', "tick");
    })
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var log = params.get('login');
    if (log == "yes") {
        $('#successlogin').modal('show');
    }
    var categoryname = 'Women'; // Example value, replace with actual logic to get category name


    ////----------------------------------------Tester page banner--------------------------------------------//


    if (more === "all") {
        console.log(2)
        $('#pieChartSlide').addClass('show').removeClass('remove-show');
        $('body').addClass('freeze-scroll blurred');
        params.delete('more');
        params.set('sub_cat', 'FRAGRANCES');
        window.history.replaceState(null, '', window.location.pathname + '?' + params.toString());
        $("#bothRecomendationsCon").show();
    }
    //else {
    //    $('#pieChartSlide').removeClass('remove-show').addClass('show');
    //}

    function getquestions2() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/FilterQuestionlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var qunid = value.id;
                    if (qunid == "6de8d1ba-9a1a-4947-b457-4c003b445bb6") {
                        var qun1 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun1">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun1"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="option11' + value.id + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="option12' + value.id + '" id="option12' + value.id + '">' + value.option12 + '</option><option value="option13' + value.id + '" id="option13' + value.id + '">' + value.option13 + '</option><option value="option14' + value.id + '" id="option14' + value.id + '">' + value.option14 + '</option><option value="option15' + value.id + '" id="option15' + value.id + '">' + value.option15 + '</option><option value="option16' + value.id + '" id="option16' + value.id + '">' + value.option16 + '</option></select></div></div>';
                        $("#fqun1").append(qun1);
                        var qun11 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun1">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun1" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="option11' + value.id + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="option12' + value.id + '" id="option12' + value.id + '">' + value.option12 + '</option><option value="option13' + value.id + '" id="option13' + value.id + '">' + value.option13 + '</option><option value="option14' + value.id + '" id="option14' + value.id + '">' + value.option14 + '</option><option value="option15' + value.id + '" id="option15' + value.id + '">' + value.option15 + '</option><option value="option16' + value.id + '" id="option16' + value.id + '">' + value.option16 + '</option></select></div></div>';
                        $("#dis_fqun1").append(qun11);
                    } else if (qunid == "3317a312-cacf-4485-8875-a93edfd917d4") {
                        var qun2 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun2">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun2"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="option11' + value.id + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="option12' + value.id + '" id="option12' + value.id + '">' + value.option12 + '</option></select></div></div>';
                        $("#fqun2").append(qun2);
                        var qun22 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun2">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun2" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="option11' + value.id + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="option12' + value.id + '" id="option12' + value.id + '">' + value.option12 + '</option></select></div></div>';
                        $("#dis_fqun2").append(qun22);
                    } else if (qunid == "20c73ce8-568b-4665-b867-5fb5661fba25") {
                        var qun3 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun3">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun3"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun3").append(qun3);
                        var qun33 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun3">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun3" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun3").append(qun33);
                    } else if (qunid == "74beb36c-1d36-4749-a2b8-f5eac22f0e91") {
                        var qun4 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun4">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun4"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun4").append(qun4);
                        var qun44 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun4">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun4" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun4").append(qun44);
                    } else if (qunid == "1e683249-d64a-4dbb-ae97-77944a6dd4ca") {
                        var qun5 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun5">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun5"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun5").append(qun5);
                        var qun55 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun5">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun5" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun5").append(qun55);
                    } else if (qunid == "7d72ccb5-9e15-40c1-9883-4b058137b8ae") {
                        var qun6 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun6">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun6"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun6").append(qun6);
                        var qun66 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun6">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun6" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun6").append(qun66);
                    } else if (qunid == "7d5916e8-bf50-49ff-84f7-6516e93f2b19") {
                        var qun7 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun7">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun7"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun7").append(qun7);
                        var qun77 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun7">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun7" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun7").append(qun77);
                    } else if (qunid == "d5035617-d5c1-429a-879f-9cac37db6670") {
                        var qun8 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun8">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun8"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun8").append(qun8);
                        var qun88 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun8">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun8" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun8").append(qun88);
                    } else if (qunid == "9509372c-83ed-4694-b36f-feeeae4e0e72") {
                        var qun9 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun9">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun9"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun9").append(qun9);
                        var qun99 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun9">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun9" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun9").append(qun99);
                    } else if (qunid == "3aab7981-e9da-4904-9862-ecbcced97c7f") {
                        var qun10 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun10">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun10"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#fqun10").append(qun10);
                        var qun100 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun10">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun10" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#dis_fqun10").append(qun100);
                    }
                    //var newrowContent = '<div class="row py-2"><div class="col-md-6"><label class="form-label" for="qun1"><li>' + value.question + '</li></label></div><div class="col-md-6"><select class="modal-select" id="'+value.id+'"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    //$("#useranalytics").append(newrowContent);
                });
            }
        });
    };
    getquestions2();


    //---------------------get recommendations based on user selection----------------------//
    $(document).on('click', '#recomedationsBtn', function () {
        getProductsBasedonSelection()
    });
    var selectedOption1 = "";
    var selectedOption2 = "";
    var selectedOption3 = "";
    var selectedOption4 = "";
    var selectedOption5 = "";
    var selectedOption6 = "";
    var selectedOption7 = "";
    var selectedOption8 = "";
    var selectedOption9 = "";
    var selectedOption10 = "";
    function getProductsBasedonSelection() {


        var genderBasedCat = "";
        if (Category_name == "Men") {
            genderBasedCat = "Men";
        } else if (Category_name == "Women") {
            genderBasedCat = "Women";
        }
         
        $.ajax({

            url: "https://api.americanfragrances.com/ProductAnalytics/GetRecommendedProducts?selectedOption1=" + selectedOption1 + "&selectedOption2=" + selectedOption2 + "&selectedOption3=" + selectedOption3 + "&selectedOption4=" + selectedOption4 + "&selectedOption5=" + selectedOption5 + "&selectedOption6=" + selectedOption6 + "&selectedOption7=" + selectedOption7 + "&selectedOption8=" + selectedOption8 + "&selectedOption9=" + selectedOption9 + "&selectedOption10=" + selectedOption10 + "&gender=" + genderBasedCat + "&customerId=" + usersession +"&take=" + take + "& skip=" + skip,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                 
                selectpickerdata = data.MatchedProducts;
                $("#productsdv").empty();
                $(".dv_title").empty();
                $(".cat_title_breadcrumb").empty();
                $(".cat_title_breadcrumb").append("Fragrances");
                $(".dv_title").append("Multi-Analytics");
                $("#analyticsheading").empty();
                //  $("#analyticsheading").append("Amerifrag Recommendations as per your profile using our AI and Analytics");
                $("#analyticsheading").append(" Fragrances by Multi-Analytics ");

                if (data.MatchedProducts.length == 0 || data.MatchedProducts == null) {
                    var newrowContent = '<center><img src="Images/empty_order.png" /><h6><b>" Currently, No Products are Available… "</b></h6></center>'
                    $("#productsdv").empty();
                    $("#noproductsdv").append(newrowContent);
                }
                else {

                    $.each(data.MatchedProducts, function (Index, value) {


                        var product_id = value.id;
                        var salePrice = parseFloat(value.price).toFixed(2);
                        var originalPrice = parseFloat(value.rate).toFixed(2);
                        var categoryname = value.categoryname;
                        //i = i + 1;
                        //if (i < 50) 
                        var productCount = data.MatchedProducts.length;
                        var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                        if (data.MatchedProducts.length < 50) {
                            count += 1;
                            if (count == 1) {
                                $("#analyticsheading").empty();
                                //  $("#analyticsheading").append("Amerifrag Recommendations as per your profile using our AI and Analytics");
                                $("#analyticsheading").append(" Fragrances by Multi-Analytics ");
                            }
                            var newrowContent = '<div class="col-md-4 col-sm-6" style=";"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + product_id + '"></p><div class="barcode progress" id="barcode' + value.id + '" ></div>' +
                                '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
                                '<div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>'
                            $("#productsdv").append(newrowContent);

                            // Make AJAX call to fetch chart data
                            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {
                                var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                $("#barcode" + product_id).append(newrow);
                                $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
                               
                            }
                            //rating or reviews
                            var $starsContainer = $(".product_box.position-relative").find('.stars' + product_id); // Find the .stars element within the new review
                            $starsContainer.empty();
                            if (value.rating >= 4.6 && value.rating <= 5) {
                                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                            } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                            } else if (value.rating >= 3.6 && value.rating <= 4) {
                                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                            } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                            } else if (value.rating >= 2.6 && value.rating <= 3) {
                                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                            } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                            } else if (value.rating >= 1.6 && value.rating <= 2) {
                                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                            } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                            } else if (value.rating >= 0.6 && value.rating <= 1) {
                                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                            } else if (value.rating >= 0 && value.rating <= 0.5) {
                                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                            } else {
                                $starsContainer.append('<span>0</span>'); // Clear the stars container if the rating doesn't match any range
                            }

                        }
                        //OptionBasedProducs = OptionBasedProducs.concat(MatchedProducts.map(function (product) {
                        //    return product.id;
                        //}));

                        /*  $(".dv_title").empty();*/
                        /*$("#analyticsheading").append("Amerifrag Recommendations as per your profile using our AI and Analytics");*/


                    });

                }
                //$(".selectpicker").change(function () {
                //    var sort = $(".selectpicker").val();
                //    if (sort) {
                //        fetchSortProducts(selectpickerdata, sort);
                //    }
                //});
            },
            failure: function (failureresp) {
                alert(failureresp);
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "Home.html";
                    return;
                }
            }

        });
        
    }



    getbrandslist();
    getquestions();
    //--------------------------profile in recommendations page---------------------------//


    /* profileDescriptions();*/
    function profileDescriptions() {
        $.ajax({

            url: "https://api.americanfragrances.com/Customer/MyProfileDescription?customerid=" + Authkey + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {

                desc1 = data.desc1;
                desc2 = data.desc2;
                desc3 = data.desc3;
                desc4 = data.desc4;
                desc5 = data.desc5;
                desc6 = data.desc6;
                desc7 = data.desc7;
                desc8 = data.desc8;
                desc9 = data.desc9;
                desc10 = data.desc10;
            },
            error: function (xhr) {
            }
        });
    }

    /*customerProfile();*/
    function customerProfile() {
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
            async:false,
            crossDomain: true,
            success: function (data) {

                var firstname = data.firstname;
                var lastname = data.lastname;
                var name = data.email;
                var Email = data.email;
                var gender = data.gender;
                var pswd = data.password;
                var Phone = data.Phone;
                var qun1 = data.qun1;
                var qun2 = data.qun2;
                var qun3 = data.qun3;
                var qun4 = data.qun4;
                var qun5 = data.qun5;
                var qun6 = data.qun6;
                var qun7 = data.qun7;
                var qun8 = data.qun8;
                var qun9 = data.qun9;
                var qun10 = data.qun10;
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
                var qun1Value = data.qun1;
                qun1Value = qun1Value.split(' ')[0].slice(0, 4);
                var datef = +dd + "/" + mm + "/" + yyyy;
                var datefs = "";
                var newrow =
                    '<div class="py-3" style="background: #fcfcfc;border:15px solid #70b4bd;"><div class="row align-items-center" > <h3 class="hero_title latestHeadings mb-4" style="text-transform:capitalize !important;">explore a fragrance collection uniquely tailored to your personality</h3>' +
                    '<div class="col-md-4 p-3 text-center"><div class="howitworkTooltip "><img src="Images/home/standardMember.png" class="howItworkEye" style="width:50%;" /><span class="howtooltiptext " style="width:250px;left:0px;top:10%">Welcome to<strong> Amerifrag’s Aroma World!</strong> As a valued member of our global network, you’ll enjoy exclusive offers and discounts throughout the year.We invite you to explore your personalized scent selection and share your valuable feedback to help us continuously enhance our services for you. </span><p style="font-weight:bold !important" class="" id="usertakeSub">Standard Member</p></div></div><div class="col-md-4"><img src="' +
                    data.image +
                    '" class="centerimg" width="150" height="150" style="border-radius:80px"><h5 class="mt-2 text-center">' +
                    data.firstname +
                    '</h5>' +
                    //'<p class="text-center m-0">' +
                    //data.profession +
                    // '</p><p class="text-center m-0">' +
                    //data.location +
                    //'</p>'+
                    '</div > ' +
                    '<div class="col-md-4 p-3 text-center"><div class="howitworkTooltip "><img src="Images/home/Giftcode.png" class="howItworkEye" style="width:60%; " /><span class="howtooltiptext"  style="width:250px;left:0px;top:10%; ">Your profile and unique tastes make you a distinctive member of our AmeriFrag community. To celebrate your individuality, we are offering you an exclusive <span style="color:#E8271B">5 % discount</span> on all your purchases, anytime. Just enter your First Name at checkout to unlock this special offer just for YOU.</span></div></div>' +

                    '<div class="padding80 pb-0 pt-2"><h4 class="text-center mb-2"><b class="normal-heading">Your Personal Amerifrag Barcode<span class="d-none"><a type="button " class="btn DisclaimerBtn"  data-bs-toggle="modal" data-bs-target="#disclaimer">Disclaimer</a></span> </b></h4>' +
                    '<div class="progress paddingx80 userprogressbar" style="background: transparent; height:50px !important;"><div class="progress-bar bg-ten" role="progressbar" style="width:10%">' + qun1Value + ' <div class="amerifragtooltip">Personality</div></div>' +
                    '<div class="progress-bar bg-fourty" role="progressbar" style="width:10%"> ' + data.qun2 + ' <div class="amerifragtooltip">Zodiac</div></div>' +
                    '<div class="progress-bar bg-thirty" role="progressbar" style="width:10%">' + data.qun3 + ' <div class="amerifragtooltip">Strength</div></div>' +
                    '<div class="progress-bar bg-fifty" role="progressbar" style="width:10%"> ' + data.qun4 + '<div class="amerifragtooltip">Passion</div></div>' +
                    '<div class="progress-bar bg-twenty" role="progressbar" style="width:10%">' + data.qun5 + ' <div class="amerifragtooltip">Entertainment</div></div>' +
                    '<div class="progress-bar bg-ninety" role="progressbar" style="width:10%"> ' + data.qun6 + '<div class="amerifragtooltip">Style</div></div>' +
                    '<div class="progress-bar bg-sixty" role="progressbar" style="width:10%">' + data.qun7 + ' <div class="amerifragtooltip">Color</div></div>' +
                    '<div class="progress-bar bg-seventy" role="progressbar" style="width:10%">' + data.qun8 + ' <div class="amerifragtooltip">Scent Note</div></div>' +
                    '<div class="progress-bar bg-eighty" role="progressbar" style="width:10%"> ' + data.qun9 + '<div class="amerifragtooltip">Mood</div></div>' +
                    '<div class="progress-bar bg-hundered" role="progressbar" style="width:10%">' + data.qun10 + ' <div class="amerifragtooltip">Season</div></div>' +
                    '</div>' +
                    '<div class="profileBelowDetails"><p class="px-3" style="text-align:justify"><span style="font-weight:700">' + firstname + ' : </span><span>' +
                    desc1 + " " + desc2 + " " + desc3 + " " + desc4 + " " + desc5 + " " + desc6 + " " + desc7 + " " + desc8 + " " + desc9 + " " + desc10 + " " +
                    '</span></p>' +
                    //'< div class="row  " ><div class="col-md-9 px-5 d-flex flex-column justify-content-center"><p class="headings-below-bold-text" style="margin-bottom:0px;">Immerse yourself into a world where every scent tells your story...</p></div><div class="col-md-3"><a type="button" class="btn amerifrgbutton" data-bs-toggle="modal" data-bs-target="#analyizepopup">Here’s What’s Waiting For You…</a></div></div >'+
                    '</div > ' +
                    /*'<div class="text-center pt-2 pb-2 "><a type="button" style="" class="btn amerifrgbutton" href=/SubscriptionHome.html>Enter Amerifrag’s SUBSCRIPTION CLUB</a></div>' +*/
                    '</div ></div > ';

                $(".after-login").append(newrow);




            }
        });
    }








    //-------------------------------------------end-----------------------------------------//
    //Brands search
    $("#brandlist").hide();
    $("#brandSearch").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();
        if (searchText == "") {
            $("#brandlist").hide();
        } else {
            $(".brandItem").each(function () {

                var brandName = $(this).find("label").text().toLowerCase();

                $("#brandlist").show();
                if (brandName.indexOf(searchText) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                    if (searchText == "") {
                        $("#brandlist").hide();
                    }
                }
            });
        }

    });

    function getbrandslist() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/Brandlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var newrowContent = `
                        <p class="brandItem" style="display:flex;">
                            <input type="checkbox" name="brands" class="brand-checkbox" 
                                   id="brand_${value.name}" value="${value.name}">
                            <label for="brand_${value.name}">${value.name}</label>
                        </p>`;

                    $("#brandlist").append(newrowContent);

                    //var brandlist = `
                    //    <div class="col-md-3 p-4">
                    //        <div class="brand">
                    //          <a href="show-all.html?brand=${value.name}">
                    //            <img src="${value.image}" data-brand="${value.name}" 
                    //                 style="width:100%;height:100px;border:1px solid #ddd;">
                    //                 </a>
                    //        </div>
                    //    </div>`;

                    //$("#brandslist").append(brandlist);

                    // Show initial items
                    var itemsToShow = 10;
                    function updateList() {
                        $("#brandlist p").hide();
                        $("#brandlist p:lt(" + itemsToShow + ")").show();
                    }

                    updateList();

                    $("#showMore").click(function () {
                        itemsToShow += 10;
                        updateList();
                        if (itemsToShow >= data.length) {
                            $("#showMore").hide();
                        }
                    });
                });
            }
        });
    }



    function getsubcatlist() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id + "&categoryname=" + Category_name,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {

                    var newrowContent = '<a class="sidebar-list"><input type="checkbox" name="chksub" class="css-checkbox sublist" id="' + value.id + '" value="' + value.id + '"> <label><span class="color">' + value.name + '</span> <span class="colorresult"></span></label></a>';
                    $("#sublist").append(newrowContent);
                    if (data.length < 10) {
                        $("#showMoreSub").hide();
                    }
                    var itemsToShow = 10;
                    // Function to update the list based on the current itemsToShow
                    function updateList() {
                        $("#sublist a").hide(); // Hide all items
                        $("#sublist a:lt(" + itemsToShow + ")").show(); // Show first 'itemsToShow' items
                    }
                    // Initial update
                    updateList();
                    // Show more button click event
                    $("#showMoreSub").click(function () {
                        itemsToShow += 10; // Increase the number of items to show
                        updateList(); // Update the list
                        if (itemsToShow >= data.length) {
                            // Hide the button when all items are shown
                            $("#showMoreSub").hide();
                        }
                    });
                });
            }
        });
        //other option fot sub catgory
        var othersub = "<a href='show-all.html?cat=" + Category_name + "'>Other</a>";
        $("#other").append(othersub);
    };

    var count = 0;
    var loadstopper = 0;
    //loadmore click
    var getRecProSkip = 0;






    function getRecommendationsBestSeller() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Product/BestSeller?customerId=" + usersession,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {




                $("#productsdv").empty();
                i = 0;
                $.each(data.Data, function (index, value) {
                    i = i + 1;
                    if (index < 50) {
                        // Display up to 8 products if data.length >= 8
                        // Display up to 4 products if data.length < 8
                        // Modify the logic here to render the product
                        if (data.length >= 8 || index < 8) {
                            var product_id = value.id;
                            var salePrice = parseFloat(value.price).toFixed(2);
                            var originalPrice = parseFloat(value.rate).toFixed(2);
                            var categoryname = value.categoryname;
                            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                            var newrowContent = '<div class="col-md-6 col-lg-4 "><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeREC' + value.id + '"></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.BrandName + '"><b><u>' + value.BrandName + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg" src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + "</span>)</span></div></div></div></div>";

                            $("#productsdv").append(newrowContent);

                            // Make AJAX call to fetch chart data
                            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                                var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                $("#bestbarcodeREC" + product_id).append(newrow);
                                $("#cat_useranly_rec" + product_id).text("AmeriFrag Barcode");


                            } else {
                                $("#bestbarcodeREC" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                            }

                            
                            //rating or reviews
                            var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
                            $starsContainer.empty();

                            if (value.rating >= 4.6 && value.rating >= 5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/5star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/4.5star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 3.6 && value.rating <= 4) {
                                $starsContainer.append(
                                    '<img src="/images/stars/4star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/3.5star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 2.6 && value.rating <= 3) {
                                $starsContainer.append(
                                    '<img src="/images/stars/3star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/2.5star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 1.6 && value.rating <= 2) {
                                $starsContainer.append(
                                    '<img src="/images/stars/2star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/1.5star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 0.6 && value.rating <= 1) {
                                $starsContainer.append(
                                    '<img src="/images/stars/1star.png" class="img-fluid">'
                                );
                            } else if (value.rating >= 0 && value.rating <= 0.5) {
                                $starsContainer.append(
                                    '<img src="/images/stars/0.5star.png" class="img-fluid">'
                                );
                            } else {
                                $starsContainer.append("<span>No reviews</span>"); // Clear the stars container if the rating doesn't match any range
                            }
                        }
                    }
                });
            },
        });
        //cart
    }


    //-------------------------------------------------------------------------------------------------//


    function getanalytics() {
        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                var firstname = data.firstname;
                var lastname = data.lastname;
                var name = data.email;
                var Email = data.email;
                var gender = data.gender;
                var pswd = data.password;
                var Phone = data.Phone;
                var qun1 = data.qun1;
                var qun2 = data.qun2;
                var qun3 = data.qun3;
                var qun4 = data.qun4;
                var qun5 = data.qun5;
                var qun6 = data.qun6;
                var qun7 = data.qun7;
                var qun8 = data.qun8;
                var qun9 = data.qun9;
                var qun10 = data.qun10;


                var dataString = { "project_id": Project_Id, "firstname": firstname, "lastname": lastname, "name": name, "email": Email, "gender": gender, "password": pswd, "phone": Phone, "qun1": qun1, "qun2": qun2, "qun3": qun3, "qun4": qun4, "qun5": qun5, "qun6": qun6, "qun7": qun7, "qun8": qun8, "qun9": qun9, "qun10": qun10 };

                $.ajax({
                    url: "https://api.americanfragrances.com/ProductAnalytics/GetProductsFromSimilarCustomers?take=" + take + "&skip=" + skip + "&customerId=" + usersession,
                    type: "GET",
                    data: dataString,
                    dataType: "JSON",
                    crossDomain: true,
                    success: function (data) {
                        selectpickerdata = data.OrderedProducts;
                        $("#analyticsheading").empty();
                        //  $("#analyticsheading").append("Amerifrag Recommendations as per your profile using our AI and Analytics");
                        $("#analyticsheading").append("Amerifrag’s AI Recommendations");


                        $(".dv_title").append("AI Recommendations");

                        if (data.OrderedProducts.length == 0 || data.OrderedProducts == null) {
                            getRecommendationsBestSeller();
                            //var newrowContent = '<center><img src="Images/empty_order.png" /><h6><b>" Currently, No Products are Available… "</b></h6></center>'
                            //$("#productsdv").append(newrowContent);

                        }
                        else {
                            $.each(data.OrderedProducts, function (Index, value) {
                                if (data.OrderedProducts.length < 50) {
                                    var product_id = value.id;
                                    var salePrice = parseFloat(value.price).toFixed(2);
                                    var originalPrice = parseFloat(value.rate).toFixed(2);
                                    var categoryname = value.categoryname;
                                    var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

                                    var newrowContent = '<div class="col-md-6 col-lg-4 "><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeREC' + value.id + '"></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.BrandName + '"><b><u>' + value.BrandName + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg" src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + "</span>)</span></div></div></div></div>";


                                    // Make AJAX call to fetch chart data
                                    if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                                        var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                        $("#bestbarcodeREC" + product_id).append(newrow);
                                        $("#cat_useranly_rec" + product_id).text("AmeriFrag Barcode");
                                    }
                                    else {
                                        $("#bestbarcodeREC" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                    }
                                    $("#productsdv").append(newrowContent);
                                    //rating or reviews
                                    var $starsContainer = $(".product_box.position-relative").find(".stars" + product_id); // Find the .stars element within the new review
                                    $starsContainer.empty();

                                    if (value.rating >= 4.6 && value.rating >= 5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/5star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/4.5star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 3.6 && value.rating <= 4) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/4star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/3.5star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 2.6 && value.rating <= 3) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/3star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/2.5star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 1.6 && value.rating <= 2) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/2star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/1.5star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 0.6 && value.rating <= 1) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/1star.png" class="img-fluid">'
                                        );
                                    } else if (value.rating >= 0 && value.rating <= 0.5) {
                                        $starsContainer.append(
                                            '<img src="/images/stars/0.5star.png" class="img-fluid">'
                                        );
                                    } else {
                                        $starsContainer.append("<span>No reviews</span>"); // Clear the stars container if the rating doesn't match any range
                                    }
                                }

                            });



                        }
                        //$(".selectpicker").change(function () {
                        //    var sort = $(".selectpicker").val();
                        //    if (sort) {
                        //        fetchSortProducts(selectpickerdata, sort);
                        //    }
                        //});
                    },
                    failure: function (failureresp) {
                        alert(failureresp);
                    },
                    error: function (xhr) {
                        if (xhr.status === 401) {
                            window.location.href = "Home.html";
                            return;
                        }
                    }
                });
                //cart
            }

        });
    };
    $.ajax({
        url:
            "https://api.americanfragrances.com/Home/TestimonialList?project_id=" +
            Project_Id +
            "&authorid=" +
            ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {

            $.each(data, function (Index, value) {
                var newrowContent =
                    '<div class="item"><div class="card testim_box"><img src="images/home/testim/quote.png" class="quote"><p class="testimonialcontent">' +
                    value.Content +
                    '</p><div class="d-flex flex-row justify-content-end"><img src="images/home/testim/quote.png" class="quoteImg quote"></div><div class="card-footer"><div class="row"><div class="col-4 p-0"><img src="' +
                    value.Image +
                    '" class="img-fluid"></div><div class="col-8"><p class="user_name">' +
                    value.Name +
                    '</p><p class="user_designation">' +
                    value.Designation +
                    '</p></div></div></div></div></div>';

                $("#testimonial-carousel").append(newrowContent);
            });
        },
    });
    $("#testimonial-carousel").owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            767: {
                items: 2,
                nav: false,
            },
            1000: {
                items: 3,
                nav: true,
                loop: true,
            },
        },
    });

    var skip = 0;
    function getproducts(style, note, mood, season, occasion, ageGroup, smellIntensity, longevity, sprayTime, presentation, brands, minPrice, maxPrice, minDiscount, maxDiscount, skip) {
        if (skip == undefined) {
            skip = 0;
        }
         
        let baseUrl = "https://api.americanfragrances.com/Home/FilterProducts";
        let filterObject = {
            customerId: Authkey || null,
            Take: take,
            skip: skip,
            category: Category_name,
            brands: brand_name || brands,
            subcategory: Sub_Category ? Sub_Category.toUpperCase() : undefined,
            priceMin: minPrice,
            priceMax: maxPrice,
            discountMin: minDiscount,
            discountMax: maxDiscount,
            style: style,
            note: note,
            mood: mood,
            season: season,
            occasion: occasion,
            ageGroup: ageGroup,
            smellIntensity: smellIntensity,
            longevity: longevity,
            sprayTime: sprayTime,
            presentation: presentation
        };

        // Clean object
        Object.keys(filterObject).forEach(key => {
            if (filterObject[key] === undefined || filterObject[key] === null) {
                delete filterObject[key];
            }
        });
        // Construct final URL
        if (Category_name != null && Sub_Category == null && TesterGender == null) {

            //url = "https://api.americanfragrances.com/Home/PaginationProvided?project_id=" + Project_Id + "&take=" + take + "&skip=" + skip + "&categoryname=" + Category_name + "&customerId=" + Authkey;
            url = baseUrl;
            ajaxData = filterObject;
        }
        else if (Sub_Category != null) {
            if (Sub_Category == "Clearance") {
                filterObject = {
                    customerId: Authkey || null,
                    Take: take,
                    skip: skip,
                    category: Category_name,
                    IsClearence: true
                };
            }
            url = baseUrl;
            ajaxData = filterObject;
        } else if (brand_name != null) {
            url = baseUrl;
            ajaxData = filterObject;
        } else if (type != null) {
            url = baseUrl;
            ajaxData = filterObject;
        } else if (appliedFilter == false) {
            if (Category_name != null && TesterGender != null) {
                url = "https://api.americanfragrances.com/Home/TesterGenderSpecified?gender=" + TesterGender + "&take=" + take + "&skip=" + skip + "&customerId=" + Authkey;
                ajaxData = null;
            } else if (keyword != null) {
                 
                if (keyword == 'luxury' || keyword == 'timeless' || keyword == 'celebrity' || keyword == 'Clearance') {
                    url = "https://api.americanfragrances.com/Home/ProductsByLTC?keyword=" + keyword + "&take=" + take + "&skip=" + skip + "&customerId=" + Authkey;
                    ajaxData = null;
                } else {
                    //url = "https://api.americanfragrances.com/Product/ProductsByKeyword?keyword=" + keyword + "&take=" + take + "&skip=" + skip;
                    url = "https://api.americanfragrances.com/Product/ProductsByKeyword?keyword=" + keyword + "&take=" + take + "&skip=" + skip + "&customerId=" + Authkey;
                    ajaxData = null;
                }
            } else if (choice == "featureProducts") {
                url = "https://api.americanfragrances.com/Home/FeatureProductsAmerifragChoice?customerId=" + Authkey + "&take=" + take + "&skip=" + skip;
                ajaxData = null;
            } else if (label != null) {
                 
                url = "https://api.americanfragrances.com/ProductAnalytics/GetMatchedProductDetails?project_id=" + Project_Id + "&selectedOption=" + label + "&take=" + take + "&skip=" + skip + "&customerId=" + Authkey + "";
                ajaxData = null;
            } else {
                url = "https://api.americanfragrances.com/ProductAnalytics/AllProduct";
                ajaxData = null;
            };
        } else {
            url = baseUrl;
            ajaxData = filterObject;
        }
        debugger;
        $.ajax({
            url: url,
            type: "POST",
            data: ajaxData,
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $(".dv_title").empty();
                if (brand_name) {
                    var title = '<span>' + brand_name + '</span>';
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(title);
                } else if (label) {
                    var title = '<span><strong>' + labelHeading + ': </strong>' + label + '</span>';
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(title);
                } else if (Category_name != null && Sub_Category == null) {

                    var title = '<span>' + Category_name + ' Fragrances </span>';
                    if (choice) {
                        title = '<span>' + Category_name + ' Fragrances: Amerifrag choice </span>';
                    }
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(title);
                } else if (Sub_Category != null) {
                    if (Sub_Category == "HEALTH") {
                        Sub_Category = "Health & Wellness"
                    } else if (Sub_Category == "BATH ") {
                        Sub_Category = "Bath & Body";
                    }
                    Sub_Category = Sub_Category.toLowerCase();
                    var title2 = '<span>' + Sub_Category + '</span>';
                    $(".dv_title").append(title2)
                    if (Category_name != null) {

                        title2 = '<span>' + Category_name + ': ' + Sub_Category + '</span>';
                    }
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(title2);

                } else if (type != null) {
                    if (type == "Health") {
                        type = "Health & Wellness"
                    } else if (type == "Bath ") {
                        type = "Bath & Body";
                    }
                    var title = '<span>' + type + '</span>';
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(type);

                } else if (keyword != null) {
                    if (keyword == "toptrending") {
                        keyword = "Top Trending";
                    } else if (keyword == "bestdeals") {
                        keyword = "Best Deals";
                    } else if (keyword == "bestsellers") {
                        keyword = "Best Seller Fragrances";
                    } else if (keyword == "toprated") {
                        keyword = "Top Rated Fragrances";
                    } else if (keyword == "newarrivals") {
                        keyword = "New Arrival Fragrances";
                    } else if (keyword == "clearence") {
                        keyword = "Clearence";
                    } else if (keyword == "amerifragchoice") {
                        keyword = "AmeriFrag Choice";
                    } else if (keyword == "toptrending") {
                        keyword = "Top Trending";
                    } else if (keyword == "luxury") {
                        keyword = "Luxury Collection";
                    } else if (keyword == "timeless") {
                        keyword = "Timeless Collection";
                    } else if (keyword == "celebrity") {
                        keyword = "Celebrity Collection";
                    }
                    var title = '<span>' + keyword + '</span>';
                    $("#analyticsheading").empty();
                    $("#analyticsheading").append(keyword);

                } else {
                    var title = '<span>Products</span>';
                }
                console.log($('#productsdv .product_box position-relative'));
                $(".dv_title").append(title);
                //creating a variable for handling different response
                // collectedData = data.SortedAndFilteredProducts || data.MatchedProducts || data.Data
                if (data) {
                     
                    if (data.length == 0 || data.responseCode == 0 || data == 'fetched') {
                        selectpickerdata = [];
                        appendingNoProducts()
                    }
                    else if (data.SortedAndFilteredProducts) {
                        if (data.SortedAndFilteredProducts.length == 0) {
                            selectpickerdata = [];
                            appendingNoProducts()
                        }
                        else {
                            appendingResultdata(data)
                        }

                    }
                    else if (data.MatchedProducts) {
                        if (data.MatchedProducts.length == 0) {
                            selectpickerdata = [];
                            appendingNoProducts(data)
                        }
                        else {
                            appendingResultdata(data)
                        }
                    }
                    else if (data.Data) {
                        if (data.Data.length == 0) {
                            selectpickerdata = [];
                            appendingNoProducts()
                        }
                        else {
                            appendingResultdata(data)
                        }
                    }
                    else if (data.SortedProducts) {
                         
                        if (data.SortedProducts.length == 0) {
                            selectpickerdata = [];
                            appendingNoProducts()
                        }
                        else {
                             
                            appendingResultdata(data)
                        }
                    } else if (data.Products) {
                         
                        if (data.Products.length == 0) {
                            selectpickerdata = [];
                            appendingNoProducts()
                        }
                        else {
                            appendingResultdata(data)
                        }
                    }
                    else {
                        appendingNoProducts()
                    }
                }


                function appendingNoProducts() {
                    console.log('#productsdv');
                    /* if ($('#productsdv').is(':empty'))*/
                    if ($('#productsdv .product_box position-relative').length == 0) {

                        // The div with ID "myDiv" is empty
                        $("#noproductsdv").empty();
                        $("#productsdv").empty();
                       
                        var newrowContent = '<center><img src="Images/empty_order.png" /><h6><b>" Currently, No Products are Available… "</b></h6></center>'
                        $("#noproductsdv").append(newrowContent);
                    }
                    // if ($("#productsdv".empty() ==true) {

                    // }
                }

                function appendingResultdata(data) {
                    var data = data;
                     
                    $("#noproductsdv").empty();

                    try {
                        i = 0;
                        // Filter out products that have already been displayed

                        if (appliedFilter == false) {
                            if (label) {
                                 
                                var newProducts = data.MatchedProducts
                                // var newProducts = data.MatchedProducts.filter(function (product) {
                                //    return !displayedProducts.includes(product.id);
                                // });

                            } else if (type) {
                                var newProducts = data.Data
                                // var newProducts = data.Data.filter(function (product) {
                                //    return !displayedProducts.includes(product.id);
                                // });
                            } else if (keyword || choice) {
                                 
                                var newProducts = data.SortedProducts;
                                // var newProducts = data.SortedProducts.filter(function (product) {
                                //    return !displayedProducts.includes(product.id);
                                // });
                            } else if (data.Data) {
                                var newProducts = data.Data;
                            } else {
                                var newProducts = data.Products;
                            }
                        } else {
                            var newProducts = data.Products;
                        }
                            $(".Product_select_quantity").empty();
                        // $("#productsdv").empty();

                        if (newProducts.length !== 0) {
                            selectpickerdata = newProducts;
                        };
                        if ($('#productsdv').is(':empty')) {
                            selectpickerdata = newProducts;
                        }
                        $('#productsdv').empty()

                        $.each(newProducts, function (Index, value) {



                            var product_id = value.id;
                            var salePrice = parseFloat(value.price).toFixed(2);
                            var originalPrice = parseFloat(value.rate).toFixed(2);
                            var categoryname = value.categoryname;
                            var brandname = "";
                            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';
  

                            if (brand_name) {
                                brandname = brand_name;
                            }
                            else {
                                brandname = value.brandname || value.BrandName;
                            }
                            i = i + 1;
                            if (i < 50) {

                                var newrowContent = '<div class="col-md-6 col-lg-4   col-sm-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '" ></p><div class="barcode progress" id="barcode' + value.id + '" ></div> <p class="product_name" > ' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + ' <span class="cat_icon" > ' + (categoryname === "Women" ? ' <i class="fa-solid fa-person-dress" ></i> ' : categoryname === "Men" ? ' <i class="fa-solid fa-person" ></i> ' : ' <i class="fa-solid fa-person" ></i> <i class="fa-solid fa-person-dress"></i>') + '</span></p> <p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + brandname + '"><b><u>' + brandname + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>'


                                $("#productsdv").append(newrowContent);
                                // Make AJAX call to fetch chart data
                                if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {
                                    var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                                    $("#barcode" + product_id).append(newrow);
                                    $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
                                } else {
                                    $("#barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

                                }
                                //rating or reviews
                                var $starsContainer = $(".product_box.position-relative").find('.stars' + product_id); // Find the .stars element within the new review
                                $starsContainer.empty();

                                if (value.rating >= 4.6 && value.rating <= 5) {
                                    $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
                                } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                                    $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
                                } else if (value.rating >= 3.6 && value.rating <= 4) {
                                    $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
                                } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                                    $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
                                } else if (value.rating >= 2.6 && value.rating <= 3) {
                                    $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
                                } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                                    $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
                                } else if (value.rating >= 1.6 && value.rating <= 2) {
                                    $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
                                } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                                    $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
                                } else if (value.rating >= 0.6 && value.rating <= 1) {
                                    $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
                                } else if (value.rating >= 0 && value.rating <= 0.5) {
                                    $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
                                } else {
                                    $starsContainer.append('<span>No reviews</span>'); // Clear the stars container if the rating doesn't match any range
                                }
                            }

                        });
                        // Add the new product IDs to the displayedProducts array
                        // displayedProducts = displayedProducts.concat(newProducts.map(function (product) {
                        //     return product.id;
                        // }));


                        // Increase the 'skip' value for the next request
                        skip += take;
                    } catch (error) {
                        console.error("Error processing data:", error);
                    }
                }





                //$(".selectpicker").change(function () {                   
                //    var sort = $(".selectpicker").val();
                //    if (sort) {
                //        fetchSortProducts(selectpickerdata, sort);                       
                //    }
                //});

            },
            error: function (error) {
                // Handle any errors
                console.log(error);
            }
        });


    };


    function isBottomOfPage() {
        console.log("Checking if bottom of page is reached.");
        return ($(window).scrollTop() + $(window).height() >= $(document).height());
    }

    function handleScroll() {
        if (getname == 'products') {


        } else if (rangeSliderProducts = 'rangeProducts') {

        }
        else {
            getproducts();
        }
    }


    $(window).scroll(handleScroll);


    function someOtherFunction() {
        handleScroll();

    }

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
                    const analyticsMapping = {
                        'fa0d00d2-7e21-49d9-ab52-dc9e7bc08339': { div: '#q1', type: 'STYLE' },
                        '27059952-4128-4b44-be81-ea158ed8eb92': { div: '#q2', type: 'NOTE' },
                        'c8f8dc67-b98b-436c-b74b-b21399bebc5c': { div: '#q3', type: 'MOOD' },
                        'cb6924f2-a52e-43f8-8c0b-492234c4345e': { div: '#q4', type: 'SEASON' },
                        'd84ee43f-6f45-4025-8755-fa04ea76667d': { div: '#q5', type: 'OCCASION' },
                        '214c962f-7ee6-4158-bc0b-a4c8059a6cc2': { div: '#q6', type: 'AGE GROUP' },
                        '80e157a3-7798-4bd7-90a8-7b0e0a2b97e4': { div: '#q7', type: 'SMELL INTENSITY' },
                        'a6a5ce94-7d19-4bc7-b66a-72ec253a6cae': { div: '#q8', type: 'LONGEVITY' },
                        '6239cda0-e527-4e32-be3b-be94f9447067': { div: '#q9', type: 'SPRAY TIME' },
                        'e64bd14d-cfac-490c-b80a-fe7329029bf8': { div: '#q10', type: 'PRESENTATION' }
                    };

                    if (analyticsMapping[qunid]) {
                        const { div, type } = analyticsMapping[qunid];
                        let optionsHtml = '';

                        // Generate checkboxes for options 1-10
                        for (let i = 1; i <= 10; i++) {
                            const optionValue = value[`option${i}`];
                            if (optionValue) {
                                optionsHtml += `
                                    <li class="d-flex">
                                        <input type="checkbox" 
                                               name="analytics_${value.id}" 
                                               class="analytics-radio"
                                               question
                                               id="option${i}${value.id}"
                                               data-type="${type}"
                                               value="${optionValue}">
                                        <label for="option${i}${value.id}">${optionValue}</label>
                                    </li>`;
                            }
                        }

                        $(div).append(optionsHtml);
                    }
                });

            }
        });
    };

    $(document).on("change", "input[type='checkbox']", function () {
        let dataType = $(this).data("type"); // Get the data-type of the selected checkbox

        // Uncheck all checkboxes with the same data-type except the current one
        $("input[type='checkbox'][data-type='" + dataType + "']").not(this).prop("checked", false);
    });

    $(document).on("click", "#clearFilters", function () {
        window.location.reload();
    });









    //---------------------------------end shop by sale-------------------------------//

    function cart_count(cartid) {
        if (cartid) {

            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Cartcount?project_id=" + Project_Id + "&cart_id=" + cartid,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {

                    $(".cart_count").html(data);
                }
            });

        }

    }
    //-------------------------------- Sort by----------------------//
    function fetchSortProducts(data, sort) {
        selectpickerdata = data;
        if (getname == 'products') {
            switch (sort) {
                case 'latest':
                    // Sort by new arrivals (use appropriate property from data)

                    data.sort(function (a, b) {
                        var date1 = a.createdon;
                        var date2 = b.createdon;

                        var millisecondValue1 = parseInt(date1.match(/\d+/)[0], 10);
                        var millisecondValue2 = parseInt(date2.match(/\d+/)[0], 10);
                        return millisecondValue2 - millisecondValue1;
                        // Implement your comparison logic here based on the property representing the arrival date
                        // Example: return a.arrivalDate - b.arrivalDate;
                    });



                    break;
                case 'popular':
                    // Sort by user reviews (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing user reviews
                        // Example: return b.userReviews - a.userReviews;
                        return b.rating - a.rating;
                    });

                    break;
                case 'lowtohigh':
                    // Sort by price low to high (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing the price
                        return a.price - b.price;
                    });

                    break;
                case 'hightolow':
                    // Sort by price high to low (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing the price
                        return b.price - a.price;
                    });
                    break;
                default:
                    // No sorting or unknown sort option
                    break;
            }
        } else {
            selectpickerdata = data;
            switch (sort) {
                case 'latest':
                    // Sort by new arrivals (use appropriate property from data)

                    data.sort(function (a, b) {
                        var date1 = a.createdon;
                        var date2 = b.createdon;

                        var millisecondValue1 = parseInt(date1.match(/\d+/)[0], 10);
                        var millisecondValue2 = parseInt(date2.match(/\d+/)[0], 10);
                        return millisecondValue2 - millisecondValue1;
                        // Implement your comparison logic here based on the property representing the arrival date
                        // Example: return a.arrivalDate - b.arrivalDate;
                    });



                    break;
                case 'popular':
                    // Sort by user reviews (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing user reviews
                        // Example: return b.userReviews - a.userReviews;
                        return b.rating - a.rating;
                    });

                    break;
                case 'lowtohigh':
                    // Sort by price low to high (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing the price
                        return a.price - b.price;
                    });

                    break;
                case 'hightolow':
                    // Sort by price high to low (use appropriate property from data)
                    data.sort(function (a, b) {
                        // Implement your comparison logic here based on the property representing the price
                        return b.price - a.price;
                    });
                    break;
                default:
                    // No sorting or unknown sort option
                    break;
            }
        }


        // After sorting, you can re-render the products on the page

        renderProducts(data);
    }

    // Function to update the product list with existing products
    function renderProducts(data) {





        var productList = $("#productsdv");
        productList.empty();

        for (const value of data) {
            var product_id = value.id;

            var salePrice = parseFloat(value.price).toFixed(2);
            var originalPrice = parseFloat(value.rate).toFixed(2);
            var categoryname = value.categoryname;
            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to Queue</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


            if (value.brandname != undefined) {
                productList.append('<div class="col-md-6 col-lg-4  col-sm-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '"></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.brandname + '"><b><u>' + value.brandname + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>');
            } else {
                productList.append('<div class="col-md-6 col-lg-4  col-sm-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="#"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn viewDetails" data="' + value.id + '"  type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '"></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.BrandName + '"><b><u>' + value.BrandName + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>');
            }

            if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

                var newrow = `
                <div class="progress-bar bg-ten" role="progressbar" style="width:${value.BarcodeAnalytics.Data[0]}%">
                    ${value.BarcodeAnalytics.Data[0]}% <div class='amerifragtooltip'>Style: ${value.BarcodeAnalytics.Labels[0]}</div>
                </div>
                <div class="progress-bar bg-fourty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[1]}%">
                    ${value.BarcodeAnalytics.Data[1]}%<div class='amerifragtooltip'>Note: ${value.BarcodeAnalytics.Labels[1]}</div>
                </div>
                <div class="progress-bar bg-thirty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[2]}%">
                    ${value.BarcodeAnalytics.Data[2]}%<div class='amerifragtooltip'>Mood: ${value.BarcodeAnalytics.Labels[2]}</div>
                </div>
                <div class="progress-bar bg-fifty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[3]}%">
                    ${value.BarcodeAnalytics.Data[3]}%<div class='amerifragtooltip'>Season: ${value.BarcodeAnalytics.Labels[3]}</div>
                </div>
                <div class="progress-bar bg-twenty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[4]}%">
                    ${value.BarcodeAnalytics.Data[4]}%<div class='amerifragtooltip'>Occasion: ${value.BarcodeAnalytics.Labels[4]}</div>
                </div>
                <div class="progress-bar bg-ninety" role="progressbar" style="width:${value.BarcodeAnalytics.Data[5]}%">
                    ${value.BarcodeAnalytics.Data[5]}%<div class='amerifragtooltip'>Age Group: ${value.BarcodeAnalytics.Labels[5]}</div>
                </div>
                <div class="progress-bar bg-sixty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[6]}%">
                    ${value.BarcodeAnalytics.Data[6]}%<div class='amerifragtooltip'>Smell Intensity: ${value.BarcodeAnalytics.Labels[6]}</div>
                </div>
                <div class="progress-bar bg-seventy" role="progressbar" style="width:${value.BarcodeAnalytics.Data[7]}%">
                    ${value.BarcodeAnalytics.Data[7]}%<div class='amerifragtooltip'>Longevity: ${value.BarcodeAnalytics.Labels[7]}</div>
                </div>
                <div class="progress-bar bg-eighty" role="progressbar" style="width:${value.BarcodeAnalytics.Data[8]}%">
                    ${value.BarcodeAnalytics.Data[8]}%<div class='amerifragtooltip'>Spray Time: ${value.BarcodeAnalytics.Labels[8]}</div>
                </div>
                <div class="progress-bar bg-hundered" role="progressbar" style="width:'${value.BarcodeAnalytics.Data[9]}'">
                    ${value.BarcodeAnalytics.Data[9]}%<div class='amerifragtooltip'>Presentation: ${value.BarcodeAnalytics.Labels[9]}</div>
                </div>
            `;
                $("#barcode" + product_id).append(newrow);
                $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
            } else {
                $("#barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

            }
            var $starsContainer = $(".product_box.position-relative").find('.stars' + product_id); // Find the .stars element within the new review
            $starsContainer.empty();

            if (value.rating >= 4.6 && value.rating <= 5) {
                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
            } else if (value.rating >= 4.1 && value.rating <= 4.5) {
                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
            } else if (value.rating >= 3.6 && value.rating <= 4) {
                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
            } else if (value.rating >= 3.1 && value.rating <= 3.5) {
                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
            } else if (value.rating >= 2.6 && value.rating <= 3) {
                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
            } else if (value.rating >= 2.1 && value.rating <= 2.5) {
                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
            } else if (value.rating >= 1.6 && value.rating <= 2) {
                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
            } else if (value.rating >= 1.1 && value.rating <= 1.5) {
                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
            } else if (value.rating >= 0.6 && value.rating <= 1) {
                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
            } else if (value.rating >= 0 && value.rating <= 0.5) {
                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
            } else {
                $starsContainer.append('<span>No reviews</span>'); // Clear the stars container if the rating doesn't match any range
            }

            productList.off("click", ".cartbtn").on("click", ".cartbtn", function () {

                var prod_id = $(this).attr("data");
                var qty = "1";

                if (qty) {
                    $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
                    if (cart_id) {
                        console.log("Update");
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/AddCart",
                            type: "POST",
                            data: { "cart_id": cart_id, "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                            dataType: "JSON",
                            async: false,
                            crossDomain: true,
                            success: function (data) {
                                console.log(data);
                                if (data.responseCode == 1) {
                                    cart_count(cart_id);
                                    $("#" + prod_id).val("");

                                    $("#validationdiv").text("Product successfully added to cart");
                                    $("#validationdiv").slideDown();
                                    $("#validationdiv").delay(10000).slideUp();
                                    $("#validationdiv").css("background", "#026633");

                                    $(".dvcartbtns").show();
                                    $(".btnsmall ").hide();
                                } else {

                                    $("#validationdiv").text(data.responsemessage);
                                    $("#validationdiv").slideDown();
                                    $("#validationdiv").delay(10000).slideUp();
                                    $("#validationdiv").css("background", "#dba23d");
                                }

                            }
                        });

                    } else {
                        console.log("add");
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/AddCart",
                            type: "POST",
                            data: { "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
                            dataType: "JSON",
                            async: false,
                            crossDomain: true,
                            success: function (data) {

                                if (data.responseCode == 1) {
                                    cart_count(cart_id);
                                    $("#" + prod_id).val("");
                                    localStorage.setItem("cart_id", data.cart_id);
                                    cart_count(data.cart_id);
                                    $("#" + prod_id).val("");
                                    $("#validationdiv").text("Product successfully added to cart");
                                    $("#validationdiv").slideDown();
                                    $("#validationdiv").delay(10000).slideUp();
                                    $("#validationdiv").css("background", "#026633");

                                    $(".dvcartbtns").show();
                                    $(".btnsmall ").hide();
                                } else {

                                    $("#validationdiv").text(data.responsemessage);
                                    $("#validationdiv").slideDown();
                                    $("#validationdiv").delay(10000).slideUp();
                                    $("#validationdiv").css("background", "#dba23d");
                                }


                            }
                        });
                    }
                } else {
                    $("input[id =" + prod_id + "]").css("border", "solid 1px red");
                }


            });
            //$(".selectpicker").change(function () {
            //    var sort = $(".selectpicker").val();
            //    if (sort) {
            //        fetchSortProducts(selectpickerdata, sort);
            //    }
            //});
        };


    }
    //-------------------------------- areas----------------------//
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Arealist?project_id=" + Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $.each(data, function (Index, value) {
                var listofareas = "<option value='" + value + "'>" + value + "</option>";
                $("#SLselectArea").append(listofareas);
                $("#SLselectAreapop").append(listofareas);

            });
        }
    });




    //-------------------Analytics-------------------------------//
    analytics();
    occanalytics();
    moodanalytics();
    toneanalytics();
    seasonanalytics();
    smellanalytics();
    longevity();
    timeanalytics();
    ageanalytics();
    presentationanalytics();

    window.myCharts = [];
    window.originalChartColors = [];
    function captureOriginalColors(chart) {
        if (!window.originalChartColors[chart.id]) {
            window.originalChartColors[chart.id] = [...chart.data.datasets[0].backgroundColor];
        }
    }
    function analytics() {
        var questionId = "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339"; // Replace with the question ID you want to retrieve options for

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("stylepie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#330000",
                                    "#550000",
                                    "#770000",
                                    "#990000",
                                    "#BB0000",
                                    "#DD0000",
                                    "#FF0000",
                                    "#FF2222",
                                    "#FF4444",
                                    "#FF6666",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressStyle,#progressStyle2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption1 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressStyle', selectedOption1);
                            //     updateProgressBar('progressStyle2', selectedOption1);

                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                var currentColor = myChart.data.datasets[0].backgroundColor[segment.index];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#330000", "#550000", "#770000", "#990000", "#BB0000",
                                    "#DD0000", "#FF0000", "#FF2222", "#FF4444", "#FF6666"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressStyle,#progressStyle2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                selectedOption1 = myChart.data.labels[segment.index];
                                updateProgressBar('progressStyle', selectedOption1);
                                updateProgressBar('progressStyle2', selectedOption1);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }



    function occanalytics() {
        /*var questionId = "27059952-4128-4b44-be81-ea158ed8eb92"; */// Replace with the question ID you want to retrieve options for
        var questionId = "d84ee43f-6f45-4025-8755-fa04ea76667d";
        // Declare a variable to store the clicked label

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("occassionpie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#4B5D26",
                                    "#416A2C",
                                    "#377736",
                                    "#2D843B",
                                    "#239142",
                                    "#199F48",
                                    "#0FAE4D",
                                    "#05BC53",
                                    "#00CA59",
                                    "#00D864",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (args) {
                                    return args.label;
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                                arc: false,
                                textMargin: 4,
                                overlap: true,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressOccasion,#progressOccasion2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption5 = myChart.data.labels[segment.index]; // Assign the clicked label to the variable
                            //     updateProgressBar('progressOccasion', selectedOption5);
                            //     updateProgressBar('progressOccasion2', selectedOption5);
                            //     // You can now use selectedLabel for any other operations you need
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#4B5D26", "#416A2C", "#377736", "#2D843B", "#239142",
                                    "#199F48", "#0FAE4D", "#05BC53", "#00CA59", "#00D864"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }

                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressOccasion,#progressOccasion2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                selectedOption5 = myChart.data.labels[segment.index]; // Assign the clicked label to the variable
                                updateProgressBar('progressOccasion', selectedOption5);
                                updateProgressBar('progressOccasion2', selectedOption5);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });


    }
    function moodanalytics() {
        var questionId = "c8f8dc67-b98b-436c-b74b-b21399bebc5c"; // Replace with the question ID you want to retrieve options for

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("moodpie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#FFC800",
                                    "#FFD400",
                                    "#FFDD00",
                                    "#FFE62C",
                                    "#FFE956",
                                    "#FFEC80",
                                    "#FFF28C",
                                    "#FFF695",
                                    "#FFFC9F",
                                    "#FFFFA8",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,

                                maxWidth: 80,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            // Add the tooltip configuration to display the percentage symbol
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressMood,#progressMood2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption3 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressMood', selectedOption3);
                            //     updateProgressBar('progressMood2', selectedOption3);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#FFC800", "#FFD400", "#FFDD00", "#FFE62C", "#FFE956",
                                    "#FFEC80", "#FFF28C", "#FFF695", "#FFFC9F", "#FFFFA8"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressMood,#progressMood2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                //var segment = segments[0];
                                selectedOption3 = myChart.data.labels[segment.index];
                                updateProgressBar('progressMood', selectedOption3);
                                updateProgressBar('progressMood2', selectedOption3);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }


    function toneanalytics() {
        //var questionId = "cb6924f2-a52e-43f8-8c0b-492234c4345e"; // Replace with the question ID you want to retrieve options for
        var questionId = "27059952-4128-4b44-be81-ea158ed8eb92";

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("tonepie").getContext("2d");

                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#24408C",
                                    "#2B4D98",
                                    "#315AA3",
                                    "#3767AF",
                                    "#3E74BB",
                                    "#4471C6",
                                    "#4A7FD2",
                                    "#508CDE",
                                    "#5699E9",
                                    "#5CA7F5",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#24408C", "#2B4D98", "#315AA3", "#3767AF", "#3E74BB",
                                    "#4471C6", "#4A7FD2", "#508CDE", "#5699E9", "#5CA7F5"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }

                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressNote,#progressNote2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                // var segment = segments[0];
                                selectedOption2 = myChart.data.labels[segment.index];
                                updateProgressBar('progressNote', selectedOption2);
                                updateProgressBar('progressNote2', selectedOption2);
                            }
                            // if (segments.length) {
                            //     $("#progressNote,#progressNote2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption2 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressNote', selectedOption2);
                            //     updateProgressBar('progressNote2', selectedOption2);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //       /* window.location.href = "show-all.html?label=" + label;*/
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }
    function seasonanalytics() {
        /* var questionId = "d84ee43f-6f45-4025-8755-fa04ea76667d";*/ // Replace with the question ID you want to retrieve options for
        var questionId = "cb6924f2-a52e-43f8-8c0b-492234c4345e";
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("seasonpie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#FF0066",
                                    "#FF1474",
                                    "#FF2880",
                                    "#FF3C8C",
                                    "#FF50A3",
                                    "#FF64AF",
                                    "#FF78BB",
                                    "#FF8CC7",
                                    "#FFA0D3",
                                    "#FFB4DF",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#FF0066", "#FF1474", "#FF2880", "#FF3C8C", "#FF50A3",
                                    "#FF64AF", "#FF78BB", "#FF8CC7", "#FFA0D3", "#FFB4DF"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressSeason,#progressSeason2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                // var segment = segments[0];
                                selectedOption4 = myChart.data.labels[segment.index];
                                updateProgressBar('progressSeason', selectedOption4);
                                updateProgressBar('progressSeason2', selectedOption4);
                            }
                            // if (segments.length) {
                            //     $("#progressSeason,#progressSeason2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption4 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressSeason', selectedOption4);
                            //     updateProgressBar('progressSeason2', selectedOption4);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }
    function smellanalytics() {
        /*var questionId = "214c962f-7ee6-4158-bc0b-a4c8059a6cc2";*/ // Replace with the question ID you want to retrieve options for
        var questionId = "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4";

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("smellpie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#000000",
                                    "#111111",
                                    "#222222",
                                    "#333333",
                                    "#444444",
                                    "#555555",
                                    "#666666",
                                    "#777777",
                                    "#888888",
                                    "#999999",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#000000", "#111111", "#222222", "#333333", "#444444",
                                    "#555555", "#666666", "#777777", "#888888", "#999999"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }

                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...



                                $("#progressSmell,#progressSmell2").css({ color: "#d3d3d3", fontWeight: "bold", fontSize: "13px" })
                                // var segment = segments[0];
                                selectedOption7 = myChart.data.labels[segment.index];
                                updateProgressBar('progressSmell', selectedOption7);
                                updateProgressBar('progressSmell2', selectedOption7);
                            }
                            // if (segments.length) {
                            //     $("#progressSmell,#progressSmell2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" });
                            //     $("#progressSmell,#progressSmell2").attr("style", function (i, style) {
                            //         return (style || "") + "background-color: #a1adb8 !important;";
                            //     });
                            //     var segment = segments[0];
                            //     selectedOption7 = myChart.data.labels[segment.index];
                            //  /*   myChart.data.labels[segment.index].attr('style', 'color:black !important')*/
                            //     updateProgressBar('progressSmell', selectedOption7);
                            //     updateProgressBar('progressSmell2', selectedOption7);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                        },

                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }

    function longevity() {
        /*var questionId = "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4";*/ // Replace with the question ID you want to retrieve options for
        var questionId = "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae";

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("longevitypie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#190B0B",
                                    "#251210",
                                    "#321716",
                                    "#3E1D1C",
                                    "#4B2422",
                                    "#582B28",
                                    "#64312E",
                                    "#713835",
                                    "#7E3F3B",
                                    "#8B4641",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressLongevity,#progressLongevity2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption8 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressLongevity', selectedOption8);
                            //     updateProgressBar('progressLongevity2', selectedOption8);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#190B0B", "#251210", "#321716", "#3E1D1C", "#4B2422",
                                    "#582B28", "#64312E", "#713835", "#7E3F3B", "#8B4641"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressLongevity,#progressLongevity2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                // var segment = segments[0];
                                selectedOption8 = myChart.data.labels[segment.index];
                                updateProgressBar('progressLongevity', selectedOption8);
                                updateProgressBar('progressLongevity2', selectedOption8);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }
    function timeanalytics() {
        /*var questionId = "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae";*/ // Replace with the question ID you want to retrieve options for
        var questionId = "6239cda0-e527-4e32-be3b-be94f9447067";

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("timepie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#ff3300",
                                    "#ff4500",
                                    "#ff5722",
                                    "#ff6b3e",
                                    "#ff7f50",
                                    "#ff9363",
                                    "#ffaa77",
                                    "#ffc18b",
                                    "#ffd7a0",
                                    "#ffeaaf",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressSprayTime,#progressSprayTime2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption9 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressSprayTime', selectedOption9);
                            //     updateProgressBar('progressSprayTime2', selectedOption9);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#ff3300", "#ff4500", "#ff5722", "#ff6b3e", "#ff7f50",
                                    "#ff9363", "#ffaa77", "#ffc18b", "#ffd7a0", "#ffeaaf"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressSprayTime,#progressSprayTime2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                var segment = segments[0];
                                selectedOption9 = myChart.data.labels[segment.index];
                                updateProgressBar('progressSprayTime', selectedOption9);
                                updateProgressBar('progressSprayTime2', selectedOption9);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });

    }
    function ageanalytics() {
        /*var questionId = "6239cda0-e527-4e32-be3b-be94f9447067";*/ // Replace with the question ID you want to retrieve options for
        var questionId = "214c962f-7ee6-4158-bc0b-a4c8059a6cc2";

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("agepie").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels,
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#006666",
                                    "#007373",
                                    "#008080",
                                    "#008B8B",
                                    "#009898",
                                    "#00A5A5",
                                    "#00B2B2",
                                    "#00BFBF",
                                    "#00CCCC",
                                    "#00D9D9",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressAgeGroup,#progressAgeGroup2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption6 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressAgeGroup', selectedOption6);
                            //     updateProgressBar('progressAgeGroup2', selectedOption6);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#006666", "#007373", "#008080", "#008B8B", "#009898",
                                    "#00A5A5", "#00B2B2", "#00BFBF", "#00CCCC", "#00D9D9"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }

                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressAgeGroup,#progressAgeGroup2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                var segment = segments[0];
                                selectedOption6 = myChart.data.labels[segment.index];
                                updateProgressBar('prprogressAgeGroup', selectedOption6);
                                updateProgressBar('progressAgeGroup2', selectedOption6);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }
    function presentationanalytics() {
        var questionId = "e64bd14d-cfac-490c-b80a-fe7329029bf8"; // Replace with the question ID you want to retrieve options for

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
            type: "GET",
            data: { questionId: questionId },
            success: function (response) {
                var optionLabels = response;
                var optionData = Array(optionLabels.length).fill(10); // Initialize all options with 10%

                var ctx = document.getElementById("presentationpie").getContext("2d");

                var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: optionLabels, // Use the optionLabels from the API response as chart labels
                        datasets: [
                            {
                                data: optionData,
                                backgroundColor: [
                                    "#703470",
                                    "#7D417D",
                                    "#8A498A",
                                    "#975297",
                                    "#A35BA3",
                                    "#B068B0",
                                    "#BD70BD",
                                    "#CA79CA",
                                    "#D682D6",
                                    "#E28AE2",
                                ],
                                borderWidth: 0, // Remove the border
                            },
                        ],
                    },
                    options: {
                        layout: {
                            padding: 2,
                        },
                        plugins: {
                            legend: {
                                display: false, // Hide the legend
                            },
                            labels: {
                                render: function (optionLabels) {
                                    // args will be something like:
                                    // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
                                    return optionLabels.label;
                                    // return object if it is image
                                    // return { src: 'image.png', width: 16, height: 16 };
                                },
                                fontColor: "white",
                                display: true,
                                position: "border",
                                fontSize: 8,
                            },
                            tooltip: {
                                callbacks: {
                                    label: (data) => ` ${data.label}`,
                                },
                            },
                        },
                        responsive: true,
                        onHover: (evt, activeEls) => {
                            activeEls.length > 0
                                ? (evt.chart.canvas.style.cursor = "pointer")
                                : (evt.chart.canvas.style.cursor = "default");
                        },
                        onClick: function (e) {
                            var segments = myChart.getElementsAtEventForMode(
                                e,
                                "nearest",
                                { intersect: true },
                                true
                            );
                            // if (segments.length) {
                            //     $("#progressPresentation,#progressPresentation2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                            //     var segment = segments[0];
                            //     selectedOption10 = myChart.data.labels[segment.index];
                            //     updateProgressBar('progressPresentation', selectedOption10);
                            //     updateProgressBar('progressPresentation2', selectedOption10);
                            //     // Make an AJAX call to retrieve the matched product details
                            //     //$.ajax({
                            //     //    url: "https://api.americanfragrances.com/ProductAnalytics/GetQuestionOptions",
                            //     //    type: "GET",
                            //     //    data: { questionId: questionId, selectedOption: label },
                            //     //    success: function (response) {
                            //     //        // Handle the success response and display the product details
                            //     //        window.location.href = "show-all.html?label=" + label;
                            //     //    },
                            //     //    error: function (xhr, status, error) {
                            //     //        console.log(error);
                            //     //    },
                            //     //});
                            // }
                            if (segments.length) {
                                var segment = segments[0];
                                // Reset all segments to their original colors
                                const originalColors = [
                                    "#703470", "#7D417D", "#8A498A", "#975297", "#A35BA3",
                                    "#B068B0", "#BD70BD", "#CA79CA", "#D682D6", "#E28AE2"
                                ];

                                for (let i = 0; i < myChart.data.datasets[0].backgroundColor.length; i++) {
                                    myChart.data.datasets[0].backgroundColor[i] = originalColors[i];
                                }
                                // Darken only the selected segment
                                myChart.data.datasets[0].backgroundColor[segment.index] = '#000000';

                                // Update the chart to show the change
                                myChart.update();

                                // Continue with existing code...
                                $("#progressPresentation,#progressPresentation2").css({ color: "#000", fontWeight: "bold", fontSize: "13px" })
                                var segment = segments[0];
                                selectedOption10 = myChart.data.labels[segment.index];
                                updateProgressBar('progressPresentation', selectedOption10);
                                updateProgressBar('progressPresentation2', selectedOption10);
                            }
                        },
                    },
                });
                window.myCharts.push(myChart);
                captureOriginalColors(myChart);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    }

    // ______________________________latest Update pie charts code------------------------//












    //----------------------------areas-----------------------//
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            //console.log(data.length);
            var i = 0;
            var j = 5;
            for (j = 0; j <= 5; j++) {
                if (j > data.length) {
                    $(".bnr-" + j).parent().hide();
                }
            }

            $.each(data, function (Index, value) {
                i = i + 1;
                if (value.name) {
                    var CategoryBanner = '<h1 class="bnr-txt2">' + value.name + '</h1><img src="' + value.image + '" class="img-bnr1" height="150" alt="Gun Powders" />'
                    $(".bnr-" + i).append(CategoryBanner);
                }
            });
        }
    });
    function getcategorynames() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var newrowContent = '<a class="dropdown-item" href="show-all.html?cat=' + value.name + '">' + value.name + '</a>';
                    $("#navbarDropdown-menu").append(newrowContent);

                });
            }
        });

    };

    $("#searchbox").autocomplete({
        autoFocus: true,
        source: function (request, response) {
            $.ajax({
                url: "https://api.americanfragrances.com/Home/Vendorlist?project_id=" + Project_Id,
                type: "POST",
                dataType: "json",
                data: { Name: request.term },
                success: function (data) {
                    if (data != "") {
                        response($.map(data, function (item) {
                            return { label: item.display_name };
                        }))
                    } else {
                        alert("No products were found matching your selection.");
                    }
                }
            })
        },
        messages: {
            noResults: "", results: ""
        }
    });
    $(".selectpicker").change(function () {
        var sort = $(".selectpicker").val();
        //if (sort == "BestSelling") {
        //    window.location.href = "show-all.html?keyword=bestsellers"
        //}
        if (sort) {
            fetchSortProducts(selectpickerdata, sort);
        }
    });
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
    $("#SLselectArea").change(function () {

        var vendorlocation = $("#SLselectArea option:selected").text();
        localStorage.setItem("Area", vendorlocation);
        location.reload();
    });
    //showing and hiding filter - sidebar  section

    $('#toggleSectionButton').on('click', function () {
        $('.filter-sidebar').toggle();
    });




    // Reset progress bars to their default state
    $("#resetBarcode").on('click', function () {
        $("#progressStyle, #progressNote, #progressMood, #progressSeason, #progressOccasion, #progressAgeGroup, #progressSmell, #progressLongevity, #progressSprayTime, #progressPresentation")
            .css({
                color: "",
                fontWeight: "",
                backgroundColor: ""
            })
            .each(function () {
                $(this).removeAttr("style");
            });
        $("#progressStyle2, #progressNote2, #progressMood2, #progressSeason2, #progressOccasion2, #progressAgeGroup2, #progressSmell2, #progressLongevity2, #progressSprayTime2, #progressPresentation2").css("color", "white");

        $("#progressStyle2").text("Style");
        $("#progressNote2").text("Note");
        $("#progressMood2").text("Mood");
        $("#progressSeason2").text("Season");
        $("#progressOccasion2").text("Occasion");
        $("#progressAgeGroup2").text("Age Group");
        $("#progressSmell2").text("Smell Intensity");
        $("#progressLongevity2").text("Longevity");
        $("#progressSprayTime2").text("Spray Time");
        $("#progressPresentation2").text("Presentation");
        // Reset all pie charts to their original colors
        //if (window.myCharts) {
        //    // Reset each chart if it exists
        //    Object.keys(window.myCharts).forEach(function (chartId) {
        //        const chart = window.myCharts[chartId];
        //        if (chart) {
        //            // Get the original colors for this chart
        //            const originalColors = getOriginalColors(chartId);

        //            // Reset the colors
        //            if (chart.data && chart.data.datasets && chart.data.datasets[0]) {
        //                chart.data.datasets[0].backgroundColor = originalColors;
        //                chart.update();
        //            }
        //        }
        //    });
        //}
        window.myCharts.forEach((chart, index) => {
            if (chart && chart.data.datasets.length > 0) {
                let originalColors = window.originalChartColors[index]; // Get stored original colors

                for (let i = 0; i < chart.data.datasets[0].backgroundColor.length; i++) {
                    chart.data.datasets[0].backgroundColor[i] = originalColors[i];
                }

                chart.update(); // Refresh chart
            }
        });



        // Clear any selected options
        selectedOption1 = selectedOption2 = selectedOption3 = selectedOption4 = selectedOption5 =
            selectedOption6 = selectedOption7 = selectedOption8 = selectedOption9 = selectedOption10 = null;
    });


    //----------------when user click button showing piechart slide-----------------------------//


    //$(document).on('click', '#recomedationsBtn', function () {

    //    $('body').removeClass('freeze-scroll blurred');

    //});
    $(document).on('click', '#showPieChartSlide', function () {
        if ($('#pieChartSlide').hasClass('show')) {
            // Slide out  

            $('#pieChartSlide').removeClass('show').addClass('remove-show');
            $('body').removeClass('blurred freeze-scroll'); // Remove blur and enable scrolling

        } else {
            // Slide in
            $('#pieChartSlide').removeClass('remove-show').addClass('show');

            $('body').addClass('blurred freeze-scroll'); // Add blur and disable scrolling

        }
    });




    $('#hideChartSlide').click(function () {
        if ($('#pieChartSlide').hasClass('show')) {
            $('body').removeClass('freeze-scroll blurred');
            $('#pieChartSlide').removeClass('show').addClass('remove-show'); // Slide out

        } else {
            $('#pieChartSlide').removeClass('remove-show').addClass('show'); // Slide in
        } // Toggle the 'show' class to slide in/out
    });

    $('#recomedationsBtn').click(function () {

        $('body').removeClass('freeze-scroll blurred');
        $('#barcodeSelected').show();
        if (recomendedAnalytics != null && recomendedAnalytics != "") {
             
            $("#bothRecomendationsCon2").removeClass("d-none");
            $(".multiAnalytics").hide();
        }

        if ($('#pieChartSlide').hasClass('show')) {
            $('#pieChartSlide').removeClass('show').addClass('remove-show'); // Slide out
        } else {
            $('#pieChartSlide').removeClass('remove-show').addClass('show'); // Slide in
        }// Toggle the 'show' class to slide in/out
    });
    function updateProgressBar(id, label) {
        $(`#${id}`).text(label); // Update only the text with the provided label
    }


    //--------------------------------get Active subscription plan---------------------------------//
    $.ajax({
        url: "https://api.americanfragrances.com/Subscription/GetActiveSubscriptionDetails?customerId=" + Authkey,
        type: "GET",
        dataType: "json",
        traditional: true,
        success: function (data) {
            if (data.PlanName) {
                $("#usertakeSub").text("");
                $("#usertakeSub").text(data.PlanName);

            }

        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/Home.html";
                return;
            }
        }
    });
   

    // Apply filters


    $("#applyFilters").click(function () {
        // Collect all filter values
        appliedFilter = true;
        var skip = 0;
        var selectedBrands = $('input[name="brands"]:checked').map(function () {
            return this.value;
        }).get().join(',');

        var selectedStyle = $('input[data-type="STYLE"]:checked').val() || '';
        var selectedNote = $('input[data-type="NOTE"]:checked').val() || '';
        var selectedMood = $('input[data-type="MOOD"]:checked').val() || '';
        var selectedSeason = $('input[data-type="SEASON"]:checked').val() || '';
        var selectedOccasion = $('input[data-type="OCCASION"]:checked').val() || '';
        var selectedAgeGroup = $('input[data-type="AGE GROUP"]:checked').val() || '';
        var selectedSmellIntensity = $('input[data-type="SMELL INTENSITY"]:checked').val() || '';
        var selectedLongevity = $('input[data-type="LONGEVITY"]:checked').val() || '';
        var selectedSprayTime = $('input[data-type="SPRAY TIME"]:checked').val() || '';
        var selectedPresentation = $('input[data-type="PRESENTATION"]:checked').val() || '';

        let minPrice = $("#minp").val();
        let maxPrice = $("#maxp").val();
        let minDiscount = $("#minpercen").val();
        let maxDiscount = $("#maxpercen").val();

        getproducts(selectedStyle, selectedNote, selectedMood, selectedSeason, selectedOccasion,
            selectedAgeGroup, selectedSmellIntensity, selectedLongevity, selectedSprayTime,
            selectedPresentation, selectedBrands, minPrice, maxPrice, minDiscount, maxDiscount, skip);
    });


    // Initial hide with !important
    $("#applyfiltersdiv").attr('style', 'display: none !important');

    function toggleFilterDiv(forceShow) {
         
        // If forceShow is true, show the filter div immediately
        if (forceShow === true) {
            $("#applyfiltersdiv").attr('style', 'display: flex !important');
            return;
        }

        var selectedAnalytics = $('input[class="analytics-radio"]:checked').length;
        var selectedBrands = $('input[name="brands"]:checked').length;

        // Get price range values
        var priceMin = parseFloat($("#minp").val());
        var priceMax = parseFloat($("#maxp").val());

        // Get discount range values  
        var discountMin = parseFloat($("#minpercen").val());
        var discountMax = parseFloat($("#maxpercen").val());

        // Check if any filters are active
         
        if (selectedAnalytics > 0 || selectedBrands > 0) {
            $("#applyfiltersdiv").attr('style', 'display: flex !important');
        } else {
            $("#applyfiltersdiv").attr('style', 'display: none !important');
        }
    }
    $(document).on('change', 'input[class="analytics-radio"], input[name="brands"]', () => toggleFilterDiv(true));

    // $('input[name="analytics"], input[name="brands"]').on('change', () => toggleFilterDiv(true));
    $(".pp, .pp2").on('change', () => toggleFilterDiv(true));

});



const params = new URLSearchParams(window.location.search);
const recomendedAnalytics = params.get('analytics');

document.addEventListener('DOMContentLoaded', function () {
   // const sidebar = document.querySelector('.filter-sidebar');
    const sidebarContainer = document.querySelector('.col-md-4');
    const productsContainer = document.querySelector('#productsdv');
    scrollTrigger = 500;
    //if (recomendedAnalytics != null && recomendedAnalytics != "") {
    //    scrollTrigger = 300;
    //}


   // const sidebarWidth = sidebar.offsetWidth;

    function updateSidebar() {
        const sidebarHeight = sidebar.offsetHeight;
        const productsTop = productsContainer.getBoundingClientRect().top + window.scrollY;
        const productsBottom = productsTop + productsContainer.offsetHeight;
        const scrollY = window.pageYOffset;


        var maxTranslateY = productsBottom - sidebarHeight - 80;
        //if (maxTranslateY < 0) {
        //    maxTranslateY = productsTop;
        //}
        if (recomendedAnalytics != null && recomendedAnalytics != "") {
            const ProfileHeight = $('.profileBelowDetails').offset().top;
            maxTranslateY = maxTranslateY - (ProfileHeight - 50);
        }
        if (scrollY > scrollTrigger && scrollY < maxTranslateY) {
            const translateY = scrollY - scrollTrigger;
            sidebar.style.transform = `translateY(${translateY}px)`;
            //  sidebar.style.width = `${sidebarWidth}px`;
            sidebar.style.position = 'relative';
            sidebar.style.zIndex = '1';
        } else if (scrollY >= maxTranslateY) {
            sidebar.style.transform = `translateY(${maxTranslateY - scrollTrigger}px)`;
            // sidebar.style.width = `${sidebarWidth}px`;
            sidebar.style.position = 'relative';
            sidebar.style.zIndex = '1';
        } else {
            sidebar.style.transform = 'none';
            // sidebar.style.width = '';
            sidebar.style.position = '';
            sidebar.style.zIndex = '';
        }
    }

    let ticking = false;
    //window.addEventListener('scroll', function () {
    //    if (!ticking) {
    //        window.requestAnimationFrame(function () {
    //            if (!$('#productsdv').is(':empty')) {
    //                updateSidebar();
    //            } else {
    //                sidebar.style.transform = 'none';
    //                sidebar.style.position = 'static';
    //                sidebar.style.top = 'auto';
    //                sidebar.style.left = 'auto';
    //                sidebar.style.zIndex = 'auto';
    //            } 
    //            ticking = false;
    //        });
    //        ticking = true;
    //    }
    //});

    //appending code based on path contains

    var parentpage = localStorage.getItem("parentpage");




    //this is used when MySubscription   page is parent page 

    function AppendDetailsOfProduct(product_id, ChooseProductBtId) {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Productview?project_id=" +
                Project_Id +
                "&id=" +
                product_id +
                "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                var salePrice = parseFloat(data.price).toFixed(2);
                var originalPrice = parseFloat(data.rate).toFixed(2);
                var discount_price = parseFloat(data.discount_price).toFixed(2);
                var stock_count = data.stock;
                var productName = data.name;
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-name-edit').text(productName);
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
                //$(`#${ChooseProductBtId}`).closest('.card2').find('.productImg-edit').attr("src", data.display_image);

                if (data.stock != 0) {

                    Stock = "In Stock"
                    var $targetCard = parent.$(`#${ChooseProductBtId}`).closest('.card2');
                    //  $(`#${ChooseProductBtId}`).closest('.card2').find('.productAllDetails-edit').removeClass('d-none');
                    $targetCard.find('.product-name-edit').text(productName);
                    $targetCard.find('.brandName-edit').text(data.brandname);
                    $targetCard.find('.produtSize-edit').text(data.dimension);
                    $targetCard.find('.ProdctPrice-edit').text(salePrice);
                    /*$(`#${ChooseProductBtId}`).closest('.card').find('.ProdctStocK').text(Stock);*/
                    $targetCard.find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
                    $targetCard.find('.productImg-edit').attr("src", data.display_image); } else {
                    showPopup("Out Of Stock")

                }





            },
        });
    }



    //this is used when subscription plan details  page is parent page 
    function AppendDetailsOfProduct2(product_id, ChooseProductBtId) {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Home/Productview?project_id=" +
                Project_Id +
                "&id=" +
                product_id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                var salePrice = parseFloat(data.price).toFixed(2);
                var originalPrice = parseFloat(data.rate).toFixed(2);
                var discount_price = parseFloat(data.discount_price).toFixed(2);
                var stock_count = data.stock;
                var productName = data.name;
                var Stock = "";

                if (data.stock != 0) {
                    Stock = "In Stock";

                    // Use parent document to find the target card
                    var $targetCard = parent.$(`#${ChooseProductBtId}`).closest('.card');

                    $targetCard.find('.productAllDetails').removeClass('d-none');
                    $targetCard.find('.product-name').text(productName);
                    $targetCard.find('.brandName').text(data.brandname);
                    $targetCard.find('.produtSize').text(data.mood + " " + data.dimension);
                    $targetCard.find('.ProdctPrice').text(salePrice);
                    $targetCard.find('.product-id').val(product_id);
                    $targetCard.find('.productImg').attr("src", data.display_image);

                } else {
                    parent.showPopup("Out Of Stock"); // make sure showPopup is also accessible in parent
                }
            },
        });
    }



    $(document).on("click", ".cart_btn, .cartbtn", function () {

        var product_id = $(this).attr("data");
        //$('#ProductViewPopup').modal('toggle');
        parent.$('#ProductViewPopup').modal('hide');
        parent.$('#analyizepopup').modal('hide');
        var ChooseProductBtId = localStorage.getItem("chosenProductDV");
        if (parentpage.includes("SubscriptionPlanDetails.html")) {
            AppendDetailsOfProduct2(product_id, ChooseProductBtId);
        } else {
            AppendDetailsOfProduct(product_id, ChooseProductBtId);
        }

        localStorage.removeItem("chosenProductDV");

    });
    $(document).on("click", ".viewDetails", function () {



        var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
        parent.$('#analyizepopup').modal('hide');

        // Construct the iframe with the correct product ID and dimensions
        var newrowcontent = '<iframe sandbox="allow-scripts allow-same-origin" id="subscriptionIframe"  src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';
        // parent.$('#ProductViewPopup .modal-body').empty();
        // Insert the new iframe content into the modal body
        parent.$('#ProductViewPopup .modal-body').html(newrowcontent);

        // Show the Product View popup modal
        parent.$('#ProductViewPopup').modal('show');

    });







});


$(document).on("click", ".whishlistPro", function () {
    var $this = $(this); // Store reference to the clicked element
    var prod_id = $this.attr("id");
    var Prowishlist_id = $this.attr("wishlistid");
    var cust_auth = localStorage.getItem("authorid");

    if (cust_auth == null || cust_auth == undefined) {
        $("#loginpopup").modal('show');
    } else {
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/Create",
            type: "POST",
            data: {
                project_id: Project_Id,
                product_id: prod_id,
                authorid: cust_auth,
            },
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                if (data.responseCode == 1) {
                    localStorage.setItem("wishlist_id", data.cart_id);
                    wishlist_count(cust_auth);

                    $("#validationdiv").text("Product Added Successfully To Wishlist")
                        .css("background", "#026633")
                        .slideDown().delay(3000).slideUp();

                    $this.closest(".wishlistIcon").find('.fa-heart')
                        .addClass('redColor').removeClass('whiteColor');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                } else if (data.responseCode == 0) {
                    //$("#validationdiv").text(data.responsemessage)
                    //    .css("background", "#dba23d")
                    //    .slideDown().delay(3000).slideUp();

                    $.ajax({
                        url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
                        type: "POST",
                        data: {
                            "project_id": Project_Id,
                            "id": Prowishlist_id,
                            "authorid": cust_auth
                        },
                        dataType: "JSON",
                        crossDomain: true,
                        success: function (data) {
                            if (data.responseCode == 1) {
                                wishlist_count(cust_auth);
                                $this.closest(".wishlistIcon").find('.fa-heart')
                                    .removeClass('redColor').addClass('whiteColor');
                                $("#validationdiv").text("Product Removed  From Wishlist Successfully")
                                    .css("background", "#026633")
                                    .slideDown().delay(3000).slideUp();
                            }
                        }
                    });
                } else {
                    //$("#validationdiv").text(data.responsemessage)
                    //    .css("background", "#dba23d")
                    //    .slideDown().delay(3000).slideUp();
                }
            }
        });
    }

    function wishlist_count(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url: `https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=${Project_Id}&authorid=${cust_auth}`,
                type: "GET",
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    $(".wishlist_count").html(data);
                }
            });
        }
    }

});
