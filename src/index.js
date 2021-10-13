import fetchPictures from "./apiService.js";
import cardTmpl from "./template.hbs";

const inputEl = document.querySelector(".search-form");
const container = document.querySelector(".gallery");

inputEl.addEventListener("input", onInput);

function onInput(e) {
  e.preventDefault();
  fetchPictures(e).then((data) => {
    container.insertAdjacentHTML("beforeend", cardTmpl(data));
  });
}
