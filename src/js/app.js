import { Swiper } from 'swiper';
import { Autoplay, Virtual } from 'swiper/modules';
import JSON_PRIZES_LIST from './prizes_list.json';

document.addEventListener('DOMContentLoaded', () => {
  const BTTN_WHEEL_FORTUNE = document.querySelector('.wheel-fortune__button');

  class WheelFortune {
    constructor(data) {
      this.prizesList = data.prizesListJson.prizes_list;
      this.swiperWrapper = document.querySelector(`.${data.selectorSwiperWrapper}`);
      this.selectorSwiperSlide = data.selectorSwiperSlide;
      this.selectorSwiperImg = data.selectorSwiperImg;
      this.prizesListStorage = [];
      this.arrayAllId = [];
      this.linearAnimation = data.selectorLinearAnimation;
      this.animatedSlide = data.selectorAnimatedSlide;
    }

    // Создает хранилище из элементов слайдера

    createListStorage() {
      this.prizesList.forEach((dataItem) => {
        this.prizesListStorage.push(this.createSlideItem(dataItem));
        this.addIdItem(dataItem.id);
      });
    }

    // Создает элемент слайда

    createSlideItem(obj) {
      const slideItem = document.createElement('div');
      slideItem.classList.add('swiper-slide', this.selectorSwiperSlide);
      slideItem.dataset.id = obj.id;
      const slideImg = document.createElement('img');
      slideImg.setAttribute('src', obj.img);
      slideImg.classList.add(this.selectorSwiperImg);
      slideItem.append(slideImg);
      return slideItem;
    }

    // Добавляет слайды в слайдер

    addSlidesInSlider() {
      this.prizesListStorage.forEach((slide) => this.swiperWrapper.append(slide));
    }

    // Добавляет ID в общий массив с ID

    addIdItem(id) { this.arrayAllId.push(id); }

    addClassesAnimation() {
      this.swiperWrapper.classList.add(this.linearAnimation, this.animatedSlide);
    }

    getPrizesListStorage() {
      return this.prizesListStorage;
    }
  }

  // Класс для создания елементов слайдера

  const WHELL_FORTUNE = new WheelFortune(
    {
      prizesListJson: JSON_PRIZES_LIST,
      selectorSwiperWrapper: 'wheel-fortune__swiper-wrapper',
      selectorSwiperSlide: 'wheel-fortune__swiper-slide',
      selectorSwiperImg: 'wheel-fortune__img',
      winningId: '', // данное свойство должно содержать id товара, который выйграл пользователь
      selectorLinearAnimation: 'wheel-fortune__swiper-wrapper_transition-linear',
      selectorAnimatedSlide: 'wheel-fortune__swiper-wrapper_animated',
    },
  );

  WHELL_FORTUNE.createListStorage();
  WHELL_FORTUNE.addSlidesInSlider();

  /* eslint-disable */
  let initialSpeed = 150; // Начальная задержка смены слайдов в миллисекундах
  let minSpeed = 100; // Минимальная задржка между сменой слайдов в миллисекундах
  let maxSpeed = 600; // Максимальная задержка при смене слайда
  // В строку ниже необходимо вставить id подарка
  let prize = 'c7b28285-eb5b-431a-b59d-28a484ef5561';

  // Инициализация работы слайдера

  const SWIPER_WHELL_FORTUNE = new Swiper('.wheel-fortune__swiper-container', {
    modules: [Virtual, Autoplay],
    direction: 'vertical',
    // Управление количеством слайдов на странице
    slidesPerView: 3.5,
    spaceBetween: 35,
    loop: true,
    speed: initialSpeed,
    centeredSlides: true,
  });

  // Ускорение свайпера
  function boostSlideSpeed() {
    if (initialSpeed > minSpeed) {
        initialSpeed -= 100; // На сколько уменьшается задержка 
        SWIPER_WHELL_FORTUNE.params.speed = initialSpeed;
    }
  }

  // Замедление и остановка свайпера
  function slowdownSlideSpeed() {
    if (initialSpeed < maxSpeed) {
        initialSpeed += 50; // На сколько увеличивается задержка 
        SWIPER_WHELL_FORTUNE.params.speed = initialSpeed;
    }

    if (initialSpeed === maxSpeed) {
      SWIPER_WHELL_FORTUNE.autoplay.stop(); 
    }
  }

  function updateParamsSwiper() {
    SWIPER_WHELL_FORTUNE.params.autoplay.disableOnInteraction = false;
    SWIPER_WHELL_FORTUNE.params.autoplay.delay = 0;
    SWIPER_WHELL_FORTUNE.params.autoplay.reverseDirection = true,
    SWIPER_WHELL_FORTUNE.autoplay.start();    
  }

  function changeSlide() {
    const isPrize = this.slides[this.activeIndex].dataset.id === prize; 
    if(!isPrize) {
      this.slidePrev(initialSpeed)
      initialSpeed += 100; 
      SWIPER_WHELL_FORTUNE.params.speed = initialSpeed;
    };
    if(isPrize) SWIPER_WHELL_FORTUNE.off('slideChangeTransitionEnd', changeSlide);
  }

  BTTN_WHEEL_FORTUNE.addEventListener('click', () => {
    updateParamsSwiper();
    SWIPER_WHELL_FORTUNE.on('slideChangeTransitionStart', boostSlideSpeed);

    // Имитация запроса на сервер
    setTimeout(() => {
      // То что нужно выполнить при получении ответа сервера
      SWIPER_WHELL_FORTUNE.off("slideChangeTransitionStart", boostSlideSpeed);
      SWIPER_WHELL_FORTUNE.on('slideChangeTransitionStart', slowdownSlideSpeed);
      SWIPER_WHELL_FORTUNE.on('autoplayStop', () => {
        SWIPER_WHELL_FORTUNE.off('slideChangeTransitionStart', slowdownSlideSpeed);
        SWIPER_WHELL_FORTUNE.on('slideChangeTransitionEnd', changeSlide);
      })
    }, 2500)
  });
});
