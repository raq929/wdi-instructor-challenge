
var handleSearch = function handleSearch(event) {
  event.preventDefault();
  var formQuery = $('form').serialize()
  var fullQuery = formQuery + "&plot=short&r=json"
  var request = jQuery.get("http://www.omdbapi.com/?" + fullQuery)
  var result = ""

  request.done(function(data) {
    console.log(data);
    if(data.Response === "False") {
      result = "Your movie could not be found."
    } else {
      result = data.Title + "  " + data.Year
    }
    $('#result').html(result);
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
