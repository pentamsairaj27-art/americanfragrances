$(document).ready(function () {
   // var Project_Id = GlobalInputs();
   
   //var cart_id = localStorage.getItem("cart_id");
   //// var cart_id = "69722744-f703-4d06-a53e-8cba9937e8d1";
   // if (cart_id) {
   //     cart_count(cart_id);
   // }
   // // $(".addcrt").click(function () {
   // $('div').on('click', '.addcrt', function () {
         
   //     var prod_id = $(this).attr("data");
   //     // var qty = $("#" + prod_id).val();
   //     var prev = $(this).parent().prev().find('input[type=number]');
   //     var qty = $(prev).val();
         
   //     if (qty) {
   //         // $("#" + prod_id).css("border", "1px solid #ced4da");
   //         if (cart_id) {
   //             $.ajax({
   //                 url: "https://api.americanfragrances.com/Cart/AddCart",
   //                 type: "POST",
   //                 data: { "cart_id": cart_id,"project_id": Project_Id,"product_id": prod_id,"quantity": qty },
   //                 dataType: "JSON",
   //                 async: false,
   //                 crossDomain: true,
   //                 success: function (data) {
                         
   //                     data.responsemessage;
   //                     console.log(data);
   //                     if (data.responseCode == 1) {
   //                         cart_count(cart_id);
   //                         $("#" + prod_id).val("");

   //                         $("#validationdiv").text("Product successfully added to cart");
   //                         $("#validationdiv").slideDown();
   //                         $("#validationdiv").delay(5000).slideUp();
   //                         //$("#validationdiv").css("background", "#4F8A00");
   //                     } else {
   //                         $("#validationdiv_danger").text(data.responsemessage);
   //                         $("#validationdiv_danger").slideDown();
   //                         $("#validationdiv_danger").delay(5000).slideUp();
   //                         // $("#validationdiv_danger").css("background", "orange");
   //                     }
   //                 }
   //             });

   //         } else {
   //             $.ajax({
   //                 url: "https://api.americanfragrances.com/Cart/AddCart",
   //                 type: "POST",
   //                 data: { "project_id": Project_Id, "product_id": prod_id, "quantity": qty },
   //                 dataType: "JSON",
   //                 async: false,
   //                 crossDomain: true,
   //                 success: function (data) {
   //                     data.responsemessage;
                         
   //                     console.log(data);
   //                     if (data.responseCode == 1) {
   //                         cart_count(cart_id);
   //                         $("#" + prod_id).val("");

   //                         localStorage.setItem("cart_id", data.cart_id);
   //                         cart_count(data.cart_id);
   //                         $("#" + prod_id).val("");

   //                         $("#validationdiv").text("Product successfully added to cart");
   //                         $("#validationdiv").slideDown();
   //                         $("#validationdiv").delay(5000).slideUp();
   //                         $("#validationdiv").css("background", "#4F8A00 ");
   //                     } else {

   //                         $("#validationdiv_danger").text(data.responsemessage);
   //                         $("#validationdiv_danger").slideDown();
   //                         $("#validationdiv_danger").delay(5000).slideUp();
   //                         //$("#validationdiv_danger").css("background", "orange");
   //                     }

   //                 }
   //             });
   //         }
   //     } else {
   //         $("#" + prod_id).css("border", "solid 1px red");
   //     }
   // });

   // function cart_count(cartid) {

   //     if (cartid) {

   //         $.ajax({
   //             url: "https://api.americanfragrances.com/Cart/Cartcount?project_id=" + Project_Id + "&cart_id=" + cartid,
   //             type: "GET",
   //             dataType: "JSON",
   //             async: false,
   //             crossDomain: true,
   //             success: function (data) {

   //                 $(".cart_count").html(data);
   //             }
   //         });

   //     }

   // }

});

// address block
function address() {
    // for hiding block
    var x = document.getElementById("address");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("address-btn");
    if (y.innerHTML == "Add info") {
        y.innerHTML = 'Close';
    } else {
        y.innerHTML = 'Add info';
    }
}
//   end of address block
// Coupon block
function Coupon() {
    // for hiding block
    var x = document.getElementById("coupon");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("coupon-btn");
    if (y.innerHTML == "Add Coupon") {
         // y.innerHTML = 'C';
        y.innerHTML = ''
        $(".clear").css("display", "block");
    } else {
        y.innerHTML = 'Add Coupon';
    }
}
//   end of coupon
// Gift
function Gift() {
    // for hiding block
    var x = document.getElementById("Gift");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("Gift-btn");
    if (y.innerHTML == "Add Gift Certificate") {
        /*   y.innerHTML = 'Close';*/
        y.innerHTML = ''
        $(".GiftCardclear").css("display", "block");
    } else {
        y.innerHTML = 'Add Gift Certificate';
    }
}