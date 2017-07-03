


// This gives us the option to search.
$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';

        // grab the latitude and the longitude.
        output += '<a href="//www.wunderground.com"' + ' onclick="getData(' + val.lat + ',' + val.lon + ')"' + ' title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup


/***********************************************************************/


// now lets stop it from showing a website
// when you click on it.

$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  index = $(this).index("a");

  // gets the latitude and longitude
  getData(index.lat, index.lon);

  // this hides the anchor tags we don't want to see.
  document.getElementById('searchResults').style.display='none';

});



function getData(lat, lon){
  $.ajax({
    url:"https://api.wunderground.com/api/09a6942510208b5c/geolookup/conditions/q/" + lat + ',' + lon + ".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      $('#currentTemp').html(Math.round(temp_f) +  " &#8457" );

      $("title").text(parsed_json.current_observation.display_location.full);
      $("#cityDisplay").text(parsed_json.current_observation.display_location.full);
      $("#summary").text(parsed_json.current_observation.weather);
      $("#add1").html(" Feels like  " + Math.round(parsed_json.current_observation.feelslike_f) + " &#8457");
      $("#add2").text("Humidity:  " + parsed_json.current_observation.relative_humidity);
      $("#add3").html("Wind from the " + parsed_json.current_observation.wind_dir + " at " + parsed_json.current_observation.wind_mph + " mph");

      $("#cover").fadeOut(250);

      console.log(parsed_json);
    }

  });

}
