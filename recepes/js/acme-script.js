$(function() {
  $("#navList").append('<li id="home"><a href="link" title="Home page.">Home</a></li>');

  $.getJSON('js/acme.json',function(result) {
    console.log(result);
    $.each(result.navigation, function(i, nav){
      var nameItem = result.navigation[i].name;
      /*console.log(name);*/
      //converts listed items on lowercase, and creates the hyperlink
      $("#navList").append('<li id="' + nameItem.toLowerCase() + '"><a href="link" title="Go to ' + nameItem + '.">' + nameItem + '</a></li>');
    })

    //Event to clear content of products and displays the Home content
    $('#home').on("click", function( event ){
      event.preventDefault();
      $(document).attr("title", "Home | ACME");
      $('#homecontent').show();
      $('#product').css('visibility','hidden');
    })

    //Event to hide Home page and display products
    $('#navBar').on("click", ":not(:first-child) a", function( event ){
      event.preventDefault();
      var itemname = this.text;
      //All homecontend id is cleared
      $("#homecontent").hide();
      //loads content and makes it visible
      $("#product").css('visibility', 'visible');
      //Decider is the variable that stores the item number related to the on clic event
      var decider;
      if (itemname == result.navigation[0].name){
        decider = 0;
      }
      if (itemname == result.navigation[1].name){
        decider = 1;
      }
      if (itemname == result.navigation[2].name){
        decider = 2;
      }
      if (itemname == result.navigation[3].name){
        decider = 3;
      }
      var descript = result.navigation[decider].description;
      $('#deets').remove();
      $('#details').remove();
      $('#showcase > h1').remove();
      var nameItem = result.navigation[decider].name;
      $(document).attr("title", nameItem + " | ACME");
      // The append() method inserts specified content at the endo of a selected element
      $('#showcase').append('<h1>' + nameItem + '</h1>');
      $('#showcase').append('<div id="details">');
      var imagePath = result.navigation[decider].path;
      $('#details').append('<img src="' + imagePath + '" alt="' + itemname + '">');
      $('#details').append('<ul id="deets">');
      $('#deets').append('<li class="description"><strong>Description:</strong><br> ' + descript + '</li>');
      var manufact = result.navigation[decider].manufacturer;
      $('#deets').append('<li class="manufacturer"><strong>Manufacturer:</strong><br> ' + manufact + '</li>');
      var revItem = result.navigation[decider].reviews;
      $('#deets').append('<li class="reviewscore"><strong>Reviews:</strong><br> ' + revItem + '/5 Stars</li>');
      var price = result.navigation[decider].price;
      $('#deets').append('<li class="price"><strong>Price:</strong> $' + price + '</li><br>');
      $('#deets').append('</ul>');
      $('#deets').append('</div');
      //Shows the times that the code has been executed succesfully
      console.log("Success");
    })
  })
});





