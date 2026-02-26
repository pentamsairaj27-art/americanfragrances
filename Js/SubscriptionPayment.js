$(document).ready(function () {
var Project_Id = GlobalInputs();
let Authkey = localStorage.getItem("authorid");
if (Authkey == null || Authkey == "") {
    window.location.href = "/Home.html";
}

    var Project_Id = GlobalInputs();
    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var SubscriptionId = params.get('SubscriptionId');
    var price = params.get('amount');
    price = parseFloat(price).toFixed(2);
    //var planName = params.get('planName');
    //var discount = params.get('discount');
    //var shipping = params.get('shipping');
    //var productCount = params.get('productCount');
    //if (shipping == 0) {
    //    shipping = 'Free';
    //}
    //$('.planName').text(planName);
    //$('.Discount').text(discount);
    //$('.Shipping').text(shipping);
    $('.subprice').text(price);
    //$('.productCount').text(productCount);
 
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
                var cust_auth = localStorage.getItem("authorid");
                var transid = details.id;

                // Confirm dialog instead of alert
                //var userConfirmed = confirm('Payment successful! Transaction ID: ' + transid + '. Click OK to continue.');
               /* alert('Payment successful! Transaction ID: ' + details.id);*/
                showPopup("Payment successful!");
                $('#popupok-button').on('click', function () {
                    closePopup();
                    if (transid) {

                        $.ajax({
                            url: "https://api.americanfragrances.com/Subscription/ProcessPaymentAndPlaceOrder",
                            type: "POST",
                            data: { "customerId": Authkey, "subscriptionId": SubscriptionId, "transaction_id": transid },
                            dataType: "json",
                            crossDomain: true,
                            success: function (data) {
                                console.log('First AJAX call success:', data);
                                if (data.responseCode == 1) {
                                    showPopup("Subscription Confirmed Successfully");
                                    $('#popupok-button').on('click', function () {
                                        closePopup();
                                        window.location.href = '/MySubscription.html';
                                    });
                                  
                                   
                                  
                                } else {
                                    showPopup(data.responseMessage)
                                    $('#popupok-button').on('click', function () {
                                        closePopup();
                                    });
                                }
                            },
                            error: function (xhr) {
                                console.error('First AJAX call error:', xhr);
                                if (xhr.status === 401) {
                                    window.location.href = "/Admin/Login.html";
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


