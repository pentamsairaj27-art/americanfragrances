$(document).ready(function () {
    var Project_Id = GlobalInputs();
   // Navbar();
    var ProjectAuth = localStorage.getItem("Admin_auth");

    getdatatable();
  
    
    //---------------------------------------Category List Method-----------------------------------------//
   /* url: "https://api.americanfragrances.com"*/
    function getdatatable() {
        $.ajax({
            url: "https://api.americanfragrances.com/Admin/ListFAQs",
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {

                $("#accordionExample").empty();
                $.each(data, function (Index, value) {

                    var newrowContent = `<div class="accordion-item">
                    <h2 class="accordion-header" id="heading${Index}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${Index}" aria-expanded="true" aria-controls="collapse${Index}">
                            ${value.question}
                        </button>
                    </h2>
                    <div id="collapse${Index}" class="accordion-collapse collapse show" aria-labelledby="heading${Index}"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p style="font-size:14px">${value.answer}</p>
                        </div>
                    </div>
                </div>
                `;

                    $("#accordionExample").append(newrowContent);
                });
            }
        });
    };

});

