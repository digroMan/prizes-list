import { Swiper } from 'swiper';
import { Autoplay, Virtual } from 'swiper/modules';
import JSON_PRIZES_LIST from './prizes_list.json';

// TODO: write your code here
document.addEventListener('DOMContentLoaded', () => {
  const BTTN_WHEEL_FORTUNE = document.querySelector('.wheel-fortune__button');
  // const SLIDES = document.querySelectorAll('.wheel-fortune__swiper-slide');

  class WheelFortune {
    constructor(data) {
      this.prizesList = data.prizesListJson.prizes_list;
      this.swiperWrapper = document.querySelector(`.${data.selectorSwiperWrapper}`);
      this.selectorSwiperSlide = data.selectorSwiperSlide;
      this.selectorSwiperImg = data.selectorSwiperImg;
      this.prizesListStorage = [];
      this.arrayAllId = [];
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
  }

  // Класс для создания елементов слайдера

  const WHELL_FORTUNE = new WheelFortune(
    {
      prizesListJson: JSON_PRIZES_LIST,
      selectorSwiperWrapper: 'wheel-fortune__swiper-wrapper',
      selectorSwiperSlide: 'wheel-fortune__swiper-slide',
      selectorSwiperImg: 'wheel-fortune__img',
      winningId: '', // данное свойство должно содержать id товара, который выйграл пользователь
    },
  );

  WHELL_FORTUNE.createListStorage();
  WHELL_FORTUNE.addSlidesInSlider();

  // Инициализация работы слайдера

  const SWIPER_WHELL_FORTUNE = new Swiper('.wheel-fortune__swiper-container', {
    modules: [Virtual, Autoplay],
    breakpoints: {
      320: {
        direction: 'vertical',
        spaceBetween: 25,
        slidesPerView: 4,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 0,
        },
        speed: 7000,
        // allowTouchMove: false,
      },
    },
  });

  BTTN_WHEEL_FORTUNE.addEventListener('click', () => {
    console.log(SWIPER_WHELL_FORTUNE);
  });
});
