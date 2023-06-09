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

  // CHANGING THEME DEPENDING ON THE HOUR (MORNING AND NIGHT)

  let horita = hour;

  let body = document.querySelector("body");

  if (horita >= 8 && horita <= 18) {
    //morning
    body.classList.add("light");
  } else {
    //night
    body.classList.remove("light");
  }

  //Showing current date with return

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

// DISPLAY 6 DAY WEATHER FORECAST
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="container text-center">`;
  forecastHTML = forecastHTML + `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-12 col-md-4 col-lg-2">
        <div class="day-card">
          <h5>${formatDay(forecastDay.dt)}</h5>
          <img src="img/${forecastDay.weather[0].icon}.png" alt="Weather" />
          <p>
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°C  </span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°C</span>
          </p>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  // City Name
  document.querySelector("h1").innerHTML = response.data.name;

  // Temperature
  celciusTemperature = response.data.main.temp;

  document.querySelector(".temperature").innerHTML =
    Math.round(celciusTemperature);

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

  // Main ICON weather
  let iconElement = document.querySelector("#icon-weather");
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);

  // WEATHER FORECAST 6 DAYS
  getForecast(response.data.coord);
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

/* CONVERSION FAHRENHEIT CELCIUS */

function showFahrenheitTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("inactive");
  celciusLink.classList.add("inactive");

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();

  celciusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

// DEFAULT CITY
searchCity("San Francisco");
