$(function() {

    $("input[name='expire']").mask("00 / 00");
    $("input[name='cardNum']").mask("0000 0000 0000 0000");
    $.post({
        url: "../model/purchase/getResume.php",
        datatype: "json",
        data: "",
        success: function(res) {
            if (res.total) { //if there is at least one item in the cart
                $("h1").text("Ciao " + res.user + ", il totale è: " + res.total + "€");
            } else {
                $(window.location).attr("href", "cart.php");
            }
        },
        error: function() {
            $("#flash").attr("class", "warning");
            $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
        }
    });
    $("input[name='submit']").on("click", function() {
        $.post({
            url: "../model/purchase/confirmPurchase.php",
            datatype: "json",
            data: "street=" + $("input[name='street']").val() + "&prov=" + $("input[name='prov']").val() + "&city=" + $("input[name='city']").val(),
            success: function(msg) {
                $("#flash").attr("class", "success");
                $("#flash").html(msg).show();
            },
            error: function() {
                $("#flash").attr("class", "warning");
                $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi...").show();
            }
        });
    });
});
