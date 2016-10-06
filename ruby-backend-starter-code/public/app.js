var searchData;

var isFavorite = function(favoritesList, movieData) {
  return favoritesList.some(function(favorite) {
      return favorite.name === movieData.Title
  })
}

var displaySearchResult = function displaySearchResult(movieData, basicMovieInfo) {
  return jQuery.get('/favorites').done(function(data) {
    var favoritesList;
    if(typeof(data) !== 'object') {
      favoritesList = JSON.parse(data)
    } else {
      favoritesList = data
    }
    console.log(favoritesList);
    if (isFavorite(favoritesList, movieData)) {
      result = basicMovieInfo + " <a>Favorited!</a>";
    } else {
      result = basicMovieInfo + " <a>Favorite</a>";
    }
  }).fail(function() {
    console.log('fail')
    result = basicMovieInfo
    return false;
  }).always(function() {
    $('#result').html(result);
    $('#result').on('click', handleMovieClick)
  });
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
  var searchRequest = jQuery.get("http://www.omdbapi.com/?" + fullQuery)
  var result = ""

  searchRequest.done(function(movieData) {
    var basicMovieInfo = movieData.Title + "  " + movieData.Year;
    if(movieData.Response === "False") {
      result = "Your movie could not be found.";
    } else {
      searchData = movieData;
      displaySearchResult(movieData, basicMovieInfo)
    }
  }).fail(function(error) {
    console.log(error)
    result = "There was an error contacting the server."
    $('#result').html(result);
  });
}

// script does not run until the document is fully loaded
$(document).ready(function(){
  $('form').on("submit", handleSearch);
  $('#result').on('click', 'a', function(e) {
    e.preventDefault()
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
      console.log('new favorites list', newFavoritesList)
      if(isFavorite(newFavoritesList, searchData)){
        $('#result>a').html(' Favorited!')
      }
    })
  })
  $('#favorites').on('click', function(e) {
    e.preventDefault();
    
  })
})
