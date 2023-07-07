import { getCats } from "./getCats.js";
import { getFavoriteCats } from "./getFavoriteCats.js";
import { uploadCat } from "./uploadCat.js";

const reloadBtn = document.querySelector(".reload-btn");
const uploadBtn = document.querySelector(".upload-btn");

getCats();
getFavoriteCats();
reloadBtn.addEventListener("click", getCats);
uploadBtn.addEventListener("click", uploadCat);
