const save = (key, weatherData) => {
  localStorage.setItem(key, JSON.stringify(weatherData));
}

const load = (key) => {
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  if (!dataFromStorage)  return;
  console.log(`This is data from localStorage`);
  console.log(dataFromStorage);
}

// const saveAndLoadData = (key, weatherData) => {
//   save('weatherData', weatherData);
//   load('weatherData');
// }

export {save, load};
