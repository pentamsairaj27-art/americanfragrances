function GlobalInputs() {
    var ProjectID = "44D84293-37E2-4665-A4C4-5EB535EC808A";
    return ProjectID;
}
let Authkey = localStorage.getItem("authorid");
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
var ProjectAdminAuth = localStorage.getItem("AdminMyprofile");
var ProjectEmployeeAuth = localStorage.getItem("EmplyeeMyprofile");

$(document).ready(function () {
    $('body').addClass('loading');
    var progress = 0;
    var interval = setInterval(function () {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        $('.progress-bar').css('width', progress + '%');
        if (progress === 100) clearInterval(interval);
    }, 500);
});

$(window).on('load', function () {
    $('.progress-bar').css('width', '100%');
    setTimeout(function () {
        $('body').removeClass('loading');
        $('#preloader').addClass('fade-out');
        setTimeout(function () {
            $('#preloader').hide();
        }, 300);
    }, 500);
});

if (ProjectAuth) {
    if (ProjectAdminAuth) {
        getActivities();
    }
    else {
        var Projectid = GlobalInputs();
        $.ajax({
            url: "https://api.americanfragrances.com/Employee/Edit?id=" + ProjectAuth + "&project_id=" + Projectid + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                var Role = data.role_id;
                $.ajax({
                    url: "https://api.americanfragrances.com/Role/AssignactivitylistByRole?project_id=" + Projectid + "&authorid=" + ProjectAuth + "&roleid=" + Role,
                    type: "GET",
                    dataType: "JSON",
                    async: true,
                    crossDomain: true,
                    success: function (data) {
                        $("#leftmenu").empty();
                        $.each(data, function (Index, value) {
                            var newrowContent = '<a href="' + value.ActivityUrl + '" class="dashboard_btn"><p><table><tr><td><span class="iconify dashboard_icons" data-icon="teenyicons:bag-plus-outline" data-inline="false"></span></td> <td>' + value.ActivityName + '</td></tr></table></p></a>'
                            $("#leftmenu").append(newrowContent);
                        });

                    }
                });
            }
        });
    }

}

function Navbar() {
    var AdminEmail = localStorage.getItem("Admin_email");
    var Name;
    $(".dvnav").empty();
    if (AdminEmail != null || AdminEmail != undefined) {
        Name = AdminEmail;
        //<div class="dropdown_Ad"> <a href="../Vendor/Myprofile.html"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="codicon:lock" data-inline="false"></span> </td> <td>Change Password</td> </tr> </table> </a> </div> <hr />
        var NavBar = '<nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top"> <a class="navbar-brand" href="../Admin/admin_dashboard.html"><img src="../Images/logo.png"></a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="collapsibleNavbar"> <ul class="navbar-nav"> <li class="nav-item"> <a class="nav-link" href="#"> </a> </li> <li class="nav-item"> <a class="nav-link" href="../Admin/admin_dashboard.html">Admin Panel</a> </li> </ul> <ul class="navbar-nav ml-auto"> <li class="nav-item"> <div class="dropdown"> <div class="" id="dropdownMenuButton" data-toggle="dropdown" style=" border: none"> <a class="nav-link" href="#"> Hello, ' + Name + ' <img class="profile_img" src="../Images/avatar.jpg" width="30" height="30" /> </a> </div> <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"> <div class="dropdown_Ad"> <a href="../Admin/Myprofile.html"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="bi:person" data-inline="false"></span> </td> <td>View Profile</td> </tr> </table> </a> </div> <hr /> <div class="dropdown_Ad"> <a href="../Admin/login.html" id="btnlogout"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="ri:logout-circle-line" data-inline="false"></span> </td> <td>Logout</td> </tr> </table> </a> </div> </div> </div> </li> </ul> </div> </nav>'
        $(".dvnav").append(NavBar);
    }

    else {
        Navbar_employee();
    }
}

