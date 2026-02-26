$(document).ready(function () {
     
    var Project_Id = GlobalInputs();
    Navbar_employee();
    var ProjectAuth = localStorage.getItem("Employee_auth");

    getdatatable();
    $("#tblorder_lst").DataTable({

        "order": [[3, "desc"]], //or asc 
        "columnDefs": [{ "targets": 3, "type": "date-eu" }],
        dom: 'Bfrtip',
        buttons: [
            //'copyHtml5',
            'excelHtml5',
            //'csvHtml5',
            'pdfHtml5'
        ]
    }); 

     function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Order/Myorder?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                 
             
                $("#tblorder_lst tbody").empty();
                $.each(data, function (Index, value) {
                     
                  
                    var newrowContent = "<tr><td> " + value.bill_id + " </td><td>" + value.name + " </td><td> " + value.Createdon_string + " </td><td> " + value.address + " </td><td><span class='iconify viewdtls' data-icon='bi:cart3' data-inline='false' id=" + value.cart_id + " ></span><span>&nbsp;&nbsp;</span><span style='display:none' class='iconify' data-icon='la:file-invoice-solid' data-inline='false'></span></td></tr>"
                    
                    $("#tblorder_lst tbody").append(newrowContent);

                    $("#hidden_id").val(value.id);
               
                   
                });
            }
        });
    };
   
    $('#tblorder_lst').DataTable();
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
                    var newrowContent = '<div class="row"><div class="col-md-3"><div class="product_list_img"><img src="' + value.image + '" /></div></div><div class="col-md-4"><br /><br /><span> ' + value.name + ' </span><p>Qty : ' + value.quantity + ' </p></div><div class="col-md-5 text-right"> <br /><br /><p><span>Price :</span> Rs.' + value.price + ' /-</p><p><span>Rate :</span><strike>Rs.' + value.rate + ' /-</strike><span>&nbsp;&nbsp;</span><span class="text-success"><span>Saved : Rs.</span> ' + value.discount_amount + ' /-</span></p></div></div>'
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
});

