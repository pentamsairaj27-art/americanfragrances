$(document).ready(function () {
    var minPrice
    var maxPrice
    var minDiscount
    var maxDiscount
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
    $(".filter-sidebar").addClass("d-none");
    if (window.scroll) {
        $(".filter-sidebar").removeClass("d-none");
    }
    $("#brandImgCon").hide();
    setTimeout(function () {
        window.scrollTo(0, 50); // Scroll 2px down after loading
        $(".filter-sidebar").show();
    }, 10000);
    function checkAndMarkCheckbox() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"].analytics-radio');

        if (checkboxes.length === 0) {
            // Try again after a short delay
            setTimeout(checkAndMarkCheckbox, 100);
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const label = params.get('label'); // e.g., 'Vintage'
        const labelHeading = params.get('labelHeading'); // e.g., 'STYLE'

        if (label && labelHeading) {
            const normalizedLabelHeading = labelHeading.toLowerCase().trim();
            const normalizedLabel = label.toLowerCase().trim();

            let found = false;

            checkboxes.forEach((checkbox) => {
                const checkboxLabelHeading = checkbox.getAttribute('data-type')?.toLowerCase().trim();
                const checkboxValue = checkbox.value?.toLowerCase().trim();

                if (checkboxLabelHeading === normalizedLabelHeading && checkboxValue === normalizedLabel) {
                    checkbox.checked = true;
                    found = true;

                    // Open accordion
                    const collapseDiv = checkbox.closest('.accordion-collapse');
                    if (collapseDiv && !collapseDiv.classList.contains('show')) {
                        collapseDiv.classList.add('show');
                        const button = collapseDiv.previousElementSibling.querySelector('.accordion-button');
                        if (button) {
                            button.classList.remove('collapsed');
                            button.setAttribute('aria-expanded', 'true');
                        }
                    }
                }
            });

            if (!found) {
                console.warn(`Checkbox for label "${label}" under heading "${labelHeading}" not found.`);
            }
        }
    }

    checkAndMarkCheckbox();
    var desc1;
    var desc2;
    var desc3;
    var desc4;
    var desc5;
    var desc6;
    var desc7;
    var desc8;
    var desc9;
    var desc10;

    let isLoading = false;
    let hasMoreProducts = true;
    let analyticsSkip = 0;
    const analyticsTake = 50; // Or whatever batch size is appropriate for analytics
    let isAnalyticsLoading = false;
    let hasMoreAnalyticsProducts = true; // Flag for analytics products
    let multiAnalyticsSkip = 0;
    const multiAnalyticsTake = 50; // Or whatever batch size is appropriate
    let isMultiAnalyticsLoading = false;
    let hasMoreMultiAnalyticsProducts = true; // Flag for multi-analytics products

    let currentMultiAnalyticsSelections = {
        selectedOption1: undefined,
        selectedOption2: undefined,
        selectedOption3: undefined,
        selectedOption4: undefined,
        selectedOption5: undefined,
        selectedOption6: undefined,
        selectedOption7: undefined,
        selectedOption8: undefined,
        selectedOption9: undefined,
        selectedOption10: undefined
    };
    // Store user profile data for subsequent analytics calls
    let currentUserProfileData = null;
    let currentFilters = {
        style: undefined,
        note: undefined,
        mood: undefined,
        season: undefined,
        occasion: undefined,
        ageGroup: undefined,
        smellIntensity: undefined,
        longevity: undefined,
        sprayTime: undefined,
        presentation: undefined,
        brands: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        minDiscount: undefined,
        maxDiscount: undefined
    };

    //Intially putting as applied filter as false this is used when apply filter button is click need to fetch data based on selection
    var appliedFilter = false;
    var BrandsBanner = "";
    var BrandsBannerStatement = ""
    //if (brand_name) {
    //    $.ajax({
    //        url: "https://api.americanfragrances.com/Home/GetNoteMatchedProductDetails?brandname=" + brand_name + "&skip=" + skip + "&take=" + take,
    //        type: "GET",
    //        dataType: "JSON",
    //        async: true,
    //        crossDomain: true,
    //        success: function (data) {


    //        },
    //    });
    //}

    var type = params.get('type');
    var rangeSliderProducts = params.get('selectedProducts')
    var userGender = localStorage.getItem("userGender");
    var keyword = params.get('keyword');
    var allproducts = params.get('more');
    var choice = params.get('choice');
    var recomendedAnalytics = params.get('analytics');
    // var multyanaliticsclick = false;
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
        var imageSrcs = "";

        var bannerMap = {
            "MAKE UP": { "Men": "1.jpg", "Women": "2.jpg" },
            "SKIN CARE": { "Men": "3.jpg", "Women": "4.jpg" },
            "HAIR CARE": { "Men": "5.jpg", "Women": "6.jpg" },
            "BATH ": { "Men": "7.jpg", "Women": "8.jpg" },
            "AROMA": { "Men": "9.jpg", "Women": "10.jpg" },
            "GIFT SETS": { "Men": "11.jpg", "Women": "12.jpg" },
            "BUNDLE SETS": { "Men": "13.jpg", "Women": "14.jpg" },
            "ACCESSORIES": { "Men": "16.jpg", "Women": "15.jpg" },
            "Clearance": { "Men": "17.jpg", "Women": "18.jpg" },
            "luxury": { "luxury": "20.jpeg" }

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
            imageSrcs = "AmerifragChoiceBanner.jpg";
        } else if (params.has('keyword')) {

        }
        if (imageSrc !== "") {
            $("#showallBannerImg").append('<img src="Images/showall/' + imageSrc + '" style="width:100%; height:auto;" />');
        }
        if (imageSrcs !== "") {
            $("#showallBanner").hide();
            $("#showallBannerImg").empty();
            $("#brandsBannerIMG").empty();
            $("#brandImgCon").show();
            $("#bannerTextDes").show();
            $("#brandsBannerIMG").append('<img src="Images/showall/' + imageSrcs + '" style="width:100%; height:auto;" />');
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
                        $("#brandsBannerIMG").append('<img src="' + data.bannerimage + '"  style="width:100%; height:auto;" />');

                    }
                    $("#bannerTextDes").empty();

                    $("#bannerTextDes").html(data.bannerheader);
                    $("#brand_sear_hide").hide();

                },
                error: function (xhr) {
                    //
                }
            });




        } else {
            if ((keyword != null && keyword !== "") || params.has('choice')) {
                $("#showallBanner").hide();
                $("#showallBannerImg").empty();
                $("#brandsBannerIMG").empty();
                $("#brandImgCon").show();
                $("#bannerTextDes").hide();

                var imageSrc = "";

                var keybannerMap = {
                    "luxury": { "luxury": "20.jpeg" },
                    "celebrity": { "celebrity": "21.jpeg" },
                    "timeless": { "timeless": "22.jpeg" }
                };

                var subkeyword;
                if (keyword) {
                    subkeyword = Object.keys(keybannerMap).find(
                        key => key.toLowerCase() === keyword.toLowerCase()
                    );
                }

                if (subkeyword && keybannerMap[subkeyword]) {
                    // Only proceed if subkeyword matched and mapping exists
                    if (!genderKey) {
                        // Get the image filename from the nested object
                        imageSrc = keybannerMap[subkeyword][subkeyword];
                    }

                    if (imageSrc !== "") {
                        $("#brandsBannerIMG").append(
                            '<img src="Images/showall/' + imageSrc + '" style="width:100%; height:auto;margin-bottom: 40px;" />'
                        );
                    }
                }
            }

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
    /* $("#testimonialCon").hide();*/
    $("#AmerifragAIShowall").hide();
    //--------------------------------------If User Not Login Redirecting to Home page when click on shop button of AI Recommendations----------------------------//
    $(document).on("click", "#profileBasedRecomendations", function () {
        if (Authkey == null || Authkey == undefined) {
            localStorage.removeItem("redirectionpage");

            localStorage.setItem("redirectionpage", "/show-all.html?analytics=products")
            $("#loginpopup").modal('show');
        } else {
            window.location.href = "/show-all.html?analytics=products";
            window.location.href = "/show-all.html?analytics=products";
        }
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
            // $(".breadCrumbCon").css("background-color", "#d3d3d3");
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
        /*  $("#testimonialCon").show();*/
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


    //if (Sub_Category == "FRAGRANCES" || Sub_Category == "TESTERS" || label != null || keyword == "luxury" || keyword == "timeless" || keyword == "celebrity" || keyword == "toprated" || keyword == "newarrivals" || keyword == "bestsellers") {
    if (Sub_Category == "FRAGRANCES" || Sub_Category == "TESTERS" || label != null || keyword == "toprated" || keyword == "newarrivals" || keyword == "bestsellers") {

        $("#shopByanalytics").show();
        $(".recomendationsSection").show();
        $("#bothRecomendationsCon").show();
        $("#showallBannerImg").hide();

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
    var take = 24;
    var skip = 0;

    var displayedProducts = []; // Keep track of displayed products
    getcategorynames();
    if (getname == 'products') {
        getanalytics(false);

        $("#loadmoreDiv").show();
    } else {
        var take = 24;
        var skip = 0;
        let isLoading = false;
        let hasMoreProducts = true;
        getproducts(
            undefined, // style
            undefined, // note
            undefined, // mood
            undefined, // season
            undefined, // occasion
            undefined, // ageGroup
            undefined, // smellIntensity
            undefined, // longevity
            undefined, // sprayTime
            undefined, // presentation
            undefined, // brands (or brand_name if available globally)
            undefined, // minPrice
            undefined, // maxPrice
            undefined, // minDiscount
            undefined, // maxDiscount
            false      // isLoadMore: false for initial load
        );
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
            async: true,
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
    // --- New/Modified Function: getProductsBasedonSelection ---
    // Make sure selectedOption1-10 are populated BEFORE this function is called
    // or retrieve them inside this function if they are from form elements.
    function getProductsBasedonSelection(isLoadMore = false) {
        if (isMultiAnalyticsLoading || !hasMoreMultiAnalyticsProducts) {
            return;
        }

        isMultiAnalyticsLoading = true;

        if (!isLoadMore) {
            multiAnalyticsSkip = 0;
            $("#productsdv").empty();
            $("#noproductsdv").empty();
        }

        const optionsToUse = isLoadMore ? currentMultiAnalyticsSelections : {
            selectedOption1: selectedOption1,
            selectedOption2: selectedOption2,
            selectedOption3: selectedOption3,
            selectedOption4: selectedOption4,
            selectedOption5: selectedOption5,
            selectedOption6: selectedOption6,
            selectedOption7: selectedOption7,
            selectedOption8: selectedOption8,
            selectedOption9: selectedOption9,
            selectedOption10: selectedOption10
        };

        if (!isLoadMore) {
            currentMultiAnalyticsSelections = { ...optionsToUse };
        }
        const queryParams = [];

        for (let i = 1; i <= 10; i++) {
            let option = window[`selectedOption${i}`];

            // Check if it's a DOM element with a value property
            if (option && option.value !== undefined) {
                option = option.value;
            }

            // If it has a truthy value, add to queryParams
            if (option) {
                queryParams.push(`selectedOption${i}=` + encodeURIComponent(option));
            }
        }

        const queryString = queryParams.join("&");
        var fullUrl = "https://api.americanfragrances.com/ProductAnalytics/GetRecommendedProducts";
        if (queryString) {
            fullUrl += "?" + queryString + "&take=" + multiAnalyticsTake + "&skip=" + multiAnalyticsSkip;
        }

        $.ajax({
            url: fullUrl,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                // Reset only on initial load, otherwise, append
                if (!isLoadMore) {
                    $("#productsdv").empty();
                    $("#noproductsdv").empty();
                }

                $(".dv_title").empty();
                $(".cat_title_breadcrumb").empty();
                $(".cat_title_breadcrumb").append("Fragrances");
                $(".dv_title").append("Multi-Analytics");
                $("#analyticsheading").empty();
                $("#analyticsheading").append(" Fragrances by Multi-Analytics ");

                const productsToDisplay = data.MatchedProducts;

                if (!productsToDisplay || productsToDisplay.length === 0) {
                    hasMoreMultiAnalyticsProducts = false;
                    if (!isLoadMore && $("#productsdv").is(':empty')) {
                        appendingNoProducts();
                    }
                } else {
                    appendingResultdata(productsToDisplay); // Use your general appending function
                    if (productsToDisplay.length < multiAnalyticsTake) {
                        hasMoreMultiAnalyticsProducts = false;
                    } else {
                        multiAnalyticsSkip += multiAnalyticsTake; // Increment skip for next request
                    }
                }
                isMultiAnalyticsLoading = false; // Reset loading flag
            },
            failure: function (failureresp) {
                console.error("AJAX Failure for Multi-Analytics Products:", failureresp);
                isMultiAnalyticsLoading = false;
                hasMoreMultiAnalyticsProducts = false;
                if (!isLoadMore) { appendingNoProducts(); }
            },
            error: function (xhr) {
                console.error("AJAX Error for Multi-Analytics Products:", xhr);
                if (xhr.status === 401) {
                    window.location.href = "Home.html";
                    return;
                }
                isMultiAnalyticsLoading = false;
                hasMoreMultiAnalyticsProducts = false;
                if (!isLoadMore) { appendingNoProducts(); }
            }
        });
    }


    // --- Button Click Handler ---
    $(document).on('click', '#recomedationsBtn', function () {
        // --- CRITICAL CHANGE HERE ---
        // When this button is clicked, we are now in "Multi-Analytics" mode.
        getname = 'multi-analytics'; // Set the global flag
        // Reset the hasMore flag for this specific type of loading
        hasMoreMultiAnalyticsProducts = true; // Assume there are more products when initiating a new search

        // You need to ensure selectedOption1 to selectedOption10 are populated here
        // before calling the function.
        // Example (if they are from input fields):
        // selectedOption1 = $('#someInputForOption1').val();
        // ...
        // selectedOption10 = $('#someInputForOption10').val();
        // (Assuming these are defined as global vars as per your original code)

        getProductsBasedonSelection(false); // Initial load for Multi-Analytics
    });
    getbrandslist();
    getquestions();
    //--------------------------profile in recommendations page---------------------------//


    /* profileDescriptions();*/
    function profileDescriptions() {
        $.ajax({

            url: "https://api.americanfragrances.com/Customer/MyProfileDescription?customerid=" + Authkey + "",
            type: "GET",
            async: false,
            dataType: "JSON",
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
                var newrowedf =
                    '<div class="py-3" style="background: #fcfcfc;border:15px solid #70b4bd;"><div class="row align-items-center" > <h3 class="hero_title latestHeadings mb-4" style="text-transform:capitalize !important;">explore a fragrance collection uniquely tailored to your personality</h3>' +
                    '<div class="col-md-4 p-3 text-center"></div><div class="col-md-4"><img src="' +
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
                    '<div class="col-md-4 p-3 text-center"></div>' +

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
                    desc1 + " " + desc7 + " " + desc3 + " " + desc9 + " " + desc5 + " " + desc2 + " " + desc4 + " " + desc6 + " " + desc10 + " " + desc8 + " " +
                    '</span></p>' +
                    //'< div class="row  " ><div class="col-md-9 px-5 d-flex flex-column justify-content-center"><p class="headings-below-bold-text" style="margin-bottom:0px;">Immerse yourself into a world where every scent tells your story...</p></div><div class="col-md-3"><a type="button" class="btn amerifrgbutton" data-bs-toggle="modal" data-bs-target="#analyizepopup">Here’s What’s Waiting For You…</a></div></div >'+
                    '</div > ' +
                    /*'<div class="text-center pt-2 pb-2 "><a type="button" style="" class="btn amerifrgbutton" href=/SubscriptionHome.html>Enter Amerifrag’s SUBSCRIPTION CLUB</a></div>' +*/
                    '</div ></div > ';

                $(".after-login").append(newrowedf);




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
            async: true,
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
            async: true,
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






    //function getRecommendationsBestSeller() {
    //    $.ajax({
    //        url:
    //            "https://api.americanfragrances.com/Product/BestSeller?customerId=" + usersession + "&take=" + take + "&skip=" + skip,
    //        type: "GET",
    //        dataType: "JSON",
    //        async: true,
    //        crossDomain: true,
    //        success: function (data) {
    //            $("#productsdv").empty();
    //            i = 0;
    //            $.each(data.Data, function (index, value) {
    //                i = i + 1;
    //                if (index < 50) {
    //                    // Display up to 8 products if data.length >= 8
    //                    // Display up to 4 products if data.length < 8
    //                    // Modify the logic here to render the product
    //                    if (data.length >= 8 || index < 8) {
    //                        var product_id = value.id;
    //                        var salePrice = parseFloat(value.price).toFixed(2);
    //                        var originalPrice = parseFloat(value.rate).toFixed(2);
    //                        var categoryname = value.categoryname;
    //                        var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


    //                        var newrowContent =
    //                            '<div class="col-md-6 col-lg-4 "><div class="product_box  position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' +
    //                            value.id +
    //                            '"><img class="img-fluid w-100" src="' +
    //                            value.display_image +
    //                            '" alt="..."></a><div class="product-overlay">' +
    //                            stockStatus +
    //                            '<a class="btn"  href="Productview.html?id=' +
    //                            value.id +
    //                            '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly_rec' + product_id + '"> </p><div class="barcode progress" id="bestbarcodeREC' +
    //                            value.id +
    //                            '" ></div>' +
    //                            '<p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p>' +
    //                            '<div class="row align-items-center" > <div class=" "><p class="brandnm">by <a href="show-all.html?brand=' +
    //                            value.BrandName +
    //                            '"><b><u>' +
    //                            value.BrandName +
    //                            "</u></b></a></p></div></div>" +
    //                            '<div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' +
    //                            salePrice +
    //                            '</div><div class="org_price"><strike>$' +
    //                            originalPrice +
    //                            '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-6 d-flex justify-content-between"><div class="discount_text">' +
    //                            value.discount +
    //                            '% OFF Retail</div></div><div class="col-6 d-flex align-items-center justify-content-end"><div class="star stars' +
    //                            product_id +
    //                            '"></div><span class="reviews_count">&nbsp;(<span>' +
    //                            value.rating_count +
    //                            "</span>)</span></div></div></div></div>";
    //                        $("#productsdv").append(newrowContent);
    //                        // Make AJAX call to fetch chart data
    //                        if (value.subcategoryname == "FRAGRANCES" || value.subcategoryname == "TESTERS") {

    //                            var newrow =
    //                                '<div class="progress-bar bg-ten" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[0] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[0] +
    //                                "% <div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[0] + ": " +
    //                                value.BarcodeAnalytics.Data[0] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-fourty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[1] +
    //                                '%"  >' +
    //                                value.BarcodeAnalytics.Data[1] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[1] + ": " +
    //                                value.BarcodeAnalytics.Data[1] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-thirty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[2] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[2] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[2] + ": " +
    //                                value.BarcodeAnalytics.Data[2] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-fifty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[3] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[3] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[3] + ": " +
    //                                value.BarcodeAnalytics.Data[3] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-twenty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[4] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[4] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[4] + ": " +
    //                                value.BarcodeAnalytics.Data[4] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-ninety" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[5] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[5] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[5] + ": " +
    //                                value.BarcodeAnalytics.Data[5] +
    //                                '%</div></div>' +
    //                                '<div class="progress-bar bg-sixty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[6] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[6] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[6] + ": " +
    //                                value.BarcodeAnalytics.Data[6] +
    //                                "%</div></div>" +
    //                                '<div class="progress-bar bg-seventy" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[7] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[7] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[7] + ": " +
    //                                value.BarcodeAnalytics.Data[7] +
    //                                "%</div></div></div>" +
    //                                '<div class="progress-bar bg-eighty" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[8] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[8] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[8] + ": " +
    //                                value.BarcodeAnalytics.Data[8] +
    //                                "%</div></div></div>" +
    //                                '<div class="progress-bar bg-hundered" role="progressbar" style="width:' +
    //                                value.BarcodeAnalytics.Data[9] +
    //                                '%">' +
    //                                value.BarcodeAnalytics.Data[9] +
    //                                "%<div class='amerifragtooltip'>" + value.BarcodeAnalytics.Labels[9] + ": " +
    //                                value.BarcodeAnalytics.Data[9] +
    //                                "%</div></div></div>";


    //                            $("#bestbarcodeREC" + product_id).append(newrow);
    //                            $("#cat_useranly_rec" + product_id).text("AmeriFrag Barcode");


    //                        } else {
    //                            $("#bestbarcodeREC" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

    //                        }


    //                        //rating or reviews
    //                        var $starsContainer = $(".product_box").find(".stars" + product_id); // Find the .stars element within the new review
    //                        $starsContainer.empty();

    //                        if (value.rating >= 4.6 && value.rating >= 5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/5star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 4.1 && value.rating <= 4.5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/4.5star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 3.6 && value.rating <= 4) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/4star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 3.1 && value.rating <= 3.5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/3.5star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 2.6 && value.rating <= 3) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/3star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 2.1 && value.rating <= 2.5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/2.5star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 1.6 && value.rating <= 2) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/2star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 1.1 && value.rating <= 1.5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/1.5star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 0.6 && value.rating <= 1) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/1star.png" class="img-fluid">'
    //                            );
    //                        } else if (value.rating >= 0 && value.rating <= 0.5) {
    //                            $starsContainer.append(
    //                                '<img src="/images/stars/0.5star.png" class="img-fluid">'
    //                            );
    //                        } else {
    //                            $starsContainer.append("<span>No reviews</span>"); // Clear the stars container if the rating doesn't match any range
    //                        }
    //                    }
    //                }
    //            });
    //        }, error: function (error) {
    //            console.error("AJAX Error:", error);
    //            isLoading = false; // Reset loading flag on error
    //            hasMoreProducts = false; // Assume no more products on error
    //            if (!isLoadMore) {
    //                appendingNoProducts();
    //            }
    //        }
    //    });
    //    //cart
    //}


    //-------------------------------------------------------------------------------------------------//


    function getanalytics(isLoadMore = false) {
        if (isAnalyticsLoading || !hasMoreAnalyticsProducts) {
            return; // Prevent multiple simultaneous requests or if no more products
        }

        isAnalyticsLoading = true; // Set loading flag to true

        if (!isLoadMore) {
            analyticsSkip = 0; // Reset skip for initial load or new analytics request
            $("#productsdv").empty(); // Clear products only on initial load
            $("#noproductsdv").empty(); // Clear no products message
            currentUserProfileData = null; // Clear profile data for a fresh start
        }

        // First, try to get user profile data if not already cached
        const fetchProfileAndProducts = (profileData) => {
            const dataString = {
                "project_id": Project_Id, // Assuming Project_Id is global
                "firstname": profileData.firstname,
                "lastname": profileData.lastname,
                "name": profileData.email, // Using email for 'name' as per your original code
                "email": profileData.email,
                "gender": profileData.gender,
                "password": profileData.password,
                "phone": profileData.Phone,
                "qun1": profileData.qun1,
                "qun2": profileData.qun2,
                "qun3": profileData.qun3,
                "qun4": profileData.qun4,
                "qun5": profileData.qun5,
                "qun6": profileData.qun6,
                "qun7": profileData.qun7,
                "qun8": profileData.qun8,
                "qun9": profileData.qun9,
                "qun10": profileData.qun10
            };

            $.ajax({
                url: `https://api.americanfragrances.com/ProductAnalytics/GetProductsFromSimilarCustomers?take=${analyticsTake}&skip=${analyticsSkip}&customerId=${usersession}`, // Assuming usersession is global
                type: "GET",
                data: dataString,
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    // You were using selectpickerdata = data.OrderedProducts;
                    // Consider if you need this global variable, or if you should process it directly.
                    // For infinite scroll, appending directly is often better.

                    $("#analyticsheading").empty();
                    $("#analyticsheading").append("Your AI Recommendations");
                    $(".dv_title").empty();
                    $(".dv_title").append("AI Recommendations");

                    const productsDisplay = data.OrderedProducts;
                    var customerGender = profileData.gender === "Male" ? "Men" : (profileData.gender === "Female" ? "Women" : "Other");

                    const productsToDisplay = [];

                    // Loop through all products and filter by gender
                    for (let i = 0; i < productsDisplay.length; i++) {
                        const product = productsDisplay[i];
                        if (
                            (product.categoryname === 'Unisex' && (customerGender === 'Men' || customerGender === 'Women')) ||
                            product.categoryname === customerGender
                        ) {
                            productsToDisplay.push(product);
                        }
                    }
                    if (!productsToDisplay || productsToDisplay.length === 0) {
                        hasMoreAnalyticsProducts = false;
                        if (!isLoadMore && $("#productsdv").is(':empty')) {
                            appendingNoProducts(); // Your existing function
                        }
                    } else {
                        appendingResultdata(productsToDisplay); // Your existing function to append products
                        if (productsToDisplay.length < analyticsTake) {
                            hasMoreAnalyticsProducts = false;
                        } else {
                            analyticsSkip += analyticsTake; // Increment skip for next analytics request
                        }
                    }
                    isAnalyticsLoading = false; // Reset loading flag
                },
                failure: function (failureresp) {
                    console.error("AJAX Failure for Analytics Products:", failureresp);
                    isAnalyticsLoading = false;
                    hasMoreAnalyticsProducts = false;
                    if (!isLoadMore) { appendingNoProducts(); }
                },
                error: function (xhr) {
                    console.error("AJAX Error for Analytics Products:", xhr);
                    if (xhr.status === 401) {
                        window.location.href = "Home.html";
                        return;
                    }
                    isAnalyticsLoading = false;
                    hasMoreAnalyticsProducts = false;
                    if (!isLoadMore) { appendingNoProducts(); }
                }
            });
        };

        if (currentUserProfileData) {
            // If profile data is already cached, directly fetch products
            fetchProfileAndProducts(currentUserProfileData);
        } else {
            // If profile data is not cached, fetch it first
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id, // Assuming Authkey and Project_Id are global
                type: "GET",
                dataType: "JSON",
                crossDomain: true,
                success: function (profileData) {
                    currentUserProfileData = profileData; // Cache the profile data
                    fetchProfileAndProducts(profileData); // Proceed to fetch products
                },
                error: function (xhr) {
                    console.error("Error fetching user profile for analytics:", xhr);
                    isAnalyticsLoading = false;
                    hasMoreAnalyticsProducts = false;
                    if (!isLoadMore) { appendingNoProducts(); }
                }
            });
        }
    }



    function getproducts(style, note, mood, season, occasion, ageGroup, smellIntensity, longevity, sprayTime, presentation, brands, minPrice, maxPrice, minDiscount, maxDiscount, isLoadMore = false) {
        if (isLoading || !hasMoreProducts) {
            return; // Prevent multiple simultaneous requests or if no more products
        }

        isLoading = true; // Set loading flag to true

        // If it's not a "load more" call, reset skip and update currentFilters
        if (!isLoadMore) {
            skip = 0;
            $("#productsdv").empty(); // Clear products only on initial load or new filter
            $("#noproductsdv").empty(); // Clear no products message

            // Store the new filter values
            currentFilters = {
                style: style,
                note: note,
                mood: mood,
                season: season,
                occasion: occasion,
                ageGroup: ageGroup,
                smellIntensity: smellIntensity,
                longevity: longevity,
                sprayTime: sprayTime,
                presentation: presentation,
                brands: brands,
                minPrice: minPrice,
                maxPrice: maxPrice,
                minDiscount: minDiscount,
                maxDiscount: maxDiscount
            };
        } else {
            // For "load more" calls, use the stored filters
            style = currentFilters.style;
            note = currentFilters.note;
            mood = currentFilters.mood;
            season = currentFilters.season;
            occasion = currentFilters.occasion;
            ageGroup = currentFilters.ageGroup;
            smellIntensity = currentFilters.smellIntensity;
            longevity = currentFilters.longevity;
            sprayTime = currentFilters.sprayTime;
            presentation = currentFilters.presentation;
            brands = currentFilters.brands;
            minPrice = currentFilters.minPrice;
            maxPrice = currentFilters.maxPrice;
            minDiscount = currentFilters.minDiscount;
            maxDiscount = currentFilters.maxDiscount;
        }

        // Handle Sub_Category normalization (ensure Sub_Category is defined globally or passed)
        // Assuming Sub_Category, Category_name, Authkey, params, brand_name, type, appliedFilter, TesterGender, keyword, choice, Project_Id, label, labelHeading are defined in a scope accessible to this function.
        if (typeof Sub_Category !== 'undefined' && (Sub_Category === "Bath " || Sub_Category === "BATH ")) {
            Sub_Category = "BATH & BODY";
        }

        // Set price and discount from URL parameters if not provided as arguments
        // Only fetch from params if the values are not already defined by the function arguments
        if (minPrice === undefined || minPrice === null) {
            minPrice = params.get('minPrice');
            maxPrice = params.get('maxPrice');
            minDiscount = params.get('minDiscount');
            maxDiscount = params.get('maxDiscount');
        }


        const baseUrl = "https://api.americanfragrances.com/Home/FilterProducts";
        let url = baseUrl;
        let ajaxData = {};

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
            presentation: presentation,
        };

        // Clean object by removing undefined or null values
        Object.keys(filterObject).forEach(key => {
            if (filterObject[key] === undefined || filterObject[key] === null) {
                delete filterObject[key];
            }
        });

        // Determine the URL and ajaxData based on the active filter/category
        if (Category_name != null && Sub_Category == null && TesterGender == null) {
            url = baseUrl;
            ajaxData = filterObject;
        } else if (Sub_Category != null) {
            if (Sub_Category === "Clearance") {
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
        } else if (appliedFilter === false) { // Ensure appliedFilter is correctly scoped
            if (Category_name != null && TesterGender != null) {
                url = `https://api.americanfragrances.com/Home/TesterGenderSpecified?gender=${TesterGender}&take=${take}&skip=${skip}&customerId=${Authkey}`;
                ajaxData = null;
            } else if (keyword != null) {
                if (['luxury', 'timeless', 'celebrity', 'Clearance'].includes(keyword)) {
                    url = `https://api.americanfragrances.com/Home/ProductsByLTC?keyword=${keyword}&take=${take}&skip=${skip}&customerId=${Authkey}`;
                    ajaxData = null;
                } else {
                    url = `https://api.americanfragrances.com/Product/ProductsByKeyword?keyword=${keyword}&take=${take}&skip=${skip}&customerId=${Authkey}`;
                    ajaxData = null;
                }
            } else if (choice === "featureProducts") {
                url = `https://api.americanfragrances.com/Home/FeatureProductsAmerifragChoice?customerId=${Authkey}&take=${take}&skip=${skip}`;
                ajaxData = null;
            } else if (label != null) {
                url = `https://api.americanfragrances.com/ProductAnalytics/GetMatchedProductDetails?project_id=${Project_Id}&selectedOption=${label}&take=${take}&skip=${skip}&customerId=${Authkey}`;
                ajaxData = null;
            } else {
                url = `https://api.americanfragrances.com/ProductAnalytics/AllProduct?take=${take}&skip=${skip}&customerId=${Authkey}`;
                ajaxData = null;
            }
        } else {
            url = baseUrl;
            ajaxData = filterObject;
        }

        $.ajax({
            url: url,
            type: "POST",
            data: ajaxData,
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $(".dv_title").empty();
                // Logic to update the heading (assuming helper function is available)
                updateHeading(brand_name, label, labelHeading, Category_name, Sub_Category, type, keyword, choice);

                let productsToDisplay = [];
                if (data.SortedAndFilteredProducts) {
                    productsToDisplay = data.SortedAndFilteredProducts;
                } else if (data.MatchedProducts) {
                    productsToDisplay = data.MatchedProducts;
                } else if (data.Data) {
                    productsToDisplay = data.Data;
                } else if (data.SortedProducts) {
                    productsToDisplay = data.SortedProducts;
                } else if (data.Products) {
                    productsToDisplay = data.Products;
                }

                if (productsToDisplay.length === 0 || data.responseCode === 0 || data === 'fetched') {
                    hasMoreProducts = false;
                    if (!isLoadMore && $("#productsdv").is(':empty')) { // Only show "no products" if it's initial load and nothing was found
                        appendingNoProducts();
                    } else if (isLoadMore && productsToDisplay.length === 0) {
                        // If loading more and no new products, then no more products.
                        hasMoreProducts = false;
                    }
                } else {
                    appendingResultdata(productsToDisplay);
                    if (productsToDisplay.length < take) { // If fewer than 'take' products are returned, it means no more data
                        hasMoreProducts = false;
                    } else {
                        skip += take; // Increment skip for the next request
                    }
                }
                isLoading = false; // Reset loading flag
            },
            error: function (error) {
                console.error("AJAX Error:", error);
                isLoading = false; // Reset loading flag on error
                hasMoreProducts = false; // Assume no more products on error
                if (!isLoadMore) {
                    appendingNoProducts();
                }
            }
        });
    }

    // Helper function to update the heading (provided in previous response)
    function updateHeading(brand_name, label, labelHeading, Category_name, Sub_Category, type, keyword, choice) {
        let title = 'Products'; // Default title
        $(".dv_title").append(title)
        if (brand_name) {
            title = `<span> Featured Products: ${brand_name}</span>`;
            $(".dv_title").empty();
            $(".dv_title").append(brand_name)
        } else if (label) {
            title = `<span><strong>${labelHeading || 'Category'}: </strong>${label}</span>`;
            $(".dv_title").empty();
            $(".dv_title").append(label);
        } else if (Category_name != null && Sub_Category == null) {
            title = `<span>${Category_name} Fragrances </span>`;
            if (choice) {
                title = `<span>${Category_name} Fragrances: Amerifrag choice </span>`;
            }
        } else if (Sub_Category != null) {
            let displaySubCategory = Sub_Category.toLowerCase();
            if (displaySubCategory === "health") {
                displaySubCategory = "Health & Wellness";
            } else if (displaySubCategory === "bath ") {
                displaySubCategory = "Bath & Body";
            } else if (displaySubCategory === "bundle sets") {
                displaySubCategory = "Amerifrag Bundles";
            } else if (displaySubCategory === "testers") {
                displaySubCategory = "Minis";
            } else if (displaySubCategory === "fragrances") {
                displaySubCategory = "All Fragrances";
            }
            title = `<span>${displaySubCategory}</span>`;
            $(".dv_title").empty();
            $(".dv_title").append(displaySubCategory)
            if (Category_name != null) {
                title = `<span>${Category_name}: ${displaySubCategory}</span>`;
            }
        } else if (type != null) {
            let displayType = type;
            if (displayType === "Health") {
                displayType = "Health & Wellness";
            } else if (displayType === "Bath ") {
                displayType = "Bath & Body";
            }
            $(".dv_title").empty();
            $(".dv_title").append(displayType)
            title = `<span>${displayType}</span>`;
        } else if (keyword != null) {
            let displayKeyword = keyword;
            const keywordMap = {
                "toptrending": "Top Trending",
                "bestdeals": "Best Deals",
                "bestsellers": "Best Seller Fragrances",
                "toprated": "Top Rated Fragrances",
                "newarrivals": "New Arrival Fragrances",
                "clearence": "Clearance",
                "amerifragchoice": "AmeriFrag Choice",
                "luxury": "Luxury Collection",
                "timeless": "Timeless Collection",
                "celebrity": "Celebrity Collection"
            };
            title = `<span>${keywordMap[displayKeyword] || displayKeyword}</span>`;
            $(".dv_title").empty();
            $(".dv_title").append(displayKeyword)
        } else if (choice === "featureProducts") {
            title = '<span>Amerifrag’s Choice</span>';
            $(".dv_title").empty();
            $(".dv_title").append(title)
        }
        
        $("#analyticsheading").empty().append(title);
    }

    // Function to append "No Products Available" message (provided in previous response)
    function appendingNoProducts() {
        $("#noproductsdv").empty();
        $("#productsdv").empty(); // Ensure productsdv is empty when no products
        const newrowContent = '<center><img src="Images/empty_order.png" /><h6><b>" Currently, No Products are Available… "</b></h6></center>';
        $("#noproductsdv").append(newrowContent);
    }

    // Function to append product data to the display (provided in previous response)
    function appendingResultdata(newProducts) {
        $("#noproductsdv").empty();
        if (newProducts.length !== 0) {
            selectpickerdata = newProducts;
        };
        if ($('#productsdv').is(':empty')) {
            selectpickerdata = newProducts;
        }
        $.each(newProducts, function (Index, value) {
            const product_id = value.id;
            const salePrice = parseFloat(value.price).toFixed(2);
            const originalPrice = parseFloat(value.rate).toFixed(2);
            const categoryname = value.categoryname;
            let brandname = value.brandname || value.BrandName || '';
            const stockStatus = value.stock !== "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';

            const productHtml = `
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="product_box position-relative">
                    <div class="d-block position-relative">
                        <a class="d-block" href="Productview.html?id=${value.id}">
                            <img class="img-fluid w-100" src="${value.display_image}" alt="...">
                        </a>
                        <div class="product-overlay">
                            ${stockStatus}
                            <a class="btn" href="Productview.html?id=${value.id}" type="button">View Details</a>
                        </div>
                    </div>
                    <p class="text-center cat_useranly" id="cat_useranly${value.id}"></p>
                    <div class="barcode progress" id="barcode${value.id}"></div>
                    <p class="product_name">
                        ${value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name}
                        <span class="cat_icon">
                            ${categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person" ></i> <i class="fa-solid fa-person-dress"></i>'}
                        </span>
                    </p>
                    <p> <span>${value.mood || ''}</span> ${value.dimension || ''}</p>
                    <div class="row align-items-center">
                        <div class="">
                            <p class="brandnm">by <a href="show-all.html?brand=${brandname}"><b><u>${brandname}</u></b></a></p>
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="sale_price">$${salePrice}</div>
                        <div class="org_price"><strike>$${originalPrice}</strike></div>
                    </div>
                    <div class="recomededImgCon ${value.isfeature ? '' : 'd-none'}">
                        <img id="recomededImg" src="Images/ameriftagRecommendedIcon.png" />
                    </div>
                    <div class="wishlistIcon">
                        <i wishlistid="${value.wishlist_id || ''}" id="${product_id}" class="fa fa-heart whishlistPro" style="color: ${value.iswishlist ? 'rgb(201 58 60)' : '#fff'}"></i>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-6 d-flex justify-content-between">
                            <div class="discount_text">${value.discount || 0}% OFF Retail</div>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-end">
                            <div class="star stars${product_id}"></div>
                            <span class="reviews_count">&nbsp;(<span>${value.rating_count || 0}</span>)</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

            $("#productsdv").append(productHtml);

            // Barcode Analytics
            if (value.subcategoryname === "FRAGRANCES" || value.subcategoryname === "TESTERS") {
                const barcodeHtml = `
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
                $("#barcode" + product_id).append(barcodeHtml);
                $("#cat_useranly" + product_id).text("AmeriFrag Barcode");
            } else {
                $("#barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');
            }

            // Rating/Reviews
            const $starsContainer = $(".product_box.position-relative").last().find('.stars' + product_id);
            $starsContainer.empty();
            const rating = value.rating;
            if (rating >= 4.6 && rating <= 5) {
                $starsContainer.append('<img src="/images/stars/5star.png" class="img-fluid">');
            } else if (rating >= 4.1 && rating <= 4.5) {
                $starsContainer.append('<img src="/images/stars/4.5star.png" class="img-fluid">');
            } else if (rating >= 3.6 && rating <= 4) {
                $starsContainer.append('<img src="/images/stars/4star.png" class="img-fluid">');
            } else if (rating >= 3.1 && rating <= 3.5) {
                $starsContainer.append('<img src="/images/stars/3.5star.png" class="img-fluid">');
            } else if (rating >= 2.6 && rating <= 3) {
                $starsContainer.append('<img src="/images/stars/3star.png" class="img-fluid">');
            } else if (rating >= 2.1 && rating <= 2.5) {
                $starsContainer.append('<img src="/images/stars/2.5star.png" class="img-fluid">');
            } else if (rating >= 1.6 && rating <= 2) {
                $starsContainer.append('<img src="/images/stars/2star.png" class="img-fluid">');
            } else if (rating >= 1.1 && rating <= 1.5) {
                $starsContainer.append('<img src="/images/stars/1.5star.png" class="img-fluid">');
            } else if (rating >= 0.6 && rating <= 1) {
                $starsContainer.append('<img src="/images/stars/1star.png" class="img-fluid">');
            } else if (rating >= 0 && rating <= 0.5) {
                $starsContainer.append('<img src="/images/stars/0.5star.png" class="img-fluid">');
            } else {
                $starsContainer.append('<span>No reviews</span>');
            }
        });
    }

    // --- Scroll Event Listener ---
    $(window).scroll(function () {
        const scrollThreshold = 0.9; // Trigger when 90% of the document is scrolled
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        if (scrollTop + windowHeight >= documentHeight * scrollThreshold) {
            // This 'if (getname == 'products')' condition is critical.
            // Ensure 'getname' is set globally in your application to indicate
            // whether you are currently displaying "products" (from getproducts)
            // or "analytics" (from getanalytics).
            // For example, if a user clicks a "View Recommendations" button, you would set getname = 'analytics'.
            // If they click a "Browse All Products" button, you'd set getname = 'products'.

            if (getname === 'multi-analytics') {
                getProductsBasedonSelection(true); // Load more Multi-Analytics products
            } else if (getname === 'products') { // Use '===' for strict comparison
                getanalytics(true); // Pass true to indicate it's a load more call for analytics
            } else { // Assuming 'products' is the default or general case
                getproducts(
                    currentFilters.style,
                    currentFilters.note,
                    currentFilters.mood,
                    currentFilters.season,
                    currentFilters.occasion,
                    currentFilters.ageGroup,
                    currentFilters.smellIntensity,
                    currentFilters.longevity,
                    currentFilters.sprayTime,
                    currentFilters.presentation,
                    currentFilters.brands,
                    currentFilters.minPrice,
                    currentFilters.maxPrice,
                    currentFilters.minDiscount,
                    currentFilters.maxDiscount,
                    true
                );
            }
            // You might have other conditions for other types of lists here if needed.
        }
    });
    // --- Initial Call (Example) ---
    // This is how you would call getproducts when the page first loads or
    // when a user applies new filters from your UI (e.g., a filter button click).
    // Ensure these variables are defined in your broader script.
    //$(document).ready(function () {
    //    // Example initial call with some dummy values or values fetched from URL/UI
    //    // You'll need to replace these with actual values from your page's context.
    //    // For a brand page, brand_name would be defined, others might be undefined.
    //    // For a category page, Category_name would be defined, etc.
    //    if (getname == 'products') {

    //    } else if (keyword) {
    //        hasMoreProducts = true;
            
    //    }
    //    else {
    //        getproducts(
    //            undefined, // style
    //            undefined, // note
    //            undefined, // mood
    //            undefined, // season
    //            undefined, // occasion
    //            undefined, // ageGroup
    //            undefined, // smellIntensity
    //            undefined, // longevity
    //            undefined, // sprayTime
    //            undefined, // presentation
    //            undefined, // brands (or brand_name if available globally)
    //            undefined, // minPrice
    //            undefined, // maxPrice
    //            undefined, // minDiscount
    //            undefined, // maxDiscount
    //            false      // isLoadMore: false for initial load
    //        );
    //    }

    //});


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
        if (Sub_Category) {
            window.location.href = "show-all.html?sub_cat=" + Sub_Category;
        } else {
            window.location.reload();
        }
    });
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
    // Apply filters

    $(document).on("click", "#applyFilters", function () {
        // Collect all filter values
        appliedFilter = true; // This variable should ideally be part of your global filter state too if used elsewhere.
        // var skip = 0; // 'skip' is managed by the global skip variable in getproducts now.

        var selectedBrands = $('input[name="brands"]:checked').map(function () {
            return this.value;
        }).get().join(',');

        var selectedStyle = $('input[data-type="STYLE"]:checked').val() || undefined; // Use undefined for no selection
        var selectedNote = $('input[data-type="NOTE"]:checked').val() || undefined;
        var selectedMood = $('input[data-type="MOOD"]:checked').val() || undefined;
        var selectedSeason = $('input[data-type="SEASON"]:checked').val() || undefined;
        var selectedOccasion = $('input[data-type="OCCASION"]:checked').val() || undefined;
        var selectedAgeGroup = $('input[data-type="AGE GROUP"]:checked').val() || undefined;
        var selectedSmellIntensity = $('input[data-type="SMELL INTENSITY"]:checked').val() || undefined;
        var selectedLongevity = $('input[data-type="LONGEVITY"]:checked').val() || undefined;
        var selectedSprayTime = $('input[data-type="SPRAY TIME"]:checked').val() || undefined;
        var selectedPresentation = $('input[data-type="PRESENTATION"]:checked').val() || undefined;

        // Price and Discount values are already assigned to local variables here
        var minPrice = $("#minp").val(); // Using 'var' to make them local for clarity
        var maxPrice = $("#maxp").val();
        var minDiscount = $("#minpercen").val();
        var maxDiscount = $("#maxpercen").val();
        hasMoreProducts = true;
        getname = "";
        // Call getproducts with the COLLECTED LOCAL VARIABLES
        getproducts(
            selectedStyle,
            selectedNote,
            selectedMood,
            selectedSeason,
            selectedOccasion,
            selectedAgeGroup,
            selectedSmellIntensity,
            selectedLongevity,
            selectedSprayTime,
            selectedPresentation,
            selectedBrands,
            minPrice,
            maxPrice,
            minDiscount,
            maxDiscount,
            false // This is an initial load/new filter, so isLoadMore is false
        );

        // Optionally, hide the filter div after applying filters
        // $("#applyfiltersdiv").attr('style', 'display: none !important'); // Or call toggleFilterDiv()
    });
    function renderProducts(data) {
        var productList = $("#productsdv");
        productList.empty();

        for (const value of data) {
            var product_id = value.id;

            var salePrice = parseFloat(value.price).toFixed(2);
            var originalPrice = parseFloat(value.rate).toFixed(2);
            var categoryname = value.categoryname;
            var stockStatus = value.stock != "0" ? '<a class="btn cartbtn" data="' + value.id + '" type="button">Add to cart</a>' : '<span class="btn out-of-stock-label">Sold Out</span>';


            if (value.brandname != undefined) {
                productList.append('<div class="col-md-6 col-lg-4  col-sm-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' + value.id + '"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn"  href="Productview.html?id=' + value.id + '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '"></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.brandname + '"><b><u>' + value.brandname + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>');
            } else {
                productList.append('<div class="col-md-6 col-lg-4  col-sm-6"><div class="product_box position-relative"><div class="d-block position-relative"><a class="d-block" href="Productview.html?id=' + value.id + '"><img class="img-fluid w-100" src="' + value.display_image + '" alt="..."></a><div class="product-overlay">' + stockStatus + '<a class="btn"  href="Productview.html?id=' + value.id + '" type="button">View Details</a></div></div><p class="text-center cat_useranly" id="cat_useranly' + value.id + '"></p><div class="barcode progress" id="barcode' + value.id + '" ></div><p class="product_name">' + (value.name.length > 20 ? value.name.substring(0, 20) + "..." : value.name) + '<span class="cat_icon">' + (categoryname === "Women" ? '<i class="fa-solid fa-person-dress"></i>' : categoryname === "Men" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i>') + '</span></p><p> <span>' + value.mood + '</span> ' + value.dimension + '</p><div class="row align-items-center"><div class=" "><p class="brandnm">by <a href="show-all.html?brand=' + value.BrandName + '"><b><u>' + value.BrandName + '</u></b></a></p></div></div><div class="col-md-12 d-flex justify-content-center"><div class="sale_price">$' + salePrice + '</div><div class="org_price"><strike>$' + originalPrice + '</strike></div></div><div class="recomededImgCon ' + (value.isfeature ? '' : 'd-none') + '"><img id="recomededImg"  src="Images/ameriftagRecommendedIcon.png" /></div><div class="wishlistIcon"><i wishlistid="' + value.wishlist_id + '" id="' + product_id + '" class="fa fa-heart whishlistPro" style="color: ' + (value.iswishlist ? 'rgb(201 58 60)' : '#fff') + '"></i></div><div class="row align-items-center"><div class="col-md-6 d-flex justify-content-between"><div class="discount_text">' + value.discount + '% OFF Retail</div></div><div class="col-md-6 d-flex align-items-center justify-content-end"><div class="star stars' + product_id + '"></div><span class="reviews_count">&nbsp;(<span>' + value.rating_count + '</span>)</span></div></div></div></div>');
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
                $("#barcode" + product_id).addClass("d-flex flex-row justify-content-center align-items-center  savebig").append('<div><h5 class="websiteBlue mb-0">Save Big!</h5></div>');

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
                            async: true,
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
                            async: true,
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
        };


    }
    //---------------------------------end shop by sale-------------------------------//
    function cart_count(cartid) {
        if (cartid) {

            $.ajax({
                url: "https://api.americanfragrances.com/Cart/Cartcount?project_id=" + Project_Id + "&cart_id=" + cartid,
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                success: function (data) {

                    $(".cart_count").html(data);
                }
            });

        }

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
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
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
            async: true,
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
        getproducts()
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
                async: true,
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
            async: true,
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
    function cartupadtion(prod_id) {
        var prod_id = prod_id
        //var qty = $("input[id =" + prod_id + "]").val();
        //var prev = $(this).parent().prev().find('input[type=number]');
        //var qty = $(prev).val();
        var qty = "1";
        cart_id = localStorage.getItem("cart_id");
        if (qty) {
            $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
            if (cart_id) {
                console.log("Update");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        cart_id: cart_id,
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                    },
                    dataType: "JSON",
                    async: true,
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
                    },
                });
            } else {
                console.log("add");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                    },
                    dataType: "JSON",
                    async: true,
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
                    },
                });
            }
        } else {
            $("input[id =" + prod_id + "]").css("border", "solid 1px red");
        }
    }
    "#anlyproductsdv .cartbtn"
    $(document).on("click", "#productsdv .cartbtn", function () {
        var prod_id = $(this).attr("data");
        cartupadtion(prod_id);
    });

    $(document).on("click", "#anlyproductsdv .cartbtn", function () {
        var prod_id = $(this).attr("data");
        cartupadtion(prod_id);
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


    const sidebarWidth = sidebar.offsetWidth;

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
