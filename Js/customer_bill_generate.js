var Project_Id = GlobalInputs();
/*let Authkey = localStorage.getItem("authorid");*/
$(document).ready(function () {
    var Project_Id = GlobalInputs();


    var url = window.location.search;
    var params = new URLSearchParams(url);
    var cartid = params.get('cart');
    var billid = params.get('bill');
    var billamt = parseFloat(params.get('billamount')).toFixed(2);
    var customerid = params.get('customerid');
    if (customerid != null) {
        localStorage.setItem("authorid", customerid);
    }
    let Authkey = localStorage.getItem("authorid");
    getdatatable();
    getaddress();
    getdata();
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/Index?authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {



            },
            error: function (xhr) {
            }
        });
    };

    function getdata() {
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/Myorderdetails?authorid=" + Authkey + " &project_id= " + Project_Id + " &cart_id= " + cartid,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                data.responsemessage;

                $.each(data, function (Index, value) {
                    var price = parseFloat(value.per_price).toFixed(2);
                    var subTotal = parseFloat(value.price).toFixed(2);
                    var newrowcontent = "<tr><td>" + value.name + "</td > <td>$  " + price + "</td> <td> " + value.quantity + "</td> <td>$  " + subTotal + "</td></tr >"
                    //var newrowcontent = "<tr><td>" + value.name + " </td > <td>Rs  " + value.per_price + "</td> <td> " + value.quantity + "</td> <td>Rs  " + value.price + "</td></tr >"
                    $("#orderdetails_list tbody").append(newrowcontent);
                    if (value.giftcardamount == null) {
                        var res1 = " Giftcard Not Used";
                        $("#giftCardAm").text(res1);
                    } if (value.giftcardamount != null) {
                        $("#giftCardAm").text(value.giftcardamount);
                    } if (value.coupon_amount == null) {
                        var res2 = "Coupon Not Used";
                        $("#couponCardAm").text(res2);
                    } if (value.coupon_amount != null) {
                        $("#couponCardAm").text(value.coupon_amount);
                    }

                });
                $("#totalamnt").text(billamt);
               
        



            },
            error: function (xhr) {
            }
        });
    };

    function getaddress() {

        // var blill = "1fd5fad2-0b47-411e-91a9-cf5baabce576";
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/Billaddress?project_id=" + Project_Id + "&bill_id=" + billid,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#custaddress").empty();

                var newcontent = '<div class="col-md-12 spanp"><br/><h4 class="mt-4"><b>Customer Address</b></h4><div class="row"><div class="col-md-2"><span>Bill Id</span></div><div class="col-md-8"><span>' + data.BillNo + '</span></div></div><div class="row"><div class="col-md-2"><span>Name</span></div><div class="col-md-5"><span>' + data.name + '</span></div></div><div class="row"><div class="col-md-2"><span>Mobile No.</span></div><div class="col-md-5"><span>' + data.phone + '</span></div></div><div class="row"><div class="col-md-2"><span>Address</span></div><div class="col-md-5"><span>' + data.address + '</span></div></div><div class="row"><div class="col-md-2"><span>City</span></div><div class="col-md-5"><span>' + data.city + '</span></div></div><div class="row"><div class="col-md-2"><span>State</span></div><div class="col-md-5"><span>' + data.state + '</span></div></div><div class="row"><div class="col-md-2"><span>Pincode</span></div><div class="col-md-5"><span>' + data.pincode + '</span></div></div></div>'; $("#custaddress").append(newcontent);

            },
            error: function (xhr) {
            }
        });
    };



});

