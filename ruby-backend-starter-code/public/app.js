var searchData;
var favoritesList = []

var isFavorite = function isFavorite(movie) {
  return favoritesList.some(function(favorite) {
    console.log(favorite.Title)
    return favorite.Title === movie.Title &&
      favorite.Year === movie.Year
  })
}

var handleMovieClick = function handleMovieClick(event) {
  event.preventDefault()
  table = "<table>" +
      "<tr>" +
      "<td>Rating</td>" +
      "<td>" + searchData.Rated + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Runtime</td>" +
      "<td>" + searchData.Runtime + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Director</td>" +
      "<td>" + searchData.Director + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Plot Summary</td>" +
      "<td>" + searchData.Plot + "</td>" +
      "</tr>" +
      "</table>"
    $('#moreInfo').html(table);
}

var handleSearch = function handleSearch(event) {
  event.preventDefault();
  var formQuery = $('form').serialize()
  var fullQuery = formQuery + "&plot=short&r=json"
  var request = jQuery.get("http://www.omdbapi.com/?" + fullQuery)
  var result = ""

  request.done(function(movieData) {
    if(movieData.Response === "False") {
      result = "Your movie could not be found."
    } else {
      searchData = movieData
      if (isFavorite(movieData)) {
        result = movieData.Title + "  " + movieData.Year + " <a>UnFavorite</a>"
      } else {
        result = movieData.Title + "  " + movieData.Year + " <a>Favorite</a>"
      }
    }
    $('#result').html(result);
    $('#result').on('click', handleMovieClick)
  }).fail(function(error) {
    console.log(error)
    result = "There was an error contacting the server."
    $('#result').html(result);
  });
}

// script does not run until the document is fully loaded
$(document).ready(function(){
  console.log('ready')
  $('form').on("submit", handleSearch);
})
