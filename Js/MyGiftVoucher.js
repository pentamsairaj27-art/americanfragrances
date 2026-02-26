var Project_Id = GlobalInputs();
/*let Authkey = localStorage.getItem("authorid");*/
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    let Authkey = localStorage.getItem("authorid");
    var url = window.location.search;
    var params = new URLSearchParams(url);
    $.ajax({
        url: "https://api.americanfragrances.com/Customer/Edit?id=" + Authkey + "&authorid=" + Authkey + " &project_id= " + Project_Id,
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (data) {
            $(".Hello_txt_big").text(data.firstname);
        },
        error: function (xhr) {
        }
    });
    

    $.ajax({
        
        url: "https://api.americanfragrances.com/Customer/MyGiftCards?customerid=" + Authkey+"",
        type: "GET",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        //success: function (data) {
        //    
        //    $.each(data, function (index, value) {
        //        var newrowContent = "<tr><td>" + value.ProductName + "</td><td><a href='Productview.html?id=" + value.productid + "'>" + value.productid + "</a></td><td>" + value.Rating + "</td><td>" + value.Comment + "</td><td><button id=" + value.Id + " class='btn edit'><i class='fa fa-edit'></i>&nbsp;</button></td></tr>";
        //        $("#order_list tbody").append(newrowContent);

        //    });
        //}
        success: function (data) {
            // Sort orders by creation date in descending order
            if (data.length == 0) {
                $(".message").text("No Giftcards")
            }
            else {
                data.sort(function (a, b) {
                    var dateA = moment(a.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
                    var dateB = moment(b.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
                    return dateB.diff(dateA);
                });
                console.log(data);

                $("#tblorder_lst tbody").empty();
                $.each(data, function (Index, value) {
                    var id = value.id;
                    if (value.IsRedeemed == true) {
                        var IsRedeemed = ""
                        var RedeemedDate = new Date(parseInt(value.RedeemedDate.replace("/Date(", "").replace(")/")));
                        var dd = RedeemedDate.getDate();
                        var mm = RedeemedDate.getMonth() + 1; //January is 0!
                        var yyyy = RedeemedDate.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        if (mm < 10) { mm = '0' + mm }
                        var datef = + dd + '/' + mm + '/' + yyyy;
                        IsRedeemed = datef;
                    }
                    else {
                        IsRedeemed = value.IsRedeemed;
                    }
                    var amount = parseFloat(value.amount).toFixed(2);

                    var newrowContent = "<tr id= " + value.id + "><td> " + value.GiftID + " </td><td>" + value.recipientname + "</td><td>" + value.yourmail + "</td><td>" + value.recipientmail + "</td><td> $" + amount + " </td><td>" + IsRedeemed + "</td></tr>"
                    $("#tblorder_lst tbody").append(newrowContent);
                });
            }
            //data.sort(function (a, b) {
            //    var dateA = moment(a.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
            //    var dateB = moment(b.Createdon_string, 'YYYY-MM-DD'); // Adjust the format as needed
            //    return dateB.diff(dateA);
            //});
            //console.log(data);

            //$("#tblorder_lst tbody").empty();
            //$.each(data, function (Index, value) {
            //    var id = value.id;
            //    if (value.IsRedeemed == true) {
            //        var IsRedeemed = ""
            //        var RedeemedDate = new Date(parseInt(value.RedeemedDate.replace("/Date(", "").replace(")/")));
            //        var dd = RedeemedDate.getDate();
            //        var mm = RedeemedDate.getMonth() + 1; //January is 0!
            //        var yyyy = RedeemedDate.getFullYear();
            //        if (dd < 10) { dd = '0' + dd }
            //        if (mm < 10) { mm = '0' + mm }
            //        var datef = + dd + '/' + mm + '/' + yyyy;
            //        IsRedeemed = datef;
            //    }
            //    else {
            //        IsRedeemed = value.IsRedeemed;
            //    }
            //    var amount = parseFloat(value.amount).toFixed(2);

            //    var newrowContent = "<tr id= " + value.id + "><td> " + value.id + " </td><td>" + value.recipientname + "</td><td>" + value.yourmail + "</td><td>" + value.recipientmail + "</td><td> $" + amount + " </td><td>" + IsRedeemed + "</td></tr>"
            //    $("#tblorder_lst tbody").append(newrowContent);
            //});
        }
    });
});


