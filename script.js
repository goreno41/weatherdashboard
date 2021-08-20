
const apiKey = "efde57d5c2503a94e108601163cabffd";

const citySearch = document.getElementById("citySearch");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");

const searchHistory = document.getElementById("searchHistory");
var forecastTitle = document.getElementById("forecastTitle");
var currentWeather = document.getElementById("currentWeather");

const todayIcon = document.getElementById("todayIcon");
const weatherIcon = document.getElementById("weatherIcon");

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
      coordsConvert(selectedCity);
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

  var coordsApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  fetch(coordsApiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {


        cityName.textContent = `${city} (${moment().format("M/D/YYYY")})`;

        getCurrentWeather(data)
        getForecast(data)
      });
    }
  })
}


var saveSearch = function(city) {
  cityArray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArray));
}

var pullSearch = function() {
  cityArray = JSON.parse(localStorage.getItem("cities"));

  if (!cityArray) {
      cityArray = [];
      return false;
  } else if (cityArray.length > 5) {
    cityArray.shift();
  }
  
  
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
  
}

var searchAgain = function(event) {
  var searchedCity = event.target.getAttribute("value");
  coordsConvert(searchedCity);
}

var getCurrentWeather = function(forecast){

  currentWeather.classList.remove("hide");

  var currentIcon = forecast.current.weather[0].icon;
  todayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}.png`);
  todayIcon.setAttribute("alt", forecast.current.weather[0].main);

  var currentTemp = forecast.current["temp"];
  var roundedCurrentTemp = Math.round(currentTemp);
  temperature.textContent = roundedCurrentTemp

  windSpeed.textContent = forecast.current["wind_speed"];
  humidity.textContent = forecast.current["humidity"];
  uvIndex.textContent = forecast.current["uvi"];
  
}

var getForecast = function(forecast) {

  for (var i = 1; i < 6; i++) {
    var date = document.querySelector("#date" + i);
    date.textContent = moment().add(i, "days").format("M/D/YYYY");

    var icon = document.querySelector("#icon" + i);
    var iconData = forecast.daily[i].weather[0].icon;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}.png`);
    icon.setAttribute("alt", forecast.daily[i].weather[0].main);

    roundTemp("#temp" + i, forecast.daily[i].temp.day);
  }


}

var roundTemp = function(element, temperature) {
  var displayElement =  document.querySelector(element);
  var tempRound = Math.round(temperature);
  displayElement.textContent = tempRound;

}








pullSearch();
searchButton.addEventListener("click", inputScrub);

