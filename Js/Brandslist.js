
$(document).ready(function () {
    var Project_Id = GlobalInputs();
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var vendor = params.get('vendor');
    var Category_name = params.get('cat');
    var more = params.get('more');
    console.log(more)
    var Sub_Category = params.get('sub_cat');
    var cart_id = localStorage.getItem("cart_id");
    let Authkey = localStorage.getItem("authorid");
    var usersession = localStorage.getItem("authorid");
    //intially hiding search list
    $("#brandlist2").hide();
    $("#brandSearch").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();
        if (searchText === "") {
            $("#brandlist2").hide();
            return;
        }

        $("#brandlist2").show();
        $(".brandSearchListItem").each(function () {
            var brandName = $(this).find("a").text().toLowerCase();
            $(this).toggle(brandName.includes(searchText));
        });
    });

    getbrandslistSearch();

    function getbrandslistSearch() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/Brandlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                $.each(data, function (Index, value) {
                    var newrowContent = `
                    <p class="brandSearchListItem">
                        <a class="" href="show-all.html?brand=${value.name}">${value.name}</a>
                    </p>`;
                    $("#brandlist2").append(newrowContent);
                });
            }
        });
    }


    getbrandslist()

    function getbrandslist() {
        $.ajax({
            url: "https://api.americanfragrances.com/Home/PremiumBrandlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                let premiumBrands = data.filter(item => item.serialno !== null && item.ispremium === true)
                    .sort((a, b) => a.serialno - b.serialno);

                let container = $("#brandslist");

                premiumBrands.forEach(function (brand) {
                    let brandHTML = `
                <div class="col-md-4 p-4">
                    <div class="brand2">
                        <a href="show-all.html?brand=${encodeURIComponent(brand.name)}">
                            <img src="${brand.image}" data-brand="${brand.name}" 
                                 style="width:100%;height:auto;border:1px solid #ddd;">
                        </a>
                    </div>
                </div>`;
                    container.append(brandHTML);
                });
            }
        });

        $.ajax({
            url: "https://api.americanfragrances.com/Home/Brandlist?project_id=" + Project_Id,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                let brands = data.map(item => item.name); // Extract brand names from data array
                let groupedBrands = {};

                // Categorize the brands alphabetically
                brands.forEach(function (brand) {
                    let firstLetter = brand[0].toUpperCase();
                    // Check if first letter is a digit
                    if (/\d/.test(firstLetter)) {
                        firstLetter = "0-9";
                    }
                    if (!groupedBrands[firstLetter]) {
                        groupedBrands[firstLetter] = [];
                    }
                    groupedBrands[firstLetter].push(brand);
                });

                let categories = [
                     // Added for numeric brand names
                    { range: "A-C", letters: ["A", "B", "C"] },
                    { range: "D-I", letters: ["D", "E", "F", "G", "H", "I"] },
                    { range: "J-M", letters: ["J", "K", "L", "M"] },
                    { range: "N-Q", letters: ["N", "O", "P", "Q"] },
                    { range: "R-U", letters: ["R", "S", "T", "U"] },
                    { range: "V-Z", letters: ["V", "W", "X", "Y", "Z"] },
                    { range: "#", letters: ["0-9"] },
                ];

                let container = $("#brand-container"); // Target the correct class

                categories.forEach(function (category) {
                    let section = $("<div>").addClass("brand-section");
                    let heading = $("<h3>").text(category.range);
                    let list = $("<ul style='text-align:center !important'>");

                    category.letters.forEach(function (letter) {
                        if (groupedBrands[letter]) {
                            groupedBrands[letter].forEach(function (brand) {
                                let listItem = $("<li>");
                                let link = $("<a>")
                                    .attr("href", `/show-all.html?brand=${(brand)}`)
                                    .text(brand);

                                listItem.append(link);
                                list.append(listItem);
                            });
                        }
                    });

                    if (list.children().length > 0) { // Append only if there are brands
                        section.append(heading).append(list);
                        container.append(section);
                    }
                });
            }
        });
    }



    $("#brandSearch").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();
        if (searchText == "") {
            $("#brandlist").hide();
        } else {
            $(".brandItem").each(function () {

                var brandName = $(this).find("label").text().toLowerCase();

                $("#brandlist").show();
                if (brandName.indexOf(searchText) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                    if (searchText == "") {
                        $("#brandlist").hide();
                    }
                }
            });
        }

    });



});



