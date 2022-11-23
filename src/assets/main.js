const catApi = "https://api.thecatapi.com/v1/images/search?limit=5";
const catApiFavorites = "https://api.thecatapi.com/v1/favourites";
const catApiUpload = "https://api.thecatapi.com/v1/images/upload";
const API_KEY =
  "live_Q0wfPKfjVPpcy89sxD4FNgg1Nxw1MDX8prBvweFoEO5Jhv7YUSNzwCJEOQdNZ9Ms";

//? Axios test
const newAxiosInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "X-API-KEY": API_KEY,
  },
});

const spanError = document.querySelector("#error");
const reloadBtn = document.querySelector("#reload-btn");
const submitBtn = document.querySelector("#submit-btn");

let catsResponse = undefined;
let hasEvent = false;

reloadBtn.addEventListener("click", getCats);
submitBtn.addEventListener("click", uploadCat);

async function getCats() {
  try {
    const res = await fetch(`${catApi}`);
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
      saveBtn1.addEventListener("click", () =>
        saveFavoriteCats(catsResponse[0].id)
      );
      saveBtn2.addEventListener("click", () =>
        saveFavoriteCats(catsResponse[1].id)
      );
      saveBtn3.addEventListener("click", () =>
        saveFavoriteCats(catsResponse[2].id)
      );
      saveBtn4.addEventListener("click", () =>
        saveFavoriteCats(catsResponse[3].id)
      );
      saveBtn5.addEventListener("click", () =>
        saveFavoriteCats(catsResponse[4].id)
      );
      hasEvent = true;
    }

    img1.src = catsResponse[0].url;
    img2.src = catsResponse[1].url;
    img3.src = catsResponse[2].url;
    img4.src = catsResponse[3].url;
    img5.src = catsResponse[4].url;
  } catch (error) {
    const res = await fetch(`${catApi}`);
    console.log(error);
    spanError.innerText = `Unexpected error: ${res.status}`;
    throw new Error(error);
  }
}

async function uploadCat() {
  const form = document.querySelector("#upload-form");
  const myFormData = new FormData(form);

  console.log(myFormData.get("file"));

  const res = await fetch(`${catApiUpload}`, {
    method: "POST",
    headers: {
      "X-API-KEY": API_KEY,
    },
    body: myFormData,
  });
  const data = await res.json();

  try {
    console.log("Photo uploaded");
    console.log({ data });
    console.log(data.url);
    saveFavoriteCats(data.id);
  } catch (error) {
    spanError.innerHTML = `There was an error ${res.status} ${data.message}`;
    console.log({ data });
    throw new Error(error);
  }
}

async function getFavoriteCats() {
  try {
    const res = await fetch(`${catApiFavorites}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
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
    const res = await fetch(`${catApiFavorites}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    console.log(error);
    spanError.innerText = `Unexpected error: ${res.status}`;
    throw new Error(error);
  }
}

async function saveFavoriteCats(id) {
  try {
    const res = await newAxiosInstance.post(`/favourites`, {
      image_id: id,
    });
    console.log("Cat Saved");
    getFavoriteCats();
  } catch (error) {
    throw new Error(error);
  }
  // try {
  //   const res = await fetch(`${catApiFavorites}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-API-KEY": API_KEY,
  //     },
  //     body: JSON.stringify({
  //       image_id: id,
  //     }),
  //   });
  //   console.log("saved");
  //   getFavoriteCats();
  // } catch (error) {
  //   throw new Error(error);
  // }
}

async function deleteFavoriteCat(id) {
  try {
    const res = await fetch(`${catApiFavorites}/${id}`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    console.log("daleted");
    getFavoriteCats();
  } catch (error) {
    throw new Error(error);
  }
}

window.addEventListener("load", getCats);
window.addEventListener("load", getFavoriteCats);
