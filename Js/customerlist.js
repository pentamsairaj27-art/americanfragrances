$(document).ready(function () {
  var Project_Id = GlobalInputs();
  Navbar();
  var ProjectAuth = localStorage.getItem("Admin_auth");

  getdatatable();

  /// $('#tblorder_lst').DataTable();

  function getdatatable() {
    $.ajax({
      url:
        "https://api.americanfragrances.com/Customer/Index?project_id=" +
        Project_Id +
        "&authorid=" +
        ProjectAuth,
      type: "GET",
      dataType: "JSON",
      async: false,
      crossDomain: true,
      success: function (data) {
        $("#tblorder_lst tbody").empty();
        $.each(data, function (Index, value) {
          var newrowContent =
            "<tr><td class='custdetails' id= " +
            value.id +
            " ><span style='color:#147ad0!important;cursor:pointer!important;'>" +
            value.name +
            "</span> </td><td> " +
            value.email +
            " </td><td> " +
            value.phone +
            " </td> <td style='display:none!important'><span class='iconify viewdtls' data-icon='bi:cart3' data-inline='false' id=" +
            value.cart_id +
            " ></span><span>&nbsp;&nbsp;</span><span style='display:none' class='iconify' data-icon='la:file-invoice-solid' data-inline='false'></span></td></tr>";

          $("#tblorder_lst tbody").append(newrowContent);

          $("#hidden_id").val(value.id);
        });
      },
    });
  }

  $("#tblorder_lst").on("click", ".viewdtls", function () {
    $("#Addcategory").modal("show");
    var getid = $(this).attr("id");
    $.ajax({
      url:
        "https://api.americanfragrances.com/Order/Myorderdetails?project_id=" +
        Project_Id +
        " &cart_id=" +
        getid +
        " &authorid=" +
        ProjectAuth,
      type: "GET",
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        $("#orderdetails_list").empty();
        data.responsemessage;
        $.each(data, function (Index, value) {
          var newrowContent =
            '<div class="row"><div class="col-md-3"><div class="product_list_img"><img src="' +
            value.image +
            '" /></div></div><div class="col-md-4"><br /><br /><span> ' +
            value.name +
            " </span><p>Qty : " +
            value.quantity +
            ' </p></div><div class="col-md-5 text-right"> <br /><br /><p><span>Price :</span> Rs.' +
            value.price +
            " /-</p><p><span>Rate :</span><strike>Rs." +
            value.rate +
            ' /-</strike><span>&nbsp;&nbsp;</span><span class="text-success"><span>Saved : Rs.</span> ' +
            value.discount_amount +
            " /-</span></p></div></div>";
          $("#orderdetails_list").append(newrowContent);
          $("#totalamnt").text(value.amount);
        });
        // $("#Addcategory").modal('show');
      },
      error: function (xhr) {
        //
      },
    });
  });

  $("#tblorder_lst").on("click", ".custdetails", function () {
    //$("#Addcategory").modal('show');
    var getid = $(this).attr("id");
    $.ajax({
      url:
        "https://api.americanfragrances.com/Customer/edit?project_id=" +
        Project_Id +
        " &id=" +
        getid +
        " &authorid=" +
        ProjectAuth,
      type: "GET",
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        // $.ajax({
        //   url:
        //     "https://api.americanfragrances.com/Addressbook/Index?project_id=" +
        //     Project_Id +
        //     "&authorid=" +
        //     getid +
        //     "",
        //   type: "GET",
        //   dataType: "JSON",
        //   async: false,
        //   crossDomain: true,

        //   success: function (data) {
        //     $("#Address_list").empty();
        //     if (
        //       data != "" &&
        //       data.id != "00000000-0000-0000-0000-000000000000"
        //     ) {
        //       data.responsemessage;
        //       var i = 0;

        //       $.each(data, function (Index, value) {
        //         i = i + 1;
        //         if (i == 1) {
        //           if (value.isprimary != null) {
        //             var chk = true;

        //             value.isprimary = true;

        //             if (chk) {
        //               var newrowContent =
        //                 '<p><div class="row" style="margin-left:0px;"><div class="col-md-3">Address</div><div class="col-md-1">:</div><div class="col-md-8"> ' +
        //                 value.addressline1 +
        //                 " ," +
        //                 value.addressline2 +
        //                 " , " +
        //                 value.city +
        //                 " , " +
        //                 value.state +
        //                 " ," +
        //                 value.pincode +
        //                 "</div></div></p>";
        //             }
        //           }
        //         }

        //         $("#Address_list").append(newrowContent);
        //       });
        //     } else {
        //       var newrowContent =
        //         '<table style="margin:0px auto!important"><tr><td><div class="icon_dv"><div class="lbl_icon_circle"></div></div></td><td><h6 class="txt_sm text-danger">Address has not been Added by this Customer</h6></td></tr></table>';
        //       $("#Address_list").append(newrowContent);
        //     }
        //   },
        // });

        $("#orderdetails_list").empty();
        data.responsemessage;
        var completedDate = new Date(
          parseInt(data.dob.replace("/Date(", "").replace(")/"))
        );
        var dd = completedDate.getDate();
        var mm = completedDate.getMonth() + 1; //January is 0!
        var yyyy = completedDate.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        var datef = +dd + "/" + mm + "/" + yyyy;
        var newrowContent =
            '<p><div class="row"><div class="col-md-3">Name </div><div class="col-md-1">:</div><div class="col-md-6"> ' +
              data.firstname + " "+data.lastname+
          '</div></div> </p><p><div class="row"><div class="col-md-3">Email Id </div><div class="col-md-1">:</div><div class="col-md-6"> ' +
          data.email +
          '</div></div> </p><p><div class="row"><div class="col-md-3">Phone No</div><div class="col-md-1">:</div><div class="col-md-6"> ' +
          data.phone +
          "</div></div> </p>"+
          '<p><div class="row"><div class="col-md-3">First Name</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.firstname + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Last Name</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.lastname + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Gender</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.gender + '</div></div> </p>'+
          //'<p><div class="row"><div class="col-md-3">Location</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.location + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Mobile</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.phone + '</div></div> </p>'+
          //'<p><div class="row"><div class="col-md-3">Profession</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.profession + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 1</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun1 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 2</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun2 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 3</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun3 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 4</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun4 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 5</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun5 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 6</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun6 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 7</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun7 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 8</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun8 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 9</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun9 + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Question 10</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.qun10 + '</div></div> </p>'+
          //'<p><div class="row"><div class="col-md-3">About</div><div class="col-md-1">:</div><div class="col-md-6"> ' + data.address + '</div></div> </p>'+
          '<p><div class="row"><div class="col-md-3">Dob</div><div class="col-md-1">:</div><div class="col-md-6"> ' + datef + '</div></div> </p>';
        $("#orderdetails_list").append(newrowContent);

        $("#Addcategory").modal("show");
      },
      error: function (xhr) {
        //
      },
    });
  });

  $("#tblorder_lst").DataTable({
    order: [[3, "desc"]], //or asc
    columnDefs: [{ targets: 3, type: "date-eu" }],
    dom: "Bfrtip",
    buttons: [
      //'copyHtml5',
      "excelHtml5",
      //'csvHtml5',
      "pdfHtml5",
    ],
  });
});
