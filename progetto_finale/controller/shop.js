$(function() {
  $.get({
    url: "../model/shop/getArtworks.php",
    datatype: "json",
    data: "",
    success: buildProduct,
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
    }
  });
});

function buildProduct(products) {
  if (products.length) {
    products.forEach(function(product) {

      var newImgDiv = $("<div>").addClass("card");
      var newImgContent = $("<div>").addClass("content");
      var newImg = $("<img/>", {
        src: "../img/artwork/" + product["id"] + ".jpg",
        alt: product["name"],
      });
      var newImgInfo = $("<div>").addClass("back");

      newImgContent.append(newImg).append(newImgInfo); //append fron and back of the card content

      newImgDiv.append(newImgContent).appendTo('.grid'); //append each card to the grid

      newImgDiv.on("click", function() {

        newImgContent.toggleClass("flipped"); //flip the card

        if (!$(this).hasClass("visited")) { //check if it is already been visited
          $.get({
            url: "../model/shop/getProductInfo.php",
            datatype: "json",
            data: "id=" + product["id"],
            success: function(info) {
              setCard(info, product["id"], newImgInfo, newImgDiv);
            },
            error: function() {
              console.log('Errore: impossibile ottenere le informazioni del prodotto');
            }
          });
          $(this).addClass("visited"); //mark card as visited
        }
      })
    });
  } else {
    $("#flash").attr("class", "warning");
    $("#flash").html("Ci scusiamo per l'incoveniente, il prodotto che sta cercando sembra non esistere!").show();
  }
}

function setCard(info, id, newImgInfo, newImgDiv) {
  // check if product should contains food
  if (info["isEdible"] == true)
    isEdible = '<i class="fa fa-check" aria-hidden="true"></i>';
  else
    isEdible = '<i class="fa fa-times" aria-hidden="true"></i>';

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
  ).append(
    $("<p>").html('Clicca l\'icona o trascinala nel carrello in alto per acquistare! <br/>  <i class="fa fa-cart-plus"></i>')
  )

  newImgDiv.find("i.fa-cart-plus").on("click", function(e) {
    //prevent ancestor div from receiving the click
    if (!e)
      e = window.event;
    //IE9 & Other Browsers
    if (e.stopPropagation)
      e.stopPropagation();
    //IE8 and Lower
    else
      e.cancelBubble = true;

    addToCart(id);
  });
}

function addToCart(id){
    $.post({
      url: "../model/shop/addToCart.php",
      datatype: "json",
      data: "id=" + id,
      success: function(res) {
        if (res.status) { //the prduct isn't already in the cart
          $("#flash").attr("class", "success");
        } else {
          $("#flash").attr("class", "warning");
        }
        $("#flash").html(res.msg).show();
        // $(".fa-shopping-cart").addClass("fa-cart-arrow-down").removeClass("fa-shopping-cart");
      },
      error: function() {
        $("#flash").attr("class", "warning");
        $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
      }
    });
}
