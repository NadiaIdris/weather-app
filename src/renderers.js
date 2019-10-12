import {calcHour, f2c, formatDate, getCurrentHour} from "./utils";
import {addClickEventListeners, deleteElementBySelector} from "./paint_ui";
import {load, LOCATIONS} from "./storage";

/*
Overview of WEATHER_DATA:

currently: {time: 1569812750, summary: "Partly Cloudy", icon: "partly-cloudy-night", nearestStormDistance: 13, nearestStormBearing: 62, …}
daily: {summary: "No precipitation throughout the week, with high temperatures rising to 84°F on Saturday.", icon: "clear-day", data: Array(8)}
flags: {sources: Array(11), nearest-station: 2.613, units: "us"}
hourly: {summary: "Clear throughout the day.", icon: "clear-day", data: Array(49)}
latitude: 37.3914086
longitude: -122.00416789999998
offset: -7
timezone: "America/Los_Angeles"
 */

/*
Sample of weatherData.daily.data:
      {
        "time": 1569826800,
        "summary": "Partly cloudy throughout the day.",
        "icon": "partly-cloudy-day",
        "sunriseTime": 1569852232,
        "sunsetTime": 1569894868,
        "moonPhase": 0.09,
        "precipIntensity": 0.0002,
        "precipIntensityMax": 0.0018,
        "precipIntensityMaxTime": 1569898800,
        "precipProbability": 0.16,
        "precipType": "rain",
        "temperatureHigh": 66.06,
        "temperatureHighTime": 1569884400,
        "temperatureLow": 44.62,
        "temperatureLowTime": 1569938400,
        "apparentTemperatureHigh": 65.39,
        "apparentTemperatureHighTime": 1569884400,
        "apparentTemperatureLow": 45.27,
        "apparentTemperatureLowTime": 1569938400,
        "dewPoint": 40.87,
        "humidity": 0.56,
        "pressure": 1015.35,
        "windSpeed": 4.55,
        "windGust": 16.86,
        "windGustTime": 1569888000,
        "windBearing": 273,
        "cloudCover": 0.35,
        "uvIndex": 5,
        "uvIndexTime": 1569873600,
        "visibility": 9.864,
        "ozone": 323.8,
        "temperatureMin": 50.98,
        "temperatureMinTime": 1569913200,
        "temperatureMax": 66.06,
        "temperatureMaxTime": 1569884400,
        "apparentTemperatureMin": 51.63,
        "apparentTemperatureMinTime": 1569913200,
        "apparentTemperatureMax": 65.39,
        "apparentTemperatureMaxTime": 1569884400
      }

 */
// Globals
let hour;
let totalHoursLeft;

function resetGlobals() {
  hour = 0;
}

const renderWeatherData = (weatherData) => {
  resetGlobals();
  // Make a loop to paint as many days as I have the data.
  const weatherDailyArray = weatherData.daily.data;

  // Reset the DOM.
  deleteElementBySelector('#empty-state');
  deleteElementBySelector('#all-weather-container');

  // Paint new interface.
  const body = document.querySelector('body');
  const allWeatherContainer = document.createElement('div');
  allWeatherContainer.setAttribute('id', 'all-weather-container');
  allWeatherContainer.style.display = 'flex';
  body.prepend(allWeatherContainer);

  for (let i = 0; i < weatherDailyArray.length; i++) {
    allWeatherContainer.innerHTML += renderDay(weatherData, i);
    addClickEventListeners();
    const dayWeatherContainer = document.querySelectorAll('.day-weather-container')[i];
    const allHoursContainer = document.querySelectorAll('.all-hours-container')[i];

    // If no hours left to print on viewport, center daily overview container.
    if (!allHoursContainer) {
      dayWeatherContainer.style.justifyContent = "center";
    }
  }
  resetGlobals();
};

const renderDay = (weatherData, index) => {
  let content = '';

  function paintDayOverview() {
    // If it's day 1 (today), pass weatherData.currently to the function.
    // else pass weatherData.daily.data[1]
    if (hour === 0) {
      content += renderDayOverview(weatherData.currently);
    } else {
      content += renderDayOverview(weatherData.daily.data[index]);
    }
  }

  paintDayOverview();
  // If no hours left..... don't print them
  if (weatherData.hourly.data){
    content += renderAllHoursPerDay(weatherData);
  }

  return `<div class="day-weather-container">${content}</div>`;
};


