$(function() {
  $.get({
    url: "../model/getArtworks.php",
    datatype: "json",
    data: "",
    success: buildProduct,
    error: function(res) {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
      console.log(res);
    }
  });
});


function buildProduct(products) { //TODO settare tutti i modal
  if (products.length) {
    products.forEach(function(product) {

      var newImgDiv = $("<div>").addClass("card");
      var newImgContent = $("<div>").addClass("content");
      var newImg = $("<img/>", {
        src: "../img/artwork/" + product["id"] + ".jpg",
        alt: product["name"],
      });
      var newImgInfo = $("<div>").addClass("back");

      newImgContent.append(newImg).append(newImgInfo);

      newImgDiv.append(newImgContent).appendTo('.grid');

      newImgDiv.on("click", function() {
        newImgContent.toggleClass("flipped");

        if (!$(this).hasClass("visited")) {
          $.get({ //WIP
            url: "../model/shop/getProductInfo.php",
            datatype: "json",
            data: "id=" + product["id"],
            success: function(info) {

              // check if product should contains food
              isEdible = info["isEdible"] ?
                '<i class="fa fa-check" aria-hidden="true"></i>' :
                '<i class="fa fa-times" aria-hidden="true"></i>';

              newImgInfo.append(
                $("<h2>").text(info['name'])
              ).append(
                $("<ul>").append(
                  $("<li>").text("Materiale: " + info["material"])
                ).append(
                  $("<li>").text("Dimensioni: " + info["height"] + "x" + info['width'] + " cm")
                ).append(
                  $("<li>").html("Uso alimentare? " + isEdible)
                ).append(
                  $("<li>").text("Prezzo: " + info["price"] + "€")
                )
              )
            },
            error: function() {
              console.log('Errore: impossibile ottenere le informazioni del prodotto');
            }
          });
          $(this).addClass("visited");
        }
      })

      // $("<img/>", {
      //   src: "../img/artwork/" + product["id"] + ".jpg",
      //   alt: product["name"],
      // }).appendTo('.grid');
    });
  } else {
    $("#flash").attr("class", "warning");
    $("#flash").html("Ci scusiamo per l'incoveniente, il prodotto che sta cercando sembra non esistere!").show();
  }
}
