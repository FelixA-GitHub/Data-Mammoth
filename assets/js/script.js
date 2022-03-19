document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

var searchBtn = document.getElementById("searchbtn");
var searchField = document.getElementById("searchfield");

// variable for movie trailer
var movieTrailer = document.getElementById("movietrailer");
var movieRating = document.getElementById("movierating");

//variable for API Keys
var apiKey1 = "6a29d29b99eb578408eebe9fd0b98eb6";
var apiKey2 = "k_b81pzrt6";

var resultsEl = document.getElementById("search-result")

//variables for saving search items
var displayMovie;
var searchTerms = [];
var searchHistory = [];
var currentMovies = [];

var movieId = "";

// function to pull data from API
function submitPull (input) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey1 + "&language=en-US&query=" + input + "&page=1&include_adult=false";
    var url2 = "https://imdb-api.com/API/AdvancedSearch/" + apiKey2 + "?title=" + input + "&title_type=feature&certificates=?";

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var movies = data.results;

            var imageLink = "https://image.tmdb.org/t/p/w154";

            resultsEl.innerHTML = "";
            searchField.value = "";

            for (var i = 0; i < 3; i++) {

                
                var card = document.createElement("div")
                var imageBox = document.createElement("div");
                var image = document.createElement("img");
                var cardContent = document.createElement("div");
                var cardText = document.createElement("p");
                var cardTitle = document.createElement("span");
                var infoButton = document.createElement("a");

                card.setAttribute("class", "card poster-image large");
                imageBox.setAttribute("class", "card-image waves-effect waves-block waves-light");
                image.setAttribute("src", `${imageLink}${movies[i].poster_path}`);
                cardContent.setAttribute("class", "card-content");
                cardTitle.setAttribute("class", "card-title grey-text text-darken-4");
                cardText.setAttribute("class", "movie-desc");
                infoButton.setAttribute("class", "btn blue modal-trigger modal-btn")
                infoButton.setAttribute("href", `#modal${i}`);

                
                card.appendChild(imageBox);
                imageBox.appendChild(image);
                card.appendChild(cardContent);
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardText);
                cardContent.appendChild(infoButton);
                resultsEl.appendChild(card);
                
                infoButton.textContent = "More Info"
                cardTitle.textContent = movies[i].title;
                currentMovies.push(movies[i]);

                infoButton.setAttribute("id", `${movies[i].id}`);


            }
        });
        
    fetch(url2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mpaaRating = data.results[0];
            console.log(mpaaRating);

            movieRating.textContent = "Rated " + mpaaRating.contentRating;
        });
}

// function to pull movie trailer from API (not quite right. needs to use 
// movie id from input in order to pull trailer)

// function trailerPull (input) {
//     var url3 = "https://imdb-api.com/en/API/Trailer/" + apiKey2 + "/" + input;

//     fetch(url3)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//     var trailer = data.results[0];
//     console.log(trailer);
//     movieTrailer.setAttribute("src", trailer.linkEmbed);
//     });
// }

// function to handle starting a search
function submitSearchQuery (event) {
    event.preventDefault();
    
    var search = JSON.stringify(searchField.value.trim());

    if (search) {
        submitPull(search);
        localStorage.setItem('search', search);
    } else {
        alert("Please enter a title.");
    }


    var retrieveMovie = JSON.parse(localStorage.getItem('search'));
    console.log(retrieveMovie);
}
// event listeners
searchBtn.addEventListener('click', submitSearchQuery);