function Navbar_employee() {

    var Employeeemail = localStorage.getItem("Employee_email");
    var Name;
    $(".dvnav").empty();
    if (Employeeemail != null || Employeeemail != undefined) {
        Name = Employeeemail;
        var NavBar = '<nav class="navbar navbar-expand-sm sticky-top header"> <a class="navbar-brand" href="#"><img src="images/logo.png"></a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="collapsibleNavbar"> <ul class="navbar-nav"> <li class="nav-item"> <a class="nav-link" href="#"> </a> </li> <li class="nav-item"> <a class="nav-link" href="#">Employee Panel</a> </li> </ul> <ul class="navbar-nav ml-auto"> <li class="nav-item"> <div class="dropdown"> <div class="" id="dropdownMenuButton" data-toggle="dropdown" style=" border: none"> <a class="nav-link" href="#"> Hello, ' + Name + ' <img class="profile_img" src="../../Images/avatar.jpg" width="30" height="30" /> </a> </div> <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"> <div class="dropdown_Ad"> <a href="../Admin/Myprofile.html"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="bi:person" data-inline="false"></span> </td> <td>View Profile</td> </tr> </table> </a> </div> <hr /> <div class="dropdown_Ad"> <a href="../Admin/Myprofile.html?req=restpsd"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="codicon:lock" data-inline="false"></span> </td> <td>Change Password</td> </tr> </table> </a> </div> <hr /> <div class="dropdown_Ad"> <a href="../../Admin/Login.html" id="btnlogout"> <table> <tr> <td><span class="iconify dropdown_icons" data-icon="ri:logout-circle-line" data-inline="false"></span> </td> <td>Logout</td> </tr> </table> </a> </div> </div> </div> </li> </ul> </div> </nav>'
        $(".dvnav").append(NavBar);

    }
    else {

        window.location = "/Admin/Login.html"
    }
}
$(document).ready(function () {
    var cust_auth = localStorage.getItem("authorid");
    if (cust_auth) {
        wishlist_count(cust_auth);
    }
    function wishlist_count(cust_auth) {
        if (cust_auth) {
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=" + Project_Id + "&authorid=" + cust_auth,
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

$(document).ready(function () {
    console.log("🔥 WISHLIST HEART ICONS - STARTING...");

    var Project_Id = GlobalInputs();
    var cust_auth = localStorage.getItem("authorid");

    console.log("👤 Customer ID:", cust_auth);
    console.log("📦 Project ID:", Project_Id);

    if (!cust_auth) {
        console.log("❌ User not logged in - wishlist disabled");
        return;
    }

    var isLoadingWishlist = false;

    // Setup click handler for wishlist hearts
    $(document).off('click', '.whishlistPro, .whishlistProCart');
    $(document).on('click', '.whishlistPro, .whishlistProCart', function (e) {
        debugger;
        e.preventDefault();
        console.log("💗 WISHLIST HEART CLICKED!");

        var $heart = $(this);
        var prod_id = $heart.attr('id') || $heart.attr('data');
        var wishlist_id = $heart.attr('wishlistid');

        console.log("🆔 Product ID:", prod_id);
        console.log("🔖 Wishlist ID:", wishlist_id);

        // Prevent double-clicks
        if ($heart.hasClass('processing')) {
            console.log("⏳ Already processing...");
            return false;
        }
        $heart.addClass('processing');

        var Project_Id = GlobalInputs();
        var cust_auth = localStorage.getItem("authorid");

        // Check if product is in wishlist
        var isInWishlist = (wishlist_id && wishlist_id !== '' && wishlist_id !== 'undefined' && wishlist_id !== 'null');

        console.log("🔍 Is in wishlist?", isInWishlist);

        if (isInWishlist) {
            // REMOVE from wishlist
            console.log("🗑️ REMOVING FROM WISHLIST... ID:", wishlist_id);
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Delete",
                type: "POST",
                data: {
                    project_id: Project_Id,
                    id: wishlist_id,
                    authorid: cust_auth
                },
                dataType: "JSON",
                success: function (response) {
                    console.log("📥 Remove Response:", response);

                    if (response.responseCode == 1) {
                        debugger;
                        $heart.css('color', 'rgb(0, 0, 0)');
                        $heart.removeAttr('wishlistid');


                        showWishlistNotification('Product Successfully Removed From Wishlist');

                        $.ajax({
                            url: "https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=" + Project_Id + "&authorid=" + cust_auth,
                            type: "GET",
                            dataType: "JSON",
                            crossDomain: true,
                            success: function (data) {
                                $(".wishlist_count").html(data);
                                console.log("🔢 Updated count:", data);
                            }
                        });
                    } else {
                        console.error("❌ Remove FAILED:", response.responsemessage);
                    }
                    $heart.removeClass('processing');
                }

            });
        } else {
            // ADD to wishlist
            console.log("➕ ADDING TO WISHLIST...");
            $.ajax({
                url: "https://api.americanfragrances.com/ProductAnalytics/Create",
                type: "POST",
                data: {
                    project_id: Project_Id,
                    product_id: prod_id,
                    authorid: cust_auth
                },
                dataType: "JSON",
                success: function (response) {
                    console.log("📥 Add Response:", response);

                    if (response.responseCode == 1) {
                        // IMPORTANT FIX: Use response.id instead of response.cart_id
                        var wishlistId = response.id;

                        $heart.attr('wishlistid', wishlistId);
                        $heart.css('color', 'rgb(201, 58, 60)');

                        console.log("✅ ADDED - wishlistid SET TO:", wishlistId);

                        showWishlistNotification('Product Successfully Added To Wishlist');

                        $.ajax({
                            url: "https://api.americanfragrances.com/ProductAnalytics/Wishlistcount?project_id=" + Project_Id + "&authorid=" + cust_auth,
                            type: "GET",
                            dataType: "JSON",
                            crossDomain: true,
                            success: function (data) {
                                $(".wishlist_count").html(data);
                                console.log("🔢 Updated count:", data);
                            }
                        });
                        $heart.removeClass('processing');
                    }
                    else if (response.responseCode == 0) {
                        showWishlistNotification('Product Already Added To Wishlist');
                        $heart.removeClass('processing');
                    }

                }

            });
        }

        return false;
    });

    console.log("✅ Wishlist click handler registered");

    // Wait for products to load, then load wishlist state
    var loadAttempts = 0;
    var maxAttempts = 20;
    var wishlistLoaded = false;

    function tryLoadWishlist() {
        if (wishlistLoaded || isLoadingWishlist) {
            console.log("⏸️ Wishlist already loaded or loading, skipping...");
            return;
        }

        loadAttempts++;
        console.log(`🔄 Attempt ${loadAttempts}/${maxAttempts} to load wishlist...`);

        var hearts = $('.whishlistPro, .whishlistProCart');

        if (hearts.length > 0) {
            console.log(`✅ Found ${hearts.length} hearts - loading wishlist state`);
            wishlistLoaded = true;
            loadWishlistHeartStates(cust_auth);
        } else if (loadAttempts < maxAttempts) {
            console.log(`⚠️ No hearts yet, will retry in 300ms...`);
            setTimeout(tryLoadWishlist, 300);
        } else {
            console.log(`⚠️ Gave up after ${maxAttempts} attempts`);
        }
    }

    setTimeout(tryLoadWishlist, 500);

    // Function to load wishlist hearts
    function loadWishlistHeartStates(cust_auth) {
        if (!cust_auth || isLoadingWishlist) {
            return;
        }

        isLoadingWishlist = true;
        console.log("📡 Loading wishlist from API...");

        var Project_Id = GlobalInputs();

        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/Index?project_id=" + Project_Id + "&authorid=" + cust_auth,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log("✅ WISHLIST DATA:", data);
                console.log("📊 Total items:", data ? data.length : 0);

                var $hearts = $('.whishlistPro, .whishlistProCart');
                console.log("💖 Hearts found:", $hearts.length);

                if ($hearts.length === 0) {
                    console.log("⚠️ No hearts on page");
                    isLoadingWishlist = false;
                    return;
                }

                $hearts.css('color', '#000');
                $hearts.removeAttr('wishlistid');
                console.log("🔄 All hearts → BLACK");

                if (!data || data.length === 0) {
                    console.log("ℹ️ Wishlist empty");
                    isLoadingWishlist = false;
                    return;
                }

                // Color wishlist items RED
                var redCount = 0;
                $.each(data, function (i, item) {
                    var productId = item.product_id;
                    var wishlistId = item.id;

                    var $matchingHearts = $('.whishlistPro[id="' + productId + '"], .whishlistProCart[id="' + productId + '"], .whishlistProCart[data="' + productId + '"]');

                    if ($matchingHearts.length > 0) {
                        $matchingHearts.css('color', 'rgb(201, 58, 60)');
                        $matchingHearts.attr('wishlistid', wishlistId);
                        redCount++;
                        console.log(`❤️ RED: Product ${productId}, Wishlist ID: ${wishlistId}`);
                    }
                });

                console.log(`✅ Total RED: ${redCount}/${data.length}`);
                isLoadingWishlist = false;
            },
            error: function (xhr, status, error) {
                console.error("❌ Wishlist API Error:", error);
                isLoadingWishlist = false;
            }
        });
    }

    // Make functions globally accessible
    window.loadWishlistHeartStates = function () {
        if (!isLoadingWishlist) {
            loadWishlistHeartStates(cust_auth);
        }
    };

    window.refreshWishlistHearts = function () {
        var cust_auth = localStorage.getItem("authorid");
        if (cust_auth && !isLoadingWishlist) {
            console.log("🔄 Manual refresh triggered");
            loadWishlistHeartStates(cust_auth);
        }
    };
});

