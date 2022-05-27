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

            const request = new XMLHttpRequest();       //      XMLHttpRequest
            request.open('POST', 'server.php');

            request.setRequestHeader('Conten-type', 'application/json');     //  Only for JSON

            const formData = new FormData(form);
            const obj = {};     //  Only for JSON

            formData.forEach((key, val) => obj[val] = key);     //  Only for JSON

            const json = JSON.stringify(obj);     //  Only for JSON

            request.send(json);

            request.addEventListener('load', () => {

                if (request.status === 200) {

                    console.log(request.response);

                    showThanksModal(messages.success)

                    form.reset();

                    statusMessage.remove();

                } else {

                    showThanksModal(messages.failure)
                }
            });
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

})