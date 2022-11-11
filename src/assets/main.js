const catApi = "https://api.thecatapi.com/v1/images/search?limit=3";

const btn = document.querySelector("button");
btn.addEventListener("click", getCat);

async function getCat() {
  try {
    const res = await fetch(catApi);
    const data = await res.json();
    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const img3 = document.querySelector("#img3");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  } catch (error) {
    return new Error(error);
  }
}

window.addEventListener("load", getCat)
