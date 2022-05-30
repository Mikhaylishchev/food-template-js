export const slider = () => {

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

        if (currentSlide === 1) {

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
