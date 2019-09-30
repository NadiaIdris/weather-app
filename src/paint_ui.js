import {load, LOCATIONS}   from "./storage";
import {getWeatherDataNow} from "./data";

const showPopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'block';
};

const hidePopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'none';
};

const paintEmptyLandingPage = () => {
  const weatherData = load(LOCATIONS.WEATHER_DATA);
  if (weatherData) {
    // Found weather data in local storage, so paint it.
    paintWeatherToViewport(weatherData);
    
    // Refresh the weather for the location saved in localStorage.
    const lat = load(LOCATIONS.LAT);
    const lng = load(LOCATIONS.LNG);
    getWeatherDataNow(lat, lng);
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


export {
  showPopUp,
  hidePopUp,
  paintEmptyLandingPage,
  deleteElementBySelector,
  paintWeatherToViewport,
  addClickEventListeners,
};
