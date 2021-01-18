//common js for every page
$(function() {
  //update the cart icon in top bar
  $.get({
    url: "../model/updateBar.php",
    success: function(exist) {
      if (exist.count > 0)
        $(".fa-shopping-cart").addClass("fa-cart-arrow-down").removeClass("fa-shopping-cart");
    },
  });

  //logout button in top bar, unavaiable in user.php
  $("#dropContent li:last-child").on("click", function() {
    $.get({
      url: "../model/user/logout.php",
      success: function() {
        $(window.location).attr("href", "user.php");
      },
      error: function() {
        console.log("Errore: impossibile effettuare la richiesta per la disconnessione.");
      },
    });
  });

  //hide flash on click
  $("#flash").on("click", function() {
    $("#flash").fadeOut(1000);
  });
});
