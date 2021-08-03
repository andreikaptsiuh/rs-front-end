//header open 640px and 320px
const hamburger = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");

hamburger.addEventListener("click", (event) => {
  if (hamburger.classList.contains("header__burger_open")) {
    hamburger.classList.remove("header__burger_open");
    headerMenu.classList.remove("header__menu_open");
  } else {
    hamburger.classList.add("header__burger_open");
    headerMenu.classList.add("header__menu_open");
  }
});
