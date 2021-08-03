//header open 640px and 320px
{
  const hamburger = document.querySelector(".header__burger");
  const headerMenu = document.querySelector(".header__menu");

  hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("header__burger_open")) {
      hamburger.classList.remove("header__burger_open");
      headerMenu.classList.remove("header__menu_open");
    } else {
      hamburger.classList.add("header__burger_open");
      headerMenu.classList.add("header__menu_open");
    }
  });
}

//sidebar panel
{
  const sidebar = document.querySelector(".sidebar");
  const sidebarButtonOpen = document.querySelector(".sidebar__panel_button");

  const sidebarBottomBtn = document.querySelector(".sidebar__bottom_button");
  const sidebarPanel = document.querySelectorAll(".sidebar__panel");

  sidebarButtonOpen.addEventListener("click", () => {
    sidebar.classList.contains("sidebar_open")
      ? sidebar.classList.remove("sidebar_open")
      : sidebar.classList.add("sidebar_open");
  });

  sidebarBottomBtn.addEventListener("click", () => {
    sidebarShowPets(sidebarPanel);
  });

  function sidebarShowPets(arr) {
    let active = 4;

    for (let item of arr) {
      if (item.classList.contains("sidebar__panel_close") && active > 0) {
        item.classList.remove("sidebar__panel_close");
        --active;
        continue;
      }
      item.classList.add("sidebar__panel_close");
    }
  }
}

//cams video
{
  const camsSmall = document.querySelectorAll(".cam");
  const mainFrame = document.querySelector(".main__content_frame");

  camsSmall.forEach((elem) => {
    elem.addEventListener("click", (event) => showVideo(event.target));
  });

  function showVideo(elem) {
    const trueElem = elem.parentElement.lastElementChild;
    const src = mainFrame.src;

    mainFrame.src = trueElem.src;
    trueElem.src = src;
  }
}

//carousel for cams
{
  let position = 0;
  const slidesToScrol = 1;
  let slidesToShow = 3;

  const prevBtn = document.querySelector(".cams__left");
  const nextBtn = document.querySelector(".cams__right");

  const track = document.querySelector(".cams__video");
  const items = document.querySelectorAll(".cam");
  const itemsCount = items.length;
  const itemWidth = items[0].clientWidth;

  const movePosition = slidesToScrol * itemWidth;

  nextBtn.addEventListener("click", function () {
    if (!nextBtn.classList.contains("disabled")) {
      const itemsLeft =
        itemsCount -
        (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

      position -=
        itemsLeft >= slidesToScrol ? movePosition : itemsLeft - itemWidth;
      setPosition();
    }
    checkBtn();
  });

  prevBtn.addEventListener("click", function () {
    if (!prevBtn.classList.contains("disabled")) {
      position += movePosition;
      setPosition();
    }
    checkBtn();
  });

  function setPosition() {
    track.style.transform = `translateX(${position}px)`;
  }

  function checkBtn() {
    if (position === 0) prevBtn.classList.add("disabled");
    else prevBtn.classList.remove("disabled");

    if (position <= -(itemsCount - slidesToShow) * itemWidth) {
      nextBtn.classList.add("disabled");
    } else nextBtn.classList.remove("disabled");
  }
  checkBtn();
}
