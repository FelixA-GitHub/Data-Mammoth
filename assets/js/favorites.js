var favoritesContainer = document.getElementById("favorites-container");

var favorites = JSON.parse(localStorage.getItem("favorites"));

var favTitles = [];

for (var i = 0; i < favorites.length; i++) {
    var apiKey = '6a29d29b99eb578408eebe9fd0b98eb6';
    var url = "https://api.themoviedb.org/3/movie/" + favorites[i] + "?api_key=" + apiKey + "&language=en-US";
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        createItem(data.title);
    });
}


function createItem(title) {
    var newItem = document.createElement("li");
    newItem.setAttribute("class", "collection-item");
    console.log(title);
    newItem.textContent = title;
    favoritesContainer.appendChild(newItem);
}

