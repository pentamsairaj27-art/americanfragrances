$(document).ready(function () {
     
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var selectElementId = "";
    if (Authkey == null || Authkey == "") {
        window.location.href = "/Home.html"
    }

    var parentpage = window.top.location.pathname;
    localStorage.removeItem("parentpage");
    localStorage.setItem("parentpage", parentpage);
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var subscriptionTypeId = params.get('subscriptionTypeId');
    /*var startdate = params.get('startdate');*/
    var planName = params.get('planName');
    var discount = params.get('discount');
    var shipping = params.get('shipping');
    var productCount = params.get('productCount');
    if (shipping == 0) {
        shipping = 'Free';
    }
    $("#selected_planename").text(planName);
    $(".Discount").text(discount);
    $(".Shipping").text(shipping);
    $(".selected-Product-Count").text(productCount);

    //$('#amountShowingPopup').modal('show');
    var payurl = "";
    getdatatable();
    getdatatable2();
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
    for (var i = 1; i <= productCount; i++) {
        var productDiv = `
    <div class="col-md-4 pt-5 pb-5">
        <div class="card text-center">
        <input type="hidden" class="product-id" value="">
            <div class="text-center" style="margin-top:-15%; height:100px" class="imageContainer">
                <img class="productImg img-fluid" src="Images/subscriptionImg/fragranceSubscriptionClub.png"   style="width:25%"   />
            </div>
              
             <p class="d-none productAllDetails" >
                <span class="product-name pt-2"></span><br/>            
                <span class="produtSize"></span><br/>
                <span class="brandNameLabel">By: <span class="brandName"></span></span><br/>
                <span class="ProdctPriceLabel">Price: $<span class="ProdctPrice"></span></span>
             </p>

              <div class="row" style="margin:auto;">
              <div class="col-md-4"> <p class="" style="margin-bottom:0px !important">Delivery Date: </p></div>
               <div class="col-md-8">  <input class="form-control deliveryDate" type="date" /> </div>
              </div>
            <div class="text-center"><button type="button" style="width:auto !important;" class="btn btn-primary d-inline chooseProduct pt-2 mt-3" data-toggle="modal" data-target="#analyizepopup" id="chooseProduct${i}"> Choose Product </button>
           </div>
            
            <br />
        </div>
    </div>`;

        $(".productSelectionContainer").append(productDiv);
    }

   



    $(document).on("click", ".createSubscription", function () {
        var productIds = [];
        var AlertPurposeProId = []
        var AlertPurposeDates=[]
        var deliveryDates = [];
        var count = 0;
        // Iterate over each product div
        $(".col-md-4.pt-5.pb-5").each(function () {
            count++;
            // Find the product ID and delivery date within this div
            var productId = $(this).find(".product-id").val(); // Get the selected product ID
            var deliveryDate = $(this).find(".deliveryDate").val(); // Get the delivery date
            if (productId !="") {
                AlertPurposeProId.push(productId);
            }
            if (deliveryDate !="") {
                AlertPurposeDates.push(deliveryDate);
            }
        
          
            // Check if productId and deliveryDate are available
            if (productId && deliveryDate) {
                productIds.push(productId);
                deliveryDates.push(deliveryDate);
            }
        });

        // Convert arrays to comma-separated strings
        var productIdsStr = productIds.join(',');
        var deliveryDatesStr = deliveryDates.join(',');

       

        // Example: sending data via AJAX request
        if (productIds.length == count && deliveryDates.length == count) {
            $.ajax({
                url: "https://api.americanfragrances.com/Subscription/CreateSubscription",
                type: "POST",
                data: {
                    "ProductIds": productIdsStr, "DeliveryDates": deliveryDatesStr, "CustomerId": Authkey, "SubscriptionTypeId": subscriptionTypeId
                },
                dataType: "json",
                crossDomain: true,

                success: function (data) {
                    // Handle success
                    if (data.responseCode == 1) {
                        localStorage.setItem('SubscriptionId', data.SubscriptionId);
                        localStorage.setItem('TotalPrice', data.TotalPrice);
                       var SubscriptionDiscount = parseFloat(data.SubscriptionDiscount).toFixed(2);
                        var SubTotal = parseFloat(data.SubTotal).toFixed(2);
                        var SubscriptionPrice = parseFloat(data.SubscriptionPrice).toFixed(2);
                       var  TotalPrice = parseFloat(data.TotalPrice).toFixed(2);
                        $('#amountShowingPopup').modal('show');
                        $(".SubscriptionPrice").text(SubscriptionPrice);
                        $(".SubscriptionSubTotal").text(SubTotal);
                        $(".SubscriptionDiscount").text(SubscriptionDiscount);
                        $(".SubscriptionTotal").text(TotalPrice);
                        payurl = "/SubscriptionPayment.html?SubscriptionId=" + data.SubscriptionId + "&amount=" + data.TotalPrice
                        //$(".proceedToChecout").attr("href", "/SubscriptionPayment.html?SubscriptionId=" + data.SubscriptionId + "&amount=" + data.TotalPrice);

                    //      window.location.href = "/SubscriptionPayment.html?SubscriptionId=" + data.SubscriptionId + "&amount=" + data.TotalPrice;
                    } else {
                        showPopup(data.Message)
                        $('#popupok-button').on('click', function () {
                            closePopup();
                        });
                    }
                },
                error: function (xhr) {
                    // Handle error
                    console.error("Error sending data:", xhr);
                }
            });
        }
        else {
            if (AlertPurposeProId.length != count && AlertPurposeDates.length != count) {
                showPopup("Select Delivery Dates and Products")
            }
            else if (AlertPurposeProId.length != count) {
                showPopup("Select  Products")
            } else if (AlertPurposeDates.length != count) {
                showPopup("Select Delivery Dates")
            }
            
        }
       
    });
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





    var today = new Date();

    // Add 7 days to today's date
    var oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    // Format the date as YYYY-MM-DD
    var dd = String(oneWeekLater.getDate()).padStart(2, '0');
    var mm = String(oneWeekLater.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = oneWeekLater.getFullYear();

    var minDate = yyyy + '-' + mm + '-' + dd;

    // Set the min attribute for all elements with the class deliveryDate
    var dateInputs = document.querySelectorAll(".deliveryDate");
    dateInputs.forEach(function (input) {
        input.setAttribute("min", minDate);
    });
    var MyInterVal;
    $(document).on("click", ".AddressCheck", function () {
      MyInterVal=  setInterval(function () {
            getdatatable2(); // You missed () to actually call the function
        }, 10000); // 10000 milliseconds = 10 seconds

    });


    //showing Primary address
    function getdatatable2() {

        $.ajax({
            url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + Authkey + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,

            success: function (data) {
                $("#shipmentAddress").empty();
                if (data != "" && data.id != "00000000-0000-0000-0000-000000000000") {
                    data.responsemessage;
                    i = 0;
                    $.each(data, function (Index, value) {
                        if (value.isprimary) {

                            var newrowContent = '<div class="col-md-9 removediv"><div class="address_box addressbox" style="padding:3px !important;"><div><p>Shipment Address :</p></div><hr><p><input type="radio" id=' + value.id + ' checked name="address"/><span>&nbsp;&nbsp;</span><span class="Person_name">' + value.firstname + ' ' + value.lastname + '</span> </p> <span class="person_address"> ' + value.addressline1 + '</span><br><span class="person_address"> ' + value.city + ' </span><span class="person_address"> ' + value.state + ' </span><span class="person_address"> ' + value.country + ' </span><span class="person_address"> ' + value.pincode + ' </span><p class="person_mobile_no">Mobile: ' + value.phone + ' </p></div></div>'
                        }
                      
                        $("#shipmentAddress").append(newrowContent);


                    });
                }
             


            }
        });
    };

    $(document).on("click", ".proceedToChecout", function () {
        clearInterval(MyInterVal);
        window.location.href = payurl;
    });


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

    //-------------------------------------subscription new code-----------------------------------//
    $('iframe').on('load', function () {

    });

    var product_id = "";
    var ChooseProductBtId = "";
    $(document).on("click", ".chooseProduct", function () {
        ChooseProductBtId = $(this).attr("id");       
        localStorage.setItem("chosenProductDV", ChooseProductBtId);
        //$('iframe').contents().off('click', '.cartbtn').on('click', '.cartbtn', function () {
        //    product_id = $(this).attr("data");
        //    $('#analyizepopup').modal('toggle'); 
        //    AppendDetailsOfProduct(product_id, ChooseProductBtId)  
        //});
    });
    //$('#showAllproducts').on('click', '.cart_btn', function () {
    //    var product_id = $(this).data('id'); // Assuming you have a data-id attribute
    //    AppendDetailsOfProduct(product_id, ChooseProductBtId);
    //});
    //$('#showAllproducts').contents().on('click', '.cart_btn ', function () {
    //    product_id = $(this).attr("data");
    //    AppendDetailsOfProduct(product_id, ChooseProductBtId)
    //})
    //$('#subscriptionIframe').contents().on('click', '.cart_btn ', function () {
    //    product_id = $(this).attr("data");
    //    AppendDetailsOfProduct(product_id, ChooseProductBtId)
    //});
   



    //function AppendDetailsOfProduct(product_id, ChooseProductBtId) {
    //    $.ajax({
    //        url:
    //            "https://api.americanfragrances.com/Home/Productview?project_id=" +
    //            Project_Id +
    //            "&id=" +
    //            product_id +
    //            "",
    //        type: "GET",
    //        dataType: "JSON",
    //        async: false,
    //        crossDomain: true,
    //        success: function (data) {  
    //            var salePrice = parseFloat(data.price).toFixed(2);
    //            var originalPrice = parseFloat(data.rate).toFixed(2);
    //            var discount_price = parseFloat(data.discount_price).toFixed(2);
    //            var stock_count = data.stock;
    //            var productName = data.name;
    //            var Stock = "";

    //            if (data.stock != 0) {
                 
    //                Stock = "In Stock"
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.productAllDetails').removeClass('d-none');
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.product-name').text(productName);
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.brandName').text(data.brandname);
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.produtSize').text(data.mood + " " + data.dimension);
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.ProdctPrice').text(salePrice);
    //                /*$(`#${ChooseProductBtId}`).closest('.card').find('.ProdctStocK').text(Stock);*/
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.product-id').val(product_id);  // Example: if you want to store it in a hidden input
    //                $(`#${ChooseProductBtId}`).closest('.card').find('.productImg').attr("src", data.display_image); 
    //            } else {
    //                showPopup("Out Of Stock")

    //            }             
               
    //        },
    //    });
    //}
    $(document).on("click", ".AddressCheck", function () {
        ChooseProductBtId = $(this).attr("id");        
        $('#addresspage').modal('show');  
    });
 
    /**
     * Event handler for viewing product details within an iframe
     * 
     * @description
     * - Triggered when '.viewDetails' element is clicked inside an iframe
     * - Retrieves the product ID from the clicked element's data attribute
     * - Toggles the analysis popup modal
     * - Creates a new iframe with the product view subscription page
     * - Inserts the iframe into the Product View popup modal
     * - Toggles the Product View popup modal
     * - Sets up an event listener for the iframe's load event to handle cart button interactions
     * 
     * @event click
     * @listens $('iframe').contents()
     * 
     * @steps
     * 1. Extract product ID from clicked element
     * 2. Close analysis popup
     * 3. Create iframe with product-specific URL
     * 4. Insert iframe into modal
     * 5. Open Product View popup
     * 6. Add event listener for iframe load
     * 7. Set up cart button click handler within iframe
     * 
     * @requires jQuery
     * @requires Bootstrap modal
     */
    //$('iframe').contents().on('click', '.viewDetails', function () {
    //    var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
    //    $('#analyizepopup').modal('toggle'); // Toggle the modal to open it

    //    // Construct the iframe with the correct product ID and dimensions
    //    var newrowcontent = '<iframe sandbox="allow-scripts allow-same-origin" id="subscriptionIframe"  src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';

    //    // Insert the new iframe content into the modal body
    //    $('#ProductViewPopup .modal-body').html(newrowcontent);

    //    // Show the Product View popup modal
    //    $('#ProductViewPopup').modal('toggle');

    //      $('#subscriptionIframe').on('load', function () {
    //        // Now the iframe content is loaded, attach the event listener for '.cart_btn'
    //        $(this).contents().find('.cart_btn').on('click', function () {
    //            var product_id = $(this).attr("data");
    //            $('#ProductViewPopup').modal('toggle');
    //            AppendDetailsOfProduct(product_id, ChooseProductBtId); // Call your function with appropriate params
    //        });
    //    });
    //});
   
  
   


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
    $('#popupok-button').on('click', function () {
        closePopup();
    });





});



