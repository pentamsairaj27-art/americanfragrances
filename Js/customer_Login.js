$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var path = window.location.pathname;
    customernavdv();
    Footerdv();

    var redirectingClick = localStorage.getItem("redirectionpage");
    var usersession = localStorage.getItem("authorid");
    var username = localStorage.getItem("username");

    // ✅ FIX: Only initialize phone input if element exists
    const phoneInputField = document.querySelector("#Phone");
    if (phoneInputField) {
        try {
            window.phoneInput = window.intlTelInput(phoneInputField, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            });
            console.log("Phone input initialized successfully");
        } catch (error) {
            console.error("Error initializing phone input:", error);
        }
    } else {
        console.log("Phone input field not found - will initialize when registration form loads");
    }

    // Get user profile if logged in
    if (usersession) {
        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + usersession + "&authorid=" + usersession + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $(".Hello_txt_big").text(data.firstname);
            },
            error: function (xhr) {
                // Handle error silently
            }
        });
    }

    // Check if user is already logged in
    if (usersession) {
        $(".myaccount").attr("style", "display: inline !important;");
        $(".cLogin").hide();
        $(".offer-text").hide();
        $(".cust_name").text(username);

        $("#btnprofile").click(function () {
            window.location.href = "Myprofile.html?id=" + usersession;
        });
        $(".cust_prof a").attr("href", "Myprofile.html?id=" + usersession);
        $(".cust_order a").attr("href", "Order.html?cid=" + usersession);
        $(".before-login").hide();
    } else {
        $(".after-login").hide();
        $(".myaccount").attr("style", "display: none !important;");
        $(".cLogin").show();
    }
    // Handle forgot password email parameter
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var em = params.get('email');
    if (em != null) {
        $("#custfrgmail").val(em);
    }

    // VALIDATION FUNCTIONS
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // Check if password is at least 8 characters (basic requirement for login)
        return password && password.length >= 8;
    }

    // Clear all error messages
    function clearErrors() {
        $("#logindateerror").hide().text("");
        $("#validationdiv").hide().text("");
    }

    // Show error message
    function showError(message, isSuccess = false) {
        clearErrors();
        const errorDiv = $("#logindateerror");
        errorDiv.text(message)
            .css({
                "background": isSuccess ? "#026633" : "#dc3545",
                "color": "white",
                "padding": "10px",
                "margin": "10px 0",
                "border-radius": "4px",
                "display": "block"
            })
            .slideDown()
            .delay(5000)
            .slideUp();
    }

    // Real-time email validation
    $("#username").on('input blur', function () {
        const email = $(this).val().trim();
        const $input = $(this);

        //     if (email && !validateEmail(email)) {
        //         $input.addClass('is-invalid').removeClass('is-valid');
        //         if (email.indexOf('@') === -1) {
        //             showError("Email must contain @ symbol");
        //         } else {
        //             showError("Please enter a valid email address");
        //         }
        //     } else if (email) {
        //         $input.addClass('is-valid').removeClass('is-invalid');
        //         clearErrors();
        //     } else {
        //         $input.removeClass('is-invalid is-valid');
        //         clearErrors();
        //     }
        // });
        if (email) {
            if (!validateEmail(email)) {
                $input.addClass('is-invalid').removeClass('is-valid');
                // ❌ REMOVED: showError() call - no more red text banner
            } else {
                $input.addClass('is-valid').removeClass('is-invalid');
                clearErrors();
            }
        } else {
            $input.removeClass('is-invalid is-valid');
            clearErrors();
        }
    });
    // UPDATED LOGIN HANDLER
    /*$(document).on("click", "#loginBut", function (e) {
        e.preventDefault();
        $("#dateerror").empty();
    
        // Real-time password validation
        $("#Lpassword").on('input blur', function() {
            const password = $(this).val();
            const $input = $(this);
            
            if (password && !validatePassword(password)) {
                $input.addClass('is-invalid').removeClass('is-valid');
                showError("Password must be at least 8 characters long");
            } else if (password) {
                $input.addClass('is-valid').removeClass('is-invalid');
                clearErrors();
            } else {
                $input.removeClass('is-invalid is-valid');
                clearErrors();
            }
        });
    
        // Clear validation on input focus
        $("#username, #Lpassword").on('focus', function() {
            $(this).removeClass('is-invalid');
            clearErrors();
        });
    
        // MAIN LOGIN FUNCTIONALITY
        function handleLogin() {
            clearErrors();
            
            const email = $("#username").val().trim();
            const password = $("#Lpassword").val();
    
            // CLIENT-SIDE VALIDATION
            // Email validation
            if (!email) {
                showError("Please enter your email address");
                $("#username").focus().addClass('is-invalid');
                return false;
            }
    
            if (!validateEmail(email)) {
                if (email.indexOf('@') === -1) {
                    showError("Email must contain @ symbol");
                } else {
                    showError("Please enter a valid email address");
                }
                $("#username").focus().addClass('is-invalid');
                return false;
            }
    
            // Password validation
            if (!password) {
                showError("Please enter your password");
                $("#Lpassword").focus().addClass('is-invalid');
                return false;
            }
    
            if (!validatePassword(password)) {
                showError("Password must be at least 8 characters long");
                $("#Lpassword").focus().addClass('is-invalid');
                return false;
            }
    
            // Disable submit button to prevent double submission
            const submitButton = $("#loginBut");
            const originalText = submitButton.text();
            submitButton.prop("disabled", true).text("Logging in...");
    
            // AJAX LOGIN REQUEST
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/login",
                type: "POST",
                data: {
                    "project_id": Project_Id,
                    "email": email,
                    "password": password
                },
                dataType: "json",
                crossDomain: true,
                timeout: 15000,
                success: function (data) {
                    if (data.responseCode == 1) {
                        // SUCCESS - Store user data
                        localStorage.setItem("username", data.name);
                        localStorage.setItem("authorid", data.authorid);
                        localStorage.setItem("userGender", data.gender);
    
                        // Custom success alert styling
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
                            text: "Logged In Successfully !",
                            icon: "success",
                            buttons: false,
                            timer: 2000
                        }).then(function () {
                            const customStyle = document.getElementById('custom-swal-style');
                            if (customStyle) {
                                customStyle.parentNode.removeChild(customStyle);
                            }
                        });
    
                        // Redirect after 2 seconds
                        setTimeout(function () {
                            const cartid = localStorage.getItem("cart_id");
                            const redirectionPage = localStorage.getItem("redirectionpage");
                            
                            if (redirectionPage != null) {
                                window.location.href = redirectionPage;
                                localStorage.removeItem("redirectionpage");
                            } else if (cartid != null) {
                                window.location.href = "cart.html";
                            } else {
                                if (path == "" || path.includes("Home.html")) {
                                    window.location.href = "Home.html#scrollToAnlyProducts";
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            }
    
                            // Update UI elements
                            $(".myaccount").show();
                            $(".cLogin").hide();
                            $(".offer-text").hide();
                            $(".cust_name").html(data.name);
                            $('#loginpopup').modal('hide');
                        }, 500);
    
                    } else {
                        // LOGIN FAILED
                        showError("Sorry, Invalid email or password.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Login error:", status, error, xhr);
                    
                    // Handle different types of errors
                    if (xhr.status === 401) {
                        showError("Invalid email or password");
                    } else if (xhr.status === 0 || status === 'timeout') {
                        showError("Connection failed. Please check your internet connection and try again.");
                    } else if (xhr.status >= 500) {
                        showError("Server error. Please try again later.");
                    } else {
                        showError("Something went wrong. Please try again.");
                    }
                },
                complete: function () {
                    // Re-enable submit button
                    submitButton.prop("disabled", false).text(originalText);
                }
            });
        }
        updateAnalyticsBanner();
    });
    */
    //  $(document).on("click", "#loginBut", function (e) {
    //     e.preventDefault();
    //     $("#dateerror").empty();


    //     var username = $("#username").val();
    //     var password = $("#Lpassword").val();

    //     if (username && password) {
    //         $.ajax({
    //             url: "https://api.americanfragrances.com/Customer/login",
    //             type: "POST",
    //             data: {
    //                 "project_id": Project_Id,
    //                 "email": username,
    //                 "password": password
    //             },
    //             dataType: "json",
    //             crossDomain: true,
    //             success: function (data) {
    //                 if (data.responseCode == 1) {
    //                     // ✅ SAVE GUEST CART ID BEFORE LOGIN
    //                     var guestCartId = localStorage.getItem("cart_id");

    //                     // ✅ SET USER DATA AND LOGIN STATUS
    //                     localStorage.setItem("username", data.name);
    //                     localStorage.setItem("authorid", data.authorid);
    //                     localStorage.setItem("userGender", data.gender);
    //                     localStorage.setItem("isLoggedIn", "true");

    //                     // ✅ UPDATE BANNER IMMEDIATELY AFTER LOGIN DATA IS SET
    //                     updateAnalyticsBanner();

    //                     // ✅ RESTORE USER CART AND MERGE WITH GUEST CART
    //                     restoreUserCart(guestCartId);

    //                     var usersession = localStorage.getItem("authorid");
    //                     const style = document.createElement('style');
    //                     style.type = 'text/css';
    //                     style.id = 'custom-swal-style';
    //                     style.innerHTML = `
    //                 .swal2-actions::before {
    //                      display:none !important;
    //                 }
    //                 .swal2-actions {
    //                     display:none !important;
    //                 }
    //                 #swal2-content{
    //                     color:#70b4bd !important;
    //                 }
    //                .swal2-modal {
    //                     border: 8px solid #70b4bd !important;
    //                 }
    //             `;
    //                     document.getElementsByTagName('head')[0].appendChild(style);

    //                     swal({
    //                         title: "",
    //                         text: "Logged In Successfully !",
    //                         icon: "warning",
    //                         buttons: false,
    //                     });

    //                     setTimeout(function () {
    //                         if (usersession != null) {
    //                             var redirectionPage = localStorage.getItem("redirectionpage");

    //                             // ✅ UPDATE BANNER BEFORE REDIRECT/RELOAD
    //                             updateAnalyticsBanner();

    //                             if (redirectionPage != null) {
    //                                 // User was trying to access a specific page - redirect there
    //                                 window.location.href = redirectionPage;
    //                                 localStorage.removeItem("redirectionpage");
    //                             }
    //                             else {
    //                                 // No specific page to redirect - stay on current page
    //                                 if (path == "" || path.includes("Home.html")) {
    //                                     // ✅ SCROLL TO SECTION WITHOUT FULL RELOAD
    //                                     window.location.href = "Home.html#scrollToAnlyProducts";
    //                                     // Only reload if necessary
    //                                     setTimeout(() => location.reload(), 500);
    //                                 } else {
    //                                     // Just reload current page
    //                                     location.reload();
    //                                 }
    //                             }

    //                             $('#loginpopup').modal('hide');
    //                         }

    //                         $("#validationdiv2").text("Logged in successfully");
    //                         $("#validationdiv2").slideDown();
    //                         $("#validationdiv2").delay(10000).slideUp();
    //                         $("#validationdiv2").css("background", "#026633");
    //                     }, 1500);
    //                 } else {
    //                     $("#logindateerror").text("Sorry, Invalid Username or Password");
    //                     $("#logindateerror").slideDown();
    //                     $("#logindateerror").delay(10000).slideUp();
    //                     $("#logindateerror").css("background", "red");
    //                 }
    //             },
    //             error: function (xhr) {
    //                 if (xhr.status === 401) {
    //                     $("#logindateerror2").html("Oops!...Something went wrong, Please <a href='/'>go back>></a> and try again");
    //                 }
    //             }
    //         });
    //     } else {
    //         $("#logindateerror")
    //             .text("Please enter Username/Password")
    //             .slideDown()
    //             .delay(5000)
    //             .slideUp();
    //         return;
    //     }
    // });

    // ✅ INITIALIZE ON PAGE LOAD
    $(document).on("click", "#loginBut", function (e) {
        e.preventDefault();
        $("#dateerror").empty();

        var username = $("#username").val();
        var password = $("#Lpassword").val();

        if (username && password) {
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/login",
                type: "POST",
                data: {
                    "project_id": Project_Id,
                    "email": username,
                    "password": password
                },
                dataType: "json",
                crossDomain: true,
                success: function (data) {
                    debugger;
                    if (data.responseCode == 1) {
                        // ✅ SAVE USER DATA
                        localStorage.setItem("username", data.name);
                        localStorage.setItem("authorid", data.authorid);
                        localStorage.setItem("userGender", data.gender);
                        localStorage.setItem("isLoggedIn", "true");
                        if (data.cartId != null) {
                            localStorage.setItem("cart_id", data.cartId);
                        }

                        // ✅✅✅ CRITICAL: LOAD CART FROM DATABASE
                        $.ajax({
                            url: "https://api.americanfragrances.com/Cart/GetCart?customer_id=" + data.authorid + "&project_id=" + Project_Id,
                            type: "GET",
                            dataType: "JSON",
                            success: function (cartData) {
                                if (cartData && cartData.length > 0) {
                                    // Save cart to localStorage
                                    localStorage.setItem("cart_items", JSON.stringify(cartData));
                                    console.log("✅ Cart loaded from database:", cartData);
                                } else {
                                    console.log("No cart items found in database");
                                }
                            },
                            error: function (error) {
                                console.log("❌ Error loading cart:", error);
                            }
                        });

                        // ✅ UPDATE BANNER IMMEDIATELY
                        updateAnalyticsBanner();

                        var usersession = localStorage.getItem("authorid");
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
                            text: "Logged In Successfully !",
                            icon: "warning",
                            buttons: false,
                        });

                        setTimeout(function () {
                            if (usersession != null) {
                                var redirectionPage = localStorage.getItem("redirectionpage");

                                // ✅ UPDATE BANNER BEFORE REDIRECT
                                updateAnalyticsBanner();

                                if (redirectionPage != null) {
                                    window.location.href = redirectionPage;
                                    localStorage.removeItem("redirectionpage");
                                }
                                else {
                                    if (path == "" || path.includes("Home.html")) {
                                        window.location.href = "Home.html#scrollToAnlyProducts";
                                        setTimeout(() => location.reload(), 500);
                                    } else {
                                        location.reload();
                                    }
                                }

                                $('#loginpopup').modal('hide');
                            }

                            $("#validationdiv2").text("Logged in successfully");
                            $("#validationdiv2").slideDown();
                            $("#validationdiv2").delay(10000).slideUp();
                            $("#validationdiv2").css("background", "#026633");
                        }, 1500);
                    } else {
                        $("#logindateerror").text("Sorry, Invalid Username or Password");
                        $("#logindateerror").slideDown();
                        $("#logindateerror").delay(10000).slideUp();
                        $("#logindateerror").css("background", "red");
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        $("#logindateerror2").html("Oops!...Something went wrong, Please <a href='/'>go back>></a> and try again");
                    }
                }
            });
        } else {
            $("#logindateerror")
                .text("Please enter Username/Password")
                .slideDown()
                .delay(5000)
                .slideUp();
            return;
        }
    });

    $(document).ready(function () {
        // Update banner based on current login status
        updateAnalyticsBanner();

        // Restore user cart if logged in
        if (localStorage.getItem('authorid')) {
            restoreUserCart();
        }
    });

    // ✅ LISTEN FOR STORAGE CHANGES (if user logs in/out in another tab)
    window.addEventListener('storage', function (e) {
        if (e.key === 'authorid' || e.key === 'username') {
            updateAnalyticsBanner();
        }
    });

    // ✅ UPDATED RESTORE USER CART FUNCTION - NOW MERGES GUEST CART
    function restoreUserCart(guestCartId) {
        var cust_auth = localStorage.getItem("authorid");

        if (cust_auth) {
            var saved_cart_id = localStorage.getItem("user_cart_" + cust_auth);

            // ✅ IF USER HAS A SAVED CART, USE IT
            if (saved_cart_id) {
                if (typeof cart_id !== 'undefined') {
                    cart_id = saved_cart_id;
                }
                localStorage.setItem("cart_id", saved_cart_id);

                // ✅ IF GUEST HAD ITEMS, MERGE THEM WITH USER CART
                if (guestCartId && guestCartId !== saved_cart_id) {
                    console.log("Merging guest cart (" + guestCartId + ") with user cart (" + saved_cart_id + ")");
                    mergeGuestCartWithUserCart(guestCartId, saved_cart_id);
                }

                if (typeof cart_count === 'function') {
                    cart_count(saved_cart_id);
                }

                console.log("User cart restored: " + saved_cart_id);
            }
            // ✅ IF USER HAS NO SAVED CART BUT GUEST HAD CART, KEEP GUEST CART
            else if (guestCartId) {
                console.log("No saved cart found, keeping guest cart: " + guestCartId);
                localStorage.setItem("user_cart_" + cust_auth, guestCartId);

                if (typeof cart_id !== 'undefined') {
                    cart_id = guestCartId;
                }
                localStorage.setItem("cart_id", guestCartId);

                if (typeof cart_count === 'function') {
                    cart_count(guestCartId);
                }
            }
            // ✅ NO CART AT ALL
            else {
                console.log("No saved cart found for user: " + cust_auth);
            }
        }
    }

    // ✅ NEW FUNCTION: MERGE GUEST CART WITH USER CART
    function mergeGuestCartWithUserCart(guestCartId, userCartId) {
        // This function should call your backend API to merge carts
        // Example API call structure:

        $.ajax({
            url: "https://api.americanfragrances.com/Cart/merge", // Adjust to your actual endpoint
            type: "POST",
            data: {
                "project_id": Project_Id,
                "guest_cart_id": guestCartId,
                "user_cart_id": userCartId,
                "author_id": localStorage.getItem("authorid")
            },
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                console.log("Cart merge successful:", response);
                // Refresh cart count after merge
                if (typeof cart_count === 'function') {
                    cart_count(userCartId);
                }
            },
            error: function (xhr, status, error) {
                console.error("Cart merge failed:", error);
                // Fallback: just use guest cart if merge fails
                localStorage.setItem("cart_id", guestCartId);
                localStorage.setItem("user_cart_" + localStorage.getItem("authorid"), guestCartId);
            }
        });
    }
    //---------------------------------------validateuser-------------------------------------------//
    // var currentStep = 1;
    // var totalSteps = $('#frmsignup fieldset').length;
    // var nextsection = false;

    // $('.next').click(function () {
    //     $('#reg' + currentStep).show();
    //     var name = $("#email").val();
    //     var phone = phoneInput.getNumber();
    //     $.ajax({
    //         url: "https://api.americanfragrances.com/Customer/ValidateCustomer?username=" + name + "&phone=" + phone,
    //         type: "GET",
    //         dataType: "JSON",
    //         crossDomain: true,
    //         success: function (returndata) {
    //             console.log(returndata);
    //             if (returndata.responseCode == 1) {
    //                 nextsection = false;
    //                 alert(returndata.responsemessage);
    //             } else if (returndata.responseCode == 2) {
    //                 nextsection = false;
    //                 alert(returndata.responsemessage);
    //             } else {
    //                 if (currentStep === 1) {
    //                     var currentFieldset = $('#reg' + currentStep);
    //                     var requiredInputs = currentFieldset.find(':input[required]');

    //                     if (requiredInputs.filter(function () { return this.value === ''; }).length === 0) {
    //                         currentFieldset.hide();
    //                         currentStep++;

    //                         if (currentStep <= totalSteps) {
    //                             $('#reg' + currentStep).show();
    //                         }
    //                     } else {
    //                         alert('Please fill in all required fields before proceeding.');
    //                     }
    //                 } else {
    //                     var currentFieldset = $('#reg' + currentStep);
    //                     currentFieldset.hide();
    //                     currentStep++;

    //                     if (currentStep <= totalSteps) {
    //                         $('#reg' + currentStep).show();
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // });


    // // Previous button functionality
    // $('.previous').click(function () {
    //     if (currentStep > 1) {
    //         $('#reg' + currentStep).hide();
    //         currentStep--;
    //         $('#reg' + currentStep).show();
    //     }
    // });

    // // Email validation for registration
    // $("#email").on('input', function() {
    //     let email = $(this).val();
    //     if(email.indexOf('@') === -1) {
    //       $("#alert").text("Email must contain @ symbol");
    //       $("#alert").show();
    //       $('#next1').attr('disabled', true);
    //     } else {
    //       $("#alert").hide();
    //       $('#next1').attr('disabled', false);
    //     }
    // });

    // // Password toggle functionality
    // $(document).on('click', '.toggle-password', function() {
    //     $(this).toggleClass("fa-eye fa-eye-slash");

    //     var input = $(this).closest('.input-group').find('input');

    //     if (input.attr('type') === 'password') {
    //         input.attr('type', 'text');
    //     } else {
    //         input.attr('type', 'password');
    //     }
    // });

    // // Registration password validation
    // $('#password, #confirm_password').keyup(function() {
    //     var password = $('#password').val();
    //     var confirmPassword = $('#confirm_password').val();

    //     if (password && !checkStrength(password)) {
    //         $('#password-error').text('Password must be at least 8 characters with letters, numbers and special characters');
    //     } else {
    //         $('#password-error').text('');
    //     }

    //     if (confirmPassword && password !== confirmPassword) {
    //         $('#confirm-password-error').text('Passwords do not match');
    //     } else {
    //         $('#confirm-password-error').text('');
    //     }
    // });


    // function checkStrength(password) {
    //     // Password must be at least 8 characters with letters, numbers and special chars
    //     const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    //     return strongRegex.test(password);
    // }

    // // Add real-time password strength indicator
    // $('#password').on('input', function() {
    //     const password = $(this).val();
    //     const $feedback = $('#password-strength');

    //     if(!password) {
    //       $feedback.html('').removeClass('weak medium strong');
    //       return;
    //     }

    //     if(password.length < 8) {
    //       $feedback.html('Too short').addClass('weak').removeClass('medium strong');
    //     } else if(!checkStrength(password)) {
    //       $feedback.html('Medium').addClass('medium').removeClass('weak strong');
    //     } else {
    //       $feedback.html('Strong').addClass('strong').removeClass('weak medium');
    //     }
    // });

    var currentStep = 1;
    var totalSteps = $('#frmsignup fieldset').length;
    var nextsection = false;

    $('.next').click(function () {
        console.log('Next button clicked');

        var currentFieldset = $('#reg' + currentStep);
        var requiredInputs = currentFieldset.find(':input[required]');

        // Check if all required fields are filled
        var emptyFields = requiredInputs.filter(function () {
            return this.value === '' || this.value === null;
        });

        if (emptyFields.length > 0) {
            showTopNotification('Please fill in all required fields before proceeding.', 'warning');
            return;
        }

        // Only do validation on step 1
        if (currentStep === 1) {
            // Validate email format
            var email = $("#email").val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showTopNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Validate password
            var password = $('#password').val();
            var confirmPassword = $('#confirm_password').val();

            if (password !== confirmPassword) {
                showTopNotification('Passwords do not match.', 'error');
                return;
            }

            if (!checkStrength(password)) {
                showTopNotification('Password must be at least 8 characters with letters, numbers and special characters.', 'error');
                return;
            }

            var phone = '';
            try {
                if (typeof window.phoneInput !== 'undefined' && window.phoneInput && window.phoneInput.getNumber) {
                    phone = window.phoneInput.getNumber();
                } else {
                    phone = $("#Phone").val();
                }
            } catch (error) {
                console.log('Phone input error:', error);
                phone = $("#Phone").val();
            }

            console.log('Email:', email);
            console.log('Phone:', phone);

            // Show loading state
            var nextButton = $(this);
            var originalText = nextButton.val();
            nextButton.prop('disabled', true).val('Checking...');
            $.ajax({
                url: "https://api.americanfragrances.com/Customer/ValidateCustomer?username=" + encodeURIComponent(email) + "&phone=" + encodeURIComponent(phone),
                type: "GET",
                dataType: "JSON",
                crossDomain: true,
                timeout: 10000,
                success: function (returndata) {
                    console.log('Validation response:', returndata);
                    console.log('Response Code:', returndata.responseCode);
                    console.log('Response Message:', returndata.responsemessage);

                    // Reset button state
                    nextButton.prop('disabled', false).val(originalText);

                    // Check for ANY error response
                    if (returndata.responseCode == 1) {
                        showTopNotification(returndata.responsemessage || 'This email is already registered. Please use a different email.', 'error');
                        return; // Stay on current page
                    } else if (returndata.responseCode == 2) {
                        showTopNotification(returndata.responsemessage || 'This phone number is already registered. Please use a different number.', 'error');
                        return; // Stay on current page
                    } else if (returndata.responseCode != 0 && returndata.responseCode != '0') {
                        // Any other error code
                        showTopNotification(returndata.responsemessage || 'Validation failed. Please check your details.', 'error');
                        return; // Stay on current page
                    } else {
                        // Validation passed (responseCode == 0), proceed to next step
                        proceedToNextStep();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Validation error:', status, error);
                    console.error('XHR:', xhr);

                    // Reset button state
                    nextButton.prop('disabled', false).val(originalText);

                    // On error, allow to proceed
                    console.log('Server validation failed, proceeding anyway...');
                    proceedToNextStep();
                }
            });

        } else {
            // For steps other than step 1, proceed directly
            proceedToNextStep();
        }

        function proceedToNextStep() {
            console.log('Proceeding to next step. Current step:', currentStep);

            currentFieldset.hide();
            currentStep++;

            if (currentStep <= totalSteps) {
                $('#reg' + currentStep).show();
                console.log('Showing step:', currentStep);

                // Load questions when moving to step 2
                if (currentStep === 2) {
                    loadQuestionnaire();
                }
            } else {
                console.log('No more steps to show');
            }
        }
    });

    // ENHANCED QUESTIONNAIRE LOADING FUNCTION
    function loadQuestionnaire() {
        console.log('Loading questionnaire...');

        // Check if questions are already loaded
        if ($('#fqun1').children().length > 0) {
            console.log('Questions already loaded');
            return;
        }

        var Project_Id = GlobalInputs();

        $.ajax({
            url: "https://api.americanfragrances.com/Home/FilterQuestionlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                console.log('Questions loaded:', data.length);

                $.each(data, function (Index, value) {
                    var qunid = value.id;

                    // Clear existing content first
                    $("#fqun" + (Index + 1)).empty();

                    // Generate question HTML with all options
                    var questionHtml = '<div class="row py-2">' +
                        '<div class="col-md-8">' +
                        '<label class="form-label" for="dqun' + (Index + 1) + '">' + value.question + ' <span class="required">*</span></label>' +
                        '</div>' +
                        '<div class="col-md-4">' +
                        '<select class="form-control" id="dqun' + (Index + 1) + '" required>' +
                        '<option value="">Select</option>';

                    // Add all available options
                    for (var i = 1; i <= 16; i++) {
                        var optionKey = 'option' + i;
                        if (value[optionKey] && value[optionKey] !== null && value[optionKey] !== 'null') {
                            questionHtml += '<option value="' + value[optionKey] + '">' + value[optionKey] + '</option>';
                        }
                    }

                    questionHtml += '</select></div></div>';

                    // Append to the appropriate container
                    $("#fqun" + (Index + 1)).append(questionHtml);

                    console.log('Question ' + (Index + 1) + ' added:', value.question);
                });

                console.log('All questions loaded successfully');
            },
            error: function (xhr, status, error) {
                console.error('Error loading questions:', error);
                // Add fallback questions if API fails
                addFallbackQuestions();
            }
        });
    }

    // FALLBACK QUESTIONS IN CASE API FAILS
    function addFallbackQuestions() {
        var fallbackQuestions = [
            {
                question: "What is your personality type?",
                options: ["Extroverted", "Introverted", "Ambivert", "Social", "Reserved"]
            },
            {
                question: "What is your zodiac sign?",
                options: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
            },
            {
                question: "What describes your strength?",
                options: ["Creative", "Analytical", "Empathetic", "Decisive", "Adaptable"]
            },
            {
                question: "What is your passion?",
                options: ["Art", "Music", "Sports", "Technology", "Nature", "Travel"]
            },
            {
                question: "Preferred entertainment?",
                options: ["Movies", "Books", "Games", "Music", "Sports", "Theater"]
            },
            {
                question: "Your style preference?",
                options: ["Classic", "Modern", "Bohemian", "Minimalist", "Vintage"]
            },
            {
                question: "Favorite color palette?",
                options: ["Warm", "Cool", "Neutral", "Bright", "Dark"]
            },
            {
                question: "Preferred smell intensity?",
                options: ["Light", "Moderate", "Strong", "Subtle", "Bold"]
            },
            {
                question: "Your typical mood?",
                options: ["Energetic", "Calm", "Optimistic", "Focused", "Relaxed"]
            },
            {
                question: "Favorite season?",
                options: ["Spring", "Summer", "Autumn", "Winter"]
            }
        ];

        $.each(fallbackQuestions, function (index, question) {
            var questionHtml = '<div class="row py-2">' +
                '<div class="col-md-8">' +
                '<label class="form-label" for="dqun' + (index + 1) + '">' + question.question + ' <span class="required">*</span></label>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<select class="form-control" id="dqun' + (index + 1) + '" required>' +
                '<option value="">Select</option>';

            $.each(question.options, function (i, option) {
                questionHtml += '<option value="' + option + '">' + option + '</option>';
            });

            questionHtml += '</select></div></div>';

            $("#fqun" + (index + 1)).append(questionHtml);
        });

        console.log('Fallback questions loaded');
    }

    function checkStrength(password) {
        // Password must be at least 8 characters with letters, numbers and special characters
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return strongRegex.test(password);
    }

    // Previous button functionality
    $('.previous').click(function () {
        if (currentStep > 1) {
            $('#reg' + currentStep).hide();
            currentStep--;
            $('#reg' + currentStep).show();
        }
    });

    // Email validation for registration
    $("#email").on('input', function () {
        let email = $(this).val();
        if (email.indexOf('@') === -1) {
            $("#alert").text("Email must contain @ symbol");
            $("#alert").show();
            $('#next1').attr('disabled', true);
        } else {
            $("#alert").hide();
            $('#next1').attr('disabled', false);
        }
    });

    // Password toggle functionality
    $(document).on('click', '.toggle-password', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");

        var input = $(this).closest('.input-group').find('input');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });

    // Registration password validation
    $('#password, #confirm_password').keyup(function () {
        var password = $('#password').val();
        var confirmPassword = $('#confirm_password').val();

        if (password && !checkStrength(password)) {
            $('#password-error').text('Password must be at least 8 characters with letters, numbers and special characters');
        } else {
            $('#password-error').text('');
        }

        if (confirmPassword && password !== confirmPassword) {
            $('#confirm-password-error').text('Passwords do not match');
        } else {
            $('#confirm-password-error').text('');
        }
    });

    function checkStrength(password) {
        // Password must be at least 8 characters with letters, numbers and special chars
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return strongRegex.test(password);
    }

    // Add real-time password strength indicator
    $('#password').on('input', function () {
        const password = $(this).val();
        const $feedback = $('#password-strength');

        if (!password) {
            $feedback.html('').removeClass('weak medium strong');
            return;
        }

        if (password.length < 8) {
            $feedback.html('Too short').addClass('weak').removeClass('medium strong');
        } else if (!checkStrength(password)) {
            $feedback.html('Medium').addClass('medium').removeClass('weak strong');
        } else {
            $feedback.html('Strong').addClass('strong').removeClass('weak medium');
        }
    });

    //------------------------------------------CUSTOMER REGISTER METHOD------------------------------------//
    $("#frmsignup").submit(function (e) {
        e.preventDefault();

        if ($('#registerchk').is(':checked')) {
            var submitButton = $("#next2");
            submitButton.prop("disabled", true).val("Submitting...");

            var firstname = $("#fname").val();
            var lastname = $("#lname").val();
            var Email = $("#email").val();
            var name = $("#name").val();


            var countryCode = "";
            var phoneNumber = $("#Phone").val();


            if (typeof $.fn.intlTelInput !== 'undefined') {
                var countryData = $("#Phone").intlTelInput("getSelectedCountryData");
                countryCode = "+" + countryData.dialCode;
            }

            else if ($(".selected-flag").length > 0) {
                countryCode = $(".selected-flag").attr("data-dial-code") ||
                    $(".selected-flag").attr("title").match(/\+\d+/)?.[0] || "+1";
            }

            else {
                countryCode = $(".iti__selected-dial-code").text().trim() || "+1";
            }


            var Phone = countryCode + phoneNumber;


            var pswd = $("#password").val();
            var location = $("#location").val();
            var dob = $("#dob").val();
            var about = $("#aboutme").val();
            var prof = $("#profession").val();
            var fileInput = $('#userimage')[0];
            var imagestr = "";
            var file = fileInput.files[0];
            if (file) {
                imagestr = $("#userimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
            }

            var gender = $("#gender option:selected").text();
            var qun1 = $("#dqun1 option:selected").text();
            var qun2 = $("#dqun2 option:selected").text();
            var qun3 = $("#dqun3 option:selected").text();
            var qun4 = $("#dqun4 option:selected").text();
            var qun5 = $("#dqun5 option:selected").text();
            var qun6 = $("#dqun6 option:selected").text();
            var qun7 = $("#dqun7 option:selected").text();
            var qun8 = $("#dqun8 option:selected").text();
            var qun9 = $("#dqun9 option:selected").text();
            var qun10 = $("#dqun10 option:selected").text();

            var dataString = {
                "project_id": Project_Id,
                "firstname": firstname,
                "lastname": lastname,
                "name": name,
                "email": Email,
                "gender": gender,
                "password": pswd,
                "phone": Phone,
                "location": location,
                "dob": dob,
                "profession": prof,
                "qun1": qun1,
                "qun2": qun2,
                "qun3": qun3,
                "qun4": qun4,
                "qun5": qun5,
                "qun6": qun6,
                "qun7": qun7,
                "qun8": qun8,
                "qun9": qun9,
                "qun10": qun10,
                "image": imagestr,
                "address": about
            };

            // Optional: Console log to verify country code is captured
            console.log("Phone with country code:", Phone);

            $.ajax({
                url: "https://api.americanfragrances.com/Customer/Create",
                type: "POST",
                data: dataString,
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    debugger;
                    if (data.responseCode == 1) {
                        data.responsemessage;
                        var usersession = localStorage.setItem("authorid", data.id);
                        $("#Name").val("");
                        $("#email").val("");
                        $("#Phone").val("");
                        $("#password").val("");
                        $("#registeredvbm").modal('show');
                        if (redirectingClick != "" && redirectingClick != null) {
                            window.location.href = redirectingClick;
                            localStorage.removeItem("redirectionpage");
                        } else {
                            window.location.href = "Home.html#scrollToAnlyProducts";
                            location.reload();
                        }
                    } else {
                        // Use showTopNotification instead of alert
                        showTopNotification(data.responsemessage || 'Registration failed. Please try again.', 'error');

                        // Also show in error div
                        $("#logindateerror").text(data.responsemessage);
                        $("#logindateerror").slideDown();
                        $("#logindateerror").delay(10000).slideUp();
                        $("#logindateerror").css("background", "red");
                    }
                },
                failure: function (failureresp) {
                    showTopNotification('Registration failed. Please try again.', 'error');
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = "Home.html";
                        return;
                    }
                    showTopNotification('An error occurred. Please try again.', 'error');
                },
                complete: function () {
                    submitButton.prop("disabled", false).val("Submit");
                }
            });
        } else {
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
                text: "Please Accept Terms and Conditions Or Select The Values",
                icon: "warning",
                buttons: false,
                timer: 3000
            }).then(function () {
                const customStyle = document.getElementById('custom-swal-style');
                if (customStyle) {
                    customStyle.parentNode.removeChild(customStyle);
                }
            });
        }

        return false;
    });
    //------------------------------------------FORGOT PASSWORD METHOD------------------------------------//
    $("#frmForgotPassword").submit(function () {
        var customer_email = $("#txtForgotEmail").val();

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Forgotpassword",
            type: "POST",
            data: { "project_id": Project_Id, "email": customer_email },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                $("#custemail").empty();
                console.log(returndata);
                if (returndata.responseCode == 1) {
                    $("#validationdiv").text("");
                    $("#validationdiv").text(returndata.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");
                    $("#frmForgotPassword").trigger("reset");
                    var location = "otp.html?email=" + customer_email;
                    window.location.href = location;
                } else {
                    $("#logindateerror2").empty();
                    $("#logindateerror2").append(returndata.responsemessage);
                    $("#logindateerror2").slideDown();
                    $("#logindateerror2").delay(5000).slideUp();
                }
            }
        });
    });

    //------------------------------------------FORGOT PASSWORD OTP METHOD------------------------------------//
    $("#frmotp").submit(function () {
        var customer_email = $("#custfrgmail").val();
        var otp1 = $("#txt1").val();
        var otp2 = $("#txt2").val();
        var otp3 = $("#txt3").val();
        var otp4 = $("#txt4").val();
        var otp = otp1 + otp2 + otp3 + otp4;

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Otp",
            type: "POST",
            data: { "project_id": Project_Id, "email": customer_email, "otp": otp },
            dataType: "JSON",
            crossDomain: true,
            success: function (returndata) {
                console.log(returndata);
                if (returndata.responseCode == 1) {
                    console.log(returndata);
                    $("#validationdiv").text("");
                    $("#validationdiv").text(returndata.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "orange");

                    $("#frmForgotPassword").trigger("reset");
                    localStorage.setItem("username", returndata.name);
                    localStorage.setItem("authorid", returndata.authorid);
                    var usersession = localStorage.getItem("authorid");

                    if (usersession != null) {
                        $(".myaccount").show();
                        $(".cLogin").hide();
                        $(".cust_name").html(username);
                    }
                    $("#validationdiv").text("Logged in successfully");
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(10000).slideUp();
                    $("#validationdiv").css("background", "#026633");
                    var location = "Resetpassword.html";
                    window.location.href = location;
                } else {
                    $("#logindateerror").text("");
                    $("#logindateerror").text(returndata.responsemessage);
                    $("#logindateerror").slideDown();
                    $("#logindateerror").delay(5000).slideUp();
                }
            }
        });
    });

    //------------------------------------------CUSTOMER LOGOUT METHOD------------------------------------//

    //$(".cust_logout").click(function () {
    //    swal({
    //        title: "Logout?",
    //        text: "Do you really want to logout from this session?",
    //        icon: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#9FC443",
    //        confirmButtonText: "Yes, Logout!",
    //        cancelButtonText: "No, cancel!",
    //    }).then((result) => {
    //        if (result.value) {
    //            var usersession = localStorage.getItem("authorid");
    //            var username = localStorage.getItem('username');
    //            if (usersession != null) {
    //                ProjectAuth = "";
    //                usersession = null;
    //                usersession = "";
    //                localStorage.clear();

    //                // Show a success message before redirection
    //                swal({
    //                    title: "Logged out!",
    //                    text: "You logged out successfully.",
    //                    icon: "success",
    //                    button: "Ok",
    //                }).then(() => {
    //                    // Redirect to home page after showing the success message
    //                    window.location.href = "Home.html";
    //                });
    //            }
    //        } else {
    //            swal("Cancelled", "Your Session is safe :)", "error");
    //        }
    //    });
    //});
    //     $(".cust_logout").click(function () {
    //         const style = document.createElement('style');
    //         style.type = 'text/css';
    //         style.id = 'custom-swal-style'; // ID to easily identify and remove the style later
    //         style.innerHTML = `
    //         .swal2-confirm::before {
    //             content: "";
    //             color: white;
    //             text-align:center !important;
    //         }
    //         .swal2-confirm {
    //             content: "Yes";
    //             color: white !important; /* Hide the button's original text */
    //         }
    //     `;
    //         document.getElementsByTagName('head')[0].appendChild(style);

    //         swal({
    //             title: "",
    //             text: "Are you sure you want to logout?",
    //             icon: "warning",
    //             buttons: {
    //                 confirm: {
    //                     text: "YES",
    //                     value: true,
    //                     visible: true,
    //                     className: "",
    //                     closeModal: false
    //                 }
    //             }
    //             //buttons: {
    //             //    cancel: {
    //             //        text: "No, cancel!",
    //             //        visible: true,
    //             //        closeModal: true
    //             //    },
    //             //    confirm: {
    //             //        text: "Yes, Logout!",
    //             //        value: true,
    //             //        closeModal: false
    //             //    }
    //             //},


    //         }).then(function (isConfirm) {
    //         if (isConfirm) {
    //             var usersession = localStorage.getItem("authorid");
    //             if (usersession !== null) {
    //                 // Save current cart before logout
    //                 var current_cart_id = localStorage.getItem("cart_id");
    //                 if (current_cart_id && usersession) {
    //                     localStorage.setItem("user_cart_" + usersession, current_cart_id);
    //                 }

    //                 localStorage.removeItem("username");
    //                 localStorage.removeItem("authorid");
    //                 localStorage.removeItem("userGender");
    //                 localStorage.removeItem("cart_id");
    //                 localStorage.removeItem("redirectionpage");

    //                 if (typeof cart_id !== 'undefined') {
    //                     cart_id = null;
    //                 }

    //                 setTimeout(function () {
    //                     window.location.href = "Home.html";
    //                 }, 2000);
    //             }
    //         }
    //     });
    // });



    function updateAnalyticsBanner() {
        // Try to find analytics banner elements 
        const analyticsTitle = document.getElementById('analytics-title');
        const analyticsDescription = document.getElementById('analytics-description');

        // Try to find video banner elements
        const videoTitle = document.querySelector('.video-caption h2');
        const videoParagraphs = document.querySelectorAll('.video-caption p');

        const isLoggedIn = localStorage.getItem('authorid') !== null;

        // Update Analytics Banner (if found)
        if (analyticsTitle && analyticsDescription) {
            if (isLoggedIn) {
                analyticsTitle.textContent = "Shop Perfumes Using AI-Based User Analytics";
                analyticsDescription.textContent = "Step into the exciting world of AmeriFrag, where your fragrance journey is uniquely tailored to your preferences through our innovative user analytics. At AmeriFrag, we've meticulously crafted a comprehensive set of categories to gather detailed insights about your tastes and preferences. Each category is designed to capture a specific aspect of the fragrance profile, ensuring that both your personalized and product BARCODES reflect your exact needs and desires as well as dynamic trends in real-time.";
            } else {
                analyticsTitle.textContent = "Shop Perfumes Using AI-Based User Analytics";
                analyticsDescription.textContent = "Step into the exciting world of AmeriFrag, where your fragrance journey is uniquely tailored to your preferences through our innovative user analytics. At AmeriFrag, we've meticulously crafted a comprehensive set of categories to gather detailed insights about your tastes and preferences. Each category is designed to capture a specific aspect of the fragrance profile, ensuring that both your personalized and product BARCODES reflect your exact needs and desires as well as dynamic trends in real-time.";
            }
            console.log("Analytics banner updated - Logged in:", isLoggedIn);
        }

        // Update Video Banner (if found)
        if (videoTitle && videoParagraphs.length >= 3) {
            if (isLoggedIn) {
                videoTitle.innerHTML = 'Shop Perfumes Using <span>AI</span>';
                videoParagraphs[0].innerHTML = 'Indulge in Fragrances Curated Just For You With Your';
                videoParagraphs[1].innerHTML = 'Unique AmeriFrag Barcode';
                videoParagraphs[2].innerHTML = 'Powered by Patented AI Technology';

                if (videoParagraphs[3]) {
                    videoParagraphs[3].innerHTML = 'Powered by PatentedAI Technology';
                    videoParagraphs[3].classList.add('highlights');
                }
            } else {
                videoTitle.innerHTML = 'Shop Perfumes Using <span>AI</span>';
                videoParagraphs[0].innerHTML = 'Indulge in Fragrances Curated Just For You With Your';
                videoParagraphs[1].innerHTML = 'Unique AmeriFrag Barcode';
                videoParagraphs[2].innerHTML = 'Powered by Patented AI Technology';

                if (videoParagraphs[3]) {
                    videoParagraphs[3].innerHTML = 'Powered by PatentedAI Technology';
                    videoParagraphs[3].classList.add('highlights');
                }
            }
            console.log("Video banner updated - Logged in:", isLoggedIn);
        }

        // Update button text based on login status
        const signatureBtn = document.querySelector('.signature-scents-btn');
        const signatureBtnById = document.getElementById('revealSignatureScents');

        if (signatureBtn || signatureBtnById) {
            const btnElement = signatureBtn || signatureBtnById;
            if (isLoggedIn) {
                btnElement.textContent = `Reveal my signature scents`;
                btnElement.title = "Powered by PatentedAI Technology";
            } else {
                btnElement.textContent = "Reveal my signature scents";
                btnElement.title = "Login to discover your signature scents";
            }

            console.log("Signature button updated - Logged in:", isLoggedIn);
        }

        // Update UI elements based on login status
        if (isLoggedIn) {
            $(".myaccount").show();
            $(".cLogin").hide();
            $(".offer-text").hide();
            const username = localStorage.getItem('username');
            if (username) {
                $(".cust_name").html(username);
            }
        } else {
            $(".myaccount").hide();
            $(".cLogin").show();
            $(".offer-text").show();
            $(".cust_name").html('');
        }

        // Debug info
        console.log("Banner update completed:", {
            isLoggedIn: isLoggedIn,
            username: localStorage.getItem('username'),
            analyticsFound: !!(analyticsTitle && analyticsDescription),
            videoFound: !!(videoTitle && videoParagraphs.length >= 3),
            buttonFound: !!(signatureBtn || signatureBtnById)
        });
    }

    // Logout function
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
            if (isConfirm) {
                var usersession = localStorage.getItem("authorid");
                if (usersession !== null) {
                    // Save current cart before logout
                    var current_cart_id = localStorage.getItem("cart_id");
                    if (current_cart_id && usersession) {
                        localStorage.setItem("user_cart_" + usersession, current_cart_id);
                    }

                    // Remove all user data
                    localStorage.removeItem("username");
                    localStorage.removeItem("authorid");
                    localStorage.removeItem("userGender");
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("redirectionpage");
                    localStorage.setItem("isLoggedIn", "false");

                    // Update banner immediately after logout
                    setTimeout(function () {
                        updateAnalyticsBanner();
                    }, 100);

                    if (typeof cart_id !== 'undefined') {
                        cart_id = null;
                    }

                    setTimeout(function () {
                        window.location.href = "Home.html";
                    }, 1000);
                }
            }
        });
    });

    // Click handler for signature scents button
    $(document).on("click", "#revealSignatureScents", function (e) {
        e.preventDefault();

        const Authkey = localStorage.getItem('authorid');
        const analyticsUrl = "./show-all.html?analytics=products";

        if (Authkey == null || Authkey == undefined || Authkey == '') {
            localStorage.removeItem("redirectionpage");
            localStorage.setItem("redirectionpage", analyticsUrl);
            $("#loginpopup").modal('show');
        } else {
            window.location.href = analyticsUrl;
        }

        console.log("Signature Scents clicked - Logged in:", (Authkey !== null), "Redirecting to:", analyticsUrl);
    });
});

