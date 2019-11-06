import {load, CONSTANTS} from "./storage";
import {getWeatherDataNow} from "./data";
import {renderWeatherData} from "./renderers";


function paintEmptyState() {
  deleteElementBySelector('#empty-state');

  const body = document.querySelector('body');
  const emptyStateContainer = document.createElement('div');
  emptyStateContainer.setAttribute('id', 'empty-state');
  body.prepend(emptyStateContainer);

  emptyStateContainer.innerHTML = `
      <h1>Search a location below and the <br>weather will appear here.</h1>
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
  paintLandingPage,
  deleteElementBySelector,
  addClickEventListeners,
};
