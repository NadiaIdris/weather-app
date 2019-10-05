/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: askLocation, getWeatherDataNow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "askLocation", function() { return askLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWeatherDataNow", function() { return getWeatherDataNow; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _paint_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paint_ui */ "./src/paint_ui.js");



const askLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      // Save the lat, lng pair to LocalStorage for use later.
      Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LAT, lat);
      Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LNG, lng);
      // Fetch data from DarkSky API.
      getWeatherDataNow(lat, lng);
    })
  }
  else {
    // TODO: If current location denied, show a pop up describing how to grant
    //  access & why.
    window.alert("TODO: show pop up describing how to grant access & why");
  }
};

const getWeatherDataNow = (lat, lng) => {
  if (!lat || !lng) {
    console.warn("Can't get weather, since null arguments were" +
                     " passed for lat or lng!");
    return;
  }

  const API_KEY     = '6eae3396dc3311cb103d2f86f03d5775';
  const url         = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?exclude=minutely`;
  const corsFreeUrl = `https://cors-anywhere.herokuapp.com/${url}`;

  fetch(corsFreeUrl)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        //callback(myJson);
        Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].WEATHER_DATA, weatherData);
        Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["paintWeatherToViewport"])(weatherData);
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      });
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _paint_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paint_ui */ "./src/paint_ui.js");
/* harmony import */ var _test_test_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test/test_all */ "./src/test/test_all.js");




const attachListeners = () => {
  const myLocationIcon = document.querySelector('#my-location');
  myLocationIcon.addEventListener('click', _data__WEBPACK_IMPORTED_MODULE_0__["askLocation"]);
  myLocationIcon.addEventListener('mouseover', _paint_ui__WEBPACK_IMPORTED_MODULE_1__["showPopUp"]);
  myLocationIcon.addEventListener('mouseout', _paint_ui__WEBPACK_IMPORTED_MODULE_1__["hidePopUp"]);
  Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["addClickEventListeners"])();
};

const main = () => {
  attachListeners();
  Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["paintEmptyLandingPage"])();
};

main();

Object(_test_test_all__WEBPACK_IMPORTED_MODULE_2__["test_all"])();

//TODO:
// - Add shadow to the whole weather details and summary
//   section. Potentially use toggle and a CSS class to do this.


/***/ }),

/***/ "./src/paint_ui.js":
/*!*************************!*\
  !*** ./src/paint_ui.js ***!
  \*************************/
/*! exports provided: showPopUp, hidePopUp, paintEmptyLandingPage, deleteElementBySelector, paintWeatherToViewport, addClickEventListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showPopUp", function() { return showPopUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hidePopUp", function() { return hidePopUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paintEmptyLandingPage", function() { return paintEmptyLandingPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteElementBySelector", function() { return deleteElementBySelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paintWeatherToViewport", function() { return paintWeatherToViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClickEventListeners", function() { return addClickEventListeners; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");



const showPopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'block';
};

const hidePopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'none';
};

const paintEmptyLandingPage = () => {
  const weatherData = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].WEATHER_DATA);
  if (weatherData) {
    // Found weather data in local storage, so paint it.
    paintWeatherToViewport(weatherData);
    
    // Refresh the weather for the location saved in localStorage.
    const lat = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LAT);
    const lng = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LNG);
    Object(_data__WEBPACK_IMPORTED_MODULE_1__["getWeatherDataNow"])(lat, lng);
  }
  else {
    // There is no weather data stored in localStorage, so paint empty state.
    console.log("No weather data available yet.");
    deleteElementBySelector('#empty-state');
    
    const body                = document.querySelector('body');
    const emptyStateContainer = document.createElement('div');
    emptyStateContainer.setAttribute('id', 'empty-state');
    body.prepend(emptyStateContainer);
    
    emptyStateContainer.innerHTML = `
      <h1>Welcome</h1>
      <h2>Search a location below and the <br>weather will appear here.</h2>
      <div id="pop-up">
        <h3>Get weather for current location</h3>
        <p class="space">After clicking
          <i class="material-icons location-icon-text">my_location</i>, the
        browser will ask for your permission to know your location. Click
        “Allow” to be able to get
        weather for current location.</p>
        <img src="images/allow_access.svg" alt="Allow browser access location">
        <div id="pop-up-arrow"></div>
      </div>
    `;
  }
};

// TODO: do something meaning w/ this in the future
const getHour = (unixTimestamp) => {
  const date  = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  // Every hour fetch data again.
};

// TODO: Actually use weatherData to paint the UI (currently dummy data is
//  painted)
const paintWeatherToViewport = (weatherData) => {
  // Delete empty state design
  deleteElementBySelector('#empty-state');
  deleteElementBySelector('#all-weather-container');
  // Paint new interface
  const body                = document.querySelector('body');
  const allWeatherContainer = document.createElement('div');
  allWeatherContainer.setAttribute('id', 'all-weather-container');
  allWeatherContainer.style.display = 'flex';
  body.prepend(allWeatherContainer);
  
  // Make a loop to paint as many days as I have the data.
  allWeatherContainer.innerHTML = `
    <div class="day-weather-container">

    <div class="overview-container">
      <h2 class="day-header">Now</h2>
      <img class="large-icon" src="images/sun.svg">
      <div class="temperatures-container-large">
        <p class="selected-temp">10<span class="c-temp">&#8451;</span></p>
        <p class="not-selected-temp">50<span class="f-temp">&#8457;</span></p>
      </div>
    </div>
    
    <div class="all-hours-container">

      <div class="hour-container">
        <div class="hour-summary">
          <p>Now</p>
          <img class="small-icon" src="images/small_sun.svg">
          <p>10<span>&#176;</span>/50<span>&#176;</span></p>
        </div>

        <div class="hour-details">
          <div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
            <p>Sunrise</p>
            <p>Sunset</p>
          </div>
          <div class="right-col">
            <p>Moderate (24km/h)</p>
            <p class="p-space">Very high (10)</p>
            <p>50%</p>
            <p>14C</p>
            <p class="p-space">0%</p>
            <p>6:05 AM</p>
            <p>8:23 PM</p>
          </div>
        </div>
      </div>

      <div class="hour-container">
        <div class="hour-summary">
          <p>Now</p>
          <img class="small-icon" src="images/small_sun.svg">
          <p>10<span>&#176;</span>/50<span>&#176;</span></p>
        </div>
        <div class="hour-details">
          <div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
            <p>Sunrise</p>
            <p>Sunset</p>
          </div>
          <div class="right-col">
            <p>Moderate (24km/h)</p>
            <p class="p-space">Very high (10)</p>
            <p>50%</p>
            <p>14C</p>
            <p class="p-space">0%</p>
            <p>6:05 AM</p>
            <p>8:23 PM</p>
          </div>
        </div>
      </div>

    </div>

  </div>
  `;
  
};

const deleteElementBySelector = (selector) => {
  if (!selector) {
    return;
  }
  const divToRemove = document.querySelector(selector);
  if (!divToRemove) {
    return;
  }
  divToRemove.parentNode.removeChild(divToRemove);
};


function showWeatherDetails() {
  const hourDetails = this.querySelector('.hour-details');
  hourDetails.classList.toggle('hour-details-accordion');
  
  const hourContainer = document.querySelector('.hour-container');
  console.log(hourContainer);
  hourContainer.classList.toggle('inner-shadow');
}

const addClickEventListeners = () => {
  const hourContainers = document.querySelectorAll('.hour-container');
  
  for (const container of hourContainers) {
    container.addEventListener('click', showWeatherDetails);
  }
};





/***/ }),

