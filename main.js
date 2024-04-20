document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".control.prev");
  const nextBtn = document.querySelector(".control.next");
  let currentSlide = 0;
  let isAnimated = false;
  let isAnimating = false;

  // Call slide function to initialize
  slide();

  function next() {
    if (isAnimating) return; // Check if already animating
    isAnimating = true;
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slide();
  }

  function prev() {
    if (isAnimating) return; // Check if already animating
    isAnimating = true;
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    slide();
  }

  function slide() {
    slides.forEach((slide, index) => {
      const slideImg = slide.querySelector(".slider-img");
      const showcaseName = slide.querySelector(".showcase-name h2");
      const icon = slide.querySelector(".icon-content");

      gsap.set([slide, slideImg, showcaseName, icon], { clearProps: "all" });

      if (index === currentSlide) {
        gsap.set(slide, { zIndex: 1 });
        gsap.set(slideImg, { scale: 0.5, opacity: 1, rotation: -2 });
        gsap.set(icon, { scale: 0, opacity: 0 });
        gsap.set(showcaseName, {
          opacity: 0,
          xPercent: 15,
        });

        const tl = gsap.timeline();

        tl.to(
          slideImg,
          {
            duration: 1.5,
            scale: 1,
            ease: "expo.out",
            rotation: 0,
          },
          "start"
        )
          .to(
            showcaseName,
            {
              duration: 1,
              opacity: 1,
              xPercent: 0,
              ease: "expo.out",

              onComplete: () => {
                isAnimating = false;
              },
            },
            "start+=0.3"
          )
          .to(
            icon,
            {
              duration: 1,
              opacity: 1,
              scale: 1,
              ease: "expo.out",

              onComplete: () => {
                isAnimating = false;
              },
            },
            "start+=0.5"
          );
      } else {
        const slideImg = slide.querySelector(".slider-img");
        const showcaseName = slide.querySelector(".showcase-name h2");
        const direction = index < currentSlide ? -100 : 100;

        const tl = gsap.timeline();

        tl.to(slide, {
          duration: 1,
          scale: 0,
          opacity: 0,
          onComplete: () => {
            gsap.set(slide, { zIndex: 0 });
            isAnimating = false; // Set flag to false after animation completes
          },
        });
      }
    });
  }

  // Event listeners
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
});
