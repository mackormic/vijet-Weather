console.log("hello");

const weatherBlock = document.querySelector(".weather");

async function loadWeather(city) {
  weatherBlock.innerHTML = `
    <div class="weather_loading">
    <img src="./img/Loading_3.gif" alt="Loading...">
    </div>`;

  const server = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d40bbb62e0c685ad6c191d7f95f1dd66`;
  const response = await fetch(server, {
    method: "GET",
  });

  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp) - 273;
  const feelsLike = Math.round(data.main.feels_like) - 273;
  const dataStatus = data.weather[0].main;

  // HTML шаблон
  const template = `
<div class="weather_city">${location}</div>
<div class="weaher_status">${dataStatus}</div>
<div class="weather_temp">${temp}&deg</div>
<div class="weather_feel-like">${feelsLike}&deg</div>
`;
  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather("minsk");
}

const form = document.querySelector(".form");
const input = form.querySelector("input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = input.value;
  loadWeather(city);
});
