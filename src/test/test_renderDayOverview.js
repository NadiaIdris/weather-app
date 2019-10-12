import {testing} from "../renderers";
import {weatherData} from "./test_dummy_data";

function test_renderDayOverview() {
  const today = weatherData.currently;
  const day = weatherData.daily.data[1];

  let content = "";
  content += testing.renderDayOverview(today);
  content += testing.renderDayOverview(day);
  console.log(content);
}

window.test_renderDayOverview = test_renderDayOverview;

export {test_renderDayOverview};