/***/ "./src/renderers.js":
/*!**************************!*\
  !*** ./src/renderers.js ***!
  \**************************/
/*! exports provided: renderCurrently, renderHour, renderAllHoursPerDay, renderDayOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCurrently", function() { return renderCurrently; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHour", function() { return renderHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAllHoursPerDay", function() { return renderAllHoursPerDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDayOverview", function() { return renderDayOverview; });
/* harmony import */ var _test_test_dummy_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test/test_dummy_data */ "./src/test/test_dummy_data.js");


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
  const dailyDataArray = _test_test_dummy_data__WEBPACK_IMPORTED_MODULE_0__["weatherData"].daily.data;
  dailyDataArray.map(renderDay(_test_test_dummy_data__WEBPACK_IMPORTED_MODULE_0__["weatherData"])).join('');
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



/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! exports provided: save, load, LOCATIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATIONS", function() { return LOCATIONS; });
/**
 * The following keys are stored in localStorage.
 */
const LOCATIONS = {
  WEATHER_DATA: "WEATHER_DATA",
  LAT         : "LAT",
  LNG         : "LNG"
};

/**
 * Given the key and the value, the stringified value is saved to localStorage.
 */
const save = (key, weatherData) => {
  localStorage.setItem(key, JSON.stringify(weatherData));
  console.log(`Data for key "${key}" saved to localStorage`);
};

/**
 * If the key is found in localStorage then it returns the parsed value for it.
 * Otherwise returns null.
 */
const load = (key) => {
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  if (!dataFromStorage) {
    console.warn(`Data for key "${key}" not found in localStorage`);
    return;
  }
  console.log(`Data for key "${key}" loaded from localStorage`, dataFromStorage);
  return dataFromStorage;
};




/***/ }),

/***/ "./src/test/test_all.js":
/*!******************************!*\
  !*** ./src/test/test_all.js ***!
  \******************************/
/*! exports provided: test_all */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test_all", function() { return test_all; });
/* harmony import */ var _test_renderHour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test_renderHour */ "./src/test/test_renderHour.js");
/* harmony import */ var _test_renderAllHoursPerDay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_renderAllHoursPerDay */ "./src/test/test_renderAllHoursPerDay.js");
/* harmony import */ var _test_renderDayOverview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test_renderDayOverview */ "./src/test/test_renderDayOverview.js");




function test_all() {
  // test_renderHour();
  Object(_test_renderAllHoursPerDay__WEBPACK_IMPORTED_MODULE_1__["test_renderAllHoursPerDay"])();
  // test_renderDayOverview();
}