// Function to show wishlist notifications
function showWishlistNotification(message) {
    $('#wishlist-notification-bar').remove();

    var notificationBar = $('<div id="wishlist-notification-bar"></div>');
    notificationBar.text(message);
    notificationBar.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'background-color': '#000000',
        'color': '#ffffff',
        'text-align': 'center',
        'padding': '15px 20px',
        'font-size': '16px',
        'font-weight': '600',
        'letter-spacing': '0.5px',
        'z-index': '999999',
        'box-shadow': '0 2px 10px rgba(0,0,0,0.3)',
        'transform': 'translateY(-100%)',
        'transition': 'transform 0.4s ease-in-out',
        'font-family': 'Arial, sans-serif'
    });

    $('body').prepend(notificationBar);

    setTimeout(function () {
        notificationBar.css('transform', 'translateY(0)');
    }, 10);

    setTimeout(function () {
        notificationBar.css('transform', 'translateY(-100%)');
        setTimeout(function () {
            notificationBar.remove();
        }, 400);
    }, 3000);
}

window.showWishlistNotification = showWishlistNotification;
var list = "";

getcategorynames();
function getcategorynames() {
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {

            i = 0;
            //$("#dvappend").empty();
            //$("#divsubmenu").empty();
            $.each(data, function (Index, value) {
                var sublist = "";
                $.ajax({
                    url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id + "&categoryid=" + value.id + "",
                    type: "GET",
                    dataType: "JSON",
                    async: true,
                    crossDomain: true,
                    success: function (response) {
                        $.each(data, function (ind, values) {
                            //if (value.isfeature == true) {
                            sublist += '<li><a href="show-all.html?cat=' + value.name + '&subcat=' + values.name + '">' + values.name + '</a></li>'
                            //}
                        });
                    }
                });
                list += '<div class="col-lg-3 col-6"><div class="col-megamenu"><h6 id="' + value.id + '" class="title">' + value.name + '</h6><ul class="list-unstyled">' + sublist + '</ul></div></div>'

            });
        }
    });

};

