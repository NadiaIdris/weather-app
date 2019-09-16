import {askLocation} from "./data";
import {
  generateUI,
  hidePopUp,
  showPopUp,
  addClickEventListeners,
  paintEmptyLandingPage,
} from "./paint_ui";
import {save, load} from "./storage";

const myLocationIcon = document.querySelector('#my-location');

const main = () => {
  paintEmptyLandingPage();
  myLocationIcon.addEventListener('click', askLocation);
// If in localStorage allow access is not set yet.
  myLocationIcon.addEventListener('mouseover', showPopUp);
  myLocationIcon.addEventListener('mouseout', hidePopUp);
  addClickEventListeners();
};

main();



//TO DO:
// - Add shadow to the whole weather details and summary
// section. Potentially use toggle and a class to do this.
