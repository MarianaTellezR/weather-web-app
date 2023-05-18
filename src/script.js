console.log("Mariana Tellez was here");

// Display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[date.getDay()]; //Monday
  let dateNum = date.getDate(); //15
  let month = months[date.getMonth()]; //May
  let year = date.getFullYear(); //2023

  let hour = date.getHours();
  let min = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  return `${day} ${hour}:${min}<br>${month} ${dateNum}, ${year} `;
}

let h2 = document.querySelector("h2");

let currentTime = new Date();

h2.innerHTML = formatDate(currentTime);

// Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page and current temperature
//after the user submits the form.
let apiKey = "d1b73b9f0676715bbd0cc493b72eb781";
let units = "metric";

function showWeather(response) {
  // City Name
  document.querySelector("h1").innerHTML = response.data.name;
  // Temperature
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // Description weather
  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].main;
  // Wind
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  // Visibility
  document.querySelector("#visibility").innerHTML = Math.round(
    response.data.visibility / 1000
  );
  // Humidity
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  console.log(response);
}

function searchCity(city) {
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

// Get current temperature from current position

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonCurrentPosition = document.querySelector("#current-location");
buttonCurrentPosition.addEventListener("click", getPosition);

// DEFAULT CITY
searchCity("San Francisco");

/* Display a fake temperature (i.e 17) in Celsius and add a link to
   convert it to Fahrenheit. When clicking on it, it should convert
   the temperature to Fahrenheit.
   When clicking on Celsius, it should convert it back to Celsius.
*/

let celciusDegrees = document.querySelector("#celcius-link");

celciusDegrees.addEventListener("click", function changeToCelcius(event) {
  event.preventDefault();
  let temperatureData = document.querySelector("#temperature");
  temperatureData.innerHTML = 19;
});

let fahrenheitDegrees = document.querySelector("#fahrenheit-link");

fahrenheitDegrees.addEventListener("click", function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureData = document.querySelector("#temperature");
  temperatureData.innerHTML = 66;
});
