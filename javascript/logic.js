$(document).ready(function() {
  //Global Variables
  var tvShows = [
    "Game of Thrones",
    "The Simpsons",
    "Archer",
    "The Office",
    "Parks and Rec",
    "Sons of Anarchy",
    "Ozark",
    "How I Met Your Mother",
    "It's Always Sunny In Philadelphia",
    "That 70's Show",
    "Futurama"
  ];
  console.log(tvShows);
  //function to create initial buttons on the page.
  function createButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons").empty();

    // Looping through the array of TV Shows
    for (var i = 0; i < tvShows.length; i++) {
      //jquery to dynamically create buttons
      var btns = $("<button>");
      // Adding a class
      btns.addClass("tvShow");
      btns.addClass("btn btn-primary");
      // Adding a data-attribute with a value of the movie at index i
      btns.attr("data-name", tvShows[i]);
      // Providing the button's text with a value of the movie at index i
      btns.text(tvShows[i]);
      // Adding the button to the HTML
      $("#buttons").append(btns);
    }
  }

  $("#searchButton").on("click", function() {
    event.preventDefault();
    var searchTerm = $("#gifSearch")
      .val()
      .trim();

    console.log(searchTerm);
    tvShows.push(searchTerm);
    createButtons();
  });

  createButtons();

  console.log(tvShows.length);

  //document on click - wrap in function and put call inside
  $(document).on("click", ".tvShow", function() {
    // $(".tvShow").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var selectedShow = $(this).attr("data-name");
    //Sets up the query parameters with search, selected show variable, api key, and rating
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      selectedShow +
      "&api_key=b0Hj2QodkVFSAjC1QJwi0ca0y8WyND9K&limit=10&rating=pg";

    //Ajax Call

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);
        console.log(response);
        $("#gifs").empty();
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var tvGif = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var tvGif = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          tvGif.attr("class", "gifs");
          tvGif.attr("src", results[i].images.fixed_height_still.url);
          tvGif.attr("data-still", results[i].images.fixed_height_still.url);
          tvGif.attr("data-animate", results[i].images.fixed_height.url);
          // tvGif.attr("data-state", "still");

          // Appending the paragraph and image tag to the tv gif  div
          $("#gifs").append(p);
          $("#gifs").append(tvGif);

          // Prepending the tv gif div to the HTML page in the "#gifs" div
          $("#gifs").append(tvGif);
        }
      });
    $(document).on("click", ".gifs", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
});
