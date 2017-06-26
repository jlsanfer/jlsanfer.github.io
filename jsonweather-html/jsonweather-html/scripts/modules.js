// Include modules into the html file
// Pathes may need altered depending on site structure
$(function () {
  $("#page-header").load("/jsonweather-html/jsonweather-html/modules/header.html");
  $("#page-nav").load("/jsonweather-html/jsonweather-html/modules/navigation.html");
  $("#footer-content").load("/jsonweather-html/jsonweather-html/modules/footer.html");
});