/***/ }),

/***/ "./src/test/test_dummy_data.js":
/*!*************************************!*\
  !*** ./src/test/test_dummy_data.js ***!
  \*************************************/
/*! exports provided: weatherData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weatherData", function() { return weatherData; });
// Dummy data
// weatherData.currently.time is Mon Sep 30 2019 16:52:06
// weatherData.hourly.data[0].time is Mon Sep 30 2019 16:00:00
// weatherData.hourly.data[1].time is Mon Sep 30 2019 17:00:00
// weatherData.hourly.data[2].time is Mon Sep 30 2019 18:00:00
// ...

//weatherData.daily.data[0].time is Mon Sep 30 2019 00:00:00
//weatherData.daily.data[1].time is Tue Oct 01 2019 00:00:00
//weatherData.daily.data[2].time is Wed Oct 02 2019 00:00:00
// ...

const weatherData = {
  "latitude": 37.3914086,
  "longitude": -122.00416789999998,
  "timezone": "America/Los_Angeles",
  "currently": {
    "time": 1569887526,
    "summary": "Partly Cloudy",
    "icon": "partly-cloudy-day",
    "nearestStormDistance": 31,
    "nearestStormBearing": 148,
    "precipIntensity": 0,
    "precipProbability": 0,
    "temperature": 64.85,
    "apparentTemperature": 64.85,
    "dewPoint": 36.08,
    "humidity": 0.34,
    "pressure": 1016.01,
    "windSpeed": 7.8,
    "windGust": 16.67,
    "windBearing": 296,
    "cloudCover": 0.15,
    "uvIndex": 1,
    "visibility": 8.499,
    "ozone": 329.1
  },
  "hourly": {
    "summary": "Partly cloudy throughout the day.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1569884400,
        "summary": "Partly Cloudy",
        "icon": "partly-cloudy-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 65.39,
        "apparentTemperature": 65.39,
        "dewPoint": 33.55,
        "humidity": 0.31,
        "pressure": 1015.24,
        "windSpeed": 7.57,
        "windGust": 14.59,
        "windBearing": 298,
        "cloudCover": 0.15,
        "uvIndex": 2,
        "visibility": 9.926,
        "ozone": 331.3
      },
      {
        "time": 1569888000,
        "summary": "Partly Cloudy",
        "icon": "partly-cloudy-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 64.67,
        "apparentTemperature": 64.67,
        "dewPoint": 36.34,
        "humidity": 0.35,
        "pressure": 1016.05,
        "windSpeed": 7.79,
        "windGust": 16.86,
        "windBearing": 296,
        "cloudCover": 0.15,
        "uvIndex": 1,
        "visibility": 8.372,
        "ozone": 329.1
      },
      {
        "time": 1569891600,
        "summary": "Partly Cloudy",
        "icon": "partly-cloudy-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 62.75,
        "apparentTemperature": 62.75,
        "dewPoint": 36.53,
        "humidity": 0.38,
        "pressure": 1015.4,
        "windSpeed": 7.25,
        "windGust": 16.61,
        "windBearing": 288,
        "cloudCover": 0.13,
        "uvIndex": 0,
        "visibility": 8.573,
        "ozone": 333.7
      },
      {
        "time": 1569895200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.52,
        "apparentTemperature": 60.52,
        "dewPoint": 40.17,
        "humidity": 0.47,
        "pressure": 1016.02,
        "windSpeed": 7.17,
        "windGust": 15.17,
        "windBearing": 294,
        "cloudCover": 0.05,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 334.6
      },
      {
        "time": 1569898800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0018,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 57.85,
        "apparentTemperature": 57.85,
        "dewPoint": 43.28,
        "humidity": 0.58,
        "pressure": 1016.21,
        "windSpeed": 6.84,
        "windGust": 14.49,
        "windBearing": 301,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 329.7
      },
      {
        "time": 1569902400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0002,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 55.67,
        "apparentTemperature": 55.67,
        "dewPoint": 43.58,
        "humidity": 0.64,
        "pressure": 1016.14,
        "windSpeed": 5.45,
        "windGust": 12.02,
        "windBearing": 311,
        "cloudCover": 0.04,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 332.7
      },
      {
        "time": 1569906000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.03,
        "apparentTemperature": 54.03,
        "dewPoint": 43.88,
        "humidity": 0.68,
        "pressure": 1016.05,
        "windSpeed": 4.08,
        "windGust": 8.7,
        "windBearing": 284,
        "cloudCover": 0.06,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 329.9
      },
      {
        "time": 1569909600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0002,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 52.74,
        "apparentTemperature": 52.74,
        "dewPoint": 43.99,
        "humidity": 0.72,
        "pressure": 1016.17,
        "windSpeed": 3.43,
        "windGust": 6.82,
        "windBearing": 273,
        "cloudCover": 0.06,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 325.4
      },
      {
        "time": 1569913200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 51.63,
        "apparentTemperature": 51.63,
        "dewPoint": 43.76,
        "humidity": 0.74,
        "pressure": 1015.9,
        "windSpeed": 2.93,
        "windGust": 5.9,
        "windBearing": 273,
        "cloudCover": 0.06,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 325.6
      },
      {
        "time": 1569916800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 50.52,
        "apparentTemperature": 50.52,
        "dewPoint": 43.52,
        "humidity": 0.77,
        "pressure": 1015.67,
        "windSpeed": 2.52,
        "windGust": 4.79,
        "windBearing": 261,
        "cloudCover": 0.07,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 324.1
      },
      {
        "time": 1569920400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 49.69,
        "apparentTemperature": 49.69,
        "dewPoint": 43.31,
        "humidity": 0.79,
        "pressure": 1015.74,
        "windSpeed": 2.34,
        "windGust": 4.06,
        "windBearing": 267,
        "cloudCover": 0.08,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 323.8
      },
      {
        "time": 1569924000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 48.74,
        "apparentTemperature": 48.74,
        "dewPoint": 43.05,
        "humidity": 0.81,
        "pressure": 1015.5,
        "windSpeed": 2.26,
        "windGust": 3.12,
        "windBearing": 340,
        "cloudCover": 0.06,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 323
      },
      {
        "time": 1569927600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0004,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperature": 47.86,
        "apparentTemperature": 47.86,
        "dewPoint": 42.81,
        "humidity": 0.83,
        "pressure": 1015.64,
        "windSpeed": 2.47,
        "windGust": 3.18,
        "windBearing": 226,
        "cloudCover": 0.05,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 323.6
      },
      {
        "time": 1569931200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0005,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperature": 46.92,
        "apparentTemperature": 46.92,
        "dewPoint": 42.7,
        "humidity": 0.85,
        "pressure": 1015.75,
        "windSpeed": 2.7,
        "windGust": 3.33,
        "windBearing": 217,
        "cloudCover": 0.05,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 321.8
      },
      {
        "time": 1569934800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 45.91,
        "apparentTemperature": 45.91,
        "dewPoint": 42.62,
        "humidity": 0.88,
        "pressure": 1015.47,
        "windSpeed": 2.73,
        "windGust": 3.2,
        "windBearing": 193,
        "cloudCover": 0.04,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 320.1
      },
      {
        "time": 1569938400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 45.27,
        "apparentTemperature": 45.27,
        "dewPoint": 43.24,
        "humidity": 0.93,
        "pressure": 1015.8,
        "windSpeed": 2.16,
        "windGust": 2.54,
        "windBearing": 61,
        "cloudCover": 0.04,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 316.1
      },
      {
        "time": 1569942000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 46.57,
        "apparentTemperature": 46.57,
        "dewPoint": 43.61,
        "humidity": 0.89,
        "pressure": 1015.64,
        "windSpeed": 2.15,
        "windGust": 2.63,
        "windBearing": 71,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 312.6
      },
      {
        "time": 1569945600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 50.43,
        "apparentTemperature": 50.43,
        "dewPoint": 44.2,
        "humidity": 0.79,
        "pressure": 1015.88,
        "windSpeed": 2.38,
        "windGust": 3.64,
        "windBearing": 40,
        "cloudCover": 0,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 310.2
      },
      {
        "time": 1569949200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 55.93,
        "apparentTemperature": 55.93,
        "dewPoint": 43.43,
        "humidity": 0.63,
        "pressure": 1016.03,
        "windSpeed": 3.05,
        "windGust": 5.67,
        "windBearing": 342,
        "cloudCover": 0,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 308.4
      },
      {
        "time": 1569952800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.92,
        "apparentTemperature": 60.92,
        "dewPoint": 42.7,
        "humidity": 0.51,
        "pressure": 1016.01,
        "windSpeed": 4.14,
        "windGust": 7.4,
        "windBearing": 319,
        "cloudCover": 0,
        "uvIndex": 4,
        "visibility": 10,
        "ozone": 306.3
      },
      {
        "time": 1569956400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 64.37,
        "apparentTemperature": 64.37,
        "dewPoint": 40.66,
        "humidity": 0.42,
        "pressure": 1015.86,
        "windSpeed": 5.55,
        "windGust": 8.34,
        "windBearing": 312,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 303.3
      },
      {
        "time": 1569960000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 67.58,
        "apparentTemperature": 67.58,
        "dewPoint": 38.8,
        "humidity": 0.35,
        "pressure": 1015.57,
        "windSpeed": 7.1,
        "windGust": 8.98,
        "windBearing": 310,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 300.1
      },
      {
        "time": 1569963600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 69.64,
        "apparentTemperature": 69.64,
        "dewPoint": 37.6,
        "humidity": 0.31,
        "pressure": 1015.46,
        "windSpeed": 8.28,
        "windGust": 9.69,
        "windBearing": 312,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 297.3
      },
      {
        "time": 1569967200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 70.74,
        "apparentTemperature": 70.74,
        "dewPoint": 37.01,
        "humidity": 0.29,
        "pressure": 1014.93,
        "windSpeed": 9.06,
        "windGust": 10.71,
        "windBearing": 306,
        "cloudCover": 0,
        "uvIndex": 4,
        "visibility": 10,
        "ozone": 295.1
      },
      {
        "time": 1569970800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 70.89,
        "apparentTemperature": 70.89,
        "dewPoint": 37.12,
        "humidity": 0.29,
        "pressure": 1014.48,
        "windSpeed": 9.57,
        "windGust": 11.77,
        "windBearing": 303,
        "cloudCover": 0,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 293.3
      },
      {
        "time": 1569974400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 69.94,
        "apparentTemperature": 69.94,
        "dewPoint": 38.27,
        "humidity": 0.31,
        "pressure": 1014.36,
        "windSpeed": 9.52,
        "windGust": 12.25,
        "windBearing": 308,
        "cloudCover": 0,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 292.1
      },
      {
        "time": 1569978000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 67.3,
        "apparentTemperature": 67.3,
        "dewPoint": 39.87,
        "humidity": 0.37,
        "pressure": 1014.59,
        "windSpeed": 8.3,
        "windGust": 11.91,
        "windBearing": 342,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.6
      },
      {
        "time": 1569981600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 63.91,
        "apparentTemperature": 63.91,
        "dewPoint": 41.92,
        "humidity": 0.45,
        "pressure": 1015.57,
        "windSpeed": 6.29,
        "windGust": 10.96,
        "windBearing": 252,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.7
      },
      {
        "time": 1569985200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 59.56,
        "apparentTemperature": 59.56,
        "dewPoint": 43.1,
        "humidity": 0.54,
        "pressure": 1016.07,
        "windSpeed": 4.6,
        "windGust": 9.59,
        "windBearing": 290,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292
      },
      {
        "time": 1569988800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 57.03,
        "apparentTemperature": 57.03,
        "dewPoint": 43.53,
        "humidity": 0.61,
        "pressure": 1016.56,
        "windSpeed": 3.37,
        "windGust": 7.59,
        "windBearing": 290,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292.2
      },
      {
        "time": 1569992400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 55.14,
        "apparentTemperature": 55.14,
        "dewPoint": 44.01,
        "humidity": 0.66,
        "pressure": 1016.47,
        "windSpeed": 2.52,
        "windGust": 5.2,
        "windBearing": 246,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292.7
      },
      {
        "time": 1569996000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 53.7,
        "apparentTemperature": 53.7,
        "dewPoint": 44.38,
        "humidity": 0.71,
        "pressure": 1016.77,
        "windSpeed": 2.14,
        "windGust": 3.38,
        "windBearing": 210,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292.7
      },
      {
        "time": 1569999600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 52.26,
        "apparentTemperature": 52.26,
        "dewPoint": 44.31,
        "humidity": 0.74,
        "pressure": 1017.18,
        "windSpeed": 2.13,
        "windGust": 2.72,
        "windBearing": 187,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292.1
      },
      {
        "time": 1570003200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 51.05,
        "apparentTemperature": 51.05,
        "dewPoint": 44.1,
        "humidity": 0.77,
        "pressure": 1016.58,
        "windSpeed": 2.11,
        "windGust": 2.53,
        "windBearing": 192,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.4
      },
      {
        "time": 1570006800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 50.29,
        "apparentTemperature": 50.29,
        "dewPoint": 43.84,
        "humidity": 0.78,
        "pressure": 1016.43,
        "windSpeed": 2.13,
        "windGust": 2.42,
        "windBearing": 178,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 290.8
      },
      {
        "time": 1570010400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 49.53,
        "apparentTemperature": 49.53,
        "dewPoint": 43.62,
        "humidity": 0.8,
        "pressure": 1016.81,
        "windSpeed": 2.08,
        "windGust": 2.35,
        "windBearing": 152,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 290.7
      },
      {
        "time": 1570014000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 48.61,
        "apparentTemperature": 48.61,
        "dewPoint": 43.35,
        "humidity": 0.82,
        "pressure": 1016.63,
        "windSpeed": 2,
        "windGust": 2.29,
        "windBearing": 76,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 290.8
      },
      {
        "time": 1570017600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 47.87,
        "apparentTemperature": 47.87,
        "dewPoint": 43.48,
        "humidity": 0.85,
        "pressure": 1016.72,
        "windSpeed": 1.93,
        "windGust": 2.24,
        "windBearing": 153,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.4
      },
      {
        "time": 1570021200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 47.38,
        "apparentTemperature": 47.38,
        "dewPoint": 43.23,
        "humidity": 0.85,
        "pressure": 1017.01,
        "windSpeed": 1.85,
        "windGust": 2.06,
        "windBearing": 94,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 292.5
      },
      {
        "time": 1570024800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 47.08,
        "apparentTemperature": 47.08,
        "dewPoint": 42.96,
        "humidity": 0.86,
        "pressure": 1017.43,
        "windSpeed": 1.76,
        "windGust": 1.87,
        "windBearing": 107,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 294.1
      },
      {
        "time": 1570028400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 48.67,
        "apparentTemperature": 48.67,
        "dewPoint": 42.93,
        "humidity": 0.8,
        "pressure": 1017.42,
        "windSpeed": 1.74,
        "windGust": 1.95,
        "windBearing": 94,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 294.8
      },
      {
        "time": 1570032000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.23,
        "apparentTemperature": 54.23,
        "dewPoint": 42.35,
        "humidity": 0.64,
        "pressure": 1017.72,
        "windSpeed": 1.78,
        "windGust": 2.45,
        "windBearing": 56,
        "cloudCover": 0,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 294
      },
      {
        "time": 1570035600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.08,
        "apparentTemperature": 60.08,
        "dewPoint": 41.05,
        "humidity": 0.49,
        "pressure": 1017.91,
        "windSpeed": 2.3,
        "windGust": 3.97,
        "windBearing": 351,
        "cloudCover": 0,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 292.3
      },
      {
        "time": 1570039200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 65.53,
        "apparentTemperature": 65.53,
        "dewPoint": 39.3,
        "humidity": 0.38,
        "pressure": 1017.85,
        "windSpeed": 3.08,
        "windGust": 5.35,
        "windBearing": 325,
        "cloudCover": 0,
        "uvIndex": 4,
        "visibility": 10,
        "ozone": 290.9
      },
      {
        "time": 1570042800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 69.27,
        "apparentTemperature": 69.27,
        "dewPoint": 36.07,
        "humidity": 0.29,
        "pressure": 1017.43,
        "windSpeed": 4.26,
        "windGust": 6.28,
        "windBearing": 319,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 289.8
      },
      {
        "time": 1570046400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 72.89,
        "apparentTemperature": 72.89,
        "dewPoint": 32.4,
        "humidity": 0.23,
        "pressure": 1016.67,
        "windSpeed": 5.74,
        "windGust": 7.1,
        "windBearing": 319,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 288.8
      },
      {
        "time": 1570050000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 75.72,
        "apparentTemperature": 75.72,
        "dewPoint": 30.68,
        "humidity": 0.19,
        "pressure": 1015.92,
        "windSpeed": 7.01,
        "windGust": 8.12,
        "windBearing": 319,
        "cloudCover": 0,
        "uvIndex": 6,
        "visibility": 10,
        "ozone": 288.1
      },
      {
        "time": 1570053600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 77.08,
        "apparentTemperature": 77.08,
        "dewPoint": 29.14,
        "humidity": 0.17,
        "pressure": 1015.26,
        "windSpeed": 8.08,
        "windGust": 9.8,
        "windBearing": 318,
        "cloudCover": 0,
        "uvIndex": 4,
        "visibility": 10,
        "ozone": 288
      },
      {
        "time": 1570057200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 76.96,
        "apparentTemperature": 76.96,
        "dewPoint": 29.96,
        "humidity": 0.18,
        "pressure": 1014.96,
        "windSpeed": 9.05,
        "windGust": 11.64,
        "windBearing": 315,
        "cloudCover": 0,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 288.3
      }
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures rising to 85°F on Sunday.",
    "icon": "clear-day",
    "data": [
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
      },
      {
        "time": 1569913200,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1569938683,
        "sunsetTime": 1569981177,
        "moonPhase": 0.13,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0005,
        "precipIntensityMaxTime": 1569931200,
        "precipProbability": 0.03,
        "precipType": "rain",
        "temperatureHigh": 71.56,
        "temperatureHighTime": 1569970800,
        "temperatureLow": 46.43,
        "temperatureLowTime": 1570024800,
        "apparentTemperatureHigh": 70.89,
        "apparentTemperatureHighTime": 1569970800,
        "apparentTemperatureLow": 47.08,
        "apparentTemperatureLowTime": 1570024800,
        "dewPoint": 41.98,
        "humidity": 0.62,
        "pressure": 1015.72,
        "windSpeed": 4.41,
        "windGust": 12.25,
        "windGustTime": 1569974400,
        "windBearing": 303,
        "cloudCover": 0.02,
        "uvIndex": 6,
        "uvIndexTime": 1569960000,
        "visibility": 10,
        "ozone": 305.7,
        "temperatureMin": 44.62,
        "temperatureMinTime": 1569938400,
        "temperatureMax": 71.56,
        "temperatureMaxTime": 1569970800,
        "apparentTemperatureMin": 45.27,
        "apparentTemperatureMinTime": 1569938400,
        "apparentTemperatureMax": 70.89,
        "apparentTemperatureMaxTime": 1569970800
      },
      {
        "time": 1569999600,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570025135,
        "sunsetTime": 1570067486,
        "moonPhase": 0.17,
        "precipIntensity": 0,
        "precipIntensityMax": 0,
        "precipIntensityMaxTime": 1570060800,
        "precipProbability": 0,
        "temperatureHigh": 77.75,
        "temperatureHighTime": 1570053600,
        "temperatureLow": 47.36,
        "temperatureLowTime": 1570111200,
        "apparentTemperatureHigh": 77.08,
        "apparentTemperatureHighTime": 1570053600,
        "apparentTemperatureLow": 48.01,
        "apparentTemperatureLowTime": 1570111200,
        "dewPoint": 40.37,
        "humidity": 0.55,
        "pressure": 1016.46,
        "windSpeed": 3.88,
        "windGust": 12.58,
        "windGustTime": 1570060800,
        "windBearing": 311,
        "cloudCover": 0,
        "uvIndex": 6,
        "uvIndexTime": 1570046400,
        "visibility": 10,
        "ozone": 289.6,
        "temperatureMin": 46.43,
        "temperatureMinTime": 1570024800,
        "temperatureMax": 77.75,
        "temperatureMaxTime": 1570053600,
        "apparentTemperatureMin": 47.08,
        "apparentTemperatureMinTime": 1570024800,
        "apparentTemperatureMax": 77.08,
        "apparentTemperatureMaxTime": 1570053600
      },
      {
        "time": 1570086000,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570111586,
        "sunsetTime": 1570153795,
        "moonPhase": 0.2,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0003,
        "precipIntensityMaxTime": 1570168800,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperatureHigh": 74.62,
        "temperatureHighTime": 1570140000,
        "temperatureLow": 47.98,
        "temperatureLowTime": 1570197600,
        "apparentTemperatureHigh": 73.95,
        "apparentTemperatureHighTime": 1570140000,
        "apparentTemperatureLow": 48.63,
        "apparentTemperatureLowTime": 1570197600,
        "dewPoint": 44.83,
        "humidity": 0.62,
        "pressure": 1016.06,
        "windSpeed": 4.6,
        "windGust": 12.03,
        "windGustTime": 1570147200,
        "windBearing": 285,
        "cloudCover": 0,
        "uvIndex": 6,
        "uvIndexTime": 1570132800,
        "visibility": 10,
        "ozone": 287.1,
        "temperatureMin": 47.36,
        "temperatureMinTime": 1570111200,
        "temperatureMax": 74.62,
        "temperatureMaxTime": 1570140000,
        "apparentTemperatureMin": 48.01,
        "apparentTemperatureMinTime": 1570111200,
        "apparentTemperatureMax": 73.95,
        "apparentTemperatureMaxTime": 1570140000
      },
      {
        "time": 1570172400,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570198038,
        "sunsetTime": 1570240105,
        "moonPhase": 0.23,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0004,
        "precipIntensityMaxTime": 1570233600,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperatureHigh": 81.13,
        "temperatureHighTime": 1570226400,
        "temperatureLow": 52.73,
        "temperatureLowTime": 1570284000,
        "apparentTemperatureHigh": 80.46,
        "apparentTemperatureHighTime": 1570226400,
        "apparentTemperatureLow": 53.38,
        "apparentTemperatureLowTime": 1570284000,
        "dewPoint": 38.01,
        "humidity": 0.46,
        "pressure": 1017.92,
        "windSpeed": 3.13,
        "windGust": 9.55,
        "windGustTime": 1570233600,
        "windBearing": 337,
        "cloudCover": 0.05,
        "uvIndex": 6,
        "uvIndexTime": 1570219200,
        "visibility": 10,
        "ozone": 289.1,
        "temperatureMin": 47.98,
        "temperatureMinTime": 1570197600,
        "temperatureMax": 81.13,
        "temperatureMaxTime": 1570226400,
        "apparentTemperatureMin": 48.63,
        "apparentTemperatureMinTime": 1570197600,
        "apparentTemperatureMax": 80.46,
        "apparentTemperatureMaxTime": 1570226400
      },
      {
        "time": 1570258800,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570284491,
        "sunsetTime": 1570326415,
        "moonPhase": 0.27,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0004,
        "precipIntensityMaxTime": 1570287600,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperatureHigh": 84.18,
        "temperatureHighTime": 1570316400,
        "temperatureLow": 55.45,
        "temperatureLowTime": 1570370400,
        "apparentTemperatureHigh": 83.51,
        "apparentTemperatureHighTime": 1570316400,
        "apparentTemperatureLow": 56.1,
        "apparentTemperatureLowTime": 1570370400,
        "dewPoint": 32.3,
        "humidity": 0.31,
        "pressure": 1016.73,
        "windSpeed": 2.28,
        "windGust": 6.99,
        "windGustTime": 1570327200,
        "windBearing": 354,
        "cloudCover": 0,
        "uvIndex": 6,
        "uvIndexTime": 1570305600,
        "visibility": 10,
        "ozone": 280.5,
        "temperatureMin": 52.73,
        "temperatureMinTime": 1570284000,
        "temperatureMax": 84.18,
        "temperatureMaxTime": 1570316400,
        "apparentTemperatureMin": 53.38,
        "apparentTemperatureMinTime": 1570284000,
        "apparentTemperatureMax": 83.51,
        "apparentTemperatureMaxTime": 1570316400
      },
      {
        "time": 1570345200,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570370943,
        "sunsetTime": 1570412726,
        "moonPhase": 0.3,
        "precipIntensity": 0,
        "precipIntensityMax": 0,
        "precipIntensityMaxTime": 1570431600,
        "precipProbability": 0,
        "temperatureHigh": 86.16,
        "temperatureHighTime": 1570399200,
        "temperatureLow": 55.39,
        "temperatureLowTime": 1570456800,
        "apparentTemperatureHigh": 85.49,
        "apparentTemperatureHighTime": 1570399200,
        "apparentTemperatureLow": 56.04,
        "apparentTemperatureLowTime": 1570456800,
        "dewPoint": 38.83,
        "humidity": 0.36,
        "pressure": 1014.42,
        "windSpeed": 2.16,
        "windGust": 7.43,
        "windGustTime": 1570406400,
        "windBearing": 290,
        "cloudCover": 0,
        "uvIndex": 6,
        "uvIndexTime": 1570392000,
        "visibility": 10,
        "ozone": 279,
        "temperatureMin": 55.45,
        "temperatureMinTime": 1570370400,
        "temperatureMax": 86.16,
        "temperatureMaxTime": 1570399200,
        "apparentTemperatureMin": 56.1,
        "apparentTemperatureMinTime": 1570370400,
        "apparentTemperatureMax": 85.49,
        "apparentTemperatureMaxTime": 1570399200
      },
      {
        "time": 1570431600,
        "summary": "Partly cloudy throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1570457396,
        "sunsetTime": 1570499037,
        "moonPhase": 0.33,
        "precipIntensity": 0.0007,
        "precipIntensityMax": 0.0029,
        "precipIntensityMaxTime": 1570438800,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperatureHigh": 83.46,
        "temperatureHighTime": 1570485600,
        "temperatureLow": 51.62,
        "temperatureLowTime": 1570543200,
        "apparentTemperatureHigh": 82.79,
        "apparentTemperatureHighTime": 1570485600,
        "apparentTemperatureLow": 52.27,
        "apparentTemperatureLowTime": 1570543200,
        "dewPoint": 50.61,
        "humidity": 0.58,
        "pressure": 1013.53,
        "windSpeed": 2.62,
        "windGust": 8.09,
        "windGustTime": 1570492800,
        "windBearing": 298,
        "cloudCover": 0.19,
        "uvIndex": 6,
        "uvIndexTime": 1570478400,
        "visibility": 10,
        "ozone": 268.1,
        "temperatureMin": 55.39,
        "temperatureMinTime": 1570456800,
        "temperatureMax": 83.46,
        "temperatureMaxTime": 1570485600,
        "apparentTemperatureMin": 56.04,
        "apparentTemperatureMinTime": 1570456800,
        "apparentTemperatureMax": 82.79,
        "apparentTemperatureMaxTime": 1570485600
      }
    ]
  },
  "flags": {
    "sources": [
      "nwspa",
      "cmc",
      "gfs",
      "hrrr",
      "icon",
      "isd",
      "madis",
      "nam",
      "sref",
      "darksky",
      "nearest-precip"
    ],
    "nearest-station": 2.613,
    "units": "us"
  },
  "offset": -7
};





/***/ }),

