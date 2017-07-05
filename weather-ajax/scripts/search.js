
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

function twoDigits(number){
  return (number < 10 ? '0' : '') + number
}

function getData(input) {
  event.preventDefault();
  $("#searchResults").html('');
  // Get the data from the wunderground API
  var todayDate = new Date();
  var YYYYDDMM = todayDate.getUTCFullYear() + "" + twoDigits(todayDate.getUTCMonth()) + "" + twoDigits(todayDate.getUTCDate());
  window.alert(YYYYDDMM);
  $.ajax({
    url: "//api.wunderground.com/api/257fcd7045f9ce1c/almanac/history_" + YYYYDDMM + "geolookup/conditions/q/location/" + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.current_observation.display_location.full;
      var temp_f = data.current_observation.temp_f;
      console.log('Location ' + location);
      console.log('Current Temp ' + temp_f);
      $("title").html(location + " | Weather Center");
      $("#cityDisplay").text(location);
      $("#currentTemp").html(Math.round(temp_f) + ' °F');
      $("#summary").text(data.current_observation.weather);
      $("#humidity").html('Humidity: ' + data.current_observation.relative_humidity);
      $("#minTemp").html('Min Temp: ' + data.almanac.temp_low.normal.F + ' °F');
      $("#maxTemp").html('Max Temp: ' + data.almanac.temp_high.normal.F + ' °F');

      $("#cover").fadeOut(250);
    }
  });
}

