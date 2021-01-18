$(function() {
    // mask input using jquery mask plugin
    $("input[name='expire']").mask("00 / 00");
    $("input[name='cardNum']").mask("0000 0000 0000 0000");

    // get total value of current order, redirect to cart if 0
    $.post({
        url: "../model/purchase/getResume.php",
        datatype: "json",
        data: "",
        success: function(res) {
            if (res.total) { //if there is at least one item in the cart
                $("h2").text("Ciao " + res.user + ", il totale è: " + res.total + "€");
            } else {
                $(window.location).attr("href", "cart.php");
            }
        },
        error: function() {
            $("#flash").attr("class", "warning");
            $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
        }
    });

    // confirm user purchase on click
    $("input[name='submit']").on("click", function(e) {
        e.preventDefault();
        $.post({
            url: "../model/purchase/confirmPurchase.php",
            datatype: "json",
            data: "street=" + $("input[name='street']").val() + "&prov=" + $("input[name='prov']").val() + "&city=" + $("input[name='city']").val(),
            success: function(res) {
                if (res.status) {
                    $(window.location).attr("href", "orders.php");
                } else {
                    $("#flash").attr("class", "warning");
                    $("#flash").text("Compila tutti i campi").show();
                }
            },
            error: function() {
                $("#flash").attr("class", "warning");
                $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
            }
        });
    });
});
