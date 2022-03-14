var url = "https://api.themoviedb.org/3/movie/550/images?api_key=6a29d29b99eb578408eebe9fd0b98eb6&language=en-US"; //enter a valid url 
var apiKey = "6a29d29b99eb578408eebe9fd0b98eb6"

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });