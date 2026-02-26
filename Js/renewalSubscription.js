var Project_Id = GlobalInputs();
let Authkey = localStorage.getItem("authorid");

$(document).ready(function () {
    var Project_Id = GlobalInputs();
   
    var url = window.location.search;
    var params = new URLSearchParams(url);
    let Authkey = params.get('customerId');
    if (Authkey == null || Authkey == "") {
        window.location.href = "/Home.html"
    }
    var subscriptionTypeId = params.get('subscriptionTypeId'); 
    var subscriptionId = params.get('subscriptionId');    
    var planName = params.get('plan');
    var price = params.get('amount');
    var days = params.get('days');
    var productCount = params.get('productCount');

    $('.planName').text(planName);
    $('.days').text(days);
    $('.subprice').text(price);
    $('.productCount').text(productCount);
 
    getdatatable();
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                //var bindingprofile = '<div class="row"> <div class="col-md-3"> <p class="lbl_label">Name</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.name + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Email Id</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.email + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Mobile Number</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.phone + '</p> </div> </div>';
                //$("#dvfetchcust_details").append(bindingprofile); 
                $(".Hello_txt_big").text(data.firstname);

            },
            error: function (xhr) {
            }
        });
    };
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price  // Set your payment amount here
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
               
                var transid = details.id;

                // Confirm dialog instead of alert
                showPopup("Payment successful!");
                $('#popupok-button').on('click', function () {
                    closePopup();
                    if (transid) {

                        $.ajax({
                            url: "https://api.americanfragrances.com/Subscription/RenewalOfSubscription?CustomerId=" + Authkey + "&SubscriptionId=" + subscriptionId,
                            type: "POST",
                            dataType: "json",
                            crossDomain: true,
                            success: function (data) {
                                console.log('First AJAX call success:', data);
                                if (data.responseCode == 1) {


                                    $.ajax({
                                        url: "https://api.americanfragrances.com/Subscription/ProcessTransaction",
                                        type: "POST",
                                        data: { "CustomerID": Authkey, "TransactionID": transid, "SubscriptionTypeId": subscriptionTypeId },
                                        dataType: "json",
                                        crossDomain: true,
                                        success: function (data) {
                                            console.log('Second AJAX call success:', data);
                                            if (data.responseCode == 1) {
                                                window.location.href = '/MySubscriptionsList.html';
                                            } else {
                                                console.log('Second AJAX call failed:', data);
                                            }
                                        },
                                        error: function (xhr) {
                                            console.error('Second AJAX call error:', xhr);
                                            if (xhr.status === 401) {
                                                window.location.href = "/Admin/Login.html";
                                            }
                                        }
                                    });
                                } else {
                                    console.log('First AJAX call failed:', data);
                                }
                            },
                            error: function (xhr) {
                                console.error('First AJAX call error:', xhr);
                                if (xhr.status === 401) {
                                    window.location.href = "/Home.html";
                                }
                            }
                        });
                    } else {
                        console.error('Transaction ID is missing or user did not confirm.');
                    }
                });
            });
        }
    }).render('#paypal-button-container');


    if (!localStorage.getItem('reloadFlag')) {
        // Set the flag in localStorage
        localStorage.setItem('reloadFlag', 'true');

        // Reload the page
        window.location.reload();
    } else {
        // Remove the flag so the reload can happen again in the future if needed
        localStorage.removeItem('reloadFlag');
    }
    

    function showPopup(title, message) {
        $('#popupalert-title').text(title);
        $('#popupalert-message').text(message);
        $('#popup-alert').fadeIn(300);
    }
    function closePopup() {
        $('#popup-alert').fadeOut(300);
    }
    $('#popupclose-alert').on('click', function () {
        closePopup();
    });





});


