import {askLocation, getWeatherDataNow} from "./data";
import {
  addClickEventListeners,
  hidePopUp,
  paintLandingPage,
  showPopUp,
}                    from "./paint_ui";
import {test_all} from "./test/test_all";
import {LOCATIONS, save, load} from "./storage";

const attachListeners = () => {
  const myLocationIcon = document.querySelector('#my-location');
  myLocationIcon.addEventListener('click', askLocation);
  myLocationIcon.addEventListener('mouseover', showPopUp);
  myLocationIcon.addEventListener('mouseout', hidePopUp);
};

// TODO: remove Places API, because I am not converting
const initializePlacesApi = () => {
  var places = require('places.js');
  var placesAutocomplete = places({
    appId: 'pl8HQG0189VY',
    apiKey: '2563ab38a8ce07a8f0c9081eac73122e',
    container: document.querySelector('#search-box'),
  });

  placesAutocomplete.on('change', e => {
    const suggestion = e.suggestion;
    const lat = suggestion.latlng.lat;
    const lng = suggestion.latlng.lng;
    const name = suggestion.name;
    const area = suggestion.administrative;
    const city = `${name}, ${area}`;
    save(LOCATIONS.CITY, city);
    getWeatherDataNow(lat, lng);
  });
};

const main = () => {
  initializePlacesApi();
  attachListeners();
  paintLandingPage();
};

main();

//test_all();


//TODO:
// - Add shadow to the whole weather details and summary
//   section. Potentially use toggle and a CSS class to do this.
