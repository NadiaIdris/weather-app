import {calcHour, f2c, formatDate, getCurrentHour} from "./utils";
import {addClickEventListeners, deleteElementBySelector, paintLandingPage} from "./paint_ui";
import {load, CONSTANTS, save} from "./storage";

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
let isHour0Now = false;

function resetGlobals() {
  hour = 0;
  isHour0Now = false;
}

// TODO: Move these functions to utils.js later -------------------------

// function unselectTemp() {
//   const allSelectedContainers = document.querySelectorAll('.selected-temp');
//   const allNotSelectedContainers = document.querySelectorAll('.not-selected-temp');
//   allSelectedContainers.forEach(elem => {
//     elem.classList.toggle('selected-temp');
//     elem.classList.toggle('not-selected-temp');
//   });
//   allNotSelectedContainers.forEach(elem => {
//     elem.classList.toggle('not-selected-temp');
//     elem.classList.toggle('selected-temp');
//   });
//
// }

function selectTemp() {
  const allSelectedContainers = document.querySelectorAll('.selected-temp');
  const allNotSelectedContainers = document.querySelectorAll('.not-selected-temp');

  allNotSelectedContainers.forEach(elem => {
    elem.classList.toggle('not-selected-temp');
    elem.classList.toggle('selected-temp');
  });

  allSelectedContainers.forEach(elem => {
    elem.classList.toggle('selected-temp');
    elem.classList.toggle('not-selected-temp');
  });

  if (load(CONSTANTS.TEMP) === CONSTANTS.F) {
    // Change TEMP in localStorage to C
    save(CONSTANTS.TEMP, CONSTANTS.C);
  } else {
    save(CONSTANTS.TEMP, CONSTANTS.F);
  }

  paintLandingPage();
}

function selectBackgroundColor(temperatureC) {
  let backgroundColor;
  if (temperatureC < -25) { backgroundColor = "#008FE0"; }
  else if (temperatureC >= -25 && temperatureC < -20) { backgroundColor = "#009AF1"; }
  else if (temperatureC >= -20 && temperatureC < -15) { backgroundColor = "#00A3FF"; }
  else if (temperatureC >= -15 && temperatureC < -10) { backgroundColor = "#00AAF4"; }
  else if (temperatureC >= -10 && temperatureC < -5) { backgroundColor = "#00B7F1"; }
  else if (temperatureC >= -5 && temperatureC < 0) { backgroundColor = "#00C9F6"; }
  else if (temperatureC >= 0 && temperatureC < 5) { backgroundColor = "#00D6E3"; }
  else if (temperatureC >= 5 && temperatureC < 10) { backgroundColor = "#EFD702"; }
  else if (temperatureC >= 10 && temperatureC < 15) { backgroundColor = "#FFC700"; }
  else if (temperatureC >= 15 && temperatureC < 20) { backgroundColor = "#FFB800"; }
  else if (temperatureC >= 20 && temperatureC < 25) { backgroundColor = "#FFA800"; }
  else if (temperatureC >= 25 && temperatureC < 30) { backgroundColor = "#FF8A00"; }
  else if (temperatureC >= 30 && temperatureC < 35) { backgroundColor = "#FF6B00"; }
  else if (temperatureC >= 35 && temperatureC < 40) { backgroundColor = "#ED5500"; }
  else if (temperatureC >= 40 && temperatureC < 45) { backgroundColor = "#E54500"; }
  else if (temperatureC >= 45) { backgroundColor = "#D84100"; }
  return backgroundColor;
}

const windSpeedDescription = (windSpeedInKmPerHour) => {
  let windDescription;
  if (windSpeedInKmPerHour <=11) { windDescription = "Light"; }
  else if (windSpeedInKmPerHour > 11 && windSpeedInKmPerHour <= 38) { windDescription = "Moderate"; }
  else if (windSpeedInKmPerHour > 38 && windSpeedInKmPerHour <= 61) { windDescription = "Strong"; }
  else if (windSpeedInKmPerHour > 61 && windSpeedInKmPerHour <= 88) { windDescription = "Very strong"; }
  else if (windSpeedInKmPerHour > 88 && windSpeedInKmPerHour <= 117) { windDescription = "Extremely strong"; }
  else if (windSpeedInKmPerHour > 117) { windDescription = "Hurricane"; }
  return windDescription;
};

const calculateKm = (miles) => {
  return Math.round(miles * 1.60934);
};

const miles2km = (miles) => {
  const km = calculateKm(miles);
  const speedDescription = windSpeedDescription(km);
  // return `${speedDescription}, ${km} km/hr`;
  return `${speedDescription}`;
};

