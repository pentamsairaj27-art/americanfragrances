var url = window.location.search;
var params = new URLSearchParams(url);
var product_Id = params.get('id');
console.log(product_Id);
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Employee_auth");
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar_employee();
    getdata();
    getCategory()
    //var param1 = getParameterByName('id'); //return productid
    //$("#hiddenid").val(param1);
    getHsncodes();
    getDimenstions();
 
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
                $("#drpdw_Dimenstions option:selected").text(data.dimension);
            
                $("#Edit_txtPrice").val(data.rate);
                $("#Edit_Stock").val(data.stock);
                $("#edithsnCodes").val(data.hsn);
                $("#Edit_txtweight").val(data.quantity);
                $("#Edit_mytextareaprdct").summernote('code',data.description);
                
                $("#Edit_txtDiscount").val(data.discount);
              
                $("#imgprew").attr("src", data.display_image);
                $("#imgprew1").attr("src", data.sample_image1);
                $("#imgprew2").attr("src", data.sample_image2);
                $("#imgprew3").attr("src", data.sample_image3);
                $("#imgprew4").attr("src", data.sample_image4);
                if (data.display_image) {
                    $("#imgprew").css("background-image", "url(" + data.display_image + ")");
                }
                if (data.sample_image1) {
                    $("#imgprew1").css("background-image", "url(" + data.sample_image1 + ")");
                }
                if (data.sample_image2) {
                    $("#imgprew2").css("background-image", "url(" + data.sample_image2 + ")");
                }
                if (data.sample_image3) {
                    $("#imgprew3").css("background-image", "url(" + data.sample_image3 + ")");
                }
                if (data.sample_image4) {
                    $("#imgprew4").css("background-image", "url(" + data.sample_image4 + ")");
                }

                if ($("#Edit_Featured").is(":checked")) {
                    chkbox = true;
                }
                else {
                    chkbox = false;
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
        var Edit_Price = $("#Edit_txtPrice").val();
        var Edit_Stock = $("#Edit_Stock").val();
        var Edit_discount = $("#Edit_txtDiscount").val();
        var Edit_Weight = $("#Edit_txtweight").val();
        var Edit_Descriptionprdct = $("#Edit_mytextareaprdct").val();
        
        var Dimension = $("#drpdw_Dimenstions option:selected").text();
     
        var hsn = $("#edithsnCodes").val();
        var file = $("#Edit_imgfile")[0].files[0];
        var file1 = $("#Edit_imgfile1")[0].files[0];
        var file2 = $("#Edit_imgfile2")[0].files[0];
        var file3 = $("#Edit_imgfile3")[0].files[0];
        var file4 = $("#Edit_imgfile4")[0].files[0];
        if (file) {
            Edit_imagestr = $("#imgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file1) {
            Edit_imagestr1 = $("#imgprew1").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file2) {
            Edit_imagestr2 = $("#imgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file3) {
            Edit_imagestr3 = $("#imgprew3").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        if (file4) {
            Edit_imagestr4 = $("#imgprew4").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }

        var chkbox = "";
        if ($("#Edit_Featured").is(":checked")) {
            chkbox = true;
        }
        else {
            chkbox = false;
        }
        var dataval = { "cc": { "project_id": Project_Id, "id": product_Id, "name": Edit_Productname, "categoryname": Edit_Categoryname, "subcategoryname": Edit_SubCategoryname, "rate": Edit_Price, "stock": Edit_Stock, "isfeature": chkbox, "quantity": Edit_Weight, "description": Edit_Descriptionprdct, "display_image": Edit_imagestr, "sample_image1": Edit_imagestr1, "sample_image2": Edit_imagestr2, "sample_image3": Edit_imagestr3, "sample_image4": Edit_imagestr4, "authorid": ProjectAuth, "hsn": hsn, "discount": Edit_discount, "dimension": Dimension} };

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

                        window.location.href = "Product_list.html";
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


