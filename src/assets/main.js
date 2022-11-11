const catApi = "https://api.thecatapi.com/v1/images/search?limit=5";
const catApiFavorites = "https://api.thecatapi.com/v1/favourites";
const API_KEY =
  "api_key=live_Q0wfPKfjVPpcy89sxD4FNgg1Nxw1MDX8prBvweFoEO5Jhv7YUSNzwCJEOQdNZ9Ms";

const spanError = document.querySelector("#error");
const reloadBtn = document.querySelector("#reload-btn");

let catsResponse = undefined;
let hasEvent = false;

reloadBtn.addEventListener("click", getCats);

async function getCats() {
  try {
    const res = await fetch(`${catApi}&${API_KEY}`);
    catsResponse = await res.json();
    console.log(catsResponse); //! This will return an array of 5 objects
    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const img3 = document.querySelector("#img3");
    const img4 = document.querySelector("#img4");
    const img5 = document.querySelector("#img5");

    const saveBtn1 = document.querySelector("#save-btn1");
    const saveBtn2 = document.querySelector("#save-btn2");
    const saveBtn3 = document.querySelector("#save-btn3");
    const saveBtn4 = document.querySelector("#save-btn4");
    const saveBtn5 = document.querySelector("#save-btn5");

    //* If we dont put the saveFavoriteCats function into another funtion, everytime that getCats is called saveFavoriteCats is called too
    if (!hasEvent) {
      saveBtn1.addEventListener("click", () => saveFavoriteCats(catsResponse[0].id));
      saveBtn2.addEventListener("click", () => saveFavoriteCats(catsResponse[1].id));
      saveBtn3.addEventListener("click", () => saveFavoriteCats(catsResponse[2].id));
      saveBtn4.addEventListener("click", () => saveFavoriteCats(catsResponse[3].id));
      saveBtn5.addEventListener("click", () => saveFavoriteCats(catsResponse[4].id));
      hasEvent = true;
    } 

    img1.src = catsResponse[0].url;
    img2.src = catsResponse[1].url;
    img3.src = catsResponse[2].url;
    img4.src = catsResponse[3].url;
    img5.src = catsResponse[4].url;
  } catch (error) {
    const res = await fetch(`${catApi}&${API_KEY}`);
    console.log(error);
    spanError.innerText = `Unexpected error: ${res.status}`;
    throw new Error(error);
  }
}

async function getFavoriteCats() {
  try {
    const res = await fetch(`${catApiFavorites}?${API_KEY}`);
    const data = await res.json();
    console.log(data); //! This will return an array of x objects

    const section = document.querySelector("#favorite-images");
    section.innerHTML = "";

    data.forEach((cat) => {
      const article = document.createElement("article");
      const image = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("❌");

      btn.appendChild(btnText);
      btn.className = "unsave-btn";
      btn.addEventListener("click", () => deleteFavoriteCat(cat.id));
      image.src = cat.image.url;

      article.append(image, btn);
      section.appendChild(article);
    });
  } catch (error) {
    const res = await fetch(`${catApiFavorites}?${API_KEY}`);
    console.log(error);
    spanError.innerText = `Unexpected error: ${res.status}`;
    throw new Error(error);
  }
}

async function saveFavoriteCats(id) {
  try {
    const res = await fetch(`${catApiFavorites}?${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    console.log("saved");
    getFavoriteCats();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteFavoriteCat(id) {
  try {
    const res = await fetch(`${catApiFavorites}/${id}?${API_KEY}`, {
      method: "DELETE",
    });
    console.log("daleted");
    getFavoriteCats();
  } catch (error) {
    throw new Error(error);
  }
}

window.addEventListener("load", getCats);
window.addEventListener("load", getFavoriteCats);
