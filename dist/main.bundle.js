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



var askLocation = function askLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lng = position.coords.longitude;
      var lat = position.coords.latitude; // Save the lat, lng pair to LocalStorage for use later.

      Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LAT, lat);
      Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LNG, lng); // Fetch data from DarkSky API.

      getWeatherDataNow(lat, lng);
    });
  } else {
    // TODO: If current location denied, show a pop up describing how to grant
    //  access & why.
    window.alert("TODO: show pop up describing how to grant access & why");
  }
};

var getWeatherDataNow = function getWeatherDataNow(lat, lng) {
  if (!lat || !lng) {
    console.warn("Can't get weather, since null arguments were" + " passed for lat or lng!");
    return;
  }

  var API_KEY = '6eae3396dc3311cb103d2f86f03d5775';
  var url = "https://api.darksky.net/forecast/".concat(API_KEY, "/").concat(lat, ",").concat(lng, "?exclude=minutely");
  var corsFreeUrl = "https://cors-anywhere.herokuapp.com/".concat(url);
  fetch(corsFreeUrl).then(function (response) {
    return response.json();
  }).then(function (weatherData) {
    //callback(myJson);
    Object(_storage__WEBPACK_IMPORTED_MODULE_0__["save"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].WEATHER_DATA, weatherData);
    Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["paintWeatherToViewport"])(weatherData);
  })["catch"](function (reason) {
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




var attachListeners = function attachListeners() {
  var myLocationIcon = document.querySelector('#my-location');
  myLocationIcon.addEventListener('click', _data__WEBPACK_IMPORTED_MODULE_0__["askLocation"]);
  myLocationIcon.addEventListener('mouseover', _paint_ui__WEBPACK_IMPORTED_MODULE_1__["showPopUp"]);
  myLocationIcon.addEventListener('mouseout', _paint_ui__WEBPACK_IMPORTED_MODULE_1__["hidePopUp"]);
};

var main = function main() {
  attachListeners();
  Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["paintEmptyLandingPage"])();
  Object(_paint_ui__WEBPACK_IMPORTED_MODULE_1__["addClickEventListeners"])();
};

main(); // test_all();
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



var showPopUp = function showPopUp() {
  var popUp = document.querySelector('#pop-up');
  popUp.style.display = 'block';
};

var hidePopUp = function hidePopUp() {
  var popUp = document.querySelector('#pop-up');
  popUp.style.display = 'none';
};

var paintEmptyLandingPage = function paintEmptyLandingPage() {
  var weatherData = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].WEATHER_DATA);

  if (weatherData) {
    // Found weather data in local storage, so paint it.
    paintWeatherToViewport(weatherData); // Refresh the weather for the location saved in localStorage.

    var lat = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LAT);
    var lng = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["load"])(_storage__WEBPACK_IMPORTED_MODULE_0__["LOCATIONS"].LNG);
    Object(_data__WEBPACK_IMPORTED_MODULE_1__["getWeatherDataNow"])(lat, lng);
  } else {
    // There is no weather data stored in localStorage, so paint empty state.
    console.log("No weather data available yet.");
    deleteElementBySelector('#empty-state');
    var body = document.querySelector('body');
    var emptyStateContainer = document.createElement('div');
    emptyStateContainer.setAttribute('id', 'empty-state');
    body.prepend(emptyStateContainer);
    emptyStateContainer.innerHTML = "\n      <h1>Welcome</h1>\n      <h2>Search a location below and the <br>weather will appear here.</h2>\n      <div id=\"pop-up\">\n        <h3>Get weather for current location</h3>\n        <p class=\"space\">After clicking\n          <i class=\"material-icons location-icon-text\">my_location</i>, the\n        browser will ask for your permission to know your location. Click\n        \u201CAllow\u201D to be able to get\n        weather for current location.</p>\n        <img src=\"images/allow_access.svg\" alt=\"Allow browser access location\">\n        <div id=\"pop-up-arrow\"></div>\n      </div>\n    ";
  }
}; // TODO: do something meaning w/ this in the future


var getHour = function getHour(unixTimestamp) {
  var date = new Date(unixTimestamp * 1000);
  var hours = date.getHours(); // Every hour fetch data again.
}; // TODO: Actually use weatherData to paint the UI (currently dummy data is
//  painted)


var paintWeatherToViewport = function paintWeatherToViewport() {
  // Delete empty state design
  deleteElementBySelector('#empty-state');
  deleteElementBySelector('#all-weather-container'); // Paint new interface

  var body = document.querySelector('body');
  var allWeatherContainer = document.createElement('div');
  allWeatherContainer.setAttribute('id', 'all-weather-container');
  allWeatherContainer.style.display = 'flex';
  body.prepend(allWeatherContainer); // Make a loop to paint as many days as I have the data.

  allWeatherContainer.innerHTML = "\n    <div class=\"day-weather-container\">\n\n    <div class=\"overview-container\">\n      <h2 class=\"day-header\">Now</h2>\n      <img class=\"large-icon\" src=\"images/sun.svg\">\n      <div class=\"temperatures-container-large\">\n        <p class=\"selected-temp\">10<span class=\"c-temp\">&#8451;</span></p>\n        <p class=\"not-selected-temp\">50<span class=\"f-temp\">&#8457;</span></p>\n      </div>\n    </div>\n    \n    <div class=\"all-hours-container\">\n\n      <div class=\"hour-container\">\n        <div class=\"hour-summary\">\n          <p>Now</p>\n          <img class=\"small-icon\" src=\"images/small_sun.svg\">\n          <p>10<span>&#176;</span>/50<span>&#176;</span></p>\n        </div>\n\n        <div class=\"hour-details\">\n          <div class=\"left-col\">\n            <p>Wind</p>\n            <p class=\"p-space\">UV index</p>\n            <p>Humidity</p>\n            <p>Dew point</p>\n            <p class=\"p-space\">Precipitation</p>\n            <p>Sunrise</p>\n            <p>Sunset</p>\n          </div>\n          <div class=\"right-col\">\n            <p>Moderate (24km/h)</p>\n            <p class=\"p-space\">Very high (10)</p>\n            <p>50%</p>\n            <p>14C</p>\n            <p class=\"p-space\">0%</p>\n            <p>6:05 AM</p>\n            <p>8:23 PM</p>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n  ";
};

var deleteElementBySelector = function deleteElementBySelector(selector) {
  if (!selector) {
    return;
  }

  var divToRemove = document.querySelector(selector);

  if (!divToRemove) {
    return;
  }

  divToRemove.parentNode.removeChild(divToRemove);
};

function showWeatherDetails() {
  console.log("Show weather details is working");
  var hourDetails = this.querySelector('.hour-details');
  hourDetails.classList.toggle('hour-details-accordion');
  var hourContainer = document.querySelector('.hour-container');
  console.log(hourContainer);
  hourContainer.classList.toggle('inner-shadow');
}

var addClickEventListeners = function addClickEventListeners() {
  var hourContainers = document.querySelectorAll('.hour-container')[0];
  hourContainers.addEventListener('click', function () {
    console.log("Click" + " event listener is working!!!!!");
  }); // for (const container of hourContainers) {
  //   container.addEventListener('click', showWeatherDetails);
  // }
};



/***/ }),

/***/ "./src/renderers.js":
/*!**************************!*\
  !*** ./src/renderers.js ***!
  \**************************/
/*! exports provided: renderHour, renderAllHoursPerDay, renderDayOverview, renderDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHour", function() { return renderHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAllHoursPerDay", function() { return renderAllHoursPerDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDayOverview", function() { return renderDayOverview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDay", function() { return renderDay; });
/* harmony import */ var _test_test_dummy_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test/test_dummy_data */ "./src/test/test_dummy_data.js");


var f2c = function f2c(f) {
  return Math.round((f - 32) * 5 / 9);
}; // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript


var calcTime = function calcTime(unixTime) {
  var date = new Date(unixTime * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes(); // If hours is more than 12, then it's PM, else it's AM.

  if (hours > 12) {
    return "".concat(hours - 12, ":").concat(minutes.substring(minutes.length - 2), " PM");
  } else if (hours === 12) {
    return "".concat(hours, ":").concat(minutes.substring(minutes.length - 2), " PM");
  } else {
    return "".concat(hours, ":").concat(minutes.substring(minutes.length - 2), " AM");
  }
};

var calcHour = function calcHour(unixTime) {
  var date = new Date(unixTime * 1000);
  var hours = date.getHours(); // If hours is more than 12, then it's PM, else it's AM.

  if (hours > 12) {
    return "".concat(hours - 12, " PM");
  } else if (hours === 12) {
    return "".concat(hours, " PM");
  } else {
    return "".concat(hours, " AM");
  }
};

var getCurrentHour = function getCurrentHour(unixTime) {
  var date = new Date(unixTime * 1000);
  var hours = date.getHours();
  return hours;
};

var formatDate = function formatDate(unixTime) {
  var date = new Date(unixTime * 1000);
  var dayIndex = date.getDay(); // returns 0 - 6. Sunday - Saturday : 0 - 6.

  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var day = dayNames[dayIndex];
  var monthIndex = date.getMonth();
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var month = monthNames[monthIndex];
  var dayOfMonth = date.getDate();
  return "".concat(day, ", ").concat(month, " ").concat(dayOfMonth);
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


var hour = 8;
var totalHoursLeft;

var renderDay = function renderDay(weatherData, index) {
  var content = '';

  function paintDayOverview() {
    // If it's day 1 (today), pass weatherData.currently to the function.
    // else pass weatherData.daily.data[1]
    if (hour === 0) {
      content += renderDayOverview(weatherData.currently);
    } else {
      content += renderDayOverview(weatherData.daily.data[index]);
    }
  }

  paintDayOverview(); // If no hours left..... don't print them

  if (weatherData.hourly.data) {
    content += renderAllHoursPerDay(weatherData);
  }

  return "<div class=\"day-weather-container\">".concat(content, "</div>");
};

var renderAllDays = function renderAllDays(weatherData) {
  // Put renderDay through a loop
  var dailyDataArray = weatherData.daily.data;
  dailyDataArray.map(renderDay(weatherData)).join('');
  console.log(dailyDataArray.map(renderDay(weatherData)).join(''));
}; // Pass either weatherData.currently or
// pass weatherData.daily.data


var renderDayOverview = function renderDayOverview(data) {
  var date = formatDate(data.time);
  var icon = data.icon;
  var rightTemperatureF = data.temperature ? Math.round(data.temperature) : Math.round(data.temperatureHigh);
  var rightTemperatureC = f2c(rightTemperatureF);
  return "\n    <div class=\"overview-container\">\n      <h2 class=\"day-header\">".concat(date, "</h2>\n      <img class=\"large-icon\" src=\"images/").concat(icon, "\">\n      <div class=\"temperatures-container-large\">\n        <p class=\"selected-temp\">").concat(rightTemperatureC, "<span class=\"c-temp\">&#8451;</span></p>\n        <p class=\"not-selected-temp\">").concat(rightTemperatureF, "<span class=\"f-temp\">&#8457;</span></p>\n      </div>\n    </div>\n  ");
}; // Render all hours for ONE day.


var renderAllHoursPerDay = function renderAllHoursPerDay(weatherData) {
  var hourArray = weatherData.hourly.data;
  var currentWeather = weatherData.currently;
  var content = "";
  totalHoursLeft = hourArray.length; //49

  console.log("Total hours left is = ".concat(totalHoursLeft)); // If it's a day 1, generate first hour with current weather data.

  if (hour === 0) {
    content += renderHour(currentWeather);
    hour++;
  } // Increment the current weather hour by 1, because we have already
  // printed the current weather hour on the viewport.


  var currentHour = hour === 1 ? getCurrentHour(currentWeather.time) + 1 : 0; //17

  console.log("Current hour is = ".concat(currentHour)); //17

  var hoursInADay = 24;
  var hoursLeftInADay = hoursInADay - currentHour; // 24-17 = 7

  console.log("Hours left in a day without doing anything yet = ".concat(hoursLeftInADay));

  for (var i = 0; i < hoursLeftInADay && hour < hourArray.length; i++) {
    content += renderHour(hourArray[hour]);
    hour++;
  }

  totalHoursLeft -= hoursLeftInADay;
  console.log("Total hours left is = ".concat(totalHoursLeft));
  console.log("All hours painted after the day(s) is = ".concat(hour));
  return "<div class=\"all-hours-container\">".concat(content, "</div>");
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
  var hourEvaluated = calcHour(hourData.time);
  var icon = hourData.icon;
  var temperatureF = Math.round(hourData.temperature);
  var temperatureC = f2c(temperatureF);
  var wind = hourData.windSpeed;
  var uvIndex = hourData.uvIndex;
  var humidity = hourData.humidity;
  var dewPoint = hourData.dewPoint;
  var precipitation = hourData.precipProbability; // const sunrise     = calcTime(dailyData.sunriseTime);
  // const sunset     = calcTime(dailyData.sunsetTime);

  var hourToPrint = hour === 0 ? "Now" : hourEvaluated;
  var content = "  \n      <div class=\"hour-container\">\n        <div class=\"hour-summary\">\n          <p>".concat(hourToPrint, "</p>\n          <img class=\"small-icon\" src=\"images/").concat(icon, "\">\n          <p>").concat(temperatureC, "<span>&#176;</span>/").concat(temperatureF, "<span>&#176;</span></p>\n        </div>\n\n        <div class=\"hour-details\">\n          <div class=\"left-col\">\n            <p>Wind</p>\n            <p class=\"p-space\">UV index</p>\n            <p>Humidity</p>\n            <p>Dew point</p>\n            <p class=\"p-space\">Precipitation</p>\n          </div>\n          <div class=\"right-col\">\n            <p>").concat(wind, " mph</p>\n            <p class=\"p-space\">").concat(uvIndex, "</p>\n            <p>").concat(humidity, "</p>\n            <p>").concat(dewPoint, "</p>\n            <p class=\"p-space\">").concat(precipitation, "</p>\n          </div>\n        </div>\n      </div>\n\n");
  return content;
} // TODO: export only the functions that are required by other files.




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
var LOCATIONS = {
  WEATHER_DATA: "WEATHER_DATA",
  LAT: "LAT",
  LNG: "LNG"
};
/**
 * Given the key and the value, the stringified value is saved to localStorage.
 */

var save = function save(key, weatherData) {
  localStorage.setItem(key, JSON.stringify(weatherData));
  console.log("Data for key \"".concat(key, "\" saved to localStorage"));
};
/**
 * If the key is found in localStorage then it returns the parsed value for it.
 * Otherwise returns null.
 */


var load = function load(key) {
  var dataFromStorage = JSON.parse(localStorage.getItem(key));

  if (!dataFromStorage) {
    console.warn("Data for key \"".concat(key, "\" not found in localStorage"));
    return;
  }

  console.log("Data for key \"".concat(key, "\" loaded from localStorage"), dataFromStorage);
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
/* harmony import */ var _test_renderDay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test_renderDay */ "./src/test/test_renderDay.js");





function test_all() {
  // test_renderHour();
  // test_renderAllHoursPerDay();
  // test_renderDayOverview();
  Object(_test_renderDay__WEBPACK_IMPORTED_MODULE_3__["test_renderDay"])();
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
var weatherData = {
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
    "data": [{
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures rising to 85°F on Sunday.",
    "icon": "clear-day",
    "data": [{
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }]
  },
  "flags": {
    "sources": ["nwspa", "cmc", "gfs", "hrrr", "icon", "isd", "madis", "nam", "sref", "darksky", "nearest-precip"],
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
  var content = Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderAllHoursPerDay"])(_test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"]);
  console.log(content);
}

window.test_renderAllHoursPerDay = test_renderAllHoursPerDay;


/***/ }),

/***/ "./src/test/test_renderDay.js":
/*!************************************!*\
  !*** ./src/test/test_renderDay.js ***!
  \************************************/
/*! exports provided: test_renderDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test_renderDay", function() { return test_renderDay; });
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderers */ "./src/renderers.js");
/* harmony import */ var _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_dummy_data */ "./src/test/test_dummy_data.js");



function test_renderDay() {
  var content = Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderDay"])(_test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"], 0);
  console.log(content);
}

window.test_renderDay = test_renderDay;


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
  var today = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].currently;
  var day = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].daily.data[1];
  var content = "";
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
  var hourData = _test_dummy_data__WEBPACK_IMPORTED_MODULE_1__["weatherData"].hourly.data[1];
  var content = Object(_renderers__WEBPACK_IMPORTED_MODULE_0__["renderHour"])(hourData);
  console.log(content);
} // Make this function available in Chrome Dev Tools by making it a global.


