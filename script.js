var apiKey = "&appid=efde57d5c2503a94e108601163cabffd"

var api = "http://api.openweathermap.org/geo/1.0/direct?q="

var searchInput = document.getElementById(citySearch);

apiUrl = api + searchInput + apiKey

function getApi() {
    
    console.log(searchInput.nodeValue);

    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        console.log(data);

      
    })
}

var searchButton = document.getElementById("button");

searchButton.addEventListener("click", getApi);