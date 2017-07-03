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
        output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt, val) {
  evt.preventDefault();
  var val = getData(val);
  window.alert(val);
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  valA = $(this).get("a");
  window.alert(valA);
  window.alert(val);

  document.getElementById('searchResults').style.display='none';
 /* var zmwVal = getData(returned.RESULTS[index].zmw);*/
 /* window.alert(index);*/

  $.ajax({
    url: "http://api.wunderground.com/api/257fcd7045f9ce1c/geolookup/conditions" + val + ".json"
    , dataType: "json"
    , success: function (data) {
      console.log(data);
      console.log(data[jsonCity]);
      var zip = data.location.l;
      console.log(zip);
      getData(name);

    }
  });
});


// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "//api.wunderground.com/api/257fcd7045f9ce1c/geolookup/conditions"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      window.alert(data);
      var location = data.location.l;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}
