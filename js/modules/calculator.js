export const calculator = () => {

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