const milesPerHour = (miles) => {
  const m = Math.round(miles);
  const km = calculateKm(m);
  const speedDescription = windSpeedDescription(km);
  // return `${speedDescription}, ${m} mph`;
  return `${speedDescription}`;
};

const getUvIndexDescription = (uvIndex) => {
  let description;
  if (uvIndex >= 0 && uvIndex < 3) { description = "Low"; }
  else if (uvIndex >= 3 && uvIndex < 6) { description = "Medium"; }
  else if (uvIndex >= 6 && uvIndex < 8) { description = "High"; }
  else if (uvIndex >= 8 && uvIndex < 11) { description = "Very high"; }
  else if (uvIndex >= 11) { description = "Extreme"; }
  return description;
};

//----------------------------------------------------------------


const renderWeatherData = (weatherData, unit) => {
  resetGlobals();
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
    allWeatherContainer.innerHTML += renderDay(weatherData, i, unit);
    addClickEventListeners();
    const dayWeatherContainer = document.querySelectorAll('.day-weather-container')[i];
    const allHoursContainer = document.querySelectorAll('.all-hours-container')[i];

    // If no hours left to print on viewport, center daily overview container.
    if (!allHoursContainer) {
      dayWeatherContainer.style.justifyContent = "center";
    }
  }

  const notSelectedTemp = document.querySelectorAll('.not-selected-temp');
  notSelectedTemp.forEach(elem => elem.addEventListener('click', selectTemp));

  resetGlobals();
};

const renderDay = (weatherData, index, unit) => {
  let content = '';
  let backgroundColor;
  let temperatureC;

  function paintDayOverview() {
    // If it's day 1 (today), pass weatherData.currently to the function.
    // else pass weatherData.daily.data[1]
    if (hour === 0) {
      content += renderDayOverview(weatherData.currently, unit, weatherData.offset);
      // Paint the background color
      const temperatureF = Math.round(weatherData.currently.apparentTemperature);
      temperatureC = f2c(temperatureF);
      backgroundColor = selectBackgroundColor(temperatureC);
    } else {
      content += renderDayOverview(weatherData.daily.data[index], unit, weatherData.offset);
      // Paint the background color
      const temperatureF = Math.round(weatherData.daily.data[index].temperatureHigh);
      temperatureC = f2c(temperatureF);
      backgroundColor = selectBackgroundColor(temperatureC);
    }
  }
  paintDayOverview();

  if (weatherData.hourly.data){
    content += renderAllHoursPerDay(weatherData);
  }
  return `<div class="day-weather-container" style="background-color: ${backgroundColor}">${content}</div>`;
};


const renderDayOverview = (data, unit, offset) => {
  let date = formatDate(data.time, offset);
  const weatherData = load(CONSTANTS.WEATHER_DATA);
  // TODO: pass weatherData to renderDayOverview? I am currently loading
  //  data from localStorage and it's expensive to do it this way.
  if (data.time === weatherData.currently.time) date = 'Now';

  const icon = data.icon;
  const ifTempFSelected = unit === CONSTANTS.F ? "selected-temp" : "not-selected-temp";
  const ifTempCSelected = unit === CONSTANTS.C ? "selected-temp" : "not-selected-temp";

  // Generate day background color.
  const temperatureF = data.temperature ? Math.round(data.temperature) :
      Math.round(data.temperatureHigh);
  const temperatureC = f2c(temperatureF);
  const backgroundColor = selectBackgroundColor(temperatureC);


  return `
    <div class="overview-container" style="background-color: ${backgroundColor}">
      <h2 class="day-header">${date}</h2>
      <img class="large-icon" src="images/${icon}.svg">
      <div class="temperature-container-large">
        <p class="${ifTempFSelected}">${temperatureF}<span class="f-temp">&#8457;</span></p>
        <p class="${ifTempCSelected}">${temperatureC}<span class="c-temp">&#8451;</span></p>
      </div>
    </div>
  `;
};


