const html = document.documentElement;
const filters = document.querySelector(".filters");
const buttonsContainer = document.querySelector(".btn-container");
const editor = document.querySelector(".editor");
const inputImg = document.querySelector(".btn-load--input");
const button = document.querySelectorAll(".btn");
const img = editor.querySelector("img");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

filters.addEventListener("input", (event) => filterOn(event.target));
buttonsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-reset")) {
    buttonReset();
    activeButton(event);
  }
  if (event.target.classList.contains("btn-next")) {
    buttonNext(event.target);
    activeButton(event);
  }
  if (event.target.classList.contains("btn-save")) {
    savePicture();
    activeButton(event);
  }
});
inputImg.addEventListener("change", (event) => {
  activeButton(event);
  loadImg(event.target);
});

function activeButton(e) {
  button.forEach((btn) => {
    if (btn.classList.contains("btn-active"))
      btn.classList.remove("btn-active");
  });

  if (e.target.classList.contains("btn-load--input")) {
    button.forEach((item) => {
      if (item.classList.contains("btn-load")) item.classList.add("btn-active");
    });
  } else e.target.classList.add("btn-active");
}

function filterOn(x) {
  const suffix = x.dataset.sizing;
  document.documentElement.style.setProperty(`--${x.name}`, x.value + suffix);
  x.nextElementSibling.value = x.value;
}

function buttonReset() {
  const inputsFilter = filters.querySelectorAll("input");
  inputsFilter.forEach((elem) => {
    elem.value = elem.getAttribute("value");
    filterOn(elem);
  });
}

function loadImg(x) {
  const reader = new FileReader();
  reader.readAsDataURL(x.files[0]);
  reader.onload = function () {
    img.src = reader.result;
    img.setAttribute("crossOrigin", "anonymous");
  };
  x.value = "";
}

let i = 0;
function buttonNext(x) {
  const date = new Date();
  const partOfTheDay = {
    night: 0,
    morning: 6,
    day: 12,
    evening: 18,
  };
  let hour;
  for (let key in partOfTheDay) {
    if (date.getHours() >= partOfTheDay[key]) hour = key;
  }

  const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${hour}/`;
  const images = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
  ];

  let index = i % 19;
  i++;
  const image = new Image();
  image.src = base + images[index];
  image.onload = () => {
    img.src = image.src;
  };
}

function savePicture() {
  const image = new Image();
  image.src = img.src;
  image.setAttribute("crossOrigin", "anonymous");

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    let valueFilters = [];
    for (let elem of filters.children) {
      valueFilters.push(elem.firstElementChild.value);
    }

    ctx.filter = `blur(${valueFilters[0] * 3}px) invert(${valueFilters[1]}%) 
      sepia(${valueFilters[2]}%) saturate(${valueFilters[3]}%) hue-rotate(${
      valueFilters[4]
    }deg)`;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  };
}

document
  .querySelector(".openfullscreen")
  .addEventListener("click", (event) => html.requestFullscreen());
document
  .querySelector(".fullscreen")
  .addEventListener("click", (event) => document.webkitCancelFullScreen());
