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
    error: function() {
      "Impossibile caricare l'home page"
    }
  });
});

function buildHome(res) {

  $("#flash").attr("class", "greeting");
  $("#flash").html("Bentornat* su BB Ceramics " + res.name).show().delay(3000).fadeOut(3000);

  //build of dom for random images

  // res.imgs.forEach(function(img) {
  //   jQuery("<img/>", {
  //     src: "../img/artwork/" + img["id"] + ".jpg",
  //     alt: img["name"],
  //   }).appendTo('#pics');
  // });

//   var index=0, images=['1', '2'];
// setInterval(function() {
//    $("#container>#pics").animate({ opacity: 0 }, 500, function() {
//      $("#container>#pics").css('background-image', 'url(../img/artwork/'+images[++index]+'.jpg)');
//      $("#container>#pics").animate({ opacity: 1 }, 500, function() {
//        if(index === images.length) index = 0;
//      });
//    });
// }, 6000);
//   var images = ['../img/artwork/1.jpg', '../img/artwork/2.jpg', '../img/artwork/3.jpg'],
//     index  = 0,
//     $top   = $('#container>#pics');

// setInterval(function() {
//    $top.animate({ opacity: 0 }, 500, function() {
//      $top.css('background-image', 'url('+images[++index]+')');
//      $top.animate({ opacity: 1 }, 500, function() {
//        if(index === images.length) index = 0;
//      });
//    });
// }, 3000);
}

function fadeNewImg(){
  $("#container>#pics").css("background-image", 'url(../img/artwork/1.jpg)').fadeIn(1500);
}


// function fadeNewImg() {
//   currImg = $('#pics img:first');
//   currImg.hide();
//   currImg.remove();
//   $('#pics').append(currImg);
//   currImg.fadeIn(1500);
// };
