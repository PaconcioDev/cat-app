import { API_URL_FAVORITES, API_KEY } from "./api.js";
import { getFavoriteCats } from "./getFavoriteCats.js";

async function saveFavoriteCats(id) {
  try {
    await fetch(`${API_URL_FAVORITES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });

    getFavoriteCats();
  } catch (error) {
    throw new Error(error);
  }
}

export { saveFavoriteCats };
