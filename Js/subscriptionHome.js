$(document).ready(function () {

    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var planStatus = "";
    var productCount = "";
    var productsData = [];
    if (Authkey == null || Authkey == "") {
        window.location.href = "/Home.html"
    }


    var url = window.location.search;
    var params = new URLSearchParams(url);
    var getparm = params.get('order');
    var selectElementId = "";



    //--------------------------showing subscription plans------------------------------------------//
    ListofSubcriptionPlans();
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
                        '<p><strong class="Subscriptionfee">Subscription Price: <span class="">$' + Price + '</span> (Nonrefundable)</strong></p></div>' +
                        '<div class="d-flex flex-row justify-content-between"><div class="text-center" ><img src="'+value.image+'" style="width:80%;" /> </div><div class="plan-Details text-center">' +
                        '<p class="ProductCount"><strong>Product Count: </strong>' + value.ProductCount + '</p>' +
                        '<p class="SubShipping" style="margin-bottom:0px;"><strong>Shipping: </strong>' + (value.shippingcharge == 0 ? 'Free' : value.shippingcharge) + '</p>' +                        
                        '</div><div class="text-center" ><img src="' + value.image +'" style="width:80%;"/></div></div>' +
                        '<div class="text-center mt-3">' +
                        '<p><strong class="Discount">Discount: <span class="DiscountPercentage">' + value.discount + '</span>% on Total Price </strong></p>' +
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
                    window.location.href = "/Admin/Login.html";
                    return;
                }
            }
        });
    }
   
  

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


