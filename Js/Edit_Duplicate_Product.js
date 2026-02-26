var url = window.location.search;
var params = new URLSearchParams(url);
var id = params.get('id');
var product_Id = params.get('productid');
console.log(product_Id);
var Project_Id = GlobalInputs();
var ProjectAuth = localStorage.getItem("Admin_auth");
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    getdata();
    getCategory()
    //var param1 = getParameterByName('id'); //return productid
    //$("#hiddenid").val(param1);
    getHsncodes();
    getDimenstions();
  

    //$("#mytextarea").summernote({
    //    height: 300,                 // set editor height
    //    minHeight: null,             // set minimum height of editor
    //    maxHeight: null,             // set maximum height of editor
    //    focus: true
    //});

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
    //--------------------------------------- Colors Method-----------------------------------------//
    function getColors() {
        $.ajax({
            url: "https://api.americanfragrances.com/Category/Listofcolors?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#Edrpdw_Color").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.colorcode + "'> " + value.colorname + "</option>";
                    $("#Edrpdw_Color").append(newrowContent);
                });
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
                        $("#Edrpdw_Fit").append(optionsContent);
                    }
                })
            }
        })
    }
    //-----------------------------get Type------------------------------------------------//
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


    //---------------------------------------Edit Product Get  Method-----------------------------------------//
    function getdata() {
          
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Duplicate_Edit?id=" + id + "&project_id=" + Project_Id + "&authorid=" + ProjectAuth + "",
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                getHsncodes();
                $("#hiddenid").val(data.id);
                $("#hiddenproductid").val(data.product_id);
                $("#txtProdutname").val(data.name);
                $("#drpdw_Dimenstions option:selected").text(data.dimension);
                $("#Edrpdw_Color").multiselect("refresh");
                //$("#drpdw_moodtype option:selected").text(data.mood);
                $("#drpdw_moodtype").val(data.mood);
                $("#Edit_txtPrice").val(data.rate);
                $("#Edit_Stock").val(data.stock);
               /* $("#edithsnCodes").val(data.hsn);*/
                if (data.subcategoryname == "FRAGRANCES") {
                    $(".shadeDiv").addClass("d-none");
                }
                else {
                    $(".shadeDiv").removeClass("d-none");
                }
                $("#Edrpdw_Fit option:selected").text(data.fit);
                $("#editdublicatetxtweight").val(data.quantity);
                $("#Edit_mytextarea").val(data.description);
                //$("#Edit_mytextarea").summernote("code", data.description);
                $("#Edit_txtDiscount").val(data.discount);
                $("#shade").val(data.Shade);
                $("#skuid").val(data.SKU_ID);

                $("#Edit_imgprew").attr("src", data.display_image);
                $("#Edit_imgprew1").attr("src", data.sample_image1);
                $("#Edit_imgprew2").attr("src", data.sample_image2);
                $("#Edit_imgprew3").attr("src", data.sample_image3);
                $("#Edit_imgprew4").attr("src", data.sample_image4);
                if (data.display_image) {
                    $("#Edit_imgprew").css("background-image", "url(" + data.display_image + ")");
                }
                if (data.sample_image1) {
                    $("#Edit_imgprew1").css("background-image", "url(" + data.sample_image1 + ")");
                }
                if (data.sample_image2) {
                    $("#Edit_imgprew2").css("background-image", "url(" + data.sample_image2 + ")");
                }
                if (data.sample_image3) {
                    $("#Edit_imgprew3").css("background-image", "url(" + data.sample_image3 + ")");
                }
                if (data.sample_image4) {
                    $("#Edit_imgprew4").css("background-image", "url(" + data.sample_image4 + ")");
                }

            }
        });
    };



    //crop

    // vars
    //var minAspectRatio = 1.0;
    //var maxAspectRatio = 1.0;
    //let result = document.querySelector('.result'),
    //    img_result = document.querySelector('.img-result'),
    //    img_w = document.querySelector('.img-w'),


    //    save = document.querySelector('.save'),


    //    upload = document.querySelector('#imgfile'),
    //    cropper = '';

    //// on change show image with crop options
    //upload.addEventListener('change', (e) => {
    //    if (e.target.files.length) {
    //        $('.result').show();
    //        const reader = new FileReader();
    //        reader.onload = (e) => {
    //            if (e.target.result) {
    //                // create new image
    //                let img = document.createElement('img');
    //                img.id = 'image';
    //                img.src = e.target.result
    //                // clean result before
    //                result.innerHTML = '';
    //                // append new image
    //                result.appendChild(img);
    //                // show save btn and options
    //                save.classList.remove('hide');

    //                // init cropper
    //                cropper = new Cropper(img, {
    //                    aspectRatio: 1 / 1,
    //                    autoCropArea: 0,
    //                    strict: true,
    //                    guides: false,
    //                    highlight: false,
    //                    dragCrop: false,
    //                    cropBoxMovable: true,
    //                    cropBoxResizable: true
    //                    //ready: function () {
    //                    //    var cropper = this.cropper;
    //                    //    var containerData = cropper.getContainerData();
    //                    //    var cropBoxData = cropper.getCropBoxData();
    //                    //    var aspectRatio = 16 / 9;
    //                    //    var newCropBoxWidth;

    //                    //    if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
    //                    //        newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

    //                    //        cropper.setCropBoxData({
    //                    //            left: (containerData.width - newCropBoxWidth) / 2,
    //                    //            width: newCropBoxWidth
    //                    //        });
    //                    //    }
    //                    //}
    //                });
    //            }
    //        };
    //        reader.readAsDataURL(e.target.files[0]);
    //    }
    //});

    //// save on click
    //save.addEventListener('click', (e) => {
    //    e.preventDefault();
    //    // get result to data uri
    //    let imgSrc = cropper.getCroppedCanvas({
    //        width: img_w.value // input value

    //    }).toDataURL();
    //    // remove hide class of img

    //    img_result.classList.remove('hide');
    //    $('.result').hide();
    //    $('#fl_mainimgview').css("background-image", "url(" + imgSrc + ")");

    //});




});

