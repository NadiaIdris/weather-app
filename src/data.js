import {LOCATIONS, save, load}        from "./storage";
import {renderWeatherData} from "./renderers";

const askLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      fetchReverseGeocode(position).then((placeData)=>{

        const city = placeData.address.city;
        save(LOCATIONS.CITY, city);
        console.log(city);
        // Fetch data from DarkSky API.
        // TODO: Pass argument `city` to getWeatherDataNow
        getWeatherDataNow(lat, lng);
        if (load(LOCATIONS.CITY)) {
          const searchBox = document.querySelector('#search-box');
          searchBox.value = load(LOCATIONS.CITY);
        }
      });
    })
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
  save(LOCATIONS.LAT, lat);
  save(LOCATIONS.LNG, lng);

  const API_KEY     = '6eae3396dc3311cb103d2f86f03d5775';
  const url         = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?exclude=minutely`;
  const corsFreeUrl = `https://cors-anywhere.herokuapp.com/${url}`;

  fetch(corsFreeUrl)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        //callback(myJson);
        save(LOCATIONS.WEATHER_DATA, weatherData);
        if(!load(LOCATIONS.TEMP)) { save(LOCATIONS.TEMP, 'F')}
        renderWeatherData(weatherData, load(LOCATIONS.TEMP));
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      });
};

export {askLocation, getWeatherDataNow};
