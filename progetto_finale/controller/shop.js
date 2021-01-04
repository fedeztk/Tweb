$(function(){
  $.get({
    url: "../model/getArtworks.php",
    datatype: "json",
    data: "",
    success: function(res) {
    },
    error: function(res) {
      $("#flash").attr("class", "warning");
      $("#flash").html("Ci scusiamo per l'incoveniente, riprovare più tardi").show();
    }
  });
});
