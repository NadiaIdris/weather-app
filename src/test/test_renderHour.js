import {renderHour} from "../renderers";
import {weatherData} from "./test_dummy_data";

function test_renderHour() {
  const hourData = weatherData.hourly.data[1];
  const dailyData = weatherData.daily.data[1];

  const content = renderHour(hourData, dailyData);

  console.log(content);
}

// Make this function available in Chrome Dev Tools by making it a global.
window.test_renderHour = test_renderHour;

export {test_renderHour}