//var Category_Id = params.get('id');
//getdatatable();

var newrowContent = '<div class="row g-3">' + list + '</div>'
$(".dvfooter").append(newrowContent);
footer();
function footer() {
    var footer =
        "<section class='mb-5 pt-5 d-none'>" +
        "<div class='container signup-section'>" +
        "<form action='#'>" +
        "<div class='row gy-3 align-items-center'>" +
        "<div class='col-lg-4 m-0 p-0'>" +
        "<p class='sub-heading m-0' style='color:#000; font-weight:700'>SIGN UP FOR SPECIAL OFFERS & PROMOTIONS</p>" +
        "</div>" +
        "<div class='col-lg-4 m-0 ps-2'>" +
        "<div class='input-group'>" +
        "<input class='form-control' type='tel' placeholder='Mobile Number' aria-describedby='button-addon2'>" +
        "</div>" +
        "</div>" +
        "<div class='col-lg-4 p-0 m-0 ps-2'>" +
        "<div class='input-group'>" +
        "<input class='form-control' type='email' placeholder='Your Email Address' aria-describedby='button-addon2'>" +
        "<button class='btn btn-dark' type='submit'>SUBSCRIBE</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</form>" +
        "</div>" +
        "</section>" +
        "<div class='pt-4 footer-menu-section' style='background-color:#70b4bd;'>" +
        "<div class='container'>" +
        "<div class='row py-5'>" +
        "<div class='col-md-6'>" +
        "<div class='row'>" +
        "<div class='col-md-6 mb-3 mb-md-0'>" +
        "<h6 class='text-uppercase mb-3'>Customer services</h6>" +
        "<ul class='list-unstyled mb-0'>" +
        "<li><a class='footer-link' href='FAQs.html'>FAQ’s</a></li>" +
        "<li><a class='footer-link' href='Returnpolicy.html'>Return Policy</a></li>" +
        "<li><a class='footer-link' href='shippingpolicy.html'>Shipping Policy</a></li>" +
        "<li><a class='footer-link' href='Disclosure Policy.html'>Disclosure Policy</a></li>" +
        "<li><a class='footer-link' href='AccessibilityPolicy.html'>Accessibility Policy</a></li>" +
        "<li><a class='footer-link' href='Contact.html'>Contact Us & Help</a></li>" +
        "</ul>" +
        "</div>" +
        "<div class='col-md-6 mb-3 mb-md-0'>" +
        "<h6 class='text-uppercase mb-3'>Offers and Partnerships</h6>" +
        "<ul class='list-unstyled mb-0'>" +
        "<li><a class='footer-link' href='WholesaleDiscounts.html'>Wholesale Discounts</a></li>" +
        "<li><a class='footer-link' href='CorporateGiftsets.html'>Corporate Giftsets</a></li>" +
        "<li><a class='footer-link' href='AffiliateProgram.html'>Affiliate Program</a></li>" +
        "<li><a class='footer-link' href='SellonAmerifrag.html'>Sell on Amerifrag</a></li>" +
        "<li><a class='footer-link' href='DropShipping.html'>Drop Shipping</a></li>" +
        "<li><a class='footer-link' href='RewardPoints.html'>Reward Points</a></li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<div class='row'>" +
        "<div class='col-md-6 mb-3 mb-md-0'>" +
        "<h6 class='text-uppercase mb-3'>CONNECT WITH US</h6>" +
        "<ul class='list-unstyled mb-0'>" +
        "<li><a class='footer-link' href='https://www.instagram.com/amerifrag/' target='_blank' rel='noopener noreferrer'>Instagram</a></li>" +
        "<li><a class='footer-link' href='https://www.facebook.com/profile.php?id=61574661672918&sk=about' target='_blank' rel='noopener noreferrer'>FaceBook</a></li>" +
        "<li><a class='footer-link' href='#!' target='_blank' rel='noopener noreferrer'>X</a></li>" +
        "<li><a class='footer-link' href='https://www.youtube.com/channel/UCPVjqREc8MwKjyPf2osF4ag' target='_blank' rel='noopener noreferrer'>YouTube</a></li>" +
        "<li><a class='footer-link' href='https://www.pinterest.com/AmeriFrag/_saved/' target='_blank' rel='noopener noreferrer'>Pinterest</a></li>" +
        "<li><a class='footer-link' href='#!' target='_blank' rel='noopener noreferrer'>WhatsApp</a></li>" +
        "</ul>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<h6 class='text-uppercase mb-3'>Payment methods</h6>" +
        "<div class='row'>" +
        "<div class='col-4 p-2'><img src='../assets/images/amazonpay.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/master.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/clover.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/visa.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/paypal.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/rupay.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/quickbook.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/clover.png' width='80%'></div>" +
        "<div class='col-4 p-2'><img src='../assets/images/paypal.png' width='80%'></div>" +
        "</div><br><div class='row text-center'> <div><a class='btn amerifragStudio amerifrags_sub' href='/AmerifragBlog.html'>AmeriFrag STUDIO</a></div></div >" +
        "</div>" +
        "</div>" +
        "</div>" +

        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='border-top pt-3 pb-2 px-5 footerdv' style='border-color:#70b4bd!important; background-color:#000000;'>" +
        "<div class='container-fuild'>" +
        "<div class='d-inline d-md-flex d-lg-flex align-items-center justify-content-between'>" +
        "<div class='text-center text-md-start d-flex'>" +
        "<div class='row'>" +
        "<div class='col-sm-12 col-md-12'>" +
        "<div class='d-flex'>" +
        "<div class='footer-menu-div'><a href='DISCLAIMERS.html'>DISCLAIMERS</a></div>" +
        "<div class='footer-menu-div'><a href='termsandconditions.html'>TERMS AND CONDITIONS</a></div>" +
        "<div class='footer-menu-div'><a href='privacypolicy.html'>PRIVACY POLICY</a></div>" +
        "<div class='footer-menu-div'><a href='COOKIES.html'>COOKIES</a></div>" +
        "<div class='Careers'><a href='about.html'>ABOUT US</a></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='mb-md-0 row'>" +
        "<div class='col-md-6' id='playstore'>" +
        "<a target='_blank' href='https://play.google.com/store/apps'><img src='../assets/images/vecteezy_google-play-store-download-button-in-white-colors-download_12871364.png' class='img-fluid' width='200'></a>" +
        "</div>" +
        "<div class='col-md-6' id='appstore'>" +
        "<a target='_blank' href='https://www.apple.com/in/app-store/'><img src='../assets/images/vecteezy_app-store-download-button-in-white-colors-download-on-the_12871374.png' class='img-fluid' width='200'></a>" +
        "</div>" +
        "</div>" +
        "<div class='text-center text-md-end'>" +
        "<p class='mb-0 copyright'>COPY RIGHTS @2025 AMERICAN FRAGRANCES , LLC</p>" +
        "</div>" +
        "</div>" +
        // "<div class='row'>"+
        //     "<div class='d-flex justify-content-center'>"+
        //         "<div><a href='#'><i class='fa-brands fa-facebook fa-2x me-3'></i></a></div>"+
        //         "<div><a href='#'><i class='fa-brands fa-instagram fa-2x me-3'></i></a></div>"+
        //         "<div><a href='#'><i class='fa-brands fa-youtube fa-2x me-3'></i></a></div>"+
        //         "<div><a href='#'><i class='fa-brands fa-twitter fa-2x me-3'></i></a></div>"+
        //     "</div>"+
        // "</div>"+ 
        "</div>" +
        "</div>";
    $("#footer").append(footer);
}
function Footerdv() {
    $(".dvnavdeliveryboy").empty();



    var copysection = '<div class="container-fluid copyrights"><div class="row"><div class="col-md-4"><p class="copy-text m-0">Copywrite reserves | American Fragnance 2020</p></div><div class="col-md-5"><img src="img/footer/image 4.png" class="img-fluid"></div><div class="col-md-2"><a href="#"><img src="img/footer/Vector.png" class="img-fluid"></a><a href="#" class="vector-border" style="background:url(img/footer/border.png)"><img src="img/footer/twitter.png" class="img-fluid"></a><a href="#" class="vector-border" style="background:url(img/footer/border.png)"><img src="img/footer/Vector (1).png" class="img-fluid"></a></div></div></div>'
    $(".copyrights").append(copysection);
}

