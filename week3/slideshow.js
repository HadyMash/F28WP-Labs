document.addEventListener('DOMContentLoaded', () => {
  // get the container, next, and prev buttons
  const slideshowContainer = document.querySelector('.slideshow-container');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  // get array of slides
  const slides = slideshowContainer.querySelectorAll('.slide');

  // set the slide number to show (index / total) e.g. (1/8)
  slides.forEach((slide, index) => {
    slide.querySelector('.slide-number').innerHTML = `${index + 1}/${
      slides.length
    }`;
  });

  // variable to keep track of current slide state
  let slideIndex = 0;

  // hide all slides except for index
  function updateSlides(index) {
    slides.forEach((slide) => {
      slide.classList.remove('active-slide');
    });
    slides[index].classList.add('active-slide');
  }

  // show previous slide
  function prev() {
    // check edge case of first slide
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    updateSlides(slideIndex);
  }

  // show next slide
  function next() {
    // check edge case of last slide
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    updateSlides(slideIndex);
  }

  // make prev and next buttons functional
  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);

  // show first slide
  updateSlides(0);
});
