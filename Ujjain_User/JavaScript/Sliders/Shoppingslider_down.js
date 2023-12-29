// Initialize Swiper ______ Puja down

var swiper = new Swiper("#swiper_shopping_down", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    //  pagination: {
    //    el: ".swiper-pagination",
    //    type: "fraction",
    //  },
    navigation: {
        nextEl: "#swiper-button-next_shopping_down",
        prevEl: "#swiper-button-prev_shopping_down",
    },
  });
  
  var appendNumber = 4;
  var prependNumber = 1;
  document
    .querySelector(".prepend-2-slides")
    .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide([
            '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
            '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
        ]);
    });
  document
    .querySelector(".prepend-slide")
    .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide(
            '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
        );
    });
  document
    .querySelector(".append-slide")
    .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide(
            '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
        );
    });
  document
    .querySelector(".append-2-slides")
    .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide([
            '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
            '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
        ]);
    });
  