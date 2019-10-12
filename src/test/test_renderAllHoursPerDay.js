import {testing} from "../renderers";
import {weatherData} from "./test_dummy_data";

function test_renderAllHoursPerDay() {
  const content = testing.renderAllHoursPerDay(weatherData);
  console.log(content);
}

window.test_renderAllHoursPerDay = test_renderAllHoursPerDay;

export {test_renderAllHoursPerDay};
