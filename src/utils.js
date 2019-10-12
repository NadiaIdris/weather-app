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

const calcHour = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  // If hours is more than 12, then it's PM, else it's AM.
  if (hours > 12) {
    return `${hours - 12} PM`;
  } else if (hours === 12) {
    return `${hours} PM`;
  } else {
    return `${hours} AM`;
  }
};

const getCurrentHour = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
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
