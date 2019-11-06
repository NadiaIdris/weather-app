import {calcHour, f2c, formatDate, getCurrentHour, selectBackgroundColor, miles2km, getUvIndexDescription, selectTemp} from "./utils";
import {addClickEventListeners, deleteElementBySelector} from "./paint_ui";
import {load, CONSTANTS} from "./storage";

// Globals
let hour;
let isHour0Now = false;
let backgroundColor;

function resetGlobals() {
  hour = 0;
  isHour0Now = false;
}

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
  // var backgroundColor;
  let temperatureC;

  function paintDayOverview() {
    // If it's day 1 (today), pass weatherData.currently to the function.
    // else pass weatherData.daily.data[1]
    if (hour === 0) {
      content += renderDayOverview(weatherData.currently, unit, weatherData.offset);
      // Paint the day background color
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

  if (weatherData.hourly.data) { content += renderAllHoursPerDay(weatherData); }

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

function renderHour(hourData, offset) {
  const hourEvaluated = calcHour(hourData.time, offset);
  const icon = hourData.icon;
  const temperatureF = Math.round(hourData.temperature);
  const temperatureC = f2c(temperatureF);
  const wind = miles2km(hourData.windSpeed);
  const uvIndex = getUvIndexDescription(hourData.uvIndex);
  const humidity = Math.round(hourData.humidity * 100);
  const dewPoint = Math.round(hourData.dewPoint);
  const precipitation = Math.round(hourData.precipProbability *100);

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

  backgroundColor = selectBackgroundColor(temperatureC);
  const selectedTempHourlyF = load(CONSTANTS.TEMP) === CONSTANTS.F ? "selected-temp-hourly" : "not-selected-temp-hourly";
  const selectedTempHourlyC = load(CONSTANTS.TEMP) === CONSTANTS.C ? "selected-temp-hourly" : "not-selected-temp-hourly";

  let content =
      `  
      <div class="hour-container" style="background-color: ${backgroundColor}">
        <div class="hour-summary">
          <p class="left-col">${hourToPrint}</p>
          <img class="small-icon" src="images/${icon}.svg" height="22">
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

