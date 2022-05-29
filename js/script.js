'use-strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'); //      Tabs
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabClassActive = 'tabheader__item_active';

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



    const deadline = '2022-09-01'; //      Timer

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

    setClock('.timer', deadline);



    const modalTriggers = document.querySelectorAll('[data-modal]') //      Modal
    const modal = document.querySelector('.modal');
    // const modalCloser = document.querySelector('[data-close]');

    const openModal = () => {

        modal.classList.add('fade', 'show');
        document.body.style.overflow = 'hidden';
        window.removeEventListener('scroll', showModalByScroll);
    }

    const closeModal = () => {

        modal.classList.remove('show');
        document.body.style.overflow = 'scroll';
    }

    modalTriggers.forEach(btn => { //  open modal

        btn.addEventListener('click', () => {

            openModal();
        })
    });

    modal.addEventListener('click', (event) => { //  close modal

        if (event.target.classList.contains('modal') || event.target.getAttribute('data-close') == '') closeModal();
    });

    document.addEventListener('keydown', (event) => {

        if (modal.classList.contains('show') && event.code === "Escape") closeModal();
    })

    function showModalByScroll() { //  Событие по достижению конца страницы

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {

            setTimeout(openModal, 3000);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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

    new menuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        22,
        '.menu .container',
    ).render();

    new menuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        32,
        '.menu .container',
    ).render();

    new menuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        42,
        '.menu .container',
    ).render();



    const forms = document.querySelectorAll('form');        //      Forms

    const messages = {

        loading: '../img/spinner.svg',
        success: 'Thanks, we\'ll call you later',
        failure: 'Something wrong'
    }

    forms.forEach(form => postData(form));

    function postData(form) {

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
            const obj = {};     //  Only for JSON

            formData.forEach((key, val) => obj[val] = key);     //  Only for JSON

            const json = JSON.stringify(obj);     //  Only for JSON

            fetch('server.php', {       //      Fetch

                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: json
                
            }).then(data => data.text())
            
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

    const showThanksModal = (message) => {      //      thanksModal

        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();

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
            closeModal();
        }, 3000);
    }


    const slider = document.querySelector('.offer__slider');                 //      Slider
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

        if(slides.length < 10) {

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

    const indicators = document.createElement('ol');        //      slider dots

    const dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slidesAmount; i++) {

        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if(i == 0) {

            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {

        if(offset === +width.slice(0, -2) * (slidesAmount - 1)){

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

        if(offset === 0){

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
    }));


    const result = document.querySelector('.calculating__result span'); //      Calculator
    let sex = 'female', height, weight, age, ratio = 1.375;

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
            } else if(event.target.getAttribute('id')) {

                sex = event.target.getAttribute('id');
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
})