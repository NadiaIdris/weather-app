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
  // debugger;
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
  let hours = date.getUTCHours() + offset;
  if (hours < 0) {
    hours = 24 + hours;
  }

  return hours;
};

const formatDate = unixTime => {
  const date = new Date(unixTime * 1000);

  const dayIndex = date.getDay();  // returns 0 - 6. Sunday - Saturday : 0 - 6.
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = dayNames[dayIndex];

  const monthIndex = date.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[monthIndex];

  const dayOfMonth = date.getDate();

  return `${day}, ${month} ${dayOfMonth}`;
};

export {
  f2c,
  calcTime,
  calcHour,
  getCurrentHour,
  formatDate
}
