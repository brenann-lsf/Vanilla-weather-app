let now = new Date();
let date = now.getDate();
let hours = now.getHours()
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
  
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML =`${day}., ${month} ${date}`;
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;


  function changeCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#find-city");
    let cityHeading = document.querySelector("#city");
    cityHeading.innerHTML = `${cityInput.value}`; 
  }
  let form = document.querySelector("#search");
  form.addEventListener("submit", changeCity);


function showWeather(response){
  let temperature = Math.round(response.data.main.temp);
  let weather = document.querySelector("#temperature");
weather.innerHTML = `${temperature}°C`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let altWeather = document.querySelector("#feelsLike");
altWeather.innerHTML = `Feels like ${feelsLike}`;
  let description = (response.data.weather[0].description);
  let altdescription = document.querySelector ("#description");
altdescription.innerHTML = `${description}`;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let altHighLow = document.querySelector("#high_low");
altHighLow.innerHTML = `${min}°/ ${max}°`;
}


function searchCity(city) {
  let apiKey = "4fce99a02cfc536e13a3dc6fb2622c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#find-city").value;
  searchCity(city);
}
let searchedCity = document.querySelector("#search");
searchedCity.addEventListener("submit", handleSubmit);


function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4fce99a02cfc536e13a3dc6fb2622c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(handleSubmit);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);






  