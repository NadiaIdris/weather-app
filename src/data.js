import {LOCATIONS, save}        from "./storage";
import {renderWeatherData} from "./renderers";

const askLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      // Save the lat, lng pair to LocalStorage for use later.
      save(LOCATIONS.LAT, lat);
      save(LOCATIONS.LNG, lng);
      // Fetch data from DarkSky API.
      getWeatherDataNow(lat, lng);
    })
  }
  else {
    // TODO: If current location denied, show a pop up describing how to grant
    //  access & why.
    window.alert("TODO: show pop up describing how to grant access & why");
  }
};

const getWeatherDataNow = (lat, lng) => {
  if (!lat || !lng) {
    console.warn("Can't get weather, since null arguments were" +
                     " passed for lat or lng!");
    return;
  }

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
        renderWeatherData(weatherData);
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      });
};

export {askLocation, getWeatherDataNow};
