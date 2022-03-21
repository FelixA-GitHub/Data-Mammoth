document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

var movieRating = document.getElementById("movie-rating");
var searchBtn = document.getElementById("search-btn");
var searchField = document.getElementById("search-field");
var modal0Content = document.getElementById("modal0content");
var modal0Title = document.getElementById("modal0title");
var modal0Text = document.getElementById("modal0text");
var modal1Content = document.getElementById("modal1content");
var modal1Title = document.getElementById("modal1title");
var modal1Text = document.getElementById("modal1text");
var modal2Content = document.getElementById("modal2content");
var modal2Title = document.getElementById("modal2title");
var modal2Text = document.getElementById("modal2text");

// variable for movie trailer
var movieTrailer = document.getElementById("movie-trailer");

//variable for API Keys
var apiKey1 = "6a29d29b99eb578408eebe9fd0b98eb6";
var apiKey2 = "k_b81pzrt6";

var resultsEl = document.getElementById("search-result")

//variables for saving search items
var displayMovie;
var searchTerms = [];
var searchHistory = [];

var movieId = "";

// function to pull data from API
function submitPull (input) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey1 + "&language=en-US&query=" + input + "&page=1&include_adult=false";
    // var url2 = "https://imdb-api.com/API/AdvancedSearch/" + apiKey2 + "?title=" + input + "&title_type=feature&certificates=?";

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var movies = data.results;

            var imageLink = "https://image.tmdb.org/t/p/w154";

            resultsEl.innerHTML = "";
            searchField.value = "";

            modal0Title.textContent = movies[0].title;
            modal0Text.textContent = movies[0].overview;

            modal1Title.textContent = movies[1].title;
            modal1Text.textContent = movies[1].overview;

            modal2Title.textContent = movies[2].title;
            modal2Text.textContent = movies[2].overview;

            for (var i = 0; i < 3; i++) {

                //create and populate cards with movie poster and title
                var card = document.createElement("div")
                var imageBox = document.createElement("div");
                var image = document.createElement("img");
                var cardContent = document.createElement("div");
                var cardAction = document.createElement("div");
                var cardText = document.createElement("p");
                var cardTitle = document.createElement("span");
                var infoButton = document.createElement("a");
                var favButton = document.createElement("button");

                card.setAttribute("class", "card poster-image large");
                imageBox.setAttribute("class", "card-image waves-effect waves-block waves-light");
                image.setAttribute("src", `${imageLink}${movies[i].poster_path}`);
                cardContent.setAttribute("class", "card-content");
                cardAction.setAttribute("class", "card-action");
                cardTitle.setAttribute("class", "card-title grey-text text-darken-4");
                cardText.setAttribute("class", "movie-desc");
                infoButton.setAttribute("class", "btn blue modal-trigger modal-btn")
                infoButton.setAttribute("href", `#modal${i}`);
                favButton.setAttribute("class", "btn waves-effect waves-green btn-flat");
                //set ID of button to the movie ID
                favButton.setAttribute("id", `${movies[i].id}`);
                //on click, get the ID of the button clicked and pass it to the add to favorites function
                favButton.onclick = function() {
                    var id = getId(this);
                    addToFavorites(id);
                }

                
                card.appendChild(imageBox);
                imageBox.appendChild(image);
                card.appendChild(cardContent);
                card.appendChild(cardAction);
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardText);
                cardAction.appendChild(infoButton);
                cardAction.appendChild(favButton);
                resultsEl.appendChild(card);
                
                infoButton.textContent = "More"
                favButton.textContent = "Favorite"
                cardTitle.textContent = movies[i].title;




            }
        });
        
    // fetch(url2)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         var mpaaRating = data.results[0];
    //         console.log(mpaaRating);

    //         movieRating.textContent = "Rated " + mpaaRating.contentRating;
    //     });
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
    } else {
        alert("Please enter a title.");
    }
}

function addToFavorites (id) {
    var favsArray = [];
    favsArray = JSON.parse(localStorage.getItem("favorites"));
    if (favsArray == null) {
        favsArray = [id];
        localStorage.setItem("favorites", JSON.stringify(favsArray));
    } else {
        if (favsArray.includes(id)) {
            M.toast({html: 'This movie is already in your favorites.'})
        } else {
            favsArray.push(id);
            localStorage.setItem("favorites", JSON.stringify(favsArray));
            M.toast({html: 'Added to favorites!'})
        } 
    }
}

// function to return ID of button clicked
function getId(btn) {
    return btn.id;
}

// event listeners
searchBtn.addEventListener('click', submitSearchQuery);

