import { API_KEY, API_URL_UPLOAD } from "./api.js";
import { saveFavoriteCats } from "./saveFavoriteCats.js";

async function uploadCat() {
  try {
    const form = document.querySelector("#uploading-form");
    const formData = new FormData(form);

    const res = await fetch(API_URL_UPLOAD, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
      },
      body: formData,
    });
    const data = await res.json();
    saveFavoriteCats(data.id)
  } catch (error) {
    throw new Error(error)
  }
}

export { uploadCat };
