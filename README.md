![GA Logo](https://raw.github.com/generalassembly/ga-ruby-on-rails-for-devs/master/images/ga.png)

## WDI Instructor Code Challenge

### Application

This is a basic application that allows a user to search for movies in using the OMDb database, and to favorite those movies.

###Deployed Site

The site is deployed at https://ga-coding-challenge.herokuapp.com/

### Technologies

This uses a Ruby/Sinatra backend that serves json to the front end. There is no real database, instead, the server writes to a .json file. The front end uses JavaScript and jQuery.

### Challenges

I have never used Sinatra before, and haven't used Ruby much in the past year, so getting up to speed on those was one of my challenges here.
JavaScript-wise, I've been knee-deep in React/Redux, and using ES2016, so going back to vanilla JS was... interesting. I'd like to figure out how to program this more functionally and with greater separation of concerns.
OMDb only seemed to give me one result at a time, so I did not have to deal with a list of results as I expected.

### Things to work on

This app is by no means a finished product. It lacks some important usuability features such as the ability to un-favorite, hide the favorites, etc.

Also, the css clearly needs some work to make this look polished.

I'd like to see OMDb give a list of results and have the ability to favorite a movie from that list. That would be possible here with some relatively minor modifications.