function customernavdv() {
    var Categories = "";
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Categorylist?project_id=" + Project_Id,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $.each(data, function (Index, value) {
                Categories += '<li class="nav-link"><a href="show-all.html?cat=' + value.name + '">' + value.name + '</a></li>'

            });
        }
    });
    var topnav = '<section class="top-bar d-md-block d-none" style="background-color:black !important;"><div class="container-fluid"><div class="row text-center pt-2"><div class="col-lg-3 col-sm-6"><div class="shipping_top"><div class="d-flex"><img src="images/topbar/carbon_delivery-truck.png" width="24px" height="24px"><div class="text-start"><p>FREE SHIPPING ON $75 MIN ORDER</p></div></div></div></div><div class="col-lg-3 col-sm-6"><div class="shipping_top"><div class="d-flex align-items-center"><i class="fa-solid fa-money-bill-wave"></i><div class="text-start"><p>EARN REWARD POINTS ON EACH PURCHASE</p></div></div></div></div><div class="col-lg-3 col-sm-12"><div class="shipping_top"><div class="d-flex align-items-center"><i class="fa-solid fa-users"></i><div class="text-start"><p>JOIN OUR SUBSCRIPTION CLUB FOR SPECIALS</p></div></div></div></div><div class="col-lg-3 col-sm-6"><div class="shipping_top"><div class="d-flex"><div class="text-start"><a class="amerifragStudio amerifrag-top-hover" href="/AmerifragBlog.html">AmeriFrag STUDIO</a></div>' +
        '</div></div></div></div></div></section>'
    $("#dvtopnav").append(topnav)
}
function getActivities() {
    var Projectid = GlobalInputs();
    var ProjectAuth = localStorage.getItem("Admin_auth");

    $.ajax({
        url: "https://api.americanfragrances.com/Activity/Index?project_id=" + Projectid + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: true,
        crossDomain: true,
        success: function (data) {
            $("#leftmenu").empty();
            $("#leftmenu").append("<div style='height:10px'></div>");
            $.each(data, function (Index, value) {
                var newrowContent = '<a href="' + value.url + '" class="dashboard_btn"><p><table><tr> <td>' + value.name + '</td></tr></table></p></a>'
                $("#leftmenu").append(newrowContent);
            });
        }
    });
};
//for barcode tooltip
//var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//    return new bootstrap.Tooltip(tooltipTriggerEl)
//})
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//append blog links
var blogurls = '<div>' +
    '<h5><a href="sprayonperfume.html">How to spray perfume the right way</a></h5>' +
    '<br />' +
    '<h5><a href="buyingaPerfume.html">Essential tips before buying your next perfume</a></h5>' +
    '<br />' +
    '<h5><a href="knowaboutFragrance.html">Unveiling fragrance notes</a></h5>' +
    '<br />' +
    '<h5><a href="FragranceFamilies.html">Unpacking Fragrance Families</a></h5>' +
    '<br />' +
    '<h5><a href="HelpfulQAs.html">Fragrance Q&A: Your Scent Questions Answered Here!</a></h5>' +
    '<br />' +
    '<h5><a href="famousperfume.html">Unmasking Common Perfume Myths</a></h5>' +
    '<br />' +
    '<h5><a href="layeronperfumes.html">Create Your Signature Scent with Expert Perfume Layering</a></h5>' +
    '<br />' +
    '<h5><a href="uniquesignature.html">Crafting Your Unique Signature Fragrance: A Personalized Guide</a></h5>' +
    '<br />' +
    '<h5><a href="/fraganceComplexity.html">Beyond Notes: Fragrance Insights</a></h5>' +
    '<br />' +
    '<h5><a href="/ZodiacGuidance.html">Discover Your Perfect Fragrance with Zodiac Guidance</a></h5>' +
    '<br />' +
    '<h5><a href="/ChooseYourFragrance.html">Selecting Scents: Setting the Perfect Mood</a></h5>' +
    '</div>';
