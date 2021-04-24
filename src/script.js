function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  return `${date}`;
}

function displayForecast(){
let forecastElement=document.querySelector("#forecast");
let days=["Thu","Fri","Sat","Sun"];
let forecastHTML=`<div class="row">`;
days.forEach(function(day){
  forecastHTML=
  forecastHTML+
  `
    <div class="col-2">
      <div class="weather-forecast=date">
        ${day}
        </div>
       <img
           src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42"/>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">18°</span>
            <span class="weather-forecast-temperature-min">12°</span>
          </div>
      </div>

`;
});
forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;
console.log(forecastHTML);
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey="4fce99a02cfc536e13a3dc6fb2622c7d"
  let apiUrl=`http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response){
  console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let feelsLikeElement= document.querySelector("#feelsLike");
let minElement = document.querySelector("#min");
let maxElement=document.querySelector("#max");
let dateElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon");

celsiusTemperature=response.data.main.temp;

temperatureElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
feelsLikeElement.innerHTML= `Feels like ${Math.round(response.data.main.feels_like)}°`;
minElement.innerHTML= `${Math.round(response.data.main.temp_min)}°`;
maxElement.innerHTML= `${Math.round(response.data.main.temp_max)}°`;
dateElement.innerHTML= formatDate(response.data.dt*1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);

}
  
function search(city){
  let apiKey = "4fce99a02cfc536e13a3dc6fb2622c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector(`#search-city`);
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search ("Toronto");

