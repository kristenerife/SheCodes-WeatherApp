function showDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let day = days[now.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#divTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitData(event) {
  event.preventDefault();
  let city = document.querySelector("#query").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function updateCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let today = document.querySelector("#today");
let now = new Date();
today.innerHTML = showDate(now);

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitData);

let currentLocationButton = document.querySelector("#cl-button");
currentLocationButton.addEventListener("click", updateCurrentLocation);

searchCity("New York");
