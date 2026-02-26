var url = window.location.search;
var params = new URLSearchParams(url);
var product_Id = params.get('id');
console.log(product_Id);
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {   


    var Project_Id = GlobalInputs();
    getBrand();
    Navbar();
    getdata();
    getCategory()
    //var param1 = getParameterByName('id'); //return productid
    //$("#hiddenid").val(param1);
    getHsncodes();
    getDimenstions();

    //----------------Brand dropdowm-------------------------
    function getBrand() {
        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Brand").append(optionsContent);
                    }
                })
            }
        })
    }





    //-------------------------type dropdown---------------------//

    getType();
    function getType() {
        $.ajax({
            url: "https://api.americanfragrances.com/Type/GetAllTypes",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
               /* var data = data.data;*/
                $.each(data, function (Index, list) {
                    if (list.ID) {
                        var optionsContent = " <option value=" + list.ID + ">" + list.Name + "</option>";
                        $("#drpdw_moodtype").append(optionsContent);
                    }
                })
            }
        })
    }

    //---------------------------------------Dimenstions dropdown fetch Method-----------------------------------------//
    function getDimenstions() {
        $.ajax({
            url: "https://api.americanfragrances.com/Dimension/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Dimenstions").append(optionsContent);
                    }
                })
            }
        })
    }
    //---------------------------------------HSN Code  fetch Method-----------------------------------------//
    function getHsncodes() {

        $.ajax({
            url: "https://api.americanfragrances.com/Product/Hsndropdown?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = "<option value=" + list.id + ">" + list.hsn + " , " + list.description_of_goods + "</option>";
                        $("#hsnCodes").append(optionsContent);
                        $("#edithsnCodes").append(optionsContent);
                    }
                })
            }
        })

    }
    //---------------------------------------Category dropdown fetch Method-----------------------------------------//
    function getCategory() {
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Categorydropdown?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Cat").append(optionsContent);
                    }
                })
            }
        })
    }
    $("#drpdw_subCat").on("change", function () {
        if ($(this).val() === "FRAGRANCES") {
            $(".shadeDiv").addClass("d-none");
        } else {
            $(".shadeDiv").removeClass("d-none");
        }
    });
    
    //---------------------------------------Edit Product Get  Method-----------------------------------------//
    function getdata() {
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Edit?id=" + product_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                getHsncodes();
                $("#hiddenid").val(data.id);
                $("#Edit_txtProdutname").val(data.name);
                $("#drpdw_Cat option:selected").text(data.categoryname);
                $("#drpdw_subCat option:selected").text(data.subcategoryname);
                if (data.subcategoryname == "FRAGRANCES") {
                    $(".shadeDiv").addClass("d-none");
                }
                else {
                    $(".shadeDiv").removeClass("d-none");
                }
                $("#drpdw_Dimenstions option:selected").text(data.dimension);
                $("#drpdw_moodtype option:selected").text(data.mood);     
                $("#Edit_txtPrice").val(data.rate);
                $("#Edit_purchasevalueofproduct").val(data.purchasevalueofproduct);
                $("#Edit_Stock").val(data.stock);
                $("#Edit_txtsize").val(data.size);
                $("#Additional_Addon_label1").val(data.Additional_Addon_label1);
                $("#Additional_Addon_label2").val(data.Additional_Addon_label2);
                $("#Additional_Addon_label3").val(data.Additional_Addon_label3);
                $("#shade").val(data.Shade);
                $("#skuid").val(data.SKU_ID);
                $("#drpdw_Brand option:selected").text(data.brandname);
               

               /* $("#edithsnCodes").val(data.hsn);*/
                $("#Edit_txtweight").val(data.quantity);
                $("#Edit_mytextareaprdct").summernote('code',data.description);
                $("#Edit_txtDiscount").val(data.discount);
                $("#trademark option:selected").val(data.trade_mark);
                $("#Edt_imgprew").attr("src", data.display_image);
                $("#Edt_imgprew1").attr("src", data.sample_image1);
                $("#Edt_imgprew2").attr("src", data.sample_image2);
                $("#Edt_imgprew3").attr("src", data.sample_image3);
                $("#Edt_imgprew4").attr("src", data.sample_image4);
                $("#topNotes").val(data.topnote);
                $("#baseNotes").val(data.basenote);
                $("#heartNotes").val(data.heartnote);
                if (data.display_image) {
                    $("#Edt_imgprew").css("background-image", "url(" + data.display_image + ")");
                }
                if (data.sample_image1) {
                    $("#Edt_imgprew1").css("background-image", "url(" + data.sample_image1 + ")");
                }
                if (data.sample_image2) {
                    $("#Edt_imgprew2").css("background-image", "url(" + data.sample_image2 + ")");
                }
                if (data.sample_image3) {
                    $("#Edt_imgprew3").css("background-image", "url(" + data.sample_image3 + ")");
                }
                if (data.sample_image4) {
                    $("#Edt_imgprew4").css("background-image", "url(" + data.sample_image4 + ")");
                }

                if (data.isfeature === true) {
                    $('#Edit_Featured').prop('checked', true);
                } else {
                    $('#Edit_Featured').prop('checked', false); // Optional: To uncheck if not true
                }
                if (data.isluxury === true) {
                    $('#Luxury').prop('checked', true);
                } else {
                    $('#Luxury').prop('checked', false); // Optional: To uncheck if not true
                }
                if (data.istimeless === true) {
                    $('#Timeless').prop('checked', true);
                } else {
                    $('#Timeless').prop('checked', false); // Optional: To uncheck if not true
                }
                if (data.iscelebrity === true) {
                    $('#Celebrity').prop('checked', true);
                } else {
                    $('#Celebrity').prop('checked', false); // Optional: To uncheck if not true
                }
                if (data.IsClearance === true) {
                    $('#Clearance').prop('checked', true);
                } else {
                    $('#Clearance').prop('checked', false); // Optional: To uncheck if not true
                }

            }
        });
    };

    $("#Product_edit").submit(function () {
        
        var id = $("#hiddenid").val();
        var Edit_imagestr = "";
        var Edit_imagestr1 = "";
        var Edit_imagestr2 = "";
        var Edit_imagestr3 = "";
        var Edit_imagestr4 = "";
        var Edit_Productname = $("#Edit_txtProdutname").val();
        var Edit_Categoryname = $("#drpdw_Cat option:selected").text();
        var Edit_SubCategoryname = $("#drpdw_subCat option:selected").text();
        var Edit_mood = $("#drpdw_moodtype option:selected").text();
        var Edit_Price = $("#Edit_txtPrice").val();
        var Edit_Stock = $("#Edit_Stock").val();
        var Edit_size = $("#Edit_txtsize").val();
        var Edit_Brand = $("#drpdw_Brand option:selected").text();
        var Edit_discount = $("#Edit_txtDiscount").val();
        var Edit_Weight = $("#Edit_txtweight").val();
        var Edit_Descriptionprdct = $("#Edit_mytextareaprdct").val();
        var purchase = $("#Edit_purchasevalueofproduct").val();
        var Additional_Addon_label1 = $("#Additional_Addon_label1").val();
        var Additional_Addon_label2 = $("#Additional_Addon_label2").val();
        var Additional_Addon_label3 = $("#Additional_Addon_label3").val();
        var shade = $("#shade").val();
        var SKU_ID = $("#skuid").val();
        var Dimension = $("#drpdw_Dimenstions option:selected").text();
        var topNotes = $("#topNotes").val();
        var baseNotes = $("#baseNotes").val();
        var heartNotes = $("#heartNotes").val();
    
        var hsn = $("#edithsnCodes").val();
        var file = $("#Edt_imgfile")[0].files[0];
        var file1 = $("#Edt_imgfile1")[0].files[0];
        var file2 = $("#Edt_imgfile2")[0].files[0];
        var file3 = $("#Edt_imgfile3")[0].files[0];
        var file4 = $("#Edt_imgfile4")[0].files[0];
        if (file) {
            Edit_imagestr = $("#Edt_imgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file1) {
            Edit_imagestr1 = $("#Edt_imgprew1").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file2) {
            Edit_imagestr2 = $("#Edt_imgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file3) {
            Edit_imagestr3 = $("#Edt_imgprew3").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file4) {
            Edit_imagestr4 = $("#Edt_imgprew4").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }

        var chkbox = "";
        if ($("#Edit_Featured").is(":checked")) {
            chkbox = true;
        }
        else {
            chkbox = false;
        }
        var Luxury = "";
        if ($("#Luxury").is(":checked")) {
            Luxury = true;
        }
        else {
            Luxury = false;
        }
        var Timeless = "";
        if ($("#Timeless").is(":checked")) {
            Timeless = true;
        }
        else {
            Timeless = false;
        }
        var Celebrity = "";
        if ($("#Celebrity").is(":checked")) {
            Celebrity = true;
        }
        else {
            Celebrity = false;
        }
        var Clearance = "";
        if ($("#Clearance").is(":checked")) {
            Clearance = true;
        }
        else {
            Clearance = false;
        }
        var dataval = { "cc": { "project_id": Project_Id, "id": product_Id, "purchasevalueofproduct": purchase, "name": Edit_Productname, "categoryname": Edit_Categoryname, "subcategoryname": Edit_SubCategoryname, "rate": Edit_Price, "stock": Edit_Stock, "isfeature": chkbox, "isluxury": Luxury, "istimeless": Timeless, "iscelebrity": Celebrity, "quantity": Edit_Weight, "description": Edit_Descriptionprdct, "display_image": Edit_imagestr, "sample_image1": Edit_imagestr1, "sample_image2": Edit_imagestr2, "sample_image3": Edit_imagestr3, "sample_image4": Edit_imagestr4, "authorid": ProjectAuth, "hsn": hsn, "discount": Edit_discount, "mood": Edit_mood, "brandname": Edit_Brand, "size": Edit_size, "dimension": Dimension, "topnote": topNotes, "heartnote": heartNotes, "basenote": baseNotes, "Additional_Addon_label1": Additional_Addon_label1, "Additional_Addon_label2": Additional_Addon_label2, "Additional_Addon_label3": Additional_Addon_label3, "Shade": shade, "SKU_ID": SKU_ID, "IsClearance": Clearance } };
        
        if (id != null) {
            $.ajax({
                url: "https://api.americanfragrances.com/Product/Edit?id=" + product_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "POST",
                data: dataval,
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    
                    data.responcemessage;
                    if (data.responseCode == 1) {
                        const urlParams = new URLSearchParams(window.location.search);
                        const currentPage = urlParams.get("page");
                        // Redirect back to the product list with the page number preserved
                        window.location.href = "Product_list.html?page=" + currentPage;

                    } else {
                        $("#vendoredit_error").text("Oops!..Something went wrong.");
                    }

                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = "/Admin/Login.html";
                        return;
                    }
                }
            });
        }

        else {
            $("#editvendor_error").text("Something wrong with the vendor detials..please <a href='Product_list.html'>go back vendor list</a>")
        }

    });

});
//$('#Edit_purchasevalueofproduct').focus();
    function calculatePurchaseValue() {
        // Get the values from the input fields
        var price = parseFloat($('#Edit_txtPrice').val()) || 0;
        var discount = parseFloat($('#Edit_txtDiscount').val()) || 0;

        // Calculate the purchase value
        var purchaseValue = price - (price * (discount / 100));
        //$('#Edit_purchasevalueofproduct').attr('placeholder', '');
        // Set the calculated value to the purchaseValueOfProduct element
        $('#Edit_purchasevalueofproduct').focus().val(purchaseValue.toFixed(2));
    }
