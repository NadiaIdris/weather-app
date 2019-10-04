import {test_renderHour} from "./test_renderHour";
import {test_renderAllHoursPerDay} from "./test_renderAllHoursPerDay";

function test_all() {
  test_renderHour();
  test_renderAllHoursPerDay();
}

export {test_all}
