import { API_URL_FAVORITES, API_KEY } from "./api.js";
import { deleteFavoriteCat } from "./deleteFavoriteCat.js";

const favoriteCatsError = document.querySelector(".favorite-cats__error");
const favoriteCatsContainer = document.querySelector(
  ".favorite-cats__container"
);

async function getFavoriteCats() {
  try {
    const res = await fetch(`${API_URL_FAVORITES}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    
    favoriteCatsContainer.innerHTML = "";
    const data = await res.json();
    data.forEach((element) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnContent = document.createTextNode("😿");
      
      btn.classList = "delete-cat-btn"
      btn.addEventListener("click", () => deleteFavoriteCat(element.id));
      btn.appendChild(btnContent);
      img.src = element.image.url;
      img.classList = "cat-image";
      
      article.append(img, btn);
      favoriteCatsContainer.appendChild(article);
    });
  } catch (error) {
    const res = await fetch(`${API_URL_FAVORITES}`, {
      method: "GET",
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

export { getFavoriteCats };
