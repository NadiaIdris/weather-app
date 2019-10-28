import {askLocation, getWeatherDataNow, giveAccess, closeOverlay} from "./data";
import {hidePopUp, paintLandingPage, showPopUp,} from "./paint_ui";
import {CONSTANTS, save} from "./storage";

const attachListeners = () => {
  const myLocationIcon = document.querySelector('#my-location');
  myLocationIcon.addEventListener('mouseover', showPopUp);
  myLocationIcon.addEventListener('mouseout', hidePopUp);
  myLocationIcon.addEventListener('click', askLocation);
  myLocationIcon.addEventListener('click', giveAccess);
  const overlay = document.querySelector('#overlay');
  overlay.addEventListener('click', closeOverlay);
};

const initializePlacesApi = () => {
  const places = require('places.js');
  const searchBox = document.querySelector('#search-box');
  const placesAutocomplete = places({
    appId: 'pl8HQG0189VY',
    apiKey: '2563ab38a8ce07a8f0c9081eac73122e',
    container: document.querySelector('#search-box'),
    templates: {
      value: function (suggestion) {
        return `${suggestion.name}`;
      }
    }
  });

  placesAutocomplete.on('change', e => {
    const suggestion = e.suggestion;
    const lat = suggestion.latlng.lat;
    const lng = suggestion.latlng.lng;
    const city = suggestion.value;
    searchBox.textContent = city;
    searchBox.style.fontWeight = '900';
    getWeatherDataNow(lat, lng);
    save(CONSTANTS.CITY, city);
    searchBox.blur();
  });
};

const main = () => {
  initializePlacesApi();
  attachListeners();
  paintLandingPage();
};

main();

//test_all();