$(".blooglinks").append(blogurls);



$(document).ready(function () {
    console.log('Enhanced Tooltip script starting in global.js...');

    // Configuration
    const TOOLTIP_CONFIG = {
        maxLength: 20,
        checkInterval: 500,
        maxAttempts: 20,
        initDelay: 200,
        selector: '.product_name'
    };

    let tooltipChecker;
    let isInitialized = false;

    function initProductTooltips() {
        const productElements = $(TOOLTIP_CONFIG.selector);

        if (productElements.length === 0) {
            console.log('⚠️ No product elements found - will keep checking...');
            return false;
        }

        console.log(`Found ${productElements.length} product elements - initializing tooltips...`);

        let processedCount = 0;

        productElements.each(function () {
            const $element = $(this);
            const fullText = $element.text().trim();

            // SKIP if in Shop The Top Collection section (has custom tooltip)
            if ($element.closest('.warpper').length > 0) {
                console.log('Skipping Shop The Top Collection product');
                return;
            }
            // SKIP if in Product Page carousels (has custom tooltip)
            if ($element.closest('#product_carosel').length > 0 ||
                $element.closest('#brand_product_carosel').length > 0) {
                console.log('Skipping Product Page carousel product');
                return;
            }

            // SKIP if in any navigation/header area
            if ($element.closest('nav').length > 0 ||
                $element.closest('.nav').length > 0 ||
                $element.closest('.navbar').length > 0 ||
                $element.closest('.navigation').length > 0 ||
                $element.closest('.dropdown').length > 0 ||
                $element.closest('.dropdown-menu').length > 0 ||
                $element.closest('.mega-menu').length > 0 ||
                $element.closest('.col-megamenu').length > 0 ||
                $element.closest('header').length > 0 ||
                $element.closest('.header').length > 0 ||
                $element.closest('.top-bar').length > 0 ||
                $element.closest('#dvtopnav').length > 0 ||
                $element.closest('.dvnavcust').length > 0) {
                console.log('Skipping navbar/header product');
                return;
            }

            // SKIP if in footer sections
            if ($element.closest('footer').length > 0 ||
                $element.closest('.footer').length > 0 ||
                $element.closest('#footer').length > 0 ||
                $element.closest('.footer-menu-section').length > 0 ||
                $element.closest('.dvfooter').length > 0) {
                console.log('Skipping footer product');
                return;
            }

            // SKIP if element has custom tooltip already
            if ($element.siblings('.product_name_tooltip').length > 0) {
                console.log('Skipping - already has custom tooltip');
                return;
            }

            // Skip if already processed or empty
            if ($element.attr('data-tooltip-processed') || !fullText) {
                return;
            }

            // Store original text and mark as processed
            $element.attr('data-original-text', fullText);
            $element.attr('data-tooltip-processed', 'true');

            // Check if text needs truncation
            if (fullText.length > TOOLTIP_CONFIG.maxLength) {
                const shortText = fullText.substring(0, TOOLTIP_CONFIG.maxLength) + '...';
                $element.text(shortText);
                $element.attr('data-tooltip-title', fullText);

                console.log(`Added tooltip: "${fullText}" → "${shortText}"`);
                processedCount++;
            } else {
                console.log(`✓ Text fits: "${fullText}"`);
            }
        });

        // Initialize tooltips after processing
        if (processedCount > 0) {
            setTimeout(() => {
                initializeTooltipLibrary();
            }, TOOLTIP_CONFIG.initDelay);
        }

        console.log(`Processed ${processedCount} tooltips out of ${productElements.length} elements`);
        return true;
    }

    function initializeTooltipLibrary() {
        const elementsWithTooltips = $('[data-tooltip-title]');

        if (elementsWithTooltips.length === 0) {
            console.log('No elements need tooltips');
            return;
        }

        console.log(`Initializing tooltip library for ${elementsWithTooltips.length} elements...`);

        elementsWithTooltips.each(function () {
            const element = this;
            const $element = $(element);
            const tooltipText = $element.attr('data-tooltip-title');

            try {
                // Try Bootstrap 5 tooltips first
                if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
                    // Dispose existing tooltip
                    const existingTooltip = bootstrap.Tooltip.getInstance(element);
                    if (existingTooltip) {
                        existingTooltip.dispose();
                    }

                    // Create new Bootstrap tooltip
                    new bootstrap.Tooltip(element, {
                        title: tooltipText,
                        placement: 'top',
                        trigger: 'hover focus',
                        delay: { show: 300, hide: 100 }
                    });

                    console.log('Bootstrap tooltip created');

                } else if (typeof $.fn.tooltip === 'function') {
                    // Try jQuery UI or Bootstrap 4 tooltips
                    $element.tooltip({
                        title: tooltipText,
                        placement: 'top',
                        trigger: 'hover focus'
                    });

                    console.log('jQuery tooltip created');

                } else {
                    // Fallback to native browser tooltip
                    $element.attr('title', tooltipText);
                    console.log('Native tooltip created');
                }

            } catch (error) {
                console.warn('Tooltip creation failed, using fallback:', error);
                $element.attr('title', tooltipText);
            }
        });

        console.log('Tooltip initialization complete!');
    }

    function startTooltipChecker() {
        let checkCount = 0;

        console.log('Starting product element checker...');

        tooltipChecker = setInterval(() => {
            checkCount++;

            const success = initProductTooltips();

            if (success) {
                console.log(`Tooltips initialized successfully after ${checkCount} attempts`);
                clearInterval(tooltipChecker);
                isInitialized = true;
            } else if (checkCount >= TOOLTIP_CONFIG.maxAttempts) {
                console.log(`Stopped checking after ${TOOLTIP_CONFIG.maxAttempts} attempts`);
                clearInterval(tooltipChecker);
            } else {
                console.log(`Attempt ${checkCount}/${TOOLTIP_CONFIG.maxAttempts} - still waiting for elements...`);
            }
        }, TOOLTIP_CONFIG.checkInterval);
    }

    function resetTooltips() {
        console.log('Resetting all tooltips...');


        if (tooltipChecker) {
            clearInterval(tooltipChecker);
        }


        $(`${TOOLTIP_CONFIG.selector}[data-tooltip-processed]`).each(function () {
            const $element = $(this);
            const originalText = $element.attr('data-original-text');

            // Dispose Bootstrap tooltips
            try {
                if (typeof bootstrap !== 'undefined') {
                    const existingTooltip = bootstrap.Tooltip.getInstance(this);
                    if (existingTooltip) {
                        existingTooltip.dispose();
                    }
                }
            } catch (error) {
                // Continue if disposal fails
                console.warn('Tooltip disposal warning:', error);
            }

            // Reset all tooltip-related attributes
            $element.removeAttr('data-tooltip-processed data-tooltip-title title');

            // Restore original text
            if (originalText) {
                $element.text(originalText);
                $element.removeAttr('data-original-text');
            }
        });

        isInitialized = false;
        console.log('Reset complete');
    }

    // Global functions
    window.refreshProductTooltips = function () {
        console.log('Manual tooltip refresh requested...');
        resetTooltips();

        // Wait a bit then restart
        setTimeout(() => {
            startTooltipChecker();
        }, 100);
    };

    window.debugTooltips = function () {
        console.log('===TOOLTIP DEBUG INFO ===');
        console.log('Initialized:', isInitialized);
        console.log('Total elements:', $(TOOLTIP_CONFIG.selector).length);
        console.log('Processed elements:', $(`${TOOLTIP_CONFIG.selector}[data-tooltip-processed]`).length);
        console.log('Elements with tooltips:', $('[data-tooltip-title]').length);
        console.log('Elements with native title:', $(`${TOOLTIP_CONFIG.selector}[title]`).length);
        console.log('Bootstrap available:', typeof bootstrap !== 'undefined');
        console.log('jQuery tooltip available:', typeof $.fn.tooltip === 'function');

        console.log('\n--- Element Details ---');
        $(TOOLTIP_CONFIG.selector).each(function (i) {
            const $el = $(this);
            console.log(`Element ${i}:`, {
                text: $el.text(),
                originalText: $el.attr('data-original-text'),
                processed: !!$el.attr('data-tooltip-processed'),
                hasTooltipTitle: !!$el.attr('data-tooltip-title'),
                hasNativeTitle: !!$el.attr('title')
            });
        });
        console.log('=== END DEBUG ===');
    };


    window.forceTooltipInit = function () {
        console.log('Force initializing tooltips...');
        if (tooltipChecker) {
            clearInterval(tooltipChecker);
        }
        initProductTooltips();
    };

    // Initialize on page load with multiple strategies
    console.log('Starting tooltip initialization strategies...');

    // Strategy 1: Immediate check
    if (initProductTooltips()) {
        isInitialized = true;
    } else {
        // Strategy 2: Start periodic checker
        startTooltipChecker();

        // Strategy 3: Additional delayed attempts
        setTimeout(() => {
            if (!isInitialized) {
                console.log('🕐 Delayed attempt 1...');
                initProductTooltips();
            }
        }, 1000);

        setTimeout(() => {
            if (!isInitialized) {
                console.log('Delayed attempt 2...');
                initProductTooltips();
            }
        }, 3000);
    }

    // Strategy 4: Listen for potential AJAX completion events
    $(document).on('ajaxComplete', function () {
        if (!isInitialized) {
            console.log('AJAX detected - checking for new elements...');
            setTimeout(() => {
                initProductTooltips();
            }, 500);
        }
    });

    // Strategy 5: Mutation Observer for dynamic content
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function (mutations) {
            let shouldCheck = false;

            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any added nodes contain product elements
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) { // Element node
                            if ($(node).find(TOOLTIP_CONFIG.selector).length > 0 ||
                                $(node).is(TOOLTIP_CONFIG.selector)) {
                                shouldCheck = true;
                            }
                        }
                    });
                }
            });

            if (shouldCheck) {
                console.log('👀 DOM changes detected - checking tooltips...');
                setTimeout(() => {
                    const currentCount = $(TOOLTIP_CONFIG.selector).length;
                    const processedCount = $(`${TOOLTIP_CONFIG.selector}[data-tooltip-processed]`).length;

                    if (currentCount > processedCount) {
                        console.log(` New elements detected (${currentCount - processedCount} unprocessed)`);
                        initProductTooltips();
                    }
                }, 300);
            }
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log(' Mutation observer started');
    }

    console.log('Enhanced tooltip script loaded with multiple initialization strategies');
});

