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

export {
  f2c,
  calcHour,
  getCurrentHour,
  formatDate
}
