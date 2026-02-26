$(document).ready(function () {
    let Authkey = localStorage.getItem("authorid");
    var cart_id = localStorage.getItem("cart_id");
    var Project_Id = GlobalInputs();
    $(".message-refil").hide();
    $(".validation_message2").hide();
    if (Authkey == "" || Authkey == null) {
        window.location.href = "/Home.html";
    }
    else {
        $.ajax({

            url: "https://api.americanfragrances.com/Redeem/RequestRefillProgram?authorid=" + Authkey + "",
            type: "GET",            
            dataType: "json",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (index, value) {
                    var sno = index + 1;  // Serial number for each row

                    if (value.product_id == null) {
                        // Show validation message and hide the table if product_id is null
                        $(".validation_message2").show();
                        $("#refiltableCon").hide();
                    } else {
                        // Construct a new table row with product details
                        var newrowcontent = "<tr><td>" + sno + "</td><td><img src='" + value.image + "' width='50' alt='Alternate Text' /></td><td>" + value.name + "</td><td><button type='button' class='btn refilsubmit text-center cartbtn' id='" + value.product_id + "'>Move To Cart</button></td></tr>";

                        // Append the new row to the table body
                        $("#refiltableCon tbody").append(newrowcontent);
                        $("#refiltableCon").show();  // Ensure the table is visible
                    }
                });

                // Initialize DataTable after all rows are appended
                $("#refiltableCon").DataTable();
            },


            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Home.html";
                    return;
                }
            }

        });
    }


    $(".cartbtn").click(function () {
        var prod_id = $(this).attr("id"); 
        var qty = "1";

        if (qty) {
            $("input[id =" + prod_id + "]").css("border", "1px solid #ced4da");
            if (cart_id) {
                console.log("Update");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        cart_id: cart_id,
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                    },
                    dataType: "JSON",
                    async: false,
                    crossDomain: true,
                    success: function (data) {
                        console.log(data);
                        if (data.responseCode == 1) {
                            cart_count(cart_id);
                            $("#" + prod_id).val("");

                            $("#validationdiv").text("Product successfully added to cart");
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#026633");

                            $(".dvcartbtns").show();
                            $(".btnsmall ").hide();
                        } else {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#dba23d");
                        }
                    },
                });
            } else {
                console.log("add");
                $.ajax({
                    url: "https://api.americanfragrances.com/Cart/AddCart",
                    type: "POST",
                    data: {
                        project_id: Project_Id,
                        product_id: prod_id,
                        quantity: qty,
                    },
                    dataType: "JSON",
                    async: false,
                    crossDomain: true,
                    success: function (data) {
                        if (data.responseCode == 1) {
                            cart_count(cart_id);
                            $("#" + prod_id).val("");
                            localStorage.setItem("cart_id", data.cart_id);
                            cart_count(data.cart_id);
                            $("#" + prod_id).val("");
                            $("#validationdiv").text("Product successfully added to cart");
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#026633");

                            $(".dvcartbtns").show();
                            $(".btnsmall ").hide();
                        } else {
                            $("#validationdiv").text(data.responsemessage);
                            $("#validationdiv").slideDown();
                            $("#validationdiv").delay(10000).slideUp();
                            $("#validationdiv").css("background", "#dba23d");
                        }
                    },
                });
            }
        } else {
            $("input[id =" + prod_id + "]").css("border", "solid 1px red");
        }
    });



    function cart_count(cartid) {
        if (cartid) {
            $.ajax({
                url:
                    "https://api.americanfragrances.com/Cart/Cartcount?project_id=" +
                    Project_Id +
                    "&cart_id=" +
                    cartid,
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                    $(".cart_count").html(data);
                },
            });
        }
    }


        //----------------------------------------------------//
    })
/*})*/