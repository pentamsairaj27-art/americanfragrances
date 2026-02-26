$(document).ready(function () {
    var Project_Id = GlobalInputs();
   
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var Category_Id = params.get('id');
    var paramstoc = params.get('stock');
    var ProjectAuth = localStorage.getItem("Employee_auth");
    Navbar_employee();
    if (paramstoc) {

        $("#validationdiv").text("Stock Updated Successfully");
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(5000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    getdatatable();
    getCategory();
    getHsncodes();
    getDimenstions();

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
        var Price = $("#txtPrice").val();
        var Discount = $("#txtDiscount").val();
        var Stock = $("#txtStock").val();
        var Weight = $("#txtweight").val();
        var Description = $("#mytextarea").val();
        var Dimension = $("#drpdw_Dimenstions option:selected").text();
      
       // var trade = $("#trademark option:selected").val();
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
            $.ajax({
                url: "https://api.americanfragrances.com/Product/Create", 
                type: "POST",
                // data: { "project_id": Project_Id, "name": Productname, "categoryname": Categoryname, "subcategoryname": SubCategoryname, "rate": Price, "stock": Stock, "isfeature": chkbox, "quantity": Weight, "display_image": imagestr1, "category_id": Category_Id, "authorid": ProjectAuth },
                data: { "project_id": Project_Id, "name": Productname, "rate": Price, "category_id": category_Id, "isfeature": chkbox, "categoryname": Categoryname, "subcategoryname": SubCategoryname, "display_image": imagestr, "sample_image1": imagestr1, "sample_image2": imagestr2, "sample_image3": imagestr3, "sample_image4": imagestr4, "quantity": Weight, "stock": Stock, "authorid": ProjectAuth, "description": Description, "hsn": hsn, "discount": Discount, "dimension": Dimension},
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
    //---------------------------------------Product List Method-----------------------------------------//
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
                    var newrowContent = "<tr><td> <img src='" + value.display_image + "' width='30' /><span style='padding-left:5px!important'>" + value.name + "</span> </td> <td>" + value.categoryname + "</td><td>" + value.rate + "</td><td>" + value.stock + "</td><td> <input type='checkbox' id='Featured'>True</td><td>" + value.quantity + "</td><td>" + value.discount + "</td><td> <span><a href='Edit_Product.html?id=" + value.id + "'><i class='fa fa-edit edit'></i></a></span> <span>&nbsp;&nbsp;</span> <span><button id=" + value.id + " class='btn Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></span></td></tr>"

                    $("#tblProduct_lst tbody").append(newrowContent);
                    //$('#tblProduct_lst').DataTable();
                });
            }
        });
    };
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


