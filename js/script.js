window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabFunction() {
    tabsContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabFunction(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabFunction();
  showTabFunction();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((el, i) => {
        if (target === el) {
          hideTabFunction();
          showTabFunction(i);
        }
      });
    }
  });

  // timer

  const deadline = `2023-12-24`;

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    updateClock();

    timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // modal

  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector(".modal__close");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function hidingModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", hidingModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hidingModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      hidingModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 10000);

  // Use classes for cards

  // class MenuCards {
  //   constructor(src, alt, title, description, price, parentSelector) {
  //     this.src = src;
  //     this.alt = alt;
  //     this.title = title;
  //     this.description = description;
  //     this.price = price;
  //     this.transfer = 30;
  //     this.parent = document.querySelector(parentSelector);
  //     this.changeToHryvna();
  //   }

  //   changeToHryvna() {
  //     this.price = this.price * this.transfer;
  //   }

  //   render() {
  //     const element = document.createElement("div");
  //     element.innerHTML = `<div class="menu__item">
  //           <img src=${this.src} alt=${this.alt} />
  //           <h3 class="menu__item-subtitle">${this.title}</h3>
  //           <div class="menu__item-descr">
  //             ${this.description}
  //           </div>
  //           <div class="menu__item-divider"></div>
  //           <div class="menu__item-price">
  //             <div class="menu__item-cost">Цена:</div>
  //             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
  //           </div>
  //         </div>`;

  //     this.parent.append(element);
  //   }
  // }

  // new MenuCards(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  //             свежих овощей и фруктов. Продукт активных и здоровых людей. Это
  //             абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   ".menu .container"
  // ).render();

  // slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current");

  let slideIndex = 1;

  showSlides(slideIndex);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = `${slides.length}`;
  }

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = "none"));

    slides[slideIndex - 1].style.display = "block";

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });

  next.addEventListener("click", () => {
    plusSlides(1);
  });
});
