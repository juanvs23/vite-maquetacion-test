import Swiper, { Navigation, Autoplay } from "swiper";
import validator from "validator";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/autoplay";
import "./style.scss";

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const bannerForm = document.getElementById("banner-form");
  if (carouselContainer) {
    const carouselContainerSwpier = new Swiper(".carousel-container", {
      slidesPerView: 4,
      spaceBetween: 10,
      modules: [Navigation, Autoplay],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
    });
  }
  if (bannerForm) {
    const inputs = document.querySelectorAll("input");
    Array.from(inputs).forEach((input) => {
      input.addEventListener("focus", () => {
        if (input.classList.contains("error")) {
          input.classList.remove("error");
        }
      });
    });
    const showError = (id) => {
      console.log(id);
      if (!document.getElementById(`${id}`).classList.contains("error")) {
        document.getElementById(`${id}`).classList.add("error");
      }
    };
    bannerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fails = Array.from(inputs).map((input) => {
        if (input.type == "text") {
          const validate = validator.isEmpty(input.value);
          if (validate) {
            showError(input.id);
          }
          if (input.id == "cellphone") {
            const validate = validator.isNumeric(input.value);
            if (!validate) {
              showError(input.id);
              return !validate;
            }
          }
          return validate;
        }
        if (input.type == "email") {
          if (!validator.isEmail(input.value)) {
            showError(input.id);
          }
          return !validator.isEmail(input.value);
        }
      });

      if (fails.includes(true)) {
        console.log("error");
      }
    });
  }
});
