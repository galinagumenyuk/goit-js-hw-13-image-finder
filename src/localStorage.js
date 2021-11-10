const toggleEl = document.querySelector(".theme-switch__toggle");
const bodyEl = document.querySelector("body");

toggleEl.addEventListener("change", onChangeTheme);

function onChangeTheme(e) {
  if (toggleEl.checked) {
    bodyEl.classList.add("dark-theme");
    bodyEl.classList.remove("light-theme");
    localStorage.setItem("theme", "dark-theme");
  } else {
    bodyEl.classList.add("light-theme");
    bodyEl.classList.remove("dark-theme");
    localStorage.setItem("theme", "light-theme");
  }
}
window.onload = () => {
  if (localStorage.getItem("theme") === "dark-theme") {
    toggleEl.checked = true;
  }
  onChangeTheme();
};
