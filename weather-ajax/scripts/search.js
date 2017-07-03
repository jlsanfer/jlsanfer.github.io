
$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        console.log('>>>>> '+val);
        output += '<li>';
        output += '<a href="#" onclick="getData(\''+val.l+'\');">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup

function getData(input) {
  event.preventDefault();
  $("#searchResults").html('');
  // Get the data from the wunderground API
  $.ajax({
    url: "//api.wunderground.com/api/257fcd7045f9ce1c/geolookup/conditions"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#currentTemps").html(data.current_observation.temperature_string);
      $("#summary").text(data.current_observation.weather);
      $("#humidity").html(data.current_observation.relative_humidity);

      $("#cover").fadeOut(250);
    }
  });
}

