const f2c = f => Math.round((f - 32) * 5 / 9);
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
const calcTime = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  // If hours is more than 12, then it's PM, else it's AM.
  if (hours > 12) {
    return `${hours - 12}:${minutes.substring(minutes.length - 2)} PM`;
  } else if (hours === 12) {
    return `${hours}:${minutes.substring(minutes.length - 2)} PM`;
  } else {
    return `${hours}:${minutes.substring(minutes.length - 2)} AM`;
  }
};

const calcHour = (unixTime, offset) => {
  const date = new Date(unixTime * 1000);
  let hoursLeft = date.getUTCHours() + offset;  //1-7=-6  should be 18

  if (hoursLeft < 0) {
    hoursLeft = 24 + hoursLeft;
  }

  // If hours is more than 12, then it's PM, else it's AM.
  if (hoursLeft >= 24) {
    return `${hoursLeft - 24} AM`;
  } else if(hoursLeft > 12) {
    return `${hoursLeft - 12} PM`;
  } else if (hoursLeft === 12) {
    return `${hoursLeft} PM`;
  } else {
    return `${hoursLeft} AM`;
  }
};

const getCurrentHour = (unixTime, offset) => {
  const date = new Date(unixTime * 1000);
  const utcHours = date.getUTCHours();
  let hours = utcHours + offset;
  if (hours < 0) {
    hours = 24 + hours;
  } else if (hours >= 24) {
    hours = hours - 24;
  }
  return hours;
};


const formatDate = (unixTime, offset) => {
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const date = new Date(unixTime * 1000);
  const hoursUTC = date.getUTCHours();
  let dayIndex = date.getUTCDay();  // returns 0 - 6. Sunday - Saturday : 0 - 6.
  let dayOfMonth = date.getUTCDate();  // returns 1 - 31.
  let monthIndex = date.getUTCMonth(); // returns 0 - 11.
  const year = date.getUTCFullYear();

  // daysInMonth((monthIndex + 1), year);

  // Check if hours > 24, then increment day by 1. If hours < 0, then
  // decrement day by 1.
  let hours = hoursUTC + offset;
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
  calcTime,
  calcHour,
  getCurrentHour,
  formatDate
}