$("#drpdw_subCat").on("change", function () {
    if ($(this).val() === "FRAGRANCES") {
        $(".shadeDiv").addClass("d-none");
    } else {
        $(".shadeDiv").removeClass("d-none");
    }
});
//---------------------------------------Product Post fetch Method-----------------------------------------//
$("#Product_edit").submit(function () {
    
    var id = $("#hiddenid").val();
    var Productid = product_Id;
    var Edit_imagestr = "";
    var Edit_imagestr1 = "";
    var Edit_imagestr2 = "";
    var Edit_imagestr3 = "";
    var Edit_imagestr4 = "";
    var Dimension = $("#drpdw_Dimenstions option:selected").text();
    var Edit_Productname = $("#txtProdutname").val();
    var Edit_Price = $("#Edit_txtPrice").val();
    var Edit_Stock = $("#Edit_Stock").val();
    var Edit_Weight = $("#editdublicatetxtweight").val();
    var Edit_Description = $("#Edit_mytextarea").val();
    //var Edit_Piece = $("#Edit_piece").val();
    //var Edit_shelfe = $("#Edit_Shelllife").val();
    /*var hsn = $("#edithsnCodes").val();*/
    var shade = $("#shade").val();
    var SKU_ID = $("#skuid").val();
    var moodtype = $("#drpdw_moodtype").val();
    var FIT = $("#Edrpdw_Fit option:selected").text();
    var Discount = $("#Edit_txtDiscount").val();
    var Color = $("#Edrpdw_Color").val();
    var cllst = "";
    $.each(Color, function (key, value) {
        cllst += value + ",";
    })
    cllst = cllst.replace(/,\s*$/, "");
    var file = $("#Edit_imgfile")[0].files[0];
    var file1 = $("#Edit_imgfile1")[0].files[0];
    var file2 = $("#Edit_imgfile2")[0].files[0];
    var file3 = $("#Edit_imgfile3")[0].files[0];
    var file4 = $("#Edit_imgfile4")[0].files[0];
    if (file) {
        Edit_imagestr = $("#Edit_imgprew").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file1) {
        Edit_imagestr1 = $("#Edit_imgprew1").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file2) {
        Edit_imagestr2 = $("#Edit_imgprew2").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file3) {
        Edit_imagestr3 = $("#Edit_imgprew3").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    if (file4) {
        Edit_imagestr4 = $("#Edit_imgprew4").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }

    var dataval = { "cc": { "id": id, "project_id": Project_Id, "product_id": Productid, "mood": moodtype, "rate": Edit_Price, "stock": Edit_Stock, "quantity": Edit_Weight, "description": Edit_Description, "display_image": Edit_imagestr, "sample_image1": Edit_imagestr1, "sample_image2": Edit_imagestr2, "sample_image3": Edit_imagestr3, "sample_image4": Edit_imagestr4, "authorid": ProjectAuth, "dimension": Dimension, "discount": Discount, "color_id": cllst, "fit": FIT, "Shade": shade, "SKU_ID": SKU_ID, "name": Edit_Productname } };

    if (id != null) {
          
        var getid = id;
        $.ajax({
            url: "https://api.americanfragrances.com/Product/Duplicate_Edit",
            type: "POST",
            data: dataval,
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
              
                data.responcemessage;
                if (data.responseCode == 1) {
                    window.location.href = "Add_DuplicateProduct.html?id=" + Productid;
                   
                }
                else {
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


