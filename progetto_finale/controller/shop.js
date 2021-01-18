// script for shop page
// lazy load info of products, only when requested by the user's click
$(function() {
  $.get({
    url: "../model/shop/getArtworks.php",
    datatype: "json",
    data: "",
    success: function(products) {
      //build of filter menu
      buildFilter(products.colors, products.categories);
      //build of products grid
      buildProduct(products.imgs);
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
    }
  });
});

// function that dinamically build the filter of the shop grid
function buildFilter(colors, categories) {
  // build the option list based on the current colors avaiable
  colors.forEach(function(color) {
    $("select[name='color']").append(
      $("<option>", {
        value: color
      }).text(color));
  });

  // build the option list based on the current categories avaiable
  categories.forEach(function(category) {
    $("select[name='category']").append(
      $("<option>", {
        value: category
      }).text(category));
  });

  // filter the grid based on selected option
  $('form').on('submit', function(e) {
    e.preventDefault();
    $("#flash").hide();
    $.get({
      cache: false,
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: buildProduct,
      error: function() {
        $("#flash").attr("class", "warning");
        $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
      }
    });
  });
}

// build of products grid
function buildProduct(products) {
  $(".grid").empty();
  if (products.length) { //if the query satisfies at least one product

    //build of product card
    products.forEach(function(product) {
      var newImgDiv = $("<div>").addClass("card");
      var newImgContent = $("<div>").addClass("content");
      var newImg = $("<img/>", {
        src: "../img/artwork/" + product["id"] + ".jpg",
        alt: product["name"],
      });
      var newImgInfo = $("<div>").addClass("back");

      newImgContent.append(newImg).append(newImgInfo); //append front and back of the card content

      newImgDiv.append(newImgContent).appendTo('.grid'); //append each card to the grid

      // flip the card and get the info on click
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
      }); // end of images onclick
    }); // end of product setup
  } else {
    $("#flash").attr("class", "warning");
    $("#flash").html("Ci scusiamo per l'incoveniente, il prodotto che stai cercando sembra non esistere!").show();
  }
}

// set the infos on the back of the card
function setCard(info, id, newImgInfo, newImgDiv) {
  // check if product should contains food and if it has depth field
  if (info["isEdible"] == true)
    isEdible = '<i class="fa fa-check" aria-hidden="true"></i>';
  else
    isEdible = '<i class="fa fa-times" aria-hidden="true"></i>';

  //add depth info only in it is set on the DB
  if (info['depth'] === null)
    hasDepth = "";
  else
    hasDepth = "x" + info['depth'];

  newImgInfo.append(
    $("<h2>").text(info['name'])
  ).append(
    $("<ul>").append(
      $("<li>").text("Materiale: " + info["material"])
    ).append(
      $("<li>").text("Dimensioni: " + info["height"] + "x" + info['width'] + hasDepth + " cm")
    ).append(
      $("<li>").html("Uso alimentare? " + isEdible)
    ).append(
      $("<li>").text("Prezzo: " + info["price"] + "€")
    )
  ).append(
    $("<p>").html('Clicca l\'icona per aggiungere l\'oggetto al carrello! <br/>  <i class="fa fa-cart-plus"></i>')
  )

  // add product to cart when cart icon on the back of the card is clicked
  newImgDiv.find("i.fa-cart-plus").on("click", function(e) {
    //prevent ancestor div from receiving the click and flip the card
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

//add product to user cart
function addToCart(id) {
  $.post({
    url: "../model/shop/addToCart.php",
    datatype: "json",
    data: "id=" + id,
    success: function(res) {
      if (res.status) { //the product isn't already in the cart
        $("#flash").attr("class", "success");
        //change top bar cart icon
        $(".fa-shopping-cart").addClass("fa-cart-arrow-down").removeClass("fa-shopping-cart");
      } else {
        $("#flash").attr("class", "warning");
      }
      $("#flash").html(res.msg).show();
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}
