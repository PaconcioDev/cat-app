const catApi = "https://api.thecatapi.com/v1/images/search";

const btn = document.querySelector("button");
btn.addEventListener("click", getCat);

async function getCat() {
  try {
    const res = await fetch(catApi);
    const data = await res.json();
    const img = document.querySelector("img");
    img.src = data[0].url;
  } catch (error) {
    return new Error(error);
  }
}

window.addEventListener("load", getCat)
