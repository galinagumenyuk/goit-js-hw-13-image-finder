import ApiService from "./apiService.js";
import cardTmpl from "./template.hbs";
import * as _ from "lodash";
import "./styles.css";
//
const inputEl = document.querySelector(".search-form");
const container = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const apiService = new ApiService();

inputEl.addEventListener("input", _.debounce(onInput, 600));
loadMoreBtn.addEventListener("click", onLoadMore);

function onInput(e) {
  e.preventDefault();
  apiService.query = e.target.value;
  if (apiService.query === "") {
    return;
  }
  apiService.resetPage();
  apiService.fetchPictures().then((data) => {
    clearContainer();
    container.insertAdjacentHTML("beforeend", cardTmpl(data));
    loadMoreBtn.disabled = false;
  });
}

function onLoadMore() {
  apiService.fetchPictures().then((data) => {
    container.insertAdjacentHTML("beforeend", cardTmpl(data));
    scroll();
  });
}

function clearContainer() {
  container.innerHTML = "";
}

function scroll() {
  let lastLiItem = document.querySelectorAll(".list-item");

  lastLiItem[lastLiItem.length - (apiService.perPage - 1)].scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
