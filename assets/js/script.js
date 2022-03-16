var searchBtn = document.getElementById("searchbtn");
var searchField = document.getElementById("searchfield");
var moviePoster = document.getElementById("movieposter");
var movieTitle = document.getElementById("movietitle");
var movieDesc = document.getElementById("moviedesc");
var releaseDate = document.getElementById("releasedate");
var movieScore = document.getElementById("moviescore");
var movieRating = document.getElementById("movierating");

//variable for API Keys
var apiKey1 = "6a29d29b99eb578408eebe9fd0b98eb6";
var apiKey2 = "k_b81pzrt6";


var movieId = "";

// function to pull data from API
function submitPull (input) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey1 + "&language=en-US&query=" + input + "&page=1&include_adult=false";

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
        movieId = currentMovie.id;

        console.log(movieId);
        });
}

// function to pull movie rating from API
function ratingPull (input) {
    var url2 = "https://imdb-api.com/API/AdvancedSearch/" + apiKey2 + "?title=" + input + "&title_type=feature&certificates=?";

    fetch(url2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    var currentRating = data.results[0];
    console.log(currentRating);
    movieRating.textContent = currentRating.contentRating;
    });
}

// function to handle starting a search
function submitSearchQuery (event) {
    event.preventDefault();

    var search = searchField.value.trim();

    if (search) {
        ratingPull(search);
    } else {
        alert("Please enter a title.");
    }

}

// event listeners
searchBtn.addEventListener('click', submitSearchQuery);