//$(".cust_logout").click(function () {
//Swal.fire({
//    title: "",
//    text: "Are you sure you want to logout?",
//    icon: "warning",
//    showCancelButton: false, // Do not show the cancel button
//    confirmButtonText: "YES", // Text for the confirm button
//    allowOutsideClick: false // Prevent closing the modal by clicking outside
//}).then(function (result) {
//    if (result.isConfirmed) {
//        var usersession = localStorage.getItem("authorid");
//        if (usersession !== null) {
//            localStorage.clear();

//            // Show a success message before redirection
//            Swal.fire({
//                title: "Logged out!",
//                text: "You logged out successfully.",
//                icon: "success",
//                confirmButtonText: "Ok",
//                allowOutsideClick: false
//            }).then(function () {
//                window.location.href = "Home.html"; // Redirect after showing the success message
//            });
//        }
//    } else {
//        Swal.fire("Cancelled", "Your session is safe :)", "error");
//    }
//});
//});

//-------------------------------------------------------------//
//
//var usersession = localStorage.getItem("authorid");
//var username = localStorage.getItem('username');
//if (usersession != null) {
//    ProjectAuth = "";
//    usersession = null;
//    usersession = "";
//    localStorage.removeItem("authorid");
//    localStorage.removeItem("AddressID");
//    window.location.href = "Home.html";
//setTimeout(function () { document.location.href = "myNextPage.html;" }, 100);
//  setTimeout(function () { document.location.href = "Home.html" }, 100);
//location.href = 'Home.html';
//}



