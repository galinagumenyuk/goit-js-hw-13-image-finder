import ApiService from "./apiService.js";
import cardTmpl from "./template.hbs";
import * as _ from "lodash";
import "./styles.css";
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";
const myStack = new PNotify.Stack({
  dir1: "up",
});
import localStorage from "../src/localstorage";

const container = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const scrollBtn = document.querySelector(".btn_scroll");

const apiService = new ApiService();

window.addEventListener("keyup", onInput);
loadMoreBtn.addEventListener("click", onLoadMore);

function onInput(e) {
  if (e.which === 13) {
    e.preventDefault();
    apiService.query = e.target.value;
    if (apiService.query === "") {
      return;
    }
    apiService.resetPage();
    apiService.fetchPictures().then((data) => {
      clearContainer();
      container.insertAdjacentHTML("beforeend", cardTmpl(data));
      loadMoreBtn.classList.remove("btn_loader--hidden");
      if (data.length === 0) {
        PNotify.notice({
          text: "Please, enter a correct request!",
          stack: myStack,
          modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
        });
        loadMoreBtn.classList.add("btn_loader--hidden");
      }
    });
  }
}

function onLoadMore() {
  apiService.fetchPictures().then((data) => {
    container.insertAdjacentHTML("beforeend", cardTmpl(data));
    scroll();
  });
}

function clearContainer() {
  container.innerHTML = "";
  myStack.close(true);
}

function scroll() {
  let lastLiItem = document.querySelectorAll(".list-item");

  lastLiItem[lastLiItem.length - (apiService.perPage - 1)].scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

scrollBtn.addEventListener("click", scrollUp);

function scrollUp() {
  let firstLiItem = document.querySelectorAll(".list-item");

  firstLiItem[0].scrollIntoView({
    behavior: "smooth",
  });
}
