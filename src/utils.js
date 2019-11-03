import {CONSTANTS, load, save} from "./storage";
import {paintLandingPage} from "./paint_ui";

const f2c = f => Math.round((f - 32) * 5 / 9);

// Convert Unix timestamp to date in js:
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

function calcHours(unixTime, offset) {
  const date = new Date(unixTime * 1000);
  let UTCHours = date.getUTCHours();
  let UTCMinutes = date.getUTCMinutes();
  let offsetMinutes;
  let hours;

  // If number is not an integer, get the floating nums, convert them to
  // mins and add then to the UTCMinutes. Then add minutes to UTC hours and
  // offset hours and that is the correct hour to show weather for.
  if (!Number.isInteger(offset)) {
    if (offset % 1 === 0.5) {
      offsetMinutes = 30;
    } else if (offset % 1 === 0.75) {
      offsetMinutes = 45;
    } else if (offset % 1 === 0.25) {
      offsetMinutes = 15;
    }

    UTCMinutes += offsetMinutes;

    if (UTCMinutes >= 60) {
      UTCHours++;
    }

    const offsetInt = parseInt(offset);
    hours = UTCHours + offsetInt;
  } else {
    hours = UTCHours + offset;
  }
  return hours;
}

const calcHour = (unixTime, offset) => {
  let hours = calcHours(unixTime, offset);

  if (hours < 0) {
    hours = 24 + hours;
  }

  // If hours is more than 12, then it's PM, else it's AM.
  if (hours >= 24) {
    return `${hours - 24} AM`;
  } else if(hours > 12) {
    return `${hours - 12} PM`;
  } else if (hours === 12) {
    return `${hours} PM`;
  } else {
    return `${hours} AM`;
  }
};

const getCurrentHour = (unixTime, offset) => {
  let hours = calcHours(unixTime, offset);

  if (hours < 0) {
    hours = 24 + hours;
  } else if (hours === 23) {
    hours = 23;
  } else if (hours > 23) {
    hours = hours - 24;
  }
  if (hours === 24) window.alert("24 hours hit!");
  return hours;
};