//Questions Fetch
function getquestions() {
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
                    var qun1 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun1">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun1" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="' + value.option11 + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="' + value.option12 + '" id="option12' + value.id + '">' + value.option12 + '</option><option value="' + value.option13 + '" id="option13' + value.id + '">' + value.option13 + '</option><option value="' + value.option14 + '" id="option14' + value.id + '">' + value.option14 + '</option><option value="' + value.option15 + '" id="option15' + value.id + '">' + value.option15 + '</option><option value="' + value.option16 + '" id="option16' + value.id + '">' + value.option16 + '</option></select></div></div>';
                    $("#fqun1").append(qun1);
                    var qun11 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun1">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun1" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="' + value.option11 + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="' + value.option12 + '" id="option12' + value.id + '">' + value.option12 + '</option><option value="' + value.option13 + '" id="option13' + value.id + '">' + value.option13 + '</option><option value="' + value.option14 + '" id="option14' + value.id + '">' + value.option14 + '</option><option value="' + value.option15 + '" id="option15' + value.id + '">' + value.option15 + '</option><option value="' + value.option16 + '" id="option16' + value.id + '">' + value.option16 + '</option></select></div></div>';
                    $("#dis_fqun1").append(qun11);
                } else if (qunid == "3317a312-cacf-4485-8875-a93edfd917d4") {
                    var qun2 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun2">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun2" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="option11' + value.id + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="option12' + value.id + '" id="option12' + value.id + '">' + value.option12 + '</option></select></div></div>';
                    $("#fqun2").append(qun2);
                    var qun22 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun2">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun2" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option><option value="' + value.option11 + '" id="option11' + value.id + '">' + value.option11 + '</option><option value="' + value.option12 + '" id="option12' + value.id + '">' + value.option12 + '</option></select></div></div>';
                    $("#dis_fqun2").append(qun22);
                } else if (qunid == "20c73ce8-568b-4665-b867-5fb5661fba25") {
                    var qun3 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun3">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun3" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun3").append(qun3);
                    var qun33 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun3">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun3" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun3").append(qun33);
                } else if (qunid == "74beb36c-1d36-4749-a2b8-f5eac22f0e91") {
                    var qun4 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun4">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun4" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun4").append(qun4);
                    var qun44 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun4">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun4" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun4").append(qun44);
                } else if (qunid == "1e683249-d64a-4dbb-ae97-77944a6dd4ca") {
                    var qun5 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun5">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun5" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun5").append(qun5);
                    var qun55 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun5">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun5" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun5").append(qun55);
                } else if (qunid == "7d72ccb5-9e15-40c1-9883-4b058137b8ae") {
                    var qun6 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun6">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun6" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun6").append(qun6);
                    var qun66 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun6">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun6" disabled="true" ><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun6").append(qun66);
                } else if (qunid == "7d5916e8-bf50-49ff-84f7-6516e93f2b19") {
                    var qun7 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun7">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun7" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun7").append(qun7);
                    var qun77 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun7">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun7" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun7").append(qun77);
                } else if (qunid == "d5035617-d5c1-429a-879f-9cac37db6670") {
                    var qun8 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun8">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun8" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun8").append(qun8);
                    var qun88 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun8">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun8" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun8").append(qun88);
                } else if (qunid == "9509372c-83ed-4694-b36f-feeeae4e0e72") {
                    var qun9 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun9">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun9" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#fqun9").append(qun9);
                    var qun99 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="qun9">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="qun9" disabled="true"><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                    $("#dis_fqun9").append(qun99);
                } else if (qunid == "3aab7981-e9da-4904-9862-ecbcced97c7f") {
                    var qun10 = '<div class="row py-2"><div class="col-md-8"><label class="form-label" for="dqun10">' + value.question + '</label></div><div class="col-md-4"><select class="modal-select" id="dqun10" required><option value="" >Select</option><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
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
getquestions();

const phoneInputField = document.querySelector("#Phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});