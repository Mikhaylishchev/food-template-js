/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": () => (/* binding */ calculator)
/* harmony export */ });
const calculator = () => {

    const result = document.querySelector('.calculating__result span'); //      Calculator
    let sex = localStorage.getItem('sex') || 'female', 
        height,
        weight,
        age,
        ratio = localStorage.getItem('ratio') || 1.375;

    function initLocalSettings(selector, activityClass) {

        let elements = document.querySelectorAll(selector);

        elements.forEach(item => {

            if(item.getAttribute('id') === sex || item.getAttribute('data-ratio') === ratio) {

                elements.forEach(item => item.classList.remove(activityClass));
               
                item.classList.add(activityClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    
    function calcResult() {

        if (!sex || !height || !weight || !age || !ratio) {

            result.textContent = '_________';
            return;
        }

        if (sex === 'female') {
            
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {

            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcResult();

    function getStaticData(parentElement, activityClass) {

        const elements = document.querySelectorAll(`${parentElement} div`);

        document.querySelector(parentElement).addEventListener('click', (event) => {

            if(event.target.getAttribute('data-ratio')) {

                ratio = +event.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);

            } else if(event.target.getAttribute('id')) {

                sex = event.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            if(event.target.classList.contains('calculating__choose-item')){
                elements.forEach(element => element.classList.remove(activityClass));
                event.target.classList.add(activityClass);
            }

            calcResult();
        })
    }


    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');

    const getDynamicData = (selector) => {

        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
                
            input.value = input.value.replace(/\D/g, '');   //  valid           

            switch(input.getAttribute('id')) {

                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcResult();
        });
    }
    
    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');
}

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cards": () => (/* binding */ cards)
/* harmony export */ });
const cards = () => {

    class menuCard { //    Menu cards

        constructor(src, alt, title, descr, price, parentElement, ...classes) {

            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 76;
            this.parentElement = document.querySelector(parentElement);
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH() {

            this.price = this.price * this.transfer
        }

        render() {

            const card = document.createElement('div');

            if (!this.classes.length) {

                card.classList.add('menu__item')
            } else {

                this.classes.forEach(className => card.classList.add(className))
            }

            this.classes.forEach(className => card.classList.add(className))

            card.innerHTML =

                `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `

            this.parentElement.append(card)
        }
    }


    axios.get('http://localhost:3000/menu')

    .then(data => {

        data.data.forEach(card => {

            new menuCard(card.img, card.altimg, card.title, card.descr, card.price, '.menu .container').render();
        })
    });
}

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");


// import {showModalByScroll} from './modal.js';


function forms() {

    const forms = document.querySelectorAll('form');    //      Forms

    const messages = {

        loading: '../img/spinner.svg',
        success: 'Thanks, we\'ll call you later',
        failure: 'Something wrong'
    }

    forms.forEach(form => bindPostData(form));

    const postData = async (url, data) => {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form) {

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `

                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)

                .then(data => {

                    console.log(data);

                    showThanksModal(messages.success)

                    statusMessage.remove();
                }).catch(() => {

                    showThanksModal(messages.failure)
                }).finally(() => {

                    form.reset();
                })

        });
    }
}


const showThanksModal = (message) => { //      thanksModal

    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `

        <div class="modal__content">
            <div class="modal__close" data-close>&times</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {

        thanksModal.remove();
        prevModal.classList.remove('hide');
        (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 3000);
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "showModalByScroll": () => (/* binding */ showModalByScroll)
/* harmony export */ });




const modalWindow = document.querySelector('.modal');

const openModal = () => {

    modalWindow.classList.add('fade', 'show');
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', showModalByScroll);
}

const closeModal = () => {

    modalWindow.classList.remove('show');
    document.body.style.overflow = 'scroll';
}

const showModalByScroll = () => { //  Событие по достижению конца страницы

    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {

        setTimeout(openModal, 3000);
    }
}

const modal = (modalSelector, triggerSelector) => {

    const modalTriggers = document.querySelectorAll(triggerSelector) //      Modal
    const modalWindow = document.querySelector(modalSelector);    

    modalTriggers.forEach(btn => { //  open modal

        btn.addEventListener('click', () => {

            openModal();
        })
    });

    modalWindow.addEventListener('click', (event) => { //  close modal

        if (event.target === modalWindow || event.target.getAttribute('data-close') === '') closeModal();
    });

    document.addEventListener('keydown', (event) => {

        if (modalWindow.classList.contains('show') && event.code === "Escape") closeModal();
    })



    window.addEventListener('scroll', showModalByScroll);
}

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slider": () => (/* binding */ slider)
/* harmony export */ });
const slider = () => {

    const slider = document.querySelector('.offer__slider'); //      Slider
    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const slides = document.querySelectorAll('.offer__slide');
    let currentSlide = 1;
    const slidesAmount = slides.length;
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    let offset = 0;

    const getValues = () => {

        if (slides.length < 10) {

            current.textContent = `0${currentSlide}`
            total.textContent = `0${slides.length}`
        } else {

            current.textContent = currentSlide;
            total.textContent = slides.length;
        }
    }

    getValues();

    const width = window.getComputedStyle(sliderWrapper).width;

    slidesField.style.display = 'flex';

    slidesField.style.width = 100 * slidesAmount + '%';
    slidesField.style.transition = '.4s all';

    slides.forEach(slide => slide.style.width = width);

    slider.style.overflow = 'hidden';

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'); //      slider dots

    const dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slidesAmount; i++) {

        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {

            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {

        if (offset === +width.slice(0, -2) * (slidesAmount - 1)) {

            currentSlide = 1;
            offset = 0
        } else {

            currentSlide++;
            (offset += +width.slice(0, -2));
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        getValues();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlide - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {

        if (offset === 0) {

            offset = +width.slice(0, -2) * (slidesAmount - 1);
            currentSlide = slidesAmount;
        } else {

            offset -= +width.slice(0, -2);
            currentSlide = currentSlide - 1;
        }


        slidesField.style.transform = `translateX(-${offset}px)`

        getValues();


        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlide - 1].style.opacity = 1;
    });

    dots.forEach(dot => dot.addEventListener('click', (event) => {

        const slideTo = event.target.getAttribute('data-slide-to');

        currentSlide = slideTo;

        offset = +width.slice(0, -2) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        getValues();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlide - 1].style.opacity = 1;
    }))
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, activityClass) {

    const tabs = document.querySelectorAll(tabsSelector); //      Tabs
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabClassActive = activityClass;

    function hideTabsContent() {

        tabsContent.forEach(item => {

            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => tab.classList.remove(tabClassActive));
    }

    function showTabContent(i = 0) {

        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(tabClassActive);
    }

    tabs.forEach((item, i) => {

        item.addEventListener('click', (event) => {

            hideTabsContent();
            showTabContent(i);
        })
    });

    hideTabsContent();
    showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
const timer = (timerSelector, deadline) => {

    // const deadline = '2022-09-01'; //      Timer

    function getTimeRemaining(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(t / (1000 * 60) % 60);
        const seconds = t / 1000 % 60;

        return {

            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const getZero = (num) => num < 10 ? `0${num}` : num;

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        function updateClock() {

            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {

                clearInterval('.timer', deadline);
            }
        }
    }

    setClock(timerSelector, deadline);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator.js */ "./js/modules/calculator.js");








'use-strict';

window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', 'tabheader__item_active' );

    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', 'tabheader__item_active' );

    (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__.timer)('.timer', '2022-09-01');

    (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__.modal)('.modal', '[data-modal]');

    (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_1__.cards)();

    (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_4__["default"])();

    (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__.slider)();

    (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__.calculator)();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map