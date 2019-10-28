import {load, CONSTANTS} from "./storage";
import {getWeatherDataNow} from "./data";
import {renderWeatherData} from "./renderers";


const showPopUp = () => {
  if (!load(CONSTANTS.ACCESS)) {
    const popUp         = document.querySelector('#pop-up');
    popUp.style.opacity = '1';
  }
};

const hidePopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  if (popUp) {
    popUp.style.opacity = '0';
  }
};

function paintEmptyState() {
  deleteElementBySelector('#empty-state');

  const body = document.querySelector('body');
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

const paintLandingPage = () => {
  const weatherData = load(CONSTANTS.WEATHER_DATA);
  const unitOfTemp = load(CONSTANTS.TEMP);

  if (weatherData) {
    // Found weather data in local storage, so paint it.
    renderWeatherData(weatherData, unitOfTemp);

    // Refresh the weather for the location saved in localStorage.
    const lat = load(CONSTANTS.LAT);
    const lng = load(CONSTANTS.LNG);
    getWeatherDataNow(lat, lng);

    // This code will take the city from local storage and print it on the
    // viewport.
    if (load(CONSTANTS.CITY)) {
      const searchBox = document.querySelector('#search-box');
      searchBox.value = load(CONSTANTS.CITY);
    }
  }
  else {
    paintEmptyState();
  }
};

const deleteElementBySelector = (selector) => {
  if (!selector) return;
  const divToRemove = document.querySelector(selector);
  if (!divToRemove) return;
  divToRemove.parentNode.removeChild(divToRemove);
};

function showWeatherDetails() {
  const hourDetails = this.querySelector('.hour-details');
  hourDetails.classList.toggle('hour-details-accordion');
  // Add shadow to the details container.
  const hourContainer = this;
  hourContainer.classList.toggle('inner-shadow');
}

const addClickEventListeners = () => {
  const hourContainers = document.querySelectorAll('.hour-container');
  // Attach all the event listeners.
  for (const container of hourContainers) {
    container.addEventListener('click', showWeatherDetails);
  }
};


export {
  showPopUp,
  hidePopUp,
  paintLandingPage,
  deleteElementBySelector,
  addClickEventListeners,
};
