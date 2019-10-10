import {load, LOCATIONS} from "./storage";
import {getWeatherDataNow} from "./data";
import {renderDay} from "./renderers";


const showPopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'block';
};

const hidePopUp = () => {
  const popUp         = document.querySelector('#pop-up');
  popUp.style.display = 'none';
};

const paintLandingPage = () => {
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

// TODO: Actually use weatherData to paint the UI (currently dummy data is
//  painted)
const paintWeatherToViewport = (weatherData) => {

  // Make a loop to paint as many days as I have the data.
  const weatherDailyArray = weatherData.daily.data;
  console.log(weatherDailyArray);

  // Reset the DOM.
  deleteElementBySelector('#empty-state');
  deleteElementBySelector('#all-weather-container');

  // Paint new interface.
  const body                = document.querySelector('body');
  const allWeatherContainer = document.createElement('div');
  allWeatherContainer.setAttribute('id', 'all-weather-container');
  allWeatherContainer.style.display = 'flex';
  body.prepend(allWeatherContainer);

  for(let i = 0; i < weatherDailyArray.length; i++) {
    allWeatherContainer.innerHTML = renderDay(weatherData, i);
    addClickEventListeners();
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
  paintWeatherToViewport,
  addClickEventListeners,
};
