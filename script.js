const toggle = document.querySelector(".theme");

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Carousel
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");
const dots = document.querySelectorAll(".carousel-dots .dot");

if (track && slides.length && leftArrow && rightArrow) {
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  let slideTimer = setInterval(nextSlide, 3000);

  function resetAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 3000);
  }

  rightArrow.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
  leftArrow.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      resetAutoSlide();
    });
  });

  updateCarousel();
}

// Typewriter hero title
const titles = ["data scientist", "programmer", "data analyst", "content creator", "problem solver"];
const titleEl = document.getElementById("hero-title");
let titleIndex = 0;
let currentText = titles[0];
let isDeleting = false;
let charIndex = currentText.length;
let typeTimer = null;

const TYPE_SPEED = 80;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 300;

function tick() {
  if (!isDeleting) {
    charIndex++;
    titleEl.firstChild.textContent = currentText.slice(0, charIndex);

    if (charIndex === currentText.length) {
      isDeleting = true;
      typeTimer = setTimeout(tick, PAUSE_AFTER_TYPE);
      return;
    }
    typeTimer = setTimeout(tick, TYPE_SPEED);
  } else {
    charIndex--;
    titleEl.firstChild.textContent = currentText.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      currentText = titles[titleIndex];
      typeTimer = setTimeout(tick, PAUSE_AFTER_DELETE);
      return;
    }
    typeTimer = setTimeout(tick, DELETE_SPEED);
  }
}

if (titleEl) {
  titleEl.firstChild.textContent = currentText;
  isDeleting = true;
  charIndex = currentText.length;
  typeTimer = setTimeout(tick, PAUSE_AFTER_TYPE);
}

// Reflective card tilt and spin
const cardWrapper = document.querySelector(".about-image");
const cardInner = document.querySelector(".about-image-inner");

if (cardWrapper && cardInner) {
    cardWrapper.addEventListener("mousemove", (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = ((y - cy) / cy) * -12;
        const rotateY = ((x - cx) / cx) * 12;

        const mx = ((x / rect.width) * 100).toFixed(1) + "%";
        const my = ((y / rect.height) * 100).toFixed(1) + "%";

        cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        cardInner.style.setProperty("--mx", mx);
        cardInner.style.setProperty("--my", my);
    });

    cardWrapper.addEventListener("mouseleave", () => {
        cardInner.style.transform = "";
    });

    cardWrapper.addEventListener("click", () => {
        if (cardInner.classList.contains("spinning")) return;
        cardInner.classList.add("spinning");
        cardInner.addEventListener("animationend", () => {
            cardInner.classList.remove("spinning");
        }, { once: true });
    });
}

// Active nav state on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".bottom-nav a[href^='#']");

function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove("active"));
            const match = document.querySelector(`.bottom-nav a[href="#${section.id}"]`);
            if (match) match.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();
