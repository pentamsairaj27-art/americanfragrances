$(document).ready(function () {

    var Project_Id = GlobalInputs();
    Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");

    $.ajax({
        url: "https://api.americanfragrances.com/Customer/Count?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $("#customercount").text(data.count);     
            

        }
    });

    $.ajax({
        url: "https://api.americanfragrances.com/Order/Count?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $("#ordercount").text(data.count);
            
        }
    });

    $.ajax({
        url: "https://api.americanfragrances.com/Category/Count?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $("#categorycount").text(data.count);
            
        }
    });
    $.ajax({
        url: " https://api.americanfragrances.com/Product/Count?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {
            $("#productcount").text(data.count);
            
           

        }
    });
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    var datenow = formatDate(new Date());
    $.ajax({
        url: "https://api.americanfragrances.com/Order/Salereport",
        type: "POST",
        data: { "Project_Id": Project_Id, "todate": "2021-05-01", "authorid": ProjectAuth, "fromdate": datenow },
        dataType: "json",
        traditional: true,
        success: function (data) {
            // getdatatable();
             
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/Admin/Login.html";
                return;
            }
        }

    });

    // orders list
    

    $("#adminanalytics").submit(function () {
        var from = $("#fromdate").val();
        var dateParts = from.split('/');
        var date = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
        var formattedFromDate = `${(date.getDate() < 10 ? '0' : '') + date.getDate()}-${(date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)}-${date.getFullYear()}`.replace(/"/g, '');
        
        var to = $("#todate").val();
        var datetoParts = to.split('/');
        var todate = new Date(`${datetoParts[2]}-${datetoParts[0]}-${datetoParts[1]}`);
        var formattedtoDate = `${(todate.getDate() < 10 ? '0' : '') + todate.getDate()}-${(todate.getMonth() + 1 < 10 ? '0' : '') + (todate.getMonth() + 1)}-${todate.getFullYear()}`.replace(/"/g, '');
        var dataPointanswers = [];

        $.ajax({
            url: "https://api.americanfragrances.com/Analytics/CombinedAnalytics?project_id=" + Project_Id + "&authorid=" + ProjectAuth + "&from="+ formattedFromDate +"&to="+formattedtoDate,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {             
                $(".hidebeforeresponse").show();
                $("#NewVisitorsCount").empty();
                $("#transactions").empty();
                $("#totaltransaction").empty();
                $("#gifttransaction").empty();
                $("#transactionspercent").empty();
                $("#delivered").empty();
                $("#dispatched").empty();
                $(".outofstock").empty();
                $("#instock").empty();
                   
                    $("#adminname").append();
                    
                    $(".outofstock").append(data.StockStatistics.OutOfStockInfo);
                    $("#instock").append(data.StockStatistics.InStockInfo);
                    $("#delivered").append(data.OrderCounts.DispatchedOrders);
                    $("#dispatched").append(data.OrderCounts.DeliveredOrders);
                    $("#NewVisitorsCount").append(data.NewVisitorsCount);
                    $("#transactions").append(data.TotalTransactions);
                    $("#totaltransaction").append(data.TotalTransactions);
                    $("#gifttransaction").append(data.GiftCardTotalTransactions);
                    $("#transactionspercent").append();
                       //$("#chartContainer").CanvasJSChart().destroy();
                       for (var i = 0; i < data.DaywiseAmount.length; i++) {
                        var nowDate = new Date(parseInt(data.DaywiseAmount[i].createdon.substr(6)));
                        var result = "";
                        result = nowDate.toString("dd/mm/yyyy");
                        dataPointanswers.push({
                            x: new Date(result),
                            y: data.DaywiseAmount[i].amount
                        });
                    }
                    var chart = new CanvasJS.Chart("chartContainer", {
                        title: {
                            text: "Your Chart Title"
                        },
                        axisX: {
                            labelFormatter: function (e) {
                                return CanvasJS.formatDate(e.value, "DD MMM");
                            },
                        },
                        animationEnabled: true,
                        exportEnabled: true,
                        data: [
                            {
                                type: "spline",
                                dataPoints: dataPointanswers // Replace with your data
                            }
                        ]
                    });
    
                    // Render the chart
                    chart.render();
                    
                    return false; 
            }
        });
    });
    $.ajax({
        url: "https://api.americanfragrances.com/Order/Myorder?project_id=" + Project_Id + "&authorid=" + ProjectAuth,
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data) {          
            var i = 0;   
            $("#tblorder_lst tbody").empty();
            $.each(data, function (Index, value) {
                i = i + 1;
                if (i < 11) {
                var id = value.id;
                var device = value.customer_deviceid;
                var devicevalue="";
                if(device == "web"){
                   devicevalue = '<i class="mdi mdi-laptop mdi-18px"></i>';
                }
                else{
                    devicevalue = '<i class="mdi mdi-cellphone mdi-18px"></i>';
                }
                var amount = parseFloat(value.price).toFixed(2);
                var newrowContent = '<tr><td class="text-primary">'+value.bill_id+'</td>'+
                '<td><div class="avatar avatar-sm"><div class="avatar-initial bg-label-success rounded-circle">'+devicevalue+'</div></div></td>'+
                '<td><div class="d-flex align-items-center"><div><img src="'+value.customer_image+'" alt="Avatar" width="30" class="rounded-circle me-2" /></div><div><h6 class="mb-0 text-truncate">'+value.name+'</h6><small class="text-truncate">'+value.customer_email+'</small></div></div></td>'+
                '<td class="text-truncate">$'+amount+'</td>'+
                '<td><span class="badge bg-label-success rounded-pill fw-normal">Paid</span></td></tr>'
                $("#orders_list tbody").append(newrowContent);
                $("#hidden_id").val(value.id);
            }

            });
        }
        
    });

   
        $("#fromdatepicker, #todatepicker").datepicker({
            format: "mm/dd/yyyy",
            autoclose: true
        });

        // Handle 'To Date' selection
        $("#todate").on("change", function () {
            let fromDate = $("#fromdate").val();
            let toDate = $("#todate").val();

            if (!fromDate) {
                alert("Please select the 'From Date' first.");
                $("#todate").val("");
                // Clear invalid selection
              
                return;
            }

            if (new Date(toDate) < new Date(fromDate)) {
                alert("The 'To Date' should be greater than or equal to the 'From Date'.");
                $("#todate").val(""); // Clear invalid selection
            }
        });
 


});