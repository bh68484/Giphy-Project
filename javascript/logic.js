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
    "Broad City",
    "The Wire",
    "It's Always Sunny In Philadelphia"
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
  createButtons();

  console.log(tvShows.length);

  $("button").on("click", function() {
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
      });
  });
});
