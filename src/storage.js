/**
 * The following keys are stored in localStorage.
 */
//https://darksky.net/dev/docs
const CONSTANTS = {
  WEATHER_DATA: "WEATHER_DATA",
  LAT: "LAT",
  LNG: "LNG",
  TEMP: "TEMP",
  F: "F",
  C: "C",
  CITY: "CITY",
  ACCESS: "ACCESS",
  GRANTED: "GRANTED",
};

/**
 * Given the key and the value, the stringified value is saved to localStorage.
 */
const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * If the key is found in localStorage then it returns the parsed value for it.
 * Otherwise returns null.
 */
const load = (key) => {
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  if (!dataFromStorage) {
    console.warn(`Data for key "${key}" not found in localStorage`);
    return;
  }
  // console.log(`Data for key "${key}" loaded from localStorage`, dataFromStorage);
  return dataFromStorage;
};

export { save, load, CONSTANTS };
