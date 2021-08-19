function weatherDashboard() {

  const apiKey = "&appid=efde57d5c2503a94e108601163cabffd";

  const api = "http://api.openweathermap.org/geo/1.0/direct?q="

  const citySearch = document.getElementById(citySearch);
  const cityName = document.getElementById(cityName);
  const searchButton = document.getElementById(searchButton);
  const clearButton = document.getElementById(clearButton);







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

  

  searchButton.addEventListener("click", getApi);
};

