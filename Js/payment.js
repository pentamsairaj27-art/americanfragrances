$(document).ready(function () {
     
    var Project_Id = GlobalInputs();
    var cust_auth = localStorage.getItem("authorid");
    //var cart_tax = localStorage.getItem("cart_tax");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var razorid = params.get("Id");
    var status = params.get("status");
    var tax_amount = 0;
    var cart_id = params.get("cartID");
    if (cust_auth == null) {
        var authorids = params.get("authorid");
        localStorage.setItem("authorid", authorids);
        cust_auth = localStorage.getItem("authorid");
    }
    var addressid = localStorage.getItem("AddressID");
    if (addressid == null) {
        var AddressID = params.get("AddressID");
        localStorage.setItem("AddressID", AddressID);
        AddressID = localStorage.getItem("AddressID");
    }
    var authorids = params.get("authorid");
    var addressid = localStorage.getItem("AddressID");
    var delcharge = params.get("delivery_charge");
    var paymentType = params.get("paymentType");
    var Total = params.get("amount");

    var payment = paymentType;
    var tocken = "";
    var BillId = "";
    var cust_auth = localStorage.getItem("authorid");
    var charges = localStorage.getItem("firstShipmentCost");
    var shippingcharges = parseFloat(charges);
    getdatatable();
    function getdatatable() {
        var date = new Date();
        date.setDate(date.getDate() + 7);
        var deliverydate =
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        // function generateRandomNumber() {
        //   // Generate a random number with 5 digits
        //   const randomNumber = Math.floor(10000 + Math.random() * 90000);

        //   return randomNumber;
        // }

        // // Example usage
        // const randomDigits = generateRandomNumber();
        // BillId = randomDigits;
        // createShipment_order();
        var giftcardid_name = localStorage.getItem('giftcardid_name');
        var giftcardamount = localStorage.getItem('giftcardamount');
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/Create",
            type: "POST",
            data: {
                Project_Id: Project_Id,
                cart_id: cart_id,
                transaction_id: razorid,
                status: status,
                gst_amount: tax_amount,
                authorid: cust_auth,
                customerID: cust_auth,
                addressbook_id: addressid,
                delivery_charge: delcharge,
                delivery_date: deliverydate,
                amount: Total,
                ...(giftcardid_name ? { giftcardid: giftcardid_name } : {})
            },
            dataType: "json",
            async: false,
            traditional: true,
            success: function (data) {

                if (data.responseCode == 1) {
                    BillId = data.id;
                    $(".progress-bar").css("width", "5%");
                    $(".progress-bar").text("Bill Created");
                    $(".progress-bar").css("transition", "2s");
                    createShipment_order();
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("giftcardamount")
                    localStorage.removeItem("giftcardid_name")
                    localStorage.removeItem("tax_amt");
                    localStorage.removeItem("cart_tax");
                    localStorage.removeItem('firstShipmentCost');
                } else if (data.responseCode == 2) {
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("giftcardamount")
                    localStorage.removeItem("giftcardid_name")
                    localStorage.removeItem("tax_amt");
                    localStorage.removeItem("cart_tax");
                    localStorage.removeItem('firstShipmentCost');
                    window.location.href = "/Home/Login.html";
                } else if (data.responseCode == 0) {
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("giftcardamount")
                    localStorage.removeItem("giftcardid_name")
                    localStorage.removeItem("tax_amt");
                    localStorage.removeItem("cart_tax");
                    localStorage.removeItem('firstShipmentCost');
                    $("#validationdiv").text(data.responsemessage);
                    $("#validationdiv").slideDown();
                    $("#validationdiv").delay(5000).slideUp();
                    $("#validationdiv").css("background", "orange");
                }
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "Home.html";
                    return;
                }
            },
        });
    }

    function createShipment_order() {
        $.ajax({
            url:
                "https://api.americanfragrances.com/Addressbook/Index?project_id=" +
                Project_Id +
                "&authorid=" +
                cust_auth +
                "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $(".progress-bar").css("width", "25%");
                $(".progress-bar").text("Retrieving shipment Address");
                $(".progress-bar").css("transition", "2s");
                if (data != "") {
                    var i = 0;
                    $("#primary_address").empty();
                    $.each(data, function (Index, value) {
                        i = i + 1;
                        if (i == 1) {
                            var order_id = razorid;
                            let yourDate = new Date();
                            let isoString = yourDate.toISOString(); // e.g., "2025-05-08T12:34:56.789Z"

                            // Extract parts and build the string
                            let [datePart, timePart] = isoString.split('T');
                            let [time, msAndZone] = timePart.split('.');
                            let milliseconds = msAndZone.slice(0, 3); // "789"
                            let sevenDigitMs = milliseconds.padEnd(7, '0'); // "7890000"

                            let orderdate = `${datePart}T${time}.${sevenDigitMs}`;
                            var pickup_location = "American Fragrances Inc";
                            var billing_customer_name = value.firstname;
                            var billing_last_name = value.name;
                            var billing_address = value.addressline1;
                            var billing_city = value.city;
                            var billing_pincode = value.pincode;
                            var billing_state = value.state;
                            var billing_country = value.country;
                            var billing_email = value.email;
                            var billing_phone = value.phone;
                            var shipping_is_billing = true;
                            var order_items = [];
                            var payment_method = payment;
                            var shipping_charges = shippingcharges;
                            var sub_total = Total;
                            var length = 2.5;
                            var breadth = 1.5;
                            var height = 2.0;
                            var weight = 2.5;
                            var orderItems = [];
                            var pname = '';
                            var psku = '';
                            var punits = '';
                            var pselling_price = '';

                            var pid = '';
                            var pdimension = '';
                            var pper_amount = '';
                            var pimage = ';'
                            // };
                            $.ajax({
                                url:
                                    "https://api.americanfragrances.com/Bill/Myorderdetails?project_id=" +
                                    Project_Id +
                                    " &cart_id=" +
                                    cart_id.trim() +
                                    " &authorid=" +
                                    cust_auth,
                                type: "GET",
                                dataType: "JSON",
                                crossDomain: true,
                                async: false,
                                success: function (data) {

                                    $("#orderdetails_list").empty();
                                    $(".progress-bar").css("width", "50%");
                                    $(".progress-bar").css("transition", "2s");
                                    $(".progress-bar").text("Checking Shipping Address");
                                    data.responsemessage;

                                    $.each(data, function (index, value) {
                                        var itemdetails = {};
                                        itemdetails.name = value.name;
                                        itemdetails.sku = value.name;
                                        itemdetails.units = value.quantity;
                                        itemdetails.selling_price = value.price;
                                        itemdetails.discount = "";
                                        itemdetails.hsn = "";
                                        itemdetails.id = value.product_id;
                                        itemdetails.dimension = value.dimension;
                                        itemdetails.per_amount = value.per_amount;
                                        itemdetails.image = value.image;
                                        orderItems.push(itemdetails);
                                    });
                                },
                            });
                            var date = new Date();

                            // Now, let's map 'orderItems' to the 'items' array for ShipStation
                            var itemsArray = orderItems.map(function (orderItem) {

                                return {
                                    //   lineItemKey: "",
                                    sku: orderItem.sku,
                                    name: orderItem.name,
                                    imageUrl: orderItem.image,
                                    weight: {
                                        value: 2.5,
                                        units: orderItem.dimension
                                    },
                                    quantity: orderItem.units,
                                    unitPrice: orderItem.per_amount,
                                    shippingAmount: shippingcharges, // You might need to define 'shipping_charges'
                                    warehouseLocation: pickup_location,
                                    taxAmount: 0,
                                    productId: orderItem.id,
                                    adjustment: false,
                                };
                            });
                            var gift_message = localStorage.getItem("gift_message");
                            var gift = false;
                            if (gift_message) {
                                gift = true;
                            }
                            var data = {
                                orderNumber: order_id,
                                orderKey: BillId,
                                orderDate: orderdate,
                                orderStatus: "awaiting_shipment",
                                billTo: {
                                    name: billing_customer_name,
                                    company: "",
                                    street1: billing_address,
                                    city: billing_city,
                                    state: billing_state,
                                    postalCode: billing_pincode,
                                    country: "US",
                                    phone: billing_phone,
                                    residential: true,
                                },
                                ShipTo: {
                                    name: billing_customer_name,
                                    company: "",
                                    street1: billing_address,
                                    city: billing_city,
                                    state: billing_state,
                                    postalCode: billing_pincode,
                                    country: "US",
                                    phone: billing_phone,
                                    residential: false,
                                },
                                items: itemsArray,
                                amountPaid: Total,
                                taxAmount: 10.0,
                                gift: gift,
                                giftMessage: gift_message,
                                shippingAmount: shippingcharges,
                                // "CustomerNotes": "Please ship as soon as possible!",
                                // "InternalNotes": "Customer called and would like to upgrade shipping",
                                // "Gift": true,
                                // "GiftMessage": "Thank you!",
                                // "PaymentMethod": payment_method,
                                // "RequestedShippingService": "Priority Mail",
                                // "CarrierCode": "usps",
                                // "ServiceCode": "usps_priority",
                                // "PackageCode": "package",
                                // "Confirmation": "delivery",
                                // "ShipDate": "2023-01-03",
                                // "Weight": {
                                //   "Value": 20.5,
                                //   "Units": "ml"
                                // },
                                // "Dimensions": {
                                //   "Units": "inches",
                                //   "Length": length,
                                //   "Width": breadth,
                                //   "Height": height
                                // },
                                // "InsuranceOptions": {
                                //   "Provider": "carrier",
                                //   "InsureShipment": true,
                                //   "InsuredValue": 200.00
                                // },
                                // "InternationalOptions": {
                                //   "Contents": "Merchandise",
                                //   "CustomsItems": [
                                //     {
                                //       "Description": "Item 1",
                                //       "Quantity": 2,
                                //       "Value": 50.00,
                                //       "HarmonizedTariffCode": "123456",
                                //       "CountryOfOrigin": "US"
                                //     },
                                //     {
                                //       "Description": "Item 2",
                                //       "Quantity": 1,
                                //       "Value": 30.00,
                                //       "HarmonizedTariffCode": "789012",
                                //       "CountryOfOrigin": "US"
                                //     }
                                //   ]
                                // },
                                // "AdvancedOptions": {
                                //   "WarehouseId": pickup_location,
                                //   "NonMachinable": false,
                                //   "SaturdayDelivery": false,
                                //   "ContainsAlcohol": false,
                                //   "MergedOrSplit": false,
                                //   "MergedIds": [1, 2],
                                //   "ParentId": "parent-123",
                                //   "StoreId": "store-abc",
                                //   "CustomField1": "Custom data 1",
                                //   "CustomField2": "Custom data 2",
                                //   "CustomField3": "Custom data 3",
                                //   "Source": "Webstore",
                                //   "BillToParty": "Third Party",
                                //   "BillToAccount": "BillToAccount",
                                //   "BillToPostalCode": "98765",
                                //   "BillToCountryCode": "CA"
                                // },
                                //  "TagIds": [123, 456],
                            };

                            var stringifydata = JSON.stringify(data);

                            $.ajax({
                                url: "https://api.americanfragrances.com/ShipStation/CreateOrder",
                                type: "POST",
                                data: data,
                                async: false,
                                success: function (data) {
                                    /* alert(data);*/
                                    if (data === "Order created successfully") {
                                        $(".progress-bar").css("width", "75%");
                                        $(".progress-bar").text("Creating Order");
                                        $(".progress-bar").css("transition", "2s");
                                        localStorage.removeItem("cart_id");
                                        localStorage.removeItem("gift_message");
                                        localStorage.removeItem("giftcardamount")
                                        localStorage.removeItem("giftcardid_name")
                                        localStorage.removeItem("tax_amt");
                                        localStorage.removeItem("cart_tax");
                                        localStorage.removeItem('firstShipmentCost');
                                        cart_id = null;
                                        window.location.href = "Order.html?order=placed";
                                    }
                                },
                            });
                        }
                    });
                }
            },
        });
    }
});
