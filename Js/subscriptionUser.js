$(document).ready(function () {
     
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var planStatus = "";
    var productCount = "";
    var productsData = [];
    if (Authkey == null || Authkey == "") {
        window.location.href = "/Home.html"
    }
    var parentpage = window.top.location.pathname;
    localStorage.removeItem("parentpage");
    localStorage.setItem("parentpage", parentpage);

    var url = window.location.search;
    var params = new URLSearchParams(url);
    var getparm = params.get('order');
    var selectElementId = "";

    $('#subscriptionIframe').on('load', function () {
        console.log("Iframe loaded successfully.");
        var iframeContent = $(this).contents();
        console.log(iframeContent); // Check if this logs the iframe's document
    });
    getdatatable();
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $(".Hello_txt_big").text(data.firstname);
       },
            error: function (xhr) {
            }
        });
    };

 
  
    //--------------------------------subscribed plan Details-------------------------------------//
    $.ajax({
        url: "https://api.americanfragrances.com/Subscription/GetActiveSubscriptionDetails?customerId=" + Authkey,
        type: "GET",
        dataType: "json",
        traditional: true,
        success: function (data) {
            if (data.Status == "Active") {
                $(".SubscriptionContentDv").hide();
                $(".showingListOfSubscription").hide();
                $(".subscribedPlan").show();
                planStatus = data.Status;
                productCount = data.ProductCount;
                $("#selected_planename").text(data.PlanName);
                $(".Discount").text(data.Discount);
                $(".PlanStatus").text(data.Status);
                $(".selected-Product-Count").text(data.ProductCount);
                $("#subscriptionId").val(data.Id);
                $(".productSelectionContainer").empty(); // Clear previous products if necessary

                $.each(data.Products, function (index, value) {
                    var deliveryDate = new Date(parseInt(value.DeliveryDate.substr(6)));
                    var formattedDate = deliveryDate.toISOString().split('T')[0];
                    var displayStyle = (value.Status === "Delivered" || value.Status === "Shipping") ? "none" : "";
                    var dataDivstyle = (value.Status === "Delivered" || value.Status === "Shipping") ? "" : "none";
                   

                    var productDiv = `
    <div class="col-md-4 pt-4 pb-4">
        <div class="card2 text-center">
        <input type="hidden" class="product-id-edit"  value="${value.ProductId}">
            <div class="text-center" style=" height:75px" class="imageContainer">
                <img class="productImg-edit img-fluid" src="${value.Image}"   style="width:25%; margin-top:-10%;"   />
            </div>
              
             <p class="productAllDetails pt-3" >
                <span class="product-name-edit pt-2">${value.Name}</span><br/>
                <span class="produtSize-edit">${value.mood} ${value.size}</span><br/>
                                <span class="brandNameLabel" >By: <span class="brandName-edit">${value.brandname}</span></span><br/>
                <span class="ProdctPriceLabel">Price: $<span class="ProdctPrice-edit">${value.price}</span>.00</span>
             </p>

              <div class="row" style="margin:auto;">
              <div class="col-md-4"> <p class="" style="margin-bottom:0px !important">Delivery Date: </p></div>
               <div class="col-md-8">  <input class="form-control deliveryDate" type="date" value="${formattedDate}" /> </div>
              </div>
              <p class="status pt-2" style="color:white !important">Status: <span>${value.Status}</span></p>
            <div class="text-center"><button type="button" style="width:auto !important;" class="btn btn-primary d-none chooseProduct pt-2 mt-3" data-toggle="modal" data-target="#analyizepopup" id="chooseProduct${index}"> Choose Product </button>
            <div class="text-center "><button type="button" style="width:auto !important;background-color:#d3d3d3 !important;padding-left:25px !important;padding-right:25px !important; margin-bottom:-19% !important;" class="btn btn-primary d-inline Editbtn   "  > Edit </button>
     
            </div>
            
            <br />
        </div>
        
    </div>
          `;

                    $(".productSelectionContainer").append(productDiv);
                







                    //var productDiv = `
                    //<div class="col-md-4 pt-4 pb-4">                      
                    //    <div class="card2 text-center position-relative">
                    //      <div class="text-center pt-4 pb-4 mb-3 productImg-edit-container" style="height:120px;">
                    //            <img class="productImg-edit" src="${value.Image}" class="img-fluid" width="25%" />
                    //        </div>
                    //    <input type="hidden" class="product-id-edit" value="${value.ProductId}">
                    //     <p class="product-name-edit">${value.Name}</p>
                    //        <button class="StatusShowingBt ">Status :<span class="Status">${value.Status}<span></button>                       
                    //        <div class="productViewbtn"></div>
                    //        <div style="display:${displayStyle}">
                    //            <button class="btn Edit mt-2 " >Edit</button>
                    //            <div class="EditdataContainer d-none">  
                    //               <p class="pt-2">Delivery Date</p>
                    //                <input class="form-control deliveryDate pl-3 pr-3" type="date" value="${formattedDate}" />                                    
                    //                <button type="button" class="btn btn-primary  mt-3 chooseProduct" data-toggle="modal" data-target="#analyizepopup" id="chooseProduct${index}">Choose Product</button>                                    
                                 
                    //            </div>
                    //        </div>
                    //        <div style="display:${dataDivstyle}">
                    //            <p class="pt-4">Delivery Date</p>
                    //            <p>${formattedDate}</p>
                    //        </div>
                    //        <br />
                    //    </div>
                    //</div>`;

                    //// Append the constructed productDiv to the container
                    //$(".productSelectionContainer").append(productDiv);

                  
                });
               

                $(".deliveryDate").attr("min", minDate);
                // Ensure event delegation for dynamically added elements
                $(".productSelectionContainer").on("click", ".Editbtn", function () {
                    var $editContainer = $(this).closest(".card2").find(".chooseProduct");
                    $editContainer.toggleClass("d-none"); // Toggle the visibility using d-none
                });

            } else {
                $(".showingListOfSubscription").show();
                $(".subscribedPlan").hide();
                ListofSubcriptionPlans();
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/Home.html";
                return;
            }
        }
    });
  
    //--------------------------showing subscription plans------------------------------------------//

    function ListofSubcriptionPlans() {
        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/ListOfSubscriptionTypesForCustomer",
            type: "GET",
            dataType: "json",
            traditional: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var Price = parseFloat(value.Price).toFixed(2);
                    var subscriptionCard = $(
                        '<div class="col-12 col-md-5">' +
                        '<h5 class="text-center mt-4" id="planename" style="margin-bottom:0px;">' + value.Name + '</h5><br>' +
                        '<div class="card mb-4 ml-4 mr-4 p-3">' +
                        '<div class="text-center mt-3">' +
                        '<p><strong class="Subscriptionfee">Subscription Price: <span class="">$' + Price + '</span><br> <span style="color:#d3d3d3 !important">(Non-refundable)</span></strong></p></div>' +
                        '<div class="d-flex flex-row justify-content-between"><div class="text-center" ><img src="' + value.image +'" style="width:100%;" /> </div><div class="plan-Details text-center">' +
                        '<p class="ProductCount"><strong>Product Count: </strong>' + value.ProductCount + '</p>' +
                        '<p class="SubShipping" style="margin-bottom:0px;"><strong>Shipping: </strong>' + (value.shippingcharge == 0 ? 'Free' : value.shippingcharge) + '</p>' +
                        '</div><div class="text-center" ><img src="' + value.image +'" style="width:100%;" /> </div></div>' +
                        '<div class="text-center mt-3">' +
                        '<p><strong class="Discount"> <span class="DiscountPercentage">' + value.discount + '</span>% DISCOUNT <br/> <span style="color:#000">on Total Price <span></strong></p>' +
                        '<button class="btn Planchoose" id="' + value.ID + '" ' +
                        'data-name="' + value.Name + '" ' +
                        'data-discount="' + value.discount + '" ' +
                        'data-price="' + value.Price + '" ' +
                        'data-shipping="' + value.shippingcharge + '" ' +
                        'data-productcount="' + value.ProductCount + '" type="submit"> Select Plan</button > ' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );


                    $('.cardsContaner').append(subscriptionCard);


                });
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                    return;
                }
            }
        });
    }
   
    //-------------------------------------------user taken list of subscriptions in table---------------------------------//
    $.ajax({
        url: "https://api.americanfragrances.com/Subscription/ListofSubscriptionsOFCustomer?CustomerId=" + Authkey,
        type: "GET",
        dataType: "json",
        traditional: true,
        success: function (data) {
            if (data.length > 0) {
                $.each(data, function (Index, value) {

                    //var startTimestamp = parseInt(value.StartDate.replace('/Date(', '').replace(')/', ''), 10);
                    //var endTimestamp = parseInt(value.EndDate.replace('/Date(', '').replace(')/', ''), 10);


                    //var startdate = new Date(startTimestamp);
                    //var enddate = new Date(endTimestamp);


                    //var formattedStartDate = startdate.toLocaleDateString();
                    //var formattedEndDate = enddate.toLocaleDateString();

                    // Format the amount
                    var amount = parseFloat(value.Amount).toFixed(2);

                    // Construct the new row content
                    var newrowContent = "<tr><td> " + value.id + " </td> <td>" + value.Name + "</td><td>" + ('$' + amount || "") + "</td> <td>" + (value.ProductCount || "") + "</td> <td>" + (value.Status == true ? "Active" : "Inactive") + "</td><td>" + (value.Delivery == "Cancel Available" ? "<button class='btn cancelSubscription' id='" + value.id + "'>Cancel</button>" : "No Need to Cancel") + "</td></tr>";

                    // Append the new row to the table
                    $("#order_list tbody").append(newrowContent);
                });
                $('#order_list').DataTable();
            }

       
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "Home.html";
                return;
            }
        }
    });

    var today = new Date();

    // Add 7 days to today's date
    var oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    // Format the date as YYYY-MM-DD
    var dd = String(oneWeekLater.getDate()).padStart(2, '0');
    var mm = String(oneWeekLater.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = oneWeekLater.getFullYear();
    var minDate = yyyy + '-' + mm + '-' + dd;

    //------------------------------------------------- choose plan -----------------------------------------------------//
    $(".cardsContaner").on('click', ".Planchoose", function () {
        var subscriptionTypeId = $(this).attr("id");
        var planName = $(this).data("name");
        var discount = $(this).data("discount");
        var price = $(this).data("price");
        var shipping = $(this).data("shipping");
        var productCount = $(this).data("productcount");
        window.location.href = '/SubscriptionPlanDetails.html?' +
            'subscriptionTypeId=' + subscriptionTypeId +
            '&price=' + price +
            '&planName=' + planName +
            '&discount=' + discount +
            '&shipping=' + shipping +
            '&productCount=' + productCount;
        
    });



    //-------------------------------------updating subscription plan---------------------------//
    $(document).on("click", "#updateSubscription", function () {
        var productIds = [];
        var deliveryDates = [];
        var subscriptionId = $("#subscriptionId").val();
        // Iterate over each product div
        $(".col-md-4.pt-4.pb-4").each(function () {
            // Find the product ID and delivery date within this div
            var productId = $(this).find(".product-id-edit").val(); // Get the selected product ID
            var deliveryDate = $(this).find(".deliveryDate").val(); // Get the delivery date

            // Check if productId and deliveryDate are available
            if (productId && deliveryDate) {
                productIds.push(productId);
                deliveryDates.push(deliveryDate);
            }
        });

        // Convert arrays to comma-separated strings
        var productIdsStr = productIds.join(',');
        var deliveryDatesStr = deliveryDates.join(',');

        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/UpdateSubscription",
            type: "POST",
            data: {
                "ProductIds": productIdsStr, "DeliveryDates": deliveryDatesStr, "CustomerId": Authkey, "SubscriptionId": subscriptionId
            },
            dataType: "json",
            crossDomain: true,

            success: function (data) {
                // Handle success
                if (data.responseCode == 1) {
                    localStorage.setItem('SubscriptionId', data.SubscriptionId);
                    localStorage.setItem('TotalPrice', data.TotalPrice);
                    var oldTotalPrice = parseFloat(data.oldTotalPrice).toFixed(2);
                    var SubTotal = parseFloat(data.SubTotal).toFixed(2);
                    var SubscriptionPrice = parseFloat(data.SubscriptionPrice).toFixed(2);
                    var TotalPrice = parseFloat(data.TotalPrice).toFixed(2);
                    $('#UpdateamountShowingPopup').modal('show');
                   // $(".SubscriptionPrice").text(SubscriptionPrice);
                    $(".PreviousSubscriptionSubTotal").text(oldTotalPrice);
                    $(".SubscriptionSubTotal").text(SubTotal);
                   // $(".SubscriptionDiscount").text(SubscriptionDiscount);
                    $(".SubscriptionTotal").text(TotalPrice);
                     $(".proceedToChecout").attr("href", "/SubscriptionPayment.html?SubscriptionId=" + data.SubscriptionId + "&amount=" + data.TotalPrice);


                    if (data.TotalPrice == 0) {
                        $(".proceedToChecout").addClass('d-none') 

                        showPopup(data.Message);
                        $('#popupok-button').on('click', function () {

                            closePopup();
                            
                           // window.location.href = '/MySubscription.html';
                        });
                    } else {
                        $(".proceedToChecout").removeClass('d-none') 
                        localStorage.setItem('SubscriptionId', data.SubscriptionId);
                        localStorage.setItem('TotalPrice', data.TotalPrice);
                      //  window.location.href = "/SubscriptionPayment.html?SubscriptionId=" + data.SubscriptionId + "&amount=" + data.TotalPrice;

                    }





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

        // Example: sending data via AJAX request

    });

    //-------------------------------------subscription new code-----------------------------------//
    $('#showAllproducts').on('load', function () {

    });

    var product_id = "";
    var ChooseProductBtId = "";
    $(document).on("click", ".chooseProduct", function () {
        ChooseProductBtId = $(this).attr("id");
        localStorage.setItem("chosenProductDV", ChooseProductBtId);
        //$('#showAllproducts').contents().on('click', '.cartbtn', function () {
        //    product_id = $(this).attr("data");
        //    $('#analyizepopup').modal('toggle');
        //    AppendDetailsOfProduct(product_id, ChooseProductBtId)
        //});
    });
    //$('#showAllproducts').contents().on('click', '.cart_btn ', function () {
    //    product_id = $(this).attr("data");
    //    AppendDetailsOfProduct(product_id, ChooseProductBtId)
    //})
    //$('#subscriptionIframe').on('load', function () {
    //    // Now the iframe content is loaded, attach the event listener for '.cart_btn'
    //    $(this).contents().find('.cart_btn').on('click', function () {
    //        var product_id = $(this).attr("data");
    //        $('#ProductViewPopup').modal('toggle');
    //        AppendDetailsOfProduct(product_id, ChooseProductBtId); // Call your function with appropriate params
    //    });
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
    //            //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-name-edit').text(productName);
    //            //$(`#${ChooseProductBtId}`).closest('.card2').find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
    //            //$(`#${ChooseProductBtId}`).closest('.card2').find('.productImg-edit').attr("src", data.display_image);

    //            if (data.stock != 0) {

    //                Stock = "In Stock"
    //              //  $(`#${ChooseProductBtId}`).closest('.card2').find('.productAllDetails-edit').removeClass('d-none');
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.product-name-edit').text(productName);
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.brandName-edit').text(data.brandname);
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.produtSize-edit').text(data.dimension);
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.ProdctPrice-edit').text(salePrice);
    //                /*$(`#${ChooseProductBtId}`).closest('.card').find('.ProdctStocK').text(Stock);*/
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.product-id-edit').val(product_id);  // Example: if you want to store it in a hidden input
    //                $(`#${ChooseProductBtId}`).closest('.card2').find('.productImg-edit').attr("src", data.display_image);
    //            } else {
    //                showPopup("Out Of Stock")

    //            }   





    //        },
    //    });
    //}


    //$('#showAllproducts').contents().on('click', '.viewDetails', function () {
    //    var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
    //    $('#analyizepopup').modal('toggle'); // Toggle the modal to open it

    //    // Construct the iframe with correct product ID and dimensions
    //    var newrowcontent = '<iframe id="subscriptionIframe" src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';

    //    // Insert the new iframe content into the modal body
    //    $('#ProductViewPopup .modal-body').html(newrowcontent);

    //    // Show the Product View popup modal
    //    $('#ProductViewPopup').modal('toggle');

    //    // Attach the load event listener only after the iframe is created
    //    $('#subscriptionIframe').on('load', function () {
    //        // Now the iframe content is loaded, attach the event listener for '.cartbtn'
    //        $(this).contents().on('click', '.cart_btn', function () {
    //            var product_id = $(this).attr("data");
    //            $('#ProductViewPopup').modal('toggle');
    //            AppendDetailsOfProduct(product_id, ChooseProductBtId); // Call your function with appropriate params
    //        });
    //    });
    //});






   
    //$(document).on("click", ".viewDetails", function () {
    //    var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
    //    $('#analyizepopup').modal('hide'); // Toggle the modal to open it

    //    // Construct the iframe with the correct product ID and dimensions
    //    var newrowcontent = '<iframe id="subscriptionIframe" src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';
    //    $('#ProductViewPopup .modal-body').empty();
    //    // Insert the new iframe content into the modal body
    //    $('#ProductViewPopup .modal-body').html(newrowcontent);

    //    // Show the Product View popup modal
    //    $('#ProductViewPopup').modal('show');

    //    // Wait until the iframe is fully loaded
    //    $('#subscriptionIframe').on('load', function () {
    //        // Now the iframe content is loaded, attach the event listener for '.cart_btn'
    //        $(this).contents().find('.cart_btn').on('click', function () {
    //            var product_id = $(this).attr("data");
    //            $('#ProductViewPopup').modal('hide');
    //            AppendDetailsOfProduct(product_id, ChooseProductBtId); // Call your function with appropriate params
    //        });
    //    });
    //});

    //$(document).on("click", "#profileBasedRecomendations", function () {

    //    /*$('iframe').contents().on('click', '#profileBasedRecomendations', function () {*/

    //    //localStorage.setItem("analytics", "products");
    //    /*   window.location.href = "/show-allSubscription.html?analytics=products";*/

    //    $('#analyizepopup').modal('hide');

    //    var newrowcontent = '<iframe id="showAllproducts" src="show-allSubscription.html?analytics=products" style="width: 100%; height: 100%; border: none;"></iframe>';
    //    $('#ProductViewPopup .modal-body').html(newrowcontent);

    //    /* $("#showAllproducts").attr("src", "/show-allSubscription.html?analytics=products");*/
    //    /*    window.location.href = "/show-allSubscription.html?analytics=products";*/
    //    /*  getanalytics()*/

    //});






    //function bindIframeEvents() {
    //    var $iframe = $('#showAllproducts, #subscriptionIframe');

    //    $iframe.on('load', function () {
    //        var iframeContent = $(this).contents();

    //        // Add this to handle popup closing
    //        iframeContent.on('click', '.cartbtn, .cart_btn', function () {
    //            var product_id = $(this).attr("data");
    //            $('#ProductViewPopup').modal('hide'); // Close product view popup
    //            $('#analyizepopup').modal('hide'); // Close analyze popup
    //            AppendDetailsOfProduct(product_id, ChooseProductBtId);
    //        });


    //        // Bind view details clicks 
    //        iframeContent.on('click', '.viewDetails', function () {
    //            var product_id = $(this).attr("data");
    //            $('#analyizepopup').modal('hide');

    //            var newrowcontent = '<iframe id="subscriptionIframe" src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';
    //            $('#ProductViewPopup .modal-body').empty();
    //            $('#ProductViewPopup .modal-body').html(newrowcontent);
    //            $('#ProductViewPopup').modal('show');

    //            // Recursively bind events for new iframe
    //            bindIframeEvents();
    //        });
    //    });
    //}

    //// Call this after creating any iframe
    //bindIframeEvents();




    //$('iframe').contents().on('click', '.viewDetails', function () {
    //    var product_id = $(this).attr("data"); // Fetch the product ID from the 'data' attribute
    //    $('#analyizepopup').modal('hide'); // Toggle the modal to open it

    //    // Construct the iframe with the correct product ID and dimensions
    //    var newrowcontent = '<iframe id="subscriptionIframe" src="ProductviewSubscription.html?id=' + product_id + '" style="width: 100%; height: 100%; border: none;"></iframe>';
    //    $('#ProductViewPopup .modal-body').empty();
    //    // Insert the new iframe content into the modal body
    //    $('#ProductViewPopup .modal-body').html(newrowcontent);

    //    // Show the Product View popup modal
    //    $('#ProductViewPopup').modal('show');

    //    // Wait until the iframe is fully loaded
    //    $('#subscriptionIframe').on('load', function () {
    //        // Now the iframe content is loaded, attach the event listener for '.cart_btn'
    //        $(this).contents().find('.cart_btn').on('click', function () {
    //            var product_id = $(this).attr("data");
    //            $('#ProductViewPopup').modal('hide');
    //            AppendDetailsOfProduct(product_id, ChooseProductBtId); // Call your function with appropriate params
    //        });
    //    });
    //});


    

    //-------------------------------------cancel Subscription-----------------------------------------------//

    $(document).on("click", ".cancelSubscription", function () {
        var subscriptionId = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Subscription/CancelSubscription?subscriptionId=" + subscriptionId,
            type: "POST",
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                // Handle success
                if (data.responseCode == 1) {
                    showPopup(data.responseMessage)
                    $('#popupok-button').on('click', function () {
                        window.location.href = "/MySubscription.html";
                    });
                } else {
                    showPopup(data.responseMessage)
                    $('#popupok-button').on('click', function () {
                        closePopup();
                    });
                }
            },
            error: function (xhr) {
                // Handle error
                console.error("Error sending data:", xhr);
            }
        })
    })
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


