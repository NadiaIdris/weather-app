import {load, CONSTANTS, save} from "./storage";
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

    // Save in local storage that access has been granted.
    save(CONSTANTS.ACCESS, CONSTANTS.GRANTED);
  };

  const error = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      console.log("You denied me access :(!");
      save(CONSTANTS.ACCESS, CONSTANTS.DENIED);
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  else {
    // TODO: If current location denied, show a pop up describing how to grant
    //  access & why.
    window.alert("TODO: show pop up describing how to grant access & why");
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

  // Save the lat, lng pair to LocalStorage for use later.
  save(CONSTANTS.LAT, lat);
  save(CONSTANTS.LNG, lng);

  const API_KEY     = '6eae3396dc3311cb103d2f86f03d5775';
  const url         = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?exclude=minutely`;
  const corsFreeUrl = `https://cors-anywhere.herokuapp.com/${url}`;

  fetch(corsFreeUrl)
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
