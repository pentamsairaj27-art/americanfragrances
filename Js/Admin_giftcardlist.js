$(document).ready(function () {
    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");
    getdatatablepdf();
    getdatatable();
    
    $("#tblorder_lst_pdf").DataTable({

        "order": [], //or asc 
        "columnDefs": [{ "targets": 3, "type": "date-eu" }],
        dom: 'Bfrtip',
        buttons: [
            //'copyHtml5',
            'excelHtml5',
            //'csvHtml5',
            'pdfHtml5'
        ]
    });
    $('#order-status').change(function () {
        var selectedstatus = $('#order-status').val();
        var rowid = $(this).closest("tr").attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Order/Updatestatus",
            type: "POST",
            data: { "project_id": Project_Id, "authorid": ProjectAuth, "id": rowid, "status": selectedstatus },
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
            }
        });
    });


    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Coupons/GetGiftCards?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                // Sort orders by creation date in descending order
                //data.sort(function (a, b) {
                //    var dateA = moment(a.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
                //    var dateB = moment(b.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
                //    return dateB.diff(dateA);
                //});
                //data.sort(function (a, b) {
                //    function extractDate(obj) {
                //        if (!obj || !obj.Createdon_string || typeof obj.Createdon_string !== "string") {
                //            return moment(0); // Default to earliest date if invalid
                //        }
                //        let match = obj.Createdon_string.match(/\d+/); // Extract numeric timestamp
                //        return match ? moment(parseInt(match[0], 10)) : moment(0); // Convert to moment
                //    }

                //    var dateA = extractDate(a);
                //    var dateB = extractDate(b);

                //    return dateB.valueOf() - dateA.valueOf(); // Ensure sorting works correctly
                //});



                console.log(data);

                $("#tblorder_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var id = value.id;
                    if(value.IsRedeemed == true){
                        var IsRedeemed = ""
                       // var CreatedOn = new Date(parseInt(value.CreatedOn.replace("/Date(", "").replace(")/")));
                    var RedeemedDate = new Date(parseInt(value.RedeemedDate.replace("/Date(", "").replace(")/")));
                    var dd = RedeemedDate.getDate();
                    var mm = RedeemedDate.getMonth() + 1; //January is 0!
                    var yyyy = RedeemedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }
                    var datef = + dd + '/' + mm + '/' + yyyy;
                        IsRedeemed = datef;
                    }
                    else{
                        IsRedeemed = value.IsRedeemed;
                    }
                    var amount = parseFloat(value.amount).toFixed(2);
                    //<td><span class='iconify viewdtls' data-icon='bi:cart3' data-inline='false' id=" + value.cart_id + " ></span><span>&nbsp;&nbsp;</span><span style='display:none' class='iconify' data-icon='la:file-invoice-solid' data-inline='false'></span><a href ='../BillGenerate.html?cart=" + value.cart_id + "&bill=" + value.id + "&billamount=" + value.amount + "&customerid=" + value.customerID+"'><i class='fa fa-download'></i></a></td>
                    var newrowContent = "<tr id= " + value.id + "><td> " + value.CreatedBy + " </td><td> " + value.GiftID + " </td><td>" + value.yourname + "</td><td>" + value.yourmail + "</td><td>" + value.yourphone + "</td><td>" + value.recipientname + "</td><td>" + value.recipientmail + "</td><td>" + value.recipientphone + "</td><td> $" + amount + " </td><td>"+ IsRedeemed +"</td></tr>"
                    $("#tblorder_lst tbody").append(newrowContent);
                });
                $('#tblorder_lst').DataTable({
                    "order": [] // Disable default sorting
                });
            }
        });
    };
   

    function getdatatablepdf() {
        $.ajax({
            url: "https://api.americanfragrances.com/Order/Myorder?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                
                $("#tblorder_lst_pdf tbody").empty();
                $.each(data, function (Index, value) {
                    var id = value.id;
                    var newrowContent = "<tr id= " + value.id + "><td> " + value.bill_id + " </td><td class='custdetails' custid=" + value.customerID + " data=" + value.name + "><span style='color:#147ad0!important;cursor:pointer!important;'>" + value.name + " </span></td><td> " + value.Createdon_string + " </td><td>" + "<div class='col-md-12' width='100%'><div class='formfield' id='floatdv'><p>"+value.status+"</p></div ></div >" + "</td><td><span class='iconify viewdtls' data-icon='bi:cart3' data-inline='false' id=" + value.cart_id + " ></span><span>&nbsp;&nbsp;</span><span style='display:none' class='iconify' data-icon='la:file-invoice-solid' data-inline='false'></span><a href ='../BillGenerate.html?cart=" + value.cart_id + "&bill=" + value.id + "&billamount=" + value.amount + "&customerid=" + value.customerID+"'><i class='fa fa-download'></i></a></td></tr>"
                    $("#tblorder_lst_pdf tbody").append(newrowContent);
                    $("#hidden_id").val(value.id);
                });
            }
        });
    };

    $('#tblorder_lst').DataTable();
    //$('#tblorder_lst_pdf').DataTable();
    $("#tblorder_lst").on('click', ".viewdtls", function () {

        var getid = $(this).attr("id");
        $.ajax({
            url: "https://api.americanfragrances.com/Order/Myorderdetails?project_id=" + Project_Id + " &cart_id=" + getid + " &authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                $("#orderdetails_list").empty();
                data.responsemessage;
                $.each(data, function (Index, value) {
                    var newrowContent = '<div class="row"><div class="col-md-3"><div class="product_list_img"><img src="' + value.image + '" class="img-fluid"/></div></div><div class="col-md-4"><br /><br /><span> ' + value.name + ' </span><p>Qty : ' + value.quantity + ' </p></div><div class="col-md-5 text-right"> <br /><br /><p><span>Price :</span> Rs.' + value.price + ' /-</p><p><span>Rate :</span><strike>Rs.' + value.rate + ' /-</strike><span>&nbsp;&nbsp;</span><span class="text-success"><span>Saved : Rs.</span> ' + value.discount_amount + ' /-</span></p></div></div>'
                    $("#orderdetails_list").append(newrowContent);
                    $("#totalamnt").text(value.amount);

                });
                $("#Addcategory").modal('show');
            },
            error: function (xhr) {
                //
            }
        });
    });
    $("#tblorder_lst").on('click', ".custdetails", function () {
        // 
        //$("#Addcategory").modal('show');

        var getname = $(this).text();
        getname = $.trim(getname);

        var getid = $(this).attr("custid");

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/edit?project_id=" + Project_Id + " &id=" + getid + " &authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                $("#orderdetails_list").empty();
                var newrowContent = '<p><div class="row"><div class="col-md-3">Name </div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.name + '</div></div> </p><p><div class="row"><div class="col-md-3">Email Id </div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.email + '</div></div> </p><p><div class="row"><div class="col-md-3">Phone No</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.phone + '</div></div> </p><p><div class="row"><div class="col-md-3">Address:</div><div class="col-md-1">:</div><div class="col-md-6" id="Address_list"></div></div></p>'
                $("#orderdetails_list").append(newrowContent);
                $.ajax({
                    url: "https://api.americanfragrances.com/Addressbook/Index?project_id=" + Project_Id + "&authorid=" + getid + "",
                    type: "GET",
                    dataType: "JSON",
                    async: false,
                    crossDomain: true,
                    success: function (data) {
                        $("#Address_list").empty();
                        if (data != "" && data.id != "00000000-0000-0000-0000-000000000000") {
                            data.responsemessage;
                            var i = 0;
                            $.each(data, function (Index, value) {
                                i = i + 1;
                                if (i == 1) {
                                    if (value.isprimary == null) {
                                        var chk = true;
                                        value.isprimary = true;
                                        if (chk) {
                                            $("#Address_list").empty();
                                            var newrowContent = '<div class=""> ' + value.addressline1 + ' , ' + value.addressline2 + ' , ' + value.city + ' , ' + value.state + ' ,' + value.pincode + '</div>'
                                            $("#Address_list").append(newrowContent);
                                        }
                                    }
                                    else {
                                        $("#Address_list").empty();
                                        var newrowContent = '<div class=""> ' + value.addressline1 + ' , ' + value.addressline2 + ' , ' + value.city + ' , ' + value.state + ' ,' + value.pincode + '</div>'
                                        $("#Address_list").append(newrowContent);
                                    }
                                }

                                $("#totalamnt").val(localStorage.getItem("prices"));
                            });
                        }
                        else {
                            $("#Address_list").append(newrowContent);
                            $("#totalamnt").val(localStorage.getItem("prices"));
                        }
                    }
                });
                $("#Addcategory").modal('show');
            },
            error: function (xhr) {
            }
        });
    });
});

