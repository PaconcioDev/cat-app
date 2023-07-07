import { API_URL_FAVORITES, API_KEY } from "./api.js";
import { getFavoriteCats } from "./getFavoriteCats.js";

async function deleteFavoriteCat(id) {
  try {
    await fetch(`${API_URL_FAVORITES}/${id}`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    getFavoriteCats();
  } catch (error) {
    const res = await fetch(`${API_URL_FAVORITES}/${id}`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    if (res.status !== 200) {
      favoriteCatsError.innerHTML = `There was an error: ${res.status}`;
      favoriteCatsError.classList = "error";
    }
    throw new Error(error);
  }
}

export { deleteFavoriteCat };
