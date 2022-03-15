var searchBtn = document.getElementById("searchbtn");
var searchField = document.getElementById("searchfield");
var moviePoster = document.getElementById("movieposter");
var movieTitle = document.getElementById("movietitle");
var movieDesc = document.getElementById("moviedesc");
var releaseDate = document.getElementById("releasedate");
var movieScore = document.getElementById("moviescore");

     //variable for API Key
var apiKey = "6a29d29b99eb578408eebe9fd0b98eb6"

// function to pull data from API
function submitPull (input) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + input + "&page=1&include_adult=false";

    fetch(url)
        .then(function (response) {
           return response.json();
        })
        .then(function (data) {
        var currentMovie = data.results[0];
        console.log(currentMovie);
        moviePoster.setAttribute("src", "http://image.tmdb.org/t/p/w185" + currentMovie.poster_path);
        movieTitle.textContent = currentMovie.title;
        movieDesc.textContent = currentMovie.overview;
        releaseDate.textContent = currentMovie.release_date;
        movieScore.textContent = "Average User Rating: " + currentMovie.vote_average;
        });
}

// function to handle starting a search
function submitSearchQuery (event) {
    event.preventDefault();

    var search = searchField.value.trim();

    if (search) {
        submitPull(search);
    } else {
        alert("Please enter a title.");
    }

}

// event listeners
searchBtn.addEventListener('click', submitSearchQuery);