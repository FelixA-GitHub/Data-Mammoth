var searchBtn = document.getElementById("searchbtn");
var searchField = document.getElementById("searchfield");
var resultsEl = document.getElementById("search-result")

//variable for API Key
var apiKey = "6a29d29b99eb578408eebe9fd0b98eb6"

var movieId = "";

// function to pull data from API
function submitPull (input) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + input + "&page=1&include_adult=false";

    fetch(url)
        .then(function (response) {
           return response.json();
        })
        .then(function (data) {
            var movies = data.results;
            console.log(movies);

            var imageLink = "https://image.tmdb.org/t/p/w154";

            resultsEl.innerHTML = "";
            searchField.value = "";

            for (var i = 0; i < 3; i++) {

                var card = document.createElement("div")
                var imageBox = document.createElement("div");
                var image = document.createElement("img");
                var cardContent = document.createElement("div");
                var cardTitle = document.createElement("span");
                var link = document.createElement("a");
                var cardReveal = document.createElement("div");
                var spanTitle = document.createElement("span");
                var spanImage = document.createElement("i");
                var spanText = document.createElement("p");

                card.setAttribute("class", "card poster-image large");
                imageBox.setAttribute("class", "card-image waves-effect waves-block waves-light");
                image.setAttribute("class", "activator");
                image.setAttribute("src", `${imageLink}${movies[i].poster_path}`);
                cardContent.setAttribute("class", "card-content");
                cardTitle.setAttribute("class", "card-title activator grey-text text-darken-4");
                link.setAttribute("href", "");
                cardReveal.setAttribute("class", "card-reveal");
                spanTitle.setAttribute("class", "card-title grey-text text-darken-4");
                spanImage.setAttribute("class", "material-icons right");

                
                card.appendChild(imageBox);
                imageBox.appendChild(image);
                card.appendChild(cardContent);
                cardContent.appendChild(cardTitle);
                // cardContent.appendChild(link);
                card.appendChild(cardReveal);
                cardReveal.appendChild(spanTitle);
                spanTitle.appendChild(spanImage)
                // cardReveal.appendChild(spanText);
                resultsEl.appendChild(card);
                
                cardTitle.textContent = movies[i].title;





                
            }
            
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