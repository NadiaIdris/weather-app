import {testing} from "../src/renderers";
import {weatherData} from "./test_data";

describe('renderHour function', () => {
  it('renders weatherData.hourly.data', () => {
    debugger;
    const hourData = weatherData.hourly.data[1];
    const returnValue = testing.renderHour(hourData);
    console.log(returnValue);
    expect(returnValue.trim()).toBe(expectedContent.trim());
  });
});

const expectedContent =
`
      <div class="hour-container">
        <div class="hour-summary">
          <p>5 PM</p>
          <img class="small-icon" src="images/partly-cloudy-day">
          <p>18<span>&#176;</span>/65<span>&#176;</span></p>
        </div>

        <div class="hour-details">
          <div class="left-col">
            <p>Wind</p>
            <p class="p-space">UV index</p>
            <p>Humidity</p>
            <p>Dew point</p>
            <p class="p-space">Precipitation</p>
          </div>
          <div class="right-col">
            <p>7.79 mph</p>
            <p class="p-space">1</p>
            <p>0.35</p>
            <p>36.34</p>
            <p class="p-space">0</p>
          </div>
        </div>
      </div>

`;
