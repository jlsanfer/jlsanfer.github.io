// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        // Call the getData function, send the lat and long
        getData(lat, long);
      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long) {
    $.ajax({
      url: "https://api.wunderground.com/api/257fcd7045f9ce1c/geolookup/conditions/q/" + lat + "," + long + ".json",
      dataType: "jsonp",
      success: function (parsed_json) {
        //var location = parsed_json['location']['city'];
        var location = parsed_json['current_observation']['display_location']['full'];
        $('#cityDisplay').html(location);

        var temp_f = parsed_json['current_observation']['temp_f'];
        $('#currentTemp').html(Math.round(temp_f) + " &#8457");

        var summaryText = parsed_json['current_observation']['weather'];
        $('#summary').html(summaryText);

        var speed = parsed_json['current_observation']['wind_mph'];
        $('#add1').html("Wind: " + speed + " MPH");

        var humidity = parsed_json['current_observation']['relative_humidity'];
        $('#add2').html("Humidity: " + humidity);

        /*$('#current-image').html('<img src="' + data.current_observation.icon_url + '" alt="Current Condition Image">');*/


        $("#cover").fadeOut(250);

        console.log(parsed_json);
      }
    });
  }

  // A function for changing a string to TitleCase
  function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});