$('#Edit_purchasevalueofproduct').on('focus', function () {
    // No additional logic needed; this ensures it's always focusable
});
    // Attach event handlers to the input fields
$('#Edit_txtPrice, #Edit_txtDiscount').on('input', function () {
        calculatePurchaseValue();
});







//---------------------------------------SubCategory dropdown fetch Method-----------------------------------------//
$("#drpdw_Cat").change(function () {

    var category_name = $("#drpdw_Cat option:selected").text();
    $.ajax({
        url: "https://api.americanfragrances.com/Product/Subcategorydropdown?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&Categoryname=" + category_name + "",
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $("#drpdw_subCat").append('<option value="" disabled selected>Select Subcategory</option>');

            $.each(data, function (Index, list) {
                var optionsContent = " <option value=" + list.name + ">" + list.name + "</option>";
                $("#drpdw_subCat").append(optionsContent);
            })
        }
    })
});
//---------------------------------------Brand dropdown fetch Method-----------------------------------------//
function getBrand() {
    $.ajax({
        url: "https://api.americanfragrances.com/Brand/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            console.log(data);
            $.each(data, function (Index, list) {
                if (list.id) {
                    var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                    $("#drpdw_Brand").append(optionsContent);
                }
            })
        }
    })
}
//---------------------------------------Product Post fetch Method-----------------------------------------//


