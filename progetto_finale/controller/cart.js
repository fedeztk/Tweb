$(function() {
  loadCart();
});

function loadCart() {
  $.post({
    url: "../model/cart/getCart.php",
    datatype: "json",
    data: "",
    success: function(res) {
      if (res.products.length) //if there is at least one item in the cart
        buildCart(res);
      else
        buildEmptyCart();
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}

// display message if cart is empty
function buildEmptyCart() {
  $(".cartList").remove();
  //change top bar cart icon
  $(".fa-cart-arrow-down").addClass("fa-shopping-cart").removeClass("fa-cart-arrow-down");
  $("<div>").addClass("cartList").append(
    $("<h2>").text("Non c'è ancora niente qui...")
  ).append(
    $("<p>").html("Visita lo <a href=shop.php>shop</a>!")
  ).insertAfter("hr");
}

// get user items currently in cart
function buildCart(res) {
  $(".cartList").remove();

  var cartList = $("<div>").addClass("cartList");

  res.products.forEach(function(product) {
    buildProduct(product, cartList);
  });

  // append cart resume + purchase button
  cartList.append(
    $("<div>").addClass("checkout").append(
      $("<p>").html("Il totale è: <span id=total>" + res.total + "</span> €")
    ).append(
      $("<button>", {
        type: "button",
        name: "confirm",
        text: "Procedi al pagamento",
      })
    )).insertAfter("hr");

  cartList.find("button[name='confirm']").on("click", function() {
    $(window.location).attr("href", "purchase.php");
  });
}

// build of each product div
function buildProduct(product, cartList) {
  var quantity = $("<span>", {
    type: "text",
    name: "currentQuantity",
    text: product["quantity"],
  });
  currentProduct = $("<div>").addClass("product").append(
    $("<button>", {
      type: "button",
      name: "remove",
      html: "&#x2715",
    })
  ).append(
    $("<img/>", {
      src: "../img/artwork/" + product["id"] + ".jpg",
      alt: product["name"],
    })
  ).append(
    $("<span>", {
      text: product["name"],
    }).addClass("title")
  ).append(
    $("<div>").addClass("quantity").append(
      $("<button>", {
        type: "button",
        name: "minus",
        text: "-",
      })
    ).append(
      quantity
    ).append(
      $("<button>", {
        type: "button",
        name: "plus",
        text: "+",
      })
    )
  ).append(
    $("<div>").text(product["price"] + "€").addClass("productTotal")
  );
  currentProduct.appendTo(cartList);

  // sets on click property for "+", "-" and "X"
  currentProduct.find("button[name='plus']").on("click", function() {
    increaseProduct(product["id"], quantity);
  });
  currentProduct.find("button[name='minus']").on("click", function() {
    decreaseProduct(product["id"], quantity);
  });
  currentProduct.find("button[name='remove']").on("click", function() {
    removeProduct(product["id"]);
  });
}

// increase amount of choosen item in the cart
function increaseProduct(id, quantity) {
  $.get({
    url: "../model/cart/updateQuantity.php",
    datatype: "json",
    data: "id=" + id + "&op=" + 1,
    success: function(res) {
      $("#flash").attr("class", "success");
      $("#flash").html(res.msg).show();
      $("#total").text(res.total);
      quantity.text(parseInt(quantity.text()) + 1);
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}

// decrease amount of choosen item in the cart
function decreaseProduct(id, quantity) {
  $.get({
    url: "../model/cart/updateQuantity.php",
    datatype: "json",
    data: "id=" + id + "&op=" + 0,
    success: function(res) {
      $("#flash").attr("class", "success");
      $("#flash").html(res.msg).show();
      $("#total").text(res.total);
      quantity.text(parseInt(quantity.text()) - 1);
      current = parseInt(quantity.text());
      if (current == 0)
        removeProduct(id);
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}

// remove choosen item from cart
function removeProduct(id) {
  $.get({
    url: "../model/cart/removeProduct.php",
    datatype: "json",
    data: "id=" + id,
    success: function(res) {
      $("#flash").attr("class", "success");
      $("#flash").html(res).show();
      loadCart();
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}
