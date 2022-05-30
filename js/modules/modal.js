export { openModal };
export { closeModal };
export { showModalByScroll };

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

export const modal = (modalSelector, triggerSelector) => {

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