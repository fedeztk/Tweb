// about js, on click opens typed email in user's email service
$(function() {
    $('input[type="submit"]').on("click", function(e) {
        e.preventDefault();
        window.location = "mailto:testmail@test.com?subject="+$("input[type='text']").val()+"?body="+$("textarea").val();
    });
});
