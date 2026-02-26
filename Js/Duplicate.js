$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var prdct_Id = params.get('id');
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatable();
    getDimenstions();
    //getColors();
    getHsncodes();
    //getFit();
    getdata();
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
                        var optionsContent = "<option value=" + list.id + ">" + list.name + "</option>";
                        $("#drpdw_Dimenstions").append(optionsContent);
                        $(".drpdw_Dimenstions").append(optionsContent);
                    }
                })
            }
        })
    }



    //----------------------------------type Dropdown-----------------------//
    getType();
    function getType() {
        $.ajax({
            url: "https://api.americanfragrances.com/Type/GetAllTypes",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                /*var data = data.data;*/
                $.each(data, function (Index, list) {
                    if (list.ID) {
                        var optionsContent = " <option value=" + list.ID + ">" + list.Name + "</option>";
                        $("#drpdw_moodtype").append(optionsContent);
                    }
                })
            }
        })
    }
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
    //--------------------------------------- Colors Method-----------------------------------------//

    function getColors() {
        $.ajax({
            url: "https://api.americanfragrances.com/Category/Listofcolors?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#drpdw_Color").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.colorcode + "'> " + value.colorname + "</option>";
                    $("#drpdw_Color").append(newrowContent);
                });
            }
        })
    }

    function getFit() {
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Fitdropdown?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $.each(data, function (Index, list) {
                    if (list.id) {
                        var optionsContent = " <option value=" + list.id + ">" + list.FitName + "</option>";
                        $("#drpdw_Fit").append(optionsContent);
                    }
                })
            }
        })
    }
    //Product details Get
    function getdata() {
        
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Edit?id=" + prdct_Id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                
                getHsncodes();
                $("#hiddenid").val(data.id);
                $("#txtProdutname").val(data.name);
                $("#txtPrice").val(data.rate);
                $("#drpdw_Dimenstions option:selected").text(data.dimension);
                $("#drpdw_moodtype option:selected").text(data.mood);
                $("#drpdw_Fit option:selected").text(data.fit);
                $("#txtStock").val(data.stock);
                $("#hsnCodes").val(data.hsn);
                if (data.subcategoryname == "FRAGRANCES") {
                    $(".shadeDiv").addClass("d-none");
                }
                else {
                    $(".shadeDiv").removeClass("d-none");
                }
                $("#shade").val(data.Shade);
                $("#skuid").val(data.SKU_ID);
                //$("#shade").val(data.Shade);
                $("#txtweight").val(data.quantity);
                $("#mytextarea").val(data.description);
                $("#txtDiscount").val(data.discount);
                $("#dimgfile").attr("src", data.display_image);
                $("#dimgfile1").attr("src", data.sample_image1);
                $("#dimgfile2").attr("src", data.sample_image2);
                $("#dimgfile3").attr("src", data.sample_image3);
                $("#dimgfile4").attr("src", data.sample_image4);
                if (data.display_image) {
                    $("#dfl_mainimgview").css("background-image", "url(" + data.display_image + ")");
                }
                if (data.sample_image1) {
                    $("#dfl_img1view").css("background-image", "url(" + data.sample_image1 + ")");
                }
                if (data.sample_image2) {
                    $("#dfl_img2view").css("background-image", "url(" + data.sample_image2 + ")");
                }
                if (data.sample_image3) {
                    $("#dfl_img3view").css("background-image", "url(" + data.sample_image3 + ")");
                }
                if (data.sample_image4) {
                    $("#dfl_img4view").css("background-image", "url(" + data.sample_image4 + ")");
                }
            }
        });
    };

    //---------------------------------------Product Create Method-----------------------------------------//
    $("#duplicateProduct_create").submit(function () {
        
        var imagestr = "";
        var imagestr1 = "";
        var imagestr2 = "";
        var imagestr3 = "";
        var imagestr4 = "";
        var Productname = $("#txtProdutname").val();
        var Price = $("#txtPrice").val();
        var Discount = $("#txtDiscount").val();
        var Stock = $("#txtStock").val();
        var Weight = $("#txtweight").val();
        // var Color = $("#drpdw_Color").val();
        var moodtype = $("#drpdw_moodtype option:selected").val();
        // var FIT = $("#drpdw_Fit option:selected").text();
        var dimension = $("#drpdw_Dimenstions option:selected").text();
        // var cllst = "";
        // $.each(Color, function (key, value) {
        //     cllst += value + ",";
        // })
        // cllst = cllst.replace(/,\s*$/, "");
        var shade = $("#shade").val();
        var SKU_ID = $("#skuid").val();
        /*var hsn = $("#hsnCodes").val();*/
        var Description = $("#mytextarea").val();
        var file = $("#dimgfile")[0].files[0];
        var file1 = $("#dimgfile1")[0].files[0];
        var file2 = $("#dimgfile2")[0].files[0];
        var file3 = $("#dimgfile3")[0].files[0];
        var file4 = $("#dimgfile4")[0].files[0];
        if (file) {
            imagestr = $("#dfl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file1) {
            imagestr1 = $("#dfl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file2) {
            imagestr2 = $("#dfl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file3) {
            imagestr3 = $("#dfl_img3view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file4) {
            imagestr4 = $("#dfl_img4view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        var chkbox = "";
        if ($("#Featured").is(":checked")) {
            chkbox = true;
        }
        else {
            chkbox = false;
        }
        //var file = $("#imgfile")[0].files[0];
        //var file = $("#imgfile1")[0].files[0];
        //var file = $("#imgfile2")[0].files[0];
        //var file = $("#imgfile3")[0].files[0];
        //var file = $("#imgfile4")[0].files[0];
        ////var reader = new FileReader();
        ////reader.onloadend = function () {
        //    imagebase64 = reader.result;
        //    imagestr = imagebase64;
        //    imagestr1 = imagebase64;
        //    imagestr2 = imagebase64;
        //    imagestr3 = imagebase64;
        //    imagestr4 = imagebase64;
      
            $.ajax({
                url: "https://api.americanfragrances.com/Product/Duplicate_Create",
                type: "POST",
                // data: { "project_id": Project_Id, "name": Productname, "categoryname": Categoryname, "subcategoryname": SubCategoryname, "rate": Price, "stock": Stock, "isfeature": chkbox, "quantity": Weight, "display_image": imagestr1, "category_id": Category_Id, "authorid": ProjectAuth },
                data: { "product_id": prdct_Id, "project_id": Project_Id, "name": Productname, "mood": moodtype, "rate": Price, "display_image": imagestr, "sample_image1": imagestr1, "sample_image2": imagestr2, "sample_image3": imagestr3, "sample_image4": imagestr4, "quantity": Weight, "stock": Stock, "authorid": ProjectAuth, "description": Description, "discount": Discount, "dimension": dimension, "Shade": shade, "SKU_ID": SKU_ID },
                dataType: "json",
                traditional: true,
                success: function (data) {
                    
                    if (data.responseCode == 1) {
                        $("#validationdiv").text(data.responsemessage);
                        $("#validationdiv").slideDown();
                        $("#validationdiv").delay(10000).slideUp();
                        $("#validationdiv").css("background", "orange");
                        window.location.href = "/Product/Add_DuplicateProduct.html?id=" + prdct_Id;
                        getdatatable();
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

    //---------------------------------------Product List Method-----------------------------------------//
    function getdatatable() {
         
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Duplicate_Index?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&product_id=" + prdct_Id + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
                $("#tblProduct_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr><td><img src='" + value.display_image + "' width='30' /><span style='padding-left:5px!important'>" + value.name + "</span></td><td>" + value.SKU_ID + "</td><td>" + value.mood + "</td><td>" + value.rate + "</td><td>" + value.stock + "</td><td>" + value.quantity + "</td><td><span><a href='Edit_DuplicateProduct.html?id=" + value.id + "&productid=" + prdct_Id + "'><i class='fa fa-edit edit'></i></a></span><span>&nbsp;&nbsp;</span><span><button id='" + value.id + "' class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></span></td></tr>";
                    $("#tblProduct_lst tbody").append(newrowContent);
                    //$('#tblProduct_lst').DataTable();
                });
            }
        });
    };

    $("#drpdw_subCat").on("change", function () {
        if ($(this).val() === "FRAGRANCES") {
            $(".shadeDiv").addClass("d-none");
        } else {
            $(".shadeDiv").removeClass("d-none");
        }
    });
    //---------------------------------------Product Delete Method-----------------------------------------//
    $("#tblProduct_lst").on('click', ".Delete", function () {
        
        var getid = $(this).attr("id");
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFE802",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                    $.ajax({
                        url: "https://api.americanfragrances.com/Product/Duplicate_Delete",
                        type: "POST",
                        data: { "project_id": Project_Id, "authorid": ProjectAuth, "id": getid, "product_id": prdct_Id },
                        dataType: "JSON",
                        crossDomain: true,
                        success: function (data) {
                            if (data.responseCode == 1) {
                                $("#" + getid).closest("tr").hide();
                                data.responseCode;
                                data.responsemessage;
                            }
                        },
                        error: function (xhr) {
                            //
                        }
                    });
                    swal("Deleted!", "Your Duplicate product has been deleted!", "success");

                } else {
                    swal("Cancelled", "Your Duplicate products are safe :)", "error");
                }

            });

    });

    //---------------------------------------Category dropdown fetch Method-----------------------------------------//
 
});


