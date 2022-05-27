'use-strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item');         //      Tabs
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



    const deadline = '2022-09-01';      //      Timer

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
})