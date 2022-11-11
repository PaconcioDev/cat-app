const catApi = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_Q0wfPKfjVPpcy89sxD4FNgg1Nxw1MDX8prBvweFoEO5Jhv7YUSNzwCJEOQdNZ9Ms";

const btn = document.querySelector("button");
btn.addEventListener("click", getCat);

async function getCat() {
  try {
    const res = await fetch(catApi);
    const data = await res.json();
    console.log(data) //! This will return an array of 3 objects
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
