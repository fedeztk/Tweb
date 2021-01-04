//login script
$(function() {

  $("#flash").hide();
  //default to login
  $("#signup").hide();

  // signup
  $("#signup input[name='password'], #signup input[name='rePassword']").keyup(verifyPwd);

  $("#signup input[name='rePassword']").blur(function() {
    if ($("#signup input[name='password']").val().length < 6) {
      $("#pwdLenCheck").html("<br>(minimo 6 caratteri)");
      $("#pwdLenCheck").css("color", "red");
      $("#pwdLenCheck").slideDown(400);
    } else {
      $("#pwdLenCheck").slideUp(400);
    }
  });

  $("#signup input[name='submit']").on("click", function(e) {
    if ($("#signup input[name='email']").val() == "" || $("#signup input[name='username']").val() == "" ||
      $("#signup input[name='password']").val() == "" || $("#signup input[name='rePassword']").val() == "") {

      $("#flash").show();
      $("#flash").text("Compila tutti i campi per completare la registrazione!");
      e.preventDefault();

    } else {
      $("#flash").hide();
    }

    $.post({
      url: "../model/user/signup.php",
      datatype: "json",
      data: "username=" + $("#signup input[name='username']").val() + "&email=" + $("#signup input[name='email']").val() + "&pwd=" + $("#signup input[type='password']").val(),
      success: function(res) {
        if (res.status) {
          location.reload();
          // $("#flash").attr("class", "success"); /FIXME
          // $("#flash").html(res.msg).show();
        } else {
          $("#flash").html(res.msg);
          $("#flash").show();
        }
      },
      error: function() {
        console.log('Errore: impossibile effettuare la richiesta per la registrazione');
      }
    });
  });

  // login
  $("#login input[name='submit']").on("click", function(e) {
    $.post({
      url: "../model/user/login.php",
      datatype: "json",
      data: "email=" + $("#login input[name='email']").val() + "&password=" + $("#login input[name='password']").val(),
      success: function(res) {
        if (res.status) {
          $(window.location).attr("href", "index.php");
        } else {
          $("#flash").html(res.msg);
          $("#flash").show();
        }
      },
      error: function(res) {
        console.log('Errore, impossibile effettuare il login:' + res.msg); //FIXME
      },
    });
  });


  // misc
  // switch between login and signup
  $(".selector a").on("click", function(e) {
    // e.preventDefault();

    // change "buttons" color
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");

    // find current active and hide corresponding div
    target = $(this).attr("href");
    $(".boxWrap > div").not(target).hide();
    $("#flash").hide();
    $(target).fadeIn(500);
  });

});


// signup
//verify passowrds correspondance
function verifyPwd() {
  if (!($("#signup input[name='password']").val() == "" && $("#signup input[name='rePassword']").val() == "")) {
    if ($("#signup input[name='password']").val() == $("#signup input[name='rePassword']").val()) {
      $("#pwdVerify").html(" &#10004;");
      $("#pwdVerify").css("color", "green");
    } else {
      $("#pwdVerify").html(" &#10008;");
      $("#pwdVerify").css("color", "red");
    }
    $("#pwdVerify").show();
  } else {
    $("#pwdVerify").hide();
  }
}

//TODO
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
