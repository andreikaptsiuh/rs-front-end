const body = document.querySelector("body");

//header open 640px and 320px
{
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
}

//pop ups
{
  const popUps = document.querySelector(".popups");
  const allPopUp = document.querySelectorAll(".popup");
  const btnPopUp = document.querySelectorAll(".show-popup");

  //for donate pop up
  const donatePrice = document.querySelector(".popup__bottom_price");
  const donateOther = document.querySelector(".popup__bottom_other");
  const step1Price = document.querySelectorAll(".step1__price_item");

  const donateInput = document.querySelector("#donate__quick_input");
  const amountInput = document.querySelector(".step1__amount_input");
  const donateForPet = document.querySelector(".step1__special_input");

  //donate complete step3
  const donateCompleteItems = document.querySelectorAll(".donate__complete");
  const donateCompleteBtn = document.getElementById("donate__complete_btn");

  btnPopUp.forEach((el) => {
    el.addEventListener("click", (event) => {
      showPopUp(event.target);
    });
  });

  popUps.addEventListener("click", (event) => {
    closePopUp(event.target);
  });

  donatePrice.addEventListener("click", (event) => {
    closePopUp(event.target.closest(".popup"));

    step1Price.forEach((elem) => {
      elem.classList.remove("select");

      if (event.target.value == 1) {
        document.getElementById("other__amount").classList.add("select");
        showPopUp(elem);
      } else if (elem.value === event.target.value) {
        elem.classList.add("select");
        showPopUp(elem);
      }
    });

    amountInput.value = "";
    donateInput.value = "";
  });

  donateOther.addEventListener("click", () => {
    allPopUp.forEach((item) => {
      item.classList.remove("open");
      if (item.id === "donateStep1") item.classList.add("open");
    });
    priceInputActivate();
  });

  amountInput.addEventListener("input", () => {
    priceInputActivate();
  });

  donateForPet.addEventListener("input", () => {
    document.getElementById("donateForPet").classList.add("select");
  });

  //input value transfer
  donateInput.addEventListener("input", () => {
    if (donateInput.value !== "") {
      amountInput.value = donateInput.value;
      priceInputActivate();
    }
  });
  amountInput.addEventListener("input", () => {
    if (donateInput.value !== "") {
      donateInput.value = amountInput.value;
    }
  });

  donateCompleteItems.forEach((element) => {
    element.addEventListener("input", () => validate());
  });

  donateCompleteBtn.addEventListener("click", () => {
    if (validate()) {
      closePopUp(donateCompleteBtn);
      alert("Thanks you for your donate!");
    }
  });

  function showPopUp(x) {
    const trueButton = x.closest("button")
      ? x.closest("button")
      : x.closest(".popup");

    if (trueButton.classList.contains("quick__form_button")) {
      if (donateInput.value == "") {
        amountInput.value = "";
        step1Price.forEach((elem) => {
          elem.value == "10"
            ? elem.classList.add("select")
            : elem.classList.remove("select");
        });
      }
    }

    if (trueButton.classList.contains("step1__next")) {
      if (+amountInput.value == 0) return;
    }
    if (trueButton.closest(".popup") !== null) {
      closePopUp(trueButton.closest(".popup"));
    }

    for (let item of allPopUp) {
      if (item.id === trueButton.id) item.classList.add("open");
    }

    body.classList.add("noscrol");
  }

  function closePopUp(x) {
    if (x.classList.contains("popup")) {
      x.classList.remove("open");
    } else if (x.classList.contains("popup__close")) {
      x.closest(".popup").classList.remove("open");
    }

    let bool = false;
    for (let item of allPopUp) {
      if (item.classList.contains("open")) {
        bool = true;
        break;
      }
    }
    if (!bool) body.classList.remove("noscrol");
  }

  function priceInputActivate() {
    step1Price.forEach((elem) => {
      elem.id === "other__amount"
        ? elem.classList.add("select")
        : elem.classList.remove("select");
    });
  }

  function validate() {
    let bool = false;
    for (let item of donateCompleteItems) {
      if (item.validity.valid) {
        bool = true;
      } else {
        bool = false;
        break;
      }
    }

    bool
      ? donateCompleteBtn.classList.remove("invalid")
      : donateCompleteBtn.classList.add("invalid");

    return bool;
  }
}

//carousel for pets
{
  let position = 0;
  const slidesToScrol = 1;
  let slidesToShow = 3;

  const prevBtn = document.querySelector(".swipe__arrow_left");
  const nextBtn = document.querySelector(".swipe__arrow_right");

  const track = document.querySelector(".swipe__icons");
  const items = document.querySelectorAll(".swipe__icons_column");
  const itemsCount = items.length;
  const itemWidth = items[0].clientWidth;

  const movePosition = slidesToScrol * itemWidth;

  nextBtn.addEventListener("click", function () {
    if (!nextBtn.classList.contains("disabled")) {
      checkShowSlides();

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
      checkShowSlides();

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

  function checkShowSlides() {
    if (document.documentElement.clientWidth <= 1480) slidesToShow = 2;
    else slidesToShow = 3;
  }
}

//carousel for testimonials
{
  const slidesToScrol = 1;
  const slidesToShow = 2;
  let position = 0;

  const prevBtn = document.querySelector(".testimonials__navigation_button");
  const nextBtn = document.querySelector(
    ".testimonials__navigation_button.right"
  );
  const navBtnAll = document.querySelectorAll(
    ".testimonials__navigation_button"
  );

  const track = document.querySelector(".testimonials__track");
  const items = document.querySelectorAll(".content__card");
  const itemWidth = items[0].clientWidth + 40;
  const itemsCount = Math.round(items.length / 2) + 1;

  const movePosition = slidesToScrol * itemWidth;

  nextBtn.addEventListener("click", function () {
    clearTimeout(slidesShowOn);

    if (!nextBtn.classList.contains("disabled")) {
      const itemsLeft = itemsSlide();

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

  function itemsSlide() {
    return (
      itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth
    );
  }

  //timer
  let timerId = setTimeout(slidesShowOn, 15000);

  track.addEventListener("click", () => stopSlidesShow());
  navBtnAll.forEach((elem) =>
    elem.addEventListener("click", () => stopSlidesShow())
  );

  function slidesShowOn() {
    const itemsLeft = itemsSlide();

    position -=
      itemsLeft >= slidesToScrol ? movePosition : itemsLeft - itemWidth;

    if (itemsLeft == 0) position = 0;

    setPosition();
    checkBtn();

    timerId = setTimeout(slidesShowOn, 15000);
  }

  function stopSlidesShow() {
    clearTimeout(timerId);
    timerId = setTimeout(slidesShowOn, 60000);
  }
}
