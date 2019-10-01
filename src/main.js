import {askLocation} from "./data";
import {
  addClickEventListeners,
  hidePopUp,
  paintEmptyLandingPage,
  showPopUp,
}                    from "./paint_ui";
import {test_all} from "./test/test_all";

const attachListeners = () => {
  const myLocationIcon = document.querySelector('#my-location');
  myLocationIcon.addEventListener('click', askLocation);
  myLocationIcon.addEventListener('mouseover', showPopUp);
  myLocationIcon.addEventListener('mouseout', hidePopUp);
  addClickEventListeners();
};

const main = () => {
  attachListeners();
  paintEmptyLandingPage();
};

main();

test_all();

//TODO:
// - Add shadow to the whole weather details and summary
//   section. Potentially use toggle and a CSS class to do this.
