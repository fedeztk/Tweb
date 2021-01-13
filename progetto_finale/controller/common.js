//common js for every page
//unavaiable in user.php
$(function () {
  $("")
  $("#dropContent li:last-child").on("click", function () {
    $.get({
      url: "../model/user/logout.php",
      success: function () {
        $(window.location).attr("href", "user.php");
      },
      error: function () {
        console.log(
          "Errore: impossibile effettuare la richiesta per la disconnessione."
        );
      },
    });
  });

  //hide flash on click
  $("#flash").on("click", function () {
    $("#flash").fadeOut(1000);
  });
});
