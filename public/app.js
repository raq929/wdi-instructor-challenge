var searchData;

var isFavorite = function(favoritesList, movieData) {
  return favoritesList.some(function(favorite) {
      return favorite.name === movieData.Title;
  })
}

var displaySearchResult = function displaySearchResult(movieData, basicMovieInfo) {
  var result;
  // gets favorites from server
  return jQuery.get('/favorites').done(function(data) {
    var favoritesList;
    //jQuery is not consistent, best to double-check what we're getting back from it
    if(typeof(data) !== 'object') {
      favoritesList = JSON.parse(data);
    } else {
      favoritesList = data;
    }
    // check if the movie has been favorited
    if (isFavorite(favoritesList, movieData)) {
      result = basicMovieInfo + " <a>Favorited!</a>";
    } else {
      result = basicMovieInfo + " <a>Favorite</a>";
    }
  }).fail(function() {
    //in this instance, we didn't get the favorites list, so we don't know if the movie is on it
    // so we do not allow the user to favorite
    result = basicMovieInfo;
    return false;
  }).always(function() {
    // no matter what happens, we want to display the result
    $('#result').html(result);
    $('#result').on('click', handleMovieClick)
  });
}

//this function creates an html table of all the movie data we want to display
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
  // this takes the data from the form and serializes it so that we can add it to a query
  var formQuery = $('form').serialize();
  // this adds the options that don't depend on the form
  var fullQuery = formQuery + "&plot=short&r=json"
  var searchRequest = jQuery.get("http://www.omdbapi.com/?" + fullQuery);
  var result = "";

  searchRequest.done(function(movieData) {
    // once we get the data back, we use it to create the data we want displayed
    var basicMovieInfo = movieData.Title + "  " + movieData.Year;
    // OMDb sends back a 200 even if the movie was not found, so we have to check for that result
    if(movieData.Response === "False") {
      result = "Your movie could not be found.";
    } else {
      searchData = movieData;
      displaySearchResult(movieData, basicMovieInfo);
    }
  }).fail(function(error) {
    console.log(error)
    var result = "There was an error contacting the server.";
    $('#result').html(result);
  }).always(function() {
    //If people do more than one search in a row, we want to wipe the previous results
    $('#moreInfo').html("")
  })
}

// script does not run until the document is fully loaded
$(document).ready(function(){
  $('form').on("submit", handleSearch);

  //allows favoriting of movies
  $('#result').on('click', 'a', function(e) {
    e.preventDefault()
    // takes the data from the most recent search and formats it for the server
    var favoriteData = {
      name: searchData.Title,
      oid: searchData.Title + searchData.Year
    }

    jQuery.post('/favorites', favoriteData).done(function(data){
      var newFavoritesList;
      if(JSON.parse(data)) {
        newFavoritesList = JSON.parse(data);
      } else {
        newFavoritesList = data
      }
      // if server was successfully updated, change html to reflect that
      if(isFavorite(newFavoritesList, searchData)){
        $('#result>a').html(' Favorited!')
      }
    })
  })

  //displays favorites list
  $('#favorites').on('click', function(e) {
    e.preventDefault();

    jQuery.get('/favorites').done(function(data) {
      var favoritesList;
      if(typeof(data) !== 'object') {
        favoritesList = JSON.parse(data);
      } else {
        favoritesList = data;
      }
      //goes through the favorites list and creates a string of <li>s
      var listHTML = favoritesList.reduce(function(previousValue, currentValue) {
        return previousValue + "<li>" + currentValue.name + "</li>"
      }, "");

      $("#favorites>ul").html(listHTML);
    })
  })
})
