$(function() {
  loadOrders();
});

// onload load user order
function loadOrders() {
  $.post({
    url: "../model/orders/getOrders.php",
    datatype: "json",
    data: "",
    success: function(orders) {
      if (orders.length)
        buildOrders(orders);
      else
        buildEmptyOrders();
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
    }
  });
}

// display message if order list is empty
function buildEmptyOrders() {
  $(".orderList").empty();
  $("#frame img").remove();
  $("<h2>").text("Non hai ordinato ancora niente...").appendTo(".orderList");
  $("<p>").html("Visita lo <a href=shop.php>shop</a>!").insertAfter("h2");
}

// get user active orders
function buildOrders(orders) {
  $(".orderList").empty();

  $("<h2>").text("Trascina un ordine nel cestino per annullarlo!").appendTo(".orderList");
  trash = $("<img/>", {
    src: "../img/trash.png",
    alt: "trash"
  });

  //toggle bg color of dragged order
  $("#frame img").hover(function() {
    $(".ui-draggable-dragging").toggleClass("hovering");
  });

  trash.appendTo("#frame");

  // set drag and drop for droppable
  trash.droppable({
    drop: orderDropped,
    hoverClass: 'hovered',
    accept: '.order'
  });

  orders.forEach(function(order) {
    setOrder(order);
  });
}

function setOrder(order) {
  //reversing DATETIME format from SQL to italian date format
  dateArr = order['orderDate'].substr(0, 10).split("-");
  //display only hour:min, avoiding second
  hourArr = order['orderDate'].substr(11, 17).split(":");

  order = $("<div>").addClass("order").append(
    $("<ul>").append(
      $("<li>").text("Totale ordine: " + order['total'] + "€")
    ).append(
      $("<li>").text("Consegna presso: " + order['street'] + ', ' + order['city'] + ' (' + order['prov'] + ')')
    ).append(
      $("<li>").text("Effettuato il: " + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0] + ", alle " + hourArr[0] + ":" + hourArr[1]).attr("name", order['orderDate'])
    )
  );

  // set drag and drop for draggable
  order.draggable({
    helper: 'clone',
    revert: true,
    tolerance: 'touch'
  });

  order.appendTo(".orderList");
}

// delete order when it is dropped on the trash icon
function orderDropped(event, ui) {
  $.get({
    url: "../model/orders/removeOrder.php",
    datatype: "json",
    data: "date=" + ui.draggable.find("ul li:last-child").attr("name"),
    success: function(res) {
      $("#flash").attr("class", "success");
      $("#flash").html(res).show();
      loadOrders();
    },
    error: function() {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
    }
  });
}
