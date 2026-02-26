// address block
function address() {
    // for hiding block
    var x = document.getElementById("address");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("address-btn");
    if (y.innerHTML == "Add info"){
        y.innerHTML = 'Close';
    } else {
        y.innerHTML = 'Add info';
    }
  }
//   end of address block
// Coupon block
function Coupon() {
    // for hiding block
    var x = document.getElementById("coupon");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("coupon-btn");
    if (y.innerHTML == "Add Coupon"){
        y.innerHTML = 'Close';
    } else {
        y.innerHTML = 'Add Coupon';
    }
  }
//   end of coupon
// Gift
function Gift() {
    // for hiding block
    var x = document.getElementById("Gift");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    // for changing text on button
    var y = document.getElementById("Gift-btn");
    if (y.innerHTML == "Gift certificate"){
        y.innerHTML = 'Close';
    } else {
        y.innerHTML = 'Gift certificate';
    }
  }