import {weatherData} from "./test/test_dummy_data";

const f2c = f => Math.round((f - 32) * 5 / 9);

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
const calcTime = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  // If hours is more than 12, then it's PM, else it's AM.
  if (hours > 12) {
    return `${hours - 12}:${minutes.substring(minutes.length - 2)} PM`;
  } else if (hours === 12) {
    return `${hours}:${minutes.substring(minutes.length - 2)} PM`;
  } else {
    return `${hours}:${minutes.substring(minutes.length - 2)} AM`;
  }
};

const calcHour = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  // If hours is more than 12, then it's PM, else it's AM.
  if (hours > 12) {
    return `${hours - 12} PM`;
  } else {
    return `${hours} AM`;
  }
};

const getCurrentHour = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  return hours;
};

const formatDate = unixTime => {
  const date = new Date(unixTime * 1000);

  const dayIndex = date.getDay();  // returns 0 - 6. Sunday - Saturday : 0 - 6.
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = dayNames[dayIndex];

  const monthIndex = date.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[monthIndex];

  const dayOfMonth = date.getDate();

  return `${day}, ${month} ${dayOfMonth}`;
};
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
let hour = 1;

const renderDay = (weatherData, index) => {
  // If it's day 1 (today), pass weatherData.currently to the function.
  // else pass weatherData.daily.data[1]
  if (hour === 1){
    renderDayOverview(weatherData.currently);
  } else {
    renderDayOverview(weatherData.daily.data[index]);
  }

  // TODO: build the stuff below.
  // // Generate container to hold all the hour data
  // // Create: <div class="all-hours-container">-->
  // const dayWeatherContainer = document.querySelectorAll('.day-weather-container');
  // const allHoursContainer = document.createElement('div');
  // allHoursContainer.setAttribute('class', 'all-hours-container');
  // dayWeatherContainer.appendChild(allHoursContainer);

  // Paint all hours
  renderAllHoursPerDay(weatherData);

};


const renderAllDays = () => {
// Put renderDay through a loop
  const dailyDataArray = weatherData.daily.data;
  dailyDataArray.map(renderDay(weatherData)).join('');
};


// Pass either weatherData.currently or
// pass weatherData.daily.data
const renderDayOverview = data => {
  const date = formatDate(data.time);
  const icon = data.icon;
  const rightTemperatureF = data.temperature ? Math.round(data.temperature) :
      Math.round(data.temperatureHigh);
  const rightTemperatureC = f2c(rightTemperatureF);

  return `
    <div class="overview-container">
      <h2 class="day-header">${date}</h2>
      <img class="large-icon" src="images/${icon}">
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

  // I think these are meant to be global??
  let totalHoursLeft = hourArray.length;
  // let hour = 1;

  // If it's a day 1, generate first hour with current weather data.
  if (hour === 1) {
    content += renderHour(currentWeather);
  }
  // Generate the rest of hours for the day. Ignore the
  // first element of the hourArray (it's old data).
  const currentHour = getCurrentHour(currentWeather.time);    // 15
  const hoursInADay = 24;
  const hoursLeftInADay = hoursInADay - currentHour;          // 24-15 = 9
  for (let i = hour; i < hoursLeftInADay; i++) {           // 1 to 8 element
    content += renderHour(hourArray[i]);
    hour = i;
  }
  totalHoursLeft -= hoursLeftInADay;
  console.log(`Total hours left is = ${totalHoursLeft}`);
  console.log(`All hours painted after the day(s) is = ${hour}`);

  return `<div class="all-hours-container">${content}</div>`;
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
  const hour = calcHour(hourData.time);
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
  let content =
      `  
      <div class="hour-container">
        <div class="hour-summary">
          <p>${hour}</p>
          <img class="small-icon" src="images/${icon}">
          <p>${temperatureC}<span>&#176;</span>/${temperatureF}<span>&#176;</span></p>
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

// TODO: rewrite ALL the code below.

/*
This is what "weatherData.currently" data looks like

{
  "time": 1569812750,
  "summary": "Partly Cloudy",
  "icon": "partly-cloudy-night",
  "nearestStormDistance": 13,
  "nearestStormBearing": 62,
  "precipIntensity": 0,
  "precipProbability": 0,
  "temperature": 58.73,
  "apparentTemperature": 58.73,
  "dewPoint": 41.67,
  "humidity": 0.53,
  "pressure": 1013.44,
  "windSpeed": 3.39,
  "windGust": 10.42,
  "windBearing": 271,
  "cloudCover": 0.37,
  "uvIndex": 0,
  "visibility": 9.611,
  "ozone": 334.3
}
 */
const renderCurrently = weatherData => {
  const currently = weatherData.currently;
  let content = "";
  content += currently.temperature + "F";
  content += f2c(currently.temperature) + "C";
  return `<div>${content}</div>`;
};

const renderAllDaily = weatherData => {
  let content = "";
  const dailyArray = weatherData.daily.data;
  for (const daily of dailyArray) {
    content += renderDaily(daily);
  }
  return "</div>";
};

function renderDaily(dailyData) {
  return "</div>";
}

// TODO: export only the functions that are required by other files.
export {
  renderCurrently,
  renderHour,
  renderAllHoursPerDay,
  renderDayOverview,
}
