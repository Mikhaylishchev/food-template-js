import {openModal} from './modal.js';
import {closeModal} from './modal.js';
// import {showModalByScroll} from './modal.js';


export default function forms() {

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