/***/ "./src/test/test_renderAllHoursPerDay.js":
/*!***********************************************!*\
  !*** ./src/test/test_renderAllHoursPerDay.js ***!
  \***********************************************/
/*! exports provided: test_renderAllHoursPerDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test_renderAllHoursPerDay", function() { return test_renderAllHoursPerDay; });
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderers */ "./src/renderers.js");
/* harmony import */ var _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_dummy_data */ "./src/test/test_dummy_data.js");



function test_renderAllHoursPerDay() {
  const content = Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderAllHoursPerDay"])(_test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"]);
  console.log(content);
}

window.test_renderAllHoursPerDay = test_renderAllHoursPerDay;




/***/ }),

/***/ "./src/test/test_renderDayOverview.js":
/*!********************************************!*\
  !*** ./src/test/test_renderDayOverview.js ***!
  \********************************************/
/*! exports provided: test_renderDayOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test_renderDayOverview", function() { return test_renderDayOverview; });
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderers */ "./src/renderers.js");
/* harmony import */ var _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_dummy_data */ "./src/test/test_dummy_data.js");



function test_renderDayOverview() {
  const today = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].currently;
  const day = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].daily.data[1];

  let content = "";
  content += Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderDayOverview"])(today);
  content += Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderDayOverview"])(day);
  console.log(content);
}

window.test_renderDayOverview = test_renderDayOverview;




/***/ }),

/***/ "./src/test/test_renderHour.js":
/*!*************************************!*\
  !*** ./src/test/test_renderHour.js ***!
  \*************************************/
/*! exports provided: test_renderHour */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test_renderHour", function() { return test_renderHour; });
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderers */ "./src/renderers.js");
/* harmony import */ var _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_dummy_data */ "./src/test/test_dummy_data.js");



function test_renderHour() {
  const hourData = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].hourly.data[1];

  const content = Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderHour"])(hourData);

  console.log(content);
}

// Make this function available in Chrome Dev Tools by making it a global.
window.test_renderHour = test_renderHour;




/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map