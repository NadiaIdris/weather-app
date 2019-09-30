const f2c = f => (f - 32) * 5 / 9;

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
const renderAllHours = weatherData => {
  const hourArray = weatherData.hourly.data;
  let content      = "";
  for (const hour of hourArray) {
    content += renderHour(hour);
  }
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

The HTML looks like:
<div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
            <p>Sunrise</p>
            <p>Sunset</p>
          </div>
 */
function renderHour(hourData) {
  const temperatureF = hourData.temperature;
  const temperatureC = f2c(temperatureF);
  const wind         = hourData.windSpeed;
  const humidity     = hourData.humidity;
  const uvIndex      = hourData.uvIndex;
  let content        =
          `<div class="left-col">
            <p>Wind</p>
            ${wind}
            <p class="p-space">UV index</p>
            ${uvIndex}
            <p>Humidity</p>
            ${humidity}
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
            <p>Sunrise</p>
            <p>Sunset</p>
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