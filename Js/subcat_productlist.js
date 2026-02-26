$(document).ready(function () {

    var Project_Id = GlobalInputs();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var Category_name = params.get('cat');
    var subCategory_name = params.get('subcat');
    var catid = params.get('catid');
    getdatatable();
    $.ajax({
        url: "https://api.americanfragrances.com/Home/Subcategorylist?project_id=" + Project_Id + "&categoryid=" + catid,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
             
            $("#submenulist").empty();

            $.each(data, function (Index, value) {

                if (value.name == subCategory_name) {

                    var newrowContent = ' <p><a href="Subcategorylist.html?cat=' + Category_name + '&subcat=' + value.name + '&catid=' + catid + '" id=' + value.id + ' style="color:#ca8d31!important;text-transform:capitalize;">' + value.name + '</a><span class="pull-right"><i class="fa fa-angle-double-right" style="color:#ca8d31;"></i></span></p>'
                } else {
                    var newrowContent = ' <p><a href="Subcategorylist.html?cat=' + Category_name + '&subcat=' + value.name + '&catid=' + catid + '" id=' + value.id + ' class="subcatlist text-capitalize">' + value.name + '</a></p>'
                }

                //  var newrowContent = '<p><a>' + value.name + '</a></p>'
                $("#submenulist").append(newrowContent);
                 

            });
        }
    });
    function getdatatable() {
        if (Category_name) {
            $.ajax({
                url: "https://api.americanfragrances.com/Home/PaginationProvided?project_id=" + Project_Id  + "&take=" + 10 + "&skip=" + 0 + "&categoryname=" + Category_name + "&subcategoryname=" + subCategory_name + "",
                type: "GET",
                dataType: "JSON",
                async: false,
                crossDomain: true,
                success: function (data) {
                     
                    $("#allproducts").empty();
                    $("#maincatgy_name").text(Category_name);
                    $(".item_heading").text(subCategory_name);
                    if (data != "") {
                        $.each(data, function (Index, value) {
                             
                            if (value.stock != "0") {
                                if (value.discount != "0") {
                                    var newrowContent = '<div class="col-md-3 col-6 product_padding"><div class="Product_dv"><div class="row"><div class="col-md-9 col-9"><b class="dis_prc"> Save Rs.' + value.discount_price + '/-</b></div><div class="col-md-3 col-3"></div></div><div class="product_img"><a href="Productview.html?id=' + value.id + '"><img class="imgprcd" src=" ' + value.display_image + ' " width="100%" /></a></div><br><div class="Product_connect"><p class="product_name"> ' + value.name + '</p><label class="boxlabel">' + value.quantity + ' <span>' + value.dimension + ' </span></label><p class="product_pricedv"><span class="product_discount">Rs.' + value.rate + '</span><span class="product_price">Rs.' + value.price + '</span><span class="product_ds">' + value.discount + '%off</span></p><div class="row bskt-opt"><div class="col-md-6"><div class="input-group"><span class="input-group-addon">Qty : </span> <input type="number" id=' + value.id + ' class="form-control" maxlength="5" min="1" value="1"></div></div><div class="col-md-6"><div class="btn addcrt" data=' + value.id + '><span><i class="fa fa-shopping-basket"></i></span></div></div></div></div></div></div>'
                                }
                                else {
                                    var newrowContent = '<div class="col-md-3 col-6 product_padding"><div class="Product_dv"><div class="row" style="height:24px"><div class="col-md-9 col-9"><b class="dis_prc" style="display:none;"> Save Rs.' + value.discount_price + '/-</b></div><div class="col-md-3 col-3"></div></div><div class="product_img"><a href="Productview.html?id=' + value.id + '"><img class="imgprcd" src=" ' + value.display_image + ' " width="100%" /></a></div><br><div class="Product_connect"><p class="product_name"> ' + value.name + '</p><label class="boxlabel">' + value.quantity + ' <span>' + value.dimension + ' </span></label><p class="product_pricedv"><span class="product_discount" style="display:none">Rs.' + value.rate + '</span><span class="product_price">Rs.' + value.price + '</span><span class="product_ds" style="display:none">' + value.discount + '%off</span></p><div class="row bskt-opt"><div class="col-md-6"><div class="input-group"><span class="input-group-addon">Qty : </span> <input type="number" id=' + value.id + ' class="form-control" maxlength="5" min="1" value="1"></div></div><div class="col-md-6"><div class="btn addcrt" data="' + value.id + '"><span><i class="fa fa-shopping-basket"></i></span></div></div></div></div></div></div>'
                                }

                            } else {
                                if (value.discount != "0") {
                                    var newrowContent = '<div class="col-md-3 col-6 product_padding"><div class="Product_dv" style="opacity:0.6"><div class="row"><div class="col-md-9 col-9"><b class="dis_prc"> Save Rs.' + value.discount_price + '/-</b></div><div class="col-md-3 col-3"></div></div><div class="product_img"><a href="Productview.html?id=' + value.id + '"><img class="imgprcd" src=" ' + value.display_image + ' " width="100%" /></a></div><br><div class="Product_connect"><p class="product_name"> ' + value.name + '</p><label class="boxlabel">' + value.quantity + ' <span>' + value.dimension + ' </span></label><p class="product_pricedv"><span class="product_discount">Rs.' + value.rate + '</span><span class="product_price">Rs.' + value.price + '</span><span class="product_ds">' + value.discount + '%off</span></p><div class="row bskt-opt text-center"><div class="col-md-12"><button class="btn btn-danger">Out of stock</button></div></div></div></div></div>'
                                }
                                else {
                                    var newrowContent = '<div class="col-md-3 col-6 product_padding"><div class="Product_dv"  style="opacity:0.6"><div class="row" style="height:24px"><div class="col-md-9 col-9"><b class="dis_prc" style="display:none;"> Save Rs.' + value.discount_price + '/-</b></div><div class="col-md-3 col-3"></div></div><div class="product_img"><a href="Productview.html?id=' + value.id + '"><img class="imgprcd" src=" ' + value.display_image + ' " width="100%" /></a></div><br><div class="Product_connect"><p class="product_name"> ' + value.name + '</p><label class="boxlabel">' + value.quantity + ' <span>' + value.dimension + ' </span></label><p class="product_pricedv"><span class="product_discount" style="display:none">Rs.' + value.rate + '</span><span class="product_price">Rs.' + value.price + '</span><span class="product_ds" style="display:none">' + value.discount + '%off</span></p><div class="row bskt-opt text-center"><div class="col-md-12"><button  class="btn btn-danger">Out of stock</button></div></div></div></div></div></div>'
                                }

                            }
                            $("#productsdv").append(newrowContent);
                            //if (value.discount == "0") {
                            //    $(".dis_prc").hide();
                            //    $(".product_discount").hide();
                            //    $(".product_ds").hide();
                            //}
                        });
                    }
                    else {
                        //$("#allproducts").html("No products available");
                        var noproducts = '<center><img src="Images/images.png" /><h6><b>" Currently, No Products are Available… "</b></h6></center>'
                        $("#noproducts").append(noproducts);
                    }

                }
            });
        }


    };


});