// Pass either weatherData.currently or
// pass weatherData.daily.data
const renderDayOverview = data => {
  let date = formatDate(data.time);
  const weatherData = load(LOCATIONS.WEATHER_DATA);
  // TODO: pass weatherData to renderDayOverview? I am currently loading
  //  data from localStorage and it's expensive to do it this way.
  if (data.time === weatherData.currently.time) date = 'Now';

  const icon = data.icon;
  const rightTemperatureF = data.temperature ? Math.round(data.temperature) :
      Math.round(data.temperatureHigh);
  const rightTemperatureC = f2c(rightTemperatureF);

  return `
    <div class="overview-container">
      <h2 class="day-header">${date}</h2>
      <img class="large-icon" src="images/${icon}.svg">
      <div class="temperatures-container-large">
        <p class="selected-temp">${rightTemperatureC}<span class="c-temp">&#8451;</span></p>
        <p class="not-selected-temp">${rightTemperatureF}<span class="f-temp">&#8457;</span></p>
      </div>
    </div>
  `;
};


// Render all hours for ONE day.
const renderAllHoursPerDay = weatherData => {
  const hourArray = weatherData.hourly.data;
  const currentWeather = weatherData.currently;
  let content = "";

  totalHoursLeft = hourArray.length;      //49
  // If it's a day 1, generate first hour with current weather data.
  if (hour === 0) {
    content += renderHour(currentWeather);
    hour++;
  }

  // Increment the current weather hour by 1, because we have already
  // printed the current weather hour on the viewport.
  const currentHour = hour === 1 ? (getCurrentHour(currentWeather.time) + 1) : 0; //17
  const hoursInADay = 24;
  const hoursLeftInADay = hoursInADay - currentHour;          // 24-17 = 7
  for (let i = 0; i < hoursLeftInADay && hour < hourArray.length; i++) {
    content += renderHour(hourArray[hour]);
    hour++;
  }
  totalHoursLeft -= hoursLeftInADay;

  return content === '' ? '' : `<div class="all-hours-container">${content}</div>`;
};

/*
An "hour" of data looks like this:

{
  "time": 1569812400,
  "summary": "Partly Cloudy",
  "icon": "partly-cloudy-night",
  "precipIntensity": 0,
  "precipProbability": 0,
  "temperature": 58.86,
  "apparentTemperature": 58.86,
  "dewPoint": 41.56,
  "humidity": 0.53,
  "pressure": 1013.46,
  "windSpeed": 3.43,
  "windGust": 10.47,
  "windBearing": 268,
  "cloudCover": 0.37,
  "uvIndex": 0,
  "visibility": 9.625,
  "ozone": 334.6
}
 */

function renderHour(hourData) {
  const hourEvaluated = calcHour(hourData.time);
  const icon = hourData.icon;
  const temperatureF = Math.round(hourData.temperature);
  const temperatureC = f2c(temperatureF);
  const wind = hourData.windSpeed;
  const uvIndex = hourData.uvIndex;
  const humidity = hourData.humidity;
  const dewPoint = hourData.dewPoint;
  const precipitation = hourData.precipProbability;
  // const sunrise     = calcTime(dailyData.sunriseTime);
  // const sunset     = calcTime(dailyData.sunsetTime);
  let hourToPrint = hour === 0 ? "Now" : hourEvaluated;
  if(hourEvaluated === '0 AM') {
    hourToPrint = 'Midnight';
  }

  let content =
      `  
      <div class="hour-container">
        <div class="hour-summary">
          <p>${hourToPrint}</p>
          <img class="small-icon" src="images/${icon}.svg">
          <p class="text">${temperatureC}<span>&#176;</span>/${temperatureF}<span>&#176;</span></p>
        </div>

        <div class="hour-details">
          <div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
          </div>
          <div class="right-col">
            <p>${wind} mph</p>
            <p class="p-space">${uvIndex}</p>
            <p>${humidity}</p>
            <p>${dewPoint}</p>
            <p class="p-space">${precipitation}</p>
          </div>
        </div>
      </div>

`;
  return content;
}

const testing = {
  renderHour,
  renderAllHoursPerDay,
  renderDayOverview,
  renderDay,
};

export {
  renderWeatherData,
  testing,
}

