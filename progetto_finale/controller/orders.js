$(function() {
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
});

function buildOrders(orders) {
  orders.forEach(function(order) {

    //reversing DATETIME format from SQL to italian date format
    dateArr=order['orderDate'].substr(0,10).split("-");
    //display only hour:min, avoiding second
    hourArr=order['orderDate'].substr(11,17).split(":");

    $("<div>").addClass("order").append(
      $("<ul>").append(
        $("<li>").text("Totale ordine: " + order['total'] + "€")
      ).append(
        $("<li>").text("Spedito in: " + order['street'] + ', ' + order['city'] + ' (' + order['prov'] + ')')
      ).append(
        $("<li>").text("Il giorno: " + dateArr[2]+"/"+dateArr[1]+"/"+dateArr[0]+", alle "+ hourArr[0]+":"+hourArr[1])
      )).appendTo(".orderList");
  });
}

function buildEmptyOrders() {
  $("<h2>").text("Non hai ordinato ancora niente...").appendTo(".orderList");
  $("<p>").html("Visita lo <a href=shop.php>shop</a>!").insertAfter("h2");
}
