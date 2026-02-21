const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");
const dots = document.querySelectorAll(".carousel-dots .dot");
const toggle = document.querySelector(".theme");

let currentIndex = 0;
let autoSlideInterval = 3000; // 3 seconds

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
})


function updateCarousel() {
  // Move slides
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Next slide (cyclic)
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

// Previous slide (cyclic)
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Arrow clicks
rightArrow.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide(); // restart timer on manual click
});

leftArrow.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide(); // restart timer on manual click
});

// Click dots to jump to slide
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
    resetAutoSlide(); // restart timer on manual click
  });
});

// Auto-slide
let slideTimer = setInterval(nextSlide, autoSlideInterval);

// Reset timer after manual navigation
function resetAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, autoSlideInterval);
}

// Initialize carousel on page load
updateCarousel();
