
const apiKey = "efde57d5c2503a94e108601163cabffd";

const citySearch = document.getElementById("citySearch");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");

const searchHistory = document.getElementById("searchHistory");
var forecastTitle = document.getElementById("forecastTitle");
var currentWeather = document.getElementById("currentWeather");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const uvIndex = document.getElementById("uvIndex");

var cityArray = [];

var inputScrub = function(event) {
  
  var selectedCity = citySearch
      .value
      .trim()
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

  if (selectedCity) {
      getCoords(selectedCity);
      citySearch.value = '';
  } else {
      alert("Valid city must be entered");
  };
};

var coordsConvert = function(city) {

  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


  fetch(apiURL).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        var longitude = data.coord["lon"];
        var latitude = data.coord["lat"];
        cityForecast(city, longitude, latitude);

        if (document.querySelector(".cityHistory")) {
          document.querySelector(".cityHistory").remove();
        }

        saveSearch(city);
        pullSearch();

      });
      } else {
        alert("Error")
      }
  })
  .catch(function(error) {
    alert("Could not load");
  })
}




var cityForecast = function(city, longitude, latitude) {

}

var saveSearch = function(city) {
  cityArray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArray));
}

var pullSearch = function() {
  cityArray = JSON.parse(localStorage.getItem("cities"));

  var searchedList = document.createElement('ul');
  searchedList.className = "list-group cityHistory";
  searchHistory.appendChild(searchedList);

  for (var i = 0; i < cityArray.length; i++) {
    var searchedCitiesButton = document.createElement("button");
    searchedCitiesButton.classname = "list-group-item";
    searchedCitiesButton.setAttribute("type", "button");
    searchedCitiesButton.setAttribute("value", cityArray[i]);
    searchedCitiesButton.textContent = cityArray[i];
    searchedList.prepend(searchedCitiesButton);
  }

  var cityHistory = document.querySelector("cityHistory");
  cityHistory.addEventListener("click", searchAgain)

}

var searchAgain = function(event) {
  var searchedCity = event.target.getAttribute("value");
  coordsConvert(searchedCity);
}