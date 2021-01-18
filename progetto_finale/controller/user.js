//login/signup script
$(function() {
  //default to login
  $("#signup").hide();


  // signup

  // verify correspondance of the passwords
  $("#signup input[name='password'], #signup input[name='rePassword']").keyup(verifyPwd);

  // check if password has at least 6 characters
  $("#signup input[name='password']").keyup(verifyLength);

  // submit registration request
  $("#signup input[name='submit']").on("click", function(e) {
    e.preventDefault();

    if ($("#signup input[name='email']").val() == "" || $("#signup input[name='username']").val() == "" ||
      $("#signup input[name='password']").val() == "" || $("#signup input[name='rePassword']").val() == "") {
      $("#flash").attr("class", "warning");
      $("#flash").text("Compila tutti i campi per completare la registrazione!").show();

    } else if (!verifyPwd()) {
      $("#flash").attr("class", "warning");
      $("#flash").text("Le password non corrispondono!").show();

    } else if (!verifyLength()) {
      $("#flash").attr("class", "warning");
      $("#flash").text("La password deve contenere almeno 6 caratteri").show();

    } else {
      $("#flash").hide();
      $.post({
        url: "../model/user/signup.php",
        datatype: "json",
        data: "username=" + $("#signup input[name='username']").val() + "&email=" + $("#signup input[name='email']").val() + "&pwd=" + $("#signup input[type='password']").val(),
        success: function(res) {
          if (res.status) {
            $(window.location).attr("href", "user.php");
          } else {
            $("#flash").addClass("warning");
            $("#flash").html(res.msg).show();
          }
        },
        error: function() {
          console.log('Errore: impossibile effettuare la richiesta per la registrazione');
        }
      });
    }
  });


  // login

  $("#login input[name='submit']").on("click", function(e) {
    e.preventDefault();
    $.post({
      url: "../model/user/login.php",
      datatype: "json",
      data: "email=" + $("#login input[name='email']").val() + "&password=" + $("#login input[name='password']").val(),
      success: function(res) {
        if (res.status) {
          $(window.location).attr("href", "index.php");
        } else {
          $("#flash").addClass("warning");
          $("#flash").text(res.msg).show();
        }
      },
      error: function() {
        console.log("Impossibile effettuare la richiesta di login");
      },
    });
  });

  // switch between login and signup
  $(".selector a").on("click", function() {
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

//verify passwords correspondance
function verifyPwd() {
  // if at least one of them contains text
  if (!($("#signup input[name='password']").val() == "" && $("#signup input[name='rePassword']").val() == "")) {
    // if the fields are the same
    if ($("#signup input[name='password']").val() == $("#signup input[name='rePassword']").val()) {
      $("#pwdVerify").html(" &#10004;");
      $("#pwdVerify").css("color", "green");
      return true;
    } else {
      $("#pwdVerify").html(" &#10008;");
      $("#pwdVerify").css("color", "red");
    }
    $("#pwdVerify").show();
  } else {
    $("#pwdVerify").hide();
  }
  return false;
}

function verifyLength() {
  if ($("#signup input[name='password']").val().length < 6) {
    $("#pwdLenCheck").html("<br>(minimo 6 caratteri)");
    $("#pwdLenCheck").css("color", "red");
    $("#pwdLenCheck").slideDown(400);
    return false;
  } else {
    $("#pwdLenCheck").slideUp(400);
    return true;
  }
}
