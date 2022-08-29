console.log('hello')

const weatherBlock = document.querySelector('.weather');

async function loadWeather (e) {
    weatherBlock.innerHTML = `
    <div class="weather_loading">
    <img src="./img/Loading_3.gif" alt="Loading...">
    </div>`;

    const server = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=d40bbb62e0c685ad6c191d7f95f1dd66`
    const response = await fetch (server, {
        method: 'GET',
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
    const temp = Math.round(data.main.temp);
    const feelsLike = data.main.feels_like;
    const dataStatus = data.weather[0].main;

// HTML шаблон
const template = `
<div class="weather_city">${location}</div>
<div class="weaher_status">${dataStatus}</div>
<div class="weather_temp">${temp}</div>
<div class="weather_feel-like">${feelsLike}</div>
`
weatherBlock.innerHTML = template;
}

if (weatherBlock) {
    loadWeather();
}