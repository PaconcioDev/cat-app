import { API_URL_RANDOM, API_KEY } from "./api.js";
import { saveFavoriteCats } from "./saveFavoriteCats.js";

const randomCatsError = document.querySelector(".random-cats__error");
let data = undefined; //?
let hasEvent = false; //?

async function getCats() {
  try {
    const res = await fetch(`${API_URL_RANDOM}&?${API_KEY}`);
    data = await res.json();

    //* Images
    const catImg1 = document.querySelector("#cat-image1");
    const catImg2 = document.querySelector("#cat-image2");
    const catImg3 = document.querySelector("#cat-image3");
    const catImg4 = document.querySelector("#cat-image4");
    const catImg5 = document.querySelector("#cat-image5");
    const catImg6 = document.querySelector("#cat-image6");
    catImg1.src = data[0].url;
    catImg2.src = data[1].url;
    catImg3.src = data[2].url;
    catImg4.src = data[3].url;
    catImg5.src = data[4].url;
    catImg6.src = data[5].url;

    //* Buttons
    const saveCatBtn1 = document.querySelector("#save-cat-btn1");
    const saveCatBtn2 = document.querySelector("#save-cat-btn2");
    const saveCatBtn3 = document.querySelector("#save-cat-btn3");
    const saveCatBtn4 = document.querySelector("#save-cat-btn4");
    const saveCatBtn5 = document.querySelector("#save-cat-btn5");
    const saveCatBtn6 = document.querySelector("#save-cat-btn6");

    if (!hasEvent) {
      saveCatBtn1.addEventListener("click", () => saveFavoriteCats(data[0].id));
      saveCatBtn2.addEventListener("click", () => saveFavoriteCats(data[1].id));
      saveCatBtn3.addEventListener("click", () => saveFavoriteCats(data[2].id));
      saveCatBtn4.addEventListener("click", () => saveFavoriteCats(data[3].id));
      saveCatBtn5.addEventListener("click", () => saveFavoriteCats(data[4].id));
      saveCatBtn6.addEventListener("click", () => saveFavoriteCats(data[5].id));
      hasEvent = true;
    }
  } catch (error) {
    const res = await fetch(`${API_URL_RANDOM}&?${API_KEY}`);
    if (res.status !== 200) {
      randomCatsError.innerHTML = `There was an error: ${res.status}`;
      randomCatsError.classList = "error";
    }
    throw new Error(error);
  }
}

export { getCats };
