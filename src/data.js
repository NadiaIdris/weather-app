import {CONSTANTS, load, save} from "./storage";
import {renderWeatherData} from "./renderers";


const askLocation = () => {
  const success = (position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    fetchReverseGeocode(position).then((placeData) => {
      const city = placeData.address.city;
      save(CONSTANTS.CITY, city);
      getWeatherDataNow(lat, lng);

      if (load(CONSTANTS.CITY)) {
        const searchBox = document.querySelector('#search-box');
        searchBox.value = load(CONSTANTS.CITY);
      }
    });
    save(CONSTANTS.ACCESS, CONSTANTS.GRANTED);
  };

  const error = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      window.alert(
          `Unable to retrieve your location.
          
-- Click on the location icon on the right on the URL bar and clear settings for future visits. 

-- Then refresh the web page and click on the location icon on the bottom left web page to give browser access to know your current location.`);
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  else {
    window.alert("Geolocation is not supported by your browser.");
  }
};

const getLatLngFromPosition = (position) => {
  if (!position) return;
  return {lat: position.coords.latitude, lng: position.coords.longitude};
};

const fetchReverseGeocode = async (position) => {
  const format = 'jsonv2';
  const latLng = getLatLngFromPosition(position);
  const url = `https://nominatim.openstreetmap.org/reverse?format=${
      format}&lat=${latLng.lat}&lon=${latLng.lng}`;
  return await fetch(url)
      .then((response) => response.json())
      .then((json) => json);
};

const getWeatherDataNow = (lat, lng) => {
  if (!lat || !lng) {
    console.warn("Can't get weather, since null arguments were" +
        " passed for lat or lng!");
    return;
  }

  save(CONSTANTS.LAT, lat);
  save(CONSTANTS.LNG, lng);

  const API_KEY = '6eae3396dc3311cb103d2f86f03d5775';
  const urlParams = `${API_KEY}/${lat},${lng}?exclude=minutely`;
  const proxyServerUrl = `https://maret-weather-app.herokuapp.com/forecast/${urlParams}`;

  // Add loader
  const loaderWrapper = document.createElement('div');
  loaderWrapper.setAttribute('id', 'loader-wrapper');
  const loader = `<div id="loader"></div>`;
  loaderWrapper.innerHTML = loader;
  document.querySelector('body').prepend(loaderWrapper);

  fetch(proxyServerUrl)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        //callback(myJson);
        save(CONSTANTS.WEATHER_DATA, weatherData);
        if(!load(CONSTANTS.TEMP)) { save(CONSTANTS.TEMP, CONSTANTS.F)}
        renderWeatherData(weatherData, load(CONSTANTS.TEMP));
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      });
};

export {askLocation, getWeatherDataNow};

