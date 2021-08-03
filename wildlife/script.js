//carousel
{
  let position = 0;
  const slidesToScrol = 1;
  let slidesToShow = 3;

  const prevBtn = document.querySelector(".cards__vector_left");
  const nextBtn = document.querySelector(".cards__vector_right");

  const track = document.querySelector(".track");
  const items = document.querySelectorAll(".cards__item");
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
