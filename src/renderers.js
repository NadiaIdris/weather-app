const f2c = f => (f - 32) * 5 / 9;

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
const calcTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  // If hours is more than 12, then it's PM, else it's AM.
  if(hours > 12) {
    return `${hours - 12}:${minutes.substring(minutes.length - 2)} PM`;
  } else {
    return `${hours}:${minutes.substring(minutes.length - 2)} AM`;
  }
};

const calcHour = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  // If hours is more than 12, then it's PM, else it's AM.
  if(hours > 12) {
    return `${hours - 12} PM`;
  } else {
    return `${hours} AM`;
  }
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
// Render all hours for ONE day.
const renderAllHours = weatherData => {
  // Create: <div class="all-hours-container">-->
  const hourArray = weatherData.hourly.data;
  const dailyArray = weatherData.daily.data;
  const currentlyData = weatherData.currently;
  let content      = "";
  for (const hour of hourArray) {
    content += renderHour(hour, dailyArray);
  }
  // for (let i = 0; i < hourArray.length) {
  //
  // }
  return `<div>${content}</div>`;
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
// Use the weatherData.currently to generate the first renderHour, which is now.
// Then use the for loop to generate (24 - current hour) amount of hour data for
// that day.
//
function renderHour(hourData, dailyData) {
  const hour = calcHour(hourData.time);
  const icon = hourData.icon;
  const temperatureF = hourData.temperature;
  const temperatureC = f2c(temperatureF);
  const wind         = hourData.windSpeed;
  const uvIndex      = hourData.uvIndex;
  const humidity     = hourData.humidity;
  const dewPoint     = hourData.dewPoint;
  const precipitationType     = hourData.precipType;
  const precipitation     = hourData.precipProbability;
  const sunrise     = calcTime(dailyData.sunriseTime);
  const sunset     = calcTime(dailyData.sunsetTime);
  let content        =
      `<div class="hour-container">
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
            <p>Precipitation type</p>
            <p class="p-space">Precipitation</p>
            <p>Sunrise</p>
            <p>Sunset</p>
          </div>
          <div class="right-col">
            <p>${wind} mph</p>
            <p class="p-space">${uvIndex}</p>
            <p>${humidity}</p>
            <p>${dewPoint}</p>
            <p>${precipitationType}</p>
            <p class="p-space">${precipitation}</p>
            <p>${sunrise}</p>
            <p>${sunset}</p>
          </div>
        </div>
      </div>`;
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
  let content     = "";
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
}