window.test_renderHour = test_renderHour;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhaW50X3VpLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3QvdGVzdF9hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3QvdGVzdF9kdW1teV9kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy90ZXN0L3Rlc3RfcmVuZGVyQWxsSG91cnNQZXJEYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3QvdGVzdF9yZW5kZXJEYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3QvdGVzdF9yZW5kZXJEYXlPdmVydmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC90ZXN0X3JlbmRlckhvdXIuanMiXSwibmFtZXMiOlsiYXNrTG9jYXRpb24iLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInBvc2l0aW9uIiwibG5nIiwiY29vcmRzIiwibG9uZ2l0dWRlIiwibGF0IiwibGF0aXR1ZGUiLCJzYXZlIiwiTE9DQVRJT05TIiwiTEFUIiwiTE5HIiwiZ2V0V2VhdGhlckRhdGFOb3ciLCJ3aW5kb3ciLCJhbGVydCIsImNvbnNvbGUiLCJ3YXJuIiwiQVBJX0tFWSIsInVybCIsImNvcnNGcmVlVXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwid2VhdGhlckRhdGEiLCJXRUFUSEVSX0RBVEEiLCJwYWludFdlYXRoZXJUb1ZpZXdwb3J0IiwicmVhc29uIiwiZXJyb3IiLCJhdHRhY2hMaXN0ZW5lcnMiLCJteUxvY2F0aW9uSWNvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaG93UG9wVXAiLCJoaWRlUG9wVXAiLCJtYWluIiwicGFpbnRFbXB0eUxhbmRpbmdQYWdlIiwiYWRkQ2xpY2tFdmVudExpc3RlbmVycyIsInBvcFVwIiwic3R5bGUiLCJkaXNwbGF5IiwibG9hZCIsImxvZyIsImRlbGV0ZUVsZW1lbnRCeVNlbGVjdG9yIiwiYm9keSIsImVtcHR5U3RhdGVDb250YWluZXIiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwicHJlcGVuZCIsImlubmVySFRNTCIsImdldEhvdXIiLCJ1bml4VGltZXN0YW1wIiwiZGF0ZSIsIkRhdGUiLCJob3VycyIsImdldEhvdXJzIiwiYWxsV2VhdGhlckNvbnRhaW5lciIsInNlbGVjdG9yIiwiZGl2VG9SZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJzaG93V2VhdGhlckRldGFpbHMiLCJob3VyRGV0YWlscyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImhvdXJDb250YWluZXIiLCJob3VyQ29udGFpbmVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmMmMiLCJmIiwiTWF0aCIsInJvdW5kIiwiY2FsY1RpbWUiLCJ1bml4VGltZSIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiY2FsY0hvdXIiLCJnZXRDdXJyZW50SG91ciIsImZvcm1hdERhdGUiLCJkYXlJbmRleCIsImdldERheSIsImRheU5hbWVzIiwiZGF5IiwibW9udGhJbmRleCIsImdldE1vbnRoIiwibW9udGhOYW1lcyIsIm1vbnRoIiwiZGF5T2ZNb250aCIsImdldERhdGUiLCJob3VyIiwidG90YWxIb3Vyc0xlZnQiLCJyZW5kZXJEYXkiLCJpbmRleCIsImNvbnRlbnQiLCJwYWludERheU92ZXJ2aWV3IiwicmVuZGVyRGF5T3ZlcnZpZXciLCJjdXJyZW50bHkiLCJkYWlseSIsImRhdGEiLCJob3VybHkiLCJyZW5kZXJBbGxIb3Vyc1BlckRheSIsInJlbmRlckFsbERheXMiLCJkYWlseURhdGFBcnJheSIsIm1hcCIsImpvaW4iLCJ0aW1lIiwiaWNvbiIsInJpZ2h0VGVtcGVyYXR1cmVGIiwidGVtcGVyYXR1cmUiLCJ0ZW1wZXJhdHVyZUhpZ2giLCJyaWdodFRlbXBlcmF0dXJlQyIsImhvdXJBcnJheSIsImN1cnJlbnRXZWF0aGVyIiwicmVuZGVySG91ciIsImN1cnJlbnRIb3VyIiwiaG91cnNJbkFEYXkiLCJob3Vyc0xlZnRJbkFEYXkiLCJpIiwiaG91ckRhdGEiLCJob3VyRXZhbHVhdGVkIiwidGVtcGVyYXR1cmVGIiwidGVtcGVyYXR1cmVDIiwid2luZCIsIndpbmRTcGVlZCIsInV2SW5kZXgiLCJodW1pZGl0eSIsImRld1BvaW50IiwicHJlY2lwaXRhdGlvbiIsInByZWNpcFByb2JhYmlsaXR5IiwiaG91clRvUHJpbnQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGFGcm9tU3RvcmFnZSIsInBhcnNlIiwiZ2V0SXRlbSIsInRlc3RfYWxsIiwidGVzdF9yZW5kZXJEYXkiLCJ0ZXN0X3JlbmRlckFsbEhvdXJzUGVyRGF5IiwidGVzdF9yZW5kZXJEYXlPdmVydmlldyIsInRvZGF5IiwidGVzdF9yZW5kZXJIb3VyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQU07QUFDeEIsTUFBSUMsU0FBUyxDQUFDQyxXQUFkLEVBQTJCO0FBQ3pCRCxhQUFTLENBQUNDLFdBQVYsQ0FBc0JDLGtCQUF0QixDQUF5QyxVQUFBQyxRQUFRLEVBQUk7QUFDbkQsVUFBTUMsR0FBRyxHQUFHRCxRQUFRLENBQUNFLE1BQVQsQ0FBZ0JDLFNBQTVCO0FBQ0EsVUFBTUMsR0FBRyxHQUFHSixRQUFRLENBQUNFLE1BQVQsQ0FBZ0JHLFFBQTVCLENBRm1ELENBR25EOztBQUNBQywyREFBSSxDQUFDQyxrREFBUyxDQUFDQyxHQUFYLEVBQWdCSixHQUFoQixDQUFKO0FBQ0FFLDJEQUFJLENBQUNDLGtEQUFTLENBQUNFLEdBQVgsRUFBZ0JSLEdBQWhCLENBQUosQ0FMbUQsQ0FNbkQ7O0FBQ0FTLHVCQUFpQixDQUFDTixHQUFELEVBQU1ILEdBQU4sQ0FBakI7QUFDRCxLQVJEO0FBU0QsR0FWRCxNQVdLO0FBQ0g7QUFDQTtBQUNBVSxVQUFNLENBQUNDLEtBQVAsQ0FBYSx3REFBYjtBQUNEO0FBQ0YsQ0FqQkQ7O0FBbUJBLElBQU1GLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ04sR0FBRCxFQUFNSCxHQUFOLEVBQWM7QUFDdEMsTUFBSSxDQUFDRyxHQUFELElBQVEsQ0FBQ0gsR0FBYixFQUFrQjtBQUNoQlksV0FBTyxDQUFDQyxJQUFSLENBQWEsaURBQ0kseUJBRGpCO0FBRUE7QUFDRDs7QUFFRCxNQUFNQyxPQUFPLEdBQU8sa0NBQXBCO0FBQ0EsTUFBTUMsR0FBRyw4Q0FBK0NELE9BQS9DLGNBQTBEWCxHQUExRCxjQUFpRUgsR0FBakUsc0JBQVQ7QUFDQSxNQUFNZ0IsV0FBVyxpREFBMENELEdBQTFDLENBQWpCO0FBRUFFLE9BQUssQ0FBQ0QsV0FBRCxDQUFMLENBQ0tFLElBREwsQ0FDVSxVQUFDQyxRQUFELEVBQWM7QUFDbEIsV0FBT0EsUUFBUSxDQUFDQyxJQUFULEVBQVA7QUFDRCxHQUhMLEVBSUtGLElBSkwsQ0FJVSxVQUFDRyxXQUFELEVBQWlCO0FBQ3JCO0FBQ0FoQix5REFBSSxDQUFDQyxrREFBUyxDQUFDZ0IsWUFBWCxFQUF5QkQsV0FBekIsQ0FBSjtBQUNBRSw0RUFBc0IsQ0FBQ0YsV0FBRCxDQUF0QjtBQUNELEdBUkwsV0FTVyxVQUFDRyxNQUFELEVBQVk7QUFDakJaLFdBQU8sQ0FBQ2EsS0FBUixDQUFjLHNDQUFkLEVBQXNERCxNQUF0RDtBQUNELEdBWEw7QUFZRCxDQXZCRDs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBTUE7O0FBRUEsSUFBTUUsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQU1DLGNBQWMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQXZCO0FBQ0FGLGdCQUFjLENBQUNHLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDbkMsaURBQXpDO0FBQ0FnQyxnQkFBYyxDQUFDRyxnQkFBZixDQUFnQyxXQUFoQyxFQUE2Q0MsbURBQTdDO0FBQ0FKLGdCQUFjLENBQUNHLGdCQUFmLENBQWdDLFVBQWhDLEVBQTRDRSxtREFBNUM7QUFDRCxDQUxEOztBQU9BLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDakJQLGlCQUFlO0FBQ2ZRLHlFQUFxQjtBQUNyQkMsMEVBQXNCO0FBQ3ZCLENBSkQ7O0FBTUFGLElBQUksRyxDQUVKO0FBRUE7QUFDQTtBQUNBLGdFOzs7Ozs7Ozs7Ozs7QUM1QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxJQUFNRixTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFNO0FBQ3RCLE1BQU1LLEtBQUssR0FBV1IsUUFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLENBQXRCO0FBQ0FPLE9BQUssQ0FBQ0MsS0FBTixDQUFZQyxPQUFaLEdBQXNCLE9BQXRCO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNTixTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFNO0FBQ3RCLE1BQU1JLEtBQUssR0FBV1IsUUFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLENBQXRCO0FBQ0FPLE9BQUssQ0FBQ0MsS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNSixxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLEdBQU07QUFDbEMsTUFBTWIsV0FBVyxHQUFHa0IscURBQUksQ0FBQ2pDLGtEQUFTLENBQUNnQixZQUFYLENBQXhCOztBQUNBLE1BQUlELFdBQUosRUFBaUI7QUFDZjtBQUNBRSwwQkFBc0IsQ0FBQ0YsV0FBRCxDQUF0QixDQUZlLENBSWY7O0FBQ0EsUUFBTWxCLEdBQUcsR0FBR29DLHFEQUFJLENBQUNqQyxrREFBUyxDQUFDQyxHQUFYLENBQWhCO0FBQ0EsUUFBTVAsR0FBRyxHQUFHdUMscURBQUksQ0FBQ2pDLGtEQUFTLENBQUNFLEdBQVgsQ0FBaEI7QUFDQUMsbUVBQWlCLENBQUNOLEdBQUQsRUFBTUgsR0FBTixDQUFqQjtBQUNELEdBUkQsTUFTSztBQUNIO0FBQ0FZLFdBQU8sQ0FBQzRCLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBQywyQkFBdUIsQ0FBQyxjQUFELENBQXZCO0FBRUEsUUFBTUMsSUFBSSxHQUFrQmQsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQTVCO0FBQ0EsUUFBTWMsbUJBQW1CLEdBQUdmLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBNUI7QUFDQUQsdUJBQW1CLENBQUNFLFlBQXBCLENBQWlDLElBQWpDLEVBQXVDLGFBQXZDO0FBQ0FILFFBQUksQ0FBQ0ksT0FBTCxDQUFhSCxtQkFBYjtBQUVBQSx1QkFBbUIsQ0FBQ0ksU0FBcEI7QUFjRDtBQUNGLENBcENELEMsQ0FzQ0E7OztBQUNBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLGFBQUQsRUFBbUI7QUFDakMsTUFBTUMsSUFBSSxHQUFJLElBQUlDLElBQUosQ0FBU0YsYUFBYSxHQUFHLElBQXpCLENBQWQ7QUFDQSxNQUFNRyxLQUFLLEdBQUdGLElBQUksQ0FBQ0csUUFBTCxFQUFkLENBRmlDLENBR2pDO0FBQ0QsQ0FKRCxDLENBTUE7QUFDQTs7O0FBQ0EsSUFBTTlCLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsR0FBTTtBQUNuQztBQUNBa0IseUJBQXVCLENBQUMsY0FBRCxDQUF2QjtBQUNBQSx5QkFBdUIsQ0FBQyx3QkFBRCxDQUF2QixDQUhtQyxDQUluQzs7QUFDQSxNQUFNQyxJQUFJLEdBQWtCZCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBNUI7QUFDQSxNQUFNeUIsbUJBQW1CLEdBQUcxQixRQUFRLENBQUNnQixhQUFULENBQXVCLEtBQXZCLENBQTVCO0FBQ0FVLHFCQUFtQixDQUFDVCxZQUFwQixDQUFpQyxJQUFqQyxFQUF1Qyx1QkFBdkM7QUFDQVMscUJBQW1CLENBQUNqQixLQUFwQixDQUEwQkMsT0FBMUIsR0FBb0MsTUFBcEM7QUFDQUksTUFBSSxDQUFDSSxPQUFMLENBQWFRLG1CQUFiLEVBVG1DLENBV25DOztBQUNBQSxxQkFBbUIsQ0FBQ1AsU0FBcEI7QUFnREQsQ0E1REQ7O0FBOERBLElBQU1OLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ2MsUUFBRCxFQUFjO0FBQzVDLE1BQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2I7QUFDRDs7QUFDRCxNQUFNQyxXQUFXLEdBQUc1QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIwQixRQUF2QixDQUFwQjs7QUFDQSxNQUFJLENBQUNDLFdBQUwsRUFBa0I7QUFDaEI7QUFDRDs7QUFDREEsYUFBVyxDQUFDQyxVQUFaLENBQXVCQyxXQUF2QixDQUFtQ0YsV0FBbkM7QUFDRCxDQVREOztBQVlBLFNBQVNHLGtCQUFULEdBQThCO0FBQzVCL0MsU0FBTyxDQUFDNEIsR0FBUixDQUFZLGlDQUFaO0FBQ0EsTUFBTW9CLFdBQVcsR0FBRyxLQUFLL0IsYUFBTCxDQUFtQixlQUFuQixDQUFwQjtBQUNBK0IsYUFBVyxDQUFDQyxTQUFaLENBQXNCQyxNQUF0QixDQUE2Qix3QkFBN0I7QUFFQSxNQUFNQyxhQUFhLEdBQUduQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXRCO0FBQ0FqQixTQUFPLENBQUM0QixHQUFSLENBQVl1QixhQUFaO0FBQ0FBLGVBQWEsQ0FBQ0YsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBK0IsY0FBL0I7QUFDRDs7QUFFRCxJQUFNM0Isc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixHQUFNO0FBQ25DLE1BQU02QixjQUFjLEdBQUdwQyxRQUFRLENBQUNxQyxnQkFBVCxDQUEwQixpQkFBMUIsRUFBNkMsQ0FBN0MsQ0FBdkI7QUFDQUQsZ0JBQWMsQ0FBQ2xDLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLFlBQVc7QUFBQ2xCLFdBQU8sQ0FBQzRCLEdBQVIsQ0FBWSxVQUM3RCxpQ0FEaUQ7QUFDYixHQUR4QyxFQUZtQyxDQUtuQztBQUNBO0FBQ0E7QUFDRCxDQVJEOzs7Ozs7Ozs7Ozs7OztBQ2hKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQSxJQUFNMEIsR0FBRyxHQUFHLFNBQU5BLEdBQU0sQ0FBQUMsQ0FBQztBQUFBLFNBQUlDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUNGLENBQUMsR0FBRyxFQUFMLElBQVcsQ0FBWCxHQUFlLENBQTFCLENBQUo7QUFBQSxDQUFiLEMsQ0FFQTs7O0FBQ0EsSUFBTUcsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUMsUUFBUSxFQUFJO0FBQzNCLE1BQU1yQixJQUFJLEdBQUcsSUFBSUMsSUFBSixDQUFTb0IsUUFBUSxHQUFHLElBQXBCLENBQWI7QUFDQSxNQUFNbkIsS0FBSyxHQUFHRixJQUFJLENBQUNHLFFBQUwsRUFBZDtBQUNBLE1BQU1tQixPQUFPLEdBQUcsTUFBTXRCLElBQUksQ0FBQ3VCLFVBQUwsRUFBdEIsQ0FIMkIsQ0FLM0I7O0FBQ0EsTUFBSXJCLEtBQUssR0FBRyxFQUFaLEVBQWdCO0FBQ2QscUJBQVVBLEtBQUssR0FBRyxFQUFsQixjQUF3Qm9CLE9BQU8sQ0FBQ0UsU0FBUixDQUFrQkYsT0FBTyxDQUFDRyxNQUFSLEdBQWlCLENBQW5DLENBQXhCO0FBQ0QsR0FGRCxNQUVPLElBQUl2QixLQUFLLEtBQUssRUFBZCxFQUFrQjtBQUN2QixxQkFBVUEsS0FBVixjQUFtQm9CLE9BQU8sQ0FBQ0UsU0FBUixDQUFrQkYsT0FBTyxDQUFDRyxNQUFSLEdBQWlCLENBQW5DLENBQW5CO0FBQ0QsR0FGTSxNQUVBO0FBQ0wscUJBQVV2QixLQUFWLGNBQW1Cb0IsT0FBTyxDQUFDRSxTQUFSLENBQWtCRixPQUFPLENBQUNHLE1BQVIsR0FBaUIsQ0FBbkMsQ0FBbkI7QUFDRDtBQUNGLENBYkQ7O0FBZUEsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUwsUUFBUSxFQUFJO0FBQzNCLE1BQU1yQixJQUFJLEdBQUcsSUFBSUMsSUFBSixDQUFTb0IsUUFBUSxHQUFHLElBQXBCLENBQWI7QUFDQSxNQUFNbkIsS0FBSyxHQUFHRixJQUFJLENBQUNHLFFBQUwsRUFBZCxDQUYyQixDQUczQjs7QUFDQSxNQUFJRCxLQUFLLEdBQUcsRUFBWixFQUFnQjtBQUNkLHFCQUFVQSxLQUFLLEdBQUcsRUFBbEI7QUFDRCxHQUZELE1BRU8sSUFBSUEsS0FBSyxLQUFLLEVBQWQsRUFBa0I7QUFDdkIscUJBQVVBLEtBQVY7QUFDRCxHQUZNLE1BRUE7QUFDTCxxQkFBVUEsS0FBVjtBQUNEO0FBQ0YsQ0FYRDs7QUFhQSxJQUFNeUIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFBTixRQUFRLEVBQUk7QUFDakMsTUFBTXJCLElBQUksR0FBRyxJQUFJQyxJQUFKLENBQVNvQixRQUFRLEdBQUcsSUFBcEIsQ0FBYjtBQUNBLE1BQU1uQixLQUFLLEdBQUdGLElBQUksQ0FBQ0csUUFBTCxFQUFkO0FBQ0EsU0FBT0QsS0FBUDtBQUNELENBSkQ7O0FBTUEsSUFBTTBCLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFQLFFBQVEsRUFBSTtBQUM3QixNQUFNckIsSUFBSSxHQUFHLElBQUlDLElBQUosQ0FBU29CLFFBQVEsR0FBRyxJQUFwQixDQUFiO0FBRUEsTUFBTVEsUUFBUSxHQUFHN0IsSUFBSSxDQUFDOEIsTUFBTCxFQUFqQixDQUg2QixDQUdJOztBQUNqQyxNQUFNQyxRQUFRLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0FBakI7QUFDQSxNQUFNQyxHQUFHLEdBQUdELFFBQVEsQ0FBQ0YsUUFBRCxDQUFwQjtBQUVBLE1BQU1JLFVBQVUsR0FBR2pDLElBQUksQ0FBQ2tDLFFBQUwsRUFBbkI7QUFDQSxNQUFNQyxVQUFVLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFDakIsS0FEaUIsRUFDVixLQURVLEVBQ0gsS0FERyxFQUNJLEtBREosQ0FBbkI7QUFFQSxNQUFNQyxLQUFLLEdBQUdELFVBQVUsQ0FBQ0YsVUFBRCxDQUF4QjtBQUVBLE1BQU1JLFVBQVUsR0FBR3JDLElBQUksQ0FBQ3NDLE9BQUwsRUFBbkI7QUFFQSxtQkFBVU4sR0FBVixlQUFrQkksS0FBbEIsY0FBMkJDLFVBQTNCO0FBQ0QsQ0FmRDtBQWdCQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q0E7OztBQUNBLElBQUlFLElBQUksR0FBRyxDQUFYO0FBQ0EsSUFBSUMsY0FBSjs7QUFFQSxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDdEUsV0FBRCxFQUFjdUUsS0FBZCxFQUF3QjtBQUN4QyxNQUFJQyxPQUFPLEdBQUcsRUFBZDs7QUFFQSxXQUFTQyxnQkFBVCxHQUE0QjtBQUMxQjtBQUNBO0FBQ0EsUUFBSUwsSUFBSSxLQUFLLENBQWIsRUFBZ0I7QUFDZEksYUFBTyxJQUFJRSxpQkFBaUIsQ0FBQzFFLFdBQVcsQ0FBQzJFLFNBQWIsQ0FBNUI7QUFDRCxLQUZELE1BRU87QUFDTEgsYUFBTyxJQUFJRSxpQkFBaUIsQ0FBQzFFLFdBQVcsQ0FBQzRFLEtBQVosQ0FBa0JDLElBQWxCLENBQXVCTixLQUF2QixDQUFELENBQTVCO0FBQ0Q7QUFDRjs7QUFFREUsa0JBQWdCLEdBYndCLENBZXhDOztBQUNBLE1BQUl6RSxXQUFXLENBQUM4RSxNQUFaLENBQW1CRCxJQUF2QixFQUE0QjtBQUMxQkwsV0FBTyxJQUFJTyxvQkFBb0IsQ0FBQy9FLFdBQUQsQ0FBL0I7QUFDRDs7QUFFRCx3REFBNkN3RSxPQUE3QztBQUNELENBckJEOztBQXdCQSxJQUFNUSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNoRixXQUFELEVBQWlCO0FBQ3ZDO0FBQ0UsTUFBTWlGLGNBQWMsR0FBR2pGLFdBQVcsQ0FBQzRFLEtBQVosQ0FBa0JDLElBQXpDO0FBQ0FJLGdCQUFjLENBQUNDLEdBQWYsQ0FBbUJaLFNBQVMsQ0FBQ3RFLFdBQUQsQ0FBNUIsRUFBMkNtRixJQUEzQyxDQUFnRCxFQUFoRDtBQUNBNUYsU0FBTyxDQUFDNEIsR0FBUixDQUFZOEQsY0FBYyxDQUFDQyxHQUFmLENBQW1CWixTQUFTLENBQUN0RSxXQUFELENBQTVCLEVBQTJDbUYsSUFBM0MsQ0FBZ0QsRUFBaEQsQ0FBWjtBQUNELENBTEQsQyxDQVFBO0FBQ0E7OztBQUNBLElBQU1ULGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQUcsSUFBSSxFQUFJO0FBQ2hDLE1BQU1oRCxJQUFJLEdBQUc0QixVQUFVLENBQUNvQixJQUFJLENBQUNPLElBQU4sQ0FBdkI7QUFDQSxNQUFNQyxJQUFJLEdBQUdSLElBQUksQ0FBQ1EsSUFBbEI7QUFDQSxNQUFNQyxpQkFBaUIsR0FBR1QsSUFBSSxDQUFDVSxXQUFMLEdBQW1CeEMsSUFBSSxDQUFDQyxLQUFMLENBQVc2QixJQUFJLENBQUNVLFdBQWhCLENBQW5CLEdBQ3RCeEMsSUFBSSxDQUFDQyxLQUFMLENBQVc2QixJQUFJLENBQUNXLGVBQWhCLENBREo7QUFFQSxNQUFNQyxpQkFBaUIsR0FBRzVDLEdBQUcsQ0FBQ3lDLGlCQUFELENBQTdCO0FBRUEsNEZBRTZCekQsSUFGN0IsaUVBRzBDd0QsSUFIMUMseUdBS2lDSSxpQkFMakMsK0ZBTXFDSCxpQkFOckM7QUFVRCxDQWpCRCxDLENBb0JBOzs7QUFDQSxJQUFNUCxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUEvRSxXQUFXLEVBQUk7QUFDMUMsTUFBTTBGLFNBQVMsR0FBRzFGLFdBQVcsQ0FBQzhFLE1BQVosQ0FBbUJELElBQXJDO0FBQ0EsTUFBTWMsY0FBYyxHQUFHM0YsV0FBVyxDQUFDMkUsU0FBbkM7QUFDQSxNQUFJSCxPQUFPLEdBQUcsRUFBZDtBQUVBSCxnQkFBYyxHQUFHcUIsU0FBUyxDQUFDcEMsTUFBM0IsQ0FMMEMsQ0FLRjs7QUFDeEMvRCxTQUFPLENBQUM0QixHQUFSLGlDQUFxQ2tELGNBQXJDLEdBTjBDLENBTzFDOztBQUNBLE1BQUlELElBQUksS0FBSyxDQUFiLEVBQWdCO0FBQ2RJLFdBQU8sSUFBSW9CLFVBQVUsQ0FBQ0QsY0FBRCxDQUFyQjtBQUNBdkIsUUFBSTtBQUNMLEdBWHlDLENBYTFDO0FBQ0E7OztBQUNBLE1BQU15QixXQUFXLEdBQUd6QixJQUFJLEtBQUssQ0FBVCxHQUFjWixjQUFjLENBQUNtQyxjQUFjLENBQUNQLElBQWhCLENBQWQsR0FBc0MsQ0FBcEQsR0FBeUQsQ0FBN0UsQ0FmMEMsQ0Flc0M7O0FBQ2hGN0YsU0FBTyxDQUFDNEIsR0FBUiw2QkFBaUMwRSxXQUFqQyxHQWhCMEMsQ0FnQlE7O0FBQ2xELE1BQU1DLFdBQVcsR0FBRyxFQUFwQjtBQUNBLE1BQU1DLGVBQWUsR0FBR0QsV0FBVyxHQUFHRCxXQUF0QyxDQWxCMEMsQ0FrQmtCOztBQUM1RHRHLFNBQU8sQ0FBQzRCLEdBQVIsNERBQWdFNEUsZUFBaEU7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxlQUFKLElBQXVCM0IsSUFBSSxHQUFHc0IsU0FBUyxDQUFDcEMsTUFBeEQsRUFBZ0UwQyxDQUFDLEVBQWpFLEVBQXFFO0FBQ25FeEIsV0FBTyxJQUFJb0IsVUFBVSxDQUFDRixTQUFTLENBQUN0QixJQUFELENBQVYsQ0FBckI7QUFDQUEsUUFBSTtBQUNMOztBQUVEQyxnQkFBYyxJQUFJMEIsZUFBbEI7QUFDQXhHLFNBQU8sQ0FBQzRCLEdBQVIsaUNBQXFDa0QsY0FBckM7QUFDQTlFLFNBQU8sQ0FBQzRCLEdBQVIsbURBQXVEaUQsSUFBdkQ7QUFFQSxzREFBMkNJLE9BQTNDO0FBQ0QsQ0E5QkQ7QUFnQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsU0FBU29CLFVBQVQsQ0FBb0JLLFFBQXBCLEVBQThCO0FBQzVCLE1BQU1DLGFBQWEsR0FBRzNDLFFBQVEsQ0FBQzBDLFFBQVEsQ0FBQ2IsSUFBVixDQUE5QjtBQUNBLE1BQU1DLElBQUksR0FBR1ksUUFBUSxDQUFDWixJQUF0QjtBQUNBLE1BQU1jLFlBQVksR0FBR3BELElBQUksQ0FBQ0MsS0FBTCxDQUFXaUQsUUFBUSxDQUFDVixXQUFwQixDQUFyQjtBQUNBLE1BQU1hLFlBQVksR0FBR3ZELEdBQUcsQ0FBQ3NELFlBQUQsQ0FBeEI7QUFDQSxNQUFNRSxJQUFJLEdBQUdKLFFBQVEsQ0FBQ0ssU0FBdEI7QUFDQSxNQUFNQyxPQUFPLEdBQUdOLFFBQVEsQ0FBQ00sT0FBekI7QUFDQSxNQUFNQyxRQUFRLEdBQUdQLFFBQVEsQ0FBQ08sUUFBMUI7QUFDQSxNQUFNQyxRQUFRLEdBQUdSLFFBQVEsQ0FBQ1EsUUFBMUI7QUFDQSxNQUFNQyxhQUFhLEdBQUdULFFBQVEsQ0FBQ1UsaUJBQS9CLENBVDRCLENBVTVCO0FBQ0E7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHeEMsSUFBSSxLQUFLLENBQVQsR0FBYSxLQUFiLEdBQXFCOEIsYUFBekM7QUFDQSxNQUFJMUIsT0FBTywwR0FJRW9DLFdBSkYsb0VBS21DdkIsSUFMbkMsK0JBTUVlLFlBTkYsaUNBTXFDRCxZQU5yQywrWEFrQklFLElBbEJKLHdEQW1Cb0JFLE9BbkJwQixrQ0FvQklDLFFBcEJKLGtDQXFCSUMsUUFyQkosb0RBc0JvQkMsYUF0QnBCLDZEQUFYO0FBNEJBLFNBQU9sQyxPQUFQO0FBQ0QsQyxDQUVEOzs7Ozs7Ozs7Ozs7Ozs7QUNoUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0EsSUFBTXZGLFNBQVMsR0FBRztBQUNoQmdCLGNBQVksRUFBRSxjQURFO0FBRWhCZixLQUFHLEVBQVcsS0FGRTtBQUdoQkMsS0FBRyxFQUFXO0FBSEUsQ0FBbEI7QUFNQTs7OztBQUdBLElBQU1ILElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUM2SCxHQUFELEVBQU03RyxXQUFOLEVBQXNCO0FBQ2pDOEcsY0FBWSxDQUFDQyxPQUFiLENBQXFCRixHQUFyQixFQUEwQkcsSUFBSSxDQUFDQyxTQUFMLENBQWVqSCxXQUFmLENBQTFCO0FBQ0FULFNBQU8sQ0FBQzRCLEdBQVIsMEJBQTZCMEYsR0FBN0I7QUFDRCxDQUhEO0FBS0E7Ozs7OztBQUlBLElBQU0zRixJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDMkYsR0FBRCxFQUFTO0FBQ3BCLE1BQU1LLGVBQWUsR0FBR0YsSUFBSSxDQUFDRyxLQUFMLENBQVdMLFlBQVksQ0FBQ00sT0FBYixDQUFxQlAsR0FBckIsQ0FBWCxDQUF4Qjs7QUFDQSxNQUFJLENBQUNLLGVBQUwsRUFBc0I7QUFDcEIzSCxXQUFPLENBQUNDLElBQVIsMEJBQThCcUgsR0FBOUI7QUFDQTtBQUNEOztBQUNEdEgsU0FBTyxDQUFDNEIsR0FBUiwwQkFBNkIwRixHQUE3QixrQ0FBOERLLGVBQTlEO0FBQ0EsU0FBT0EsZUFBUDtBQUNELENBUkQ7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNHLFFBQVQsR0FBb0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0FDLHdFQUFjO0FBQ2Y7Ozs7Ozs7Ozs7Ozs7O0FDVkQ7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTXRILFdBQVcsR0FBRztBQUNsQixjQUFZLFVBRE07QUFFbEIsZUFBYSxDQUFDLGtCQUZJO0FBR2xCLGNBQVkscUJBSE07QUFJbEIsZUFBYTtBQUNYLFlBQVEsVUFERztBQUVYLGVBQVcsZUFGQTtBQUdYLFlBQVEsbUJBSEc7QUFJWCw0QkFBd0IsRUFKYjtBQUtYLDJCQUF1QixHQUxaO0FBTVgsdUJBQW1CLENBTlI7QUFPWCx5QkFBcUIsQ0FQVjtBQVFYLG1CQUFlLEtBUko7QUFTWCwyQkFBdUIsS0FUWjtBQVVYLGdCQUFZLEtBVkQ7QUFXWCxnQkFBWSxJQVhEO0FBWVgsZ0JBQVksT0FaRDtBQWFYLGlCQUFhLEdBYkY7QUFjWCxnQkFBWSxLQWREO0FBZVgsbUJBQWUsR0FmSjtBQWdCWCxrQkFBYyxJQWhCSDtBQWlCWCxlQUFXLENBakJBO0FBa0JYLGtCQUFjLEtBbEJIO0FBbUJYLGFBQVM7QUFuQkUsR0FKSztBQXlCbEIsWUFBVTtBQUNSLGVBQVcsbUNBREg7QUFFUixZQUFRLFdBRkE7QUFHUixZQUFRLENBQ047QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxlQUZiO0FBR0UsY0FBUSxtQkFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxPQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLEtBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxLQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQURNLEVBb0JOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsZUFGYjtBQUdFLGNBQVEsbUJBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxLQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxJQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsS0FoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FwQk0sRUF1Q047QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxlQUZiO0FBR0UsY0FBUSxtQkFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxNQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLEtBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxLQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQXZDTSxFQTBETjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxLQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxJQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0ExRE0sRUE2RU47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxhQUhWO0FBSUUseUJBQW1CLE1BSnJCO0FBS0UsMkJBQXFCLElBTHZCO0FBTUUsb0JBQWMsTUFOaEI7QUFPRSxxQkFBZSxLQVBqQjtBQVFFLDZCQUF1QixLQVJ6QjtBQVNFLGtCQUFZLEtBVGQ7QUFVRSxrQkFBWSxJQVZkO0FBV0Usa0JBQVksT0FYZDtBQVlFLG1CQUFhLElBWmY7QUFhRSxrQkFBWSxLQWJkO0FBY0UscUJBQWUsR0FkakI7QUFlRSxvQkFBYyxJQWZoQjtBQWdCRSxpQkFBVyxDQWhCYjtBQWlCRSxvQkFBYyxFQWpCaEI7QUFrQkUsZUFBUztBQWxCWCxLQTdFTSxFQWlHTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsTUFKckI7QUFLRSwyQkFBcUIsSUFMdkI7QUFNRSxvQkFBYyxNQU5oQjtBQU9FLHFCQUFlLEtBUGpCO0FBUUUsNkJBQXVCLEtBUnpCO0FBU0Usa0JBQVksS0FUZDtBQVVFLGtCQUFZLElBVmQ7QUFXRSxrQkFBWSxPQVhkO0FBWUUsbUJBQWEsSUFaZjtBQWFFLGtCQUFZLEtBYmQ7QUFjRSxxQkFBZSxHQWRqQjtBQWVFLG9CQUFjLElBZmhCO0FBZ0JFLGlCQUFXLENBaEJiO0FBaUJFLG9CQUFjLEVBakJoQjtBQWtCRSxlQUFTO0FBbEJYLEtBakdNLEVBcUhOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsYUFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxPQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLEdBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQXJITSxFQXdJTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsTUFKckI7QUFLRSwyQkFBcUIsSUFMdkI7QUFNRSxvQkFBYyxNQU5oQjtBQU9FLHFCQUFlLEtBUGpCO0FBUUUsNkJBQXVCLEtBUnpCO0FBU0Usa0JBQVksS0FUZDtBQVVFLGtCQUFZLElBVmQ7QUFXRSxrQkFBWSxPQVhkO0FBWUUsbUJBQWEsSUFaZjtBQWFFLGtCQUFZLElBYmQ7QUFjRSxxQkFBZSxHQWRqQjtBQWVFLG9CQUFjLElBZmhCO0FBZ0JFLGlCQUFXLENBaEJiO0FBaUJFLG9CQUFjLEVBakJoQjtBQWtCRSxlQUFTO0FBbEJYLEtBeElNLEVBNEpOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsYUFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxNQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLEdBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQTVKTSxFQStLTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxJQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0EvS00sRUFrTU47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxhQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsS0FOakI7QUFPRSw2QkFBdUIsS0FQekI7QUFRRSxrQkFBWSxLQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxJQVhmO0FBWUUsa0JBQVksSUFaZDtBQWFFLHFCQUFlLEdBYmpCO0FBY0Usb0JBQWMsSUFkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBbE1NLEVBcU5OO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsYUFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxNQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLElBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQXJOTSxFQXdPTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsTUFKckI7QUFLRSwyQkFBcUIsSUFMdkI7QUFNRSxvQkFBYyxNQU5oQjtBQU9FLHFCQUFlLEtBUGpCO0FBUUUsNkJBQXVCLEtBUnpCO0FBU0Usa0JBQVksS0FUZDtBQVVFLGtCQUFZLElBVmQ7QUFXRSxrQkFBWSxPQVhkO0FBWUUsbUJBQWEsSUFaZjtBQWFFLGtCQUFZLElBYmQ7QUFjRSxxQkFBZSxHQWRqQjtBQWVFLG9CQUFjLElBZmhCO0FBZ0JFLGlCQUFXLENBaEJiO0FBaUJFLG9CQUFjLEVBakJoQjtBQWtCRSxlQUFTO0FBbEJYLEtBeE9NLEVBNFBOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsYUFIVjtBQUlFLHlCQUFtQixNQUpyQjtBQUtFLDJCQUFxQixJQUx2QjtBQU1FLG9CQUFjLE1BTmhCO0FBT0UscUJBQWUsS0FQakI7QUFRRSw2QkFBdUIsS0FSekI7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksSUFWZDtBQVdFLGtCQUFZLE9BWGQ7QUFZRSxtQkFBYSxHQVpmO0FBYUUsa0JBQVksSUFiZDtBQWNFLHFCQUFlLEdBZGpCO0FBZUUsb0JBQWMsSUFmaEI7QUFnQkUsaUJBQVcsQ0FoQmI7QUFpQkUsb0JBQWMsRUFqQmhCO0FBa0JFLGVBQVM7QUFsQlgsS0E1UE0sRUFnUk47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxhQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsS0FOakI7QUFPRSw2QkFBdUIsS0FQekI7QUFRRSxrQkFBWSxLQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxJQVhmO0FBWUUsa0JBQVksR0FaZDtBQWFFLHFCQUFlLEdBYmpCO0FBY0Usb0JBQWMsSUFkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBaFJNLEVBbVNOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsYUFIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxNQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLElBWmQ7QUFhRSxxQkFBZSxFQWJqQjtBQWNFLG9CQUFjLElBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQW5TTSxFQXNUTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsRUFiakI7QUFjRSxvQkFBYyxJQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F0VE0sRUF5VU47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsS0FOakI7QUFPRSw2QkFBdUIsS0FQekI7QUFRRSxrQkFBWSxJQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxJQVhmO0FBWUUsa0JBQVksSUFaZDtBQWFFLHFCQUFlLEVBYmpCO0FBY0Usb0JBQWMsQ0FkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBelVNLEVBNFZOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsV0FIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxPQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLElBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLENBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQTVWTSxFQStXTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxHQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0EvV00sRUFrWU47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsS0FOakI7QUFPRSw2QkFBdUIsS0FQekI7QUFRRSxrQkFBWSxLQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxJQVhmO0FBWUUsa0JBQVksSUFaZDtBQWFFLHFCQUFlLEdBYmpCO0FBY0Usb0JBQWMsQ0FkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBbFlNLEVBcVpOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsV0FIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksSUFSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxPQVZkO0FBV0UsbUJBQWEsR0FYZjtBQVlFLGtCQUFZLElBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLENBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQXJaTSxFQXdhTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F4YU0sRUEyYk47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsS0FOakI7QUFPRSw2QkFBdUIsS0FQekI7QUFRRSxrQkFBWSxLQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxJQVhmO0FBWUUsa0JBQVksS0FaZDtBQWFFLHFCQUFlLEdBYmpCO0FBY0Usb0JBQWMsQ0FkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBM2JNLEVBOGNOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsT0FGYjtBQUdFLGNBQVEsV0FIVjtBQUlFLHlCQUFtQixDQUpyQjtBQUtFLDJCQUFxQixDQUx2QjtBQU1FLHFCQUFlLEtBTmpCO0FBT0UsNkJBQXVCLEtBUHpCO0FBUUUsa0JBQVksS0FSZDtBQVNFLGtCQUFZLElBVGQ7QUFVRSxrQkFBWSxPQVZkO0FBV0UsbUJBQWEsSUFYZjtBQVlFLGtCQUFZLEtBWmQ7QUFhRSxxQkFBZSxHQWJqQjtBQWNFLG9CQUFjLENBZGhCO0FBZUUsaUJBQVcsQ0FmYjtBQWdCRSxvQkFBYyxFQWhCaEI7QUFpQkUsZUFBUztBQWpCWCxLQTljTSxFQWllTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxLQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FqZU0sRUFvZk47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVyxPQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUseUJBQW1CLENBSnJCO0FBS0UsMkJBQXFCLENBTHZCO0FBTUUscUJBQWUsSUFOakI7QUFPRSw2QkFBdUIsSUFQekI7QUFRRSxrQkFBWSxLQVJkO0FBU0Usa0JBQVksSUFUZDtBQVVFLGtCQUFZLE9BVmQ7QUFXRSxtQkFBYSxHQVhmO0FBWUUsa0JBQVksS0FaZDtBQWFFLHFCQUFlLEdBYmpCO0FBY0Usb0JBQWMsQ0FkaEI7QUFlRSxpQkFBVyxDQWZiO0FBZ0JFLG9CQUFjLEVBaEJoQjtBQWlCRSxlQUFTO0FBakJYLEtBcGZNLEVBdWdCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxLQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F2Z0JNLEVBMGhCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLEdBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0ExaEJNLEVBNmlCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0E3aUJNLEVBZ2tCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxHQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0Foa0JNLEVBbWxCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxJQU5qQjtBQU9FLDZCQUF1QixJQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FubEJNLEVBc21CTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F0bUJNLEVBeW5CTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F6bkJNLEVBNG9CTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0E1b0JNLEVBK3BCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxHQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0EvcEJNLEVBa3JCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLENBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsRUFiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FsckJNLEVBcXNCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0Fyc0JNLEVBd3RCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsRUFiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F4dEJNLEVBMnVCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLGFBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0EzdUJNLEVBOHZCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxHQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsRUFiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0E5dkJNLEVBaXhCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsRUFiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FqeEJNLEVBb3lCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLEdBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FweUJNLEVBdXpCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F2ekJNLEVBMDBCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0ExMEJNLEVBNjFCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLElBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxHQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0E3MUJNLEVBZzNCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxJQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FoM0JNLEVBbTRCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxHQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0FuNEJNLEVBczVCTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLE9BRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSx5QkFBbUIsQ0FKckI7QUFLRSwyQkFBcUIsQ0FMdkI7QUFNRSxxQkFBZSxLQU5qQjtBQU9FLDZCQUF1QixLQVB6QjtBQVFFLGtCQUFZLEtBUmQ7QUFTRSxrQkFBWSxJQVRkO0FBVUUsa0JBQVksT0FWZDtBQVdFLG1CQUFhLElBWGY7QUFZRSxrQkFBWSxLQVpkO0FBYUUscUJBQWUsR0FiakI7QUFjRSxvQkFBYyxDQWRoQjtBQWVFLGlCQUFXLENBZmI7QUFnQkUsb0JBQWMsRUFoQmhCO0FBaUJFLGVBQVM7QUFqQlgsS0F0NUJNO0FBSEEsR0F6QlE7QUF1OEJsQixXQUFTO0FBQ1AsZUFBVyx3RkFESjtBQUVQLFlBQVEsV0FGRDtBQUdQLFlBQVEsQ0FDTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLG1DQUZiO0FBR0UsY0FBUSxtQkFIVjtBQUlFLHFCQUFlLFVBSmpCO0FBS0Usb0JBQWMsVUFMaEI7QUFNRSxtQkFBYSxJQU5mO0FBT0UseUJBQW1CLE1BUHJCO0FBUUUsNEJBQXNCLE1BUnhCO0FBU0UsZ0NBQTBCLFVBVDVCO0FBVUUsMkJBQXFCLElBVnZCO0FBV0Usb0JBQWMsTUFYaEI7QUFZRSx5QkFBbUIsS0FackI7QUFhRSw2QkFBdUIsVUFiekI7QUFjRSx3QkFBa0IsS0FkcEI7QUFlRSw0QkFBc0IsVUFmeEI7QUFnQkUsaUNBQTJCLEtBaEI3QjtBQWlCRSxxQ0FBK0IsVUFqQmpDO0FBa0JFLGdDQUEwQixLQWxCNUI7QUFtQkUsb0NBQThCLFVBbkJoQztBQW9CRSxrQkFBWSxLQXBCZDtBQXFCRSxrQkFBWSxJQXJCZDtBQXNCRSxrQkFBWSxPQXRCZDtBQXVCRSxtQkFBYSxJQXZCZjtBQXdCRSxrQkFBWSxLQXhCZDtBQXlCRSxzQkFBZ0IsVUF6QmxCO0FBMEJFLHFCQUFlLEdBMUJqQjtBQTJCRSxvQkFBYyxJQTNCaEI7QUE0QkUsaUJBQVcsQ0E1QmI7QUE2QkUscUJBQWUsVUE3QmpCO0FBOEJFLG9CQUFjLEtBOUJoQjtBQStCRSxlQUFTLEtBL0JYO0FBZ0NFLHdCQUFrQixLQWhDcEI7QUFpQ0UsNEJBQXNCLFVBakN4QjtBQWtDRSx3QkFBa0IsS0FsQ3BCO0FBbUNFLDRCQUFzQixVQW5DeEI7QUFvQ0UsZ0NBQTBCLEtBcEM1QjtBQXFDRSxvQ0FBOEIsVUFyQ2hDO0FBc0NFLGdDQUEwQixLQXRDNUI7QUF1Q0Usb0NBQThCO0FBdkNoQyxLQURNLEVBMENOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsMkJBRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSxxQkFBZSxVQUpqQjtBQUtFLG9CQUFjLFVBTGhCO0FBTUUsbUJBQWEsSUFOZjtBQU9FLHlCQUFtQixNQVByQjtBQVFFLDRCQUFzQixNQVJ4QjtBQVNFLGdDQUEwQixVQVQ1QjtBQVVFLDJCQUFxQixJQVZ2QjtBQVdFLG9CQUFjLE1BWGhCO0FBWUUseUJBQW1CLEtBWnJCO0FBYUUsNkJBQXVCLFVBYnpCO0FBY0Usd0JBQWtCLEtBZHBCO0FBZUUsNEJBQXNCLFVBZnhCO0FBZ0JFLGlDQUEyQixLQWhCN0I7QUFpQkUscUNBQStCLFVBakJqQztBQWtCRSxnQ0FBMEIsS0FsQjVCO0FBbUJFLG9DQUE4QixVQW5CaEM7QUFvQkUsa0JBQVksS0FwQmQ7QUFxQkUsa0JBQVksSUFyQmQ7QUFzQkUsa0JBQVksT0F0QmQ7QUF1QkUsbUJBQWEsSUF2QmY7QUF3QkUsa0JBQVksS0F4QmQ7QUF5QkUsc0JBQWdCLFVBekJsQjtBQTBCRSxxQkFBZSxHQTFCakI7QUEyQkUsb0JBQWMsSUEzQmhCO0FBNEJFLGlCQUFXLENBNUJiO0FBNkJFLHFCQUFlLFVBN0JqQjtBQThCRSxvQkFBYyxFQTlCaEI7QUErQkUsZUFBUyxLQS9CWDtBQWdDRSx3QkFBa0IsS0FoQ3BCO0FBaUNFLDRCQUFzQixVQWpDeEI7QUFrQ0Usd0JBQWtCLEtBbENwQjtBQW1DRSw0QkFBc0IsVUFuQ3hCO0FBb0NFLGdDQUEwQixLQXBDNUI7QUFxQ0Usb0NBQThCLFVBckNoQztBQXNDRSxnQ0FBMEIsS0F0QzVCO0FBdUNFLG9DQUE4QjtBQXZDaEMsS0ExQ00sRUFtRk47QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVywyQkFGYjtBQUdFLGNBQVEsV0FIVjtBQUlFLHFCQUFlLFVBSmpCO0FBS0Usb0JBQWMsVUFMaEI7QUFNRSxtQkFBYSxJQU5mO0FBT0UseUJBQW1CLENBUHJCO0FBUUUsNEJBQXNCLENBUnhCO0FBU0UsZ0NBQTBCLFVBVDVCO0FBVUUsMkJBQXFCLENBVnZCO0FBV0UseUJBQW1CLEtBWHJCO0FBWUUsNkJBQXVCLFVBWnpCO0FBYUUsd0JBQWtCLEtBYnBCO0FBY0UsNEJBQXNCLFVBZHhCO0FBZUUsaUNBQTJCLEtBZjdCO0FBZ0JFLHFDQUErQixVQWhCakM7QUFpQkUsZ0NBQTBCLEtBakI1QjtBQWtCRSxvQ0FBOEIsVUFsQmhDO0FBbUJFLGtCQUFZLEtBbkJkO0FBb0JFLGtCQUFZLElBcEJkO0FBcUJFLGtCQUFZLE9BckJkO0FBc0JFLG1CQUFhLElBdEJmO0FBdUJFLGtCQUFZLEtBdkJkO0FBd0JFLHNCQUFnQixVQXhCbEI7QUF5QkUscUJBQWUsR0F6QmpCO0FBMEJFLG9CQUFjLENBMUJoQjtBQTJCRSxpQkFBVyxDQTNCYjtBQTRCRSxxQkFBZSxVQTVCakI7QUE2QkUsb0JBQWMsRUE3QmhCO0FBOEJFLGVBQVMsS0E5Qlg7QUErQkUsd0JBQWtCLEtBL0JwQjtBQWdDRSw0QkFBc0IsVUFoQ3hCO0FBaUNFLHdCQUFrQixLQWpDcEI7QUFrQ0UsNEJBQXNCLFVBbEN4QjtBQW1DRSxnQ0FBMEIsS0FuQzVCO0FBb0NFLG9DQUE4QixVQXBDaEM7QUFxQ0UsZ0NBQTBCLEtBckM1QjtBQXNDRSxvQ0FBOEI7QUF0Q2hDLEtBbkZNLEVBMkhOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsMkJBRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSxxQkFBZSxVQUpqQjtBQUtFLG9CQUFjLFVBTGhCO0FBTUUsbUJBQWEsR0FOZjtBQU9FLHlCQUFtQixNQVByQjtBQVFFLDRCQUFzQixNQVJ4QjtBQVNFLGdDQUEwQixVQVQ1QjtBQVVFLDJCQUFxQixJQVZ2QjtBQVdFLG9CQUFjLE1BWGhCO0FBWUUseUJBQW1CLEtBWnJCO0FBYUUsNkJBQXVCLFVBYnpCO0FBY0Usd0JBQWtCLEtBZHBCO0FBZUUsNEJBQXNCLFVBZnhCO0FBZ0JFLGlDQUEyQixLQWhCN0I7QUFpQkUscUNBQStCLFVBakJqQztBQWtCRSxnQ0FBMEIsS0FsQjVCO0FBbUJFLG9DQUE4QixVQW5CaEM7QUFvQkUsa0JBQVksS0FwQmQ7QUFxQkUsa0JBQVksSUFyQmQ7QUFzQkUsa0JBQVksT0F0QmQ7QUF1QkUsbUJBQWEsR0F2QmY7QUF3QkUsa0JBQVksS0F4QmQ7QUF5QkUsc0JBQWdCLFVBekJsQjtBQTBCRSxxQkFBZSxHQTFCakI7QUEyQkUsb0JBQWMsQ0EzQmhCO0FBNEJFLGlCQUFXLENBNUJiO0FBNkJFLHFCQUFlLFVBN0JqQjtBQThCRSxvQkFBYyxFQTlCaEI7QUErQkUsZUFBUyxLQS9CWDtBQWdDRSx3QkFBa0IsS0FoQ3BCO0FBaUNFLDRCQUFzQixVQWpDeEI7QUFrQ0Usd0JBQWtCLEtBbENwQjtBQW1DRSw0QkFBc0IsVUFuQ3hCO0FBb0NFLGdDQUEwQixLQXBDNUI7QUFxQ0Usb0NBQThCLFVBckNoQztBQXNDRSxnQ0FBMEIsS0F0QzVCO0FBdUNFLG9DQUE4QjtBQXZDaEMsS0EzSE0sRUFvS047QUFDRSxjQUFRLFVBRFY7QUFFRSxpQkFBVywyQkFGYjtBQUdFLGNBQVEsV0FIVjtBQUlFLHFCQUFlLFVBSmpCO0FBS0Usb0JBQWMsVUFMaEI7QUFNRSxtQkFBYSxJQU5mO0FBT0UseUJBQW1CLE1BUHJCO0FBUUUsNEJBQXNCLE1BUnhCO0FBU0UsZ0NBQTBCLFVBVDVCO0FBVUUsMkJBQXFCLElBVnZCO0FBV0Usb0JBQWMsTUFYaEI7QUFZRSx5QkFBbUIsS0FackI7QUFhRSw2QkFBdUIsVUFiekI7QUFjRSx3QkFBa0IsS0FkcEI7QUFlRSw0QkFBc0IsVUFmeEI7QUFnQkUsaUNBQTJCLEtBaEI3QjtBQWlCRSxxQ0FBK0IsVUFqQmpDO0FBa0JFLGdDQUEwQixLQWxCNUI7QUFtQkUsb0NBQThCLFVBbkJoQztBQW9CRSxrQkFBWSxLQXBCZDtBQXFCRSxrQkFBWSxJQXJCZDtBQXNCRSxrQkFBWSxPQXRCZDtBQXVCRSxtQkFBYSxJQXZCZjtBQXdCRSxrQkFBWSxJQXhCZDtBQXlCRSxzQkFBZ0IsVUF6QmxCO0FBMEJFLHFCQUFlLEdBMUJqQjtBQTJCRSxvQkFBYyxJQTNCaEI7QUE0QkUsaUJBQVcsQ0E1QmI7QUE2QkUscUJBQWUsVUE3QmpCO0FBOEJFLG9CQUFjLEVBOUJoQjtBQStCRSxlQUFTLEtBL0JYO0FBZ0NFLHdCQUFrQixLQWhDcEI7QUFpQ0UsNEJBQXNCLFVBakN4QjtBQWtDRSx3QkFBa0IsS0FsQ3BCO0FBbUNFLDRCQUFzQixVQW5DeEI7QUFvQ0UsZ0NBQTBCLEtBcEM1QjtBQXFDRSxvQ0FBOEIsVUFyQ2hDO0FBc0NFLGdDQUEwQixLQXRDNUI7QUF1Q0Usb0NBQThCO0FBdkNoQyxLQXBLTSxFQTZNTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLDJCQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUscUJBQWUsVUFKakI7QUFLRSxvQkFBYyxVQUxoQjtBQU1FLG1CQUFhLElBTmY7QUFPRSx5QkFBbUIsTUFQckI7QUFRRSw0QkFBc0IsTUFSeEI7QUFTRSxnQ0FBMEIsVUFUNUI7QUFVRSwyQkFBcUIsSUFWdkI7QUFXRSxvQkFBYyxNQVhoQjtBQVlFLHlCQUFtQixLQVpyQjtBQWFFLDZCQUF1QixVQWJ6QjtBQWNFLHdCQUFrQixLQWRwQjtBQWVFLDRCQUFzQixVQWZ4QjtBQWdCRSxpQ0FBMkIsS0FoQjdCO0FBaUJFLHFDQUErQixVQWpCakM7QUFrQkUsZ0NBQTBCLElBbEI1QjtBQW1CRSxvQ0FBOEIsVUFuQmhDO0FBb0JFLGtCQUFZLElBcEJkO0FBcUJFLGtCQUFZLElBckJkO0FBc0JFLGtCQUFZLE9BdEJkO0FBdUJFLG1CQUFhLElBdkJmO0FBd0JFLGtCQUFZLElBeEJkO0FBeUJFLHNCQUFnQixVQXpCbEI7QUEwQkUscUJBQWUsR0ExQmpCO0FBMkJFLG9CQUFjLENBM0JoQjtBQTRCRSxpQkFBVyxDQTVCYjtBQTZCRSxxQkFBZSxVQTdCakI7QUE4QkUsb0JBQWMsRUE5QmhCO0FBK0JFLGVBQVMsS0EvQlg7QUFnQ0Usd0JBQWtCLEtBaENwQjtBQWlDRSw0QkFBc0IsVUFqQ3hCO0FBa0NFLHdCQUFrQixLQWxDcEI7QUFtQ0UsNEJBQXNCLFVBbkN4QjtBQW9DRSxnQ0FBMEIsS0FwQzVCO0FBcUNFLG9DQUE4QixVQXJDaEM7QUFzQ0UsZ0NBQTBCLEtBdEM1QjtBQXVDRSxvQ0FBOEI7QUF2Q2hDLEtBN01NLEVBc1BOO0FBQ0UsY0FBUSxVQURWO0FBRUUsaUJBQVcsMkJBRmI7QUFHRSxjQUFRLFdBSFY7QUFJRSxxQkFBZSxVQUpqQjtBQUtFLG9CQUFjLFVBTGhCO0FBTUUsbUJBQWEsR0FOZjtBQU9FLHlCQUFtQixDQVByQjtBQVFFLDRCQUFzQixDQVJ4QjtBQVNFLGdDQUEwQixVQVQ1QjtBQVVFLDJCQUFxQixDQVZ2QjtBQVdFLHlCQUFtQixLQVhyQjtBQVlFLDZCQUF1QixVQVp6QjtBQWFFLHdCQUFrQixLQWJwQjtBQWNFLDRCQUFzQixVQWR4QjtBQWVFLGlDQUEyQixLQWY3QjtBQWdCRSxxQ0FBK0IsVUFoQmpDO0FBaUJFLGdDQUEwQixLQWpCNUI7QUFrQkUsb0NBQThCLFVBbEJoQztBQW1CRSxrQkFBWSxLQW5CZDtBQW9CRSxrQkFBWSxJQXBCZDtBQXFCRSxrQkFBWSxPQXJCZDtBQXNCRSxtQkFBYSxJQXRCZjtBQXVCRSxrQkFBWSxJQXZCZDtBQXdCRSxzQkFBZ0IsVUF4QmxCO0FBeUJFLHFCQUFlLEdBekJqQjtBQTBCRSxvQkFBYyxDQTFCaEI7QUEyQkUsaUJBQVcsQ0EzQmI7QUE0QkUscUJBQWUsVUE1QmpCO0FBNkJFLG9CQUFjLEVBN0JoQjtBQThCRSxlQUFTLEdBOUJYO0FBK0JFLHdCQUFrQixLQS9CcEI7QUFnQ0UsNEJBQXNCLFVBaEN4QjtBQWlDRSx3QkFBa0IsS0FqQ3BCO0FBa0NFLDRCQUFzQixVQWxDeEI7QUFtQ0UsZ0NBQTBCLElBbkM1QjtBQW9DRSxvQ0FBOEIsVUFwQ2hDO0FBcUNFLGdDQUEwQixLQXJDNUI7QUFzQ0Usb0NBQThCO0FBdENoQyxLQXRQTSxFQThSTjtBQUNFLGNBQVEsVUFEVjtBQUVFLGlCQUFXLG1DQUZiO0FBR0UsY0FBUSxXQUhWO0FBSUUscUJBQWUsVUFKakI7QUFLRSxvQkFBYyxVQUxoQjtBQU1FLG1CQUFhLElBTmY7QUFPRSx5QkFBbUIsTUFQckI7QUFRRSw0QkFBc0IsTUFSeEI7QUFTRSxnQ0FBMEIsVUFUNUI7QUFVRSwyQkFBcUIsSUFWdkI7QUFXRSxvQkFBYyxNQVhoQjtBQVlFLHlCQUFtQixLQVpyQjtBQWFFLDZCQUF1QixVQWJ6QjtBQWNFLHdCQUFrQixLQWRwQjtBQWVFLDRCQUFzQixVQWZ4QjtBQWdCRSxpQ0FBMkIsS0FoQjdCO0FBaUJFLHFDQUErQixVQWpCakM7QUFrQkUsZ0NBQTBCLEtBbEI1QjtBQW1CRSxvQ0FBOEIsVUFuQmhDO0FBb0JFLGtCQUFZLEtBcEJkO0FBcUJFLGtCQUFZLElBckJkO0FBc0JFLGtCQUFZLE9BdEJkO0FBdUJFLG1CQUFhLElBdkJmO0FBd0JFLGtCQUFZLElBeEJkO0FBeUJFLHNCQUFnQixVQXpCbEI7QUEwQkUscUJBQWUsR0ExQmpCO0FBMkJFLG9CQUFjLElBM0JoQjtBQTRCRSxpQkFBVyxDQTVCYjtBQTZCRSxxQkFBZSxVQTdCakI7QUE4QkUsb0JBQWMsRUE5QmhCO0FBK0JFLGVBQVMsS0EvQlg7QUFnQ0Usd0JBQWtCLEtBaENwQjtBQWlDRSw0QkFBc0IsVUFqQ3hCO0FBa0NFLHdCQUFrQixLQWxDcEI7QUFtQ0UsNEJBQXNCLFVBbkN4QjtBQW9DRSxnQ0FBMEIsS0FwQzVCO0FBcUNFLG9DQUE4QixVQXJDaEM7QUFzQ0UsZ0NBQTBCLEtBdEM1QjtBQXVDRSxvQ0FBOEI7QUF2Q2hDLEtBOVJNO0FBSEQsR0F2OEJTO0FBbXhDbEIsV0FBUztBQUNQLGVBQVcsQ0FDVCxPQURTLEVBRVQsS0FGUyxFQUdULEtBSFMsRUFJVCxNQUpTLEVBS1QsTUFMUyxFQU1ULEtBTlMsRUFPVCxPQVBTLEVBUVQsS0FSUyxFQVNULE1BVFMsRUFVVCxTQVZTLEVBV1QsZ0JBWFMsQ0FESjtBQWNQLHVCQUFtQixLQWRaO0FBZVAsYUFBUztBQWZGLEdBbnhDUztBQW95Q2xCLFlBQVUsQ0FBQztBQXB5Q08sQ0FBcEI7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsU0FBU3VILHlCQUFULEdBQXFDO0FBQ25DLE1BQU0vQyxPQUFPLEdBQUdPLHVFQUFvQixDQUFDL0UsNERBQUQsQ0FBcEM7QUFDQVQsU0FBTyxDQUFDNEIsR0FBUixDQUFZcUQsT0FBWjtBQUNEOztBQUVEbkYsTUFBTSxDQUFDa0kseUJBQVAsR0FBbUNBLHlCQUFuQzs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxTQUFTRCxjQUFULEdBQTBCO0FBQ3hCLE1BQU05QyxPQUFPLEdBQUdGLDREQUFTLENBQUN0RSw0REFBRCxFQUFjLENBQWQsQ0FBekI7QUFDQVQsU0FBTyxDQUFDNEIsR0FBUixDQUFZcUQsT0FBWjtBQUNEOztBQUVEbkYsTUFBTSxDQUFDaUksY0FBUCxHQUF3QkEsY0FBeEI7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsU0FBU0Usc0JBQVQsR0FBa0M7QUFDaEMsTUFBTUMsS0FBSyxHQUFHekgsNERBQVcsQ0FBQzJFLFNBQTFCO0FBQ0EsTUFBTWQsR0FBRyxHQUFHN0QsNERBQVcsQ0FBQzRFLEtBQVosQ0FBa0JDLElBQWxCLENBQXVCLENBQXZCLENBQVo7QUFFQSxNQUFJTCxPQUFPLEdBQUcsRUFBZDtBQUNBQSxTQUFPLElBQUlFLG9FQUFpQixDQUFDK0MsS0FBRCxDQUE1QjtBQUNBakQsU0FBTyxJQUFJRSxvRUFBaUIsQ0FBQ2IsR0FBRCxDQUE1QjtBQUNBdEUsU0FBTyxDQUFDNEIsR0FBUixDQUFZcUQsT0FBWjtBQUNEOztBQUVEbkYsTUFBTSxDQUFDbUksc0JBQVAsR0FBZ0NBLHNCQUFoQzs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxTQUFTRSxlQUFULEdBQTJCO0FBQ3pCLE1BQU16QixRQUFRLEdBQUdqRyw0REFBVyxDQUFDOEUsTUFBWixDQUFtQkQsSUFBbkIsQ0FBd0IsQ0FBeEIsQ0FBakI7QUFFQSxNQUFNTCxPQUFPLEdBQUdvQiw2REFBVSxDQUFDSyxRQUFELENBQTFCO0FBRUExRyxTQUFPLENBQUM0QixHQUFSLENBQVlxRCxPQUFaO0FBQ0QsQyxDQUVEOzs7QUFDQW5GLE1BQU0sQ0FBQ3FJLGVBQVAsR0FBeUJBLGVBQXpCIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7TE9DQVRJT05TLCBzYXZlfSAgICAgICAgZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IHtwYWludFdlYXRoZXJUb1ZpZXdwb3J0fSBmcm9tIFwiLi9wYWludF91aVwiO1xuXG5jb25zdCBhc2tMb2NhdGlvbiA9ICgpID0+IHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocG9zaXRpb24gPT4ge1xuICAgICAgY29uc3QgbG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgIGNvbnN0IGxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgIC8vIFNhdmUgdGhlIGxhdCwgbG5nIHBhaXIgdG8gTG9jYWxTdG9yYWdlIGZvciB1c2UgbGF0ZXIuXG4gICAgICBzYXZlKExPQ0FUSU9OUy5MQVQsIGxhdCk7XG4gICAgICBzYXZlKExPQ0FUSU9OUy5MTkcsIGxuZyk7XG4gICAgICAvLyBGZXRjaCBkYXRhIGZyb20gRGFya1NreSBBUEkuXG4gICAgICBnZXRXZWF0aGVyRGF0YU5vdyhsYXQsIGxuZyk7XG4gICAgfSlcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBUT0RPOiBJZiBjdXJyZW50IGxvY2F0aW9uIGRlbmllZCwgc2hvdyBhIHBvcCB1cCBkZXNjcmliaW5nIGhvdyB0byBncmFudFxuICAgIC8vICBhY2Nlc3MgJiB3aHkuXG4gICAgd2luZG93LmFsZXJ0KFwiVE9ETzogc2hvdyBwb3AgdXAgZGVzY3JpYmluZyBob3cgdG8gZ3JhbnQgYWNjZXNzICYgd2h5XCIpO1xuICB9XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyRGF0YU5vdyA9IChsYXQsIGxuZykgPT4ge1xuICBpZiAoIWxhdCB8fCAhbG5nKSB7XG4gICAgY29uc29sZS53YXJuKFwiQ2FuJ3QgZ2V0IHdlYXRoZXIsIHNpbmNlIG51bGwgYXJndW1lbnRzIHdlcmVcIiArXG4gICAgICAgICAgICAgICAgICAgICBcIiBwYXNzZWQgZm9yIGxhdCBvciBsbmchXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IEFQSV9LRVkgICAgID0gJzZlYWUzMzk2ZGMzMzExY2IxMDNkMmY4NmYwM2Q1Nzc1JztcbiAgY29uc3QgdXJsICAgICAgICAgPSBgaHR0cHM6Ly9hcGkuZGFya3NreS5uZXQvZm9yZWNhc3QvJHtBUElfS0VZfS8ke2xhdH0sJHtsbmd9P2V4Y2x1ZGU9bWludXRlbHlgO1xuICBjb25zdCBjb3JzRnJlZVVybCA9IGBodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS8ke3VybH1gO1xuXG4gIGZldGNoKGNvcnNGcmVlVXJsKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHdlYXRoZXJEYXRhKSA9PiB7XG4gICAgICAgIC8vY2FsbGJhY2sobXlKc29uKTtcbiAgICAgICAgc2F2ZShMT0NBVElPTlMuV0VBVEhFUl9EQVRBLCB3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHBhaW50V2VhdGhlclRvVmlld3BvcnQod2VhdGhlckRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGlzIGEgcHJvYmxlbSBmZXRjaGluZyB0aGUgVVJMLicsIHJlYXNvbik7XG4gICAgICB9KTtcbn07XG5cbmV4cG9ydCB7YXNrTG9jYXRpb24sIGdldFdlYXRoZXJEYXRhTm93fTtcbiIsImltcG9ydCB7YXNrTG9jYXRpb259IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7XG4gIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMsXG4gIGhpZGVQb3BVcCxcbiAgcGFpbnRFbXB0eUxhbmRpbmdQYWdlLFxuICBzaG93UG9wVXAsXG59ICAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9wYWludF91aVwiO1xuaW1wb3J0IHt0ZXN0X2FsbH0gZnJvbSBcIi4vdGVzdC90ZXN0X2FsbFwiO1xuXG5jb25zdCBhdHRhY2hMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIGNvbnN0IG15TG9jYXRpb25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI215LWxvY2F0aW9uJyk7XG4gIG15TG9jYXRpb25JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXNrTG9jYXRpb24pO1xuICBteUxvY2F0aW9uSWNvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBzaG93UG9wVXApO1xuICBteUxvY2F0aW9uSWNvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3BVcCk7XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBhdHRhY2hMaXN0ZW5lcnMoKTtcbiAgcGFpbnRFbXB0eUxhbmRpbmdQYWdlKCk7XG4gIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbm1haW4oKTtcblxuLy8gdGVzdF9hbGwoKTtcblxuLy9UT0RPOlxuLy8gLSBBZGQgc2hhZG93IHRvIHRoZSB3aG9sZSB3ZWF0aGVyIGRldGFpbHMgYW5kIHN1bW1hcnlcbi8vICAgc2VjdGlvbi4gUG90ZW50aWFsbHkgdXNlIHRvZ2dsZSBhbmQgYSBDU1MgY2xhc3MgdG8gZG8gdGhpcy5cbiIsImltcG9ydCB7bG9hZCwgTE9DQVRJT05TfSAgIGZyb20gXCIuL3N0b3JhZ2VcIjtcbmltcG9ydCB7Z2V0V2VhdGhlckRhdGFOb3d9IGZyb20gXCIuL2RhdGFcIjtcblxuY29uc3Qgc2hvd1BvcFVwID0gKCkgPT4ge1xuICBjb25zdCBwb3BVcCAgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcC11cCcpO1xuICBwb3BVcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn07XG5cbmNvbnN0IGhpZGVQb3BVcCA9ICgpID0+IHtcbiAgY29uc3QgcG9wVXAgICAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3AtdXAnKTtcbiAgcG9wVXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn07XG5cbmNvbnN0IHBhaW50RW1wdHlMYW5kaW5nUGFnZSA9ICgpID0+IHtcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBsb2FkKExPQ0FUSU9OUy5XRUFUSEVSX0RBVEEpO1xuICBpZiAod2VhdGhlckRhdGEpIHtcbiAgICAvLyBGb3VuZCB3ZWF0aGVyIGRhdGEgaW4gbG9jYWwgc3RvcmFnZSwgc28gcGFpbnQgaXQuXG4gICAgcGFpbnRXZWF0aGVyVG9WaWV3cG9ydCh3ZWF0aGVyRGF0YSk7XG5cbiAgICAvLyBSZWZyZXNoIHRoZSB3ZWF0aGVyIGZvciB0aGUgbG9jYXRpb24gc2F2ZWQgaW4gbG9jYWxTdG9yYWdlLlxuICAgIGNvbnN0IGxhdCA9IGxvYWQoTE9DQVRJT05TLkxBVCk7XG4gICAgY29uc3QgbG5nID0gbG9hZChMT0NBVElPTlMuTE5HKTtcbiAgICBnZXRXZWF0aGVyRGF0YU5vdyhsYXQsIGxuZyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gd2VhdGhlciBkYXRhIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2UsIHNvIHBhaW50IGVtcHR5IHN0YXRlLlxuICAgIGNvbnNvbGUubG9nKFwiTm8gd2VhdGhlciBkYXRhIGF2YWlsYWJsZSB5ZXQuXCIpO1xuICAgIGRlbGV0ZUVsZW1lbnRCeVNlbGVjdG9yKCcjZW1wdHktc3RhdGUnKTtcblxuICAgIGNvbnN0IGJvZHkgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgZW1wdHlTdGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVtcHR5U3RhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdlbXB0eS1zdGF0ZScpO1xuICAgIGJvZHkucHJlcGVuZChlbXB0eVN0YXRlQ29udGFpbmVyKTtcblxuICAgIGVtcHR5U3RhdGVDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgPGgxPldlbGNvbWU8L2gxPlxuICAgICAgPGgyPlNlYXJjaCBhIGxvY2F0aW9uIGJlbG93IGFuZCB0aGUgPGJyPndlYXRoZXIgd2lsbCBhcHBlYXIgaGVyZS48L2gyPlxuICAgICAgPGRpdiBpZD1cInBvcC11cFwiPlxuICAgICAgICA8aDM+R2V0IHdlYXRoZXIgZm9yIGN1cnJlbnQgbG9jYXRpb248L2gzPlxuICAgICAgICA8cCBjbGFzcz1cInNwYWNlXCI+QWZ0ZXIgY2xpY2tpbmdcbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGxvY2F0aW9uLWljb24tdGV4dFwiPm15X2xvY2F0aW9uPC9pPiwgdGhlXG4gICAgICAgIGJyb3dzZXIgd2lsbCBhc2sgZm9yIHlvdXIgcGVybWlzc2lvbiB0byBrbm93IHlvdXIgbG9jYXRpb24uIENsaWNrXG4gICAgICAgIOKAnEFsbG934oCdIHRvIGJlIGFibGUgdG8gZ2V0XG4gICAgICAgIHdlYXRoZXIgZm9yIGN1cnJlbnQgbG9jYXRpb24uPC9wPlxuICAgICAgICA8aW1nIHNyYz1cImltYWdlcy9hbGxvd19hY2Nlc3Muc3ZnXCIgYWx0PVwiQWxsb3cgYnJvd3NlciBhY2Nlc3MgbG9jYXRpb25cIj5cbiAgICAgICAgPGRpdiBpZD1cInBvcC11cC1hcnJvd1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufTtcblxuLy8gVE9ETzogZG8gc29tZXRoaW5nIG1lYW5pbmcgdy8gdGhpcyBpbiB0aGUgZnV0dXJlXG5jb25zdCBnZXRIb3VyID0gKHVuaXhUaW1lc3RhbXApID0+IHtcbiAgY29uc3QgZGF0ZSAgPSBuZXcgRGF0ZSh1bml4VGltZXN0YW1wICogMTAwMCk7XG4gIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAvLyBFdmVyeSBob3VyIGZldGNoIGRhdGEgYWdhaW4uXG59O1xuXG4vLyBUT0RPOiBBY3R1YWxseSB1c2Ugd2VhdGhlckRhdGEgdG8gcGFpbnQgdGhlIFVJIChjdXJyZW50bHkgZHVtbXkgZGF0YSBpc1xuLy8gIHBhaW50ZWQpXG5jb25zdCBwYWludFdlYXRoZXJUb1ZpZXdwb3J0ID0gKCkgPT4ge1xuICAvLyBEZWxldGUgZW1wdHkgc3RhdGUgZGVzaWduXG4gIGRlbGV0ZUVsZW1lbnRCeVNlbGVjdG9yKCcjZW1wdHktc3RhdGUnKTtcbiAgZGVsZXRlRWxlbWVudEJ5U2VsZWN0b3IoJyNhbGwtd2VhdGhlci1jb250YWluZXInKTtcbiAgLy8gUGFpbnQgbmV3IGludGVyZmFjZVxuICBjb25zdCBib2R5ICAgICAgICAgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBhbGxXZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFsbFdlYXRoZXJDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdhbGwtd2VhdGhlci1jb250YWluZXInKTtcbiAgYWxsV2VhdGhlckNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBib2R5LnByZXBlbmQoYWxsV2VhdGhlckNvbnRhaW5lcik7XG5cbiAgLy8gTWFrZSBhIGxvb3AgdG8gcGFpbnQgYXMgbWFueSBkYXlzIGFzIEkgaGF2ZSB0aGUgZGF0YS5cbiAgYWxsV2VhdGhlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRheS13ZWF0aGVyLWNvbnRhaW5lclwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm92ZXJ2aWV3LWNvbnRhaW5lclwiPlxuICAgICAgPGgyIGNsYXNzPVwiZGF5LWhlYWRlclwiPk5vdzwvaDI+XG4gICAgICA8aW1nIGNsYXNzPVwibGFyZ2UtaWNvblwiIHNyYz1cImltYWdlcy9zdW4uc3ZnXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGVtcGVyYXR1cmVzLWNvbnRhaW5lci1sYXJnZVwiPlxuICAgICAgICA8cCBjbGFzcz1cInNlbGVjdGVkLXRlbXBcIj4xMDxzcGFuIGNsYXNzPVwiYy10ZW1wXCI+JiM4NDUxOzwvc3Bhbj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwibm90LXNlbGVjdGVkLXRlbXBcIj41MDxzcGFuIGNsYXNzPVwiZi10ZW1wXCI+JiM4NDU3Ozwvc3Bhbj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwiYWxsLWhvdXJzLWNvbnRhaW5lclwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaG91ci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXItc3VtbWFyeVwiPlxuICAgICAgICAgIDxwPk5vdzwvcD5cbiAgICAgICAgICA8aW1nIGNsYXNzPVwic21hbGwtaWNvblwiIHNyYz1cImltYWdlcy9zbWFsbF9zdW4uc3ZnXCI+XG4gICAgICAgICAgPHA+MTA8c3Bhbj4mIzE3Njs8L3NwYW4+LzUwPHNwYW4+JiMxNzY7PC9zcGFuPjwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXItZGV0YWlsc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWNvbFwiPlxuICAgICAgICAgICAgPHA+V2luZDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1zcGFjZVwiPlVWIGluZGV4PC9wPlxuICAgICAgICAgICAgPHA+SHVtaWRpdHk8L3A+XG4gICAgICAgICAgICA8cD5EZXcgcG9pbnQ8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtc3BhY2VcIj5QcmVjaXBpdGF0aW9uPC9wPlxuICAgICAgICAgICAgPHA+U3VucmlzZTwvcD5cbiAgICAgICAgICAgIDxwPlN1bnNldDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtY29sXCI+XG4gICAgICAgICAgICA8cD5Nb2RlcmF0ZSAoMjRrbS9oKTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1zcGFjZVwiPlZlcnkgaGlnaCAoMTApPC9wPlxuICAgICAgICAgICAgPHA+NTAlPC9wPlxuICAgICAgICAgICAgPHA+MTRDPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLXNwYWNlXCI+MCU8L3A+XG4gICAgICAgICAgICA8cD42OjA1IEFNPC9wPlxuICAgICAgICAgICAgPHA+ODoyMyBQTTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuICBgO1xuXG59O1xuXG5jb25zdCBkZWxldGVFbGVtZW50QnlTZWxlY3RvciA9IChzZWxlY3RvcikgPT4ge1xuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGRpdlRvUmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIGlmICghZGl2VG9SZW1vdmUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGl2VG9SZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXZUb1JlbW92ZSk7XG59O1xuXG5cbmZ1bmN0aW9uIHNob3dXZWF0aGVyRGV0YWlscygpIHtcbiAgY29uc29sZS5sb2coXCJTaG93IHdlYXRoZXIgZGV0YWlscyBpcyB3b3JraW5nXCIpO1xuICBjb25zdCBob3VyRGV0YWlscyA9IHRoaXMucXVlcnlTZWxlY3RvcignLmhvdXItZGV0YWlscycpO1xuICBob3VyRGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdob3VyLWRldGFpbHMtYWNjb3JkaW9uJyk7XG5cbiAgY29uc3QgaG91ckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VyLWNvbnRhaW5lcicpO1xuICBjb25zb2xlLmxvZyhob3VyQ29udGFpbmVyKTtcbiAgaG91ckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbm5lci1zaGFkb3cnKTtcbn1cblxuY29uc3QgYWRkQ2xpY2tFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgaG91ckNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG91ci1jb250YWluZXInKVswXTtcbiAgaG91ckNvbnRhaW5lcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtjb25zb2xlLmxvZyhcIkNsaWNrXCIgK1xuICAgICAgXCIgZXZlbnQgbGlzdGVuZXIgaXMgd29ya2luZyEhISEhXCIpO30pO1xuXG4gIC8vIGZvciAoY29uc3QgY29udGFpbmVyIG9mIGhvdXJDb250YWluZXJzKSB7XG4gIC8vICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1dlYXRoZXJEZXRhaWxzKTtcbiAgLy8gfVxufTtcblxuXG5leHBvcnQge1xuICBzaG93UG9wVXAsXG4gIGhpZGVQb3BVcCxcbiAgcGFpbnRFbXB0eUxhbmRpbmdQYWdlLFxuICBkZWxldGVFbGVtZW50QnlTZWxlY3RvcixcbiAgcGFpbnRXZWF0aGVyVG9WaWV3cG9ydCxcbiAgYWRkQ2xpY2tFdmVudExpc3RlbmVycyxcbn07XG4iLCJpbXBvcnQge3dlYXRoZXJEYXRhfSBmcm9tIFwiLi90ZXN0L3Rlc3RfZHVtbXlfZGF0YVwiO1xuXG5jb25zdCBmMmMgPSBmID0+IE1hdGgucm91bmQoKGYgLSAzMikgKiA1IC8gOSk7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg0NzE4NS9jb252ZXJ0LWEtdW5peC10aW1lc3RhbXAtdG8tdGltZS1pbi1qYXZhc2NyaXB0XG5jb25zdCBjYWxjVGltZSA9IHVuaXhUaW1lID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lICogMTAwMCk7XG4gIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICBjb25zdCBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcblxuICAvLyBJZiBob3VycyBpcyBtb3JlIHRoYW4gMTIsIHRoZW4gaXQncyBQTSwgZWxzZSBpdCdzIEFNLlxuICBpZiAoaG91cnMgPiAxMikge1xuICAgIHJldHVybiBgJHtob3VycyAtIDEyfToke21pbnV0ZXMuc3Vic3RyaW5nKG1pbnV0ZXMubGVuZ3RoIC0gMil9IFBNYDtcbiAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlcy5zdWJzdHJpbmcobWludXRlcy5sZW5ndGggLSAyKX0gUE1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzLnN1YnN0cmluZyhtaW51dGVzLmxlbmd0aCAtIDIpfSBBTWA7XG4gIH1cbn07XG5cbmNvbnN0IGNhbGNIb3VyID0gdW5peFRpbWUgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodW5peFRpbWUgKiAxMDAwKTtcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gIC8vIElmIGhvdXJzIGlzIG1vcmUgdGhhbiAxMiwgdGhlbiBpdCdzIFBNLCBlbHNlIGl0J3MgQU0uXG4gIGlmIChob3VycyA+IDEyKSB7XG4gICAgcmV0dXJuIGAke2hvdXJzIC0gMTJ9IFBNYDtcbiAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICByZXR1cm4gYCR7aG91cnN9IFBNYDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYCR7aG91cnN9IEFNYDtcbiAgfVxufTtcblxuY29uc3QgZ2V0Q3VycmVudEhvdXIgPSB1bml4VGltZSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZSAqIDEwMDApO1xuICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgcmV0dXJuIGhvdXJzO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IHVuaXhUaW1lID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lICogMTAwMCk7XG5cbiAgY29uc3QgZGF5SW5kZXggPSBkYXRlLmdldERheSgpOyAgLy8gcmV0dXJucyAwIC0gNi4gU3VuZGF5IC0gU2F0dXJkYXkgOiAwIC0gNi5cbiAgY29uc3QgZGF5TmFtZXMgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xuICBjb25zdCBkYXkgPSBkYXlOYW1lc1tkYXlJbmRleF07XG5cbiAgY29uc3QgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgbW9udGhOYW1lcyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsXG4gICAgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbbW9udGhJbmRleF07XG5cbiAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gIHJldHVybiBgJHtkYXl9LCAke21vbnRofSAke2RheU9mTW9udGh9YDtcbn07XG4vKlxuT3ZlcnZpZXcgb2YgV0VBVEhFUl9EQVRBOlxuXG5jdXJyZW50bHk6IHt0aW1lOiAxNTY5ODEyNzUwLCBzdW1tYXJ5OiBcIlBhcnRseSBDbG91ZHlcIiwgaWNvbjogXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIsIG5lYXJlc3RTdG9ybURpc3RhbmNlOiAxMywgbmVhcmVzdFN0b3JtQmVhcmluZzogNjIsIOKApn1cbmRhaWx5OiB7c3VtbWFyeTogXCJObyBwcmVjaXBpdGF0aW9uIHRocm91Z2hvdXQgdGhlIHdlZWssIHdpdGggaGlnaCB0ZW1wZXJhdHVyZXMgcmlzaW5nIHRvIDg0wrBGIG9uIFNhdHVyZGF5LlwiLCBpY29uOiBcImNsZWFyLWRheVwiLCBkYXRhOiBBcnJheSg4KX1cbmZsYWdzOiB7c291cmNlczogQXJyYXkoMTEpLCBuZWFyZXN0LXN0YXRpb246IDIuNjEzLCB1bml0czogXCJ1c1wifVxuaG91cmx5OiB7c3VtbWFyeTogXCJDbGVhciB0aHJvdWdob3V0IHRoZSBkYXkuXCIsIGljb246IFwiY2xlYXItZGF5XCIsIGRhdGE6IEFycmF5KDQ5KX1cbmxhdGl0dWRlOiAzNy4zOTE0MDg2XG5sb25naXR1ZGU6IC0xMjIuMDA0MTY3ODk5OTk5OThcbm9mZnNldDogLTdcbnRpbWV6b25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIlxuICovXG5cbi8qXG5TYW1wbGUgb2Ygd2VhdGhlckRhdGEuZGFpbHkuZGF0YTpcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk4MjY4MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFxuICAgICAgICBcImljb25cIjogXCJwYXJ0bHktY2xvdWR5LWRheVwiLFxuICAgICAgICBcInN1bnJpc2VUaW1lXCI6IDE1Njk4NTIyMzIsXG4gICAgICAgIFwic3Vuc2V0VGltZVwiOiAxNTY5ODk0ODY4LFxuICAgICAgICBcIm1vb25QaGFzZVwiOiAwLjA5LFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4XCI6IDAuMDAxOCxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlNYXhUaW1lXCI6IDE1Njk4OTg4MDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4xNixcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFwiOiA2Ni4wNixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1Njk4ODQ0MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dcIjogNDQuNjIsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1Njk5Mzg0MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hcIjogNjUuMzksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1Njk4ODQ0MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1wiOiA0NS4yNyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTY5OTM4NDAwLFxuICAgICAgICBcImRld1BvaW50XCI6IDQwLjg3LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNTYsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS4zNSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNC41NSxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxNi44NixcbiAgICAgICAgXCJ3aW5kR3VzdFRpbWVcIjogMTU2OTg4ODAwMCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyNzMsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjM1LFxuICAgICAgICBcInV2SW5kZXhcIjogNSxcbiAgICAgICAgXCJ1dkluZGV4VGltZVwiOiAxNTY5ODczNjAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogOS44NjQsXG4gICAgICAgIFwib3pvbmVcIjogMzIzLjgsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5cIjogNTAuOTgsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1Njk5MTMyMDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhcIjogNjYuMDYsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhUaW1lXCI6IDE1Njk4ODQ0MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1pblwiOiA1MS42MyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluVGltZVwiOiAxNTY5OTEzMjAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNYXhcIjogNjUuMzksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFRpbWVcIjogMTU2OTg4NDQwMFxuICAgICAgfVxuXG4gKi9cbi8vIEdsb2JhbHNcbmxldCBob3VyID0gODtcbmxldCB0b3RhbEhvdXJzTGVmdDtcblxuY29uc3QgcmVuZGVyRGF5ID0gKHdlYXRoZXJEYXRhLCBpbmRleCkgPT4ge1xuICBsZXQgY29udGVudCA9ICcnO1xuXG4gIGZ1bmN0aW9uIHBhaW50RGF5T3ZlcnZpZXcoKSB7XG4gICAgLy8gSWYgaXQncyBkYXkgMSAodG9kYXkpLCBwYXNzIHdlYXRoZXJEYXRhLmN1cnJlbnRseSB0byB0aGUgZnVuY3Rpb24uXG4gICAgLy8gZWxzZSBwYXNzIHdlYXRoZXJEYXRhLmRhaWx5LmRhdGFbMV1cbiAgICBpZiAoaG91ciA9PT0gMCkge1xuICAgICAgY29udGVudCArPSByZW5kZXJEYXlPdmVydmlldyh3ZWF0aGVyRGF0YS5jdXJyZW50bHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ICs9IHJlbmRlckRheU92ZXJ2aWV3KHdlYXRoZXJEYXRhLmRhaWx5LmRhdGFbaW5kZXhdKTtcbiAgICB9XG4gIH1cblxuICBwYWludERheU92ZXJ2aWV3KCk7XG5cbiAgLy8gSWYgbm8gaG91cnMgbGVmdC4uLi4uIGRvbid0IHByaW50IHRoZW1cbiAgaWYgKHdlYXRoZXJEYXRhLmhvdXJseS5kYXRhKXtcbiAgICBjb250ZW50ICs9IHJlbmRlckFsbEhvdXJzUGVyRGF5KHdlYXRoZXJEYXRhKTtcbiAgfVxuXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cImRheS13ZWF0aGVyLWNvbnRhaW5lclwiPiR7Y29udGVudH08L2Rpdj5gO1xufTtcblxuXG5jb25zdCByZW5kZXJBbGxEYXlzID0gKHdlYXRoZXJEYXRhKSA9PiB7XG4vLyBQdXQgcmVuZGVyRGF5IHRocm91Z2ggYSBsb29wXG4gIGNvbnN0IGRhaWx5RGF0YUFycmF5ID0gd2VhdGhlckRhdGEuZGFpbHkuZGF0YTtcbiAgZGFpbHlEYXRhQXJyYXkubWFwKHJlbmRlckRheSh3ZWF0aGVyRGF0YSkpLmpvaW4oJycpO1xuICBjb25zb2xlLmxvZyhkYWlseURhdGFBcnJheS5tYXAocmVuZGVyRGF5KHdlYXRoZXJEYXRhKSkuam9pbignJykpO1xufTtcblxuXG4vLyBQYXNzIGVpdGhlciB3ZWF0aGVyRGF0YS5jdXJyZW50bHkgb3Jcbi8vIHBhc3Mgd2VhdGhlckRhdGEuZGFpbHkuZGF0YVxuY29uc3QgcmVuZGVyRGF5T3ZlcnZpZXcgPSBkYXRhID0+IHtcbiAgY29uc3QgZGF0ZSA9IGZvcm1hdERhdGUoZGF0YS50aW1lKTtcbiAgY29uc3QgaWNvbiA9IGRhdGEuaWNvbjtcbiAgY29uc3QgcmlnaHRUZW1wZXJhdHVyZUYgPSBkYXRhLnRlbXBlcmF0dXJlID8gTWF0aC5yb3VuZChkYXRhLnRlbXBlcmF0dXJlKSA6XG4gICAgICBNYXRoLnJvdW5kKGRhdGEudGVtcGVyYXR1cmVIaWdoKTtcbiAgY29uc3QgcmlnaHRUZW1wZXJhdHVyZUMgPSBmMmMocmlnaHRUZW1wZXJhdHVyZUYpO1xuXG4gIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIm92ZXJ2aWV3LWNvbnRhaW5lclwiPlxuICAgICAgPGgyIGNsYXNzPVwiZGF5LWhlYWRlclwiPiR7ZGF0ZX08L2gyPlxuICAgICAgPGltZyBjbGFzcz1cImxhcmdlLWljb25cIiBzcmM9XCJpbWFnZXMvJHtpY29ufVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRlbXBlcmF0dXJlcy1jb250YWluZXItbGFyZ2VcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJzZWxlY3RlZC10ZW1wXCI+JHtyaWdodFRlbXBlcmF0dXJlQ308c3BhbiBjbGFzcz1cImMtdGVtcFwiPiYjODQ1MTs8L3NwYW4+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cIm5vdC1zZWxlY3RlZC10ZW1wXCI+JHtyaWdodFRlbXBlcmF0dXJlRn08c3BhbiBjbGFzcz1cImYtdGVtcFwiPiYjODQ1Nzs8L3NwYW4+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG59O1xuXG5cbi8vIFJlbmRlciBhbGwgaG91cnMgZm9yIE9ORSBkYXkuXG5jb25zdCByZW5kZXJBbGxIb3Vyc1BlckRheSA9IHdlYXRoZXJEYXRhID0+IHtcbiAgY29uc3QgaG91ckFycmF5ID0gd2VhdGhlckRhdGEuaG91cmx5LmRhdGE7XG4gIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0gd2VhdGhlckRhdGEuY3VycmVudGx5O1xuICBsZXQgY29udGVudCA9IFwiXCI7XG5cbiAgdG90YWxIb3Vyc0xlZnQgPSBob3VyQXJyYXkubGVuZ3RoOyAgICAgIC8vNDlcbiAgY29uc29sZS5sb2coYFRvdGFsIGhvdXJzIGxlZnQgaXMgPSAke3RvdGFsSG91cnNMZWZ0fWApO1xuICAvLyBJZiBpdCdzIGEgZGF5IDEsIGdlbmVyYXRlIGZpcnN0IGhvdXIgd2l0aCBjdXJyZW50IHdlYXRoZXIgZGF0YS5cbiAgaWYgKGhvdXIgPT09IDApIHtcbiAgICBjb250ZW50ICs9IHJlbmRlckhvdXIoY3VycmVudFdlYXRoZXIpO1xuICAgIGhvdXIgKys7XG4gIH1cblxuICAvLyBJbmNyZW1lbnQgdGhlIGN1cnJlbnQgd2VhdGhlciBob3VyIGJ5IDEsIGJlY2F1c2Ugd2UgaGF2ZSBhbHJlYWR5XG4gIC8vIHByaW50ZWQgdGhlIGN1cnJlbnQgd2VhdGhlciBob3VyIG9uIHRoZSB2aWV3cG9ydC5cbiAgY29uc3QgY3VycmVudEhvdXIgPSBob3VyID09PSAxID8gKGdldEN1cnJlbnRIb3VyKGN1cnJlbnRXZWF0aGVyLnRpbWUpICsgMSkgOiAwOyAvLzE3XG4gIGNvbnNvbGUubG9nKGBDdXJyZW50IGhvdXIgaXMgPSAke2N1cnJlbnRIb3VyfWApOyAgLy8xN1xuICBjb25zdCBob3Vyc0luQURheSA9IDI0O1xuICBjb25zdCBob3Vyc0xlZnRJbkFEYXkgPSBob3Vyc0luQURheSAtIGN1cnJlbnRIb3VyOyAgICAgICAgICAvLyAyNC0xNyA9IDdcbiAgY29uc29sZS5sb2coYEhvdXJzIGxlZnQgaW4gYSBkYXkgd2l0aG91dCBkb2luZyBhbnl0aGluZyB5ZXQgPSAke2hvdXJzTGVmdEluQURheX1gKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3Vyc0xlZnRJbkFEYXkgJiYgaG91ciA8IGhvdXJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnRlbnQgKz0gcmVuZGVySG91cihob3VyQXJyYXlbaG91cl0pO1xuICAgIGhvdXIrKztcbiAgfVxuXG4gIHRvdGFsSG91cnNMZWZ0IC09IGhvdXJzTGVmdEluQURheTtcbiAgY29uc29sZS5sb2coYFRvdGFsIGhvdXJzIGxlZnQgaXMgPSAke3RvdGFsSG91cnNMZWZ0fWApO1xuICBjb25zb2xlLmxvZyhgQWxsIGhvdXJzIHBhaW50ZWQgYWZ0ZXIgdGhlIGRheShzKSBpcyA9ICR7aG91cn1gKTtcblxuICByZXR1cm4gYDxkaXYgY2xhc3M9XCJhbGwtaG91cnMtY29udGFpbmVyXCI+JHtjb250ZW50fTwvZGl2PmA7XG59O1xuXG4vKlxuQW4gXCJob3VyXCIgb2YgZGF0YSBsb29rcyBsaWtlIHRoaXM6XG5cbntcbiAgXCJ0aW1lXCI6IDE1Njk4MTI0MDAsXG4gIFwic3VtbWFyeVwiOiBcIlBhcnRseSBDbG91ZHlcIixcbiAgXCJpY29uXCI6IFwicGFydGx5LWNsb3VkeS1uaWdodFwiLFxuICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gIFwidGVtcGVyYXR1cmVcIjogNTguODYsXG4gIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA1OC44NixcbiAgXCJkZXdQb2ludFwiOiA0MS41NixcbiAgXCJodW1pZGl0eVwiOiAwLjUzLFxuICBcInByZXNzdXJlXCI6IDEwMTMuNDYsXG4gIFwid2luZFNwZWVkXCI6IDMuNDMsXG4gIFwid2luZEd1c3RcIjogMTAuNDcsXG4gIFwid2luZEJlYXJpbmdcIjogMjY4LFxuICBcImNsb3VkQ292ZXJcIjogMC4zNyxcbiAgXCJ1dkluZGV4XCI6IDAsXG4gIFwidmlzaWJpbGl0eVwiOiA5LjYyNSxcbiAgXCJvem9uZVwiOiAzMzQuNlxufVxuICovXG5cbmZ1bmN0aW9uIHJlbmRlckhvdXIoaG91ckRhdGEpIHtcbiAgY29uc3QgaG91ckV2YWx1YXRlZCA9IGNhbGNIb3VyKGhvdXJEYXRhLnRpbWUpO1xuICBjb25zdCBpY29uID0gaG91ckRhdGEuaWNvbjtcbiAgY29uc3QgdGVtcGVyYXR1cmVGID0gTWF0aC5yb3VuZChob3VyRGF0YS50ZW1wZXJhdHVyZSk7XG4gIGNvbnN0IHRlbXBlcmF0dXJlQyA9IGYyYyh0ZW1wZXJhdHVyZUYpO1xuICBjb25zdCB3aW5kID0gaG91ckRhdGEud2luZFNwZWVkO1xuICBjb25zdCB1dkluZGV4ID0gaG91ckRhdGEudXZJbmRleDtcbiAgY29uc3QgaHVtaWRpdHkgPSBob3VyRGF0YS5odW1pZGl0eTtcbiAgY29uc3QgZGV3UG9pbnQgPSBob3VyRGF0YS5kZXdQb2ludDtcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IGhvdXJEYXRhLnByZWNpcFByb2JhYmlsaXR5O1xuICAvLyBjb25zdCBzdW5yaXNlICAgICA9IGNhbGNUaW1lKGRhaWx5RGF0YS5zdW5yaXNlVGltZSk7XG4gIC8vIGNvbnN0IHN1bnNldCAgICAgPSBjYWxjVGltZShkYWlseURhdGEuc3Vuc2V0VGltZSk7XG4gIGNvbnN0IGhvdXJUb1ByaW50ID0gaG91ciA9PT0gMCA/IFwiTm93XCIgOiBob3VyRXZhbHVhdGVkO1xuICBsZXQgY29udGVudCA9XG4gICAgICBgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJob3VyLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG91ci1zdW1tYXJ5XCI+XG4gICAgICAgICAgPHA+JHtob3VyVG9QcmludH08L3A+XG4gICAgICAgICAgPGltZyBjbGFzcz1cInNtYWxsLWljb25cIiBzcmM9XCJpbWFnZXMvJHtpY29ufVwiPlxuICAgICAgICAgIDxwPiR7dGVtcGVyYXR1cmVDfTxzcGFuPiYjMTc2Ozwvc3Bhbj4vJHt0ZW1wZXJhdHVyZUZ9PHNwYW4+JiMxNzY7PC9zcGFuPjwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXItZGV0YWlsc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWNvbFwiPlxuICAgICAgICAgICAgPHA+V2luZDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1zcGFjZVwiPlVWIGluZGV4PC9wPlxuICAgICAgICAgICAgPHA+SHVtaWRpdHk8L3A+XG4gICAgICAgICAgICA8cD5EZXcgcG9pbnQ8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtc3BhY2VcIj5QcmVjaXBpdGF0aW9uPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1jb2xcIj5cbiAgICAgICAgICAgIDxwPiR7d2luZH0gbXBoPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLXNwYWNlXCI+JHt1dkluZGV4fTwvcD5cbiAgICAgICAgICAgIDxwPiR7aHVtaWRpdHl9PC9wPlxuICAgICAgICAgICAgPHA+JHtkZXdQb2ludH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtc3BhY2VcIj4ke3ByZWNpcGl0YXRpb259PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG5gO1xuICByZXR1cm4gY29udGVudDtcbn1cblxuLy8gVE9ETzogZXhwb3J0IG9ubHkgdGhlIGZ1bmN0aW9ucyB0aGF0IGFyZSByZXF1aXJlZCBieSBvdGhlciBmaWxlcy5cbmV4cG9ydCB7XG4gIHJlbmRlckhvdXIsXG4gIHJlbmRlckFsbEhvdXJzUGVyRGF5LFxuICByZW5kZXJEYXlPdmVydmlldyxcbiAgcmVuZGVyRGF5LFxufVxuIiwiLyoqXG4gKiBUaGUgZm9sbG93aW5nIGtleXMgYXJlIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2UuXG4gKi9cbmNvbnN0IExPQ0FUSU9OUyA9IHtcbiAgV0VBVEhFUl9EQVRBOiBcIldFQVRIRVJfREFUQVwiLFxuICBMQVQgICAgICAgICA6IFwiTEFUXCIsXG4gIExORyAgICAgICAgIDogXCJMTkdcIlxufTtcblxuLyoqXG4gKiBHaXZlbiB0aGUga2V5IGFuZCB0aGUgdmFsdWUsIHRoZSBzdHJpbmdpZmllZCB2YWx1ZSBpcyBzYXZlZCB0byBsb2NhbFN0b3JhZ2UuXG4gKi9cbmNvbnN0IHNhdmUgPSAoa2V5LCB3ZWF0aGVyRGF0YSkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHdlYXRoZXJEYXRhKSk7XG4gIGNvbnNvbGUubG9nKGBEYXRhIGZvciBrZXkgXCIke2tleX1cIiBzYXZlZCB0byBsb2NhbFN0b3JhZ2VgKTtcbn07XG5cbi8qKlxuICogSWYgdGhlIGtleSBpcyBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UgdGhlbiBpdCByZXR1cm5zIHRoZSBwYXJzZWQgdmFsdWUgZm9yIGl0LlxuICogT3RoZXJ3aXNlIHJldHVybnMgbnVsbC5cbiAqL1xuY29uc3QgbG9hZCA9IChrZXkpID0+IHtcbiAgY29uc3QgZGF0YUZyb21TdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgaWYgKCFkYXRhRnJvbVN0b3JhZ2UpIHtcbiAgICBjb25zb2xlLndhcm4oYERhdGEgZm9yIGtleSBcIiR7a2V5fVwiIG5vdCBmb3VuZCBpbiBsb2NhbFN0b3JhZ2VgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc29sZS5sb2coYERhdGEgZm9yIGtleSBcIiR7a2V5fVwiIGxvYWRlZCBmcm9tIGxvY2FsU3RvcmFnZWAsIGRhdGFGcm9tU3RvcmFnZSk7XG4gIHJldHVybiBkYXRhRnJvbVN0b3JhZ2U7XG59O1xuXG5leHBvcnQge3NhdmUsIGxvYWQsIExPQ0FUSU9OU307XG4iLCJpbXBvcnQge3Rlc3RfcmVuZGVySG91cn0gZnJvbSBcIi4vdGVzdF9yZW5kZXJIb3VyXCI7XG5pbXBvcnQge3Rlc3RfcmVuZGVyQWxsSG91cnNQZXJEYXl9IGZyb20gXCIuL3Rlc3RfcmVuZGVyQWxsSG91cnNQZXJEYXlcIjtcbmltcG9ydCB7dGVzdF9yZW5kZXJEYXlPdmVydmlld30gZnJvbSBcIi4vdGVzdF9yZW5kZXJEYXlPdmVydmlld1wiO1xuaW1wb3J0IHt0ZXN0X3JlbmRlckRheX0gZnJvbSBcIi4vdGVzdF9yZW5kZXJEYXlcIjtcblxuZnVuY3Rpb24gdGVzdF9hbGwoKSB7XG4gIC8vIHRlc3RfcmVuZGVySG91cigpO1xuICAvLyB0ZXN0X3JlbmRlckFsbEhvdXJzUGVyRGF5KCk7XG4gIC8vIHRlc3RfcmVuZGVyRGF5T3ZlcnZpZXcoKTtcbiAgdGVzdF9yZW5kZXJEYXkoKTtcbn1cblxuZXhwb3J0IHt0ZXN0X2FsbH1cbiIsIi8vIER1bW15IGRhdGFcbi8vIHdlYXRoZXJEYXRhLmN1cnJlbnRseS50aW1lIGlzIE1vbiBTZXAgMzAgMjAxOSAxNjo1MjowNlxuLy8gd2VhdGhlckRhdGEuaG91cmx5LmRhdGFbMF0udGltZSBpcyBNb24gU2VwIDMwIDIwMTkgMTY6MDA6MDBcbi8vIHdlYXRoZXJEYXRhLmhvdXJseS5kYXRhWzFdLnRpbWUgaXMgTW9uIFNlcCAzMCAyMDE5IDE3OjAwOjAwXG4vLyB3ZWF0aGVyRGF0YS5ob3VybHkuZGF0YVsyXS50aW1lIGlzIE1vbiBTZXAgMzAgMjAxOSAxODowMDowMFxuLy8gLi4uXG5cbi8vd2VhdGhlckRhdGEuZGFpbHkuZGF0YVswXS50aW1lIGlzIE1vbiBTZXAgMzAgMjAxOSAwMDowMDowMFxuLy93ZWF0aGVyRGF0YS5kYWlseS5kYXRhWzFdLnRpbWUgaXMgVHVlIE9jdCAwMSAyMDE5IDAwOjAwOjAwXG4vL3dlYXRoZXJEYXRhLmRhaWx5LmRhdGFbMl0udGltZSBpcyBXZWQgT2N0IDAyIDIwMTkgMDA6MDA6MDBcbi8vIC4uLlxuXG5jb25zdCB3ZWF0aGVyRGF0YSA9IHtcbiAgXCJsYXRpdHVkZVwiOiAzNy4zOTE0MDg2LFxuICBcImxvbmdpdHVkZVwiOiAtMTIyLjAwNDE2Nzg5OTk5OTk4LFxuICBcInRpbWV6b25lXCI6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiLFxuICBcImN1cnJlbnRseVwiOiB7XG4gICAgXCJ0aW1lXCI6IDE1Njk4ODc1MjYsXG4gICAgXCJzdW1tYXJ5XCI6IFwiUGFydGx5IENsb3VkeVwiLFxuICAgIFwiaWNvblwiOiBcInBhcnRseS1jbG91ZHktZGF5XCIsXG4gICAgXCJuZWFyZXN0U3Rvcm1EaXN0YW5jZVwiOiAzMSxcbiAgICBcIm5lYXJlc3RTdG9ybUJlYXJpbmdcIjogMTQ4LFxuICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgIFwidGVtcGVyYXR1cmVcIjogNjQuODUsXG4gICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDY0Ljg1LFxuICAgIFwiZGV3UG9pbnRcIjogMzYuMDgsXG4gICAgXCJodW1pZGl0eVwiOiAwLjM0LFxuICAgIFwicHJlc3N1cmVcIjogMTAxNi4wMSxcbiAgICBcIndpbmRTcGVlZFwiOiA3LjgsXG4gICAgXCJ3aW5kR3VzdFwiOiAxNi42NyxcbiAgICBcIndpbmRCZWFyaW5nXCI6IDI5NixcbiAgICBcImNsb3VkQ292ZXJcIjogMC4xNSxcbiAgICBcInV2SW5kZXhcIjogMSxcbiAgICBcInZpc2liaWxpdHlcIjogOC40OTksXG4gICAgXCJvem9uZVwiOiAzMjkuMVxuICB9LFxuICBcImhvdXJseVwiOiB7XG4gICAgXCJzdW1tYXJ5XCI6IFwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXG4gICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgXCJkYXRhXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk4ODQ0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIlBhcnRseSBDbG91ZHlcIixcbiAgICAgICAgXCJpY29uXCI6IFwicGFydGx5LWNsb3VkeS1kYXlcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDY1LjM5LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNjUuMzksXG4gICAgICAgIFwiZGV3UG9pbnRcIjogMzMuNTUsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4zMSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE1LjI0LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA3LjU3LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDE0LjU5LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI5OCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMTUsXG4gICAgICAgIFwidXZJbmRleFwiOiAyLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogOS45MjYsXG4gICAgICAgIFwib3pvbmVcIjogMzMxLjNcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5ODg4MDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJQYXJ0bHkgQ2xvdWR5XCIsXG4gICAgICAgIFwiaWNvblwiOiBcInBhcnRseS1jbG91ZHktZGF5XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA2NC42NyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDY0LjY3LFxuICAgICAgICBcImRld1BvaW50XCI6IDM2LjM0LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMzUsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi4wNSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNy43OSxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxNi44NixcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyOTYsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjE1LFxuICAgICAgICBcInV2SW5kZXhcIjogMSxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDguMzcyLFxuICAgICAgICBcIm96b25lXCI6IDMyOS4xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTg5MTYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiUGFydGx5IENsb3VkeVwiLFxuICAgICAgICBcImljb25cIjogXCJwYXJ0bHktY2xvdWR5LWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjIuNzUsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA2Mi43NSxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzNi41MyxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjM4LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuNCxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNy4yNSxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxNi42MSxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyODgsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjEzLFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDguNTczLFxuICAgICAgICBcIm96b25lXCI6IDMzMy43XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTg5NTIwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDYwLjUyLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNjAuNTIsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDAuMTcsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC40NyxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjAyLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA3LjE3LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDE1LjE3LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI5NCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDUsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzM0LjZcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5ODk4ODAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMTgsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMSxcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDU3Ljg1LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTcuODUsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuMjgsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC41OCxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjIxLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA2Ljg0LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDE0LjQ5LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDMwMSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDEsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzI5LjdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTAyNDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDIsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMSxcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDU1LjY3LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTUuNjcsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuNTgsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC42NCxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjE0LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA1LjQ1LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDEyLjAyLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDMxMSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDQsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzMyLjdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTA2MDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNTQuMDMsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA1NC4wMyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My44OCxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjY4LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTYuMDUsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDQuMDgsXG4gICAgICAgIFwid2luZEd1c3RcIjogOC43LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI4NCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDYsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzI5LjlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTA5NjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDIsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMSxcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDUyLjc0LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTIuNzQsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuOTksXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC43MixcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjE3LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAzLjQzLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDYuODIsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMjczLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMC4wNixcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAzMjUuNFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5MTMyMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA1MS42MyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDUxLjYzLFxuICAgICAgICBcImRld1BvaW50XCI6IDQzLjc2LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNzQsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS45LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAyLjkzLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDUuOSxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyNzMsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjA2LFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDMyNS42XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTkxNjgwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDUwLjUyLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTAuNTIsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuNTIsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC43NyxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE1LjY3LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAyLjUyLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDQuNzksXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMjYxLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMC4wNyxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAzMjQuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5MjA0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA0OS42OSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDQ5LjY5LFxuICAgICAgICBcImRld1BvaW50XCI6IDQzLjMxLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNzksXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS43NCxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4zNCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA0LjA2LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI2NyxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDgsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzIzLjhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTI0MDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDguNzQsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0OC43NCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My4wNSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjgxLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuNSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4yNixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAzLjEyLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDM0MCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDYsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzIzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTkyNzYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMC4wMDA0LFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAuMDIsXG4gICAgICAgIFwicHJlY2lwVHlwZVwiOiBcInJhaW5cIixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA0Ny44NixcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDQ3Ljg2LFxuICAgICAgICBcImRld1BvaW50XCI6IDQyLjgxLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuODMsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS42NCxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi40NyxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAzLjE4LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDIyNixcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDUsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzIzLjZcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTMxMjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDUsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMixcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDQ2LjkyLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNDYuOTIsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDIuNyxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjg1LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuNzUsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIuNyxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAzLjMzLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDIxNyxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDUsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzIxLjhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTM0ODAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDUuOTEsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0NS45MSxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0Mi42MixcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjg4LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuNDcsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIuNzMsXG4gICAgICAgIFwid2luZEd1c3RcIjogMy4yLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDE5MyxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDQsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzIwLjFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTM4NDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDUuMjcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0NS4yNyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My4yNCxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjkzLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuOCxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4xNixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAyLjU0LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDYxLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMC4wNCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAzMTYuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NDIwMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDYuNTcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0Ni41NyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My42MSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjg5LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuNjQsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIuMTUsXG4gICAgICAgIFwid2luZEd1c3RcIjogMi42MyxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiA3MSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMDEsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzEyLjZcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTQ1NjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDUwLjQzLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTAuNDMsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDQuMixcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjc5LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuODgsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIuMzgsXG4gICAgICAgIFwid2luZEd1c3RcIjogMy42NCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiA0MCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAxLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzEwLjJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTQ5MjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDU1LjkzLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTUuOTMsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuNDMsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC42MyxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjAzLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAzLjA1LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDUuNjcsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzQyLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDMsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAzMDguNFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NTI4MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjAuOTIsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA2MC45MixcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0Mi43LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNTEsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi4wMSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNC4xNCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA3LjQsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzE5LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDQsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAzMDYuM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NTY0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjQuMzcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA2NC4zNyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0MC42NixcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjQyLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuODYsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDUuNTUsXG4gICAgICAgIFwid2luZEd1c3RcIjogOC4zNCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAzMTIsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogNixcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDMwMy4zXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTk2MDAwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA2Ny41OCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDY3LjU4LFxuICAgICAgICBcImRld1BvaW50XCI6IDM4LjgsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4zNSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE1LjU3LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA3LjEsXG4gICAgICAgIFwid2luZEd1c3RcIjogOC45OCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAzMTAsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogNixcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDMwMC4xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTk2MzYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA2OS42NCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDY5LjY0LFxuICAgICAgICBcImRld1BvaW50XCI6IDM3LjYsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4zMSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE1LjQ2LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA4LjI4LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDkuNjksXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzEyLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDYsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTcuM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NjcyMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNzAuNzQsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA3MC43NCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzNy4wMSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjI5LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTQuOTMsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDkuMDYsXG4gICAgICAgIFwid2luZEd1c3RcIjogMTAuNzEsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzA2LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDQsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTUuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NzA4MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNzAuODksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA3MC44OSxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzNy4xMixcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjI5LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTQuNDgsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDkuNTcsXG4gICAgICAgIFwid2luZEd1c3RcIjogMTEuNzcsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzAzLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDMsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTMuM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NzQ0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjkuOTQsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA2OS45NCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzOC4yNyxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjMxLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTQuMzYsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDkuNTIsXG4gICAgICAgIFwid2luZEd1c3RcIjogMTIuMjUsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzA4LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDEsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTIuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5NzgwMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjcuMyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDY3LjMsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogMzkuODcsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4zNyxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE0LjU5LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA4LjMsXG4gICAgICAgIFwid2luZEd1c3RcIjogMTEuOTEsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzQyLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTEuNlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5ODE2MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA2My45MSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDYzLjkxLFxuICAgICAgICBcImRld1BvaW50XCI6IDQxLjkyLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNDUsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS41NyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNi4yOSxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxMC45NixcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyNTIsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDI5MS43XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTk4NTIwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDU5LjU2LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTkuNTYsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuMSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjU0LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTYuMDcsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDQuNixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA5LjU5LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI5MCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjkyXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTk4ODgwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDU3LjAzLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTcuMDMsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuNTMsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC42MSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjU2LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAzLjM3LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDcuNTksXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMjkwLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTIuMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5OTI0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA1NS4xNCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDU1LjE0LFxuICAgICAgICBcImRld1BvaW50XCI6IDQ0LjAxLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNjYsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi40NyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi41MixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA1LjIsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMjQ2LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTIuN1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5OTYwMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA1My43LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTMuNyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0NC4zOCxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjcxLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTYuNzcsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIuMTQsXG4gICAgICAgIFwid2luZEd1c3RcIjogMy4zOCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAyMTAsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDI5Mi43XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU2OTk5OTYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDUyLjI2LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNTIuMjYsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDQuMzEsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC43NCxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE3LjE4LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAyLjEzLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDIuNzIsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMTg3LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTIuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwMDMyMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA1MS4wNSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDUxLjA1LFxuICAgICAgICBcImRld1BvaW50XCI6IDQ0LjEsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC43NyxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjU4LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAyLjExLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDIuNTMsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMTkyLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTEuNFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwMDY4MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLW5pZ2h0XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA1MC4yOSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDUwLjI5LFxuICAgICAgICBcImRld1BvaW50XCI6IDQzLjg0LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNzgsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi40MyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4xMyxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAyLjQyLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDE3OCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjkwLjhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTcwMDEwNDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDkuNTMsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0OS41MyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My42MixcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjgsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi44MSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4wOCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAyLjM1LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDE1MixcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjkwLjdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTcwMDE0MDAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDguNjEsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0OC42MSxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My4zNSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjgyLFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTYuNjMsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDIsXG4gICAgICAgIFwid2luZEd1c3RcIjogMi4yOSxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiA3NixcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjkwLjhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTcwMDE3NjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1uaWdodFwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDcuODcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0Ny44NyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0My40OCxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjg1LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTYuNzIsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDEuOTMsXG4gICAgICAgIFwid2luZEd1c3RcIjogMi4yNCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAxNTMsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDI5MS40XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDAyMTIwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDQ3LjM4LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNDcuMzgsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDMuMjMsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC44NSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE3LjAxLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAxLjg1LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDIuMDYsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogOTQsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDI5Mi41XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDAyNDgwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItbmlnaHRcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDQ3LjA4LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNDcuMDgsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDIuOTYsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC44NixcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE3LjQzLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAxLjc2LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDEuODcsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMTA3LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTQuMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwMjg0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNDguNjcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA0OC42NyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0Mi45MyxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjgsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNy40MixcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMS43NCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxLjk1LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDk0LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTQuOFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwMzIwMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNTQuMjMsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA1NC4yMyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0Mi4zNSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjY0LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTcuNzIsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDEuNzgsXG4gICAgICAgIFwid2luZEd1c3RcIjogMi40NSxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiA1NixcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAxLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjk0XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDAzNTYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA2MC4wOCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDYwLjA4LFxuICAgICAgICBcImRld1BvaW50XCI6IDQxLjA1LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNDksXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNy45MSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4zLFxuICAgICAgICBcIndpbmRHdXN0XCI6IDMuOTcsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzUxLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDMsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyOTIuM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwMzkyMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNjUuNTMsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA2NS41MyxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzOS4zLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMzgsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNy44NSxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMy4wOCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA1LjM1LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDMyNSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiA0LFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjkwLjlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTcwMDQyODAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDY5LjI3LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNjkuMjcsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogMzYuMDcsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4yOSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE3LjQzLFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA0LjI2LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDYuMjgsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzE5LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDYsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODkuOFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwNDY0MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNzIuODksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA3Mi44OSxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzMi40LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMjMsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi42NyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNS43NCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA3LjEsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzE5LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDYsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODguOFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAwNTAwMDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVcIjogNzUuNzIsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZVwiOiA3NS43MixcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzMC42OCxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjE5LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuOTIsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDcuMDEsXG4gICAgICAgIFwid2luZEd1c3RcIjogOC4xMixcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAzMTksXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLFxuICAgICAgICBcInV2SW5kZXhcIjogNixcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDEwLFxuICAgICAgICBcIm96b25lXCI6IDI4OC4xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDA1MzYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXJcIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiA3Ny4wOCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlXCI6IDc3LjA4LFxuICAgICAgICBcImRld1BvaW50XCI6IDI5LjE0LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMTcsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS4yNixcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogOC4wOCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA5LjgsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMzE4LFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMCxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDQsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTcwMDU3MjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhclwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlXCI6IDc2Ljk2LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVcIjogNzYuOTYsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogMjkuOTYsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC4xOCxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE0Ljk2LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiA5LjA1LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDExLjY0LFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDMxNSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiAzLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjg4LjNcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiZGFpbHlcIjoge1xuICAgIFwic3VtbWFyeVwiOiBcIk5vIHByZWNpcGl0YXRpb24gdGhyb3VnaG91dCB0aGUgd2Vlaywgd2l0aCBoaWdoIHRlbXBlcmF0dXJlcyByaXNpbmcgdG8gODXCsEYgb24gU3VuZGF5LlwiLFxuICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgIFwiZGF0YVwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5ODI2ODAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheS5cIixcbiAgICAgICAgXCJpY29uXCI6IFwicGFydGx5LWNsb3VkeS1kYXlcIixcbiAgICAgICAgXCJzdW5yaXNlVGltZVwiOiAxNTY5ODUyMjMyLFxuICAgICAgICBcInN1bnNldFRpbWVcIjogMTU2OTg5NDg2OCxcbiAgICAgICAgXCJtb29uUGhhc2VcIjogMC4wOSxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMC4wMDAyLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eU1heFwiOiAwLjAwMTgsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4VGltZVwiOiAxNTY5ODk4ODAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAuMTYsXG4gICAgICAgIFwicHJlY2lwVHlwZVwiOiBcInJhaW5cIixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hcIjogNjYuMDYsXG4gICAgICAgIFwidGVtcGVyYXR1cmVIaWdoVGltZVwiOiAxNTY5ODg0NDAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlTG93XCI6IDQ0LjYyLFxuICAgICAgICBcInRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTY5OTM4NDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVIaWdoXCI6IDY1LjM5LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVIaWdoVGltZVwiOiAxNTY5ODg0NDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVMb3dcIjogNDUuMjcsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1RpbWVcIjogMTU2OTkzODQwMCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiA0MC44NyxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjU2LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTUuMzUsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDQuNTUsXG4gICAgICAgIFwid2luZEd1c3RcIjogMTYuODYsXG4gICAgICAgIFwid2luZEd1c3RUaW1lXCI6IDE1Njk4ODgwMDAsXG4gICAgICAgIFwid2luZEJlYXJpbmdcIjogMjczLFxuICAgICAgICBcImNsb3VkQ292ZXJcIjogMC4zNSxcbiAgICAgICAgXCJ1dkluZGV4XCI6IDUsXG4gICAgICAgIFwidXZJbmRleFRpbWVcIjogMTU2OTg3MzYwMCxcbiAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IDkuODY0LFxuICAgICAgICBcIm96b25lXCI6IDMyMy44LFxuICAgICAgICBcInRlbXBlcmF0dXJlTWluXCI6IDUwLjk4LFxuICAgICAgICBcInRlbXBlcmF0dXJlTWluVGltZVwiOiAxNTY5OTEzMjAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlTWF4XCI6IDY2LjA2LFxuICAgICAgICBcInRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTY5ODg0NDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5cIjogNTEuNjMsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1pblRpbWVcIjogMTU2OTkxMzIwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4XCI6IDY1LjM5LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNYXhUaW1lXCI6IDE1Njk4ODQ0MDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidGltZVwiOiAxNTY5OTEzMjAwLFxuICAgICAgICBcInN1bW1hcnlcIjogXCJDbGVhciB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInN1bnJpc2VUaW1lXCI6IDE1Njk5Mzg2ODMsXG4gICAgICAgIFwic3Vuc2V0VGltZVwiOiAxNTY5OTgxMTc3LFxuICAgICAgICBcIm1vb25QaGFzZVwiOiAwLjEzLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDEsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4XCI6IDAuMDAwNSxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlNYXhUaW1lXCI6IDE1Njk5MzEyMDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMyxcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFwiOiA3MS41NixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1Njk5NzA4MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dcIjogNDYuNDMsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1NzAwMjQ4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hcIjogNzAuODksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1Njk5NzA4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1wiOiA0Ny4wOCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTcwMDI0ODAwLFxuICAgICAgICBcImRld1BvaW50XCI6IDQxLjk4LFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNjIsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNS43MixcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNC40MSxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiAxMi4yNSxcbiAgICAgICAgXCJ3aW5kR3VzdFRpbWVcIjogMTU2OTk3NDQwMCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAzMDMsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjAyLFxuICAgICAgICBcInV2SW5kZXhcIjogNixcbiAgICAgICAgXCJ1dkluZGV4VGltZVwiOiAxNTY5OTYwMDAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMzA1LjcsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5cIjogNDQuNjIsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1Njk5Mzg0MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhcIjogNzEuNTYsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhUaW1lXCI6IDE1Njk5NzA4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1pblwiOiA0NS4yNyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluVGltZVwiOiAxNTY5OTM4NDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNYXhcIjogNzAuODksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFRpbWVcIjogMTU2OTk3MDgwMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1Njk5OTk2MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyIHRocm91Z2hvdXQgdGhlIGRheS5cIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwic3VucmlzZVRpbWVcIjogMTU3MDAyNTEzNSxcbiAgICAgICAgXCJzdW5zZXRUaW1lXCI6IDE1NzAwNjc0ODYsXG4gICAgICAgIFwibW9vblBoYXNlXCI6IDAuMTcsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4XCI6IDAsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4VGltZVwiOiAxNTcwMDYwODAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVIaWdoXCI6IDc3Ljc1LFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFRpbWVcIjogMTU3MDA1MzYwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUxvd1wiOiA0Ny4zNixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUxvd1RpbWVcIjogMTU3MDExMTIwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlSGlnaFwiOiA3Ny4wOCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlSGlnaFRpbWVcIjogMTU3MDA1MzYwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93XCI6IDQ4LjAxLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1NzAxMTEyMDAsXG4gICAgICAgIFwiZGV3UG9pbnRcIjogNDAuMzcsXG4gICAgICAgIFwiaHVtaWRpdHlcIjogMC41NSxcbiAgICAgICAgXCJwcmVzc3VyZVwiOiAxMDE2LjQ2LFxuICAgICAgICBcIndpbmRTcGVlZFwiOiAzLjg4LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDEyLjU4LFxuICAgICAgICBcIndpbmRHdXN0VGltZVwiOiAxNTcwMDYwODAwLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDMxMSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiA2LFxuICAgICAgICBcInV2SW5kZXhUaW1lXCI6IDE1NzAwNDY0MDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODkuNixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblwiOiA0Ni40MyxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblRpbWVcIjogMTU3MDAyNDgwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFwiOiA3Ny43NSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFRpbWVcIjogMTU3MDA1MzYwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluXCI6IDQ3LjA4LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAwMjQ4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFwiOiA3Ny4wOCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTcwMDUzNjAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDA4NjAwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXIgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJzdW5yaXNlVGltZVwiOiAxNTcwMTExNTg2LFxuICAgICAgICBcInN1bnNldFRpbWVcIjogMTU3MDE1Mzc5NSxcbiAgICAgICAgXCJtb29uUGhhc2VcIjogMC4yLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDEsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4XCI6IDAuMDAwMyxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlNYXhUaW1lXCI6IDE1NzAxNjg4MDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMixcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFwiOiA3NC42MixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzAxNDAwMDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dcIjogNDcuOTgsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1NzAxOTc2MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hcIjogNzMuOTUsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzAxNDAwMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1wiOiA0OC42MyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTcwMTk3NjAwLFxuICAgICAgICBcImRld1BvaW50XCI6IDQ0LjgzLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNjIsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi4wNixcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogNC42LFxuICAgICAgICBcIndpbmRHdXN0XCI6IDEyLjAzLFxuICAgICAgICBcIndpbmRHdXN0VGltZVwiOiAxNTcwMTQ3MjAwLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI4NSxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiA2LFxuICAgICAgICBcInV2SW5kZXhUaW1lXCI6IDE1NzAxMzI4MDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODcuMSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblwiOiA0Ny4zNixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblRpbWVcIjogMTU3MDExMTIwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFwiOiA3NC42MixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFRpbWVcIjogMTU3MDE0MDAwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluXCI6IDQ4LjAxLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAxMTEyMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFwiOiA3My45NSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTcwMTQwMDAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDE3MjQwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXIgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJzdW5yaXNlVGltZVwiOiAxNTcwMTk4MDM4LFxuICAgICAgICBcInN1bnNldFRpbWVcIjogMTU3MDI0MDEwNSxcbiAgICAgICAgXCJtb29uUGhhc2VcIjogMC4yMyxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlcIjogMC4wMDAxLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eU1heFwiOiAwLjAwMDQsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4VGltZVwiOiAxNTcwMjMzNjAwLFxuICAgICAgICBcInByZWNpcFByb2JhYmlsaXR5XCI6IDAuMDEsXG4gICAgICAgIFwicHJlY2lwVHlwZVwiOiBcInJhaW5cIixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hcIjogODEuMTMsXG4gICAgICAgIFwidGVtcGVyYXR1cmVIaWdoVGltZVwiOiAxNTcwMjI2NDAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlTG93XCI6IDUyLjczLFxuICAgICAgICBcInRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTcwMjg0MDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVIaWdoXCI6IDgwLjQ2LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVIaWdoVGltZVwiOiAxNTcwMjI2NDAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVMb3dcIjogNTMuMzgsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1RpbWVcIjogMTU3MDI4NDAwMCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzOC4wMSxcbiAgICAgICAgXCJodW1pZGl0eVwiOiAwLjQ2LFxuICAgICAgICBcInByZXNzdXJlXCI6IDEwMTcuOTIsXG4gICAgICAgIFwid2luZFNwZWVkXCI6IDMuMTMsXG4gICAgICAgIFwid2luZEd1c3RcIjogOS41NSxcbiAgICAgICAgXCJ3aW5kR3VzdFRpbWVcIjogMTU3MDIzMzYwMCxcbiAgICAgICAgXCJ3aW5kQmVhcmluZ1wiOiAzMzcsXG4gICAgICAgIFwiY2xvdWRDb3ZlclwiOiAwLjA1LFxuICAgICAgICBcInV2SW5kZXhcIjogNixcbiAgICAgICAgXCJ1dkluZGV4VGltZVwiOiAxNTcwMjE5MjAwLFxuICAgICAgICBcInZpc2liaWxpdHlcIjogMTAsXG4gICAgICAgIFwib3pvbmVcIjogMjg5LjEsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5cIjogNDcuOTgsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAxOTc2MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhcIjogODEuMTMsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhUaW1lXCI6IDE1NzAyMjY0MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1pblwiOiA0OC42MyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluVGltZVwiOiAxNTcwMTk3NjAwLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNYXhcIjogODAuNDYsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFRpbWVcIjogMTU3MDIyNjQwMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0aW1lXCI6IDE1NzAyNTg4MDAsXG4gICAgICAgIFwic3VtbWFyeVwiOiBcIkNsZWFyIHRocm91Z2hvdXQgdGhlIGRheS5cIixcbiAgICAgICAgXCJpY29uXCI6IFwiY2xlYXItZGF5XCIsXG4gICAgICAgIFwic3VucmlzZVRpbWVcIjogMTU3MDI4NDQ5MSxcbiAgICAgICAgXCJzdW5zZXRUaW1lXCI6IDE1NzAzMjY0MTUsXG4gICAgICAgIFwibW9vblBoYXNlXCI6IDAuMjcsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5XCI6IDAuMDAwMSxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlNYXhcIjogMC4wMDA0LFxuICAgICAgICBcInByZWNpcEludGVuc2l0eU1heFRpbWVcIjogMTU3MDI4NzYwMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLjAxLFxuICAgICAgICBcInByZWNpcFR5cGVcIjogXCJyYWluXCIsXG4gICAgICAgIFwidGVtcGVyYXR1cmVIaWdoXCI6IDg0LjE4LFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFRpbWVcIjogMTU3MDMxNjQwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUxvd1wiOiA1NS40NSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUxvd1RpbWVcIjogMTU3MDM3MDQwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlSGlnaFwiOiA4My41MSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlSGlnaFRpbWVcIjogMTU3MDMxNjQwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93XCI6IDU2LjEsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1RpbWVcIjogMTU3MDM3MDQwMCxcbiAgICAgICAgXCJkZXdQb2ludFwiOiAzMi4zLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMzEsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNi43MyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4yOCxcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA2Ljk5LFxuICAgICAgICBcIndpbmRHdXN0VGltZVwiOiAxNTcwMzI3MjAwLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDM1NCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiA2LFxuICAgICAgICBcInV2SW5kZXhUaW1lXCI6IDE1NzAzMDU2MDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyODAuNSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblwiOiA1Mi43MyxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblRpbWVcIjogMTU3MDI4NDAwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFwiOiA4NC4xOCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFRpbWVcIjogMTU3MDMxNjQwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluXCI6IDUzLjM4LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAyODQwMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFwiOiA4My41MSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTcwMzE2NDAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDM0NTIwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiQ2xlYXIgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFxuICAgICAgICBcImljb25cIjogXCJjbGVhci1kYXlcIixcbiAgICAgICAgXCJzdW5yaXNlVGltZVwiOiAxNTcwMzcwOTQzLFxuICAgICAgICBcInN1bnNldFRpbWVcIjogMTU3MDQxMjcyNixcbiAgICAgICAgXCJtb29uUGhhc2VcIjogMC4zLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eU1heFwiOiAwLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eU1heFRpbWVcIjogMTU3MDQzMTYwMCxcbiAgICAgICAgXCJwcmVjaXBQcm9iYWJpbGl0eVwiOiAwLFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFwiOiA4Ni4xNixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzAzOTkyMDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dcIjogNTUuMzksXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1NzA0NTY4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hcIjogODUuNDksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzAzOTkyMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1wiOiA1Ni4wNCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTcwNDU2ODAwLFxuICAgICAgICBcImRld1BvaW50XCI6IDM4LjgzLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuMzYsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxNC40MixcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi4xNixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA3LjQzLFxuICAgICAgICBcIndpbmRHdXN0VGltZVwiOiAxNTcwNDA2NDAwLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI5MCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAsXG4gICAgICAgIFwidXZJbmRleFwiOiA2LFxuICAgICAgICBcInV2SW5kZXhUaW1lXCI6IDE1NzAzOTIwMDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyNzksXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5cIjogNTUuNDUsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAzNzA0MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhcIjogODYuMTYsXG4gICAgICAgIFwidGVtcGVyYXR1cmVNYXhUaW1lXCI6IDE1NzAzOTkyMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1pblwiOiA1Ni4xLFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzAzNzA0MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFwiOiA4NS40OSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTcwMzk5MjAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRpbWVcIjogMTU3MDQzMTYwMCxcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImNsZWFyLWRheVwiLFxuICAgICAgICBcInN1bnJpc2VUaW1lXCI6IDE1NzA0NTczOTYsXG4gICAgICAgIFwic3Vuc2V0VGltZVwiOiAxNTcwNDk5MDM3LFxuICAgICAgICBcIm1vb25QaGFzZVwiOiAwLjMzLFxuICAgICAgICBcInByZWNpcEludGVuc2l0eVwiOiAwLjAwMDcsXG4gICAgICAgIFwicHJlY2lwSW50ZW5zaXR5TWF4XCI6IDAuMDAyOSxcbiAgICAgICAgXCJwcmVjaXBJbnRlbnNpdHlNYXhUaW1lXCI6IDE1NzA0Mzg4MDAsXG4gICAgICAgIFwicHJlY2lwUHJvYmFiaWxpdHlcIjogMC4wMixcbiAgICAgICAgXCJwcmVjaXBUeXBlXCI6IFwicmFpblwiLFxuICAgICAgICBcInRlbXBlcmF0dXJlSGlnaFwiOiA4My40NixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzA0ODU2MDAsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dcIjogNTEuNjIsXG4gICAgICAgIFwidGVtcGVyYXR1cmVMb3dUaW1lXCI6IDE1NzA1NDMyMDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hcIjogODIuNzksXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUhpZ2hUaW1lXCI6IDE1NzA0ODU2MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZUxvd1wiOiA1Mi4yNyxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTG93VGltZVwiOiAxNTcwNTQzMjAwLFxuICAgICAgICBcImRld1BvaW50XCI6IDUwLjYxLFxuICAgICAgICBcImh1bWlkaXR5XCI6IDAuNTgsXG4gICAgICAgIFwicHJlc3N1cmVcIjogMTAxMy41MyxcbiAgICAgICAgXCJ3aW5kU3BlZWRcIjogMi42MixcbiAgICAgICAgXCJ3aW5kR3VzdFwiOiA4LjA5LFxuICAgICAgICBcIndpbmRHdXN0VGltZVwiOiAxNTcwNDkyODAwLFxuICAgICAgICBcIndpbmRCZWFyaW5nXCI6IDI5OCxcbiAgICAgICAgXCJjbG91ZENvdmVyXCI6IDAuMTksXG4gICAgICAgIFwidXZJbmRleFwiOiA2LFxuICAgICAgICBcInV2SW5kZXhUaW1lXCI6IDE1NzA0Nzg0MDAsXG4gICAgICAgIFwidmlzaWJpbGl0eVwiOiAxMCxcbiAgICAgICAgXCJvem9uZVwiOiAyNjguMSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblwiOiA1NS4zOSxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1pblRpbWVcIjogMTU3MDQ1NjgwMCxcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFwiOiA4My40NixcbiAgICAgICAgXCJ0ZW1wZXJhdHVyZU1heFRpbWVcIjogMTU3MDQ4NTYwMCxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWluXCI6IDU2LjA0LFxuICAgICAgICBcImFwcGFyZW50VGVtcGVyYXR1cmVNaW5UaW1lXCI6IDE1NzA0NTY4MDAsXG4gICAgICAgIFwiYXBwYXJlbnRUZW1wZXJhdHVyZU1heFwiOiA4Mi43OSxcbiAgICAgICAgXCJhcHBhcmVudFRlbXBlcmF0dXJlTWF4VGltZVwiOiAxNTcwNDg1NjAwXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcImZsYWdzXCI6IHtcbiAgICBcInNvdXJjZXNcIjogW1xuICAgICAgXCJud3NwYVwiLFxuICAgICAgXCJjbWNcIixcbiAgICAgIFwiZ2ZzXCIsXG4gICAgICBcImhycnJcIixcbiAgICAgIFwiaWNvblwiLFxuICAgICAgXCJpc2RcIixcbiAgICAgIFwibWFkaXNcIixcbiAgICAgIFwibmFtXCIsXG4gICAgICBcInNyZWZcIixcbiAgICAgIFwiZGFya3NreVwiLFxuICAgICAgXCJuZWFyZXN0LXByZWNpcFwiXG4gICAgXSxcbiAgICBcIm5lYXJlc3Qtc3RhdGlvblwiOiAyLjYxMyxcbiAgICBcInVuaXRzXCI6IFwidXNcIlxuICB9LFxuICBcIm9mZnNldFwiOiAtN1xufTtcblxuZXhwb3J0IHt3ZWF0aGVyRGF0YX07XG5cbiIsImltcG9ydCB7cmVuZGVyQWxsSG91cnNQZXJEYXl9IGZyb20gXCIuLi9yZW5kZXJlcnNcIjtcbmltcG9ydCB7d2VhdGhlckRhdGF9IGZyb20gXCIuL3Rlc3RfZHVtbXlfZGF0YVwiO1xuXG5mdW5jdGlvbiB0ZXN0X3JlbmRlckFsbEhvdXJzUGVyRGF5KCkge1xuICBjb25zdCBjb250ZW50ID0gcmVuZGVyQWxsSG91cnNQZXJEYXkod2VhdGhlckRhdGEpO1xuICBjb25zb2xlLmxvZyhjb250ZW50KTtcbn1cblxud2luZG93LnRlc3RfcmVuZGVyQWxsSG91cnNQZXJEYXkgPSB0ZXN0X3JlbmRlckFsbEhvdXJzUGVyRGF5O1xuXG5leHBvcnQge3Rlc3RfcmVuZGVyQWxsSG91cnNQZXJEYXl9O1xuIiwiaW1wb3J0IHtyZW5kZXJEYXl9IGZyb20gXCIuLi9yZW5kZXJlcnNcIjtcbmltcG9ydCB7d2VhdGhlckRhdGF9IGZyb20gXCIuL3Rlc3RfZHVtbXlfZGF0YVwiO1xuXG5mdW5jdGlvbiB0ZXN0X3JlbmRlckRheSgpIHtcbiAgY29uc3QgY29udGVudCA9IHJlbmRlckRheSh3ZWF0aGVyRGF0YSwgMCk7XG4gIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xufVxuXG53aW5kb3cudGVzdF9yZW5kZXJEYXkgPSB0ZXN0X3JlbmRlckRheTtcblxuZXhwb3J0IHt0ZXN0X3JlbmRlckRheX07XG4iLCJpbXBvcnQge3JlbmRlckRheU92ZXJ2aWV3fSBmcm9tIFwiLi4vcmVuZGVyZXJzXCI7XG5pbXBvcnQge3dlYXRoZXJEYXRhfSBmcm9tIFwiLi90ZXN0X2R1bW15X2RhdGFcIjtcblxuZnVuY3Rpb24gdGVzdF9yZW5kZXJEYXlPdmVydmlldygpIHtcbiAgY29uc3QgdG9kYXkgPSB3ZWF0aGVyRGF0YS5jdXJyZW50bHk7XG4gIGNvbnN0IGRheSA9IHdlYXRoZXJEYXRhLmRhaWx5LmRhdGFbMV07XG5cbiAgbGV0IGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IHJlbmRlckRheU92ZXJ2aWV3KHRvZGF5KTtcbiAgY29udGVudCArPSByZW5kZXJEYXlPdmVydmlldyhkYXkpO1xuICBjb25zb2xlLmxvZyhjb250ZW50KTtcbn1cblxud2luZG93LnRlc3RfcmVuZGVyRGF5T3ZlcnZpZXcgPSB0ZXN0X3JlbmRlckRheU92ZXJ2aWV3O1xuXG5leHBvcnQge3Rlc3RfcmVuZGVyRGF5T3ZlcnZpZXd9O1xuIiwiaW1wb3J0IHtyZW5kZXJIb3VyfSBmcm9tIFwiLi4vcmVuZGVyZXJzXCI7XG5pbXBvcnQge3dlYXRoZXJEYXRhfSBmcm9tIFwiLi90ZXN0X2R1bW15X2RhdGFcIjtcblxuZnVuY3Rpb24gdGVzdF9yZW5kZXJIb3VyKCkge1xuICBjb25zdCBob3VyRGF0YSA9IHdlYXRoZXJEYXRhLmhvdXJseS5kYXRhWzFdO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSByZW5kZXJIb3VyKGhvdXJEYXRhKTtcblxuICBjb25zb2xlLmxvZyhjb250ZW50KTtcbn1cblxuLy8gTWFrZSB0aGlzIGZ1bmN0aW9uIGF2YWlsYWJsZSBpbiBDaHJvbWUgRGV2IFRvb2xzIGJ5IG1ha2luZyBpdCBhIGdsb2JhbC5cbndpbmRvdy50ZXN0X3JlbmRlckhvdXIgPSB0ZXN0X3JlbmRlckhvdXI7XG5cbmV4cG9ydCB7dGVzdF9yZW5kZXJIb3VyfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==