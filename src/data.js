import {save, load} from "./storage";
import {paintWeatherToViewport} from "./paint_ui";

const askLocation = () => {
  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lon, lat);

      // fetch the data from dark sky
      getWeatherDataNow(lat, lon);
    })
  }
  // } else {
  //   // If current location denied, show a pop up describing how to grant
  //   // access & why.
  // }

};

const getWeatherDataNow = (lat, lon) => {
  const API_KEY = '6eae3396dc3311cb103d2f86f03d5775';
  const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}?exclude=minutely`;
  const corsFreeUrl = `https://cors-anywhere.herokuapp.com/${url}`;

  fetch(corsFreeUrl)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        //callback(myJson);
        save('weatherData', weatherData);
        paintWeatherToViewport(weatherData);
      })
      .catch((reason) => {
        console.error('There is a problem fetching the URL.', reason);
      });
};



// const callback = (jsonObject) => {
//   console.log(jsonObject);
//   const p = document.createElement('p');
//   p.textContent = `Latitude is ${jsonObject.latitude}, Longitude is ${jsonObject.longitude}, Temperature is ${jsonObject.currently.temperature}`;
//   document.body.appendChild(p);
// };

// const getWeatherData = () => {
//   const submitButton = document.querySelector('#button');
//   submitButton.addEventListener('click', paintLatAndLon);
// };


export {askLocation};
