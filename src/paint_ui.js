import {getWeatherData} from "./data";
import {load} from "./storage";

const generateUI = () => {

};

const showPopUp = () => {
  const popUp = document.querySelector('#pop-up');
  popUp.style.display = 'block';
};

const hidePopUp = () => {
  const popUp = document.querySelector('#pop-up');
  popUp.style.display = 'none';
};

const paintEmptyLandingPage = () => {
  // If there is no weather data stored in localStorage.
  const weatherData = JSON.parse(localStorage.getItem('weatherData'));
  if (weatherData !== null) return;

  if (weatherData === null) {
    console.log("No weather data available yet.");
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
};

// Get lat and lon first and then run function paintWeatherToViewport
const paintWeatherToViewport = (weatherJson) => {
  // Delete empty state design
  deleteElementBySelector('#empty-state');
  // Paint new interface
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
  generateUI,
  showPopUp,
  hidePopUp,
  paintEmptyLandingPage,
  deleteElementBySelector,
  paintWeatherToViewport,
  addClickEventListeners,
};
