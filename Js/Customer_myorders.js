var Project_Id = GlobalInputs();

$(document).ready(function () {
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var getparm = params.get('order');

    if (getparm == "placed") {
        $('#orderplaced').modal('show');
       // $('#feedback').modal('show');
       
    }
    else {
        $('#orderplaced').modal('hide');
    }
    getquestions();
    //Questions Fetch
    function getquestions() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/FeedbackQuestionlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $.each(data, function (Index, value) {
                    var qunid = value.id;
                    if (qunid == "fa0d00d2-7e21-49d9-ab52-dc9e7bc08339") {
                        var qun1 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun1" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun1opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun1").append(qun1);
                    } else if (qunid == "27059952-4128-4b44-be81-ea158ed8eb92") {
                        var qun2 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun2" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun2opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun2").append(qun2);
                    }else if (qunid == "c8f8dc67-b98b-436c-b74b-b21399bebc5c") {
                        var qun3 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun3" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun3opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun3").append(qun3);
                    }else if (qunid == "cb6924f2-a52e-43f8-8c0b-492234c4345e") {
                        var qun4 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun4" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun4opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun4").append(qun4);
                    }else if (qunid == "d84ee43f-6f45-4025-8755-fa04ea76667d") {
                        var qun5 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun5" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun5opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun5").append(qun5);
                    }else if (qunid == "214c962f-7ee6-4158-bc0b-a4c8059a6cc2") {
                        var qun6 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun6" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun6opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun6").append(qun6);
                    }else if (qunid == "80e157a3-7798-4bd7-90a8-7b0e0a2b97e4") {
                        var qun7 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun7" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun7opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun7").append(qun7);
                    }else if (qunid == "a6a5ce94-7d19-4bc7-b66a-72ec253a6cae") {
                        var qun8 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun8" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun8opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun8").append(qun8);
                    }else if (qunid == "6239cda0-e527-4e32-be3b-be94f9447067") {
                        var qun9 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun9" id="'+value.id+'">' + value.question + '</label></div><div class="col-md-6"><select class="qun9opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun9").append(qun9);
                    }else if (qunid == "e64bd14d-cfac-490c-b80a-fe7329029bf8") {
                        var qun10 = '<div class="row"><div class="col-md-6"><label class="form-label" for="qun10" id="'+value.id+'" >' + value.question + '</label></div><div class="col-md-6"><select class="qun10opt modal-select" id="qun1"><option value="' + value.option1 + '" id="option1' + value.id + '">' + value.option1 + '</option><option value="' + value.option2 + '" id="option2' + value.id + '">' + value.option2 + '</option><option value="' + value.option3 + '" id="option3' + value.id + '">' + value.option3 + '</option><option value="' + value.option4 + '" id="option4' + value.id + '">' + value.option4 + '</option><option value="' + value.option5 + '" id="option5' + value.id + '">' + value.option5 + '</option><option value="' + value.option6 + '" id="option6' + value.id + '">' + value.option6 + '</option><option value="' + value.option7 + '" id="option7' + value.id + '">' + value.option7 + '</option><option value="' + value.option8 + '" id="option8' + value.id + '">' + value.option8 + '</option><option value="' + value.option9 + '" id="option9' + value.id + '">' + value.option9 + '</option><option value="' + value.option10 + '" id="option10' + value.id + '">' + value.option10 + '</option></select></div></div>';
                        $("#qun10").append(qun10);
                    }

                   
                });
            }
        });
    };

    $(document).on('submit', "#feedback", function () {
        
        var question1 = "1";
        var question2 = "2";
        var question3 = "3";
        var question4 = "4";
        var question5 = "5";
        var question6 = "6";
        var question7 = "7";
        var question8 = "8";
        var question9 = "9";
        var question10 = "10";
        var questionIds = [];
        questionIds.push( question1, question2, question3, question4, question5, question6, question7, question8, question9, question10);
        var qun1option = $(".qun1opt option:selected").val();
        var qun2option = $(".qun2opt option:selected").val();
        var qun3option = $(".qun3opt option:selected").val();
        var qun4option = $(".qun4opt option:selected").val();
        var qun5option = $(".qun5opt option:selected").val();
        var qun6option = $(".qun6opt option:selected").val();
        var qun7option = $(".qun7opt option:selected").val();
        var qun8option = $(".qun8opt option:selected").val();
        var qun9option = $(".qun9opt option:selected").val();
        var qun10option = $(".qun10opt option:selected").val();
        var prodt_id = $("#prod_id").val();
        var selectedOptionNumbers = []; 
        selectedOptionNumbers.push(qun1option, qun2option, qun3option, qun4option, qun5option, qun6option, qun7option, qun8option, qun9option, qun10option);
        $.ajax({
            url: "https://api.americanfragrances.com/ProductAnalytics/CreateUserFeedback",
            type: "POST",
            dataType: "json",
            data: { questionIds: questionIds, selectedOptionNumbers: selectedOptionNumbers, authorid: Authkey, productid: prodt_id },
            success: function (response) {
                
                $('#orderplaced').modal('hide');

                                // Handle success response
                                alert(response);
            },
            error: function(error) {
                // Handle error response
                console.error(error);
            }
        });
    });
    getdatatable();
    function getdatatable() {

        $.ajax({
            url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                //var bindingprofile = '<div class="row"> <div class="col-md-3"> <p class="lbl_label">Name</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.name + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Email Id</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.email + '</p> </div> </div> <div class="row"> <div class="col-md-3"> <p class="lbl_label">Mobile Number</p> </div> <div class="col-md-8"> <p class="lbl_value">' + data.phone + '</p> </div> </div>';
                //$("#dvfetchcust_details").append(bindingprofile); 
                $(".Hello_txt_big").text(data.firstname);

            },
            error: function (xhr) {
            }
        });
    };
    
    $.ajax({
        url: "https://api.americanfragrances.com/Bill/Index?authorid=" + Authkey + " &project_id= " + Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {

            if (data != "") {
                var cart_id = "";
                $.each(data, function (Index, value) {
                    cart_id = value.cart_id ;
                    return false;
                });
                $("#cartId").append(cart_id);
                $.ajax({
                    url: "https://api.americanfragrances.com/Bill/Myorderdetails?authorid=" + Authkey + " &project_id= " + Project_Id + " &cart_id= " + cart_id,
                    type: "GET",
                    dataType: "JSON",
                    crossDomain: true,
                    success: function (data) {
                         
                        $.each(data, function (Index, value) {
                            var prod_id = '<input id = "prod_id" type = "hidden" value="' + value.product_id + '"/>';
                            $("#prod_div").append(prod_id);

                        });


                    },
                    error: function (xhr) {
                    }
                });


                $.each(data, function (Index, value) { 
                    var createdonDate = new Date(value.Createdon_string);
                    var formattedDate = createdonDate.toLocaleDateString();
                    var amount = parseFloat(value.amount).toFixed(2);
                    var newrowContent = "<tr><td> " + value.bill_id + " </td><td>" + (value.coupon || "-") + "</td> <td>" + (value.coupon_amount || "-") + "</td> <td>" + (value.coupon_offer || "-") + "</td><td>" + formattedDate + "</td>  <td>$" + amount + "</td><td>" + value.status + "</td><td><button id=" + value.cart_id + " innerid=" + value.id + " ttlamut=" + amount + "  class='btn edit'><i class='fa fa-eye'></i>&nbsp;</button>&nbsp; </td></tr>"
                    $("#order_list tbody").append(newrowContent);
                });
                $('#order_list').DataTable({
                    "order": [] // Disable default sorting
                });
                
            }
            else {

                var newrowContent = '<div class="text-center"><h4>No Orders Found!</h4> <img src="Images/empty_order.png" /> <br /><br /> <a href="home.html"><button class="btn">Start Shopping</button></a></div>'
                $("#emptydv").append(newrowContent);
                $('#order_list').hide();
            }


        },
        error: function (xhr) {
        }
    });
    

    $("#order_list").on('click', ".edit", function () {

        var getid = $(this).attr("id");
        var getbill = $(this).attr("innerid");
        var getbillamt = $(this).attr("ttlamut");

        $("#hiddencart").val(getid);
        $("#hiddenbill").val(getbill);
        $("#hiddenttlamt").val(getbillamt);
        $.ajax({
            url: "https://api.americanfragrances.com/Bill/Myorderdetails?authorid=" + Authkey + " &project_id= " + Project_Id + " &cart_id= " + getid,
            type: "GET",
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {

                data.responsemessage;
                $("#orderdetails_list tbody").empty();

                $.each(data, function (Index, value) {
                    var perprice = parseFloat(value.per_price).toFixed(2);
                    var price = parseFloat(value.price).toFixed(2);

                    //var newrowContent = "<tr><td><img src='" + value.image + "' width='30' / > " + value.name + " </td > <td>Rs  " + value.per_price + "</td> <td> " + value.quantity + "</td> <td>Rs  " + value.price + "</td></tr >"
                    var newrowContent = "<tr><td><img src='" + value.image + "' width='30' /> " + value.name + "</td><td>$ " + perprice + "</td><td>" + value.quantity + "</td><td>$ " + price + "</td><td><a class='btn more_btn' href='Productview.html?id=" + value.product_id + "'>Reorder</a> <a class='btn more_btn' style='background:none !important;color:black !important;border:none !important' cancel>Cancel</a></td></tr>";
                  $("#orderdetails_list tbody").append(newrowContent);

                });
                $("#totalamnt").text(getbillamt);
                $("#dvinvoice").empty();
                var newroecontent = '<label class="clkinvoice m-0">Invoice</label';
                $("#dvinvoice").append(newroecontent);
                $('#viewdetailModalCenter').modal('show');

            },
            error: function (xhr) {
            }
        });

    });

    $("#dvinvoice").click(function () {

        var cart = $("#hiddencart").val();
        var bill = $("#hiddenbill").val();
        var billttlamt = $("#hiddenttlamt").val();

        window.location.href = "BillGenerate.html?cart=" + cart + "&bill=" + bill + "&billamount=" + billttlamt;
    });
   
    //multistep
    var form_count = 1, form_count_form, next_form, total_forms;
    total_forms = $("fieldset").length;
    $(".next").click(function () {

        let previous = $(this).closest("fieldset").attr('id');
        let next = $('#' + this.id).closest('fieldset').next('fieldset').attr('id');
        $('#' + next).show();
        $('#' + previous).hide();
        setProgressBar(++form_count);

    });

    $(".previous").click(function () {

        let current = $(this).closest("fieldset").attr('id');
        let previous = $('#' + this.id).closest('fieldset').prev('fieldset').attr('id');
        $('#' + previous).show();
        $('#' + current).hide();
        setProgressBar(--form_count);

    });

    setProgressBar(form_count);
    function setProgressBar(curStep) {
        var percent = parseFloat(100 / total_forms) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
            .html(percent + "%");
    } 
    //end of multistep

    //var cart_id = $("#parvathi").val();
});


