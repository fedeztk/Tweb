// home page script
// get  3 random images from artwork and cycle through them
$(function() {
  $("#flash").hide();
  $.get({
    url: "../model/getHomePage.php",
    datatype: "json",
    data: "",
    success: buildHome,
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
    }
  });
});

function buildHome(res) {
  //greet the user
  $("#flash").attr("class", "greeting");
  $("#flash").html("Bentornat* su BB Ceramics " + res.name).show().delay(3000).fadeOut(1500);

  //start the images loop
  fadeNewImg(res.imgs, 0);
}

function fadeNewImg(res, idx) {
  $('#pics').fadeIn(1500).html('<img src="../img/artwork/' + res[idx]['id'] + '.jpg" alt="'+res[idx]['name']+'" />').delay(3000)
    .fadeOut(1500, function() {
      idx++;
      if (idx == res.length)
        fadeNewImg(res, 0);
      else
        fadeNewImg(res, idx);
    });
}
