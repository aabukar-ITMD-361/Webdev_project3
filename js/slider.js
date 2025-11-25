let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

next.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

prev.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

showSlide(slideIndex);