import { CONSTANTS, load, save } from "./storage";
import { renderWeatherData } from "./renderers";

const askLocation = () => {
  const success = (position) => {
    const [lat, lng] = [position.coords.latitude, position.coords.longitude];

    fetchReverseGeocode(lat, lng).then((placeData) => {
      const [city, town] = [placeData.address.city, placeData.address.town];
      // Sometimes the nominatim API returns city, other times town. E.g. Mountain
      // View, CA is a city, but Kirkland, WA is considered to be a town.
      city ? save(CONSTANTS.CITY, city) : save(CONSTANTS.CITY, town);
      save(CONSTANTS.LAT, lat);
      save(CONSTANTS.LNG, lng);
      getWeatherDataNow(lat, lng);

      if (load(CONSTANTS.CITY)) {
        const searchBox = document.querySelector("#search-box");
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

-- Then refresh the web page and click on the location icon on the bottom left web page to give browser access to know your current location.`
      );
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    window.alert("Geolocation is not supported by your browser.");
  }
};

const fetchReverseGeocode = async (lat, lng) => {
  const format = "jsonv2";
  const url = `https://nominatim.openstreetmap.org/reverse?format=${format}&lat=${lat}&lon=${lng}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((placeData) => placeData)
    .catch((reason) => {
      console.error("There is a problem fetching the URL.", reason);
    });
};

const getWeatherDataNow = (lat, lng) => {
  if (!lat || !lng) {
    console.warn(
      "Can't get weather, since null arguments were" + " passed for lat or lng!"
    );
    return;
  }

  const API_KEY = "6eae3396dc3311cb103d2f86f03d5775";
  const urlParams = `${API_KEY}/${lat},${lng}?exclude=minutely`;
  const proxyServerUrl = `https://maret-weather-app.herokuapp.com/forecast/${urlParams}`;

  // Add loader
  const loaderWrapper = document.createElement("div");
  loaderWrapper.setAttribute("id", "loader-wrapper");
  loaderWrapper.innerHTML = `<div id="loader"></div>`;
  document.querySelector("body").prepend(loaderWrapper);

  fetch(proxyServerUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      save(CONSTANTS.WEATHER_DATA, weatherData);
      if (!load(CONSTANTS.TEMP)) {
        save(CONSTANTS.TEMP, CONSTANTS.F);
      }
      renderWeatherData(weatherData, load(CONSTANTS.TEMP));
    })
    .catch((reason) => {
      console.error("There is a problem fetching the URL.", reason);
    });
};

export { askLocation, getWeatherDataNow };
