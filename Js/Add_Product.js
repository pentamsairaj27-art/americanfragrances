$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var Category_Id = params.get('id');
    var pageSize = 10;
    var ProjectAuth = localStorage.getItem("Admin_auth");
      
    const targetPage = parseInt(params.get("page"));

    getdatatable();
     
    getCategory();
    getHsncodes();
    getDimenstions();
    getBrand();

 //---------------------------------------HSN Code dropdown fetch Method-----------------------------------------//
    function getHsncodes() {
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Hsndropdown?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = "<option value=" + list.id + ">" + list.hsn + " , " + list.description_of_goods + "</option>";
                        $("#hsnCodes").append(optionsContent);
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
            
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Cat").append(optionsContent);
                    }
                })
            }
        })
    }
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
                $("#drpdw_subCat").empty();
                $("#drpdw_subCat").append('<option value="" disabled selected>Select Subcategory</option>');

                $.each(data, function (Index, list) {
                    var optionsContent = " <option value=" + list.name + ">" + list.name + "</option>";
                    $("#drpdw_subCat").append(optionsContent);
                })
            }
        })
    });
    //---------------------------------------Dimenstions dropdown fetch Method-----------------------------------------//
    function getDimenstions() {
        $.ajax({
            url: "https://api.americanfragrances.com/Dimension/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
               
                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Dimenstions").append(optionsContent);
                    }
                })
            }
        })
    }
   //------------------------Brand dropdown---------------------------------------------------
    function getBrand() {
        $.ajax({
            url: "https://api.americanfragrances.com/Brand/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Brand").append(optionsContent);
                    }
                })
            }
        })
    }
    getType();
    function getType() {
        $.ajax({
            url: "https://api.americanfragrances.com/Type/GetAllTypes",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
             /*   var data = data.data;*/
                $.each(data, function (Index, list) {
                    if (list.ID) {
                        var optionsContent = " <option value=" + list.ID + ">" + list.Name + "</option>";
                        $("#drpdw_moodtype").append(optionsContent);
                    }
                })
            }
        })
    }



    //---------------------------------------Product Create Method-----------------------------------------//
    $("#Product_create").submit(function () {
        
        var imagestr = "";
        var imagestr1 = "";
        var imagestr2 = "";
        var imagestr3 = "";
        var imagestr4 = "";
        var Productname = $("#txtProdutname").val();
        var Categoryname = $("#drpdw_Cat option:selected").text();
        var SubCategoryname = $("#drpdw_subCat option:selected").text();
        var category_Id = $("#drpdw_Cat option:selected").val();
        var moodtype = $("#drpdw_moodtype option:selected").val();
        var Price = $("#txtPrice").val();
        var purchase = $("#purchasevalueofproduct").val();
        var Discount = $("#txtDiscount").val();
        var Stock = $("#txtStock").val();
        var size = $("#txtsize").val();
        var Weight = $("#txtweight").val();
        var Description = $("#mytextarea").val();
        var topNotes = $("#topNotes").val();
        var baseNotes = $("#baseNotes").val();
        var heartNotes = $("#heartNotes").val();
        var Additional_Addon_label1 = $("#Additional_Addon_label1").val();
        var Additional_Addon_label2 = $("#Additional_Addon_label2").val();
        var Additional_Addon_label3 = $("#Additional_Addon_label3").val();
        var shade = $("#shade").val();
        var SKU_ID = $("#skuid").val();
        var Dimension = $("#drpdw_Dimenstions option:selected").text();
        var Brand = $("#drpdw_Brand option:selected").text();
        var hsn = $("#hsnCodes").val();
        var file = $("#imgfile")[0].files[0];
        var file1 = $("#imgfile1")[0].files[0];
        var file2 = $("#imgfile2")[0].files[0];
        var file3 = $("#imgfile3")[0].files[0];
        var file4 = $("#imgfile4")[0].files[0];
        if (file) {
            imagestr = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file1) {
            imagestr1 = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file2) {
            imagestr2 = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file3) {
            imagestr3 = $("#fl_img3view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file4) {
            imagestr4 = $("#fl_img4view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
            var chkbox = "";
        if ($("#Featured").is(":checked")) {
                chkbox = true;
            }
            else {
                chkbox = false;
        }
        var Clearance = "";
        if ($("#Clearance").is(":checked")) {
            Clearance = true;
        }
        else {
            Clearance = false;
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
            $.ajax({
                url: "https://api.americanfragrances.com/Product/Create", 
                type: "POST",
                data: {
                    "project_id": Project_Id, "name": Productname, "purchasevalueofproduct": purchase, "rate": Price, "category_id": category_Id, "isfeature": chkbox, "isluxury": Luxury, "istimeless": Timeless, "iscelebrity": Celebrity, "categoryname": Categoryname, "subcategoryname": SubCategoryname, "display_image": imagestr, "sample_image1": imagestr1, "sample_image2": imagestr2, "sample_image3": imagestr3, "sample_image4": imagestr4, "quantity": Weight, "stock": Stock, "authorid": ProjectAuth, "description": Description, "hsn": hsn, "discount": Discount, "mood": moodtype, "brandname": Brand, "size": size, "dimension": Dimension, "topnote": topNotes, "heartnote": heartNotes, "basenote": baseNotes, "Additional_Addon_label1": Additional_Addon_label1, "Additional_Addon_label2": Additional_Addon_label2, "Additional_Addon_label3": Additional_Addon_label3, "Shade": shade, "SKU_ID": SKU_ID, "IsClearance":Clearance },
                dataType: "json",
                traditional: true,
                success: function (data) {     
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(5000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        window.location.href = "Product_list.html";
                    }
                    else if (data.responseCode == 2) {
                        window.location.href = "/Admin/Login.html";
                    }
                    else if (data.responseCode == 6) {
                        $("#returnmessage").text("Sorry, Something went wrong");
                    }
                    else if (data.responseCode == 0) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(5000).slideUp();
                        $("#validationdiv").css("background", "orange");
                    }
                    data.responseCode;
                    data.responsemessage;
                    getdatatable();
                },
                error: function (xhr) {
                    if (xhr.status === 401) {
                        window.location.href = "/Admin/Login.html";
                        return;
                    }
                }
            });
        //}
        //reader.readAsDataURL(file);
    });
    $("#drpdw_subCat").on("change", function () {
        if ($(this).val() === "FRAGRANCES") {
            $(".shadeDiv").addClass("d-none");
        } else {
            $(".shadeDiv").removeClass("d-none");
        }
    });
    //---------------------------------------Product List Method-----------------------------------------//


    $(document).on("click", ".btn_sm", function () {
        var discount = $("#Discount_Percentage").val();
        var selectedProductIds = $(".productCheckBox:checked")
            .map(function () {
                return this.id.replace("Product_", "");
            })
            .get()
            .join(",");


        $.ajax({
            url: "https://api.americanfragrances.com/Product/UpdateBulkDiscount?productids=" + selectedProductIds + "&Discount=" + discount + "&authorid=" + ProjectAuth + "",
            type: "POST",            
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                if (data.responseCode == "200") {
                    alert(data.message);
                    $("#Addcategory").modal('hide');
                    window.location.reload();
                }
            },
            error: function (xhr) {
                //
            }
        });

       
    });


    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {              

                
                $("#tblProduct_lst tbody").empty();
                $.each(data, function (Index, value) {
                    
                    var currentPage = Math.floor(Index / pageSize) + 1;
                    var newrowContent = "<tr><td><input type='checkbox' name='chkpro' class='productCheckBox' id='Product_" + value.id + "'><label for='Product_" + value.id + "'></label></td><td><img src='" + value.display_image + "' width='30' /><span style='padding-left:5px!important'>" + value.name + "</span></td><td>" + value.SKU_ID + "</td><td>" + value.categoryname + "</td><td>" + value.mood + "</td><td>" + value.rate + "</td><td>" + value.stock + "</td><td>" + value.isfeature + "</td><td>" + value.quantity + "</td><td>" + value.discount + "</td><td><span><a href='Edit_Product.html?id=" + value.id + "&page=" + currentPage + "'><i class='fa fa-edit edit'></i></a></span><span>&nbsp;&nbsp;</span><span><button id='" + value.id + "' class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></span><a href='Add_DuplicateProduct.html?id=" + value.id + "&page=" + currentPage + "'><span class='iconify' data-icon='ion:duplicate-outline' data-inline='false'></span></a></td></tr>";

                    $("#tblProduct_lst tbody").append(newrowContent);
                    //$('#tblProduct_lst').DataTable();
                });
                $('#tblProduct_lst').DataTable()

                if (!isNaN(targetPage) && targetPage != "" && targetPage != null) {
                    // Remove .current from all pagination buttons first
                    $(".paginate_button").removeClass("current");

                    $('#tblProduct_lst').DataTable().page(targetPage - 1).draw('page');


                } 
            }
        });
    };
    $("select[name='tblProduct_lst_length']").on("change", function () {
        var selectedValue = $(this).val(); // This will be "10", "25", "50", or "100"
        pageSize = selectedValue;
        getdatatable();
        // You can trigger any logic here, like reloading your table, re-fetching data, etc.
    });

    //$('#purchasevalueofproduct').focus();
    function calculatePurchaseValue() {
        // Get the values from the input fields
        var price = parseFloat($('#txtPrice').val()) || 0;
        var discount = parseFloat($('#txtDiscount').val()) || 0;

        // Calculate the purchase value
        var purchaseValue = price - (price * (discount / 100));

        // Set the calculated value to the purchaseValueOfProduct element
        // $('#purchasevalueofproduct').focus().val(purchaseValue.toFixed(2));
        $('#purchasevalueofproduct').val(purchaseValue.toFixed(2));

    }
    $('#purchasevalueofproduct').on('focus', function () {
        // No additional logic needed; this ensures it's always focusable
    });

    // Attach event handlers to the input fields
    $('#txtPrice, #txtDiscount').on('input', function(e) {
        // Remove any non-numeric characters except decimal point
        this.value = this.value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        if(this.value.split('.').length > 2) {
            this.value = this.value.replace(/\.+$/, '');
        }
        
        calculatePurchaseValue();
    });
    


    //---------------------------------------Product Delete Method-----------------------------------------//
    $("#tblProduct_lst").on('click', ".Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: "https://api.americanfragrances.com/Product/Delete?id=" + getid + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
                type: "POST",
                data: { "id": getid },
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    if (data.responseCode == 1) {
                        $("#" + getid).closest("tr").css("background", "tomato");
                        $("#" + getid).closest("tr").css("color", "#fff");
                        $("#" + getid).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                        });
                    }
                },
                error: function (xhr) {
                    //
                }
            });
        }
    });



    $("#btnallstock").click(function () {
        var stock = $("#mulstock").val();


         
        var chkbxcount = $(":checkbox:checked").length;
        if (chkbxcount != 0) {
            var getids = "";
            $('input[type=checkbox]:checked').each(function () {
                 
                var getid = $(this).attr("data") + ",";
                getids += getid;
              
            });

            if (getids != "") {

                 
                $.ajax({
                    url: "https://api.americanfragrances.com/Product/Updatestock",
                    type: "POST",
                    // data: { "project_id": Project_Id, "name": Productname, "categoryname": Categoryname, "subcategoryname": SubCategoryname, "rate": Price, "stock": Stock, "isfeature": chkbox, "quantity": Weight, "display_image": imagestr1, "category_id": Category_Id, "authorid": ProjectAuth },
                    data: { "project_id": Project_Id, "authorid": ProjectAuth, "id": getids, "stock": stock },
                    dataType: "json",
                    traditional: true,
                    success: function (data) {
                         

                        $("#mulstock").val("");
                        $('.chkbxmult').prop('checked', false);
                        var stock = "updated";
                        window.location.href = "Product_list.html?stock="+ stock;
                    },
                    error: function (xhr) {
                        if (xhr.status === 401) {
                            window.location.href = "/Admin/Login.html";
                            return;
                        }
                    }
                });

            }
        }

        
    });
});


