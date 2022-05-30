export const cards = () => {

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