// Render all hours for ONE day.
const renderAllHoursPerDay = weatherData => {
  const hourlyDataArray = weatherData.hourly.data;
  const currentConditionsData = weatherData.currently;
  let content = "";

  // debugger;
  // If it's a day 1, generate first hour with current weather data.
  if (hour === 0) {
    content += renderHour(currentConditionsData, weatherData.offset);
    hour++;

    const currentHourTemp = getCurrentHour(currentConditionsData.time, weatherData.offset);
    if (currentHourTemp === 23){
      return content === '' ? '' : `<div class="all-hours-container">${content}</div>`;
    }
  }

  const hoursInADay = 23;
  const getCurrentHourReturns = getCurrentHour(currentConditionsData.time, weatherData.offset);
  let currentHour;

  if (hour === 1 && getCurrentHourReturns === 0) {
    currentHour = 0;
  } else if (hour === 1 && getCurrentHourReturns === 23) {
    currentHour = 0;
  } else if (hour === 1) {
    currentHour = getCurrentHour(currentConditionsData.time, weatherData.offset) + 1;
  } else {
    currentHour = 0;
  }

  const hoursLeftInADay = hoursInADay - currentHour;

  // If it's UTC time, then run 23 times
  if (hour === 1 && weatherData.offset === 0){
    for (let hourIndex = 0; hourIndex <= hoursLeftInADay && hour < hourlyDataArray.length; hourIndex++) {
      content += renderHour(hourlyDataArray[hour], weatherData.offset);
      hour++;
    }
  }
  // If now is 0AM, run 22 times
  else if (currentHour === 0 && hour === 1 && isHour0Now) {
    for (let hourIndex = 0; hourIndex < hoursLeftInADay && hour < hourlyDataArray.length; hourIndex++) {
      content += renderHour(hourlyDataArray[hour], weatherData.offset);
      hour++;
    }
  }
  // If it's new day, run 23 times
  else if (currentHour === 0) {
    for (let hourIndex = 0; hourIndex <= hoursLeftInADay && hour < hourlyDataArray.length; hourIndex++) {
      content += renderHour(hourlyDataArray[hour], weatherData.offset);
      hour++;
    }
  } else {
    for (let hourIndex = 0; hourIndex <= hoursLeftInADay && hour < hourlyDataArray.length; hourIndex++) {
      content += renderHour(hourlyDataArray[hour], weatherData.offset);
      hour++;
    }
  }

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

function renderHour(hourData, offset) {
  const hourEvaluated = calcHour(hourData.time, offset);
  const icon = hourData.icon;
  const temperatureF = Math.round(hourData.temperature);
  const temperatureC = f2c(temperatureF);
  let wind;
  const windInMiles = milesPerHour(hourData.windSpeed);
  const windInKm = miles2km(hourData.windSpeed);
  const uvIndex = getUvIndexDescription(hourData.uvIndex);
  const humidity = Math.round(hourData.humidity * 100);
  const dewPoint = Math.round(hourData.dewPoint);
  const precipitation = Math.round(hourData.precipProbability *100);

  // let hourToPrint = hour === 0 || hour === 0 && hourEvaluated === '0 AM' ? "Now" : hourEvaluated;
  let hourToPrint;
  if (hour === 0 && hourEvaluated === '0 AM') {
    hourToPrint = "Now";
    isHour0Now = true;
  } else if (hour === 0) {
    hourToPrint = "Now";
  } else {
    hourToPrint = hourEvaluated;
  }

  if (hourEvaluated === '0 AM' && hour !== 0) { hourToPrint = 'Midnight'; }
  if (hourEvaluated === '12 PM' && hour !== 0) { hourToPrint = 'Noon'; }

  const backgroundColor = selectBackgroundColor(temperatureC);
  wind = load(CONSTANTS.TEMP) === CONSTANTS.F ? windInMiles : windInKm;
  const selectedTempHourlyF = load(CONSTANTS.TEMP) === CONSTANTS.F ? "selected-temp-hourly" : "not-selected-temp-hourly";
  const selectedTempHourlyC = load(CONSTANTS.TEMP) === CONSTANTS.C ? "selected-temp-hourly" : "not-selected-temp-hourly";

  let content =
      `  
      <div class="hour-container" style="background-color: ${backgroundColor}">
        <div class="hour-summary">
          <p class="left-col">${hourToPrint}</p>
          <img class="small-icon" src="images/${icon}.svg">
          <div class="temperature-container-small right-col">
             <p class="${selectedTempHourlyF}">${temperatureF}<span>&#176;</span></p>
             <p class="divider">/</p>
             <p class="${selectedTempHourlyC}">${temperatureC}<span>&#176;</span></p>
          </div>
       
        </div>

        <div class="hour-details">
          <div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p>Precipitation</p>
          </div>
          <div class="right-col">
            <p>${wind}</p>
            <p class="p-space">${uvIndex}</p>
            <p>${humidity}%</p>
            <p>${dewPoint}<span>&#176;</span></p>
            <p>${precipitation}%</p>
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