// Save cart to database when adding items
$(document).on('click', '.cartbtn, .add-to-cart, .cart-button, .btn-cart', function (e) {
    var product_id = $(this).attr('data') || $(this).attr('data-id') || $(this).attr('data-product-id') || $(this).data('id');
    var customer_id = localStorage.getItem("authorid");

    if (!product_id) {
        console.log("⚠️ Product ID not found on button");
        return;
    }

    console.log("Adding to cart - Product ID:", product_id);

    // Save to localStorage (for immediate UI update)
    var cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

    // Check if product already exists
    var existingItem = cartItems.find(item => item.product_id === product_id);
    if (existingItem) {
        existingItem.quantity += 1;
        console.log("Updated quantity for product:", product_id);
    } else {
        cartItems.push({
            product_id: product_id,
            quantity: 1
        });
        console.log("Added new product:", product_id);
    }

    localStorage.setItem("cart_items", JSON.stringify(cartItems));


    if (customer_id) {
        $.ajax({
            url: "https://api.americanfragrances.com/Cart/AddToCart",
            type: "POST",
            dataType: "JSON",
            data: {
                customer_id: customer_id,
                product_id: product_id,
                quantity: 1,
                project_id: Project_Id
            },
            success: function (response) {
                console.log("✅ Cart saved to database");
            },
            error: function (error) {
                console.log("❌ Error saving cart to database:", error);
            }
        });
    } else {
        console.log("ℹ️ User not logged in - cart saved to localStorage only");
    }

    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

function showTopNotification(message, type = 'success', duration = 3000) {
    // Remove any existing notification
    const existingNotif = document.querySelector('.top-notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `top-notification ${type}`;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Hide and remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Make it globally available
window.showTopNotification = showTopNotification;