const formatDate = (unixTime, offset) => {
  // debugger;
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const date = new Date(unixTime * 1000);
  let dayIndex = date.getUTCDay();  // returns 0 - 6. Sunday - Saturday : 0 - 6.
  let dayOfMonth = date.getUTCDate();  // returns 1 - 31.
  let monthIndex = date.getUTCMonth(); // returns 0 - 11.
  const year = date.getUTCFullYear();

  // Check if hours > 24, then increment day by 1. If hours < 0, then
  // decrement day by 1.
  let hours = calcHours(unixTime, offset);
  if (hours < 0) {
    dayIndex = dayIndex - 1;
    dayOfMonth = dayOfMonth - 1;
  } else if (hours >= 24){
    dayIndex = dayIndex + 1;
    if (dayIndex > 6) { dayIndex = dayIndex - 7; }
    dayOfMonth = dayOfMonth + 1;
    if (dayOfMonth > daysInMonth ((monthIndex + 1), year)) {
      dayOfMonth = 1;
      monthIndex = monthIndex + 1;
    }
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = dayNames[dayIndex];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[monthIndex];
  return `${day}, ${month} ${dayOfMonth}`;
};

function selectTemp() {
  const allSelectedContainers = document.querySelectorAll('.selected-temp');
  const allNotSelectedContainers = document.querySelectorAll('.not-selected-temp');

  allNotSelectedContainers.forEach(elem => {
    elem.classList.toggle('not-selected-temp');
    elem.classList.toggle('selected-temp');
  });

  allSelectedContainers.forEach(elem => {
    elem.classList.toggle('selected-temp');
    elem.classList.toggle('not-selected-temp');
  });

  if (load(CONSTANTS.TEMP) === CONSTANTS.F) {
    // Change TEMP in localStorage to C
    save(CONSTANTS.TEMP, CONSTANTS.C);
  } else {
    save(CONSTANTS.TEMP, CONSTANTS.F);
  }

  paintLandingPage();
}

function selectBackgroundColor(temperatureC) {
  let backgroundColor;
  if (temperatureC < -25) { backgroundColor = "#008FE0"; }
  else if (temperatureC >= -25 && temperatureC < -20) { backgroundColor = "#009AF1"; }
  else if (temperatureC >= -20 && temperatureC < -15) { backgroundColor = "#00A3FF"; }
  else if (temperatureC >= -15 && temperatureC < -10) { backgroundColor = "#00AAF4"; }
  else if (temperatureC >= -10 && temperatureC < -5) { backgroundColor = "#00B7F1"; }
  else if (temperatureC >= -5 && temperatureC < 0) { backgroundColor = "#00C9F6"; }
  else if (temperatureC >= 0 && temperatureC < 5) { backgroundColor = "#00D6E3"; }
  else if (temperatureC >= 5 && temperatureC < 10) { backgroundColor = "#EFD702"; }
  else if (temperatureC >= 10 && temperatureC < 15) { backgroundColor = "#FFC700"; }
  else if (temperatureC >= 15 && temperatureC < 20) { backgroundColor = "#FFB800"; }
  else if (temperatureC >= 20 && temperatureC < 25) { backgroundColor = "#FFA800"; }
  else if (temperatureC >= 25 && temperatureC < 30) { backgroundColor = "#FF8A00"; }
  else if (temperatureC >= 30 && temperatureC < 35) { backgroundColor = "#FF6B00"; }
  else if (temperatureC >= 35 && temperatureC < 40) { backgroundColor = "#ED5500"; }
  else if (temperatureC >= 40 && temperatureC < 45) { backgroundColor = "#E54500"; }
  else if (temperatureC >= 45) { backgroundColor = "#D84100"; }
  return backgroundColor;
}

const windSpeedDescription = (windSpeedInKmPerHour) => {
  let windDescription;
  if (windSpeedInKmPerHour <=11) { windDescription = "Light"; }
  else if (windSpeedInKmPerHour > 11 && windSpeedInKmPerHour <= 38) { windDescription = "Moderate"; }
  else if (windSpeedInKmPerHour > 38 && windSpeedInKmPerHour <= 61) { windDescription = "Strong"; }
  else if (windSpeedInKmPerHour > 61 && windSpeedInKmPerHour <= 88) { windDescription = "Very strong"; }
  else if (windSpeedInKmPerHour > 88 && windSpeedInKmPerHour <= 117) { windDescription = "Extremely strong"; }
  else if (windSpeedInKmPerHour > 117) { windDescription = "Hurricane"; }
  return windDescription;
};

const calculateKm = (miles) => {
  return Math.round(miles * 1.60934);
};

const miles2km = (miles) => {
  const km = calculateKm(miles);
  const speedDescription = windSpeedDescription(km);
  // return `${speedDescription}, ${km} km/hr`;
  return `${speedDescription}`;
};

const milesPerHour = (miles) => {
  const m = Math.round(miles);
  const km = calculateKm(m);
  const speedDescription = windSpeedDescription(km);
  // return `${speedDescription}, ${m} mph`;
  return `${speedDescription}`;
};

const getUvIndexDescription = (uvIndex) => {
  let description;
  if (uvIndex >= 0 && uvIndex < 3) { description = "Low"; }
  else if (uvIndex >= 3 && uvIndex < 6) { description = "Medium"; }
  else if (uvIndex >= 6 && uvIndex < 8) { description = "High"; }
  else if (uvIndex >= 8 && uvIndex < 11) { description = "Very high"; }
  else if (uvIndex >= 11) { description = "Extreme"; }
  return description;
};

export {
  f2c,
  calcHour,
  getCurrentHour,
  formatDate,
  selectTemp,
  selectBackgroundColor,
  miles2km,
  milesPerHour,
  getUvIndexDescription,
}
