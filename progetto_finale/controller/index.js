// home page script
$(function() {
  // check login status, and if logged, gets the user name, otherwise redirect
  // to user.php
  $("#flash").hide();
  $.get({
    url: "../model/getHomePage.php",
    datatype: "json",
    data: "",
    success: buildHome,
    error: function(res) {
      $(window.location).attr('href', 'user.php');
      console.log(res);
    }
  });
});

function buildHome(res) {

  $("#flash").attr("class", "greeting");
  $("#flash").html("Bentornat* su BB Ceramics " + res.name).show().delay(3000).fadeOut(3000);

  //build of dom for random images

  res.imgs.forEach(function(img) {
    jQuery("<img/>", {
      src: "../img/artwork/" + img["id"] + ".jpg",
      alt: img["name"],
    }).appendTo('#pics');
  });

  setInterval(fadeNewImg, 3000);
}

function fadeNewImg() {
  currImg = $('#pics img:first');
  currImg.hide();
  currImg.remove();
  $('#pics').append(currImg);
  currImg.fadeIn(1500)
};
