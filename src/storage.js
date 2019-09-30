/**
 * The following keys are stored in LocalStorage.
*/
const LOCATIONS = {
  WEATHER_DATA: "WEATHER_DATA",
  LAT: "LAT",
  LNG: "LNG"
};

const save = (key, weatherData) => {
  localStorage.setItem(key, JSON.stringify(weatherData));
};

const load = (key) => {
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  if (!dataFromStorage) {
    return;
  }
  console.log(`This is data from localStorage`);
  console.log(dataFromStorage);
};

export {save, load, LOCATIONS};
